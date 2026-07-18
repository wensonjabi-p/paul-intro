/* 방금 보낸 메시지가 실제로 질문에 대한 답변인지, 아니면 다른 의도(주제 전환/요약 요청/잠시 멈춤/잡담)인지
   먼저 판단하고, 답변이면 그 자리에서 후속 질문까지 함께 만든다 — 한 번의 호출로 이해와 진행을 같이 처리해서
   왕복을 늘리지 않는다.
   ANTHROPIC_API_KEY 없거나 호출 실패 시 조용히 {intent:null} 반환 —
   클라이언트가 기존 방식(그냥 답변으로 처리 + 태그매칭 폴백)으로 자연스럽게 넘어간다. */
const { stripModelArtifacts } = require('./_lib');

const SYSTEM = `당신은 Paul Bhang이라는 사람의 인생 이야기를 듣는 다정하고 통찰력 있는 인터뷰어입니다.
그는 한국인으로, 15년 넘게 5개 대륙(한국, 유럽, 파푸아뉴기니, 중국, 일본 등)을 오가며 살았고 4개 언어(한국어, 영어, 중국어, 일본어)를 씁니다.
자전거 정비, 무역, 통역, 언어 교육, 게스트하우스 운영 등 다양한 일을 해왔습니다.

지금 그에게 질문 하나를 던진 상태이고, 그가 방금 메시지를 보냈습니다. 직전 대화 흐름(있다면)도 함께 주어지니,
"아까 그거", "그것도 비슷했어", "그 얘기 계속" 같은 대명사·생략 표현은 그 흐름을 참고해서 무엇을 가리키는지
파악하세요. 후속 질문을 만들 때도 직전에 이미 나온 질문·화제를 반복하지 말고 자연스럽게 이어가세요.
먼저 이 메시지가 무엇인지 판단하세요:

- answer: 질문에 실제로 답한 경우. 가장 흔한 경우입니다. 완전히 동문서답이 아니라 질문과 조금이라도 관련이 있으면 answer로 봅니다.
- stop: 오늘 인터뷰를 완전히 끝내고 싶다는 뜻 (예: "오늘은 여기까지", "그만할래", "다음에 할게", "이제 그만").
- topic_change: 지금 질문에는 답하지 않고, 다른 주제나 다른 이야기를 하고 싶다는 뜻을 비친 경우 (예: "그거 말고 다른 얘기 하자", "음 그건 나중에, 대신 ~ 얘기할래").
- summarize_request: 지금까지 나눈 이야기를 정리하거나 요약해달라는 요청 (예: "지금까지 뭐 얘기했지?", "정리해줘").
- pause: 질문 받는 걸 잠시 멈추고 싶다는 뜻 — 완전히 그만두는 게 아니라 잠깐 쉬고 싶다는 뉘앙스 (예: "잠깐만", "조금 이따가").
- chitchat: 질문에 대한 답이 아니라 잡담, 감탄, 되묻기, 앱 사용법 질문, 혹은 전혀 무관한 말 (예: "이거 뭐하는 거야?", "ㅋㅋㅋ", "너는 뭐야").

intent가 answer이면, 두 가지를 더 만드세요:
1. confirm — 그의 답변을 한 문장으로 자연스럽게 되짚어 요약하는 문구. "정리하면 ~라는 거죠?" 같은 확인 어조. 그가 쓴 구체적인 단어를 반영하되 그대로 복사하지 말고 살짝 다른 표현으로. 새로운 정보를 묻지 말고 오직 방금 들은 걸 되짚기만 합니다.
2. 그 답변에서 자연스럽게 이어지는, 한 걸음 더 깊이 파고드는 후속 질문.
- 질문은 한국어로, 한 문장, 따뜻하고 호기심 어린 어조.
- 방금 나온 구체적인 단어나 내용을 반드시 반영해서, 정말 그 답을 듣고 물어보는 것처럼 느껴져야 합니다. 뻔하거나 일반적인 질문은 안 됩니다.
- 그 질문에 대한 4개의 답변 보기(선택지)도 만드세요 — 짧고(3~10글자 내외) 서로 뚜렷이 다른 실제 답이어야 하며, "직접 답할게" 같은 회피용 보기는 절대 넣지 마세요.

intent가 answer가 아니면:
- reply — 사용자에게 보여줄 아주 짧고 자연스러운 한국어 응답 한 문장. 공감하거나 안내하는 다정한 톤. 새 질문을 던지지 마세요.
- topic_change라면 topicHint에 사용자가 원하는 주제를 나타내는 핵심 키워드나 짧은 문구도 담으세요.`;

const TOOL = {
  name: 'handle_reply',
  description: '사용자 메시지의 의도를 분류하고, 답변이면 후속 질문까지 함께 제출한다.',
  input_schema: {
    type: 'object',
    properties: {
      intent: { type: 'string', enum: ['answer', 'stop', 'topic_change', 'summarize_request', 'pause', 'chitchat'] },
      confirm: { type: 'string', description: 'intent가 answer일 때: 방금 답변을 한 문장으로 되짚어 확인하는 문구, 한국어' },
      question: { type: 'string', description: 'intent가 answer일 때: 한국어 후속 질문, 한 문장' },
      tag: { type: 'string', description: 'intent가 answer일 때: 이 질문 주제를 나타내는 짧은 영문 소문자 태그. 관련 있으면 원래 태그를 재사용해도 됨(예: bike, freedom, bridge)' },
      tier: { type: 'string', enum: ['light', 'deep', 'fact'] },
      choices: { type: 'array', items: { type: 'string' }, minItems: 4, maxItems: 4, description: 'intent가 answer일 때: 후속 질문에 대한 4개의 답변 보기' },
      reply: { type: 'string', description: 'intent가 answer가 아닐 때: 사용자에게 보여줄 짧고 자연스러운 한국어 응답 한 문장' },
      topicHint: { type: 'string', description: 'intent가 topic_change일 때: 사용자가 원하는 주제를 나타내는 핵심 키워드/문구' },
    },
    required: ['intent'],
  },
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(200).json({ intent: null, followup: null });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { question, answer, node, history } = body || {};
  if (!question || !answer) return res.status(200).json({ intent: null, followup: null });

  const historyText = Array.isArray(history) && history.length
    ? history.slice(-12).map(m => (m && m.role === 'user' ? '그: ' : 'AI: ') + String((m && m.text) || '').slice(0, 200)).join('\n')
    : '(이번이 대화 시작이라 이전 흐름 없음)';

  const userMsg = `직전 대화 흐름:\n${historyText}\n\n현재 질문: ${question}\n(주제 태그: ${node || '없음'})\n사용자가 방금 보낸 메시지: ${String(answer).slice(0, 500)}\n\n이 메시지의 의도를 판단하고, 실제 답변이면 후속 질문까지 만들어주세요.`;

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
        tool_choice: { type: 'tool', name: 'handle_reply' },
      }),
    });
    if (!r.ok) {
      const errBody = await r.text().catch(() => '');
      console.error('generate-followup: anthropic api not ok', r.status, errBody.slice(0, 500));
      return res.status(200).json({ intent: null, followup: null });
    }
    const data = await r.json();
    const block = (data.content || []).find(c => c.type === 'tool_use' && c.name === 'handle_reply');
    if (!block || !block.input || !block.input.intent) {
      console.error('generate-followup: no valid tool_use block', JSON.stringify(data).slice(0, 500));
      return res.status(200).json({ intent: null, followup: null });
    }
    const { intent, confirm, question: q, tag, tier, choices, reply, topicHint } = block.input;

    if (intent === 'answer') {
      if (!q || !Array.isArray(choices) || choices.length !== 4) {
        console.error('generate-followup: answer intent missing fields', JSON.stringify(block.input).slice(0, 500));
        return res.status(200).json({ intent: null, followup: null });
      }
      return res.status(200).json({
        intent: 'answer',
        followup: {
          confirm: confirm ? stripModelArtifacts(confirm) : null,
          q: stripModelArtifacts(q),
          node: tag || node || 'ai',
          tier: tier || 'deep',
          choices: choices.map(c => stripModelArtifacts(c)),
        },
      });
    }

    return res.status(200).json({
      intent,
      followup: null,
      reply: reply ? stripModelArtifacts(reply) : null,
      topicHint: topicHint ? stripModelArtifacts(topicHint) : null,
    });
  } catch (e) {
    console.error('generate-followup: exception', e.message, e.cause ? JSON.stringify({ name: e.cause.name, message: e.cause.message, code: e.cause.code }) : 'no-cause');
    res.status(200).json({ intent: null, followup: null });
  }
};
