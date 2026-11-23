# 리서치 — 한국어 문법 설명(Explain) UX · 데이터 (2026-07-27)

> **목적:** jabi.의 문법/설명 카피가 **교재 문단이 아니라 L2용 짧은 teach 카드**가 되도록, 평판 앱 패턴 + 레포 현황을 대조하고 **어디에 무엇을 추가할지** 고정한다.  
> **범위:** Hangul·Basics·글모음·TOPIK I `why` / teach-adjacent. **획순 Hanzi Writer 코드는 범위 밖**(별도 감사).  
> **저작권:** 세종·TTMIK·LingoDeer 등 **규칙·순서·교수법만** 참고. 교재 문장·오디오 **복제 금지**.  
> **짝 문서:** [`research-basic-content-fill-ko.md`](research-basic-content-fill-ko.md) · [`research-hangul-content-fill-ko.md`](research-hangul-content-fill-ko.md) · [`research-hint-ux-ko.md`](research-hint-ux-ko.md) · [`research-geulmoeum-content-fill-ko.md`](research-geulmoeum-content-fill-ko.md) · [`research-topik-bida-vocab-ko.md`](research-topik-bida-vocab-ko.md) (로컬 TOPIK必备单词 팩 → 테마·티어만)

---

## 1. 결론 (한 줄)

좋은 한국어 앱은 문법을 **한 카드 = 한 결정**(은/는 vs 이/가, 에 vs 에서, 받침→이에요…)으로 가르치고, 퀴즈 `why`는 **마지막에만** 정답을 이름 붙인다. jabi.는 이미 필드·배선이 있으나 **카피가 앵커 나열 수준**이라, 같은 슬롯을 **teach 카드 + 예문 + 「문법」 라벨 UI**로 채우면 된다.

---

## 2. 평판 앱이 하는 일 (패턴만)

| 앱/자료 | L2에게 쓰는 방식 | jabi.에 가져올 것 | 가져오지 말 것 |
|---------|------------------|-------------------|----------------|
| **TTMIK Core L1** | 한 레슨 = 한 포인트(은/는·이/가, -아요/어요, 에/에서…) · 짧은 예문 다수 | 단원당 1–2 포인트 · “한 결정” 카피 | 레슨 원문·예문 복제 |
| **LingoDeer** | 드릴 전 **grammar tip** 패널 · 형태+역할 한 화면 | teach 단계에 tip 블록 · 예 2–3개 | 코스 스크립트 |
| **KoreanLab** | 조사/어미 **선택 후 why** · 왜 이쪽인지 | MCQ `why`·`distractWhy`를 역할 언어로 | AI 튜터 카피 |
| **세종 문법 앱** | 패턴 소개 → 퀴즈 · 유사 문법 구분 tip | 「문법」섹션 라벨 · 유사쌍 한 줄 | 120패턴 목록 이식 |
| **PORO Grammar** | tip = 구분 힌트 · 오답 후 설명 | bottom-out `why`만 정답 공개 | 시험 은행 복제 |
| **Duolingo Tips** | 스킬 앞 짧은 tip · 교과서 아님 | Hangul `explain` = tip 카드 | Alphabet tips 원문 |

### 2-1. Teach 카드 형식 (jabi. 표준)

한 카드는 아래 4칸을 **짧게** 채운다 (총 EN ≈ 40–90단어 / KO 동등 정보량):

1. **이름** — 학습자가 기억할 라벨 (`이에요/예요`, `에 vs 에서`)
2. **결정 규칙** — if/then 한두 줄 (받침? · 새 정보? · 동작 장소?)
3. **예 2–3** — 원작 짧은 문장 + gloss
4. **함정 한 줄** — “영어 the/a로 옮기지 마세요”류 오개념 차단

교재식 장문·조음음성학·예외 전체 목록은 **Basics/Hangul 범위 밖**(글모음 FAQ나 후속 확장).

### 2-2. 퀴즈 `why` vs 힌트

| 단계 | 역할 | 정답 공개? |
|------|------|------------|
| early hint / steps | 전략·방향 | **금지** ([`research-hint-ux-ko.md`](research-hint-ux-ko.md)) |
| `distractWhy` | 왜 그 보기가 아닌지 | 부분 |
| `why` (bottom-out) | 문법 결정 + 정답 이름 | **허용(최후)** |

`why`가 `얼마예요?`처럼 **라벨만**이면 학습 가치가 없음 → **규칙 + 예**로 보강.

---

## 3. 레포 현황 (조사 요약)

| 위치 | 이미 있음 | 갭 |
|------|-----------|-----|
| `hangul/track-manifest.json` `type:explain` | 레슨당 1–2 짧은 tip · UI 렌더됨 | 라벨이 「Note」·스타일이 본문과 동일 · 받침/연음/표현은 tip이 얇음 |
| `draft-basic-unit01–06.json` `explain` + teach step | 앵커 나열(한 줄) | **teach 카드 깊이 부족** · `grammarCards` 없음 · UI「Note」 |
| 같은 뱅크 `questions[].why` | 거의 모든 문항 존재 | EN 4–20자급(“주세요.”) 다수 |
| `hub/blog/data/*` | 은/는·요/습니다·있어요 등 FAQ 6편 | **-아요/어요 · 에/에서** FAQ 없음 |
| TOPIK I `verified-*.json` `why` | hint 파이프 배선 OK | listen·일부 read가 paraphrase만 · 문법 역할 약함 |
| Hangul stroke / Hanzi Writer | 별도 | **이번 작업에서 최소 터치** |

---

## 4. 어디에 무엇을 추가할지

### 4-1. Hangul (경로 스키마 유지)

- 모듈 타입 추가 없이 `explain` / `examples`만 보강.
- 우선 레슨: **00**(음절·ㅇ 자리), **10–11**(받침·끝소리), **13–14**(겹받침·연음), **16–17**(표현 어미 맛보기).
- 선택: explain에 `label: {en,ko,zh}` (없으면 UI가 「문법」기본).
- **하지 않음:** stroke canvas / Hanzi Writer 로직 변경.

### 4-2. Basics 01–06

| Unit | 문법 카드 (필수) |
|------|------------------|
| 01 | 이에요/예요(받침) · 가벼운 은/는(주제) |
| 02 | -아요/어요 · 에(시간/목적지) vs 에서(동작 장소) |
| 03 | 주세요 · 잔 · 얼마예요 · 한자어 수+원 |
| 04 | 있어요/없어요 · 이거 · 봐도 돼요? |
| 05 | 어디예요 · 에 있어요 · 직진/돌다 |
| 06 | 주세요(음식) · 안+형 · 계산해 주세요 |

데이터: `explain` 문단 확장 + 선택 `grammarCards[]` `{id,title,body,examples[]}` · 문항 `why` 보강.  
UI: 「문법」섹션 · 카드 타이포 · 피드백 `why`에 문법 라벨.

### 4-3. 글모음

- 기존 FAQ와 겹치지 않게 **+1–2편**: (A) -아요/어요 선택 (B) 에 vs 에서.  
- 패턴: Q → EN∥KO 읽기 → keyPoints → examples → Games CTA.

### 4-4. TOPIK I

- `why`만 보강(문법 역할·왜 그 형태).  
- `steps` early scaffold / 시각 힌트 **회귀 금지**(정답 단어 선공개 금지).

### 4-5. 로컬 Bida/必备 팩 테마 (교차)

Paul 로컬 `TOPIK必备单词` 팩은 **상용 단어장 IP** → 목록 덤프 금지.  
생존 테마(주문·표·증상·여가)는 Basics 문법 훅(`주세요`, `어디예요`, `-아요/어요`)과 이미 정렬됨.  
원작 테마 JSON: `hub/app/data/vocab/jabi-theme-packs-*.json` · 상세 [`research-topik-bida-vocab-ko.md`](research-topik-bida-vocab-ko.md).

---

## 5. UI 규칙 (Sunstage)

- 섹션 라벨: **「문법」** (EN: Grammar · ZH: 语法) — “Note”보다 역할이 분명.
- Explain 블록: 배경 `var(--bg-soft)` · 왼쪽 accent bar · 예문은 KO 강조 + gloss.
- Basics 상세: `grammarCards`가 있으면 explain 문단 **위**에 카드 그리드.
- 퀴즈 피드백: `why`를 `.grammar-why`로 구분(정답 줄과 분리).
- **Lemon 테마 금지** · Sunstage 토큰 유지 (`hub/css/hub.css`).

---

## 6. 구현 체크리스트 (이번 턴)

- [x] 본 리서치 문서
- [x] Hangul explain 보강 + CSS/JS 「문법」패널
- [x] Basics 01–06 `explain`/`grammarCards`/`why` + UI
- [x] 글모음 +1–2 (`ayo-oyo`, `e-vs-eseo`)
- [x] TOPIK I thin `why` 보강
- [x] 커밋/푸시 없음 · invent queue Next 행 없음

### 6-1. Basics grammar deepen (Sibling · 2026-07-27)

**목표:** 유닛 「문법」패널에 **대조 카드 1장** (한 결정 = 한 카드) + 함정 한 줄 + 글모음 FAQ 링크. 규범 = 국립국어원/세종 **역할 구분**만(교재 문장 복제 금지).

| Unit | 대조 카드 | 규범 한 줄 | 글모음 |
|------|-----------|------------|--------|
| **01** | `eunneun-iga` 은/는↔이/가 | 주제·대조 vs 주어·새 초점 · a/the 아님 · 받침→은/이 | `#eunneun-iga` |
| **02** | `e-eseo` 에↔에서 | 시간·목적지·있어요 vs 동작 장소 · 가다→에 | `#e-vs-eseo` |
| **03** | `jan-won` 잔↔원 | 단위가 수 체계 선택 · 잔=고유어 · 원=한자어 | `#two-number-systems` |
| **04** | `isseoyo-opseoyo` 있어요↔없어요 | 존재·재고·소유 극성 · 이에요(정체)와 구분 | `#isseoyo-vs-opseoyo` |
| **05** | `e-eseo-location` 복습 | N에 있어요(위치) vs N에서 V (동작) | `#e-vs-eseo` |
| **06** | `an-adj-verb` 안+형↔안+V | 안은 부정할 말 앞 · 형/동 자리만 다름 | — (FAQ 없음) |

**스키마 확장 (기존 슬롯):** `kind:"contrast"` · `trap:{en,ko,zh}` · `related[{href,label}]`. UI: `basic.js`/`basic.css` 「함정」+ FAQ 링크. **Particle Snap CTA 미배선** (ask-paul #9).

- [x] Unit 01/02/05 대조 카드 + trap/related
- [x] Unit 03/04/06 대조 카드 + trap/related (2026-07-27 연장)
- [x] Basics UI 렌더 · 글모음 related 역링크 (03·04 포함)
- [x] invent Claude Next 없음 · 커밋/푸시 없음

---

## 7. Paul 확인 포인트

1. Hub → **한글** · 받침 1–2 / 연음 레슨 열어 「문법」카드·예문.
2. Hub → **기초** · **01** 은/는↔이/가 · **02** 에↔에서 · **05** 위치 복습 카드 · 글모음 링크.
3. **글모음** · FAQ에서 Basics로 되돌아가기.
4. TOPIK I · 도움말 1–2에 답이 안 나오는지 · 마지막 why만 문법 설명.

---

*작성: Cursor · 2026-07-27 · 커밋/푸시 없음 · deepen append 동일일*
