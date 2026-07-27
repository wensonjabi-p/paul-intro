# 스펙 — TOPIK II 쓰기(51~54번) AI 코칭 레이어 신규 구축

> Paul 승인(2026-07-27, AskUserQuestion 4문항 답변) — **범위: Q51~54 전체** · **인프라: 서버리스 프록시** · **Tier 2는 나중** · **최소 버전(문법·표현 코칭)부터**. Cursor 담당(Claude는 `hub/app/**`·`api/**` 편집 금지). 오늘 있었던 `callClaude` 관련 오류 정정에 따라, 이 스펙은 jabi에 **처음으로** 생성형 AI를 연결하는 작업입니다 — 기존에 이미 있는 게 아닙니다.
>
> **[2026-07-27 개정]** 최초 버전은 "AI는 절대 점수를 매기지 않는다"는 원칙이었으나, Paul 피드백에 따라 수정. 근거였던 조형익(2025) 논문의 실제 결론은 "AI 단독 즉시 배포는 시기상조, AI 보조+검증 모델이 맞다"였지 "AI 채점 영구 금지"가 아니었음. jabi의 계획(학습자가 실제 TOPIK 성적을 제공해 계속 검증·보정)은 그 논문의 "인간 전문가 패널 대조"보다 더 강한 검증 기준(실제 시험 결과)이므로, AI 참고점수를 **지금부터 노출하되 규칙기반 점수와 분리 표시**하고, 검증 데이터 파이프라인([`spec-topik2-calibration-data-ko.md`](spec-topik2-calibration-data-ko.md), N10)을 병행 구축하는 쪽으로 전환.

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
      languageScore: { type: 'integer', description: '언어 사용(문법·어휘·격식) 측면만의 0~100 참고점수' },
      summary: { type: 'string', description: '언어 사용 측면 총평 1문장(예: "문법은 대체로 정확하나 격식체가 흔들립니다")' },
    },
    required: ['issues', 'languageScore', 'summary'],
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

  if (!input || !Array.isArray(input.issues) || typeof input.languageScore !== 'number') {
    return res.status(200).json({ ai: false, issues: [], languageScore: null, summary: '' });
  }

  const issues = input.issues.slice(0, 8).map(i => ({
    quote: stripModelArtifacts(String(i.quote || '').slice(0, 200)),
    problem: stripModelArtifacts(String(i.problem || '').slice(0, 300)),
    suggestion: stripModelArtifacts(String(i.suggestion || '').slice(0, 300)),
  }));
  const languageScore = Math.max(0, Math.min(100, Math.round(input.languageScore)));
  res.status(200).json({
    ai: true,
    issues,
    languageScore,
    summary: stripModelArtifacts(String(input.summary || '').slice(0, 300)),
  });
  // 참고: N10(검증 데이터 파이프라인)이 구현되면 이 응답을 kvPushJSON으로 로그에도 남긴다.
  // 이번 스펙(N9)에는 로깅 코드를 포함하지 않음 — N10에서 별도로 이 파일에 추가.
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

1. 제출 후 결과 화면에 **새 버튼** "AI 코칭 받기"(가칭, 문구는 다른 UI 라벨과 통일)를 추가 — 기존 규칙 기반 점수·이슈 패널과 **분리된 별도 패널**로 표시. 절대 기존 trait 점수(규칙 기반 composite)를 덮어쓰거나 재계산하지 않음.
2. 버튼 클릭 시 `fetch('/api/topik2-coach', { method: 'POST', body: JSON.stringify({ kind: q.type, prompt: pick(q.prompt), text: <학습자가 제출한 텍스트> }) })` 호출. 로딩 상태 표시.
3. 응답의 `issues[]`를 `quote`/`problem`/`suggestion` 카드 리스트로 렌더링, `summary`를 상단에 총평으로 표시.
4. **AI 참고점수 표시**: 응답의 `languageScore`를, 기존 규칙 기반 "언어" trait 바로 옆에 **별도 배지/보조 바**로 표시(예: "언어 82 · AI 참고 76"). 절대 기존 언어 trait 값을 덮어쓰지 않고, 두 숫자를 나란히 보여줘서 "규칙 기반 채점 vs AI 추정치"를 학습자가 직접 비교할 수 있게 함. 라벨에 "참고용" 임을 명확히(툴팁 또는 작은 글씨로 "규칙기반 채점과 다를 수 있음, 계속 검증 중").
5. `ai: false`(키 없음/호출 실패)면 "지금은 AI 코칭을 받을 수 없습니다" 같은 조용한 안내만 표시(에러로 취급하지 않음), AI 참고점수 배지는 숨김.
6. **Q51/52(write-blank)**: 정답 매칭(`evaluateCloze`)은 그대로 규칙 기반 유지. AI 코칭 버튼은 학습자가 실제로 입력한 문장이 있을 때만 노출(빈 입력이면 버튼 비활성). Q51/52는 원래 language 비중이 15%뿐이라, AI 참고점수 배지는 표시하되 상대적으로 덜 강조(작게).
7. **Q53/54(write-short/write-essay)**: `evaluateFreeText`의 규칙 기반 채점은 그대로 유지. AI 코칭 패널 + 언어 trait 옆 AI 참고점수 배지.
8. 다국어 라벨(`t()` 헬퍼) 패턴을 따라 버튼·패널·배지 텍스트에 KO/EN/ZH 문자열 추가.

## 하지 않는 것 (이번 스펙 범위 아님 — Paul이 명시적으로 보류함)

- **9항목 배점표(허영수 2024) 전체를 프롬프트에 반영하는 것** — 최소 버전(문법·표현만) 먼저, 고도화는 다음 스펙에서.
- **단계적(progressive) 다단계 프롬프트** — 이지은(2025)이 실증한 문법→구조→표현 순차 방식은 다음 단계 후보. 이번엔 단일 호출.
- **레벨별(초급/중급/고급) 코칭 UI 차등** — jabi에 이런 레벨 게이팅 자체가 없음(오늘 확인). 이번 스펙은 레벨 구분 없이 모두에게 동일 버튼 제공. 필요성이 확인되면 별도 스펙.
- **Tier 2 항목 전부**(개인화 복습, 읽기자료 난이도조정) — Paul이 이번엔 보류 결정.
- **content·organization AI 참고점수** — 이번 버전은 language 축만 AI가 추정. 내용·구조까지 AI가 점수 매기는 건 코칭 범위가 넓어진 뒤(다음 스펙) 진행.
- **AI 참고점수로 규칙기반 점수를 대체하는 것** — 이번엔 나란히 표시만 하고, 어느 쪽이 "진짜 점수"인지는 아직 결정하지 않음. N10(검증 데이터)이 쌓이기 전까지는 규칙 기반 점수가 계속 대표 점수(trait bar) 역할을 유지.

> **채점 원칙(개정)**: AI가 점수를 내는 것 자체는 금지하지 않습니다. 다만 검증 데이터 없이 AI 점수를 "공식 점수"처럼 단독 노출하지 않고, 규칙기반 점수와 나란히 "참고용"으로 투명하게 보여주면서 [N10 검증 파이프라인](spec-topik2-calibration-data-ko.md)으로 실제 TOPIK 결과 대비 정확도를 계속 검증해 나갑니다 — 조형익(2025)이 권고한 "AI 보조+검증" 모델을, 전문가 패널보다 강한 기준(실제 시험 결과)으로 구현하는 것.

## 회귀·검증 체크리스트

1. `ANTHROPIC_API_KEY` 미설정 상태에서도 앱이 에러 없이 정상 작동하는지(버튼 클릭 시 조용한 폴백 메시지만, AI 참고점수 배지 숨김).
2. Q51/52/53/54 각각 최소 1개 문항에서 AI 코칭 버튼 → 응답 렌더링 → AI 참고점수 배지 표시까지 실제 확인.
3. 기존 규칙 기반 trait 점수가 AI 코칭 호출 전후로 변하지 않는지(별개 상태, AI 참고점수는 옆에 추가로만 붙음).
4. 8개 이슈 상한·필드 길이 상한이 실제로 걸리는지(과도하게 긴 응답으로 UI 깨지지 않는지). `languageScore`가 0~100 범위를 벗어나면 서버에서 clamp되는지.
5. `git commit`/`push`는 Paul 요청 전까지 보류(기존 Stop 라인 그대로 적용).

## 후속 — N10과의 연결

이 스펙(N9)은 로깅 코드를 포함하지 않습니다. [`spec-topik2-calibration-data-ko.md`](spec-topik2-calibration-data-ko.md)(N10)가 먼저 또는 나란히 구현되면, `api/topik2-coach.js`의 응답 직전에 `kvPushJSON`으로 규칙기반 점수+AI 참고점수+익명 세션ID를 로그에 남기는 코드를 추가합니다(N10 스펙에 정확한 스키마 있음). N9만 먼저 구현해도 기능은 완결되며, N10은 검증 데이터를 쌓기 시작하는 별도 레이어입니다.
