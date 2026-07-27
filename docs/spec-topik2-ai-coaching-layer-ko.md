# 스펙 — TOPIK II 쓰기(51~54번) AI 코칭 레이어 신규 구축

> Paul 승인(2026-07-27, AskUserQuestion 4문항 답변) — **범위: Q51~54 전체** · **인프라: 서버리스 프록시** · **Tier 2는 나중** · **최소 버전(문법·표현 코칭)부터**. Cursor 담당(Claude는 `hub/app/**`·`api/**` 편집 금지). 오늘 있었던 `callClaude` 관련 오류 정정에 따라, 이 스펙은 jabi에 **처음으로** 생성형 AI를 연결하는 작업입니다 — 기존에 이미 있는 게 아닙니다.

---

## 배경 — 왜 필요한가

오늘 「한국어 AI 논문 모음」 13편을 리서치한 결과([`research-ai-korean-education-master-synthesis-ko.md`](research-ai-korean-education-master-synthesis-ko.md) 참고), 여러 논문이 독립적으로 "규칙 기반 채점(일관성) + 생성형 AI 코칭(유연성)" 하이브리드 구조를 최선의 설계로 제시했습니다. jabi의 `hub/app/topik2/topik2.js`는 지금 규칙 기반 절반만 있고, 생성형 AI 절반은 전혀 없습니다(`hub/app/**` 전수 확인 — 생성형 AI 호출 코드 없음). 이 스펙은 그 절반을 채웁니다.

**중요한 발견**: 이 저장소(`paul-intro`)에는 이미 다른 기능(`hub/`가 아닌 자기소개 사이트 인터뷰 기능)이 Anthropic API를 서버리스로 호출하는 **실제 작동 중인 패턴**이 있습니다 — `api/_polish.js`, `api/polish-thought.js`, `api/generate-followup.js`. 이번 스펙은 이 기존 패턴을 그대로 재사용합니다. 새 인프라를 처음부터 설계할 필요가 없습니다.

## 기존 패턴 (그대로 재사용할 것)

- 엔드포인트: `https://api.anthropic.com/v1/messages`
- 헤더: `x-api-key: <ANTHROPIC_API_KEY>` · `anthropic-version: 2023-06-01` · `Content-Type: application/json`
- 모델: `claude-sonnet-5` (이 저장소의 다른 API 함수들이 실제 쓰는 모델명 그대로)
- **Tool-use(구조화 출력)** 방식 — 자유 텍스트 대신 JSON 스키마로 강제해 파싱 신뢰도 확보 (`api/_polish.js`의 `TOOL` 객체 참고)
- 서버 측 키 부재/호출 실패 시 **조용히 폴백**(빈 결과 또는 원본 그대로) — 절대 사용자에게 에러로 노출하지 않음
- 재시도 1회(`api/_polish.js`의 `callOnce` 루프 참고)
- 공용 헬퍼는 `api/_lib.js`의 `stripModelArtifacts` 재사용(모델이 도구 호출 문자열에 태그를 흘리는 경우 정리)

**Cursor 확인 필요**: `ANTHROPIC_API_KEY`가 이 Vercel 프로젝트에 이미 설정돼 있는지 확인(다른 API 함수들이 실사용 중이므로 이미 있을 가능성이 높음). 있다면 새로 발급/설정할 필요 없음 — 기존 키를 그대로 씀.

## 신규 파일

### 1. `api/topik2-coach.js` (신규 서버리스 함수)

`api/polish-thought.js` + `api/_polish.js` 구조를 그대로 본떠서 작성:

```js
const { stripModelArtifacts } = require('./_lib');

const SYSTEM = `당신은 한국어(TOPIK) 쓰기 코치입니다. 학습자가 방금 제출한 답안에서
문법·어휘·표현(격식체 포함) 오류만 짚어주세요. 이번 버전은 최소 범위입니다 —
내용의 논리성이나 글의 구성은 다루지 마세요(다음 단계에서 별도로 추가됩니다).

원칙(반드시 지킬 것):
1. **최소 수정**: 학습자의 원문 톤·구조를 유지하고, 문제 있는 부분만 짚으세요.
   전체 글을 통째로 "더 나은 버전"으로 다시 써주지 마세요(모범답안 유출 금지).
2. **반-관대함**: 문법·표현 오류를 문맥으로 이해할 수 있다고 해서 그냥 넘어가지 마세요.
   실제로 부정확한 건 전부 짚어야 합니다. 애매하면 짚는 쪽을 택하세요.
3. **오류가 없으면 없다고 말하세요** — 억지로 지적거리를 만들지 마세요.
4. 존재하지 않는 오류를 지어내지 마세요. 원문에 실제로 있는 문제만 다루세요.
5. 격식체가 필요한 문항인데 구어체(-아요/-어요 등)를 썼다면 짚되,
   "-습니다"는 항상 적절한 표현으로 인정하세요.
6. 설명은 짧고 구체적으로 — 왜 틀렸는지 1문장, 고칠 방향 1문장.`;

const TOOL = {
  name: 'submit_coaching',
  description: '문법·표현 오류 목록을 제출한다.',
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
      summary: { type: 'string', description: '전체 총평 1문장(예: "문법은 대체로 정확하나 격식체가 흔들립니다")' },
    },
    required: ['issues', 'summary'],
  },
};

// kind: 'write-blank' | 'write-short' | 'write-essay' — 문항 유형별로 프롬프트 컨텍스트만 다르게
function buildUserMessage({ kind, prompt, text }) {
  const kindNote = kind === 'write-blank'
    ? '빈칸 채우기 문항입니다. 학습자가 쓴 문장이 문법·격식체상 자연스러운지만 보세요.'
    : kind === 'write-short'
      ? '단문(200~300자) 쓰기 문항입니다.'
      : '논술(600~700자) 쓰기 문항입니다.';
  return `${kindNote}\n\n문제: ${String(prompt || '').slice(0, 500)}\n\n학습자 답안:\n${String(text || '').slice(0, 2000)}\n\n위 답안의 문법·어휘·표현 오류만 짚어주세요.`;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(200).json({ ai: false, issues: [], summary: '' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { kind, prompt, text } = body || {};
  if (!text || !String(text).trim()) return res.status(400).json({ error: 'no text' });

  const userMsg = buildUserMessage({ kind, prompt, text });

  let input = null;
  for (let attempt = 0; attempt < 2 && !input; attempt++) {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
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
        const block = (data.content || []).find(c => c.type === 'tool_use' && c.name === 'submit_coaching');
        input = block && block.input;
      }
    } catch (e) { input = null; }
  }

  if (!input || !Array.isArray(input.issues)) {
    return res.status(200).json({ ai: false, issues: [], summary: '' });
  }

  const issues = input.issues.slice(0, 8).map(i => ({
    quote: stripModelArtifacts(String(i.quote || '').slice(0, 200)),
    problem: stripModelArtifacts(String(i.problem || '').slice(0, 300)),
    suggestion: stripModelArtifacts(String(i.suggestion || '').slice(0, 300)),
  }));
  res.status(200).json({ ai: true, issues, summary: stripModelArtifacts(String(input.summary || '').slice(0, 300)) });
};
```

이건 참고용 초안입니다 — Cursor가 그대로 쓰거나, 실제 코드 스타일(들여쓰기·따옴표 컨벤션 등)에 맞춰 다듬어도 됩니다. **핵심은 구조**(tool-use 강제 출력, 키 부재시 조용한 폴백, 재시도 1회, 8개 이슈 상한, 필드별 길이 상한)를 지키는 것입니다.

### 2. `vercel.json`(루트) — 함수 타임아웃 등록

```json
"functions": {
  "api/thoughts.js": { "maxDuration": 60 },
  "api/generate-image.js": { "maxDuration": 60 },
  "api/topik2-coach.js": { "maxDuration": 60 }
}
```
(기존 두 줄은 유지하고 한 줄만 추가)

## `hub/app/topik2/topik2.js` 변경

1. 제출 후 결과 화면에 **새 버튼** "AI 코칭 받기"(가칭, 문구는 다른 UI 라벨과 통일)를 추가 — 기존 규칙 기반 점수·이슈 패널과 **분리된 별도 패널**로 표시. 절대 기존 trait 점수를 덮어쓰거나 재계산하지 않음(순수 추가 정보).
2. 버튼 클릭 시 `fetch('/api/topik2-coach', { method: 'POST', body: JSON.stringify({ kind: q.type, prompt: pick(q.prompt), text: <학습자가 제출한 텍스트> }) })` 호출. 로딩 상태 표시.
3. 응답의 `issues[]`를 `quote`/`problem`/`suggestion` 카드 리스트로 렌더링, `summary`를 상단에 총평으로 표시. `ai: false`(키 없음/호출 실패)면 "지금은 AI 코칭을 받을 수 없습니다" 같은 조용한 안내만 표시(에러로 취급하지 않음).
4. **Q51/52(write-blank)**: 정답 매칭(`evaluateCloze`)은 그대로 규칙 기반 유지. AI 코칭 버튼은 학습자가 실제로 입력한 문장이 있을 때만 노출(빈 입력이면 버튼 비활성).
5. **Q53/54(write-short/write-essay)**: `evaluateFreeText`의 규칙 기반 채점은 그대로 유지. AI 코칭은 별도 패널.
6. 다국어 라벨(`t()` 헬퍼) 패턴을 따라 버튼·패널 텍스트에 KO/EN/ZH 문자열 추가.

## 하지 않는 것 (이번 스펙 범위 아님 — Paul이 명시적으로 보류함)

- **9항목 배점표(허영수 2024) 전체를 프롬프트에 반영하는 것** — 최소 버전(문법·표현만) 먼저, 고도화는 다음 스펙에서.
- **단계적(progressive) 다단계 프롬프트** — 이지은(2025)이 실증한 문법→구조→표현 순차 방식은 다음 단계 후보. 이번엔 단일 호출.
- **레벨별(초급/중급/고급) 코칭 UI 차등** — jabi에 이런 레벨 게이팅 자체가 없음(오늘 확인). 이번 스펙은 레벨 구분 없이 모두에게 동일 버튼 제공. 필요성이 확인되면 별도 스펙.
- **Tier 2 항목 전부**(개인화 복습, 읽기자료 난이도조정) — Paul이 이번엔 보류 결정.
- **AI가 직접 점수를 매기는 것** — 절대 금지. 오늘 조형익(2025) 논문이 GPT-5/Gemini2.5 최신 모델로도 AI-인간 채점 신뢰도가 통계적으로 무의미함을 실증했음([`research-genai-writing-assessment-ko.md`](research-genai-writing-assessment-ko.md) 참고). 이 AI 코칭 레이어는 **오직 코칭·설명용**이며 표시되는 점수(trait bar)에는 어떤 영향도 주지 않아야 함.

## 회귀·검증 체크리스트

1. `ANTHROPIC_API_KEY` 미설정 상태에서도 앱이 에러 없이 정상 작동하는지(버튼 클릭 시 조용한 폴백 메시지만).
2. Q51/52/53/54 각각 최소 1개 문항에서 AI 코칭 버튼 → 응답 렌더링까지 실제 확인.
3. 기존 규칙 기반 trait 점수가 AI 코칭 호출 전후로 변하지 않는지(별개 상태).
4. 8개 이슈 상한·필드 길이 상한이 실제로 걸리는지(과도하게 긴 응답으로 UI 깨지지 않는지).
5. `git commit`/`push`는 Paul 요청 전까지 보류(기존 Stop 라인 그대로 적용).
