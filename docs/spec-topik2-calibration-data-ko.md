# 스펙 — TOPIK2 채점 검증 데이터 파이프라인 (규칙기반 vs AI vs 실제 성적)

> Paul 승인(2026-07-27, AskUserQuestion 2문항 답변 — N9와 동시 스펙 작성). Cursor 담당(Claude는 `hub/app/**`·`api/**` 편집 금지). **이건 분석·재보정 기능이 아니라 데이터를 쌓기 시작하는 로깅 파이프라인입니다** — 실제 재보정(가중치 조정, 배점 검증)은 데이터가 충분히 쌓인 뒤 별도 스펙에서.

---

## 배경

[N9(`spec-topik2-ai-coaching-layer-ko.md`)](spec-topik2-ai-coaching-layer-ko.md)에서 규칙기반 점수와 AI 참고점수를 나란히 보여주기로 했습니다. Paul 지침: *"채점을 계속 검증해 나가는 것이 이 앱의 목적 중 하나 — 학습자가 자신의 실제 TOPIK 성적을 제공하도록 하고, 그 데이터로 점점 유효한 피드백과 점수를 제공한다."* 이 스펙은 그 검증 루프의 **데이터 수집 절반**을 만듭니다(분석·재보정은 다음 단계).

## 핵심 설계 원칙

1. **계정 시스템 없이 시작** — jabi에는 현재 로그인·회원 기능이 전혀 없음(전수 확인, `hub/app/**`에 `/api/` 호출 자체가 없었음 — N9가 처음). 이번 스펙에서도 이메일·비밀번호 회원가입은 만들지 않음(스코프 아웃). 대신 **익명 지속 ID**로 같은 사용자의 여러 기록을 묶습니다.
2. **원문 텍스트는 기본적으로 저장하지 않음** — 검증에 필요한 건 "이 사용자가 여러 번 연습했을 때 규칙기반/AI 점수가 실제 성적과 얼마나 가까웠는가"라는 **숫자 상관관계**이지, 작문 원문 자체가 아닙니다. 프라이버시 부담을 최소화하기 위해 숫자만 로그합니다(원문 감사가 필요해지면 그건 별도 결정 — 아래 "열린 질문" 참고).
3. **분석 로직은 이번 스펙에 없음** — 로그를 쌓기만 함. 상관관계 계산·가중치 재보정은 데이터가 쌓인 뒤 별도 스펙.

## 1. 익명 지속 ID (`hub/app/topik2/topik2.js` 또는 공용 유틸)

```js
function getOrCreateUid() {
  const KEY = 'jabi_uid';
  let uid = localStorage.getItem(KEY);
  if (!uid) {
    uid = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2));
    localStorage.setItem(KEY, uid);
  }
  return uid;
}
```
계정도, 이메일도 아님 — 브라우저별 익명 UUID. 사용자가 로컬스토리지를 지우면 연결이 끊기는 걸 감수함(이번 단계엔 그 정도 정확도로 충분).

## 2. 코칭 로그 — `api/topik2-coach.js`(N9)에 추가

N9의 `module.exports` 마지막(응답 보내기 직전)에 추가:

```js
const { kvPushJSON } = require('./_lib');
// ... (응답 조립 이후, res.status(200).json(...) 호출 전후 중 실패해도 응답에 영향 없게 try/catch로 감싸기)
try {
  await kvPushJSON('topik2:coaching-log', {
    uid: body.uid || null,
    at: Date.now(),
    questionId: body.questionId || null,
    kind: body.kind || null,
    ruleBasedLanguageScore: body.ruleBasedLanguageScore ?? null, // 클라이언트가 자기 규칙기반 점수를 함께 보냄
    aiLanguageScore: languageScore,
  });
} catch (e) { /* 로깅 실패는 조용히 무시 — 사용자 경험에 영향 주지 않음 */ }
```

`topik2.js` 쪽에서 `/api/topik2-coach` 호출 시 body에 `uid`(위 `getOrCreateUid()`), `questionId`, `ruleBasedLanguageScore`(이미 계산된 규칙기반 language trait 값)를 추가로 실어 보내야 함.

**저장 항목에 원문 텍스트·이슈 목록은 포함하지 않음** — 숫자와 메타데이터만.

## 3. 실제 TOPIK 성적 제출 화면 (신규)

### UI
TOPIK2 트랙 어딘가(예: 결과 화면 하단 또는 별도 진입점)에 가벼운 폼:
- "실제 TOPIK 시험을 보셨나요? 결과를 알려주시면 jabi의 채점 정확도를 계속 검증하는 데 도움이 됩니다."
- 입력: 급수(3~6급 선택), 쓰기 영역 점수(숫자, 선택 입력), 응시 날짜(선택), 제출/건너뛰기 버튼.
- **명시적 opt-in** — 기본 노출은 되지만 제출 강제하지 않음, "나중에" 선택 가능.
- 제출 문구에 "완전 익명으로 저장되며, 채점 정확도 검증 목적으로만 사용됩니다" 명시.

### `api/topik2-official-score.js` (신규 서버리스 함수)

```js
const { kvPushJSON } = require('./_lib');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const { uid, level, writingScore, examDate } = body || {};
  if (!uid) return res.status(400).json({ error: 'no uid' });

  try {
    await kvPushJSON('topik2:official-scores', {
      uid,
      level: level || null,
      writingScore: typeof writingScore === 'number' ? writingScore : null,
      examDate: examDate || null,
      submittedAt: Date.now(),
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(200).json({ ok: false }); // 실패해도 사용자에게 에러로 보여주지 않음
  }
};
```

## 열린 질문 (Paul 확인 필요 — Cursor가 임의로 결정하지 말 것)

1. **데이터 보존 기간** — `topik2:coaching-log`/`topik2:official-scores`를 얼마나 오래 보관할지. 정하지 않았다면 일단 무기한 보관하되, Paul이 나중에 삭제 정책을 정할 수 있음.
2. **개인정보 처리방침 반영 여부** — 실제 성적(숫자)을 저장하는 건 가벼운 개인정보이므로, jabi에 개인정보 처리방침 페이지가 있다면 이 로깅을 명시해야 할 수 있음. 없다면 지금 만들 필요가 있는지 Paul 판단 필요(이번 스펙 범위 아님, 별도 확인).
3. **원문 텍스트 저장 여부** — 지금은 숫자만 저장하기로 했지만, 나중에 "왜 이 케이스에서 AI와 규칙기반이 크게 어긋났는지" 질적으로 감사하고 싶어지면 원문 저장이 필요해질 수 있음. 그때 별도로 opt-in 강화해서 결정.
4. **분석·재보정 시점** — 데이터가 "충분히" 쌓였다고 판단하는 기준(표본 수 등)은 지금 정하지 않음. Paul이 나중에 로그를 보고 판단.

## 회귀·검증 체크리스트

1. `topik2:coaching-log` 항목이 KV에 실제로 쌓이는지(N9 AI 코칭 호출마다 1건).
2. 성적 제출 폼 — 제출/건너뛰기 둘 다 정상 동작, 건너뛰어도 앱 사용에 지장 없는지.
3. `uid`가 브라우저 재방문 시에도 동일하게 유지되는지(localStorage 확인).
4. 로깅 실패(KV 연결 오류 등)가 사용자 경험에 전혀 영향 주지 않는지(항상 조용히 무시).
5. `git commit`/`push`는 Paul 요청 전까지 보류.
