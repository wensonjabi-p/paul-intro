/* 성좌에서 큐레이션 안 된 조합(2개 이상 단어)을 골랐을 때, 그 단어들을 하나의 흐르는 1인칭 글로 실시간 합성.
   ANTHROPIC_API_KEY 없거나 호출 실패 시 조용히 {synthesis:null} 반환 —
   클라이언트가 기존 생각(thoughts) 매칭 또는 문장 이어붙이기 폴백으로 넘어간다. */
const { stripModelArtifacts } = require('./_lib');

const SYSTEM = `당신은 Paul Bhang이라는 사람의 인생 이야기를 그의 목소리로 다시 쓰는 대필 작가입니다.
그는 한국인으로, 15년 넘게 5개 대륙을 오가며 살았습니다.

지금 그의 자기소개 웹사이트 방문자가 여러 개의 단어(키워드)를 동시에 골랐습니다. 각 단어에는 이미 짧은 1인칭 이야기가 있습니다.

절대 하지 말 것 — 단어를 하나씩 순서대로 등장시키며 그 단어의 사실 하나를 박아 넣고 다음 단어로 넘어가는 식의 "요약 나열". 이렇게 쓰면 방문자에게 억지로 이어붙인 것처럼, 서로 무관하게 느껴집니다.

대신 먼저 속으로 이 단어들을 관통하는 진짜 연결고리 하나를 찾으세요 — 시간 순서(하나의 경험이 다른 경험으로 이어짐), 인과관계(하나가 다른 것의 이유가 됨), 반복되는 감정이나 태도, 또는 하나의 장면 속에 다른 요소들이 자연스럽게 등장하는 방식일 수 있습니다. 그 연결고리를 이야기의 척추로 삼아 처음부터 끝까지 하나의 흐름으로 써내려가세요 — 단어 A의 이야기 조각 → 단어 B의 이야기 조각을 병렬로 나열하는 게 아니라, "그래서", "그때부터", "그 일이 있고 나서", "돌이켜보면" 같은 연결어로 한 경험이 자연스럽게 다음 경험을 불러오듯이 쓰세요.

- 반드시 1인칭("나는"), 담담하고 성찰적인 어조.
- 4~7문장, 하나의 문단. 목록이나 소제목, 단어별 문장 구분 없이 처음부터 끝까지 자연스럽게 이어지는 글.
- 각 단어의 이야기에 나온 구체적인 사실(장소, 사건, 감정)을 살려서 엮되, 지어내지 말고 주어진 이야기 안의 사실만 쓰세요.
- 뻔한 요약이 아니라, "이 경험들이 왜 결국 하나로 이어지는가"를 방문자가 읽으며 발견하게 되는 글이어야 합니다.`;

// 스토리 페이지의 "다른 스토리로 만들어보기"에서 쓰는 모드 — 이미 있는 사실 기반 이야기(단어 하나든 여러
// 개를 엮은 것이든)를 훨씬 더 잘 쓴 글로, 완성도 있는 개인 에세이처럼 다시 쓴다. 단순히 사실을 재진술하는 게
// 아니라 "정보 전달"에서 "좋은 에세이"로 격을 높이는 게 목표 — Paul 피드백: "전체적인 글의 구성이 에세이 같은
// 느낌으로 뛰어난 방향으로 조정되면 좋겠어". 결과는 카드의 "사실 기반 %"를 낮춰서(클라이언트에서 처리) 표시하므로
// 여기서는 상상력 수준(level)에 맞게 과감하게 써도 된다.
const STORY_REMAKE_SYSTEM = `당신은 Paul Bhang이라는 사람의 인생 이야기를 그의 목소리로 다시 쓰는, 글솜씨가 뛰어난 에세이스트입니다.
그는 한국인으로, 15년 넘게 5개 대륙을 오가며 살았습니다.

지금은 이미 있는 사실 기반 이야기 하나(또는 여러 개를 엮은 것)를, 단순한 사실 재진술이 아니라 완성도 높은
개인 에세이처럼 다시 씁니다.

- 목표는 "정보 전달"이 아니라 "좋은 에세이"입니다 — 하나의 중심 통찰이나 감정으로 수렴하는 구성, 자연스러운
  도입과 여운 있는 마무리를 갖추세요. 사실을 단순 나열하지 말고, 왜 그 경험이 지금의 그에게 의미가 있는지를
  독자가 발견하게 하는 글이어야 합니다.
- 반드시 1인칭("나는"), 3~7문장, 하나의 문단.
- 여러 단어가 주어지면 순서대로 나열하지 말고 하나의 흐름으로 엮으세요.
- 상투적이거나 뻔한 문장(예: "그것은 나에게 큰 의미였다")은 피하고, 구체적이고 신선한 표현을 쓰세요.`;

const REMAKE_LEVEL_GUIDE = {
  light: '핵심 사실은 그대로 두고, 문장의 리듬과 표현만 에세이답게 다듬으세요. 새로운 사실이나 장면은 거의 더하지 마세요.',
  medium: '핵심 사실은 유지하되, 그 순간의 감각(냄새·소리·풍경)이나 속마음 같은 디테일을 몇 가지 자연스럽게 상상해서 더하세요.',
  heavy: '핵심 사실만 뼈대로 남기고, 그 사실을 둘러싼 장면·대화·감정을 과감하게 상상해서 풍부하게 재구성하세요. 완전히 새로운 각도의 에세이로 만들어도 좋습니다.',
};

const LANG_NAME = { ko: '한국어(Korean)', en: 'English', zh: '중국어(简体中文, Simplified Chinese)' };

const TOOL = {
  name: 'submit_synthesis',
  description: '합성한 문단을 제출한다.',
  input_schema: {
    type: 'object',
    properties: {
      paragraph: { type: 'string', description: '1인칭 문단, 4~7문장, 하나의 이야기 흐름' },
    },
    required: ['paragraph'],
  },
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(200).json({ synthesis: null });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { nodes, lang, mode, level } = body || {};
  const isRemake = mode === 'story-remake';
  const minNodes = isRemake ? 1 : 2;
  if (!Array.isArray(nodes) || nodes.length < minNodes) return res.status(200).json({ synthesis: null });

  // 언어는 입력 조각의 언어를 모델이 알아서 추론하게 두지 않고, 클라이언트가 요청한 언어를 명시적으로 지정한다 —
  // 시스템 프롬프트 자체가 한국어라 추론에 맡기면 종종 한국어로 되돌아가는 문제가 있었다.
  const langName = LANG_NAME[lang] || LANG_NAME.ko;
  const levelGuide = REMAKE_LEVEL_GUIDE[level] || REMAKE_LEVEL_GUIDE.medium;
  const baseSystem = isRemake ? STORY_REMAKE_SYSTEM + '\n\n- ' + levelGuide : SYSTEM;
  const systemWithLang = baseSystem + `\n\n- 반드시 ${langName}로만 답하세요. 번역하지 말고, 처음부터 그 언어로 직접 쓰세요. 절대 다른 언어를 섞지 마세요.`;

  const userMsg = isRemake
    ? nodes.map(n => `[${n.label}] ${n.story}`).join('\n\n') +
      `\n\n위 이야기를 더 나은 에세이로 다시 써주세요. 반드시 ${langName}로 답하세요.`
    : nodes.map(n => `[${n.label}] ${n.story}`).join('\n\n') +
      `\n\n위 ${nodes.length}개 단어(${nodes.map(n => n.label).join(', ')})를 하나의 문단으로 엮어주세요. 반드시 ${langName}로 답하세요.`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 700,
        system: systemWithLang,
        messages: [{ role: 'user', content: userMsg.slice(0, 4000) }],
        tools: [TOOL],
        tool_choice: { type: 'tool', name: 'submit_synthesis' },
      }),
    });
    if (!r.ok) return res.status(200).json({ synthesis: null });
    const data = await r.json();
    const block = (data.content || []).find(c => c.type === 'tool_use' && c.name === 'submit_synthesis');
    const paragraph = block && block.input && block.input.paragraph;
    if (!paragraph) return res.status(200).json({ synthesis: null });
    res.status(200).json({ synthesis: stripModelArtifacts(paragraph) });
  } catch (e) {
    res.status(200).json({ synthesis: null });
  }
};
