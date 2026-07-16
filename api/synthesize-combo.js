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
- 뻔한 요약이 아니라, "이 경험들이 왜 결국 하나로 이어지는가"를 방문자가 읽으며 발견하게 되는 글이어야 합니다.
- 아래 이야기 조각들이 어떤 언어로 쓰여 있든, 반드시 그 언어와 똑같은 언어로 답하세요(번역하지 마세요) — 한국어 조각이면 한국어로, 영어 조각이면 영어로, 중국어 조각이면 중국어로.`;

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
  const { nodes } = body || {};
  if (!Array.isArray(nodes) || nodes.length < 2) return res.status(200).json({ synthesis: null });

  const userMsg = nodes.map(n => `[${n.label}] ${n.story}`).join('\n\n') +
    `\n\n위 ${nodes.length}개 단어(${nodes.map(n => n.label).join(', ')})를 하나의 문단으로 엮어주세요.`;

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
        system: SYSTEM,
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
