/* 방금 답한 질문+답변을 읽고 Claude가 실시간으로 후속 질문을 생성.
   ANTHROPIC_API_KEY 없거나 호출 실패 시 조용히 {followup:null} 반환 —
   클라이언트가 태그매칭 폴백으로 자연스럽게 넘어간다. */

const SYSTEM = `당신은 Paul Bhang이라는 사람의 인생 이야기를 듣는 다정하고 통찰력 있는 인터뷰어입니다.
그는 한국인으로, 15년 넘게 5개 대륙(한국, 유럽, 파푸아뉴기니, 중국, 일본 등)을 오가며 살았고 4개 언어(한국어, 영어, 중국어, 일본어)를 씁니다.
자전거 정비, 무역, 통역, 언어 교육, 게스트하우스 운영 등 다양한 일을 해왔습니다.

방금 그가 인터뷰 질문 하나에 답했습니다. 그 답변에서 자연스럽게 이어지는, 한 걸음 더 깊이 파고드는 후속 질문을 하나 만드세요.
- 질문은 한국어로, 한 문장, 따뜻하고 호기심 어린 어조.
- 방금 나온 구체적인 단어나 내용을 반드시 반영해서, 정말 그 답을 듣고 물어보는 것처럼 느껴져야 합니다. 뻔하거나 일반적인 질문은 안 됩니다.
- 그 질문에 대한 4개의 답변 보기(선택지)도 만드세요 — 짧고(3~10글자 내외) 서로 뚜렷이 다른 실제 답이어야 하며, "직접 답할게" 같은 회피용 보기는 절대 넣지 마세요.`;

const TOOL = {
  name: 'submit_followup',
  description: '생성한 후속 질문을 제출한다.',
  input_schema: {
    type: 'object',
    properties: {
      question: { type: 'string', description: '한국어 후속 질문, 한 문장' },
      tag: { type: 'string', description: '이 질문 주제를 나타내는 짧은 영문 소문자 태그. 관련 있으면 원래 태그를 재사용해도 됨(예: bike, freedom, bridge)' },
      tier: { type: 'string', enum: ['light', 'deep', 'fact'] },
      choices: { type: 'array', items: { type: 'string' }, minItems: 4, maxItems: 4 },
    },
    required: ['question', 'tag', 'tier', 'choices'],
  },
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(200).json({ followup: null });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { question, answer, node } = body || {};
  if (!question || !answer) return res.status(200).json({ followup: null });

  const userMsg = `방금 답한 질문: ${question}\n(주제 태그: ${node || '없음'})\n그의 답변: ${String(answer).slice(0, 500)}\n\n이 답변을 바탕으로 자연스럽게 이어지는 후속 질문 하나를 만들어주세요.`;

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
        messages: [{ role: 'user', content: userMsg }],
        tools: [TOOL],
        tool_choice: { type: 'tool', name: 'submit_followup' },
      }),
    });
    if (!r.ok) {
      const errBody = await r.text().catch(() => '');
      console.error('generate-followup: anthropic api not ok', r.status, errBody.slice(0, 500));
      return res.status(200).json({ followup: null });
    }
    const data = await r.json();
    const block = (data.content || []).find(c => c.type === 'tool_use' && c.name === 'submit_followup');
    if (!block || !block.input) {
      console.error('generate-followup: no tool_use block', JSON.stringify(data).slice(0, 500));
      return res.status(200).json({ followup: null });
    }
    const { question: q, tag, tier, choices } = block.input;
    if (!q || !Array.isArray(choices) || choices.length !== 4) {
      console.error('generate-followup: invalid block.input', JSON.stringify(block.input).slice(0, 500));
      return res.status(200).json({ followup: null });
    }
    res.status(200).json({ followup: { q, node: tag || node || 'ai', tier: tier || 'deep', choices } });
  } catch (e) {
    console.error('generate-followup: exception', e.message);
    res.status(200).json({ followup: null });
  }
};
