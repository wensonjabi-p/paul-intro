/* 성좌에서 큐레이션 안 된 조합(2개 이상 단어)을 골랐을 때, 그 단어들을 하나의 흐르는 1인칭 글로 실시간 합성.
   ANTHROPIC_API_KEY 없거나 호출 실패 시 조용히 {synthesis:null} 반환 —
   클라이언트가 기존 생각(thoughts) 매칭 또는 문장 이어붙이기 폴백으로 넘어간다. */

const SYSTEM = `당신은 Paul Bhang이라는 사람의 인생 이야기를 그의 목소리로 다시 쓰는 대필 작가입니다.
그는 한국인으로, 15년 넘게 5개 대륙을 오가며 살았습니다.

지금 그의 자기소개 웹사이트 방문자가 여러 개의 단어(키워드)를 동시에 골랐습니다. 각 단어에는 이미 짧은 1인칭 이야기가 있습니다.
그 이야기 조각들을 재료로 삼아, 이 단어들이 그의 인생 안에서 어떻게 만나는지를 하나의 흐르는 문단으로 다시 써주세요.

- 반드시 1인칭("나는"), 담담하고 성찰적인 어조.
- 3~5문장, 하나의 문단. 목록이나 소제목 없이 자연스러운 글.
- 각 단어의 이야기에 나온 구체적인 사실(장소, 사건, 감정)을 최소 하나씩은 살려서 엮으세요. 지어내지 말고 주어진 이야기 안의 사실만 쓰세요.
- 뻔한 요약이 아니라, "이 단어들이 왜 나에게 나란히 존재하는가"를 발견하는 글이어야 합니다.
- 아래 이야기 조각들이 어떤 언어로 쓰여 있든, 반드시 그 언어와 똑같은 언어로 답하세요(번역하지 마세요) — 한국어 조각이면 한국어로, 영어 조각이면 영어로, 중국어 조각이면 중국어로.`;

const TOOL = {
  name: 'submit_synthesis',
  description: '합성한 문단을 제출한다.',
  input_schema: {
    type: 'object',
    properties: {
      paragraph: { type: 'string', description: '한국어 1인칭 문단, 3~5문장' },
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
        max_tokens: 500,
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
    res.status(200).json({ synthesis: paragraph });
  } catch (e) {
    res.status(200).json({ synthesis: null });
  }
};
