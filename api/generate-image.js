/* 스토리 카드를 바탕으로 실제 AI 그림을 생성한다. 두 단계: (1) Claude가 이야기 + 이미 고른 카드 팔레트의
   무드를 보고 짧은 영어 이미지 프롬프트로 압축, (2) Replicate(Flux Schnell)로 그 프롬프트를 그림으로 만든다.
   Replicate가 돌려주는 URL을 그대로 클라이언트에 넘기면 캔버스에 그려 다운로드/공유할 때 CORS로 막힐 수 있어,
   우리 Vercel Blob에 한 번 더 업로드해서 넘긴다(이미 사진 업로드에 쓰는 것과 같은 스토리지).
   ANTHROPIC_API_KEY나 REPLICATE_API_TOKEN이 없으면(둘 다 Paul이 직접 설정해야 함) 조용히
   {imageUrl:null} 반환 — 클라이언트가 "생성 실패" 처리로 자연스럽게 넘어간다.
   이 파일이 Vercel Hobby 플랜 서버리스 함수 12개 한도의 마지막 자리 — 앞으로는 새 파일 대신
   기존 파일에 action/mode로 얹을 것. */
const { put } = require('@vercel/blob');
const { stripModelArtifacts } = require('./_lib');

const PROMPT_SYSTEM = `당신은 이미지 생성 AI에게 넘길 프롬프트를 쓰는 아트 디렉터입니다.
Paul Bhang이라는 사람의 인생 이야기 한 조각과, 이미 골라둔 카드 스타일의 색·분위기를 보고,
그 장면을 표현할 영어 이미지 생성 프롬프트를 씁니다.

- 반드시 영어로, 1~2문장.
- 글자·텍스트·간판·책 표지처럼 읽을 수 있는 문자가 그림에 등장하면 안 됩니다(no text, no letters, no words, no signage).
- 특정 인물의 얼굴을 사실적인 초상으로 그리지 마세요 — 대신 실루엣, 뒷모습, 손 클로즈업, 사물, 풍경 등
  안전하고 은유적인 구도를 쓰세요.
- 화풍은 "loose ink and watercolor illustration"으로 고정해서 프롬프트에 포함하세요.
- 주어진 스타일 무드(배경색·포인트색 포함)에 어울리는 색감 지시어를 프롬프트에 넣으세요.`;

const PROMPT_TOOL = {
  name: 'submit_image_prompt',
  description: '이미지 생성 프롬프트를 제출한다.',
  input_schema: {
    type: 'object',
    properties: { prompt: { type: 'string', description: '영어 이미지 생성 프롬프트, 1~2문장' } },
    required: ['prompt'],
  },
};

// 실패 지점을 알 수 있게 각 단계에서 { ok, ...} 또는 { ok:false, status, body } 형태로 돌려준다 —
// 클라이언트엔 imageUrl:null만 보이면 되지만, 문제 진단할 때 Vercel 로그 없이도 바로 원인을 알 수 있게.
async function writeImagePrompt(key, storyText, moodText) {
  const userMsg = `이야기: ${storyText}\n\n카드 스타일 무드: ${moodText || '(지정 없음)'}\n\n위 이야기와 무드에 어울리는 이미지 생성 프롬프트를 써주세요.`;
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 300,
      system: PROMPT_SYSTEM,
      messages: [{ role: 'user', content: userMsg.slice(0, 2000) }],
      tools: [PROMPT_TOOL],
      tool_choice: { type: 'tool', name: 'submit_image_prompt' },
    }),
  });
  if (!r.ok) return { ok: false, stage: 'claude', status: r.status, body: (await r.text().catch(() => '')).slice(0, 400) };
  const data = await r.json();
  const block = (data.content || []).find(c => c.type === 'tool_use' && c.name === 'submit_image_prompt');
  const prompt = block && block.input && block.input.prompt;
  if (!prompt) return { ok: false, stage: 'claude-no-prompt', body: JSON.stringify(data).slice(0, 400) };
  return { ok: true, prompt: stripModelArtifacts(prompt) };
}

async function runReplicate(token, prompt) {
  const r = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json', Prefer: 'wait=25' },
    body: JSON.stringify({ input: { prompt, aspect_ratio: '1:1', output_format: 'png', num_outputs: 1 } }),
  });
  if (!r.ok) return { ok: false, stage: 'replicate', status: r.status, body: (await r.text().catch(() => '')).slice(0, 400) };
  const data = await r.json();
  if (data.status !== 'succeeded') return { ok: false, stage: 'replicate-status', status: data.status, body: JSON.stringify(data.error || data).slice(0, 400) };
  const out = Array.isArray(data.output) ? data.output[0] : data.output;
  if (!out) return { ok: false, stage: 'replicate-no-output', body: JSON.stringify(data).slice(0, 400) };
  return { ok: true, url: out };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const replicateToken = process.env.REPLICATE_API_TOKEN;
  if (!anthropicKey || !replicateToken) return res.status(200).json({ imageUrl: null, reason: 'not-configured' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { story, mood, debug } = body || {};
  if (!story || !String(story).trim()) return res.status(200).json({ imageUrl: null });

  try {
    const promptResult = await writeImagePrompt(anthropicKey, String(story).slice(0, 1500), String(mood || '').slice(0, 200));
    if (!promptResult.ok) return res.status(200).json({ imageUrl: null, debug: debug ? promptResult : undefined });

    const replicateResult = await runReplicate(replicateToken, promptResult.prompt);
    if (!replicateResult.ok) return res.status(200).json({ imageUrl: null, debug: debug ? replicateResult : undefined, prompt: promptResult.prompt });

    const imgRes = await fetch(replicateResult.url);
    if (!imgRes.ok) return res.status(200).json({ imageUrl: null, debug: debug ? { stage: 'fetch-image', status: imgRes.status } : undefined });
    const buf = Buffer.from(await imgRes.arrayBuffer());
    const filename = 'cards/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.png';
    const blob = await put(filename, buf, { access: 'public', contentType: 'image/png' });

    res.status(200).json({ imageUrl: blob.url, prompt: promptResult.prompt });
  } catch (e) {
    res.status(200).json({ imageUrl: null, debug: debug ? { stage: 'exception', message: e.message } : undefined });
  }
};
