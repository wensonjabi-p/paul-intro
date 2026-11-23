# 리서치 — 선생님 선택(Teach) 콘텐츠 채우기 (2026-07-26)

> **목적:** Hub More 도어 #7「선생님 선택 / Coach option」을 **가짜 프로필·허위 자격으로 채우지 않고**, AI 학습 보고 → 검증 선생님 핸드오프 흐름으로 채우기.  
> **저작권·신뢰:** 실명·학교·자격 번호 **날조 금지**. 열린 좌석·검증 기준·대기열만.  
> **짝 문서:** [`wensonjabi-ecosystem-master-plan.md`](wensonjabi-ecosystem-master-plan.md) §Phase 1.8 · Phase 3 · [`paul-review-ko.md`](paul-review-ko.md) · [`HANDOFF-for-claude.md`](HANDOFF-for-claude.md)

---

## 1. 결론 (채우기 원칙)

1. **앱이 선생님이다.** 사람 코치는 **선택**. 마스터플랜: AI-first · tutor = external link / optional live layer.
2. **핸드오프 단위 = 짧은 트리아지 노트.** 채팅 로그 전체가 아님. 약점 태그 · 준비도 · 힌트 의존 · “이미 AI가 한 일” · 추천 세션 초점.
3. **에스컬레이션은 패턴.** 한 번 틀린 답이 아니라 반복 오답·힌트 과다·정체. (Human+AI tutoring handoff 관행)
4. **검증 선생님 = 필터 + 좌석.** MVP는 waitlist · 한국어교원 2급(또는 동등) 기준 명시 · **미검증 실명 카드 금지**.
5. **실명 앵커는 Paul만(공개 이력).** HANDOFF: 한국어교원 2급 · 항저우 강의 · Zoom 튜터. 그 외 좌석은 `open` / `waitlist`.
6. **결제·대시보드·PDF 리포트 = Phase 3 이후.** 이번 fill은 도어·흐름·스키마·대기열 스캐폴드만.

---

## 2. 레포 현황 (조사)

| 위치 | 상태 | 시사점 |
|------|------|--------|
| `hub/teach/index.html` | 짧은 waitlist placeholder (EN만) | 리서치 fill로 교체 |
| Hub 도어 `doorTeach*` | EN Coach option · KO 선생님 선택 · AI 보고 카피 | 카피 유지·정밀화 |
| `brand.json` → `links.teach` / `waitlist` | `./teach/` · Forms placeholder | waitlist URL은 stub — mailto 병행 |
| 마스터플랜 1.6–1.8 · Phase 3 | AI weekly summary · Tutor teaser · Report PDF · dashboard | teaser만 이번 범위 |
| `hub/app/js/app.js` `tagStrengthRows` | localStorage `topik-coach-v1` 약점/강점 태그 | **리포트 소스 of truth (클라이언트)** |
| Me 화면 약점 목록 | 태그 × wrongs | Teach로 soft CTA 가능 |
| Hangul/Basic `path-progress` | XP·스킬 완료 | 후속 리포트 확장용(이번엔 TOPIK I 태그 우선) |
| `ops-links` teach 항목 | 없음 | 대시보드·결제 paulOk 전 Stop |

**갭:** 핸드오프 스키마·좌석 목록·i18n teach 페이지·Me→Teach CTA 없음. 가짜 튜터 카드도 없음(올바름 — 채우지 말 것).

---

## 3. 출처 (패턴만)

| 출처 | 가져온 것 | 가져오지 않은 것 |
|------|-----------|------------------|
| 마스터플랜 Phase 3 Tutor flow | App → AI report → tutor reviews → Zoom focus → notes → focus tags | PDF 대시보드·Calendly·유료 세션 배선 |
| Human+AI handoff / triage (업계 가이드) | 짧은 action brief · why escalated · what AI tried · next action | 상용 툴 복제 |
| Co-agency / HITL tutoring (교육 연구 요약) | AI=연습 엔진 · 인간=관계·방향·고차 피드백 | “AI 대체 교사” 카피 |
| HANDOFF Paul 사실 | 한국어교원 2급 · Zoom 요금대 · 대상 학습자 | 미공개 연락처·과장 경력 |
| 국내 교원 자격 관행 | 검증 필터 문구로 **한국어교원 2급** | 자격증 번호·위조 배지 |

---

## 4. 교수법 → UI 규칙

### 4-1. AI Learner Report 스키마 (핸드오프 패킷)

```json
{
  "schemaVersion": 1,
  "generatedAt": "ISO8601",
  "source": "topik-coach-v1",
  "readinessPct": 0,
  "strengths": [{ "tag": "grammar:…", "rate": 0.8 }],
  "weaknesses": [{ "tag": "grammar:…", "wrongs": 3 }],
  "signals": {
    "hintHeavy": false,
    "stalledTags": [],
    " sparseness": "low|medium|high"
  },
  "aiAlreadyTried": ["SRS weak-deck", "mode Catch/Mercy/Guide"],
  "suggestedFocus": ["direction", "qna", "speaking", "writing"],
  "learnerNote": "optional free text (learner-authored)"
}
```

- UI는 **미리보기 카드**로 렌더. 서버 업로드·PDF는 후속.
- 데이터 없으면 “연습 후 리포트가 채워집니다” + 앱 링크.

### 4-2. 세션 초점 (선생님에게 넘기는 일)

| 초점 id | 선생님 역할 | AI가 대신 하지 않는 것 |
|---------|-------------|------------------------|
| `direction` | 주간 공부 방향·우선순위 | 무한 MCQ 생성 |
| `qna` | 막힌 개념 Q&A | 채팅 로그 재진단 |
| `speaking` | 발화·교정 | TTS 받아쓰기만 |
| `writing` | 짧은 첨삭·구성 | TOPIK II 형성점수 단독 |

### 4-3. 좌석(seat) 스키마 — 가짜 프로필 금지

- `id`, `status`: `anchor` | `open` | `waitlist`
- `focus[]` — 위 초점
- `verifyFilter` — 예: “한국어교원 2급 이상(또는 동등 검증 예정)”
- `displayName` — **anchor만 실명** (Paul). open은 “Seat A — open” 식 좌석명
- `credentialClaim` — **검증된 사실만**. 없으면 필드 생략 또는 `pending`
- `booking`: `mailto` | `waitlist` | `none` (Calendly 미배선)

### 4-4. 넣지 말 것

- 허위 대학·연수·별점·“TOPIK 만점 강사” 등 마케팅 날조  
- 튜터 마켓플레이스·즉시 결제·Lemon 연동  
- Hangul/Games/글모음/TOPIK 뱅크 **회귀 수정**  
- 학습자 localStorage를 서버로 보내는 API (동의·개인정보 후속)

---

## 5. Pilot UX (이번 fill)

1. **흐름 3단:** 앱 연습 → AI 리포트 미리보기 → 검증 좌석/대기열  
2. **좌석:** Paul anchor 1 + open seats 2–3 (자격 필터만)  
3. **CTA:** mailto waitlist · 앱 Me/연습으로 soft 링크  
4. **Hub 도어:** 「AI 학습 보고 → 검증 선생님과 방향·질문」유지 · Draft 뱃지  
5. **status:** `pilot`

---

## 6. 이번 fill 범위 / 비범위

| 함 | 안 함 |
|----|------|
| 리서치 문서 · report/seat JSON · teach UI+i18n · Me soft CTA · Hub 도어 정밀 · smoke | Phase 3 dashboard · PDF · Calendly · 유료 세션 · 가짜 강사 카드 · Lemon |

---

## 7. Hub research-fill 체인

| # | 도어 | 상태 |
|---|------|------|
| 1–6 | Hangul · Basics · TOPIK I · TOPIK II · Games · 글모음 | Done |
| **#7** | **선생님 선택** | **이번 턴** → 체인 완료 후 Notion sync · **pause** |
