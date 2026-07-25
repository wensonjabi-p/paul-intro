# 진행 상황 인덱스 (PROGRESS)

> **용도:** Claude · Cursor · Kimi 공용 상세 인덱스 — 작업별 "상태". Notion 허브·[DAILY-LOG.md](DAILY-LOG.md)와 짝.
> - 시간순 "흐름"(누가·언제·무엇)은 **[docs/DAILY-LOG.md](DAILY-LOG.md)** 에 append.
> - 작업 "상태"가 바뀌면 여기 해당 섹션 갱신 + Notion 허브 미러.
>
> **상품명:** **jabi.** (2026-07-24 Paul 확정 · 자비/잡이/길잡이). 3모드 Catch🎯 / Mercy🌟 / Guide🧭.
> **Notion 허브:** https://app.notion.com/p/Paul-PM-3a76d7c83f4480738ff0d07bfb6cadd8
> **저장소 상태:** `hub/` 전체가 브랜치 `cursor/hub-phase0-0f7e`에만 있음. PR #2 (Draft, main 미merge).
> **미푸시 로컬 커밋:** Kimi 4커밋(jabi.+3모드)은 병합으로 브랜치에 포함됨. Claude: `66bfac3`(버그수정·SRS) · `1a171b7`(Notion링크) · `27c0c44`(PROGRESS) · `7881ceb`(병합) · `53fe1f7`(랜딩 jabi.). origin이 병합에 전부 포함되어 **push는 fast-forward**(충돌 없음).

---

## 1. Phase 0 허브 (hub/ 스테이징) — 코드 완료, 배포 대기

- **무엇:** 랜딩(EN/KO) + 4개 문(Learn·Read·Teach·Shop) + placeholder(blog/teach/shop/privacy)
- **파일:** `hub/index.html`, `hub/css/hub.css`, `hub/js/i18n.js`, `hub/README.md`, `hub/vercel.json`
- **상태:** 코드 완료 · 랜딩 jabi. 톤 적용(`53fe1f7`). Vercel 배포는 Paul 액션 대기(New Project → Root Directory = `hub`).
- **링크:** [PR #2](https://github.com/wensonjabi-p/paul-intro/pull/2)
- **다음:** Vercel 연결 → 미리보기 URL → `hub/config/brand.json` 의 `domain.staging` 채우기

## 2. TOPIK I 앱 MVP — 진행 중

- **무엇:** 읽기 모의고사, streak/XP/level, 틀린 태그 → SRS v0, PWA(sw/manifest), localStorage 키 `topik-coach-v1`
- **파일:** `hub/app/index.html`, `hub/app/js/app.js`, `hub/app/css/app.css`, `hub/app/data/mock-read-01.json`, `hub/app/data/mock-read-02.json`, `hub/app/sw.js`
- **최근 작업 (Claude · 로컬 커밋 `66bfac3` · push 대기):**
  - 버그 수정 ①: 언어 토글(EN/KO)이 퀴즈/결과/SRS 도중 무조건 홈으로 튕겨 진행 중 답안을 날리던 것 → 화면 유지하며 문구만 갱신
  - 버그 수정 ②: 스트릭·SRS 날짜가 `toISOString()`(UTC) 기준이라 시차 큰 지역(항저우 UTC+8)에서 하루가 일찍/늦게 바뀌던 것 → 로컬 달력 날짜(`dateKey()`)로
  - 추가: 모의고사 2세트(`mock-read-02`), 홈 화면 모의 목록 동적화, "약점 바로 연습하기"(모든 모의에서 내 약점 태그와 겹치는 문제만 최대 8개 미니퀴즈)
  - 검증: 로컬 프리뷰에서 퀴즈 → 언어전환 → SRS 연습 전 과정 클릭 확인, 콘솔 에러 0
  - **병합 (`7881ceb`)**: Kimi의 jabi. 리브랜딩 + 3모드 온보딩(Catch/Mercy/Guide, `MODE_KEY`)을 위 수정·기능과 3-way 병합 — 둘 다 보존, 온보딩→모드→퀴즈→언어전환→SRS 전 과정 브라우저 검증
- **링크:** [PR #2](https://github.com/wensonjabi-p/paul-intro/pull/2)
- **다음:** SRS 복습 UI 고도화(간격 반복), 듣기 문항, 모의 세트 추가, Canva jabi. 로고

## 3. PM · ops 대시보드 & 링크 정리 — 진행 중

- **무엇:** `/ops` 클릭 대시보드(`ops-links.json` 읽어 마일스톤·작업·링크 버튼), `review.html`(Paul §2 확인용)
- **파일:** `hub/ops/index.html`, `hub/ops/js/ops.js`, `hub/ops/review.html`, `hub/config/ops-links.json`
- **최근 작업 (Claude · 로컬 커밋 `1a171b7` · push 대기):** 잘못된 Notion 링크(엉뚱한 "로봇뉴스 샘플" 행을 가리키던 것) 9곳을 새 PM 허브 URL로 교체
- **링크:** [PR #2](https://github.com/wensonjabi-p/paul-intro/pull/2), [Notion 허브](https://app.notion.com/p/Paul-PM-3a76d7c83f4480738ff0d07bfb6cadd8)
- **다음:** Vercel 배포 후 `/ops` URL 확정, Google Sheet·Canva URL 오면 `ops-links.json`에 넣어 버튼 활성화

## 4. 마스터 플랜 & Paul 확인(§2) — 문서 완성, Paul OK 대기

- **무엇:** Phase 0–5 전체 스펙, 결제(Lemon Squeezy), 가격, Reddit→블로그 반자동, 확정 결정 목록
- **파일:** `docs/wensonjabi-ecosystem-master-plan.md`, `docs/paul-review-ko.md`, `hub/ops/review.html`
- **상태:** 문서 완성. Paul "§2 OK" 또는 정정 대기.
- **다음:** §2 확정되면 Phase 1 진입

## 5. Cursor MCP 연동 (Notion·Canva·Google) — PC 연결 완료

- **무엇:** Cursor PC에서 MCP 로그인 → 에이전트가 Notion/Canva/Drive 조작. `paulOk` 게이트.
- **파일:** `.cursor/mcp.json`, `hub/config/integrations.json`, `docs/notion-sync-block.md`, `docs/cursor-integrations-ko.md`
- **상태:** **2026-07-25 Paul PC** Notion · Google Drive · Canva MCP ON. Notion PM 허브·§5 페이지 Cursor 동기화 완료.
- **다음:** §2 **`jabi. OK`** · Vercel URL · (선택) Map DB · Sheet/Canva URL

## 6. Phase 1 로드맵 (SRS UI · Lemon Pro · 베타 5명) — 예정

- **무엇:** SRS 복습 UI, Lemon Squeezy Pro 결제 + webhook unlock, 튜터 티저, 베타 학생 5명
- **파일(예정):** `hub/config/brand.json`(pricing), `hub/config/integrations.json`(whenAuthenticated)
- **상태:** 미착수. Phase 0 exit 후.
- **링크:** [마스터 플랜](https://github.com/wensonjabi-p/paul-intro/blob/main/docs/wensonjabi-ecosystem-master-plan.md) §Phase 1

---

## 공통 규칙

- `hub/config/ops-links.json`의 `paulOk: false` 항목은 Paul OK 전까지 코드 확장 금지.
- MCP OAuth·Vercel 연결은 Paul 본인만 가능(에이전트가 대신 못 함).
- `hub`는 merge 체크리스트 통과 전까지 `wensonjabi.com`(paul-intro) 비터치.
