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

## 1. Phase 0 허브 (hub/ 스테이징) — 배포 완료

- **무엇:** 랜딩(EN/KO/ZH) + 학습 경로 도어(한글→기초→TOPIK I→II) + More(**Games**·**글모음**·Teach·Shop) + Teach/Shop placeholder
- **파일:** `hub/index.html`, `hub/css/hub.css`, `hub/js/i18n.js`, `hub/README.md`, `hub/vercel.json`
- **테마 (2026-07-26):** **Sunstage Play** (Sunstage Clear 밝은 게임 리프레시) — `brand.json` + `:root` (`#EAF4FF` · accent `#FF8A14` · `#12C5B0` · path/xp/heart). purple/cream-terracotta 회피.
- **Games (2026-07-26):** Hub Games 도어 → `hub/app/games/` · Dictation · Cloze Race · Particle Snap · Speed Quiz · Word Scramble · Bingo Board · Listen Match · **Telephone** · Shop = 굿즈·보드 상거래 분리. 리서치 [`research-jabi-games-ko.md`](research-jabi-games-ko.md).
- **글모음 (2026-07-26 · #6):** `hub/blog/` · 학습자 질문→짧은 EN∥KO 병행 6편 · [`research-geulmoeum-content-fill-ko.md`](research-geulmoeum-content-fill-ko.md). Reddit 파이프라인 미배선.
- **상태:** 코드 완료 · 랜딩 jabi. 톤 + Sunstage P0 IA. **`jabi.` OK · Vercel 배포 완료** (2026-07-26 Claude Task A). Vercel 프로젝트 `paul-intro-hub` (Root=`hub`, branch=`cursor/hub-phase0-0f7e`, Deploy Hook 경유) → 스테이징 URL: https://paul-intro-hub-git-cursor-hub-pha-05ff42-wensonjabi-ps-projects.vercel.app
- **링크:** [PR #2](https://github.com/wensonjabi-p/paul-intro/pull/2) · [스테이징](https://paul-intro-hub-git-cursor-hub-pha-05ff42-wensonjabi-ps-projects.vercel.app)
- **다음:** Cursor **SRS v1 데모** (`hub/app/docs/SRS-DEMO-ko.md`) ✅ · Paul이 스테이징 URL 클릭 확인

## 2. TOPIK I 앱 MVP — 진행 중 (UX · Sunstage P0+P1)

- **무엇:** 읽기·듣기 연습, streak/XP/level, 틀린 태그 → SRS v0, PWA, localStorage `topik-coach-v1` · 성장형 캐릭터(설계 D1–D22)
- **파일:** `hub/app/*`, `hub/app/data/verified-read-*.json`, `verified-listen-*.json`, `hub/app/data/vocab/`, `docs/handoff-growth-character-ko.md` · 리서치 [`research-topik1-content-fill-ko.md`](research-topik1-content-fill-ko.md)
- **최근 (Cursor · 2026-07-26 Sunstage P0+P1 + 힌트 UX + research-fill #3):**
  - P0: Home XP 바+칩 · Practice Hub 안내 · Quiz 클리어/XP CTA · brand 토큰
  - P1: 온보딩 타일 · 트랙 목록 공유 크롬 · SRS 퀘스트 톤 · zh/ko 도어 · 접수 CTA · XP/칩/클리어 모션
  - **힌트 UX:** Paul 개선점 반영 — 조기 답 유출 차단 · 단계적 스캐폴드 · `docs/research-hint-ux-ko.md`
  - **research-fill #3:** listen-02 · read-04 · 도어/최종연습 카피 · click-topik 미연결
  - giyeok SVG / 획순 위젯 **미터치**
- **상태:** allowlist v1 완료. **UI 방향 = Sunstage Clear (P0+P1 · Paul 기본안 OK)**. **힌트 단계화 ✅**. **research-fill #3 ✅**. **`jabi.` OK**. giyeok **1–6 Paul OK**. **N7a 캐릭터 파이프라인 ✅**. Vercel hub URL → Claude Task A.
- **어휘:** `hub/app/data/vocab/vocab-allowlist.json` (~1742) · OOV `bank-oov-report.json` — **content_review 0** (2026-07-26 「OOV 진행」 배치 완료; surface ~34 · noise ~20)
- **링크:** [PR #2](https://github.com/wensonjabi-p/paul-intro/pull/2)
- **다음 (우선순위):** ① (Paul) Canva **ㄴ nieun** 1–6 → Cursor N7b 추적

## 3. PM · ops 대시보드 & 링크 정리 — 진행 중

- **무엇:** `/ops` 클릭 대시보드(`ops-links.json` 읽어 마일스톤·작업·링크 버튼), `review.html`(Paul §2 확인용)
- **파일:** `hub/ops/index.html`, `hub/ops/js/ops.js`, `hub/ops/review.html`, `hub/config/ops-links.json`
- **최근 작업 (Claude · 로컬 커밋 `1a171b7` · push 대기):** 잘못된 Notion 링크(엉뚱한 "로봇뉴스 샘플" 행을 가리키던 것) 9곳을 새 PM 허브 URL로 교체
- **링크:** [PR #2](https://github.com/wensonjabi-p/paul-intro/pull/2), [Notion 허브](https://app.notion.com/p/Paul-PM-3a76d7c83f4480738ff0d07bfb6cadd8)
- **/ops URL (2026-07-26):** https://paul-intro-hub-git-cursor-hub-pha-05ff42-wensonjabi-ps-projects.vercel.app/ops/
- **다음:** Google Sheet·Canva URL 오면 `ops-links.json`에 넣어 버튼 활성화

## 4. 마스터 플랜 & Paul 확인(§2) — 문서 완성, Paul OK 대기

- **무엇:** Phase 0–5 전체 스펙, 결제(Lemon Squeezy), 가격, Reddit→블로그 반자동, 확정 결정 목록
- **파일:** `docs/wensonjabi-ecosystem-master-plan.md`, `docs/paul-review-ko.md`, `hub/ops/review.html`
- **상태:** 문서 완성. **`jabi.` 브랜딩 OK** (2026-07-26). 전체 「§2 OK」는 아직 미수령(가격·도메인 등 잔여 가능).
- **다음:** 전체 §2 확정 + Vercel URL 후 Phase 1(Lemon 등) 본격 진입

## 5. Cursor MCP 연동 (Notion·Canva·Google) — PC 연결 완료

- **무엇:** Cursor PC에서 MCP 로그인 → 에이전트가 Notion/Canva/Drive 조작. `paulOk` 게이트.
- **파일:** `.cursor/mcp.json`, `hub/config/integrations.json`, `docs/notion-sync-block.md`, `docs/cursor-integrations-ko.md`
- **상태:** **2026-07-25 Paul PC** Notion · Google Drive · Canva MCP ON. Notion PM 허브·§5 페이지 Cursor 동기화 완료. **2026-07-26:** `jabi.` OK · Vercel 방향 OK · Sunstage Paul OK · chars 3–5 OK.
- **다음:** Paul **Vercel hub URL** → **Claude Task A** (`docs/claude-task-a-vercel-deploy.md`) · (선택) Map DB · Sheet/Canva URL · 전체 §2 체크는 아직 별도「§2 OK」미수령

## 6. Phase 1 로드맵 (SRS UI · Lemon Pro · 베타 5명) — 예정

- **무엇:** SRS 복습 UI, Lemon Squeezy Pro 결제 + webhook unlock, 튜터 티저, 베타 학생 5명
- **파일(예정):** `hub/config/brand.json`(pricing), `hub/config/integrations.json`(whenAuthenticated)
- **상태:** 미착수. Phase 0 exit 후. **결제(Lemon)·Phase1+ 계정은 아래 §7에서 계속 보류.** TOPIK II = scaffold + **쓰기 Q51–54** + **listen/read 파일럿** 완료 (AI 채점·Lemon 미착수).
- **링크:** [마스터 플랜](https://github.com/wensonjabi-p/paul-intro/blob/main/docs/wensonjabi-ecosystem-master-plan.md) §Phase 1

## 7. 다음 트랙 백로그 순서 (2026-07-26 Cursor 확정)

> Paul: 「전체 구성」에서 Cursor가 순서 정하고 하나씩 진행. 제안 순서(`docs/research-next-tracks-ko.md`)를 **기본 채택**.  
> **2026-07-26 갱신:** Paul 「토픽 II 진행」 → **#5a scaffold** → **쓰기 Q51–54 콘텐츠 파일럿 완료**. Lemon/결제(#5b) = 계속 보류.  
> **분담 (Paul 2026-07-26 · 루프 고정):** Claude = **brain** (Next 채움 · docs만 · 주기 리뷰) · Cursor = **hands** (큐 구현 · Done). 프로토콜 [`claude-cursor-loop-ko.md`](claude-cursor-loop-ko.md).  
> **획순:** Claude가 데이터·초기 배선 커밋 → **Cursor N9**가 Hangul 풀 연습 UI 인수 완료.  
> **Cursor 자동 체인 큐:** [docs/cursor-work-queue-ko.md](cursor-work-queue-ko.md) — Hub 도어 **#1–#7 research-fill Done** · Hangul path **v5** · **체인 pause** · N7b Canva 게이트 · Lemon/commit Stop.

| # | 항목 | 담당 | 게이트 | 상태 |
|---|------|------|--------|------|
| 1 | 트랙 순서·백로그 문서화 (PROGRESS / paul-review / DAILY) | Cursor | 없음 | **완료** |
| 2 | 한글 트랙 **스캐폴딩만** — 데이터 모델 · 레슨 목록(00–17 stub) · hub/앱 nav stub (`docs/research-hangul-track-implementation-ko.md`). 본문·획순·오디오 없음 | Cursor | 없음 | **완료** |
| 3 | Paul review / UX에서 **막히지 않은** 잔여 (OOV 노이즈 정리 선택, gitignore 정리 등). 캐릭터 SVG blur·stroke 제외 | Cursor | 항목별 | **완료** |
| 4 | 기초 수업 트랙 (주제 단원 · 대화형 유형) | Cursor | 한글 스캐폴딩 착지 후 | **완료** |
| 5a | TOPIK II 트랙 **스캐폴딩** (매니페스트·목록 UI·hub/앱 nav) | Cursor | Paul 「토픽 II 진행」 OK | **완료** |
| 5a+ | TOPIK II **콘텐츠 파일럿** (쓰기 Q51–54 원작 + stub 플레이어) | Cursor | 없음 | **완료** |
| 5b | Lemon Pro · Phase1+ 결제/계정 | — | Paul `jabi. OK`✅ · Vercel URL · 베타 신호 | **보류** (URL·베타 대기) |

- **리서치:** [다음 트랙](research-next-tracks-ko.md) · [한글 구현안](research-hangul-track-implementation-ko.md) · **[한글 콘텐츠 채움](research-hangul-content-fill-ko.md)** · **[기초 콘텐츠 채움](research-basic-content-fill-ko.md)** · **[TOPIK I 콘텐츠 채움](research-topik1-content-fill-ko.md)** · **[TOPIK II 콘텐츠 채움](research-topik2-content-fill-ko.md)** · **[글모음 콘텐츠 채움](research-geulmoeum-content-fill-ko.md)** · **[선생님 선택 채움](research-teacher-select-content-fill-ko.md)** · [TOPIK II 작문 채점](research-topik2-writing-grading-ko.md)
- **한글 스캐폴딩 산출물:** `hub/app/data/hangul/track-manifest.json` · `hub/app/hangul/` · hub Hangul door · 앱 Practice 링크
- **한글 콘텐츠 #1 (2026-07-26):** 레슨 **00–17** 전부 objective/explain/examples/task 원작 채움 · track `pilot` · `hangul.js` 모듈 렌더. 획순 02/04/05+상단 유지.
- **한글 research-fill (2026-07-26 저녁 #1 → v5):** manifest **v5** · 세종 구조+연구 근거 · 획순 학습 후 path 재수정(미리보기 묶음·`ji` denylist·pilot 크롬 제거) · [`hangul-stroke-shapes-learned-ko.md`](hangul-stroke-shapes-learned-ko.md).
- **기초 research-fill (2026-07-26 저녁 #2):** manifest **v3** `pilot` · 01–06 연구 근거 원작(세종 주제 압축+TOPIK 생존) · 도어「초안」카피 수정 · XP/crowns/MCQ 유지. 스크립트 `scripts/build-basic-research-fill.py`.
- **TOPIK I research-fill (2026-07-26 저녁 #3):** [`research-topik1-content-fill-ko.md`](research-topik1-content-fill-ko.md) · `verified-listen-02` + `verified-read-04` · 세트 제목·최종연습 카피 · Hub 도어 읽기+듣기+퀘스트 · smoke `scripts/_smoke_topik1_banks.py`.
- **TOPIK II research-fill (2026-07-26 저녁 #4):** [`research-topik2-content-fill-ko.md`](research-topik2-content-fill-ko.md) · `draft-listen/read-03` · write 51–54 +1씩 · manifest v2 · Hub 도어 형성점수 카피 · smoke `_smoke_topik2_listen_read.js` + `_smoke_topik2_scoring.js`. 형성 채점 Phase 1.1 유지 · Lemon/신경망 없음.
- **Basic content C2 (2026-07-26):** 01–02 각 6Q + objective/phrases · MCQ 플레이어 · 03–06 planned(카페·쇼핑·길·음식) · track `pilot`.
- **Basic 듀오 초안 (2026-07-26 저녁):** **01–06** 각 대화+스텝+8Q · `draft-basic-unit03~06.json` · 스킬 패스 · track `draft` → **#2에서 pilot 재채움**.
- **TOPIK II listen/read (C4+C7+#4 · 2026-07-26):** `draft-listen-01..03` · `draft-read-01..03` 각 4Q · manifest v2 pilot · topik2 MCQ + 듣기 대본 공개. 오디오 없음.
- **TOPIK II C3+#4 (2026-07-26):** write **51–54** 원작(각 3–4문항) + Phase 1.1 형성 점수. manifest v2.
- **#5a+ 파일럿:** `draft-write-51..54.json` · `topik2.js` **Phase 1.1** 형성 점수 · 축 매핑 [`topik2-writing-axis-mapping-ko.md`](topik2-writing-axis-mapping-ko.md) · AI/Lemon/신경망 없음. **listen/read 01–03 · research-fill #4 완료.**
- **다음 Cursor:** **체인 pause** · write Phase2 캘리브(Paul) · **N7b** Paul PNG. #5b Lemon = **보류**.
- **소유자 요약 — Next:** Paul = Canva ㄴ(우선) + Vercel hub URL · Hangul **Trace 수동 QA** · (선택) 커밋; Claude = 획순 QA/기획 · Task A; Cursor = **pause** (게이트 대기) · Lemon wait.
- **#3 산출물:** `.gitignore` trial/bak 보강 · OOV 분류 + **content_review 배치 완료** (surface 219→34, content **87→0**)
- **#4 산출물 (기초 트랙 스캐폴드):** `hub/app/data/basic/track-manifest.json` · `hub/app/basic/` · hub Basics door · 앱 Practice 링크 · 파일럿 `draft-basic-unit01/02`
- **#5a 산출물:** `hub/app/data/topik2/track-manifest.json` · `hub/app/topik2/` · hub TOPIK II door · 교차 링크.
- **C5 path XP (2026-07-26):** hangul/basic `localStorage` (`jabi.hangul.v1` / `jabi.basic.v1`) · 스킬 완료·체크포인트·XP HUD · TOPIK I growth XP 분리.
- **C6 Crowns polish (2026-07-26):** 노드 크라운 1–3 · 재도전 시 티어당 +3 XP(최대 3) · 체크포인트는 크라운 미범프 · 배지「다시 도전」· legacy `done`→크라운 1.
- **Games 카테고리 (2026-07-26 · #5 polish):** Hub Games 도어 · Dictation(20) + Cloze + Particle + Speed Quiz + Word Scramble + Bingo + Listen Match + Telephone · Shop≠Games · manifest v2 · [`research-jabi-games-ko.md`](research-jabi-games-ko.md).
- **글모음 #6 (2026-07-26):** [`research-geulmoeum-content-fill-ko.md`](research-geulmoeum-content-fill-ko.md) · `hub/blog/` 6편 학습자질문→EN∥KO · Hub 도어 Text collection/글모음 · smoke `_smoke_geulmoeum.js`.
- **선생님 선택 #7 (2026-07-26):** [`research-teacher-select-content-fill-ko.md`](research-teacher-select-content-fill-ko.md) · `hub/teach/` AI 보고→검증 좌석 · Paul 앵커만 실명 · Me CTA · smoke `_smoke_teacher_select.js`. **Hub research-fill 체인 #1–#7 완료 → pause.**
- **다음 Claude (brain):** 주기 Next 채움([`claude-cursor-loop-ko.md`](claude-cursor-loop-ko.md)) · Hangul Trace QA · 국어원 획순 · ㅈ 기획 · Task A (URL 후 docs). **앱 구현 금지** — Cursor 소유.
- **Notion 미러 (2026-07-26):** [PM 허브](https://app.notion.com/p/Paul-PM-3a76d7c83f4480738ff0d07bfb6cadd8) · [7. Done/Next](https://app.notion.com/p/3a96d7c83f4481ed8abce83a78bd93af) — **#7 Teach + Hub #1–#7 체인 Done · pause** sync.
- **UI 방향:** **Sunstage Clear** P0+P1 · **Paul 기본안 수락** (2026-07-26 · 다른 안은 말할 때만). 제안서: `docs/ui-ux-game-bright-proposals-ko.md`.
- **캐릭터:** giyeok **1–6 Paul OK** · **N7a 파이프라인 ✅** (`manifest` · batch script · `_check` · `CANVA-BATCH-12-ko.md`). 아트 12자 = Paul Canva.
- **획순:** `jamo-strokes-13.json` + tense · Hangul 상단 로스터 + Replay/Trace · **`ji` stub denylist** · ㅈ/ㅉ Trace 미연결. TOPIK `app.js` type:trace 미연결.
- **미커밋 로컬:** hangul content+stroke UI · basic/topik2(+Q51–54 research-fill) · giyeok SVG · OOV/gitignore · **Sunstage P0+P1** · app.js 등 (origin hub-phase와 브랜치는 동기, 위 작업은 working tree).

---

## 공통 규칙

- `hub/config/ops-links.json`의 `paulOk: false` 항목은 Paul OK 전까지 코드 확장 금지.
- MCP OAuth·Vercel 연결은 Paul 본인만 가능(에이전트가 대신 못 함).
- `hub`는 merge 체크리스트 통과 전까지 `wensonjabi.com`(paul-intro) 비터치.
