/* TOPIK II writing coach — grammar/register issues + language reference score.
   Pattern mirrors api/_polish.js (tool-use, quiet fallback, 1 retry).
   Spec: docs/spec-topik2-ai-coaching-layer-ko.md (N9). */
const { stripModelArtifacts, kvPushJSON } = require('./_lib');

const SYSTEM = `당신은 한국어(TOPIK) 쓰기 코치입니다. 학습자가 방금 제출한 답안에서
문법·어휘·표현(격식체 포함) 오류만 짚고, 그 부분(언어 사용)만 따로 0~100점으로 추정하세요.
이번 버전은 최소 범위입니다 — 내용의 논리성이나 글의 구성은 채점하지 마세요(다음 단계에서 추가됩니다).

원칙(반드시 지킬 것):
1. **최소 수정**: 학습자의 원문 톤·구조를 유지하고, 문제 있는 부분만 짚으세요.
   전체 글을 통째로 "더 나은 버전"으로 다시 써주지 마세요(모범답안 유출 금지).
2. **반-관대함**: 문법·표현 오류를 문맥으로 이해할 수 있다고 해서 그냥 넘어가지 마세요.
   실제로 부정확한 건 전부 짚어야 합니다. 애매하면 짚는 쪽을 택하세요.
3. **오류가 없으면 없다고 말하세요** — 억지로 지적거리를 만들지 마세요.
4. 존재하지 않는 오류를 지어내지 마세요. 원문에 실제로 있는 문제만 다루세요.
5. 격식체가 필요한 문항인데 구어체(-아요/-어요 등)를 썼다면 짚되,
   "-습니다"는 항상 적절한 표현으로 인정하세요. 순수 격식체 위반만으로는
   language 점수를 100점 만점 중 10점 넘게 깎지 마세요(실증 배점 근거:
   docs/research-heo2024-writing-rubric-ko.md).
6. 설명은 짧고 구체적으로 — 왜 틀렸는지 1문장, 고칠 방향 1문장.
7. **languageScore는 어디까지나 참고용 추정치입니다** — 이 점수 하나로 학습자의
   전체 쓰기 실력을 판단한다는 인상을 주지 마세요. 총평(summary)에도 "언어 사용
   측면"이라는 한정을 명시하세요.`;

const TOOL = {
  name: 'submit_coaching',
  description: '문법·표현 오류 목록과 언어 사용 참고점수를 제출한다.',
  input_schema: {
    type: 'object',
    properties: {
      issues: {
        type: 'array',
        description: '발견된 문법·표현 오류. 없으면 빈 배열.',
        items: {
          type: 'object',
          properties: {
            quote: { type: 'string', description: '원문에서 문제가 있는 부분 그대로 인용(짧게)' },
            problem: { type: 'string', description: '무엇이 왜 문제인지, 1문장' },
            suggestion: { type: 'string', description: '고칠 방향 또는 예시, 1문장' },
          },
          required: ['quote', 'problem', 'suggestion'],
        },
      },
      languageScore: {
        type: 'integer',
        description: '언어 사용(문법·어휘·격식) 측면만의 0~100 참고점수',
      },
      summary: {
        type: 'string',
        description: '언어 사용 측면 총평 1문장',
      },
    },
    required: ['issues', 'languageScore', 'summary'],
  },
};

function buildUserMessage({ kind, prompt, text }) {
  const kindNote =
    kind === 'write-blank'
      ? '빈칸 채우기 문항입니다. 학습자가 쓴 문장이 문법·격식체상 자연스러운지만 보세요.'
      : kind === 'write-short'
        ? '단문(200~300자) 쓰기 문항입니다.'
        : '논술(600~700자) 쓰기 문항입니다.';
  return `${kindNote}\n\n문제: ${String(prompt || '').slice(0, 500)}\n\n학습자 답안:\n${String(text || '').slice(0, 2000)}\n\n위 답안의 문법·어휘·표현 오류만 짚어주세요.`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(200).json({ ai: false, issues: [], languageScore: null, summary: '' });

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }
  const { kind, prompt, text } = body || {};
  if (!text || !String(text).trim()) return res.status(400).json({ error: 'no text' });

  const userMsg = buildUserMessage({ kind, prompt, text });

  let input = null;
  for (let attempt = 0; attempt < 2 && !input; attempt++) {
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
          messages: [{ role: 'user', content: userMsg }],
          tools: [TOOL],
          tool_choice: { type: 'tool', name: 'submit_coaching' },
        }),
      });
      if (r.ok) {
        const data = await r.json();
        const block = (data.content || []).find(
          (c) => c.type === 'tool_use' && c.name === 'submit_coaching'
        );
        input = block && block.input;
      }
    } catch (e) {
      input = null;
    }
  }

  if (!input || !Array.isArray(input.issues) || typeof input.languageScore !== 'number') {
    try {
      await kvPushJSON('topik2:coaching-log', {
        uid: body.uid || null,
        at: Date.now(),
        questionId: body.questionId || null,
        kind: body.kind || null,
        ruleBasedLanguageScore: body.ruleBasedLanguageScore ?? null,
        aiLanguageScore: null,
      });
    } catch (e) { /* quiet */ }
    return res.status(200).json({ ai: false, issues: [], languageScore: null, summary: '' });
  }

  const issues = input.issues.slice(0, 8).map((i) => ({
    quote: stripModelArtifacts(String(i.quote || '').slice(0, 200)),
    problem: stripModelArtifacts(String(i.problem || '').slice(0, 300)),
    suggestion: stripModelArtifacts(String(i.suggestion || '').slice(0, 300)),
  }));
  const languageScore = Math.max(0, Math.min(100, Math.round(input.languageScore)));
  try {
    await kvPushJSON('topik2:coaching-log', {
      uid: body.uid || null,
      at: Date.now(),
      questionId: body.questionId || null,
      kind: body.kind || null,
      ruleBasedLanguageScore: body.ruleBasedLanguageScore ?? null,
      aiLanguageScore: languageScore,
    });
  } catch (e) { /* quiet — never break UX */ }
  res.status(200).json({
    ai: true,
    issues,
    languageScore,
    summary: stripModelArtifacts(String(input.summary || '').slice(0, 300)),
  });
};
