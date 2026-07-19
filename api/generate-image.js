/* 스토리 카드를 바탕으로 실제 AI 그림을 생성한다. 두 단계: (1) Claude가 이야기 + 이미 고른 카드 팔레트의
   무드 + 화풍 프리셋을 보고 짧은 영어 이미지 프롬프트로 압축, (2) Replicate(Flux Schnell)로 그 프롬프트를 그림으로 만든다.
   Replicate가 돌려주는 URL을 그대로 클라이언트에 넘기면 캔버스에 그려 다운로드/공유할 때 CORS로 막힐 수 있어,
   우리 Vercel Blob에 한 번 더 업로드해서 넘긴다(이미 사진 업로드에 쓰는 것과 같은 스토리지).
   ANTHROPIC_API_KEY나 REPLICATE_API_TOKEN이 없으면(둘 다 Paul이 직접 설정해야 함) 조용히
   {imageUrl:null} 반환 — 클라이언트가 "생성 실패" 처리로 자연스럽게 넘어간다.
   이 파일이 Vercel Hobby 플랜 서버리스 함수 12개 한도의 마지막 자리 — 앞으로는 새 파일 대신
   기존 파일에 action/mode로 얹을 것. */
const { put } = require('@vercel/blob');
const { stripModelArtifacts } = require('./_lib');

// 화풍 프리셋 30종(2026-07-19, Paul 요청 — 기본 스타일을 고르기 전에 다양하게 실제로 만들어서 보여줄 것).
// directive는 영어 화풍 지시어로 이미지 프롬프트에 그대로 녹여 씀. label은 나중에 클라이언트 선택 UI에 쓸 한국어 이름.
const STYLE_PRESETS = [
  { id: 'pen-sketch', label: '펜 스케치', directive: 'loose pen-and-ink line sketch, sparse expressive linework, like a personal travel journal drawing, minimal cross-hatching, white paper background' },
  { id: 'ink-wash-fountain', label: '만년필 잉크 워시', directive: 'fountain pen ink wash sketch, scratchy expressive contour lines, sparse light watercolor tint bleeding from the linework' },
  { id: 'ballpoint-continuous', label: '볼펜 연속선 드로잉', directive: 'ballpoint pen doodle, continuous unbroken contour line drawing, minimal shading, casual notebook-margin feel' },
  { id: 'technical-pen', label: '테크니컬 펜 세밀화', directive: 'fine technical pen illustration, delicate cross-hatch shading, precise engraving-like linework' },
  { id: 'charcoal-brush', label: '목탄·붓 스케치', directive: 'charcoal and ink brush sketch, bold gestural strokes, worn textured paper' },
  { id: 'ink-watercolor', label: '잉크 + 수채화', directive: 'loose ink and watercolor illustration, gentle watercolor bleeding, delicate ink linework' },
  { id: 'sumi-e', label: '수묵화(동양화풍)', directive: 'traditional East Asian ink wash sumi-e painting, minimal brushstrokes, generous negative space' },
  { id: 'wet-watercolor', label: '웻온웻 수채 번짐', directive: 'wet-on-wet watercolor bleed, soft diffused edges, dreamy pastel color wash' },
  { id: 'abstract-geo', label: '추상 기하학', directive: 'abstract geometric shapes and flat color fields, no representational forms, bold minimal composition' },
  { id: 'abstract-expr', label: '추상표현주의', directive: 'abstract expressionist gestural brushwork, energetic color splashes, emotional non-representational forms' },
  { id: 'abstract-collage', label: '추상 콜라주', directive: 'abstract collage of torn paper textures and muted color fields, layered composition' },
  { id: 'abstract-minimal', label: '미니멀 추상 라인', directive: 'minimalist abstract line and shape composition, generous negative space, single bold accent color' },
  { id: 'ukiyo-e', label: '우키요에 목판화풍', directive: 'ukiyo-e woodblock print style, flat color planes, bold clean outlines, stylized waves and clouds' },
  { id: 'art-deco', label: '아르데코 포스터', directive: 'art deco poster illustration, geometric ornamentation, elegant metallic accent colors' },
  { id: 'bauhaus', label: '바우하우스 포스터', directive: 'bauhaus poster design, primary colors, geometric abstraction, bold minimal shapes' },
  { id: 'impressionist', label: '인상주의 화풍', directive: 'impressionist painting style, visible loose brushstrokes, soft natural light, atmospheric color' },
  { id: 'art-nouveau', label: '아르누보 일러스트', directive: 'art nouveau illustration, flowing organic linework, decorative floral border motifs' },
  { id: 'cubist', label: '큐비즘풍 조형', directive: 'cubist-inspired fragmented geometric forms, multiple perspectives, muted earthy palette' },
  { id: 'editorial-flat', label: '모던 에디토리얼 일러스트', directive: 'modern editorial illustration, flat vector shapes, muted contemporary color palette' },
  { id: 'risograph', label: '리소그래프 인쇄풍', directive: 'risograph print style, grainy halftone texture, limited duotone color palette' },
  { id: 'vaporwave', label: '베이퍼웨이브', directive: 'vaporwave aesthetic, gradient sky, retro-futuristic glow, pastel neon tones' },
  { id: 'y2k-collage', label: 'Y2K 디지털 콜라주', directive: 'Y2K digital collage, glossy gradients, playful chrome accents, early-internet nostalgia' },
  { id: 'film-grain', label: '아날로그 필름 감성', directive: 'grainy analog film photography aesthetic, warm light leaks, soft focus, nostalgic tone' },
  { id: 'cinematic-matte', label: '시네마틱 매트 페인팅', directive: 'cinematic matte painting, moody atmospheric lighting, wide dramatic composition' },
  { id: 'linocut', label: '리노컷 판화', directive: 'linocut print style, bold black outlines, high contrast, hand-carved texture' },
  { id: 'chalk-pastel', label: '파스텔 화풍', directive: 'chalk pastel on textured paper, soft blended colors, gentle grain' },
  { id: 'gouache', label: '구아슈 포스터풍', directive: 'gouache illustration, flat opaque matte colors, clean poster-like clarity' },
  { id: 'stained-glass', label: '스테인드글라스', directive: 'stained glass style, bold black leading lines, jewel-toned translucent color panels' },
  { id: 'paper-cutout', label: '종이 오림 콜라주', directive: 'paper cutout collage style, layered flat shapes, subtle soft drop shadows' },
  { id: 'monoprint', label: '모노프린트 질감', directive: 'monoprint textured illustration, organic ink blooms, tactile paper grain' },
  // 2026-07-19 추가분 — Paul 요청: "선으로만 그려진 그림", 손으로 그린 느낌, 단색/심플한 색상 위주로 더.
  { id: 'mono-line-art', label: '모노라인 아트', directive: 'clean continuous single-line illustration, one unbroken fluid contour line, monochrome black ink on plain white background, no shading, no cross-hatching, elegant minimalism' },
  { id: 'blind-contour', label: '블라인드 컨투어 드로잉', directive: 'loose blind-contour drawing, a single imperfect wobbly hand-drawn line, raw intimate sketchbook quality, black ink on white, uncorrected and spontaneous' },
  { id: 'fashion-line', label: '패션 일러스트 라인', directive: 'fashion illustration continuous line art, elegant flowing gestural contour lines, mostly white negative space with one soft flat accent color used sparingly' },
  { id: 'single-accent-line', label: '단색 포인트 라인', directive: 'flat minimal line illustration, thin uniform black contour lines throughout, one small area filled with a single solid accent color, generous white space' },
  { id: 'marker-doodle', label: '마커 손그림', directive: 'bold felt-tip marker line doodle, thick confident continuous hand-drawn strokes, monochrome or a single flat accent color, playful loose energy' },
];
const DEFAULT_STYLE_ID = 'ink-watercolor'; // Paul이 30종 검토 후 최종 선택하면 이 값을 바꿀 것

const PROMPT_SYSTEM = `당신은 이미지 생성 AI에게 넘길 프롬프트를 쓰는 아트 디렉터입니다.
Paul Bhang이라는 사람의 인생 이야기 한 조각과, 이미 골라둔 카드 스타일의 색·분위기, 그리고 지정된 화풍을 보고,
그 장면을 표현할 영어 이미지 생성 프롬프트를 씁니다.

- 반드시 영어로, 1~2문장.
- 글자·텍스트·간판·책 표지처럼 읽을 수 있는 문자가 그림에 등장하면 안 됩니다(no text, no letters, no words, no signage).
- 특정 인물의 얼굴을 사실적인 초상으로 그리지 마세요 — 대신 실루엣, 뒷모습, 손 클로즈업, 사물, 풍경 등
  안전하고 은유적인 구도를 쓰세요.
- 주어진 화풍 지시어를 프롬프트에 그대로(또는 아주 가깝게) 포함하세요 — 화풍은 고정되어 있으니 임의로 바꾸지 마세요.
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
async function writeImagePrompt(key, storyText, moodText, styleDirective) {
  const userMsg = `이야기: ${storyText}\n\n카드 스타일 무드: ${moodText || '(지정 없음)'}\n\n화풍 지시어(반드시 그대로 프롬프트에 녹여 쓸 것): ${styleDirective}\n\n위 이야기와 무드, 화풍에 어울리는 이미지 생성 프롬프트를 써주세요.`;
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

// Prefer:wait만 믿으면 계정의 첫 호출처럼 모델 콜드스타트가 대기시간을 넘길 때 "starting" 상태로
// 그냥 돌아온다(실제 확인됨) — 그래서 즉시 응답이 안 끝나 있으면 짧은 간격으로 직접 폴링한다.
async function runReplicate(token, prompt) {
  const createRes = await fetch('https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json', Prefer: 'wait=25' },
    body: JSON.stringify({ input: { prompt, aspect_ratio: '1:1', output_format: 'png', num_outputs: 1 } }),
  });
  if (!createRes.ok) return { ok: false, stage: 'replicate-create', status: createRes.status, body: (await createRes.text().catch(() => '')).slice(0, 400) };
  let data = await createRes.json();
  const pollUrl = data.urls && data.urls.get;

  const startedAt = Date.now();
  const budgetMs = 45000; // Vercel 함수 제한(60초) 안에서 Claude 호출·Blob 업로드 시간을 남겨두고 폴링
  while (data.status !== 'succeeded' && data.status !== 'failed' && data.status !== 'canceled') {
    if (!pollUrl || Date.now() - startedAt > budgetMs) return { ok: false, stage: 'replicate-timeout', status: data.status };
    await new Promise(resolve => setTimeout(resolve, 1200));
    const pollRes = await fetch(pollUrl, { headers: { Authorization: 'Bearer ' + token } });
    if (!pollRes.ok) return { ok: false, stage: 'replicate-poll', status: pollRes.status };
    data = await pollRes.json();
  }
  if (data.status !== 'succeeded') return { ok: false, stage: 'replicate-status', status: data.status, body: JSON.stringify(data.error || data).slice(0, 400) };
  const out = Array.isArray(data.output) ? data.output[0] : data.output;
  if (!out) return { ok: false, stage: 'replicate-no-output', body: JSON.stringify(data).slice(0, 400) };
  return { ok: true, url: out };
}

module.exports = async (req, res) => {
  // 클라이언트(또는 스타일 선택 UI)가 화풍 목록을 조회할 수 있게 — 인증 불필요, 정적 목록만 반환.
  if (req.method === 'GET') return res.status(200).json({ styles: STYLE_PRESETS.map(s => ({ id: s.id, label: s.label })), defaultStyleId: DEFAULT_STYLE_ID });
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const replicateToken = process.env.REPLICATE_API_TOKEN;
  if (!anthropicKey || !replicateToken) return res.status(200).json({ imageUrl: null, reason: 'not-configured' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { story, mood, debug, styleId } = body || {};
  if (!story || !String(story).trim()) return res.status(200).json({ imageUrl: null });

  const preset = STYLE_PRESETS.find(s => s.id === styleId) || STYLE_PRESETS.find(s => s.id === DEFAULT_STYLE_ID);

  try {
    const promptResult = await writeImagePrompt(anthropicKey, String(story).slice(0, 1500), String(mood || '').slice(0, 200), preset.directive);
    if (!promptResult.ok) return res.status(200).json({ imageUrl: null, debug: debug ? promptResult : undefined });

    const replicateResult = await runReplicate(replicateToken, promptResult.prompt);
    if (!replicateResult.ok) return res.status(200).json({ imageUrl: null, debug: debug ? replicateResult : undefined, prompt: promptResult.prompt });

    const imgRes = await fetch(replicateResult.url);
    if (!imgRes.ok) return res.status(200).json({ imageUrl: null, debug: debug ? { stage: 'fetch-image', status: imgRes.status } : undefined });
    const buf = Buffer.from(await imgRes.arrayBuffer());
    const filename = 'cards/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.png';
    // paul-intro-blob(기존 스토어)는 Private로 고정돼 공개 URL을 못 씀 — 새로 만든 Public 스토어를
    // storeId로 명시해서 그쪽에 올린다. (env: BLOB_PUBLIC_STORE_ID, Vercel Storage 탭에서 연결)
    const blob = await put(filename, buf, { access: 'public', contentType: 'image/png', storeId: process.env.BLOB_PUBLIC_STORE_ID });

    res.status(200).json({ imageUrl: blob.url, prompt: promptResult.prompt, styleId: preset.id });
  } catch (e) {
    res.status(200).json({ imageUrl: null, debug: debug ? { stage: 'exception', message: e.message } : undefined });
  }
};
