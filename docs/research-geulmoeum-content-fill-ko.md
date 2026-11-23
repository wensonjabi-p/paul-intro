# 리서치 — 글모음(Text Collection) 콘텐츠 채우기 (2026-07-26)

> **목적:** Hub More 도어 #6「글모음 / Read」를 **임의 에세이로 채우지 않고**, 학습자 질문 → 짧은 EN/KO 병행 읽기로 채우기.  
> **저작권:** Reddit·블로그·교재 **원문 복제 금지**. 질문 패턴만 참고한 **jabi. 원작** 답글.  
> **짝 문서:** [`wensonjabi-ecosystem-master-plan.md`](wensonjabi-ecosystem-master-plan.md) §3·§8 · [`paul-review-ko.md`](paul-review-ko.md) · [`research-jabi-games-ko.md`](research-jabi-games-ko.md)

---

## 1. 결론 (채우기 원칙)

1. **한 글 = 한 학습자 질문.** 주제 에세이·뉴스형 칼럼이 아님. 질문(Q) → 짧은 병행 읽기(EN∥KO) → 핵심 점 → soft CTA.
2. **병행 텍스트는 “다리”다.** Nation/Hu 계열 어휘 커버리지·이중어 도서 연구에 따르면 L1 병행은 **초·중급이 읽기를 가능하게** 한다. 다만 StoryLearning류 비판(번역이 struggle을 제거)을 받아들여 **짧은 길이·gist 우선·단어 집중 활동은 Games로 넘김**.
3. **질문 타이밍:** L1(또는 학습자 언어) **사전 질문 = 주의 유도**, **사후 통합 질문 = 구조 이해**. jabi.는 카드 앞면이 **사전 질문**, 본문이 읽기, 하단에 1–2개 **체크 질문**(선택)만.
4. **길이:** 마스터플랜 Kimi 템플릿의 800–1200단어는 **파이프라인 목표**. 이번 pilot은 **EN 180–320단어 / KO 동등 정보량** — 모바일 한 화면~스크롤 한두 번.
5. **언어 배치:** 잠정 결정(마스터 §8) = **EN + KO parallel**, 같은 주제·한 페이지 탭(또는 나란히). Reddit 섭취는 EN-first·KO 48h — **자동화는 이번 범위 밖** (`paulOk: false` pipeline).
6. **딥링크:** 글 끝 soft CTA → TOPIK 앱 `#deck=` · Games · Teach. 덱 미구현 시 toast 훅 유지(기존 `app.js`).

---

## 2. 레포 현황 (조사)

| 위치 | 상태 | 시사점 |
|------|------|--------|
| `hub/blog/index.html` | **Coming soon** placeholder | 실질 콘텐츠 0 |
| Hub 도어 `doorRead*` | EN「Blog」·KO「글모음」·짧은 Reddit 카피 | 연구 채움 후 카피 정정 필요 |
| `brand.json` → `links.blog` | `./blog/` | 경로 유지 |
| `ops-links` `phase-2-content-loop` | idea · `paulOk: false` | n8n/Sheet/Kimi **미착수** — 수동 원작만 |
| 마스터플랜 §3 | Reddit→Sheet→Kimi→publish | 설계만; 이번 fill은 **수동 파일럿** |
| Games / TOPIK 뱅크 | 높임·조사·숫자 등 태그 풍부 | 글모음 주제로 **교차 CTA** |
| `docs/templates/google-content-queue.csv` | 블로그 큐 템플릿 | 후속 Sheet용 |

**갭:** 블로그 스켈레톤만 있고 **병행 읽기 스키마·원작 글·목록 UI** 없음.

---

## 3. 출처 (패턴만)

| 출처 | 가져온 것 | 가져오지 않은 것 |
|------|-----------|------------------|
| 마스터플랜 Blog EN+KO · Reddit loop | 질문 기반 · 병행 · soft CTA · Reddit 자동 게시 금지 | n8n·Kimi 자동화 |
| bilingual books / parallel text 연구 (예: Reading in a Foreign Language — bilingual books & vocab) | L1 병행 = 초·중급 읽기 가능화 · 순서(L1→L2 vs L2→L1)는 후속 A/B | 교재 원문 |
| StoryLearning: CI vs parallel | 긴 병행 지양 · gist · 가능하면 CI | “번역 금지” 극단 |
| L1 pre-/post-reading questions (Reading & Writing 2026) | 사전 질문=속도·세부 주의 · 사후 통합=구조 | 실험 문항 복제 |
| Graded readers + word-focused tasks | 읽기만으로는 어휘 약함 → **Games/드릴로 보완** | 채점 앱 복제 |
| r/Korean · r/KoreanLanguage (공개 패턴) | 자주 나오는 **질문 유형**만 | 스레드 제목·본문 복사 |

---

## 4. 교수법 → UI 규칙

### 4-1. 글 스키마 (JSON)

- `question.en` / `question.ko` — 학습자 질문(훅)
- `reading.en` / `reading.ko` — 짧은 병행 본문 (의미 대응, 기계 번역 톤 금지)
- `keyPoints[]` — 3개 이내 불릿 (EN+KO 또는 한 언어+상대 gloss)
- `examples[]` — 1–4 예문 (ko + en gloss)
- `checkQuestions[]` (optional) — 사후 이해 1–2 (정답 스포일러는 탭 후)
- `practice` — `{ href, label }` soft CTA
- `tags` — `grammar:…` / `vocab:…` (앱·게임 연동용)
- `status`: `pilot` | `draft` | `published`
- `sourceNote`: “원작 · Reddit 미스크랩” 명시

### 4-2. 읽기 UX

1. 목록: 질문 한 줄 + 레벨 뱃지 + 태그  
2. 상세: **질문 → EN|KO 탭(또는 나란히) → key points → examples → check → CTA**  
3. 기본 탭: UI 언어가 ko면 KO 먼저, 아니면 EN 먼저 (L1-assist 취지)  
4. 긴 SEO 블로그·Pinterest 카피·Reddit 댓글 초안 = **후속 파이프라인**

### 4-3. 넣지 말 것

- Reddit/블로그/교재 원문·긴 칼럼·홍보성 하드셀  
- 학교명·개인 식별 · 자동 Reddit 게시  
- Hangul stroke / TOPIK 채점 / Games 뱅크 **회귀 수정**

---

## 5. Pilot 주제 (원작 가이드 · 6편)

| # | slug | 질문 패턴 | 연동 CTA |
|---|------|-----------|----------|
| 01 | `yo-vs-seumnida` | 요 vs 습니다 언제? | `#deck=honorifics` · Teach |
| 02 | `eunneun-iga` | 은/는 vs 이/가 | Particle Snap |
| 03 | `no-the-in-korean` | 한국어에 the가 없어요? | TOPIK I read |
| 04 | `two-number-systems` | 하나·둘 vs 일·이 | Basics 카페/쇼핑 |
| 05 | `isseoyo-vs-opseoyo` | 있어요/없어요 기본 | Cloze / Basics |
| 06 | `when-banmal` | 반말은 언제? | Teach · honorifics |

각 편: 원작 EN∥KO · 예문 원작 · 공식 TOPIK/세종 문장 복제 없음.

---

## 6. 상태·도어 카피

- 글모음 status: **`pilot`** (연구 근거 채움 · Reddit 파이프라인은 별도)  
- Hub 도어: 「학습자 질문 → 짧은 영·한 병행」· Coming soon 제거  
- EN 타이틀: **Text collection** (또는 Blog 유지 시 부제로 글모음 정체성) — KO는 **글모음** 유지  
- Next queue: **#7 선생님 선택** (`hub/teach/`)

---

## 7. 이번 fill 범위 / 비범위

| 함 | 안 함 |
|----|------|
| 리서치 문서 · manifest+6편 JSON · blog 목록/상세 UI · Hub i18n 도어 · smoke | n8n/Sheet/Kimi · Lemon · SEO 대량 발행 · Hangul/Games/TOPIK 회귀 |
