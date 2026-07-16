/* 관리자 전용 — 인터뷰 원본 답변(질문+답)을 공개 사이트에 어울리는
   절제된 1인칭 "생각" 한두 문장 + 관련 태그로 다듬어 돌려준다.
   저장은 하지 않음 — 프론트에서 Paul이 문구를 확인/수정한 뒤 /api/thoughts로 발행한다.
   ANTHROPIC_API_KEY 없거나 실패 시, 원본 답변을 그대로 다듬지 않고 폴백으로 돌려준다. */
const { isValidSession } = require('./_lib');

const SYSTEM = `당신은 Paul Bhang이라는 사람의 인생 이야기를 그의 목소리로 다듬는 대필 작가입니다.
그는 한국인으로, 15년 넘게 5개 대륙을 오가며 살았습니다.

그가 인터뷰에서 어떤 질문에 답한 원본(구어체, 정리 안 된 말)을 줄 겁니다.
이걸 그의 공개 자기소개 사이트 "생각의 파편들"의 "최근의 생각들" 피드에 올릴, 짧고 담담한 1인칭 글로 다듬어주세요.

- 반드시 1인칭("나는"), 담담하고 성찰적인 어조. 사실을 나열하지 말고 "이 경험이 나에게 무엇이었나"의 통찰 한 조각으로.
- 1~2문장, 아주 짧게. 소제목·목록 없이 자연스러운 한 덩어리.
- 원본 답변에 실제로 있는 내용만 쓰세요. 지어내지 말 것.
- 죽음·사고·종교 등 민감한 소재는 선정적으로 다루지 말고 절제해서. 확신 없으면 부드럽게.
- 원본이 쓰인 언어와 같은 언어로 답하세요(대개 한국어).
- tags: 이 생각과 관련된 성좌 키워드를 1~3개, 짧은 영문 소문자로. 가능하면 아래 기존 키워드를 재사용하세요:
  bike, freedom, hands, pm, salt, trade, sales, png, timber, survival, commonsense, malaria,
  pakistan, islam, adapt, vienna, prague, croatia, cambodia, tokyo, shanghai, hangzhou, ireland,
  jinhae, masan, nomad, boundary, stranger, bridge, drift, interp, multiling, teaching, subtitle, guesthouse.
  딱 맞는 게 없으면 새 짧은 영문 태그를 만들어도 됩니다.`;

const TOOL = {
  name: 'submit_thought',
  description: '다듬은 공개용 생각과 태그를 제출한다.',
  input_schema: {
    type: 'object',
    properties: {
      text: { type: 'string', description: '공개 피드에 올릴 1~2문장의 1인칭 생각' },
      tags: { type: 'array', items: { type: 'string' }, description: '관련 키워드 1~3개(짧은 영문 소문자)' },
    },
    required: ['text', 'tags'],
  },
};

function fallback(answer, node) {
  const text = String(answer || '').trim().replace(/\s+/g, ' ').slice(0, 240);
  return { text, tags: node ? [node] : [] };
}

module.exports = async (req, res) => {
  if (!isValidSession(req.headers.cookie)) return res.status(401).json({ error: '로그인이 필요해요.' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { question, answer, node } = body || {};
  if (!answer || !String(answer).trim()) return res.status(400).json({ error: 'no answer' });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(200).json({ polished: fallback(answer, node), ai: false });

  const userMsg = `질문: ${question || '(없음)'}\n(주제 태그: ${node || '없음'})\n원본 답변: ${String(answer).slice(0, 1200)}\n\n위 답변을 공개 피드용 1인칭 생각으로 다듬어주세요.`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 400,
        system: SYSTEM,
        messages: [{ role: 'user', content: userMsg }],
        tools: [TOOL],
        tool_choice: { type: 'tool', name: 'submit_thought' },
      }),
    });
    if (!r.ok) return res.status(200).json({ polished: fallback(answer, node), ai: false });
    const data = await r.json();
    const block = (data.content || []).find(c => c.type === 'tool_use' && c.name === 'submit_thought');
    const text = block && block.input && block.input.text;
    if (!text) return res.status(200).json({ polished: fallback(answer, node), ai: false });
    let tags = (block.input.tags || []).filter(t => typeof t === 'string' && t.trim()).map(t => t.trim());
    if (!tags.length && node) tags = [node];
    res.status(200).json({ polished: { text: text.trim(), tags }, ai: true });
  } catch (e) {
    res.status(200).json({ polished: fallback(answer, node), ai: false });
  }
};
