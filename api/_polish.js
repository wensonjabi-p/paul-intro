/* 인터뷰 원본 답변(질문+답)을 공개 사이트에 어울리는 절제된 1인칭 "생각"(한/영/중 세 언어) + 태그로
   다듬는 공용 로직. interview-save.js(자동 발행)와 polish-thought.js(관리자 수동 재다듬기)가 함께 쓴다.
   사이트의 나머지 콘텐츠(data.js/en/zh)가 전부 3개 언어를 나란히 갖고 있는 것과 같은 모양을 맞춰서,
   방문자가 KO/EN/中 중 어떤 언어로 보고 있든 "최근의 생각들"과 카드가 항상 번역된 채로 보이게 한다.
   ANTHROPIC_API_KEY 없거나 실패 시 원본 답변을 다듬지 않고 세 언어 모두 같은 원문으로 채우는 폴백. */
const { stripModelArtifacts } = require('./_lib');

const SYSTEM = `당신은 Paul Bhang이라는 사람의 인생 이야기를 그의 목소리로 다듬는 대필 작가 겸 번역가입니다.
그는 한국인으로, 15년 넘게 5개 대륙을 오가며 살았습니다.

그가 인터뷰에서 어떤 질문에 답한 원본(구어체, 정리 안 된 말, 대개 한국어)을 줄 겁니다.
이걸 그의 공개 자기소개 사이트 "생각의 파편들"의 "최근의 생각들" 피드에 올릴, 짧고 담담한 1인칭 글로 다듬고,
한국어·영어·중국어 세 버전을 모두 만들어주세요.

- 반드시 1인칭("나는"/"I"/"我"), 담담하고 성찰적인 어조. 사실을 나열하지 말고 "이 경험이 나에게 무엇이었나"의 통찰 한 조각으로.
- 1~2문장, 아주 짧게. 소제목·목록 없이 자연스러운 한 덩어리.
- **중요 — 맥락 자립**: 이 문장은 질문 없이 이 글 하나만 뚝 떼어서 피드에 올라갑니다. 원본 답변이 "그건 기억 안 나요"처럼
  질문을 알아야만 이해되는 짧은 대답이면, 절대 그대로 옮기지 말고 질문에 담긴 맥락(무엇에 대한 질문이었는지)을
  문장 안에 자연스럽게 녹여서 그 글만 읽어도 무슨 얘기인지 알 수 있게 다시 쓰세요.
  (나쁜 예: "그 순간 표정까지는 기억나지 않는다." / 좋은 예: "낯선 이에게 서툰 인사를 건넸던 그 순간, 상대의 표정까지는 기억나지 않는다.")
- 원본 답변에 실제로 있는 내용만 쓰세요(질문에서 맥락을 가져오는 건 되지만, 답변에 없는 사실을 지어내지는 마세요).
- 죽음·사고·종교 등 민감한 소재는 선정적으로 다루지 말고 절제해서. 확신 없으면 부드럽게.
- ko/en/zh 세 버전은 서로 직역이 아니라, 같은 내용을 각 언어에서 자연스러운 문장으로 표현한 것이어야 합니다.
- tags: 이 생각과 관련된 성좌 키워드를 1~3개, 짧은 영문 소문자로(언어 무관, 하나만). 가능하면 아래 기존 키워드를 재사용하세요:
  bike, freedom, hands, pm, salt, trade, sales, png, timber, survival, commonsense, malaria,
  pakistan, islam, adapt, vienna, prague, croatia, cambodia, tokyo, shanghai, hangzhou, ireland,
  jinhae, masan, nomad, boundary, stranger, bridge, drift, interp, multiling, teaching, subtitle, guesthouse.
  **나라·도시 이름 같은 너무 넓은 태그(china, korea, europe 등)는 피하세요** — 그 답변이 실제로 어떤 지역 얘기면
  위 목록의 구체적인 지역 태그(hangzhou, shanghai 등)를 쓰고, 지역과 무관한 특정 사건/활동 얘기면 그 사건을
  나타내는 새 태그를 만드세요(예: 위챗으로 사람을 모은 이야기라면 'china'가 아니라 'wechat_recruit',
  쓰레기 줍기 하이킹 이야기라면 'ecoventure').
  딱 맞는 게 없으면 새 짧은 영문 태그를 만들어도 됩니다.
- tagLabels: tags에 넣은 태그 각각에 대해, 방문자에게 보여줄 표시 이름을 한국어/영어/중국어로 하나씩 주세요.
  **반드시 단어 하나로 — 성좌에 떠 있는 다른 단어들도 전부 한 단어입니다("통역", "자막", "PM", "영업", "손끝"처럼).
  "A·B"나 "A와 B" 식으로 두 개념을 붙이지 말고, 구를 쓰지 말고, 그 개념을 가장 잘 대표하는 단어 하나만 고르세요**
  (좋은 예: 위챗으로 사람을 모은 이야기 → tag: wechat_recruit, ko: "모집", en: "Recruiting", zh: "招募".
  쓰레기 줍기 하이킹 이야기 → tag: ecoventure, ko: "플로깅"(또는 "에코벤처"), en: "Plogging", zh: "捡垃圾徒步".
  나쁜 예: "위챗을 통한 사람 모집", "쓰레기 줍기 하이킹 활동" — 문장이나 구가 아니라 단어 하나).
  기존 태그를 재사용한 경우에도 넣어주세요(어차피 화면에는 안 쓰이니 상관없습니다) — 새 태그일 때만 실제로 쓰입니다.`;

const TOOL = {
  name: 'submit_thought',
  description: '다듬은 공개용 생각(3개 언어)과 태그를 제출한다.',
  input_schema: {
    type: 'object',
    properties: {
      ko: { type: 'string', description: '공개 피드에 올릴 1~2문장의 1인칭 생각, 한국어. 질문 없이도 이해되는 맥락 자립 문장' },
      en: { type: 'string', description: '같은 내용의 영어 버전, 직역이 아닌 자연스러운 문장' },
      zh: { type: 'string', description: '같은 내용의 중국어 버전, 직역이 아닌 자연스러운 문장' },
      tags: { type: 'array', items: { type: 'string' }, description: '관련 키워드 1~3개(짧은 영문 소문자, 나라/도시처럼 너무 넓은 태그는 피할 것)' },
      tagLabels: {
        type: 'array',
        description: 'tags 각각의 표시 이름(3개 언어) — 반드시 단어 하나로, 구/문장 금지',
        items: {
          type: 'object',
          properties: {
            tag: { type: 'string' }, ko: { type: 'string' }, en: { type: 'string' }, zh: { type: 'string' },
          },
          required: ['tag', 'ko', 'en', 'zh'],
        },
      },
    },
    required: ['ko', 'en', 'zh', 'tags'],
  },
};

function fallback(answer, node) {
  const text = String(answer || '').trim().replace(/\s+/g, ' ').slice(0, 240);
  return { text: { ko: text, en: text, zh: text }, tags: node ? [node] : [], tagLabels: {} };
}

// 드물게 모델이 ko 필드 하나에 en/zh 문장과 tagLabels JSON까지 다 욱여넣고 en/zh 필드는
// 비워버리는 경우가 실제로 관측됨(라이브 백필 123개 중 1개). 그런 오염된 필드를 걸러낸다.
const CONTAMINATION_RE = /<en"?>|<zh"?>|<ko"?>|\[\{"tag"/;
const MAX_FIELD_LEN = 400; // "1~2문장, 아주 짧게"엔 충분한 여유 — 이걸 넘으면 뭔가 섞인 것으로 간주

function sanitizeField(raw) {
  if (typeof raw !== 'string') return '';
  return stripModelArtifacts(raw.split(CONTAMINATION_RE)[0]);
}

function fieldLooksBad(s) {
  return typeof s === 'string' && (CONTAMINATION_RE.test(s) || s.length > MAX_FIELD_LEN);
}

function looksValid(input) {
  if (!input || typeof input.ko !== 'string' || !input.ko.trim()) return false;
  if (fieldLooksBad(input.ko) || fieldLooksBad(input.en) || fieldLooksBad(input.zh)) return false;
  return true;
}

async function callOnce(key, userMsg) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 700,
      system: SYSTEM,
      messages: [{ role: 'user', content: userMsg }],
      tools: [TOOL],
      tool_choice: { type: 'tool', name: 'submit_thought' },
    }),
  });
  if (!r.ok) return null;
  const data = await r.json();
  const block = (data.content || []).find(c => c.type === 'tool_use' && c.name === 'submit_thought');
  const input = block && block.input;
  // 형식이 멀쩡해도 내용이 오염돼 있으면(여러 언어가 한 필드에 섞임 등) 실패로 취급해서
  // 호출한 쪽의 재시도 로직을 그대로 태운다.
  if (!looksValid(input)) return null;
  return input;
}

async function polishAnswer({ question, answer, node }) {
  if (!answer || !String(answer).trim()) return null;
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { polished: fallback(answer, node), ai: false };

  const userMsg = `질문: ${question || '(없음)'}\n(주제 태그: ${node || '없음'})\n원본 답변: ${String(answer).slice(0, 1200)}\n\n위 답변을 공개 피드용 1인칭 생각으로 다듬고, 한국어/영어/중국어 세 버전을 모두 만들어주세요. 답변만으로 맥락이 부족하면 질문 내용을 문장 안에 녹여서 그 글만 읽어도 이해되게 하세요.`;

  let input = null;
  // 트래픽이 몰릴 때(예: 여러 답변을 한꺼번에 정리해서 보낼 때) 일시적으로 실패하는 경우가 있어 한 번 재시도한다.
  for (let attempt = 0; attempt < 2 && !input; attempt++) {
    try { input = await callOnce(key, userMsg); } catch (e) { input = null; }
  }
  if (!input) return { polished: fallback(answer, node), ai: false };

  const text = {
    ko: sanitizeField(input.ko),
    en: sanitizeField(input.en) || sanitizeField(input.ko),
    zh: sanitizeField(input.zh) || sanitizeField(input.ko),
  };
  let tags = (input.tags || []).filter(t => typeof t === 'string' && t.trim()).map(t => t.trim());
  if (!tags.length && node) tags = [node];
  const tagLabels = {};
  (input.tagLabels || []).forEach(tl => {
    if (tl && typeof tl.tag === 'string' && tl.tag.trim()) {
      tagLabels[tl.tag.trim()] = { ko: tl.ko || tl.tag, en: tl.en || tl.ko || tl.tag, zh: tl.zh || tl.ko || tl.tag };
    }
  });
  return { polished: { text, tags, tagLabels }, ai: true };
}

module.exports = { polishAnswer, fallback };
