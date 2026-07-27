# jabi. Daily Log

> 실시간 동기화용 append-only 로그. 최신 항목이 위에 옵니다.
> Kimi / Claude / Paul 모두 자유롭게 추가하세요.
>
> **추적 3종 역할 (중복 금지):**
> - **이 파일(DAILY-LOG.md)** = 시간순 "흐름" 로그(누가·언제·무엇). 매 작업 후 여기 append.
> - **[docs/PROGRESS.md](PROGRESS.md)** = 작업별 "상태" 스냅샷(각 항목의 현재 상태·파일·다음). 상태 바뀔 때 갱신.
> - **Notion 허브** = 사람용 대시보드(이 로그를 "작업 로그"에, PROGRESS를 "작업 상세" 하위 페이지에 미러). https://app.notion.com/p/Paul-PM-3a76d7c83f4480738ff0d07bfb6cadd8

---

## 2026-07-27

### Claude (328개 파일 일괄 커밋·푸시 + TOPIK II 재검토 -> 3탭 구조 재설계 확정 + N14-16 재큐잉)
- Paul 승인으로 그동안 커밋된 적 없던 328개 파일(TOPIK II/Basics/Games 8종/Blog/Teach/한글아트에셋/어휘데이터/QA스크립트 전체) 일괄 커밋+푸시 완료 -- 데이터 유실 위험 해소.
- 큐 드리프트 발견: 이전에 큐잉한 N11/N12/N13(UI/UX 스펙)이 Cursor의 로컬 큐 편집이 먼저 잡히면서 자리 없이 "Claude 작성 중" 플레이스홀더로 덮여 있었음. 또한 "N11"이 과거 이력(Notion sync)에 이미 쓰인 번호라 충돌 확인 -- N14/N15/N16으로 재번호 부여.
- Paul 지시로 TOPIK II 라이브 재검토: SpecPartner가 새로 넣은 캐릭터/XP 위젯이 목록 화면 맨 위에 얹혀 TOPIK I(Home/Practice/Me 3탭 분리)과의 구조 격차가 기존 N12 스펙(목록만 개선) 작성 시점보다 커졌음을 확인.
- docs/spec-topik2-topik1-format-detailed-ko.md 신규 작성 -- 옵션 A(목록만 개선) vs 옵션 B(Home/Practice/Me 3탭 전면 재구성) 비교, AskUserQuestion으로 확인 -> 옵션 B 확정.
- cursor-work-queue-ko.md Next 재정비: N14(Basics PPT슬라이드) · N15(TOPIK II 3탭 재구성, 기존 목록전용 스펙 대체) · N16(온보딩분리, N15 Me탭과 연계) 큐잉. N8/N9/N10은 Cursor가 이미 Done 처리한 것 확인(코드로 직접 검증 -- write-54 가중치 0.66/0.15/0.19 반영됨, api/topik2-coach.js·api/topik2-official-score.js 스펙대로 구현 확인).
- hub/app/** 미편집(리뷰·큐 정리만).

### Cursor (SpecPartner-4 · 설정 · Paul 승인)
- ✅ Me 「설정」: 모국어·응시지역·학습량·하루시간 드롭다운 즉시 저장.
- ✅ 트랙별 학습 짝 다시 고르기(한글/기초/TOPIK I/II) · XP 유지 · 시트 피커 · 온보딩 전체 리셋 버튼 유지.
- ✅ cache `app.js`/`app.css?v=20260727b` · **SpecPartner §4 1–4 닫힘** · 커밋/푸시 없음.
- ⏭ **Next:** Claude Next / UI/UX 스펙 대기 · invent 금지 · Sibling 동결.

### Cursor (SpecPartner-3 · 명예의 전당 · Paul 승인)
- ✅ TOPIK I Me 탭: 한글·기초·TOPIK I·TOPIK II 4카드 · 미시작 빈 슬롯 · stage 6 MAX 금테 상단.
- ✅ LS 읽기: `jabi.hangul.v1` / `jabi.basic.v1` / `topik-coach-v1`(state) / `jabi.topik2.v1` · 아트·XP바 · EN/KO/ZH.
- ✅ cache `app.js`/`app.css?v=20260727a` · 커밋/푸시 없음.
- ⏭ **Paul:** 앱 「나」 탭 smoke. **Next Now:** SpecPartner-4 설정.

### Cursor (SpecPartner-2 · 한글·기초 partner · Paul 승인)
- ✅ `path-progress.js`: `partner:{id,glyph,stage}` + `proUnlock` 보존 · XP 변동 시 stage sync · `getPartner` / `STAGE_XP_FLOORS`.
- ✅ 공유 `partner-sector.js` + `partner-sector.css` — 진입 시 자음 짝 · 성장 배지(XP바·칩) · free cap 2.
- ✅ hangul / basic index·js 배선 · 스킬 완료 후 배지 refresh · cache-bust · 커밋/푸시 없음.
- ⏭ **Paul:** `/app/hangul/` · `/app/basic/` 짝 고르기 smoke. **Next Now:** SpecPartner-3 명예의 전당.

### Cursor (SpecPartner-1 · TOPIK II partner 성장 · Paul 첫 슬라이스)
- ✅ `jabi.topik2.v1` — `{ xp, partner:{id,glyph,stage}, awarded, proUnlock }` · TOPIK I `topik-coach-v1` / path-progress 미터치.
- ✅ 첫 진입 시 자음 짝 고르기(13, ㅈ 제외) · 홈 배지+XP바+스테이지칩 · floors `[0,100,250,450,700,1000]` · free cap 2.
- ✅ XP: MCQ 정답 +10(문항당 1회) · 쓰기/클로즈 composite≥45→7 / ≥75→10(업그레이드 허용).
- ✅ `topik2.js`/`css`/`index.html` · cache `?v=20260727a` · 커밋/푸시 없음.
- ⏭ **Paul:** `/app/topik2/` 짝 고르기→연습 XP smoke. **Next Now:** SpecPartner-2(한글·기초) — 규모 큼, 진행 확인.

### Cursor (S1jieut · ㅈ 획순 로스터 배선 · Paul 승인)
- ✅ `hangul.js`: `ROSTER_PARTNERS`(13, ㅈ 없음) vs `ROSTER_STROKE`(14, ㅅ 다음 `{ㅈ, jieut}`) 분리 · 획순 허브=`ROSTER_STROKE`.
- ✅ `STROKE_STUB_IDS` 비움 · `GLYPH_TO_ID`는 stroke+tense · i18n EN/KO/ZH 「자음 14」 · `app.js` PARTNER_JAMOS(13) 미터치.
- ✅ strokes README 「다음 단계」§1 Done · cache-bust `hangul.js?v=20260727f` · 커밋/푸시 없음.
- ⏭ **Paul:** Hangul에서 ㅈ Replay·Trace 육안. **Next Now:** SpecPartner(규모 큼 — 슬라이스 확인) 또는 Claude UI/UX 스펙 대기 · Sibling 동결.

### Cursor (N10 · 채점 검증 데이터 파이프라인 · Paul 승인)
- ✅ `jabi_uid` 익명 UUID (localStorage) · AI 코칭 요청에 `uid`/`questionId`/`ruleBasedLanguageScore` 포함.
- ✅ `api/topik2-coach.js` → `kvPushJSON('topik2:coaching-log')` (숫자·메타만, 원문/이슈 미저장) · 실패 시 조용히 무시.
- ✅ `api/topik2-official-score.js` + TOPIK II 트랙 하단 opt-in 폼(급수·쓰기점수·응시일 · 제출/나중에).
- ✅ 보존기간·개인정보 방침·원문 저장·재보정 시점은 스펙 **열린 질문**으로 유지(임의 결정 없음) · 커밋/푸시 없음.
- ⏭ **Next:** 큐 Next N8–N10 비움 → Now(S1jieut/SpecPartner) 또는 Claude UI/UX 스펙 착지 대기 · Sibling 동결.

### Cursor (N9 · TOPIK II AI 코칭 레이어 · Paul 승인)
- ✅ `api/topik2-coach.js` 신규 — Anthropic tool-use · 재시도 1 · 키 없으면 `{ai:false}` 조용 폴백 · issues≤8 · languageScore clamp.
- ✅ `vercel.json` `api/topik2-coach.js` maxDuration 60.
- ✅ `hub/app/topik2/topik2.js` — 제출 후 **AI 코칭 받기** 패널 · 규칙 trait 불변 · 언어 옆 **AI 참고** 배지 · KO/EN/ZH · cloze는 배지 compact.
- ✅ `topik2.css` 코칭 패널/배지 스타일 · hangul.js 무변경 · 커밋/푸시 없음 · N10 로깅 미포함.
- ⏭ **Next:** **N10** 검증 데이터 파이프라인.

### Cursor (우선순위 재정렬 + N8 Done · Paul/Claude 지시)
- ✅ Sibling(테마 팩 crossfill) **후순위 동결** — Next 있을 때 집지 않음 · warn-caution particle 중단 유지.
- ✅ 큐 우선순위 명시: **Next N8→N9→N10 ≫ Now(S1jieut·SpecPartner) ≫ Sibling**.
- ✅ Next에 **N9**(AI 코칭)·**N10**(검증 파이프라인) 등록(스펙 승인 반영). UI/UX는 Claude 스펙 작성 슬롯만(invent 금지).
- ✅ **N8 Done:** `draft-write-54.json` traits **0.66 / 0.15 / 0.19** ([`spec-topik2-write54-trait-reweight-ko.md`](spec-topik2-write54-trait-reweight-ko.md)) · `resolveTraits` bank 우선 · hangul.js 무변경 · 커밋/푸시 없음.
- ⏭ **Next:** **N9** AI 코칭 레이어 · 그다음 N10.

### Cursor (ThemeSm58 close · 전 8 complain chip SHOW · Paul offline)
- ✅ ThemeSm58: 전 8 `theme_complain` KO **불만** / ZH **不满** / EN Complain + THEME_ORDER.
- ✅ complainTagged=**10**×6(speed+cloze+bingo+listen+particle+dictation) + **8**×2(tel+scramble) + `themes` → smoke **전 8 SHOW** · `_smoke-complain-focus.js` PASS.
- ✅ Distinct emotion/housing/problem/opinion/compare/refuse/apology · bothTags=0 · hangul.js 미터치 · 커밋/푸시 없음 · invent Claude Next 없음.
- ✅ **complain-dissatisfaction 스윕 닫힘 (ThemeSm58)**.
- ⏭ **Next:** Claude Next만 (Cursor invent 금지) · sibling 큐 complain 닫힘. Claude Now/Next 비어 있음 확인.

### Cursor (complain-dissatisfaction → particle/dictation(+tel/scramble) +10/+8 · Paul offline)
- ✅ particle **v64=636** · dictation **v66=642** · tel **v63=585** · scramble **v63=587** · **+10/+10/+8/+8** (ps-627–636 · d-633–642 · tel-578–585 · ws-580–587) · themes `complain` · complainTagged **10/10/8/8**
- ✅ Prefer **이의·하소연** residual · Prefer-adjacent **항의·신고하다·불만·따지다** on tel/scramble · 불평·항의하다 tel/scramble
- ✅ Distinct problem/opinion/apology/refuse/emotion · NIKL/Sejong · 해요체 · ThemeSm/칩 미터치 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v252**
- ⏭ **Next:** Suggest **ThemeSm close only** (전 8 complain chip · invent Next 금지)

### Cursor (complain-dissatisfaction → bingo/listen +10 · Paul offline)
- ✅ bingo **v70=687** · listen **v70=654** · **+10/+10** (bg-678–687 · lm-645–654) · themes `complain` · complainTagged **10**×2
- ✅ Prefer **항의·신고하다·불만·따지다** · 불평하다·항의하다·제기하다·하소연하다·불만스럽다·불평 포함 · Skip 이의·하소연 → cloze Done
- ✅ Distinct problem/opinion/apology/refuse/emotion · NIKL/Sejong · 해요체 · ThemeSm/칩 미터치 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v251**
- ⏭ **Next:** Suggest **particle/dictation** only → **Done** (particle/dictation(+tel/scramble))

### Cursor (complain-dissatisfaction → cloze +10 · Paul offline)
- ✅ cloze **v64=632** · **+10** (c-623–632) · themes `complain` · complainTagged **10**
- ✅ Prefer **이의·하소연** · 불평하다·항의하다·따지다·제기하다·하소연하다·불만스럽다·불만·불평 포함
- ✅ Distinct emotion/housing/problem/opinion/compare/refuse/apology · NIKL/Sejong · 해요체 · ThemeSm/칩 미터치 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v250**
- ⏭ **Next:** Suggest **bingo/listen** +8–10 (Prefer **항의·신고하다·불만·따지다**)

### Cursor (중급 complain-dissatisfaction 1팩 + speed +10 · Paul offline)
- ✅ intermediate **v64** · pack **complain-dissatisfaction** 12 (불평하다·항의하다·따지다·제기하다·하소연하다·불만스럽다·불만·불평·항의·신고하다·이의·하소연) · themes `complain`
- ✅ speed **v64=640** · **+10** (sq-631–640) · complainTagged **10** · Prefer **이의·하소연** → cloze
- ✅ Distinct emotion/housing/problem/opinion/compare/refuse/apology/favor · NIKL/Sejong · 해요체 · chip 제안 KO **불만** / ZH **不满** · ThemeSm/칩 미터치 · manifest **v249**
- ✅ hangul.js 미터치 · 커밋/푸시 없음
- ⏭ **Next:** cloze only (Prefer **이의·하소연**)

### Cursor (ThemeSm57 close · 전 8 refuse chip SHOW · Paul offline)
- ✅ ThemeSm57a 라벨/ORDER 재사용 → 전 8 `theme_refuse` KO **거절** / ZH **拒绝** / EN Refuse + THEME_ORDER.
- ✅ refuseTagged=**10**×6(speed+cloze+bingo+listen+particle+dictation) + **8**×2(tel+scramble) + `themes` → smoke **전 8 SHOW** · `_smoke-refuse-focus.js` PASS.
- ✅ Distinct opinion/compare/rules/promise/favor/advice/apology/speech · bothTags=0 · hangul.js 미터치 · 커밋/푸시 없음 · invent Claude Next 없음.
- ✅ **refuse-accept 스윕 닫힘 (ThemeSm57)**.
- ⏭ **Next:** Claude Next만 (Cursor invent 금지) · sibling 큐 refuse 닫힘.

### Cursor (refuse-accept → particle/dictation(+tel/scramble) · Paul offline)
- ✅ particle **v63=626** · dictation **v65=632** · tel **v62=577** · scramble **v62=579** · **+10/+10/+8/+8** (ps-617–626 · d-623–632 · tel-570–577 · ws-572–579) · themes `refuse` · refuseTagged **10/10/8/8**.
- ✅ Prefer **승낙·거부** residual · Prefer-adjacent **거절하다·수락하다·응하다·승인하다** on tel/scramble · 받아들이다·사양하다·승낙하다·거부하다·승인하다·거절·수락.
- ✅ Distinct favor/rules/apology/promise/advice · NIKL/Sejong · 해요체 · ThemeSm/칩 미터치 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v248**.
- ⏭ **Next:** Suggest **ThemeSm close only** (전 8 refuse chip · invent Next 금지). → **Done** (ThemeSm57).

### Cursor (refuse-accept → bingo/listen +10 · Paul offline)
- ✅ bingo **v69=677** · listen **v69=644** · **+10/+10** (bg-668–677 · lm-635–644) · themes `refuse` · refuseTagged **10**×2.
- ✅ Prefer **거절하다·수락하다·응하다·승인하다** · 받아들이다·사양하다·승낙하다·거부하다·거절·수락 · Skip **승낙·거부** → cloze Done.
- ✅ Distinct favor/rules/apology/promise/advice · NIKL/Sejong · 해요체 · ThemeSm/칩·particle 미터치 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v247**.
- ⏭ **Next:** Suggest **particle/dictation** +8–10.

### Cursor (refuse-accept → cloze +10 · Paul offline)
- ✅ cloze **v63=622** · **+10** (c-613–622) · themes `refuse` · refuseTagged **10**.
- ✅ Prefer **승낙·거부** · 승낙하다·거부하다·거절하다·수락하다·받아들이다·사양하다·거절·수락 포함.
- ✅ Distinct opinion/compare/rules/promise/favor/advice/apology/speech · NIKL/Sejong · 해요체 · ThemeSm/칩 미터치 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v246**.
- ⏭ **Next:** Suggest **bingo/listen** +8–10 (Prefer **거절하다·수락하다·응하다·승인하다**).

### Cursor (중급 refuse-accept 1팩 + speed +10 · Paul offline)
- ✅ intermediate **v63** · pack **refuse-accept** 12 (거절하다·수락하다·받아들이다·사양하다·승낙하다·거부하다·응하다·승인하다·거절·수락·승낙·거부) · themes `refuse`
- ✅ speed **v63=630** · **+10** (sq-621–630) · refuseTagged **10** · Prefer **승낙·거부** → cloze Done
- ✅ Distinct opinion/compare/rules/promise/favor/advice/apology/speech · NIKL/Sejong · 해요체 · chip KO **거절** / ZH **拒绝** · speed.js THEME_ORDER+라벨 · manifest **v245**
- ✅ hangul.js 미터치 · 커밋/푸시 없음
- ⏭ **Next:** cloze Done · Suggest bingo/listen

### Cursor (promise-trust → particle/dictation(+tel/scramble) · ThemeSm56d close · Paul offline)
- ✅ particle **v62=616** · dictation **v64=622** · tel **v61=569** · scramble **v61=571** · **+10/+10/+8/+8** (ps-607–616 · d-613–622 · tel-562–569 · ws-564–571) · themes `promise` · promiseTagged **10/10/8/8**.
- ✅ Prefer **진실·거짓말** residual · Prefer-adjacent **약속하다·신뢰·정직하다** on tel/scramble · 확신하다·의심하다·정직하다·증명하다·속이다·보장하다·의심.
- ✅ Distinct think/rules/time/personality/favor/encourage · NIKL/Sejong · 해요체 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v244**.
- ✅ smoke **8/8 SHOW** · chip KO **약속** / ZH **约定** · **ThemeSm56d close**.
- ⏭ **Next:** invent Claude Next 금지 · promise-trust sibling 닫힘.

### Cursor (ThemeSm56c bingo/listen promise chip SHOW · Paul offline)
- ✅ bingo/listen promiseTagged=**10** + `themes` → 칩 KO **약속** / ZH **约定** · ThemeSm56a 라벨/ORDER 재사용.
- ✅ smoke **4 SHOW** (speed+cloze+bingo+listen) · empty 4 HIDE · think/rules/time/personality/favor/encourage 별개.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Claude Next 없음.
- ⏭ **Next (sibling):** promise-trust → particle/dictation(+tel/scramble) +8–10 (Prefer **진실·거짓말** residual) · ThemeSm56d close.

### Cursor (promise-trust → bingo/listen +10 · ThemeSm56 · Paul offline)
- ✅ bingo **v68=667** · listen **v68=634** · **+10/+10** (bg-658–667 · lm-625–634) · themes `promise` · promiseTagged **10**×2.
- ✅ Prefer **약속하다·신뢰·정직하다** · 신뢰하다·확신하다·의심하다·속이다·보장하다·증명하다·의심 · Skip 진실·거짓말 → cloze Done.
- ✅ Distinct think/rules/time/personality/favor/encourage · NIKL/Sejong · 해요체 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v243**.
- ✅ smoke **4 SHOW** (speed+cloze+bingo+listen) · empty 4 HIDE · chip KO **약속** / ZH **约定**.
- ⏭ **Next:** Suggest **particle/dictation(+tel/scramble)** +8–10 (Prefer **진실·거짓말** residual) · ThemeSm56c Done.

### Cursor (ThemeSm56b cloze promise chip SHOW · Paul offline)
- ✅ cloze promiseTagged=**10** (c-603–612) + `themes` → 칩 KO **약속** / ZH **约定** · ThemeSm56a 라벨/ORDER 재사용.
- ✅ smoke **2 SHOW** (speed+cloze) · empty 6 HIDE · think/rules/time/personality/favor/encourage 별개.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Claude Next 없음.
- ⏭ **Next (sibling):** bingo/listen Done · particle/dictation.

### Cursor (promise-trust → cloze +10 · ThemeSm56a · Paul offline)
- ✅ cloze **v62=612** · **+10** (c-603–612) · themes `promise` · promiseTagged **10**.
- ✅ Prefer **진실·거짓말** · 신뢰하다·확신하다·의심하다·속이다·보장하다·증명하다 포함 · Distinct think/rules/time/personality/favor/encourage.
- ✅ chip KO **약속** / ZH **约定** · NIKL/Sejong · 해요체 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v242**.
- ⏭ **Next:** Suggest **bingo/listen** +8–10 (Prefer **약속하다·신뢰·정직하다**) · ThemeSm56b cloze chip SHOW.

### Cursor (ThemeSm56a speed promise chip SHOW · Paul offline)
- ✅ 칩 KO **약속** / ZH **约定** / EN Promise · THEME_ORDER 전 8 · speed promiseTagged=**10** + `themes` → 칩 활성.
- ✅ smoke **1 SHOW** (speed) · empty 7 HIDE · think/rules/time/personality/favor/encourage 별개.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Claude Next 없음.
- ⏭ **Next (sibling):** cloze Done · bingo/listen.

### Cursor (중급 promise-trust 1팩 + speed +10 · Paul offline)
- intermediate **v62** · pack **promise-trust** 12 (약속하다·신뢰하다·확신하다·의심하다·속이다·정직하다·보장하다·증명하다·신뢰·의심·진실·거짓말) · themes `promise`
- speed **v62=620** · promiseTagged **10** · sq-611–620 · Prefer **진실·거짓말** → cloze Done · chip KO **약속** / ZH **约定** · ThemeSm56a Done
- think/rules/time/personality/favor/encourage와 lemma 분리 · NIKL/Sejong · 해요체 · 브랜드 없음 · hangul.js 무변경 · 커밋/푸시 없음

### Cursor (encourage-support → particle/dictation(+tel/scramble) · ThemeSm55d close · Paul offline)
- ✅ particle **v61=606** · dictation **v63=612** · tel **v60=561** · scramble **v60=563** · **+10/+10/+8/+8**.
- ✅ encourageTagged **10/10/8/8** · Prefer **격려·위로** residual · Prefer-adjacent **응원·지지** on tel/scramble.
- ✅ chip KO **격려** / ZH **鼓励** · ThemeSm55d close (전 8 encourage chip) · Distinct advice/favor/success/opinion/emotion/friends.
- ✅ NIKL/Sejong · 해요체 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v240**.
- ⏭ **Next:** Suggest **ThemeSm55d close** — Claude Next만 (invent 금지). Sibling: SpecPartner / S1jieut.

### Cursor (ThemeSm55c bingo/listen encourage chip SHOW · Paul offline)
- ✅ bingo **v67=657** · listen **v67=624** · encourageTagged=**10**×2 (bg-648–657 · lm-615–624) + `themes` → 칩 KO **격려** / ZH **鼓励** · ThemeSm55a 라벨/ORDER 재사용.
- ✅ smoke **4 SHOW** (speed+cloze+bingo+listen) · empty 4 HIDE · advice/favor/success/opinion 별개.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Claude Next 없음.
- ⏭ **Next (sibling):** particle/dictation(+tel/scramble) +8–10 (Prefer **격려·위로** residual) · ThemeSm55d close.

### Cursor (ThemeSm55b cloze encourage chip SHOW · Paul offline)
- ✅ cloze encourageTagged=**10** (c-593–602) + `themes` → 칩 KO **격려** / ZH **鼓励** · ThemeSm55a 라벨/ORDER 재사용.
- ✅ smoke **2 SHOW** (speed+cloze) · empty 6 HIDE · advice/favor/success/opinion 별개.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Claude Next 없음.
- ⏭ **Next (sibling):** bingo/listen +8–10 (Prefer **응원·지지**) · ThemeSm55c.

### Cursor (encourage-support → cloze +10 · ThemeSm55a · Paul offline)
- ✅ cloze **v61=602** · **+10** (c-593–602) · themes `encourage` · encourageTagged **10**.
- ✅ Prefer **격려·위로** · 격려하다·위로하다·배려하다·든든하다·안심하다·의지하다 · Skip **응원·지지** → bingo/listen.
- ✅ chip KO **격려** / ZH **鼓励** · ThemeSm55a (speed) → ThemeSm55b (cloze confirm) · Distinct advice/favor/success/opinion/emotion/friends.
- ✅ NIKL/Sejong · 해요체 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v238**.
- ⏭ **Next:** ThemeSm55b cloze chip Done → bingo/listen +8–10 (Prefer **응원·지지**) · ThemeSm55c.

### Cursor (중급 encourage-support 1팩 + speed +10 · Paul offline)
- ✅ intermediate **v61=724** · pack **encourage-support** 12 (격려하다·응원하다·지지하다·위로하다·의지하다·배려하다·든든하다·안심하다·응원·지지·격려·위로).
- ✅ speed **v61=610** · **+10** (sq-601–610) · themes `encourage` · encourageTagged **10**.
- ✅ Prefer **격려·위로** → cloze · chip 제안 KO **격려** / ZH **鼓励** · Suggest ThemeSm55a.
- ✅ Distinct advice/favor/success/opinion/emotion/friends/sports · NIKL/Sejong · 해요체 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v237**.
- ⏭ **Next:** cloze +8–10 (Prefer 격려·위로) + ThemeSm55a.

### Cursor (advice-counsel → particle/dictation(+tel/scramble) · ThemeSm54d close · Paul offline)
- ✅ particle **v60=596** · **+10** (ps-587–596) · dictation **v62=602** · **+10** (d-593–602) · tel **v59=553** · **+8** (tel-546–553) · scramble **v59=555** · **+8** (ws-548–555) · themes `advice`.
- ✅ Prefer **조언·상담** residual · Prefer-adjacent **답변·안내하다** on tel/scramble · 조언하다·제안하다·상담하다·문의하다·권하다·충고하다·정보·알려주다.
- ✅ adviceTagged **10**×6(speed+cloze+bingo+listen+particle+dictation) + **8**×2(tel+scramble) · smoke **전 8 SHOW** · chip KO **조언** / ZH **建议**.
- ✅ Distinct opinion/speech/favor/success · cloze/listen hosts · NIKL/Sejong · 해요체 · 브랜드 없음 · **ThemeSm54d close** · invent Next 금지 · manifest **v236** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** Claude Next만 (Cursor invent 금지) · sibling 큐 advice 닫힘 · Suggest ThemeSm54d close.

### Cursor (advice-counsel → bingo/listen +10 · ThemeSm54c · Paul offline)
- ✅ bingo **v66=647** · **+10** (bg-638–647) · listen **v66=614** · **+10** (lm-605–614) · themes `advice`.
- ✅ Prefer **답변·안내하다** · 조언하다·제안하다·상담하다·문의하다·권하다·충고하다·정보·알려주다 · Skip **조언·상담** → particle residual.
- ✅ adviceTagged **10**×4(speed+cloze+bingo+listen) · smoke **4 SHOW** · empty **4 HIDE** · chip KO **조언** / ZH **建议**.
- ✅ Distinct opinion/speech/favor/success · cloze/pack verbatim · NIKL/Sejong · 해요체 · 브랜드 없음 · ThemeSm54c · invent Next 금지 · manifest **v235** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Sibling next:** particle/dictation(+tel/scramble) +8–10 (Prefer **조언·상담** residual) · ThemeSm54d close.

### Cursor (ThemeSm54b cloze advice chip SHOW · Paul offline)
- ✅ cloze adviceTagged **10** (c-583–592) + `themes` · chip KO **조언** / ZH **建议** / EN Advice · ThemeSm54a 라벨/ORDER 재사용.
- ✅ smoke **2 SHOW**(speed+cloze) · **6 HIDE** · `_smoke-advice-focus.js` PASS · opinion/speech/favor/success 별개.
- ✅ invent Next/lemma 없음 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Sibling next:** bingo/listen +8–10 (Prefer 답변·안내하다) · ThemeSm54c · Claude Next 발명 금지.

### Cursor (중급 advice-counsel 1팩 + speed +10 · Paul offline)
- ✅ intermediate **v59=712** · pack **advice-counsel** 12 lemmas (조언하다·제안하다·상담하다·문의하다·권하다·충고하다·정보·알려주다·답변·안내하다·조언·상담).
- ✅ speed **v60=600** · **+10** (sq-591–600) · themes `advice` · adviceTagged **10**.
- ✅ Prefer **조언·상담** → cloze · Distinct opinion/speech/favor/think/problem/success/housing문의 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ chip 제안 KO **조언** / ZH **建议** · theme-key-canon `advice` · manifest **v233** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** cloze +8–10 (Prefer 조언·상담) · ThemeSm54a.

### Cursor (success-challenge → particle/dictation(+tel/scramble) · ThemeSm53c close · Paul offline)
- ✅ particle **v59=586** · **+10** (ps-577–586) · dictation **v61=592** · **+10** (d-583–592) · tel **v58=545** · **+8** (tel-538–545) · scramble **v58=547** · **+8** (ws-540–547) · themes `success`.
- ✅ Prefer **희망·기대하다** residual · Prefer-adjacent **자랑하다·성과** on tel/scramble · 성취·바라다·성공하다·실패하다·기회·도전하다·합격하다·불합격.
- ✅ successTagged **10**×6(speed+cloze+bingo+listen+particle+dictation) + **8**×2(tel+scramble) · smoke **전 8 SHOW** · chip KO **성공** / ZH **成功**.
- ✅ Distinct problem/reason/opinion/habit/apology · cloze/listen hosts · NIKL/Sejong · 해요체 · 브랜드 없음 · **ThemeSm53c close** · invent Next 금지 · manifest **v232** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** Claude Next만 (Cursor invent 금지) · sibling 큐 success 닫힘.

### Cursor (success-challenge → bingo/listen +10 · ThemeSm53b · Paul offline)
- ✅ bingo **v65=637** · listen **v65=604** · **+10** (bg-628–637 · lm-595–604) · themes `success` · successTagged **10**×2.
- ✅ Prefer **자랑하다·성과** · 성취·바라다·성공하다·실패하다·기회·도전하다·합격하다·불합격 · Skip **희망·기대하다** → particle residual.
- ✅ Distinct problem/reason/opinion/habit/apology · cloze/pack verbatim · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ ThemeSm53b chip KO **성공** / ZH **成功** · smoke **4 SHOW**(speed+cloze+bingo+listen) · **4 HIDE** · `_smoke-success-focus.js` PASS · manifest **v231** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** particle/dictation(+tel/scramble) +8–10 (Prefer 희망·기대하다 residual) · ThemeSm53c. → **Done** (동일일 ThemeSm53c).

### Cursor (success-challenge → cloze +10 · ThemeSm53a · Paul offline)
- ✅ cloze **v59=582** · **+10** (c-573–582) · themes `success` · successTagged **10**.
- ✅ Prefer **성취·바라다** · 성공하다·실패하다·기회·도전하다·합격하다·불합격·희망·기대하다 · Skip **자랑하다·성과** → bingo/listen Prefer.
- ✅ Distinct problem/reason/opinion/habit/apology · pack/speed verbatim · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ ThemeSm53a chip KO **성공** / ZH **成功** · smoke **2 SHOW**(speed+cloze) · **6 HIDE** · `_smoke-success-focus.js` PASS · manifest **v230** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** bingo/listen +8–10 (Prefer 자랑하다·성과) · ThemeSm53b. → **Done** (동일일 ThemeSm53b).

### Cursor (ThemeSm53a · success chip 라벨/ORDER 배선 · Paul offline)
- ✅ Claude Now/Next 비움(Paul 게이트만) · ThemeSm53a: 전 8 게임 `theme_success` KO **성공** / ZH **成功** / EN Success + THEME_ORDER.
- ✅ successTagged=**10**×2(speed+cloze) + `themes` → smoke **2 SHOW** · **6 HIDE** · `_smoke-success-focus.js` PASS.
- ✅ habit/reason/problem/personality/apology 별개 · hangul.js 미터치 · 커밋/푸시 없음 · invent Claude Next 없음.
- ⏭ **Next ThemeSm:** bingo/listen 태그 후 **ThemeSm53b** (sibling Prefer 자랑하다·성과).

### Cursor (중급 success-challenge 1팩 + speed +10 · Paul offline)
- ✅ intermediate **v58=700** · **+12** lemmas (성공하다·실패하다·기회·도전하다·합격하다·불합격·희망·기대하다·성과·자랑하다·성취·바라다) · pack `success-challenge`.
- ✅ speed **v59=590** · **+10** (sq-581–590) · themes `success` · successTagged **10** · Prefer **성취·바라다** → cloze.
- ✅ Distinct habit 노력하다·포기하다 · reason 목표·결과 · problem 경험 · personality 자신감 · school 시험·성적 · think · emotion · apology · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ theme-key-canon `success` · chip 제안 KO **성공** / ZH **成功** · manifest **v229** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** cloze +8–10 (Prefer 성취·바라다) + ThemeSm53a.

### Cursor (apology-politeness → particle/dictation(+tel/scramble) · ThemeSm52d close · Paul offline)
- ✅ particle **v58=576** · **+10** (ps-567–576) · dictation **v60=582** · **+10** (d-573–582) · tel **v57=537** · **+8** (tel-530–537) · scramble **v57=539** · **+8** (ws-532–539) · themes `apology`.
- ✅ Prefer **번거롭다·공손하다** residual · Prefer-adjacent **인사하다·불편하다** on tel/scramble · 미안하다·죄송하다·사과하다·용서하다·실례하다·감사하다·덕분·수고하다.
- ✅ apologyTagged **10**×6(speed+cloze+bingo+listen+particle+dictation) + **8**×2(tel+scramble) · smoke **전 8 SHOW** · chip KO **미안** / ZH **抱歉**.
- ✅ Distinct favor/rules/friends/personality · fruit 사과 · cloze/listen hosts · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ **Suggest ThemeSm close** (apology-politeness 스윕 닫힘 · ThemeSm52d) · manifest **v228** · hangul.js 미터치 · 커밋/푸시 없음 · invent Next 금지.
- ⏭ **Next:** Claude Next만 (큐 sibling apology 닫힘).

### Cursor (ThemeSm52a · apology chip 라벨/ORDER 배선 · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · 전 8 게임 `theme_apology` KO **미안** / ZH **抱歉** / EN Apology + THEME_ORDER.
- ✅ smoke **4 SHOW**(speed·cloze·bingo·listen) · **4 HIDE**(particle·dictation·tel·scramble) · `_smoke-apology-focus.js` PASS.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Claude Next 없음.
- ⏭ **Next ThemeSm:** particle/dictation(+tel/scramble) 태그 후 **ThemeSm52d**.

### Cursor (apology-politeness → bingo/listen +10 · ThemeSm52c · Paul offline)
- ✅ bingo **v64=627** · **+10** (bg-618–627) · listen **v64=594** · **+10** (lm-585–594) · themes `apology` · apologyTagged **10**×2.
- ✅ Prefer **인사하다·불편하다** · 미안하다·죄송하다·사과하다·용서하다·실례하다·감사하다·덕분·수고하다 · Skip **번거롭다·공손하다** → particle residual.
- ✅ Distinct favor/rules/friends/personality · fruit 사과 · housing 불편(n) · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ smoke 4 SHOW(speed+cloze+bingo/listen) · empty 4 HIDE · chip KO **미안** / ZH **抱歉** · ThemeSm52c · manifest **v227** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** apology-politeness → **particle/dictation(+tel/scramble) +8–10** · Prefer **번거롭다·공손하다** residual.

### Cursor (ThemeSm52b · cloze apology chip enable · Paul offline)
- ✅ Claude Now/Next 비움(자동 가능 항목 없음 · Paul 게이트만) · ThemeSm52a 라벨/ORDER 재사용 · cloze chip 확인.
- ✅ cloze apologyTagged=**10** (c-563–572) + `themes` → 칩 KO **미안** / ZH **抱歉**.
- ✅ smoke (ThemeSm52c 합산) **4 SHOW**(speed+cloze+bingo+listen) · empty **4 HIDE** · hangul.js 미터치 · 커밋/푸시 없음 · invent Next 금지.
- ⏭ **Sibling:** ~~bingo/listen~~ Done → **particle/dictation(+tel/scramble)** · Prefer **번거롭다·공손하다** · ThemeSm52d.

### Cursor (apology-politeness → cloze +10 · ThemeSm52a · Paul offline)
- ✅ cloze **v58=572** · **+10** (c-563–572) · themes `apology` · apologyTagged **10** · Prefer **번거롭다·공손하다** · 미안하다·죄송하다·사과하다·용서하다·실례하다·감사하다·덕분·수고하다.
- ✅ Skip **인사하다·불편하다** → bingo/listen Prefer · Distinct favor/rules/friends/personality · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ ThemeSm52a chip KO **미안** / ZH **抱歉** · speed SHOW · ThemeSm52b cloze · `_smoke-apology-focus.js` · manifest **v226**.
- ✅ hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** ThemeSm52b cloze chip → bingo/listen.

### Cursor (중급 apology-politeness 1팩 + speed +10 · Paul offline)
- ✅ intermediate **v57=688** · **+12** lemmas (미안하다·죄송하다·사과하다·용서하다·실례하다·감사하다·덕분·수고하다·번거롭다·인사하다·불편하다·공손하다) · pack `apology-politeness`.
- ✅ speed **v58=580** · **+10** (sq-571–580) · themes `apology` · apologyTagged **10** · Prefer **번거롭다·공손하다** → cloze Done.
- ✅ Distinct favor 고맙다 · rules 예의 · friends · emotion 걱정 · housing 불편(n) · fruit 사과 · personality · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ manifest **v225** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** cloze Done → bingo/listen.

### Cursor (ThemeSm51c · personality chip smoke close · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm51c: ThemeSm51a–51b 라벨/ORDER 재사용 · 전 8 personalityTagged=**10**×6 + **8**×2 + `themes` → 칩 KO **성격** / ZH **性格**.
- ✅ smoke 전 8 SHOW · opinion/emotion/habit/friends와 별개 · bothTags=0 · `_smoke-personality-focus.js` PASS.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · **personality-character 스윕 닫힘**.
- ⏭ **Next:** Claude Next만 · invent lemma/Next 금지 · Sibling handoff 비움.

### Cursor (personality-character → particle/dictation/tel/scramble · Paul offline)
- ✅ particle **v57=566** · **+10** (ps-557–566) · dictation **v59=572** · **+10** (d-563–572) · tel **v56=529** · **+8** (tel-522–529) · scramble **v56=531** · **+8** (ws-524–531) · themes `personality` · personalityTagged **10/10/8/8**.
- ✅ Prefer **겸손하다·엄격하다** residual · 성격·친절하다·성실하다·활발하다·솔직하다·자신감·다정하다·꼼꼼하다 · Prefer-adjacent **소심하다·용감하다** on tel/scramble · Skip bingo Done 소심하다·용감하다 on particle/dictation.
- ✅ Distinct opinion/emotion/habit/friends · cloze/listen hosts · NIKL/Sejong · 해요체 · 브랜드 없음 · bothTags=0.
- ✅ smoke ThemeSm51c **전 8 SHOW** · chip KO **성격** / ZH **性格** · manifest **v224** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **ThemeSm51c close Done** (personality-character 스윕 닫힘).

### Cursor (ThemeSm51b · bingo/listen personality chip enable · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm51b: ThemeSm51a 라벨/ORDER 재사용 · bingo/listen personalityTagged=**10** + `themes` → 칩 KO **성격** / ZH **性格**.
- ✅ smoke 4 SHOW(speed+cloze+bingo/listen) · empty 4 HIDE · opinion/emotion/habit/friends와 별개 · bothTags=0 · `_smoke-personality-focus.js` PASS.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ **Sibling:** personality-character → **particle/dictation(+tel/scramble) +8–10** · Prefer **겸손하다·엄격하다** residual.

### Cursor (personality-character → bingo/listen +10 · Paul offline)
- ✅ bingo **v63=617** · **+10** (bg-608–617) · listen **v63=584** · **+10** (lm-575–584) · themes `personality` · personalityTagged **10**×2.
- ✅ Prefer **소심하다·용감하다** · 성격·친절하다·성실하다·활발하다·솔직하다·자신감·다정하다·꼼꼼하다 · Skip **겸손하다·엄격하다** → particle residual.
- ✅ Distinct opinion/emotion/habit/friends · cloze/pack/listen 친절 hosts · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ smoke 4 SHOW(speed+cloze+bingo/listen) · empty 4 HIDE · chip KO **성격** / ZH **性格** · ThemeSm51b · manifest **v223** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** personality-character → **particle/dictation(+tel/scramble) +8–10** · Prefer **겸손하다·엄격하다** residual.

### Cursor (ThemeSm51a · speed(+cloze) personality chip enable · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm51a: 칩 KO **성격** / ZH **性格** / EN Personality · THEME_ORDER 전 8 · personalityTagged=**10**×2(speed+cloze) + `themes` → 칩 활성.
- ✅ smoke 2 SHOW · empty 6 HIDE · opinion/emotion/habit/friends와 별개 · bothTags=0 · `_smoke-personality-focus.js` PASS.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ **Sibling:** ~~bingo/listen +8–10~~ → **Done** · Prefer **소심하다·용감하다**.

### Cursor (personality-character → cloze +10 · Paul offline)
- ✅ cloze **v57=562** · **+10** (c-553–562) · themes `personality` · personalityTagged **10** · Prefer **겸손하다·엄격하다** · 성격·친절하다·성실하다·활발하다·솔직하다·자신감·다정하다·꼼꼼하다.
- ✅ Skip **소심하다·용감하다** → bingo/listen Prefer · Distinct opinion/emotion/habit/friends · pack/speed verbatim 회피 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ cloze.js ORDER `personality` · chip KO **성격** / ZH **性格** · manifest **v222** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** ~~bingo/listen +8–10~~ → **Done** · Prefer **소심하다·용감하다**.

### Cursor (중급 personality-character 1팩 + speed +10 · Paul offline)
- ✅ intermediate **v56=676** · pack **`personality-character`** **12** (성격·친절하다·성실하다·활발하다·솔직하다·자신감·다정하다·꼼꼼하다·소심하다·용감하다·겸손하다·엄격하다).
- ✅ speed **v57=570** · sq-561–570 · personalityTagged **10** · themes `personality` · Prefer **겸손하다·엄격하다** → cloze.
- ✅ Distinct: emotion · habit 부지런하다·게으르다 · friends 친하다 · rules 예의 · senses 조용하다·밝다 · favor 고맙다 · opinion 칭찬하다.
- ✅ manifest **v221** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** ~~cloze +8–10~~ → **Done** · bingo/listen Prefer **소심하다·용감하다**.

### Cursor (friends-social → particle/dictation/tel/scramble · Paul offline)
- ✅ particle **v56=556** · **+10** (ps-547–556) · dictation **v58=562** · **+10** (d-553–562) · tel **v55=521** · **+8** (tel-514–521) · scramble **v55=523** · **+8** (ws-516–523) · themes `friends` · friendsTagged **10/10/8/8**.
- ✅ Prefer **사귀다** residual · 친구·친하다·함께·혼자·모이다·동아리·나누다·놀다·방문 · Prefer-adjacent **반갑다·가깝다** on tel/scramble · Skip bingo Done 반갑다·가깝다 on particle/dictation.
- ✅ Distinct celebration/family/jobs/routine · NIKL/Sejong · 해요체 · SNS 브랜드 없음 · bothTags=0.
- ✅ smoke ThemeSm50d **전 8 SHOW** · chip KO **친구** / ZH **朋友** · manifest **v220** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** Claude Next만 · invent lemma 금지 · **friends-social 스윕 닫힘 (ThemeSm50d Done)**.

### Cursor (friends-social → bingo/listen +10 · Paul offline)
- ✅ bingo **v62=607** · **+10** (bg-598–607) · listen **v62=574** · **+10** (lm-565–574) · themes `friends` · friendsTagged **10**×2.
- ✅ Prefer **반갑다·가깝다** · 친하다·함께·혼자·모이다·동아리·나누다·놀다·방문 · Skip **친구**(bg-08 people) · Skip **사귀다** → particle residual.
- ✅ Distinct celebration/family/jobs/routine · time 만나다·약속 · speech · emotion · directions · housing · cloze hosts · pack verbatim · place 가까워요 · lm-07 만나서 반가워요 · NIKL/Sejong · 해요체 · SNS 브랜드 없음.
- ✅ smoke ThemeSm50c 4 SHOW · empty 4 HIDE · chip KO **친구** / ZH **朋友** · manifest **v219** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** friends-social → **particle/dictation(+tel/scramble) +8–10** · Prefer **사귀다** residual · theme `friends` · chip KO **친구** / ZH **朋友**.

### Cursor (ThemeSm50b · cloze friends chip enable · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm50b: ThemeSm50a 라벨/ORDER 재사용 · cloze friendsTagged=**10** + `themes` → 칩 KO **친구** / ZH **朋友**.
- ✅ smoke 2 SHOW(speed+cloze) · empty 6 HIDE · celebration/family와 별개 · bothTags=0 · `_smoke-friends-focus.js` PASS.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ **Next:** friends-social → **bingo/listen +8–10** · Prefer **반갑다·가깝다** · theme `friends` · chip KO **친구** / ZH **朋友**.

### Cursor (friends-social → cloze +10 · Paul offline)
- ✅ cloze **v56=552** · **+10** (c-543–552) · themes `friends` · friendsTagged **10** · Prefer **사귀다·방문** · 친구·친하다·함께·혼자·모이다·동아리·나누다·놀다.
- ✅ Skip **반갑다·가깝다** → bingo/listen Prefer · Distinct celebration/family/jobs/routine · time 만나다·약속 · speech · emotion · directions · housing · pack/speed verbatim · NIKL/Sejong · 해요체 · SNS 브랜드 없음.
- ✅ cloze.js 칩 KO **친구** / ZH **朋友** / EN Friends · ORDER `friends` · manifest **v218** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** friends-social → **bingo/listen +8–10** · Prefer **반갑다·가깝다** · theme `friends` · chip KO **친구** / ZH **朋友**.

### Cursor (ThemeSm50a · friends chip enable · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm50a: 전 8 `theme_friends` KO **친구** / ZH **朋友** / EN Friends · THEME_ORDER · speed friendsTagged=**10** + `themes` → 칩 활성.
- ✅ smoke 1 SHOW · empty 7 HIDE · celebration/family와 별개 · bothTags=0 · `_smoke-friends-focus.js` PASS.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ sibling: ~~cloze +8–10~~ → **Done** · bingo/listen Prefer **반갑다·가깝다**.

### Cursor (중급 friends-social 1팩 + speed +10 · Paul offline)
- ✅ intermediate **v55=664** · pack **`friends-social`** **12** (친구·친하다·사귀다·함께·혼자·모이다·동아리·나누다·놀다·반갑다·방문·가깝다).
- ✅ speed **v56=560** · +10 (sq-551–560) · themes `friends` · friendsTagged **10**.
- ✅ celebration 모임·초대 · family · time 만나다·약속 · speech · emotion 외롭다 · directions 사이·근처 · housing 이웃과 lemma 분리 · NIKL/Sejong·Tammy · 해요체 · SNS 브랜드 없음.
- ⏭ **Next:** ~~cloze +8–10~~ → **Done** · bingo/listen (반갑다·가깝다 Prefer).
- hangul.js 미터치 · 커밋/푸시 없음 · manifest **v217**.

### Cursor (ThemeSm49d · rules chip smoke close · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm49d: ThemeSm49a–49b 라벨/ORDER 재사용 · 전 8 rulesTagged=**10**×6 + **8**×2 + `themes` → 칩 KO **규칙** / ZH **规则**.
- ✅ smoke 전 8 SHOW · favor/problem/jobs/opinion와 별개 · bothTags=0 · `_smoke-rules-focus.js` PASS.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · **rules-permission 스윕 닫힘**.
- ⏭ **Next:** Claude가 Next 채울 때까지 invent 금지 · Now S1jieut / SpecPartner는 별도 레인.

### Cursor (rules-permission → particle/dictation(+tel/scramble) +10/+10/+8/+8 · Paul offline)
- ✅ particle **v55=546** · **+10** (ps-537–546) · dictation **v57=552** · **+10** (d-543–552) · tel **v54=513** · **+8** (tel-506–513) · scramble **v54=515** · **+8** (ws-508–515) · themes `rules` · rulesTagged **10/10/8/8**.
- ✅ Prefer **허용하다·안전하다** residual · 규칙·지키다·어기다·허락하다·금지하다·자유·의무·법 · Prefer-adjacent **예의·질서** on tel/scramble · Skip bingo Prefer 예의·질서 on particle/dictation.
- ✅ Distinct cloze/listen hosts · favor · problem · jobs · opinion · driving · school · habit · pack verbatim · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ smoke **전 8 SHOW** · chip KO **규칙** / ZH **规则** · manifest **v216** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** ~~ThemeSm close~~ → **Done (ThemeSm49d)**.

### Cursor (rules-permission → bingo/listen +10 · Paul offline)
- ✅ bingo **v61=597** · **+10** (bg-588–597) · listen **v61=564** · **+10** (lm-555–564) · themes `rules` · rulesTagged **10**×2.
- ✅ Prefer **예의·질서** · 규칙·지키다·어기다·허락하다·금지하다·자유·의무·법 · Skip **허용하다·안전하다** → particle residual.
- ✅ Distinct favor · problem · jobs · opinion · driving · school · habit · cloze/listen hosts · pack verbatim · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ smoke 4 SHOW(speed+cloze+bingo/listen) · empty 4 HIDE · chip KO **규칙** / ZH **规则** · manifest **v215** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** rules-permission → **particle/dictation(+tel/scramble) +8–10** · Prefer **허용하다·안전하다** residual · theme `rules` · chip KO **규칙** / ZH **规则**.

### Cursor (ThemeSm49a · speed(+cloze) rules chip enable · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm49a: 전 8게임 THEME_ORDER + `theme_rules` i18n · 칩 KO **규칙** / ZH **规则** / EN Rules.
- ✅ rulesTagged=**10**(speed+cloze) + `themes.rules` → 칩 SHOW · empty 6 HIDE · favor/problem/jobs/opinion와 별개 · `_smoke-rules-focus.js` PASS (2 SHOW).
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ **Next:** sibling **bingo/listen +8–10** (예의·질서 Prefer) · ThemeSm invent 금지.

### Cursor (rules-permission → cloze +10 · Paul offline)
- ✅ cloze **v55=542** · **+10** (c-533–542) · themes `rules` · rulesTagged **10** · Prefer **어기다·허용하다** · 규칙·지키다·허락하다·금지하다·자유·의무·법·안전하다.
- ✅ Skip **예의·질서** → bingo/listen Prefer · Distinct favor · problem · jobs · opinion · driving · school · habit · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ cloze.js 칩 KO **규칙** / ZH **规则** / EN Rules · ORDER `rules` · manifest **v214** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** rules-permission → **bingo/listen +8–10** · Prefer **예의·질서** · theme `rules` · chip KO **규칙** / ZH **规则**.

### Cursor (중급 rules-permission 1팩 + speed +10 · Paul offline)
- ✅ intermediate **v54=652** · pack **`rules-permission`** **12** (규칙·지키다·어기다·허락하다·금지하다·자유·의무·예의·질서·법·허용하다·안전하다).
- ✅ speed **v55=550** · **+10** (sq-541–550) · themes `rules` · rulesTagged **10** · Prefer **어기다·허용하다** → cloze.
- ✅ Distinct driving 위험·조심하다 · public-life 가능 · school 시험 · favor · habit · problem · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ speed.js 칩 라벨/ORDER `rules` · chip 제안 KO **규칙** / ZH **规则** · manifest **v213** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** ~~cloze~~ → **Done** · bingo/listen (예의·질서 Prefer).

### Cursor (ThemeSm48d · habit chip smoke close · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm48d: ThemeSm48a–48b 라벨/ORDER 재사용 · 전 8 habitTagged=**10**×6 + **8**×2 + `themes` → 칩 KO **습관** / ZH **习惯**.
- ✅ smoke 전 8 SHOW · routine/clinic/change와 별개 · bothTags=0 · `_smoke-habit-focus.js` PASS.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · **habits-lifestyle 스윕 닫힘**.
- ⏭ **Next:** Claude가 Next 채울 때까지 invent 금지 · Now S1jieut / SpecPartner는 별도 레인.

### Cursor (habits-lifestyle → particle/dictation(+tel/scramble) · Paul offline)
- ✅ particle **v54=536** · **+10** (ps-527–536) · Prefer **포기하다·참다** residual · 습관·노력하다·익숙하다·낯설다·적응하다·휴식·방학·생활 · themes `habit` · habitTagged **10**.
- ✅ dictation **v56=542** · **+10** (d-533–542) · same Prefer · habitTagged **10**.
- ✅ telephone **v53=505** · **+8** (tel-498–505) · scramble **v53=507** · **+8** (ws-500–507) · Prefer-adjacent **부지런하다·게으르다** · habitTagged **8**×2.
- ✅ Hosts cloze/listen과 분리(목표를 포기하지 않아요·화를 참아요·키보드가 익숙해요 등) · Skip particle/dictation **부지런하다·게으르다** · routine/clinic/change/motion 별개 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ Suggest ThemeSm close → ThemeSm48d Done · smoke 전 8 SHOW · manifest **v212** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** invent 금지 · Claude Next 대기.

### Cursor (habits-lifestyle → bingo/listen +10 · Paul offline)
- ✅ bingo **v60=587** · **+10** (bg-578–587) · listen **v60=554** · **+10** (lm-545–554) · themes `habit` · habitTagged **10**×2.
- ✅ Prefer **부지런하다·게으르다** · 습관·노력하다·익숙하다·낯설다·적응하다·휴식·방학·생활 · Skip **포기하다·참다** → particle residual.
- ✅ Distinct routine · clinic/health · change · motion · NIKL/Sejong · 해요체 · 브랜드 없음 · ThemeSm48b 칩 SHOW · manifest **v211**.
- ✅ hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** ~~particle/dictation(+tel/scramble)~~ → **Done** · ~~ThemeSm close~~ → **Done (ThemeSm48d)**.

### Cursor (ThemeSm48a · speed(+cloze) habit chip enable · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm48a: 전 8게임 THEME_ORDER + `theme_habit` i18n · 칩 KO **습관** / ZH **习惯** / EN Habit.
- ✅ habitTagged=**10**(speed+cloze) + `themes.habit` → 칩 SHOW · empty 6 HIDE · routine/clinic/change와 별개 · `_smoke-habit-focus.js` PASS (2 SHOW).
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ **Next:** sibling **bingo/listen +8–10** (부지런하다·게으르다 Prefer) · ThemeSm invent 금지.

### Cursor (habits-lifestyle → cloze +10 · Paul offline)
- ✅ cloze **v54=532** · **+10** (c-523–532) · themes `habit` · habitTagged **10** · Prefer **포기하다·참다** · 습관·노력하다·익숙하다·낯설다·적응하다·휴식·방학·생활.
- ✅ Skip **부지런하다·게으르다** → bingo/listen Prefer · Distinct routine · clinic/health · change(방학이 지나갔어요) · motion · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ cloze.js 칩 KO **습관** / ZH **习惯** / EN Habit · ORDER `habit` · manifest **v210** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** habits-lifestyle → **bingo/listen +8–10** · Prefer **부지런하다·게으르다** · theme `habit` · chip KO **습관** / ZH **习惯**.

### Cursor (중급 habits-lifestyle 1팩 + speed +10 · Paul offline)
- ✅ intermediate **v53=640** · pack **`habits-lifestyle`** **12** (습관·노력하다·익숙하다·낯설다·적응하다·휴식·방학·부지런하다·게으르다·생활·포기하다·참다).
- ✅ speed **v54=540** · **+10** (sq-531–540) · themes `habit` · habitTagged **10** · Prefer **포기하다·참다** → cloze.
- ✅ Distinct routine · celebration 휴가 · sports 연습 · reason 목표 · problem 경험 · work 스트레스 · hobby 여가 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ speed.js 칩 라벨/ORDER `habit` · chip 제안 KO **습관** / ZH **习惯** · manifest **v209** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** ~~cloze~~ → **Done** · bingo/listen (부지런하다·게으르다 Prefer).

### Cursor (ThemeSm47d · opinion chip smoke close · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm47d: ThemeSm47a–47c 라벨/ORDER 재사용 · 전 8 opinionTagged=**10**×6 + **8**×2 + `themes` → 칩 KO **의견** / ZH **意见**.
- ✅ smoke 전 8 SHOW · think/speech/favor/problem와 별개 · bothTags=0 · `_smoke-opinion-focus.js` PASS.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음 · **opinion-judgment 스윕 닫힘**.
- ⏭ **Next:** Claude가 Next 채울 때까지 invent 금지 · Now S1jieut / SpecPartner는 별도 레인.

### Cursor (opinion-judgment → particle/dictation(+tel/scramble) · Paul offline)
- ✅ particle **v53=526** · **+10** (ps-517–526) · Prefer **칭찬하다·비판하다** residual · 의견·동의하다·중요하다·추천하다·평가·흥미롭다·틀리다·판단하다 · themes `opinion` · opinionTagged **10**.
- ✅ dictation **v55=532** · **+10** (d-523–532) · same Prefer · opinionTagged **10**.
- ✅ telephone **v52=497** · **+8** (tel-490–497) · scramble **v52=499** · **+8** (ws-492–499) · +확실하다·분명하다 · opinionTagged **8**×2.
- ✅ Skip particle/dictation **확실하다·분명하다** (bingo/listen Done) · think/speech/favor/problem 별개 · cloze/listen hosts · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ manifest **v208** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** ~~ThemeSm close~~ → **Done (ThemeSm47d)**.

### Cursor (ThemeSm47b · cloze opinion chip enable · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm47b: ThemeSm47a 라벨/ORDER 재사용 · cloze opinionTagged=**10** + `themes` → 칩 KO **의견** / ZH **意见**.
- ✅ smoke cloze SHOW · empty HIDE · (+bingo/listen ThemeSm47c concurrent → 4 SHOW) · think/speech/favor/problem와 별개 · bothTags=0.
- ✅ `_smoke-opinion-focus.js` PASS · hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ **Next:** sibling **particle/dictation(+tel/scramble) +8–10** · chip **의견/意见** (기존 handoff · invent 금지).

### Cursor (opinion-judgment → bingo/listen +10 · Paul offline)
- ✅ bingo **v59=577** · **+10** (bg-568–577) · Prefer **확실하다·분명하다** · 의견·동의하다·중요하다·추천하다·평가·흥미롭다·틀리다·판단하다 · themes `opinion` · opinionTagged **10**.
- ✅ listen **v59=544** · **+10** (lm-535–544) · same Prefer · opinionTagged **10**.
- ✅ Skip **칭찬하다·비판하다** (cloze Done) · think/speech/favor/problem 별개 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ ThemeSm47a ORDER 재사용 · chip KO **의견** / ZH **意见** · smoke 4 SHOW · manifest **v207** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** opinion-judgment → **particle/dictation(+tel/scramble) +8–10** · theme `opinion` · chip KO **의견** / ZH **意见**.

### Cursor (opinion-judgment → cloze +10 · Paul offline)
- ✅ cloze **v53=522** · **+10** (c-513–522) · Prefer **칭찬하다·비판하다** · 의견·동의하다·중요하다·추천하다·평가·흥미롭다·틀리다·판단하다 · themes `opinion` · opinionTagged **10**.
- ✅ Skip **확실하다·분명하다** → bingo/listen Prefer · think/speech/favor/problem 별개 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ cloze.js `theme_opinion` ThemeSm47a 재사용 · chip KO **의견** / ZH **意见** · manifest **v206** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** opinion-judgment → **bingo/listen +8–10** · Prefer **확실하다·분명하다** · theme `opinion` · chip KO **의견** / ZH **意见**.

### Cursor (ThemeSm47a · speed opinion chip enable · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm47a: 전 8게임 THEME_ORDER + `theme_opinion` i18n · 칩 KO **의견** / ZH **意见** / EN Opinion.
- ✅ speed opinionTagged=**10** + `themes` → 칩 SHOW · empty 7 HIDE · think/speech/favor/problem와 별개 · bothTags=0.
- ✅ `_smoke-opinion-focus.js` PASS · hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ **Next:** sibling **cloze +8–10** (칭찬하다·비판하다 Prefer) · chip **의견/意见** (기존 handoff · invent 금지).

### Cursor (중급 opinion-judgment 1팩 + speed +10 · Paul offline)
- ✅ intermediate **v52=628** · pack **`opinion-judgment`** **12** (의견·동의하다·중요하다·추천하다·평가·흥미롭다·틀리다·확실하다·분명하다·판단하다·칭찬하다·비판하다).
- ✅ speed **v53=530** · **+10** (sq-521–530) · themes `opinion` · opinionTagged **10** · Prefer **칭찬하다·비판하다** → cloze.
- ✅ Distinct compare 반대 · hobby 관심 · favor 필요하다 · clothes 맞다 · think 믿다 · problem 선택하다 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ speed.js 칩 라벨/ORDER `opinion` · chip 제안 KO **의견** / ZH **意见** · manifest **v205** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** opinion-judgment → **cloze +8–10** · Prefer **칭찬하다·비판하다** · theme `opinion` · chip KO **의견** / ZH **意见**.

### Cursor (ThemeSm46d · problem chip smoke close · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · sibling ThemeSm close: ThemeSm46a–46c 라벨/ORDER 재사용 · particle/dictation/tel/scramble problemTagged=**10/10/8/8** + `themes` → 칩 KO **문제** / ZH **问题**.
- ✅ 전 8게임 칩 SHOW · favor/reason/think와 별개 · bothTags=0.
- ✅ `_smoke-problem-focus.js` 전 8 SHOW PASS · **problem-solution 스윕 닫힘** · hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ **Next:** *(비움 — invent 금지)*.

### Cursor (problem-solution → particle/dictation(+tel/scramble) · Paul offline)
- ✅ particle **v52=516** · **+10** (ps-507–516) · Prefer **상황·조건** residual · 문제·해결·실수·어려움·도움·경험·선택·고치다 · themes `problem` · problemTagged **10**.
- ✅ dictation **v54=522** · **+10** (d-513–522) · same Prefer · problemTagged **10**.
- ✅ telephone **v51=489** · **+8** (tel-482–489) · problemTagged **8**.
- ✅ scramble **v51=491** · **+8** (ws-484–491) · problemTagged **8**.
- ✅ Skip 힘들다·쉽다 (bingo/listen Done) · favor/reason/think/speech 별개 · NIKL/Sejong · 해요체 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.
- ✅ smoke 전 8 SHOW · bothTags=0 · manifest **v204**.
- ⏭ **Next:** **ThemeSm close** → **Done** (ThemeSm46d).

### Cursor (ThemeSm46c · bingo/listen problem chip enable · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm46c: ThemeSm46a 라벨/ORDER 재사용 · bingo/listen problemTagged=**10** + `themes` → 칩 KO **문제** / ZH **问题**.
- ✅ smoke 4 SHOW(speed+cloze+bingo/listen) · empty 4 HIDE · favor/reason/think와 별개 · bothTags=0.
- ✅ `_smoke-problem-focus.js` PASS · hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ **Next:** sibling **particle/dictation(+tel/scramble) +8–10** · theme `problem` · chip **문제/问题** (기존 handoff · invent 금지).

### Cursor (problem-solution → bingo/listen +10 · Paul offline)
- ✅ bingo **v58=567** · **+10** (bg-558–567) · Prefer **힘들다·쉽다** · 문제·해결하다·고치다·실수·어려움·도움·경험·선택하다 · themes `problem` · problemTagged **10**.
- ✅ listen **v58=534** · **+10** (lm-525–534) · same Prefer · problemTagged **10**.
- ✅ Skip 상황·조건 (cloze Done) · favor/reason/think/speech 별개 · NIKL/Sejong · 해요체 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.
- ✅ smoke 4 SHOW(speed+cloze+bingo/listen) · empty 4 HIDE · bothTags=0 · manifest **v203**.
- ⏭ **Next:** **particle/dictation(+tel/scramble) +8–10** · theme `problem` · chip **문제/问题**.

### Cursor (ThemeSm46b · cloze problem chip enable · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · ThemeSm46b: ThemeSm46a 라벨/ORDER 재사용 · cloze problemTagged=**10** + `themes` → 칩 KO **문제** / ZH **问题**.
- ✅ smoke 2 SHOW(speed+cloze) · empty 6 HIDE · favor/reason/think와 별개 · bothTags=0.
- ✅ `_smoke-problem-focus.js` PASS · hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ **Next:** sibling **bingo/listen +8–10** (힘들다·쉽다 Prefer) · chip **문제/问题** (기존 handoff · invent 금지).

### Cursor (problem-solution → cloze +10 · Paul offline)
- ✅ cloze **v52=512** · **+10** (c-503–512) · Prefer **상황·조건** · 문제·해결·실수·어려움·도움·경험·선택·고치다 · themes `problem` · problemTagged **10**.
- ✅ favor/think/speech/reason/change 별개 · NIKL/Sejong · 해요체 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음.
- ✅ manifest **v202**.
- ⏭ **Next:** **bingo/listen +8–10** (힘들다·쉽다 Prefer) · chip **문제/问题**.

### Cursor (ThemeSm45d · reason chip smoke close · Paul offline)
- ✅ Claude Next 비움(Paul 게이트만) · sibling ThemeSm close: ThemeSm45a/45b 라벨/ORDER 재사용 · particle/dictation/tel/scramble reasonTagged=**10/10/8/8** + `themes` → 칩 KO **이유** / ZH **原因**.
- ✅ 전 8게임 칩 SHOW · think/speech/favor/change/compare와 별개 · bothTags=0.
- ✅ `_smoke-reason-focus.js` 전 8 SHOW PASS · **cause-reason 스윕 닫힘** · hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ **Next:** *(비움 — invent 금지)*.

### Cursor (cause-reason → particle/dictation(+tel/scramble) · Paul offline)
- ✅ particle **v51=506** · **+10** (ps-497–506) · Prefer **관련·효과** · 이유·원인·결과·목적·방법·과정·순서·목표 · themes `reason` · reasonTagged **10**.
- ✅ dictation **v53=512** · **+10** (d-503–512) · same Prefer · reasonTagged **10**.
- ✅ telephone **v50=481** · **+8** (tel-474–481) · scramble **v50=483** · **+8** (ws-476–483) · reasonTagged **8**×2 · Skip 관련·효과.
- ✅ Skip **그래서·왜냐하면** (bingo/listen) · think/speech/favor/change/compare · cloze/listen hosts 회피 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ manifest **v200** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** **ThemeSm close** → **Done** (ThemeSm45d).

### Cursor (cause-reason → bingo/listen +10 · Paul offline)
- ✅ bingo **v57=557** · **+10** (bg-548–557) · Prefer **그래서·왜냐하면** · 이유·원인·결과·목적·방법·과정·순서·목표 · themes `reason` · reasonTagged **10**.
- ✅ listen **v57=524** · **+10** (lm-515–524) · Prefer **그래서 집에 가요** · **왜냐하면 배가 고파요** · remaining reason · reasonTagged **10**.
- ✅ Skip **관련·효과** (cloze Done) · think/speech/favor/change/compare · pack/cloze/speed verbatim 회피 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ ThemeSm45a/45b 칩 KO **이유** / ZH **原因** 재사용 · manifest **v199** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** cause-reason → **particle/dictation(+tel/scramble) +8–10** · theme `reason` · chip KO **이유** / ZH **原因**. → **Done**.

### Cursor (ThemeSm45b · cloze reason chip enable · Paul offline)
- ✅ Claude Now 비움 확인 · ThemeSm45b: ThemeSm45a 라벨/ORDER 재사용 · cloze reasonTagged=**10** + `themes` → 칩 KO **이유** / ZH **原因**.
- ✅ smoke: speed+cloze(+bingo/listen concurrent) SHOW · empty 4 HIDE · think/speech/favor와 별개 · bothTags=0 · invent Next/lemma 없음.
- ✅ `_smoke-reason-focus.js` 4 SHOW · empty 4 HIDE PASS · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** *(비움 — invent 금지)* · sibling Prefer: cause-reason → **particle/dictation(+tel/scramble)** (manifest 제안).

### Cursor (cause-reason → cloze +10 · Paul offline)
- ✅ cloze **v51=502** · **+10** (c-493–502) · Prefer **관련·효과** · 이유·원인·결과·목적·방법·과정·순서·목표 · themes `reason` · reasonTagged **10**.
- ✅ Skip **그래서·왜냐하면** → bingo/listen · think/speech/favor/change/compare · pack/speed verbatim 회피 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ cloze.js `theme_reason` 기존 · ThemeSm45a 재사용 · chip KO **이유** / ZH **原因** · manifest **v198** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** cause-reason → **bingo/listen +8–10** (그래서·왜냐하면) · theme `reason` · chip KO **이유** / ZH **原因**.

### Cursor (ThemeSm45a · reason chip enable · Paul offline)
- ✅ Claude Now 비움 확인 · ThemeSm45a: 전 8게임 칩 캐논 KO **이유** / ZH **原因** / EN Reason · THEME_ORDER `reason`.
- ✅ speed reasonTagged=**10** + `themes` → 칩 활성 · empty 7 → 칩 숨김 · think/speech/favor와 별개 · bothTags=0.
- ✅ `_smoke-reason-focus.js` 1 SHOW · empty 7 HIDE PASS · hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ **Next:** *(비움 — invent 금지)* · sibling Prefer: cause-reason → **cloze +8–10** (관련·효과) → **Done** (동일일 cloze).

### Cursor (cause-reason pack + speed +10 · Paul offline)
- ✅ 중급 theme pack **`cause-reason`** **12** (이유·원인·결과·그래서·왜냐하면·목적·방법·과정·순서·목표·관련·효과) · intermediate **v50=604** · packs **51**.
- ✅ speed **v51=510** · reasonTagged **10** · sq-501–510 · themes `reason` · Prefer **관련·효과** → cloze Done.
- ✅ compare/change/think/speech/favor · news 영향 · family 관계와 lemma 분리 · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음.
- ✅ manifest **v197** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** cause-reason → **cloze +8–10** (관련·효과) · theme `reason` · chip KO **이유** / ZH **原因**. → **Done** (동일일 cloze).

### Cursor (comparison-degree → particle/dictation(+tel/scramble) + ThemeSm close · Paul offline)
- ✅ Now: particle **v50=496** · dictation **v52=502** · tel **v49=473** · scramble **v49=475** · compareTagged **10/10/8/8** · Prefer **똑같다·전혀**.
- ✅ ThemeSm close: 전 8 칩 KO **비교** / ZH **比较** · `_smoke-compare-focus.js` PASS · bothTags=0 · size/change/motion 별개.
- ✅ manifest **v196** · hangul.js 미터치 · lemma 추가 없음 · 커밋/푸시 없음 · **comparison-degree 스윕 닫힘**.
- ⏭ **Next:** *(비움)* · invent 금지 · Claude Next 대기.

### Cursor (comparison-degree → bingo/listen +10 · Paul offline)
- ✅ bingo **v56=547** · **+10** (bg-538–547) · Prefer **만큼·반대** · 같다·다르다·비슷하다·비교하다·더·가장·훨씬·차이 · themes `compare` · compareTagged **10**.
- ✅ listen **v56=514** · **+10** (lm-505–514) · Prefer 필요한 만큼만 · 그 길이 반대쪽 · 해요체 · compareTagged **10**.
- ✅ Skip **똑같다·전혀** (cloze Done) · change/size/motion과 별개 · pack/cloze/speed verbatim 회피 · NIKL/Sejong · 브랜드 없음.
- ✅ ThemeSm44a 칩 재사용 · manifest **v195** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** comparison-degree → **particle/dictation(+tel/scramble) +8–10** · theme `compare` · chip KO **비교** / ZH **比较**.

### Cursor (ThemeSm44a · compare chip enable · Paul offline)
- ✅ Claude Now cloze Done 확인 · ThemeSm44a: 전 8게임 칩 캐논 KO **비교** / ZH **比较** / EN Compare · THEME_ORDER `compare`.
- ✅ speed+cloze compareTagged=**10** + `themes` → 칩 활성 · empty 6 → 칩 숨김 · size/change/motion과 별개 · bothTags=0.
- ✅ `_smoke-compare-focus.js` 2 SHOW · empty 6 HIDE PASS · hangul.js 미터치 · 커밋/푸시 없음 · invent Next/lemma 없음.
- ⏭ **Next:** comparison-degree → **bingo/listen +8–10** (만큼·반대) · theme `compare` · chip KO **비교** / ZH **比较**.

### Cursor (comparison-degree → cloze +10 · Paul offline)
- ✅ cloze **v50=492** · **+10** (c-483–492) · Prefer **똑같다·전혀** · 같다·다르다·비슷하다·비교하다·더·가장·훨씬·차이 · themes `compare` · compareTagged **10**.
- ✅ Skip **만큼·반대** → bingo/listen · change/size/motion과 별개 · pack/speed verbatim 회피 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ ThemeSm44a chip Done · manifest **v194** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** comparison-degree → **bingo/listen +8–10** (만큼·반대) · theme `compare` · chip KO **비교** / ZH **比较**.

### Cursor (comparison-degree pack + speed +10 · Paul offline)
- ✅ 중급 theme pack **`comparison-degree`** **12** (같다·다르다·비슷하다·비교하다·더·가장·훨씬·만큼·반대·차이·똑같다·전혀) · intermediate **v49=592** · packs **50**.
- ✅ speed **v50=500** · compareTagged **10** · sq-491–500 · themes `compare` · Prefer **똑같다·전혀** → cloze Done.
- ✅ change/size/colors/speech/think/favor/motion과 lemma 분리 · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음.
- ✅ manifest **v193** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** comparison-degree → **cloze +8–10** (똑같다·전혀) · theme `compare` · chip KO **비교** / ZH **比较**. → **Done** (동일일 cloze).

### Cursor (ThemeSm43d self-QA · change chip recheck · Paul offline)
- ✅ Claude Now/Next **비어 있음**(차단만) · invent Next/lemma 없음 · Else **ThemeSm43d** = 이미 ThemeSm43b + ThemeSm close Done.
- ✅ particle/dictation changeTagged=**10** · tel/scramble=**8** · bingo/listen/speed/cloze=**10** + `themes` → 칩 KO **변화** / ZH **变化** · 전 8 SHOW.
- ✅ `_smoke-change-focus.js` PASS · bothTags vs motion/size/routine/time = **0** · hangul.js 미터치 · 커밋/푸시 없음 · **change-progress 스윕 닫힘** 재확인.
- ⏭ **Next:** *(없음)* · invent Next 금지 · Claude Next 대기.

### Cursor (ThemeSm43b + change ThemeSm close · Paul offline)
- ✅ Claude Now/Next **비어 있음**(차단만) · invent Next/lemma 없음 · Else **ThemeSm43b**.
- ✅ bingo/listen changeTagged=**10** + `themes` → 칩 KO **변화** / ZH **变化** / EN Change · THEME_ORDER 재사용(ThemeSm43a).
- ✅ sibling 데이터 착지 후 전 8 changeTagged=**10**×6 + **8**×2 → ThemeSm close smoke 전 8 SHOW PASS (`_smoke-change-focus.js`).
- ✅ empty 게임 칩 비활성 유지 원칙 준수 · motion/size/routine/time/favor/speech/think와 별개 · hangul.js 미터치 · manifest **v192** · 커밋/푸시 없음.
- ⏭ **Next:** *(없음)* · **change-progress 스윕 닫힘** · invent Next 금지 · Claude Next 대기.

### Cursor (change-progress → particle/dictation(+tel/scramble) · Paul offline)
- ✅ particle **v49=486** · **+10** (ps-477–486) · Prefer **늘다·줄다** · themes `change` · changeTagged **10**.
- ✅ dictation **v51=492** · **+10** (d-483–492) · changeTagged **10**.
- ✅ telephone **v48=465** · **+8** (tel-458–465) · changeTagged **8**.
- ✅ scramble **v48=467** · **+8** (ws-460–467) · changeTagged **8**.
- ✅ Skip 지나다·남다(tel/scramble) · 생기다·나타나다(bingo Prefer) · motion/size/routine/time/favor/speech/think 별개 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ manifest **v191** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** **ThemeSm close** → **Done** (ThemeSm43b 레인).

### Cursor (change-progress → bingo/listen +10 · Paul offline)
- ✅ bingo **v55=537** · **+10** (bg-528–537) · Prefer **생기다·나타나다** · 시작하다·끝나다·계속하다·멈추다·변하다·바뀌다·지나다·남다 · themes `change` · changeTagged **10**.
- ✅ listen **v55=504** · **+10** (lm-495–504) · 해요체 원작 · changeTagged **10** · Skip **늘다·줄다** → particle/dictation.
- ✅ motion/size/routine/time/favor/speech/think와 별개 · pack/speed/cloze verbatim 회피 · NIKL/Sejong · 브랜드 없음.
- ✅ ThemeSm43b smoke 4 SHOW · empty 4 HIDE PASS · manifest **v190** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** change-progress → **particle/dictation(+tel/scramble) +8–10** (늘다·줄다 thin) · theme `change` · chip KO **변화** / ZH **变化**. → **Done** (동일일 particle/dictation(+tel/scramble)).

### Cursor (ThemeSm43a · change chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음**(차단만) · invent Next/lemma 없음 · Else **ThemeSm43a**.
- ✅ 전 8게임 칩 캐논 KO **변화** / ZH **变化** / EN Change · THEME_ORDER `change`.
- ✅ speed+cloze changeTagged=**10** + `themes` → 칩 활성 · empty 6 → 칩 숨김 · motion/size/routine/time와 별개 · bothTags=0.
- ✅ `_smoke-change-focus.js` 2게임 SHOW · empty 6 HIDE PASS · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Sibling: change-progress → **bingo/listen +8–10** (생기다·나타나다) · invent Next 금지 · Claude Next 대기. → **Done** (동일일 bingo/listen +10).

### Cursor (change-progress → cloze +10 · Paul offline)
- ✅ cloze **v49=482** · **+10** (c-473–482) · Prefer **늘다·줄다** · 시작하다·끝나다·계속하다·멈추다·변하다·바뀌다·지나다·남다 · themes `change` · changeTagged **10**.
- ✅ Skip **생기다·나타나다** → bingo/listen · chip KO **변화** / ZH **变化** · cloze.js THEME_ORDER+labels.
- ✅ speech/think/favor/motion/routine/size/time와 lemma·예문 분리 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ manifest **v189** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** change-progress → **bingo/listen +8–10** (생기다·나타나다) · theme `change` · chip KO **변화** / ZH **变化**. → **Done** (동일일 bingo/listen +10).

### Cursor (change-progress pack + speed +10 · Paul offline)
- ✅ 중급 theme pack **`change-progress`** **12** (시작하다·끝나다·계속하다·멈추다·변하다·바뀌다·지나다·남다·생기다·나타나다·늘다·줄다) · intermediate **v48=580** · packs **49**.
- ✅ speed **v49=490** · changeTagged **10** · sq-481–490 · themes `change` · Prefer **늘다·줄다** → cloze.
- ✅ speech/think/favor/motion/routine/size/work와 lemma 분리 · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음.
- ✅ manifest **v188** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** change-progress → **cloze +8–10** (늘다·줄다) · theme `change` · chip KO **변화** / ZH **变化**. → **Done** (동일일 cloze +10).

### Cursor (ThemeSm close · speech chip smoke · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · Else **ThemeSm42d / ThemeSm close**.
- ✅ ThemeSm42a/42b 라벨/ORDER 재사용 · 전 8 speechTagged=**10**×6 + **8**×2 + `themes` → 칩 KO **대화** / ZH **对话** / EN Speech.
- ✅ `_smoke-speech-focus.js` 전 8 SHOW PASS · favor/think/media/jobs와 별개 · bothTags=0.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · **speech-talk 스윕 닫힘**.
- ⏭ **Next:** Claude Next 대기 · invent Next 금지 · 큐 비면 self-QA만.

### Cursor (speech-talk → particle/dictation(+tel/scramble) · Paul offline)
- ✅ particle **v48** · **+10** (ps-467–476) → **476** · themes `speech` · speechTagged **10**.
- ✅ dictation **v50** · **+10** (d-473–482) → **482** · themes `speech` · speechTagged **10**.
- ✅ telephone **v47** · **+8** (tel-450–457) → **457** · themes `speech` · speechTagged **8**.
- ✅ scramble **v47** · **+8** (ws-452–459) → **459** · themes `speech` · speechTagged **8**.
- ✅ Prefer **질문하다·설명하다** residual · Skip **전화하다·대화** (bingo) · Skip tel/scramble **소개하다·연락하다**. Distinct favor/think/media/jobs · NIKL/Sejong · 해요체 · 브랜드 없음 · chip KO **대화** / ZH **对话**.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · manifest **v187**.
- ⏭ **Next:** ThemeSm close → **Done** (동일일 · 전 8 speech 칩 SHOW).

### Cursor (ThemeSm42b · bingo/listen speech chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · Else **ThemeSm42b**.
- ✅ ThemeSm42a 라벨/ORDER 재사용 · bingo/listen(+speed/cloze) speechTagged=**10** + `themes` → 칩 KO **대화** / ZH **对话** / EN Speech.
- ✅ `_smoke-speech-focus.js` 4 SHOW · empty 4 HIDE PASS · favor/think/media/jobs와 별개 · bothTags=0.
- ✅ bingo 3×3 needMin=8 · speechTagged=10 → 칩 SHOW · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Sibling Suggest: speech-talk → **particle/dictation(+tel/scramble) +8–10** · invent Next 금지 · Claude Next 대기.

### Cursor (speech-talk → bingo/listen +10 · Paul offline)
- ✅ bingo **v54** · **+10** (bg-518–527) → **527** · themes `speech` · speechTagged **10**.
- ✅ listen **v54** · **+10** (lm-485–494) → **494** · themes `speech` · speechTagged **10**.
- ✅ Prefer **전화하다·대화** · Remaining 말하다·이야기하다·듣다·읽다·대답하다·소개하다·알리다·연락하다 · Skip **질문하다·설명하다** (cloze) → particle/dictation.
- ✅ Distinct favor/think/media/jobs/digital · NIKL/Sejong · 해요체 · 브랜드 없음 · chip KO **대화** / ZH **对话**.
- ✅ `_smoke-speech-focus.js` 4 SHOW · empty 4 HIDE PASS · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v186**.
- ⏭ **Next:** speech-talk → **particle/dictation(+tel/scramble) +8–10** · theme `speech` · chip KO **대화** / ZH **对话**.

### Cursor (ThemeSm42a · speech chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · Else **ThemeSm42a**.
- ✅ 전 8게임 칩 캐논 KO **대화** / ZH **对话** / EN Speech · THEME_ORDER `speech`.
- ✅ speed+cloze speechTagged=**10** + `themes` → 칩 활성 · empty 6 → 칩 숨김 · favor/think/media와 별개 · bothTags=0.
- ✅ `_smoke-speech-focus.js` 2게임 SHOW · empty 6 HIDE PASS · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Sibling: speech-talk → **bingo/listen +8–10** (전화하다·대화) · invent Next 금지 · Claude Next 대기.

### Cursor (speech-talk → cloze +10 · Paul offline)
- ✅ cloze **v48** · **+10** (c-463–472) → **472** · themes `speech` · speechTagged **10**.
- ✅ Prefer **질문하다·설명하다** · Skip **전화하다·대화** → bingo/listen · Distinct favor 물어보다 · think · media · jobs · digital · music · pack/speed verbatim · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ speed+cloze 칩 KO **대화** / ZH **对话** / EN Speech · THEME_ORDER `speech`.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · manifest **v185**.
- ⏭ **Next:** speech-talk → **bingo/listen +8–10** (전화하다·대화) · theme `speech` · chip KO **대화** / ZH **对话**.

### Cursor (speech-talk pack + speed +10 · Paul offline)
- ✅ 중급 theme pack **`speech-talk`** **12** (말하다·이야기하다·듣다·읽다·대답하다·소개하다·알리다·연락하다·전화하다·대화·질문하다·설명하다) · intermediate **v47=568** · packs **48**.
- ✅ speed **v48=480** · speechTagged **10** · sq-471–480 · themes `speech` · Prefer **질문하다·설명하다** → cloze.
- ✅ digital/media/music/think/favor/work/celebration과 lemma 분리 · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음.
- ✅ manifest **v184** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** speech-talk → **cloze +8–10** Done → bingo/listen.

### Cursor (ThemeSm close · think chip smoke · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · Else **ThemeSm close** (ThemeSm41d).
- ✅ ThemeSm41a 라벨/ORDER 재사용 · 전 8 thinkTagged=**10**×6 + **8**×2 + `themes` → 칩 KO **생각** / ZH **想法** / EN Think.
- ✅ `_smoke-think-focus.js` 전 8 SHOW PASS · favor/emotion/routine과 별개 · bothTags=0.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · **thoughts-plans 스윕 닫힘**.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · Claude Next 대기.

### Cursor (thoughts-plans → particle/dictation(+tel/scramble) · Paul offline)
- ✅ particle **v47** · **+10** (ps-457–466) → **466** · themes `think` · thinkTagged **10**.
- ✅ dictation **v49** · **+10** (d-463–472) → **472** · themes `think` · thinkTagged **10**.
- ✅ telephone **v46** · **+8** (tel-442–449) → **449** · themes `think` · thinkTagged **8**.
- ✅ scramble **v46** · **+8** (ws-444–451) → **451** · themes `think` · thinkTagged **8**.
- ✅ Prefer **믿다·계획하다** · remaining think lemmas · Distinct favor · emotion · routine · jobs · cloze/listen/pack hosts · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · manifest **v183**.
- ⏭ **Next:** **ThemeSm close** Done · thoughts-plans 스윕 닫힘.

### Cursor (thoughts-plans → bingo/listen +10 · Paul offline)
- ✅ bingo **v53** · **+10** (bg-508–517) → **517** · themes `think` · thinkTagged **10**.
- ✅ listen **v53** · **+10** (lm-475–484) → **484** · themes `think` · thinkTagged **10**.
- ✅ Prefer **배우다·가르치다** · Skip **믿다·계획하다** → particle/dictation · Distinct favor · emotion · routine · jobs · cloze/speed/pack verbatim · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · manifest **v182**.
- ⏭ **Next:** thoughts-plans → **particle/dictation(+tel/scramble) +8–10** (믿다·계획하다) · theme `think` · chip KO **생각** / ZH **想法**.

### Cursor (ThemeSm41a · think chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · Else **ThemeSm41a**.
- ✅ 전 8게임 칩 캐논 KO **생각** / ZH **想法** / EN Think · THEME_ORDER `think`.
- ✅ speed+cloze+bingo+listen thinkTagged=**10** + `themes` → 칩 활성 · empty 4 → 칩 숨김 · favor/emotion/routine과 별개 · bothTags=0.
- ✅ `_smoke-think-focus.js` 4게임 SHOW · empty 4 HIDE PASS · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Sibling: thoughts-plans → **particle/dictation(+tel/scramble) +8–10** · invent Next 금지 · Claude Next 대기.

### Cursor (thoughts-plans → cloze +10 · Paul offline)
- ✅ cloze **v47** · **+10** (c-453–462) → **462** · themes `think` · thinkTagged **10**.
- ✅ Prefer **믿다·계획하다** · Skip **배우다·가르치다** → bingo/listen Done · Distinct favor · emotion · routine · jobs · school · pack/speed verbatim · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · manifest **v181**.
- ⏭ **Next:** thoughts-plans → **bingo/listen +8–10** Done → particle/dictation.

### Cursor (thoughts-plans pack + speed +10 · Paul offline)
- ✅ 중급 theme pack **`thoughts-plans`** **12** (생각하다·알다·모르다·기억하다·잊다·이해하다·믿다·배우다·가르치다·결정하다·고르다·계획하다) · intermediate **v46=556** · packs **47**.
- ✅ speed **v47** · **+10** (sq-461–470) → **470** · themes `think` · thinkTagged **10**.
- ✅ Pack thin Prefer **믿다·계획하다** → cloze Done · Distinct favor · emotion · school · work-study · digital · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · manifest **v180**.
- ⏭ **Next:** thoughts-plans → **cloze +8–10** Done → bingo/listen.

### Cursor (ThemeSm40d · favor chip smoke close · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · Else **ThemeSm40d**.
- ✅ ThemeSm40a/40b 라벨/ORDER 재사용 · 전 8 favorTagged=**10**×6 + **8**×2 + `themes` → 칩 KO **부탁** / ZH **拜托** / EN Favor.
- ✅ `_smoke-favor-focus.js` 전 8 SHOW PASS · celebration/jobs/routine과 별개 · bothTags=0.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · **requests-favors 스윕 닫힘**.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · Claude Next 대기.

### Cursor (requests-favors → particle/dictation(+tel/scramble) · Paul offline)
- ✅ particle **v46** · **+10** (ps-447–456) → **456** · themes `favor` · favorTagged **10**.
- ✅ dictation **v48** · **+10** (d-453–462) → **462** · themes `favor` · favorTagged **10**.
- ✅ telephone **v45** · **+8** (tel-434–441) → **441** · themes `favor` · favorTagged **8**.
- ✅ scramble **v45** · **+8** (ws-436–443) → **443** · themes `favor` · favorTagged **8**.
- ✅ Prefer **물어보다·확인하다** (+부탁하다·도와주다·빌리다·괜찮다·고맙다·필요하다·사용하다·바꾸다) · celebration/jobs/routine/motion과 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · chip KO **부탁** / ZH **拜托** · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v179**.
- ✅ smoke `_smoke-favor-focus.js` → ThemeSm40d 전 8 SHOW 패턴 갱신.
- ⏭ **ThemeSm40d Done** · requests-favors 스윕 닫힘 · invent Next 금지.

### Cursor (ThemeSm40b · bingo/listen favor chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · Else **ThemeSm40b**.
- ✅ ThemeSm40a 라벨/ORDER 재사용 · bingo/listen(+speed/cloze) favorTagged=**10** + `themes` → 칩 KO **부탁** / ZH **拜托** / EN Favor.
- ✅ smoke `_smoke-favor-focus.js` 4게임 SHOW · empty 4 HIDE PASS · celebration/jobs/routine과 별개 · bothTags=0.
- ✅ hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Sibling: requests-favors → **particle/dictation(+tel/scramble) +8–10** (물어보다·확인하다) · invent Next 금지 · Claude Next 대기.

### Cursor (requests-favors → bingo/listen +10 · Paul offline)
- ✅ bingo **v52** · **+10** (bg-498–507) → **507** · themes `favor` · favorTagged **10**.
- ✅ listen **v52** · **+10** (lm-465–474) → **474** · themes `favor` · favorTagged **10**.
- ✅ Prefer **찾다·만들다** (+부탁하다·도와주다·빌리다·괜찮다·고맙다·필요하다·사용하다·바꾸다) · skip **물어보다·확인하다** → particle/dictation.
- ✅ celebration · jobs · routine · motion · cloze/speed/pack verbatim · housing 수리 · stationery 빌려와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · chip KO **부탁** / ZH **拜托** · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v178**.
- ⏭ **Next:** requests-favors → **particle/dictation(+tel/scramble) +8–10** (물어보다·확인하다) · theme `favor` · chip **부탁/拜托**.

### Cursor (ThemeSm40a · favor chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · Else **ThemeSm40a**.
- ✅ 전 8게임 칩 캐논 KO **부탁** / ZH **拜托** / EN Favor · THEME_ORDER `favor`.
- ✅ speed+cloze favorTagged=**10** + `themes` → 칩 활성 · empty 6 → 칩 숨김 · celebration/jobs/routine과 별개 · bothTags=0.
- ✅ `_smoke-favor-focus.js` speed+cloze SHOW · empty 6 HIDE PASS · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Sibling: requests-favors → **bingo/listen +8–10** (찾다·만들다) · invent Next 금지 · Claude Next 대기.

### Cursor (requests-favors → cloze +10 · Paul offline)
- ✅ cloze **v46** · **+10** (c-443–452) → **452** · themes `favor` · favorTagged **10**.
- ✅ Prefer **부탁하다·확인하다** (+도와주다·빌리다·괜찮다·고맙다·필요하다·사용하다·바꾸다·물어보다) · skip **찾다·만들다** → bingo/listen.
- ✅ celebration · jobs · routine · motion · emotion · digital · housing 수리 부탁 · banking 계좌 확인 · stationery 볼펜 빌려 · pack/speed verbatim와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · chip KO **부탁** / ZH **拜托** · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v177**.
- ⏭ **Next:** requests-favors → **bingo/listen +8–10** (찾다·만들다) · theme `favor` · chip **부탁/拜托**.

### Cursor (requests-favors pack + speed +10 · Paul offline)
- ✅ 중급 theme pack **`requests-favors`** **12** (부탁하다·도와주다·빌리다·괜찮다·고맙다·필요하다·사용하다·바꾸다·찾다·확인하다·물어보다·만들다) · intermediate **v45=544** · packs **46**.
- ✅ speed **v46** · **+10** (sq-451–460) → **460** · themes `favor` · favorTagged **10**.
- ✅ motion · emotion · digital · work-study 준비(n) · money 환전 · mail 보내다·받다 · time 만나다·기다리다와 lemma 분리 · NIKL/Sejong·Tammy · 해요체 · 원작 · 브랜드 없음.
- ✅ Pack thin **부탁하다·확인하다** → cloze · chip 제안 KO **부탁** / ZH **拜托** · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v176**.
- ⏭ **Next:** requests-favors → **cloze +8–10** (부탁하다·확인하다) · theme `favor` · chip **부탁/拜托** → **Done**.

### Cursor (ThemeSm39d self-QA · motion chip recheck · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm39d Else = 이미 ThemeSm39a+39b(+39d) Done.
- ✅ 재검증: motionTagged **10**×6 + **8**×2 · themes `motion` · 칩 KO **동작** / ZH **动作** · THEME_ORDER 전 8 · direction/routine/driving overlap **0** · `_smoke-motion-focus.js` PASS.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · **movement-actions 스윕 닫힘 유지**.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · Claude Next 대기.

### Cursor (ThemeSm39a+39b · motion chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm39b Else (+39a residual).
- ✅ bingo `theme_motion` KO **동작** / ZH **动作** / EN Motion + THEME_ORDER `motion` · listen 동일 라벨.
- ✅ 8게임 칩 캐논 · motionTagged=**10**×6 + **8**×2 + `themes` → 전 8 칩 활성 · direction/routine/driving와 별개 · bothTags=0.
- ✅ `_smoke-motion-focus.js` 전 8 SHOW PASS · hangul.js 미터치 · 커밋/푸시 없음 · **movement-actions 스윕 닫힘**.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling handoff 닫힘.

### Cursor (movement-actions → particle/dictation(+tel/scramble) · Paul offline)
- ✅ particle **v45** · **+10** (ps-437–446) → **446** · themes `motion` · motionTagged **10**.
- ✅ dictation **v47** · **+10** (d-443–452) → **452** · themes `motion` · motionTagged **10**.
- ✅ telephone **v44** · **+8** (tel-426–433) → **433** · themes `motion` · motionTagged **8**.
- ✅ scramble **v44** · **+8** (ws-428–435) → **435** · themes `motion` · motionTagged **8**.
- ✅ Prefer **따라가다·들어오다** (+걷다·뛰다·서다·앉다·건너다·들다·눕다·오르다·잡다) · body · direction · driving · sports · routine · transit · electric · cloze/listen/pack verbatim와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · chip KO **동작** / ZH **动作** · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v175**.
- ⏭ **Next:** **ThemeSm close** → **ThemeSm39a Done** · invent Next 금지.

### Cursor (movement-actions → bingo/listen +10 · Paul offline)
- ✅ bingo **v51** · **+10** (bg-488–497) → **497** · themes `motion` · motionTagged **10**.
- ✅ listen **v51** · **+10** (lm-455–464) → **464** · themes `motion` · motionTagged **10**.
- ✅ Prefer **들다·건너다** (+걷다·뛰다·서다·앉다·눕다·오르다·놓다·잡다) · pack thin **따라가다·들어오다** → particle/dictation.
- ✅ body · direction · driving 횡단보도 · sports · routine · transit · electric · furniture 앉다/놓다 · cloze/speed/pack verbatim와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · chip KO **동작** / ZH **动作** · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v174**.
- ⏭ **Next:** movement-actions → **particle/dictation(+tel/scramble)** · theme `motion` · chip **동작/动作**.

### Cursor (movement-actions → cloze +10 · Paul offline)
- ✅ cloze **v45** · **+10** (c-433–442) → **442** · themes `motion` · motionTagged **10**.
- ✅ Prefer **따라가다·들어오다** (+걷다·뛰다·서다·앉다·눕다·오르다·놓다·잡다) · skip **들다·건너다** → bingo/listen → **Done**.
- ✅ body · direction · driving · sports · routine · transit · electric · pack/speed verbatim · building 로비 앉아요와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · chip KO **동작** / ZH **动作** · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v173**.
- ⏭ **Next:** movement-actions → **bingo/listen +8–10** (들다·건너다) · theme `motion` · chip **동작/动作** → **Done**.

### Cursor (movement-actions pack + speed +10 · Paul offline)
- ✅ 중급 theme pack **`movement-actions`** **12** (걷다·뛰다·서다·앉다·눕다·오르다·들다·놓다·건너다·따라가다·잡다·들어오다) · intermediate **v44=532** · packs **45**.
- ✅ speed **v45** · **+10** (sq-441–450) → **450** · themes `motion` · motionTagged **10**.
- ✅ body-parts · directions · driving · sports · routine 일어나다·자다 · beginner transit 타다·내리다 · electric 엘리베이터·계단과 lemma 분리 · NIKL/Sejong·Tammy · 해요체 · 원작 · 브랜드 없음.
- ✅ Pack thin **따라가다·들어오다** → cloze · chip 제안 KO **동작** / ZH **动作** · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v172**.
- ⏭ **Next:** movement-actions → **cloze +8–10** (따라가다·들어오다) · theme `motion` · chip **동작/动作** → **Done**.

### Cursor (ThemeSm38d · particle/dictation/tel/scramble building chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm38d Else 경로.
- ✅ ThemeSm38a/38b 라벨/ORDER 재사용 · particle/dictation buildingTagged=**10** · tel/scramble=**8** + `themes` → 칩 KO **건물** / ZH **建筑**.
- ✅ bingo/listen(+speed/cloze)도 buildingTagged>0 → **전 8** 칩 SHOW · electric/furniture/housing/places와 별개 · bothTags=0.
- ✅ `_smoke-building-focus.js` ThemeSm38d 전 8 SHOW PASS · hangul.js 미터치 · 커밋/푸시 없음 · **building-facilities 스윕 닫힘**.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling handoff 닫힘.

### Cursor (building-facilities → particle/dictation(+tel/scramble) · Paul offline)
- ✅ particle **v44** · **+10** (ps-427–436) → **436** · themes `building` · buildingTagged **10**.
- ✅ dictation **v46** · **+10** (d-433–442) → **442** · themes `building` · buildingTagged **10**.
- ✅ telephone **v43** · **+8** (tel-418–425) → **425** · themes `building` · buildingTagged **8**.
- ✅ scramble **v43** · **+8** (ws-420–427) → **427** · themes `building` · buildingTagged **8**.
- ✅ Prefer remaining **복도·층·베란다** (+아파트·건물·입구·현관·호실·초인종·로비) · skip 지하·옥상 (tel/scramble).
- ✅ electric 엘리베이터·계단 · furniture 문·창문 · housing 열쇠 · places · driving 주차장 · pack/cloze verbatim와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · 칩 KO **건물** / ZH **建筑** · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v171**.
- ⏭ **Next:** **ThemeSm38d** → **Done** · invent Next 금지.

### Cursor (ThemeSm38b · bingo/listen building chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm38b Else 경로.
- ✅ ThemeSm38a 라벨/ORDER 재사용 · bingo/listen(+speed/cloze) buildingTagged=**10** + `themes` → 칩 KO **건물** / ZH **建筑**.
- ✅ `_smoke-building-focus.js` ThemeSm38b PASS · speed+cloze+bingo+listen SHOW · empty 4(particle/dictation/tel/scramble) HIDE · electric/furniture/housing/places와 별개 · bothTags=0.
- ✅ hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling handoff: building → particle/dictation(+tel/scramble) +8–10.

### Cursor (building-facilities → bingo/listen +10 · Paul offline)
- ✅ bingo **v50** · **+10** (bg-478–487) → **487** · themes `building` · buildingTagged **10**.
- ✅ listen **v50** · **+10** (lm-445–454) → **454** · themes `building` · buildingTagged **10**.
- ✅ Prefer remaining **복도·층** (bingo) · **층·베란다·아파트** (listen) · skip size/senses 건물·복도 재사용.
- ✅ electric 엘리베이터·계단 · furniture 문·창문 · housing 열쇠 · places · driving 주차장 · pack/cloze verbatim와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · 칩 KO **건물** / ZH **建筑** · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v170**.
- ⏭ **Next:** building-facilities → **particle/dictation(+tel/scramble) +8–10**.

### Cursor (ThemeSm38a · speed(+cloze) building chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm38a Else 경로.
- ✅ 8게임 칩 캐논 KO **건물** / ZH **建筑** / EN Building · THEME_ORDER `building`.
- ✅ speed+cloze buildingTagged=**10** + `themes` → 칩 활성 · smoke speed+cloze building focus · empty 6게임 themes 미추가(칩 숨김) · `_smoke-building-focus.js` PASS.
- ✅ electric/furniture/housing/places와 별개 · bothTags=0 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling handoff: building → bingo/listen +8–10.

### Cursor (building-facilities → cloze +10 · Paul offline)
- ✅ cloze **v44** · **+10** (c-423–432) → **432** · themes `building` · buildingTagged **10**.
- ✅ lemmas **베란다·아파트**·건물·입구·현관·지하·옥상·호실·초인종·로비 · skip 복도(senses)·층(speed).
- ✅ electric 엘리베이터·계단 · furniture 문·창문 · housing 열쇠·이웃 · places · driving 주차장 · pack/speed verbatim와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · 칩 KO **건물** / ZH **建筑** · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v169**.
- ⏭ **Next:** building-facilities → **bingo/listen +8–10**.

### Cursor (ThemeSm37d · particle/dictation/tel/scramble electric chip verify · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm37d Else 경로.
- ✅ ThemeSm37a 라벨/ORDER 재사용 · particle/dictation electricTagged=**10** · tel/scramble=**8** + `themes` → 칩 KO **전기** / ZH **电器**.
- ✅ bingo/listen(+speed/cloze)도 electricTagged>0 → **전 8** 칩 SHOW · chores/media/digital와 별개 · bothTags=0.
- ✅ `_smoke-electric-focus.js` ThemeSm37d 전 8 SHOW PASS · hangul.js 미터치 · 커밋/푸시 없음 · **electricity-appliances 스윕 닫힘**.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling handoff 닫힘.

### Cursor (ThemeSm37b · bingo/listen(+37d residual) electric chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm37b Else 경로.
- ✅ ThemeSm37a 라벨/ORDER 재사용 · bingo/listen(+speed/cloze) electricTagged=**10** + `themes` → 칩 KO **전기** / ZH **电器**.
- ✅ sibling particle/dictation **10** · tel/scramble **8** 이미 채워짐 → ThemeSm37d residual 포함 smoke **전 8** electric focus · chores/media/digital와 별개.
- ✅ `_smoke-electric-focus.js` ThemeSm37b 전 8 SHOW PASS · `_smoke_games_theme_filter.js` PASS · hangul.js 미터치 · 커밋/푸시 없음 · electricity-appliances 스윕 닫힘.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling handoff 닫힘.

### Cursor (electricity-appliances → particle/dictation(+tel/scramble) · Paul offline)
- ✅ particle **v43** · **+10** (ps-417–426) → **426** · themes `electric` · electricTagged **10**.
- ✅ dictation **v45** · **+10** (d-423–432) → **432** · themes `electric` · electricTagged **10**.
- ✅ telephone **v42** · **+8** (tel-410–417) → **417** · themes `electric` · electricTagged **8**.
- ✅ scramble **v42** · **+8** (ws-412–419) → **419** · themes `electric` · electricTagged **8**.
- ✅ Prefer **켜다** (에어컨·선풍기·불·전자레인지) · 끄다 ctx (가스) · remaining pack lemmas.
- ✅ chores/media/digital/housing와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v167**.
- ⏭ **Next:** **ThemeSm37d** → **ThemeSm37b residual smoke로 스윕 닫힘** · invent Next 금지.

### Cursor (electricity-appliances → bingo/listen +10 · Paul offline)
- ✅ bingo **v49** · **+10** (bg-468–477) → **477** · themes `electric` · electricTagged **10**.
- ✅ listen **v49** · **+10** (lm-435–444) → **444** · themes `electric` · electricTagged **10**.
- ✅ lemmas 전기·에어컨·선풍기·불·엘리베이터·계단·수도·가스·**전자레인지·다리미** · listen 끄다 ctx · Prefer remaining pack nouns.
- ✅ chores/media/digital/housing와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · 칩 KO **전기** / ZH **电器** · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v166**.
- ⏭ **Next:** electricity-appliances → **particle/dictation(+tel/scramble) +8–10** → **Done** · Suggest ThemeSm37d.

### Cursor (ThemeSm37a · speed(+cloze) electric chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm37a Else 경로.
- ✅ 8게임 칩 캐논 KO **전기** / ZH **电器** / EN Electricity · THEME_ORDER `electric`.
- ✅ speed+cloze electricTagged=**10** + `themes` → 칩 활성 · smoke speed+cloze electric focus · empty 6게임 themes 미추가(칩 숨김) · `_smoke-electric-focus.js` PASS.
- ✅ chores/media/digital와 별개 · bothTags=0 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling handoff: electricity → bingo/listen +8–10 → **Done** (→ particle/dictation).

### Cursor (electricity-appliances → cloze +10 · Paul offline)
- ✅ cloze **v43** · **+10** (c-413–422) → **422** · themes `electric` · electricTagged **10**.
- ✅ lemmas 전기·에어컨·선풍기·불·엘리베이터·계단·수도·가스·**전자레인지·다리미** · 켜다/끄다 verb context.
- ✅ chores 냉장고·청소기·세탁기 · media 텔레비전 · digital 배터리·충전 · housing 열쇠·고장 · pack/speed verbatim와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · 칩 KO **전기** / ZH **电器** · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v165**.
- ⏭ **Next:** electricity-appliances → **bingo/listen +8–10** · theme electric · chip **전기/电器**.

### Cursor (ThemeSm36d · particle/dictation/tel/scramble accessories chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm36d Else 경로.
- ✅ ThemeSm36a 라벨/ORDER 재사용 · particle/dictation accessoriesTagged=**10** · tel/scramble=**8** + `themes` → 칩 KO **소지품** / ZH **随身**.
- ✅ 전 8게임 accessories 칩 SHOW · clothes 옷/服装와 별개 · bothTags=0.
- ✅ `_smoke-accessories-focus.js` ThemeSm36d 전 8 SHOW PASS · `_smoke_games_theme_filter.js` PASS · hangul.js 미터치 · 커밋/푸시 없음 · accessories-belongings 스윕 닫힘.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling handoff 닫힘.

### Cursor (ThemeSm36b · bingo/listen(+36d residual) accessories chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm36b Else 경로.
- ✅ ThemeSm36a 라벨/ORDER 재사용 · bingo/listen(+speed/cloze) accessoriesTagged=**10** + `themes` → 칩 KO **소지품** / ZH **随身**.
- ✅ sibling particle/dictation **10** · tel/scramble **8** 이미 채워짐 → ThemeSm36d residual 포함 smoke **전 8** accessories focus · clothes 옷/服装와 별개.
- ✅ `_smoke_games_theme_filter.js` accessories 캐논·focus·tagged≥8 · hangul.js 미터치 · 커밋/푸시 없음 · accessories 스윕 닫힘.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling handoff 닫힘.

### Cursor (accessories-belongings → particle/dictation +10 · tel/scramble +8 · Paul offline)
- ✅ particle **v42** · **+10** (ps-407–416) → **416** · themes `accessories` · accessoriesTagged **10**.
- ✅ dictation **v44** · **+10** (d-413–422) → **422** · themes `accessories` · accessoriesTagged **10**.
- ✅ telephone **v41** · **+8** (tel-402–409) → **409** · themes `accessories` · accessoriesTagged **8**.
- ✅ scramble **v41** · **+8** (ws-404–411) → **411** · themes `accessories` · accessoriesTagged **8**.
- ✅ Prefer **귀걸이·넥타이** + 모자·양말·장갑·안경·지갑·벨트·목도리·반지 · skip 가방·우산 · clothes/time/bathroom/cloze/listen/pack verbatim와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v163**.
- ⏭ **Next:** ThemeSm36d residual → **ThemeSm36b** smoke로 스윕 닫힘 · invent Next 금지.

### Cursor (ThemeSm36a · speed(+cloze+bingo+listen) accessories chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm36a Else 경로.
- ✅ 8게임 칩 캐논 KO **소지품** / ZH **随身** / EN Accessories · THEME_ORDER `accessories`.
- ✅ speed+cloze+bingo+listen accessoriesTagged=**10** + `themes` → 칩 활성 · smoke 4게임 accessories focus · empty 4게임 themes 미추가(칩 숨김) · `_smoke-accessories-focus.js`.
- ✅ clothes 옷/服装와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #103.
- ⏭ Sibling: accessories-belongings → **particle/dictation(+tel/scramble) +8–10** · Prefer 귀걸이·넥타이 · Claude Now/Next **비어 있음** · invent Next 금지.

### Cursor (accessories-belongings → bingo/listen +10 · Paul offline)
- ✅ bingo **v48** · **+10** (bg-458–467) → **467** · themes `accessories` · accessoriesTagged **10**.
- ✅ listen **v48** · **+10** (lm-425–434) → **434** · themes `accessories` · accessoriesTagged **10**.
- ✅ Prefer remaining **우산·가방** + 모자·양말·장갑·안경·지갑·벨트·목도리·반지 · clothes/time/bathroom/weather/stationery verbatim와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v162**.
- ⏭ **Next:** accessories-belongings → **particle/dictation(+tel/scramble) +8–10** · Prefer 귀걸이·넥타이 · 칩 후보 KO **소지품** / ZH **随身**.

### Cursor (accessories-belongings → cloze +10 · Paul offline)
- ✅ cloze **v42** · **+10** (c-403–412) → **412** · themes `accessories` · accessoriesTagged **10**.
- ✅ lemmas 모자·양말·장갑·안경·지갑·벨트·목도리·반지·**귀걸이·넥타이** · skip 가방·우산 (beginner/color overlap).
- ✅ clothes 옷·바지·치마·신발·코트 · time 시계 · bathroom 손수건 · pack/speed verbatim와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v161**.
- ⏭ **Next:** accessories-belongings → **bingo/listen +8–10** · Prefer remaining 우산·가방 · 칩 후보 KO **소지품** / ZH **随身**.

### Cursor (중급 accessories-belongings + speed +10 · Paul offline)
- ✅ intermediate **v41** · packs **42** · items **496** · pack `accessories-belongings` **12** (모자·양말·장갑·안경·우산·가방·지갑·벨트·목도리·반지·귀걸이·넥타이).
- ✅ speed **v42** · **+10** (sq-411–420) → **420** · themes `accessories` · accessoriesTagged **10** · 귀걸이·넥타이 → cloze → **Done**.
- ✅ clothes 옷·신발·코트 · time 시계 · bathroom 손수건 · travel 짐과 분리 · NIKL/Sejong·Tammy · 해요체 · 원작 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v160**.
- ⏭ **Next:** accessories-belongings → **cloze +8–10** → **Done** · Suggest bingo/listen.

### Cursor (ThemeSm35d · particle/dictation/tel/scramble color chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm35d Else 경로.
- ✅ ThemeSm35a 라벨/ORDER 재사용 · particle/dictation colorTagged=**10** · tel/scramble=**8** + `themes` → 칩 KO **색깔** / ZH **颜色** / EN Color.
- ✅ smoke 전 8 color focus · `_smoke-color-focus.js` · clothes 옷/服装와 별개 · **colors-shapes 스윕 닫힘**.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #102.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지.

### Cursor (colors-shapes → particle/dictation +10 · tel/scramble +8 · Paul offline)
- ✅ particle **v41** · **+10** (ps-397–406) → **406** · themes `color` · colorTagged **10**.
- ✅ dictation **v43** · **+10** (d-403–412) → **412** · themes `color` · colorTagged **10**.
- ✅ telephone **v40** · **+8** (tel-394–401) → **401** · themes `color` · colorTagged **8**.
- ✅ scramble **v40** · **+8** (ws-396–403) → **403** · themes `color` · colorTagged **8**.
- ✅ Prefer remaining: **회색·분홍색·세모·모양** (+ 빨간/파란/노란/초록/하얀·둥글다 · dict 검은색 · tel/ws 네모) · hosts 사과·바다·병·잔디·컵·신발·지붕·풍선·달·산·카드·모양.
- ✅ clothes 색깔·사이즈 · size · senses · cloze/listen/pack verbatim와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v159**.
- ⏭ **Next:** ThemeSm35d → **Done** · colors-shapes 스윕 닫힘 · invent Next 금지.

### Cursor (ThemeSm35b · bingo/listen color chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm35b Else 경로.
- ✅ ThemeSm35a 라벨/ORDER 재사용 · bingo/listen colorTagged=**10** + `themes` → 칩 KO **색깔** / ZH **颜色** / EN Color.
- ✅ smoke speed+cloze+bingo+listen color focus · empty 4 (particle/dictation/tel/scramble) 칩 숨김 · `_smoke-color-focus.js`.
- ✅ clothes 옷/服装와 별개 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Sibling: colors-shapes → **particle/dictation(+tel/scramble) +8–10** · Claude Now/Next **비어 있음** · invent Next 금지.

### Cursor (colors-shapes → bingo/listen +10 · Paul offline)
- ✅ bingo **v47** · **+10** (bg-448–457) → **457** · themes `color` · colorTagged **10**.
- ✅ listen **v47** · **+10** (lm-415–424) → **424** · themes `color` · colorTagged **10**.
- ✅ Prefer remaining thin: **회색·분홍색**(vs cloze) · **세모·모양**(vs speed) + 하얀색·검은색·둥글다·네모·초록색·노란색.
- ✅ clothes 색깔·사이즈 · size · senses · nature · pack/cloze/speed verbatim와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v158**.
- ⏭ **Next:** colors-shapes → **particle/dictation(+tel/scramble)** · theme `color` · 칩 후보 KO **색깔** / ZH **颜色**.

### Cursor (ThemeSm35a · speed(+cloze) color chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm35a Else 경로.
- ✅ 8게임 칩 캐논 KO **색깔** / ZH **颜色** / EN Color · THEME_ORDER `color`.
- ✅ speed+cloze colorTagged=**10** + `themes` → 칩 활성 · smoke speed+cloze color focus · empty 6게임 themes 미추가(칩 숨김) · `_smoke-color-focus.js`.
- ✅ clothes 옷/服装와 별개 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Sibling: colors-shapes → **bingo/listen +10** → **Done** · Suggest particle/dictation(+tel/scramble).

### Cursor (colors-shapes → cloze +10 · Paul offline)
- ✅ cloze **v41** · **+10** (c-393–402) → **402** · themes `color` · colorTagged **10**.
- ✅ lemmas 빨간색·파란색·노란색·초록색·하얀색·둥글다·네모·**세모**·**모양**·검은색 · clothes 색깔·사이즈 · size · senses · nature · pack/speed verbatim와 분리.
- ✅ NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v157**.
- ⏭ **Next:** colors-shapes → **bingo/listen +10** · theme `color` · 칩 후보 KO **색깔** / ZH **颜色**.

### Cursor (중급 colors-shapes + speed +10 · Paul offline)
- ✅ intermediate **v40** · packs **41** · items **484** · pack `colors-shapes` **12** (빨간색·파란색·노란색·초록색·하얀색·검은색·회색·분홍색·둥글다·네모·세모·모양).
- ✅ speed **v41=410** · sq-401–410 · themes `color` · colorTagged **10** · 세모·모양 → cloze Done.
- ✅ clothes 색깔·사이즈 · size · senses · nature와 lemma 분리 · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음 · hangul.js 미터치 · manifest **v156** · 커밋/푸시 없음.
- ⏭ **Next:** colors-shapes → **cloze +8–10** → **Done** · Suggest bingo/listen.

### Cursor (ThemeSm34b(+34d) · bingo/listen senses chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm34b Else 경로.
- ✅ ThemeSm34a 라벨/ORDER 재사용 · bingo/listen sensesTagged=**10** + `themes` → 칩 KO **감각** / ZH **感觉** / EN Senses.
- ✅ sibling particle/dictation/tel/scramble data도 sensesTagged=**10** → ThemeSm34d residual 칩 SHOW · smoke 전 8 OK (`_smoke-senses-focus.js`).
- ✅ weather 날씨/天气 · emotion 감정/情绪와 별개 · temperature-senses 스윕 닫힘 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #101.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지.

### Cursor (temperature-senses → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **v40** · **+10** (ps-387–396) → **396** · themes `senses` · sensesTagged **10**.
- ✅ dictation **v42** · **+10** (d-393–402) → **402** · themes `senses` · sensesTagged **10**.
- ✅ telephone **v39** · **+10** (tel-384–393) → **393** · themes `senses` · sensesTagged **10**.
- ✅ scramble **v39** · **+10** (ws-386–395) → **395** · themes `senses` · sensesTagged **10**.
- ✅ lemmas **쓰다·부드럽다**·뜨겁다·차갑다·따뜻하다·시원하다·밝다·어둡다·조용하다·시끄럽다 · weather/emotion/restaurant/snacks·cloze/listen/bingo/pack verbatim와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v155**.
- ⏭ ThemeSm34d residual → **ThemeSm34b smoke 전 8 Done** · invent Next 금지.

### Cursor (temperature-senses → bingo/listen +10 · Paul offline)
- ✅ bingo **v46** · **+10** (bg-438–447) → **447** · themes `senses` · sensesTagged **10**.
- ✅ listen **v46** · **+10** (lm-405–414) → **414** · themes `senses` · sensesTagged **10**.
- ✅ lemmas **시다·싱겁다**·뜨겁다·차갑다·따뜻하다·시원하다·밝다·어둡다·조용하다·시끄럽다 · 쓰다·부드럽다 → particle/dictation **Done**.
- ✅ weather/emotion/restaurant/snacks/bathroom/size와 분리 · NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v154**.
- ⏭ **Next:** temperature-senses → **particle/dictation(+tel/scramble)** → **Done** · Suggest ThemeSm34d.

### Cursor (ThemeSm34a · speed(+cloze) senses chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm34a Else 경로 (sibling cloze senses data도 sensesTagged=10).
- ✅ 8게임 칩 캐논 KO **감각** / ZH **感觉** / EN Senses · THEME_ORDER `senses`.
- ✅ speed+cloze sensesTagged=**10** + `themes` → 칩 활성 · smoke speed+cloze senses focus · empty 6게임 themes 미추가(칩 숨김).
- ✅ weather 날씨/天气 · emotion 감정/情绪와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #101.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: temperature-senses → bingo/listen → **Done** · particle/dictation next.

### Cursor (temperature-senses → cloze +10 · Paul offline)
- ✅ cloze **v40** · **+10** (c-383–392) → **392** · themes `senses` · sensesTagged **10**.
- ✅ lemmas 뜨겁다·차갑다·따뜻하다·시원하다·밝다·어둡다·조용하다·시끄럽다·**쓰다**·**부드럽다** · weather/emotion/restaurant/snacks/bathroom/size와 분리.
- ✅ NIKL/Sejong · 해요체 · 원작 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v153**.
- ⏭ **Next:** temperature-senses → **bingo/listen +10** → **Done** · particle/dictation next.

### Cursor (중급 temperature-senses + speed +10 · Paul offline)
- ✅ intermediate **v39** · packs **40** · items **472** · pack `temperature-senses` **12** (뜨겁다·차갑다·따뜻하다·시원하다·밝다·어둡다·조용하다·시끄럽다·시다·싱겁다·쓰다·부드럽다).
- ✅ speed **v40=400** · sq-391–400 · themes `senses` · sensesTagged **10** · 쓰다·부드럽다 → cloze next.
- ✅ weather 맑다·흐리다 · restaurant 짜다·맛있다 · snacks 달다·맵다 · bathroom · size와 lemma 분리 · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음.
- ✅ existing packs kept (incl. size-quantity) · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v152**.
- ⏭ **Next:** temperature-senses → cloze +10 → **Done** · bingo/listen next.

### Cursor (ThemeSm33d · particle/dictation/tel/scramble size chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm33a 라벨/ORDER 재사용.
- ✅ particle/dictation/tel/scramble sizeTagged=**10**×4 + `themes` → 칩 KO **크기** / ZH **大小** / EN Size · 전 8.
- ✅ smoke 전 8 size focus OK · `_smoke-size-focus.js` · `scripts/_smoke_games_theme_filter.js` size×8 · clothes와 별개.
- ✅ **size-quantity 스윕 닫힘** · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #100.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · size-quantity → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **v39**: **+10** (ps-377–386) → **386** · themes `size` · sizeTagged **10**.
- ✅ dictation **v41**: **+10** (d-383–392) → **392** · themes `size` · sizeTagged **10**.
- ✅ telephone **v38**: **+10** (tel-374–383) → **383** · themes `size` · sizeTagged **10**.
- ✅ scramble **v38**: **+10** (ws-376–385) → **385** · themes `size` · sizeTagged **10**.
- ✅ Lemmas: 크다·작다·많다·적다·길다·짧다·무겁다·가볍다·**높다·낮다**. Distinct from clothes/body/directions/furniture · listen/bingo/pack. NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · manifest **v151**.
- ⏭ **Next:** **ThemeSm33d** → **Done**.

### Cursor (ThemeSm33b/c · bingo/listen size chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm33a 라벨/ORDER 재사용.
- ✅ bingo/listen sizeTagged=**10** + `themes` → 칩 KO **크기** / ZH **大小** / EN Size.
- ✅ smoke bingo+listen(+speed/cloze) size focus OK · empty 4게임 themes 미추가(칩 숨김) · `_smoke-size-focus.js`.
- ✅ clothes 옷/服装와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #99.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: size-quantity → particle/dictation(+tel/scramble).

### Cursor (data · size-quantity → bingo/listen +10 · Paul offline)
- ✅ bingo **v45**: **+10** (bg-428–437) → **437** · themes `size` · sizeTagged **10**.
- ✅ listen **v45**: **+10** (lm-395–404) → **404** · themes `size` · sizeTagged **10**.
- ✅ Lemmas: 크다·작다·많다·적다·길다·짧다·무겁다·가볍다·**높다·낮다**. 넓다·좁다 → cloze Done. Distinct from clothes 사이즈·색깔 · body · directions 길 · furniture · bg-425 낮.
- ✅ NIKL/Sejong · 해요체 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v150**.
- ⏭ **Next:** size-quantity → **particle/dictation(+tel/scramble)**.

### Cursor (ThemeSm33a · speed(+cloze) size chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm33a Else 경로 (sibling cloze size data도 sizeTagged=10).
- ✅ 8게임 칩 캐논 KO **크기** / ZH **大小** / EN Size · THEME_ORDER `size`.
- ✅ speed+cloze sizeTagged=**10** + `themes` → 칩 활성 · smoke speed+cloze size focus · empty 6게임 themes 미추가(칩 숨김).
- ✅ clothes 옷/服装와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #98.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: size-quantity → bingo/listen.

### Cursor (data · size-quantity → cloze +10 · Paul offline)
- ✅ cloze **v39**: **+10** (c-373–382) → **382** · themes `size` · sizeTagged **10**.
- ✅ Lemmas: 크다·작다·많다·적다·길다·짧다·무겁다·가볍다·**넓다·좁다**. Distinct from clothes 사이즈·색깔 · body · directions 길 · furniture 거실 넓어요.
- ✅ NIKL/Sejong · 해요체 · 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v149**.
- ⏭ **Next:** size-quantity → **bingo/listen**.

### Cursor (중급 size-quantity + speed +10 · Paul offline)
- ✅ intermediate **v38** · packs **39** · items **460** · pack `size-quantity` **12** (크다·작다·많다·적다·길다·짧다·무겁다·가볍다·높다·낮다·넓다·좁다).
- ✅ speed **v39=390** · sq-381–390 · themes `size` · sizeTagged **10** · 넓다·좁다 → cloze → **Done**.
- ✅ clothes 사이즈·색깔 · body · directions 길 · furniture와 lemma 분리 · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음.
- ✅ existing packs kept · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v148**.
- ⏭ **Next:** size-quantity → **cloze +10** (넓다·좁다) → **Done**.

### Cursor (ThemeSm32d · particle/dictation/tel/scramble routine chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm32a 라벨/ORDER 재사용 · ThemeSm32d.
- ✅ particle/dictation/tel/scramble routineTagged=**10** + `themes` → 칩 KO **일상** / ZH **日常** / EN Routine.
- ✅ smoke 전 8 routine focus OK · daily-routine 스윕 닫힘 · `_smoke-routine-focus.js` + theme-filter focus routine×8.
- ✅ time 시간/时间와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #97.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · daily-routine → particle/dictation(+tel/scramble) +10 · Paul offline)
- ✅ particle **v38**: **+10** (ps-367–376) → **376** · themes `routine` · routineTagged **10**.
- ✅ dictation **v40**: **+10** (d-373–382) → **382** · themes `routine` · routineTagged **10**.
- ✅ telephone **v37**: **+10** (tel-364–373) → **373** · themes `routine` · routineTagged **10**.
- ✅ scramble **v37**: **+10** (ws-366–375) → **375** · themes `routine` · routineTagged **10**.
- ✅ Lemmas: 일어나다·자다·아침·점심·저녁·밤·하루·매일·어제·내일 (+ particle 잠 thin). Distinct from time 시계·약속·요일 · chores · bathroom · restaurant · listen/cloze verbatim.
- ✅ NIKL/Sejong · 해요체 · 캘린더앱 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v147**.
- ✅ speed/cloze/bingo/listen routineTagged=**10** 유지(중복 뱅크 없음).
- ⏭ **Next 제안:** **ThemeSm32d** → **Done**.

### Cursor (ThemeSm32a residual · bingo/listen routine chip verify · Paul offline)
- ✅ bingo/listen routineTagged **10** + themes `routine` → 칩 **일상/日常** SHOW.
- ✅ smoke focus: speed+cloze+bingo+listen pool **10**×4 (sq-371–380 · c-363–372 · bg-418–427 · lm-385–394).
- ✅ empty 4 (particle/dictation/tel/scramble) routineTagged **0** · themes 미추가 → 칩 숨김 유지 (tags>0 전 enable 금지).
- ✅ invent Next/lemma 없음 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: daily-routine → particle/dictation(+tel/scramble) +10 → **Done**.

### Cursor (data · daily-routine → bingo/listen +10 · Paul offline)
- ✅ bingo **v44**: **+10** (bg-418–427) → **427** · themes `routine` · routineTagged **10**.
- ✅ listen **v44**: **+10** (lm-385–394) → **394** · themes `routine` · routineTagged **10**.
- ✅ Bingo: pack free 일어나다·자다·밤·하루·매일·지금 + thin-fill 잠·낮·늦게·바쁘다 · skip bingo-dup 아침·점심·저녁·오늘·어제·내일 (`time`).
- ✅ Listen: 일어나다·자다·아침·점심·저녁·밤·하루·매일·지금·오늘 · 해요체 · ≠ lm-229 일찍 일어나요 · ≠ time 시계·약속.
- ✅ NIKL/Sejong · 캘린더앱 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v146**.
- ⏭ **Next 제안:** daily-routine → **particle/dictation(+tel/scramble) +10**.

### Cursor (ThemeSm32a · routine chip enable speed+cloze+bingo+listen · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm32a Else 경로 (sibling cloze/bingo/listen data도 routineTagged=10).
- ✅ 8게임 칩 캐논 KO **일상** / ZH **日常** / EN Routine · THEME_ORDER `routine`.
- ✅ speed+cloze+bingo+listen routineTagged=**10** + `themes` → 칩 활성 · smoke 4게임 routine focus · empty 4게임 themes 미추가(칩 숨김).
- ✅ time 시간/时间와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #96.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: daily-routine → particle/dictation(+tel/scramble) +10.

### Cursor (data · daily-routine → cloze +10 · Paul offline)
- ✅ cloze **v38**: **+10** (c-363–372) → **372** · themes `routine` · routineTagged **10**.
- ✅ Lemmas: 일어나다·자다·아침·점심·저녁·하루·매일·오늘·**어제·내일**. Distinct from time 시계·약속·요일·주말·오전·오후 · chores · bathroom · restaurant 식사.
- ✅ NIKL/Sejong · 해요체 · 캘린더앱 브랜드 없음 · hangul.js 미터치 · 커밋/푸시 없음 · manifest **v145**.
- ⏭ **Next 제안:** daily-routine → **bingo/listen +10** → **Done**.

### Cursor (data · 중급 daily-routine + speed +10 · Paul offline)
- ✅ intermediate **v37**: +1 pack `daily-routine` **12**어 → packs **38** · 합계 **448**.
- ✅ speed **v38**: **+10** (sq-371–380) → **380** · themes `routine` · routineTagged **10**.
- ✅ Lemmas (speed): 일어나다·자다·아침·점심·저녁·밤·하루·매일·지금·오늘. Pack thin → cloze: **어제·내일** → **Done**.
- ✅ Distinct from time 시계·약속·요일 · chores · bathroom · restaurant 식사. NIKL/Sejong·Tammy · 해요체 · 캘린더앱 브랜드 없음.
- ✅ countries 기존 유지 · manifest **v144** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** daily-routine → **cloze +10** (어제·내일 포함) → **Done**.

### Cursor (ThemeSm31d · particle/dictation/tel/scramble country chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm31a 라벨/ORDER 재사용 · ThemeSm31d.
- ✅ particle/dictation/tel/scramble countryTagged=**10** + `themes` → 칩 KO **국가** / ZH **国家** / EN Country.
- ✅ smoke 전 8 country focus OK · countries-nationality 스윕 닫힘 · `_smoke-country-focus.js` + theme-filter focus country×8.
- ✅ travel 여행/旅游와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #95.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · countries-nationality → particle +10 · dictation +10 · tel +10 · scramble +10 · Paul offline)
- ✅ particle **v37**: **+10** (ps-357–366) → **366** · themes `country` · countryTagged **10** · pairs topic3/subject4/object3.
- ✅ dictation **v39**: **+10** (d-363–372) → **372** · themes `country` · countryTagged **10**.
- ✅ telephone **v36**: **+10** (tel-354–363) → **363** · themes `country` · countryTagged **10**.
- ✅ scramble **v36**: **+10** (ws-356–365) → **365** · themes `country` · countryTagged **10**.
- ✅ Lemmas: 나라·외국·외국인·국적·고향·살다·일본어·태어나다·**해외·유학생** (particle object: 영어·중국어 · 살다/태어나다→문장형). Distinct from travel · family · school · jobs · cloze/listen/pack.
- ✅ NIKL/Sejong · 해요체 · 항공/대사관 브랜드 없음 · manifest **v143** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** **ThemeSm31d** particle/dictation/tel/scramble country chip enable → **Done**.

### Cursor (ThemeSm31 wave verify · country chips countryTagged>0 · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm31a 라벨/ORDER 재사용 확인.
- ✅ speed/cloze/bingo/listen countryTagged=**10** + `themes` → 칩 **국가/国家** 활성 · particle/dictation/tel/scramble=**0** 숨김.
- ✅ smoke `_smoke-country-focus.js` PASS · `scripts/_smoke_games_theme_filter.js` country on 4 · off 4 · travel와 별개.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #94 유지.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: countries → particle/dictation(+tel/scramble) +10.

### Cursor (ThemeSm31a · country chip enable speed+cloze+bingo+listen · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm31a Else 경로 (병렬 데이터로 cloze/bingo/listen도 countryTagged=10).
- ✅ 8게임 칩 캐논 KO **국가** / ZH **国家** / EN Country · THEME_ORDER `country`.
- ✅ speed+cloze+bingo+listen countryTagged=**10** + `themes` → 칩 활성 · smoke 4게임 country focus · empty 4게임 themes 미추가(칩 숨김).
- ✅ travel 여행/旅游와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #94.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: countries → particle/dictation(+tel/scramble) +10.

### Cursor (data · countries-nationality → bingo/listen +10 · Paul offline)
- ✅ bingo **v43**: **+10** (bg-408–417) → **417** · themes `country` · countryTagged **10**.
- ✅ listen **v43**: **+10** (lm-375–384) → **384** · themes `country` · countryTagged **10**.
- ✅ Lemmas: 나라·외국·외국인·국적·고향·살다·일본어·태어나다·**해외·유학생**. Bingo-dup 영어·중국어(lang) skip.
- ✅ Distinct from travel 여권·숙소·관광 · family · school · jobs. NIKL/Sejong · 해요체 · 항공/대사관 브랜드 없음.
- ✅ manifest **v142** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** countries-nationality → **particle/dictation(+tel/scramble) +10**.

### Cursor (data · countries-nationality → cloze +10 · Paul offline)
- ✅ cloze **v37**: **+10** (c-353–362) → **362** · themes `country` · countryTagged **10**.
- ✅ Lemmas: 나라·외국·외국인·국적·고향·살다·영어·일본어·**해외·유학생**. Include 해외·유학생.
- ✅ Distinct from travel 여권·숙소·관광 · family · school · jobs. NIKL/Sejong · 해요체 · 항공/대사관 브랜드 없음.
- ✅ manifest **v141** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** countries-nationality → **bingo/listen +10** → **Done**.

### Cursor (data · 중급 countries-nationality + speed +10 · Paul offline)
- ✅ intermediate **v36**: +1 pack `countries-nationality` **12**어 → packs **37** · 합계 **436**.
- ✅ speed **v37**: **+10** (sq-361–370) → **370** · themes `country` · countryTagged **10**.
- ✅ Lemmas (speed): 나라·외국·외국인·국적·고향·살다·영어·중국어·일본어·태어나다. Pack thin → cloze: **해외·유학생** → Done.
- ✅ Distinct from travel 여권·숙소·관광 · family · school · jobs. NIKL/Sejong·Tammy · 해요체 · 항공/대사관 브랜드 없음.
- ✅ jobs 기존 유지 · manifest **v140** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** countries-nationality → **cloze +10** (해외·유학생 포함) → **Done**.

### Cursor (ThemeSm30d · particle/dictation/tel/scramble jobs chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm30a 라벨/ORDER 재사용 · ThemeSm30d.
- ✅ particle/dictation/tel/scramble jobsTagged=**10** + `themes` → 칩 KO **직업** / ZH **职业** / EN Jobs.
- ✅ smoke 전 8 jobs focus OK · jobs-occupations 스윕 닫힘 · `_smoke-jobs-focus.js` + theme-filter focus jobs×8.
- ✅ workplace 직장/职场 · public-life와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #93.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · jobs-occupations → particle +10 · dictation +10 · tel +10 · scramble +10 · Paul offline)
- ✅ particle **v36**: **+10** (ps-347–356) → **356** · themes `jobs` · jobsTagged **10**.
- ✅ dictation **v38**: **+10** (d-353–362) → **362** · themes `jobs` · jobsTagged **10**.
- ✅ telephone **v35**: **+10** (tel-344–353) → **353** · themes `jobs` · jobsTagged **10**.
- ✅ scramble **v35**: **+10** (ws-346–355) → **355** · themes `jobs` · jobsTagged **10**.
- ✅ Lemmas: 직업·회사원·간호사·선생님·요리사·운전사·학생·일하다·직원·사장. Distinct from workplace 출장·서류 · public · clinic/health · media · driving · music · school · cloze/listen/pack.
- ✅ NIKL/Sejong · 해요체 · 회사 브랜드 없음 · manifest **v139** · hangul.js 미터치 · 커밋/푸시 없음. 회사·월급 → cloze Done.
- ⏭ **Next 제안:** **ThemeSm30d** particle/dictation/tel/scramble jobs chip enable → **Done**.

### Cursor (ThemeSm30 wave verify · jobs chips jobsTagged>0 · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm30a 라벨/ORDER 재사용 확인.
- ✅ speed/cloze/bingo/listen jobsTagged=**10** + `themes` → 칩 **직업/职业** 활성 · particle/dictation/tel/scramble=**0** 숨김.
- ✅ smoke `_smoke-jobs-focus.js` PASS · `scripts/_smoke_games_theme_filter.js` jobs on 4 · off 4 · workplace/public 별개.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #92 유지.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: jobs → particle/dictation(+tel/scramble) +10.

### Cursor (ThemeSm30a · jobs chip enable speed+cloze+bingo+listen · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm30a Else 경로 (병렬 데이터로 cloze/bingo/listen도 jobsTagged=10).
- ✅ 8게임 칩 캐논 KO **직업** / ZH **职业** / EN Jobs · THEME_ORDER `jobs`.
- ✅ speed+cloze+bingo+listen jobsTagged=**10** + `themes` → 칩 활성 · smoke 4게임 jobs focus · empty 4게임 themes 미추가(칩 숨김).
- ✅ workplace 직장/职场 · public-life와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #92.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: jobs → particle/dictation(+tel/scramble) +10.

### Cursor (data · jobs-occupations → bingo +10 · listen +10 · Paul offline)
- ✅ bingo **v42**: **+10** (bg-398–407) → **407** · themes `jobs` · jobsTagged **10**.
- ✅ listen **v42**: **+10** (lm-365–374) → **374** · themes `jobs` · jobsTagged **10**.
- ✅ Lemmas: 직업·회사원·간호사·선생님·요리사·운전사·학생·일하다·직원·사장. Distinct from workplace 출장·서류 · public · clinic/health · media · driving · music · school.
- ✅ NIKL/Sejong · 해요체 · 회사 브랜드 없음 · manifest **v138** · hangul.js 미터치 · 커밋/푸시 없음. 회사·월급 → cloze Done.
- ⏭ **Next 제안:** jobs-occupations → **particle/dictation(+tel/scramble) +10**.

### Cursor (data · jobs-occupations → cloze +10 · Paul offline)
- ✅ cloze **v36**: **+10** (c-343–352) → **352** · themes `jobs` · jobsTagged **10** · **회사·월급** 포함.
- ✅ Lemmas: 직업·회사원·간호사·선생님·요리사·일하다·직원·사장·회사·월급. Distinct from work-study 직장 · workplace 출장·서류 · clinic/health · media · driving · music · school.
- ✅ NIKL/Sejong · 해요체 · 회사 브랜드 없음 · manifest **v137** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** jobs-occupations → **bingo/listen +10** → **Done**.

### Cursor (data · jobs-occupations pack + speed +10 · Paul offline)
- ✅ intermediate **v35**: +1 pack `jobs-occupations` **12**어 → packs **36** · items **424**.
- ✅ speed **v36**: **+10** (sq-351–360) → **360** · themes `jobs` · jobsTagged **10**.
- ✅ Lemmas (speed): 직업·회사원·간호사·선생님·요리사·운전사·학생·일하다·직원·사장. Pack thin: **회사·월급** → cloze Done.
- ✅ Distinct from work-study 직장 · workplace · clinic 의사 · health 약사 · media 기자 · driving 경찰·운전 · music 가수·배우 · NIKL/Sejong · 해요체 · 회사 브랜드 없음 · manifest **v136** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** jobs-occupations → **cloze +10** (회사·월급 포함) → **Done**.

### Cursor (ThemeSm29d · particle/dictation/tel/scramble bathroom chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm29a 라벨/ORDER 재사용 · ThemeSm29d.
- ✅ particle/dictation/tel/scramble bathroomTagged=**10** + `themes` → 칩 KO **욕실** / ZH **浴室** / EN Bathroom.
- ✅ bingo/listen/cloze(+speed) bathroom 칩 활성 유지 · smoke 전 8 bathroom focus OK · bathroom-hygiene 스윕 닫힘 · `_smoke-bathroom-focus.js` + `_smoke_games_theme_filter.js` focus bathroom×8.
- ✅ clinic 병원/医院 · chores 집안일/家务와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #91.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · bathroom-hygiene → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **v35**: **+10** (ps-337–346) → **346** · themes `bathroom` · bathroomTagged **10** · **면도·더럽다** 포함 · pairs topic3/subject4/object3.
- ✅ dictation **v37**: **+10** (d-343–352) → **352** · themes `bathroom` · bathroomTagged **10** · **면도·더럽다** 포함.
- ✅ telephone **v34**: **+10** (tel-334–343) → **343** · themes `bathroom` · bathroomTagged **10**.
- ✅ scramble **v34**: **+10** (ws-336–345) → **345** · themes `bathroom` · bathroomTagged **10**.
- ✅ Lemmas: 화장실·샤워·목욕·세수·칫솔·치약·휴지·휴지통·면도·더럽다. 깨끗하다·손수건 → cloze 잔여 OK.
- ✅ cosmetics/chores/clinic/furniture/nature와 분리 · NIKL/Sejong · 해요체 · 위생 브랜드 없음 · manifest **v135** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** **ThemeSm29d** bathroom chip enable (particle+dictation+tel+scramble) → bathroom 8-bank 스윕 닫기.

### Cursor (ThemeSm29b/c · bingo/listen bathroom chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm29a 라벨/ORDER 재사용 · ThemeSm29b/c.
- ✅ bingo/listen bathroomTagged=**10** + `themes` → 칩 KO **욕실** / ZH **浴室** · smoke bingo+listen(+speed/cloze) bathroom focus OK.
- ✅ particle/dictation/tel/scramble bathroomTagged=**0** → themes 미추가 · 칩 숨김.
- ✅ clinic 병원/医院 · chores 집안일/家务와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #90.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling 제안 = bathroom → particle/dictation(+tel/scramble) +10.

### Cursor (data · bathroom-hygiene → bingo/listen +10 · Paul offline)
- ✅ bingo **v41**: **+10** (bg-388–397) → **397** · themes `bathroom` · bathroomTagged **10** · **면도·더럽다** 포함.
- ✅ listen **v41**: **+10** (lm-355–364) → **364** · themes `bathroom` · bathroomTagged **10** · **면도·더럽다** 포함.
- ✅ Lemmas: 화장실·샤워·목욕·세수·칫솔·치약·휴지·휴지통·면도·더럽다. 깨끗하다·손수건 → cloze Done.
- ✅ cosmetics 샴푸·비누 · chores 수건·씻다 · clinic/health · furniture 거울 · nature 쓰레기와 분리 · NIKL/Sejong · 해요체 · 위생 브랜드 없음 · manifest **v134** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** bathroom-hygiene → **particle/dictation(+tel/scramble) +10**.

### Cursor (ThemeSm29a · speed(+cloze) bathroom chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm29a Else 경로.
- ✅ 8게임 칩 캐논 KO **욕실** / ZH **浴室** / EN Bathroom · THEME_ORDER `bathroom`.
- ✅ speed+cloze bathroomTagged=**10** + `themes` → 칩 활성 (cloze sibling data 이미 있음) · smoke speed+cloze bathroom focus · empty 6게임 themes 미추가(칩 숨김).
- ✅ clinic 병원/医院 · chores 집안일/家务와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #89.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · bathroom-hygiene → cloze +10 · Paul offline)
- ✅ cloze **v35**: **+10** (c-333–342) → **342** · themes `bathroom` · bathroomTagged **10** · **깨끗하다·손수건** 포함.
- ✅ Lemmas: 화장실·샤워·목욕·세수·칫솔·치약·휴지·휴지통·깨끗하다·손수건. 면도·더럽다 → bingo/listen.
- ✅ cosmetics 샴푸·비누 · chores 수건·씻다·닦다 · clinic/health · furniture 거울 · nature 쓰레기와 분리 · NIKL/Sejong · 해요체 · 위생 브랜드 없음 · manifest **v133** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** bathroom-hygiene → **bingo/listen +10** (면도·더럽다 포함).

### Cursor (ThemeSm28d · particle/dictation/tel/scramble pantry chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm28a 라벨/ORDER 재사용 · ThemeSm28d.
- ✅ particle/dictation/tel/scramble pantryTagged=**10** + `themes` → 칩 KO **재료** / ZH **食材** / EN Pantry.
- ✅ bingo/listen/cloze(+speed) pantry 칩 활성 유지 · smoke 전 8 pantry focus OK · pantry-ingredients 스윕 닫힘 · `_smoke_games_theme_filter.js` focus pantry×8.
- ✅ kitchen 주방/厨房 · fruit 과일/水果 · restaurant 식당/餐饮와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #88.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · pantry-ingredients → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **v34**: **+10** (ps-327–336) → **336** · themes `pantry` · pantryTagged **10** · **생선·빵** 포함 · pairs topic3/subject4/object3.
- ✅ dictation **v36**: **+10** (d-333–342) → **342** · themes `pantry` · pantryTagged **10** · **생선·빵** 포함.
- ✅ telephone **v33**: **+10** (tel-324–333) → **333** · themes `pantry` · pantryTagged **10**.
- ✅ scramble **v33**: **+10** (ws-326–335) → **335** · themes `pantry` · pantryTagged **10**.
- ✅ Lemmas: 쌀·밀가루·소금·설탕·기름·달걀·고기·생선·빵·김치. 간장·양파 → cloze 잔여 OK.
- ✅ restaurant/fruit/kitchen와 분리 · NIKL/Sejong · 해요체 · 식료품 브랜드 없음 · manifest **v131** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** **ThemeSm28d** pantry chip enable (particle+dictation+tel+scramble) → pantry 8-bank 스윕 닫기.

### Cursor (self-QA · ThemeSm28a pantry chips residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm28a 이미 Done → self-QA만.
- ✅ pantryTagged **10**×4 (speed/cloze/bingo/listen) + `themes` · empty 4 (particle/dictation/tel/scramble) tagged=**0** · themes 미추가 → 칩 숨김.
- ✅ 칩 캐논 KO **재료** / ZH **食材** · kitchen 주방/fruit 과일/restaurant 식당과 별개 · `_smoke_games_theme_filter.js` pantry focus OK.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #87 유지.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만 (ThemeSm28d data 대기 = Claude Next).

### Cursor (ThemeSm28a · pantry chip enable speed+cloze+bingo+listen · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm28a Else 경로.
- ✅ 8게임 칩 캐논 KO **재료** / ZH **食材** / EN Pantry · THEME_ORDER `pantry`.
- ✅ speed+cloze+bingo+listen pantryTagged=**10** + `themes` → 칩 활성 · smoke 4게임 pantry focus · empty 4게임 themes 미추가(칩 숨김).
- ✅ kitchen 주방/厨房 · fruit 과일/水果 · restaurant 식당/餐饮와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #87.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · pantry-ingredients → bingo/listen +10 · Paul offline)
- ✅ bingo **v40**: **+10** (bg-378–387) → **387** · themes `pantry` · pantryTagged **10** · **생선·빵** 포함.
- ✅ listen **v40**: **+10** (lm-345–354) → **354** · themes `pantry` · pantryTagged **10** · **생선·빵** 포함.
- ✅ Lemmas: 쌀·밀가루·소금·설탕·기름·달걀·고기·생선·빵·김치. 간장·양파 → cloze 잔여 OK.
- ✅ restaurant/fruit/kitchen/food와 분리 · NIKL/Sejong · 해요체 · 식료품 브랜드 없음 · manifest **v130** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** pantry-ingredients → **particle/dictation(+tel/scramble) +8–10**.

### Cursor (data · pantry-ingredients → cloze +10 · Paul offline)
- ✅ cloze **v34**: **+10** (c-323–332) → **332** · themes `pantry` · pantryTagged **10** · **간장·양파** 포함.
- ✅ Lemmas: 쌀·밀가루·소금·설탕·기름·달걀·고기·김치·간장·양파. 생선·빵 → bingo/listen 잔여.
- ✅ restaurant/fruit/kitchen/drinks 우유/snacks와 분리 · NIKL/Sejong · 해요체 · 식료품 브랜드 없음 · manifest **v129** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** pantry-ingredients → **bingo/listen +8–10** (생선·빵) → **Done**.

### Cursor (data · pantry-ingredients + speed +10 · Paul offline)
- ✅ intermediate **v33**: pack `pantry-ingredients` **12** (쌀·밀가루·소금·설탕·기름·달걀·고기·생선·빵·김치·**간장**·**양파**) → packs **34** · items **400**.
- ✅ speed **v34**: **+10** (sq-331–340) → **340** · themes `pantry` · pantryTagged **10**.
- ✅ restaurant/fruit/kitchen/drinks 우유/snacks와 lemma 분리 · NIKL/Sejong·Tammy · 해요체 · 식료품 브랜드 없음 · manifest **v128** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** pantry-ingredients → **cloze +10** (간장·양파 포함) → **Done**.

### Cursor (ThemeSm27d · particle/dictation/tel/scramble places chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm27a 라벨/ORDER 재사용 · ThemeSm27d.
- ✅ particle/dictation/tel/scramble placesTagged=**10** + `themes` → 칩 KO **장소** / ZH **场所** / EN Places.
- ✅ bingo/listen/cloze(+speed) places 칩 활성 유지 · smoke 전 8 places focus OK · city-places 스윕 닫힘 · `_smoke_games_theme_filter.js` focus places×8.
- ✅ travel 여행/旅游 · direction 방향/方向 · driving 운전/驾驶와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #86.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (ThemeSm27b/c · bingo/listen places chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm27a 라벨/ORDER 재사용 · ThemeSm27b/c.
- ✅ bingo/listen placesTagged=**10** + `themes` → 칩 KO **장소** / ZH **场所** 활성 · smoke bingo+listen(+speed/cloze) places focus OK.
- ✅ particle/dictation/tel/scramble은 data 착지됨(placesTagged=**10**×4) — 본 슬라이스에서 칩 enable 범위 밖 · ThemeSm27d Suggest · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #85.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling Suggest: **ThemeSm27d** places chip enable (전 8 · 스윕 닫기).

### Cursor (data · city-places → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **v33**: **+10** (ps-317–326) → **326** · themes `places` · placesTagged **10** · topic3·subject4·object3 · **카페·경찰서**.
- ✅ dictation **v35**: **+10** (d-323–332) → **332** · themes `places` · placesTagged **10**.
- ✅ telephone **v32**: **+10** (tel-314–323) → **323** · themes `places` · placesTagged **10** · short whisper.
- ✅ scramble **v32**: **+10** (ws-316–325) → **325** · themes `places` · placesTagged **10**.
- ✅ travel/direction/driving·cloze pack·listen과 분리 · NIKL/Sejong · 해요체 · 가게/은행/미용실 브랜드 없음 · manifest **v127** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** **ThemeSm27d** particle+dictation+tel+scramble places chip enable (칩 **장소/场所** · smoke 전 8).

### Cursor (data · city-places → bingo/listen +10 · Paul offline)
- ✅ bingo **v39**: **+10** (bg-368–377) → **377** · themes `places` · placesTagged **10** · **카페·경찰서** 포함.
- ✅ listen **v39**: **+10** (lm-335–344) → **344** · themes `places` · placesTagged **10** · 해요체 · pack/cloze/travel/direction/driving와 분리.
- ✅ lemmas 도서관·슈퍼마켓·은행·백화점·미용실·서점·영화관·수영장·카페·경찰서 · NIKL/Sejong · 가게/은행/미용실 브랜드 없음 · manifest **v126** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** city-places → **particle/dictation(+tel/scramble) +8–10** → **Done** · Suggest ThemeSm27d.

### Cursor (ThemeSm27a · speed(+cloze) places chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm27a Else 경로.
- ✅ 8게임 칩 캐논 KO **장소** / ZH **场所** / EN Places · THEME_ORDER `places`.
- ✅ speed+cloze placesTagged=**10** + `themes` → 칩 활성 · smoke speed+cloze places focus · empty 6게임 themes 미추가(칩 숨김).
- ✅ travel 여행/旅游 · direction 방향/方向 · driving 운전/驾驶와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #84.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling Suggest: city-places → bingo/listen +10.

### Cursor (data · city-places → cloze +10 · Paul offline)
- ✅ cloze **v33**: **+10** (c-313–322) → **322** · themes `places` · placesTagged **10** · **운동장·역** 포함.
- ✅ lemmas 도서관·슈퍼마켓·은행·백화점·미용실·서점·영화관·수영장·운동장·역 · travel/direction/driving 분리 · NIKL/Sejong · 해요체 · 가게/은행/미용실 브랜드 없음 · manifest **v125** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** city-places → **bingo/listen +10** (카페·경찰서).

### Cursor (data · city-places + speed +10 · Paul offline)
- ✅ intermediate **v32**: pack `city-places` **12** (도서관·슈퍼마켓·은행·백화점·미용실·서점·영화관·수영장·카페·경찰서·**운동장**·**역**) → packs **33** · items **388**.
- ✅ speed **v33**: **+10** (sq-321–330) → **330** · themes `places` · placesTagged **10** · 운동장·역 pack thin.
- ✅ money/fruit/nature/hobby/clinic/mail/transit/school/travel 분리 · NIKL/Sejong·Tammy · 가게/은행/미용실 브랜드 없음 · manifest **v124** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** city-places → **cloze +10** (운동장·역 포함) → **Done**.

### Cursor (ThemeSm26d · particle/dictation/tel/scramble driving chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm26a 라벨/ORDER 재사용 · ThemeSm26d.
- ✅ particle/dictation/tel/scramble drivingTagged=**10** + `themes` → 칩 KO **운전** / ZH **驾驶** / EN Driving.
- ✅ smoke 전 8 driving focus OK · vehicles-driving 스윕 닫힘 · `_smoke_games_theme_filter.js` focus driving×8.
- ✅ travel 여행/旅游 · transit 교통/交通과 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #83.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · vehicles-driving → particle/dictation(+tel/scramble) +10 · Paul offline)
- ✅ particle **v32**: **+10** (ps-307–316) → **316** · themes `driving` · drivingTagged **10** · topic3/subject4/object3 · **위험·조심하다·막히다** residual.
- ✅ dictation **v34**: **+10** (d-313–322) → **322** · drivingTagged **10** · **주차장·막히다** 포함.
- ✅ telephone **v31**: **+10** (tel-304–313) → **313** · drivingTagged **10** · short whisper · **경찰** 포함.
- ✅ scramble **v31**: **+10** (ws-306–315) → **315** · drivingTagged **10**.
- ✅ travel/transit 분리 · NIKL/Sejong · 차/택시 브랜드 없음 · manifest **v123** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** **ThemeSm26d** particle+dictation+tel+scramble driving chip enable → vehicles-driving 8-bank 스윕 닫기 → **Done**.

### Cursor (ThemeSm26c · bingo/listen driving chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm26a 라벨/ORDER 재사용 · ThemeSm26c.
- ✅ cloze/bingo/listen drivingTagged=**10** + `themes` → 칩 KO **운전** / ZH **驾驶** / EN Driving (speed와 함께 · 4게임).
- ✅ smoke speed+cloze+bingo+listen driving focus OK · empty 4게임(particle/dictation/tel/scramble) drivingTagged=**0** · themes 미추가(칩 숨김).
- ✅ travel 여행/旅游 · transit 교통/交通과 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #82.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: vehicles-driving → particle/dictation(+tel/scramble) +8–10.

### Cursor (ThemeSm26b · cloze driving chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm26a 라벨/ORDER 재사용 · ThemeSm26b.
- ✅ cloze drivingTagged=**10** + `themes` → 칩 KO **운전** / ZH **驾驶** / EN Driving (speed와 함께).
- ✅ smoke speed+cloze driving focus OK · empty 6게임(bingo/listen/particle/dictation/tel/scramble) themes 미추가(칩 숨김).
- ✅ travel 여행/旅游 · transit 교통/交通과 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #81.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: vehicles-driving → bingo/listen +10.

### Cursor (data · vehicles-driving → cloze +10 · Paul offline)
- ✅ cloze **v32**: **+10** (c-303–312) → **312** · themes `driving` · drivingTagged **10** · **주차장·막히다** 포함.
- ✅ Lemmas: 운전·자동차·자전거·택시·횡단보도·사고·도로·경찰·주차장·막히다 · beginner transit·travel 분리 · NIKL/Sejong · 차/택시 브랜드 없음.
- ✅ cloze.js 칩 **운전/驾驶** (ThemeSm26a 캐논) · themes `driving` → 칩 활성 · manifest **v121** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** vehicles-driving → **bingo/listen +10**.

### Cursor (ThemeSm26a · speed driving chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm26a Else 경로.
- ✅ 8게임 칩 캐논 KO **운전** / ZH **驾驶** / EN Driving · THEME_ORDER `driving`.
- ✅ speed drivingTagged=**10** + `themes` → 칩 활성 · smoke speed driving focus · empty 7게임 themes 미추가(칩 숨김).
- ✅ travel 여행/旅游 · transit 교통/交通과 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #80.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: vehicles-driving → cloze +10 → **Done**.

### Cursor (data · vehicles-driving + speed +10 · Paul offline)
- ✅ intermediate **v31**: pack `vehicles-driving` **12** (운전·자동차·자전거·택시·횡단보도·사고·위험·조심하다·경찰·도로·**주차장**·**막히다**) → packs **32** · items **376**.
- ✅ speed **v32**: **+10** (sq-311–320) → **320** · themes `driving` · drivingTagged **10** · 주차장·막히다 pack thin.
- ✅ beginner transit(버스·지하철·표·정류장)·public-life 교통 분리 · NIKL/Sejong·Tammy · 차/택시 브랜드 없음 · 기존 팩 유지.
- ✅ manifest **v120** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** vehicles-driving → **cloze +10** (주차장·막히다 포함) → **Done**.

### Cursor (ThemeSm25d · particle/dictation/tel/scramble pets chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm25a 라벨/ORDER 재사용 · ThemeSm25d.
- ✅ particle/dictation/tel/scramble petsTagged=**10** + `themes` → 칩 KO **동물** / ZH **动物** / EN Pets.
- ✅ smoke 전 8 pets focus OK · animals-pets 스윕 닫힘 · `_smoke_games_theme_filter.js` focus pets×8.
- ✅ nature 자연과 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #79.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · animals-pets → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **v31**: **+10** (ps-297–306) → **306** · themes `pets` · petsTagged **10** · **소·돼지** residual.
- ✅ dictation **v33**: **+10** (d-303–312) → **312** · themes `pets` · petsTagged **10** · 해요체 · **소·돼지**.
- ✅ telephone **v30**: **+10** (tel-294–303) → **303** · themes `pets` · petsTagged **10**.
- ✅ scramble **v30**: **+10** (ws-296–305) → **305** · themes `pets` · petsTagged **10**.
- ✅ Lemmas: 소·돼지·개·고양이·새·강아지·물고기·토끼·닭·말 · nature 동물 분리 · NIKL/Sejong · 펫 브랜드 없음.
- ✅ manifest **v119** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** **ThemeSm25d** particle+dictation+tel+scramble pets chip enable → pets 8-bank 스윕 닫기 → **Done**.

### Cursor (ThemeSm25b/c · bingo/listen pets chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm25a 라벨/ORDER 재사용 · ThemeSm25b/c.
- ✅ bingo/listen petsTagged=**10** + `themes` → 칩 KO **동물** / ZH **动物** (ThemeSm25a 라벨/ORDER 재사용).
- ✅ speed+cloze+bingo+listen 칩 활성 · particle/dictation/tel/scramble tags=0 → 칩 숨김.
- ✅ nature 자연과 별개 · smoke bingo+listen(+speed/cloze) pets focus OK · `_smoke_games_theme_filter.js`.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #78.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: animals-pets → particle/dictation(+tel/scramble) +8–10 (소·돼지).

### Cursor (data · animals-pets → bingo/listen +10 · Paul offline)
- ✅ bingo **v37**: **+10** (bg-348–357) → **357** · themes `pets` · petsTagged **10** · **키우다·동물원** 포함.
- ✅ listen **v37**: **+10** (lm-315–324) → **324** · themes `pets` · petsTagged **10** · 해요체 · **키우다·동물원** 포함.
- ✅ Lemmas: 개·고양이·새·강아지·물고기·토끼·닭·말·키우다·동물원 · nature 동물·산·강·바다·공원 분리 · NIKL/Sejong · 펫/동물원 브랜드 없음.
- ✅ 소·돼지 residual OK · manifest **v118** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** animals-pets → **particle/dictation(+tel/scramble) +8–10** (소·돼지).

### Cursor (ThemeSm25a · pets chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm25a Else 경로.
- ✅ 칩 캐논 KO **동물** / ZH **动物** / EN Pets · THEME_ORDER `pets` 전 8게임.
- ✅ speed+cloze petsTagged=**10** + `themes` → 칩 활성 · empty 6게임 themes 미추가(칩 숨김).
- ✅ nature 자연과 별개 · smoke speed+cloze pets focus OK · `_smoke_games_theme_filter.js`.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #77.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: animals-pets → bingo/listen +8–10.

### Cursor (data · animals-pets → cloze +10 · Paul offline)
- ✅ cloze **v31**: **+10** (c-293–302) → **302** · themes `pets` · petsTagged **10** · **키우다·동물원** 포함.
- ✅ Lemmas: 개·고양이·강아지·새·물고기·토끼·닭·말·키우다·동물원 · nature 동물·산·강·바다·공원 분리 · NIKL/Sejong · 해요체 · 펫/동물원 브랜드 없음.
- ✅ cloze.js 칩 **동물/动物** · THEME_ORDER `pets` · manifest **v117** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** animals-pets → **bingo/listen +8–10** (소·돼지 residual OK).

### Cursor (data · animals-pets + speed +10 · Paul offline)
- ✅ intermediate **v30**: pack `animals-pets` **12** (개·고양이·새·강아지·물고기·토끼·닭·말·소·돼지·**키우다**·**동물원**) → packs **31** · items **364**.
- ✅ speed **v31**: **+10** (sq-301–310) → **310** · themes `pets` · petsTagged **10** · 키우다·동물원 pack thin.
- ✅ nature-environment 동물·산·강·바다·공원 분리 · NIKL/Sejong·Tammy · 해요체 · 펫/동물원 브랜드 없음 · manifest **v116** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** animals-pets → **cloze +10** (키우다·동물원 포함) → **Done**.

### Cursor (ThemeSm24d · particle/dictation/tel/scramble mail chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm24a 라벨/ORDER 재사용 · ThemeSm24d.
- ✅ particle/dictation/tel/scramble mailTagged=**10** + `themes` → 칩 KO **우편** / ZH **邮寄** / EN Mail.
- ✅ smoke 전 8 mail focus OK · post-mail 스윕 닫힘 · `_smoke_games_theme_filter.js` focus mail×8.
- ✅ housing/digital/stationery와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #76.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · post-mail → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **v30**: **+10** (ps-287–296) → **296** · themes `mail` · mailTagged **10** · topic3/subject4/object3 · **엽서·도착**.
- ✅ dictation **v32**: **+10** (d-293–302) → **302** · themes `mail` · mailTagged **10** · **엽서·도착** · cloze/listen 중복 회피.
- ✅ telephone **v29**: **+10** (tel-284–293) → **293** · themes `mail` · mailTagged **10**.
- ✅ scramble **v29**: **+10** (ws-286–295) → **295** · themes `mail` · mailTagged **10**.
- ✅ housing 배달 · fruit 상자 · digital · stationery 봉투 분리 · NIKL/Sejong · 해요체 · 택배 브랜드 없음 · manifest **v115** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next 제안:** **ThemeSm24d** chip enable (particle+dictation+tel+scramble · 우편/邮寄) → post-mail 8-bank 스윕 닫기 → **Done**.

### Cursor (ThemeSm24 wave verify · mail chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm24a 라벨/ORDER 재사용 확인.
- ✅ mailTagged **10**×4 (speed/cloze/bingo/listen) + `themes` → 칩 KO **우편** / ZH **邮寄** · empty 4 (particle/dictation/tel/scramble) mailTagged=**0** → themes 미추가·칩 숨김.
- ✅ smoke 4게임 mail focus OK · housing/digital/stationery와 별개 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ invent Next 금지 · sibling: **post-mail → particle/dictation(+tel/scramble) +8–10** (엽서·도착).

### Cursor (ThemeSm24a · mail chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm24a Else 경로.
- ✅ 칩 캐논 KO **우편** / ZH **邮寄** / EN Mail · THEME_ORDER `mail` 전 8게임.
- ✅ speed+cloze+bingo+listen mailTagged=**10** + `themes` → 칩 활성 · empty 4게임 themes 미추가(칩 숨김).
- ✅ housing/digital/stationery와 별개 · smoke 4게임 mail focus OK · `_smoke_games_theme_filter.js`.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #75.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: post-mail → particle/dictation(+tel/scramble) (엽서·도착).

### Cursor (data · post-mail → cloze +10 · Paul offline)
- ✅ cloze **v30**: **+10** (c-283–292) → **292** · themes `mail` · mailTagged **10** · **엽서·도착** 포함 · 편지·소포·우표·우체국·보내다·받다·주소·봉투 · housing 배달·fruit 상자·stationery 봉투(desk) 분리 · NIKL/Sejong · 해요체 · 택배 브랜드 없음.
- ✅ cloze.js 칩 KO **우편** / ZH **邮寄** · Games manifest **v113** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** post-mail → **bingo/listen +8–10** (부치다·포장 residual OK).

### Cursor (data · post-mail + speed +10 · Paul offline)
- ✅ intermediate **v29**: pack `post-mail` **12** (편지·소포·우표·우체국·보내다·받다·주소·봉투·부치다·포장·**엽서**·**도착**) → packs **30** · items **352**.
- ✅ speed **v30**: **+10** (sq-291–300) → **300** · themes `mail` · mailTagged **10** · 엽서·도착 pack thin.
- ✅ housing 배달 · fruit 상자 · digital · stationery 분리 · NIKL/Sejong·Tammy · 해요체 · 택배 브랜드 없음 · manifest **v112** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** post-mail → **cloze +10** (엽서·도착 포함) → **Done**.

### Cursor (ThemeSm23d · particle/dictation/tel/scramble stationery chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm23a 라벨/ORDER 재사용 · ThemeSm23d.
- ✅ particle/dictation/tel/scramble stationeryTagged=**10** + `themes` → 칩 KO **문구** / ZH **文具** / EN Stationery.
- ✅ smoke 전 8 stationery focus OK · stationery 스윕 닫힘 · `_smoke_games_theme_filter.js` focus stationery×8.
- ✅ school/workplace와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #74.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · office-stationery → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **v29**: **+10** (ps-277–286) → **286** · themes `stationery` · stationeryTagged **10** · topic3/subject4/object3 · **필통·자**.
- ✅ dictation **v31**: **+10** (d-283–292) → **292** · themes `stationery` · stationeryTagged **10** · **필통·자** · cloze/listen 중복 회피.
- ✅ telephone **v28**: **+10** (tel-274–283) → **283** · themes `stationery` · stationeryTagged **10**.
- ✅ scramble **v28**: **+10** (ws-276–285) → **285** · themes `stationery` · stationeryTagged **10**.
- ✅ Games manifest **v111** · hangul.js 미터치 · 커밋/푸시 없음 · school/workplace 분리.
- ⏭ **Next:** **ThemeSm23d** chip enable (particle/dictation/tel/scramble · 문구/文具) → office-stationery 8-bank 스윕 닫기 → **Done**.

### Cursor (ThemeSm23b/c · bingo/listen stationery chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm23b/c Else 경로 (sibling handoff).
- ✅ bingo/listen stationeryTagged=**10** + `themes` → 칩 KO **문구** / ZH **文具** (ThemeSm23a 라벨/ORDER 재사용).
- ✅ speed+cloze+bingo+listen 칩 활성 · particle/dictation/tel/scramble tags=0 → 칩 숨김.
- ✅ smoke bingo+listen(+speed/cloze) stationery focus OK · `_smoke_games_theme_filter.js`.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #73.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: office-stationery → particle/dictation(+tel/scramble) (필통·자) → **Done**.

### Cursor (data · office-stationery → bingo/listen +10 · Paul offline)
- ✅ bingo **v35**: **+10** (bg-328–337) → **337** · themes `stationery` · stationeryTagged **10** · **책·노트** 포함 · 펜·연필·볼펜·지우개·공책·종이·가위·풀 · school-class/workplace/music/kitchen 분리 · beginner object 펜·책 유지.
- ✅ listen **v35**: **+10** (lm-295–304) → **304** · themes `stationery` · stationeryTagged **10** · 해요체 · NIKL/Sejong · 브랜드 없음.
- ✅ Games manifest **v110** · hangul.js 미터치 · 커밋/푸시 없음 · 필통·자 → particle/dictation residual.
- ⏭ **Next:** office-stationery → **particle/dictation(+tel/scramble) +8–10** (필통·자) → **Done**.

### Cursor (ThemeSm23a · stationery chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm23a Else 경로.
- ✅ 칩 캐논 KO **문구** / ZH **文具** / EN Stationery · THEME_ORDER `stationery` 전 8게임.
- ✅ speed(+cloze data) stationeryTagged=**10** + `themes` → 칩 활성 · empty 6게임 themes 미추가(칩 숨김).
- ✅ school과 별개 · smoke speed(+cloze) stationery focus OK · `_smoke_games_theme_filter.js`.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #72.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: office-stationery → particle/dictation(+tel/scramble) (필통·자).

### Cursor (data · office-stationery → cloze +10 · Paul offline)
- ✅ cloze **v29**: **+10** (c-273–282) → **282** · themes `stationery` · stationeryTagged **10** · **필통·자** 포함 · 펜·연필·볼펜·지우개·공책·종이·가위·풀 · school-class/workplace/music/kitchen 분리 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ cloze.js 칩 KO **문구** / ZH **文具** · Games manifest **v109** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** office-stationery → **bingo/listen +8–10** (책·노트 residual OK) → **Done**.

### Cursor (data · office-stationery + speed +10 · Paul offline)
- ✅ intermediate **v28**: pack `office-stationery` **12** (펜·연필·볼펜·지우개·공책·종이·가위·풀·책·노트·**필통**·**자**) → packs **29** · items **340**.
- ✅ speed **v29**: **+10** (sq-281–290) → **290** · themes `stationery` · stationeryTagged **10** · 필통·자 pack thin.
- ✅ school-class/work/workplace/music 분리 · NIKL/Sejong·Tammy · 해요체 · 브랜드 없음 · manifest **v108** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ **Next:** office-stationery → **cloze +10** (필통·자).

### Cursor (ThemeSm22d · particle/dictation/tel/scramble kitchen chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm22a 라벨/ORDER 재사용 · ThemeSm22d.
- ✅ particle/dictation/tel/scramble kitchenTagged=**10** + `themes` → 칩 KO **주방** / ZH **厨房** / EN Kitchen.
- ✅ smoke 전 8 kitchen focus OK · kitchen 스윕 닫힘 · `_smoke_games_theme_filter.js` focus kitchen×4.
- ✅ restaurant/furniture/fruit와 별개 · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #71.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · kitchen-tableware → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **v28**: **+10** (ps-267–276) → **276** · themes `kitchen` · kitchenTagged **10** · topic3/subject4/object3 · **쟁반·프라이팬**.
- ✅ dictation **v30**: **+10** (d-273–282) → **282** · themes `kitchen` · kitchenTagged **10** · **쟁반·프라이팬** · cloze 가져오세요/달궈요 중복 회피.
- ✅ telephone **v27**: **+10** (tel-264–273) → **273** · themes `kitchen` · kitchenTagged **10**.
- ✅ word-scramble **v27**: **+10** (ws-266–275) → **275** · themes `kitchen` · kitchenTagged **10**.
- ✅ restaurant/chores/fruit/furniture 분리 · NIKL/Sejong · 해요체 · Games manifest **v107** · hangul.js 미터치 · 커밋/푸시 없음.
- ✅ Sibling **ThemeSm22d** → Done (아래).

### Cursor (ThemeSm22b/c · bingo/listen kitchen chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm22a 라벨/ORDER 재사용 · ThemeSm22b/c.
- ✅ bingo/listen kitchenTagged=**10** + `themes` → 칩 KO **주방** / ZH **厨房** / EN Kitchen.
- ✅ smoke bingo+listen(+speed/cloze) kitchen focus OK · empty 4 (particle/dictation/tel/scramble) kitchenTagged=**0** → 칩 숨김.
- ✅ restaurant/furniture/fruit와 별개 · `_smoke_games_theme_filter.js` · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #70.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: kitchen → particle/dictation(+tel/scramble).

### Cursor (data · kitchen-tableware → bingo/listen +10 · Paul offline)
- ✅ bingo **v34**: **+10** (bg-318–327) → **327** · themes `kitchen` · kitchenTagged **10** · **포크·주전자** 포함 · 그릇·접시·컵·숟가락·젓가락·칼·냄비·도마 · restaurant/chores/fruit/furniture 분리 · NIKL/Sejong · 브랜드 없음.
- ✅ listen **v34**: **+10** (lm-285–294) → **294** · themes `kitchen` · kitchenTagged **10** · **포크·주전자** · 해요체 · NIKL/Sejong.
- ✅ Games manifest **v106** · kitchenTagged 합 **40** (speed+cloze+bingo+listen) · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Sibling 제안: kitchen-tableware → **particle/dictation(+tel/scramble) +8–10** (쟁반·프라이팬 residual OK).

### Cursor (ThemeSm22a · kitchen chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm22a Else 경로.
- ✅ 칩 캐논 KO **주방** / ZH **厨房** / EN Kitchen · THEME_ORDER `kitchen` 전 8게임.
- ✅ speed(+cloze data) kitchenTagged=**10** + `themes` → 칩 활성 · empty 6게임 themes 미추가(칩 숨김).
- ✅ restaurant/furniture/fruit와 별개 · smoke speed kitchen focus OK · `_smoke_games_theme_filter.js`.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #69.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · sibling: kitchen → bingo/listen.

### Cursor (data · kitchen-tableware → cloze +10 · Paul offline)
- ✅ cloze **v28**: **+10** (c-263–272) → **272** · themes `kitchen` · kitchenTagged **10** · **쟁반·프라이팬** 포함 · restaurant/chores/fruit/furniture 분리 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ cloze.js 칩 KO **주방** / ZH **厨房** · Games manifest **v105** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Sibling 제안: kitchen-tableware → **bingo/listen +8–10** (포크·주전자 residual OK).

### Cursor (ThemeSm21 wave verify · fruit chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm21a 라벨/ORDER/themes 재사용 확인.
- ✅ fruitTagged>0 전 8게임=**10** + `themes` → 칩 KO **과일** / ZH **水果** 활성 · restaurant/food/snack과 별개.
- ✅ smoke 전 8 fruit focus OK · `_smoke_games_theme_filter.js` · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #68 유지.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · **fruit 스윕 닫힘** · self-QA만.

### Cursor (ThemeSm21a/d · fruit chips + particle/dictation/tel/scramble · Paul offline)
- ✅ Claude Now = particle/dictation(+tel/scramble) fruit · ThemeSm21a 칩 캐논 병행 · invent Next/lemma 없음.
- ✅ particle **v27**: **+10** (ps-257–266) → **266** · themes `fruit` · fruitTagged **10** · topic3/subject4/object3 · **상자**.
- ✅ dictation **v29**: **+10** (d-263–272) → **272** · themes `fruit` · fruitTagged **10** · **상자** · cloze wash/신선 중복 회피 QA.
- ✅ telephone **v26**: **+10** (tel-254–263) → **263** · themes `fruit` · fruitTagged **10**.
- ✅ word-scramble **v26**: **+10** (ws-256–265) → **265** · themes `fruit` · fruitTagged **10**.
- ✅ ThemeSm21a/d: 전 8게임 칩 KO **과일** / ZH **水果** · THEME_ORDER `fruit` · restaurant/food/snack과 별개 · smoke 전 8 fruit focus OK.
- ✅ Games manifest **v103** · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #68.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · **fruit 스윕 닫힘** · self-QA만.

### Cursor (data · fruit-market → bingo/listen +10 · Paul offline)
- ✅ bingo **v33**: **+10** (bg-308–317) → **317** · themes `fruit` · fruitTagged **10** · **오렌지** 포함 · 사과(food bg-43) 유지 스킵 · 과일·채소·시장·바나나·포도·수박·딸기·토마토·봉지.
- ✅ listen **v33**: **+10** (lm-275–284) → **284** · themes `fruit` · fruitTagged **10** · **오렌지** · 해요체 · chores/food/restaurant/family 분리.
- ✅ Games manifest **v102** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: fruit-market → **particle/dictation(+tel/scramble) +8–10** (상자 residual · 사과 OK).

### Cursor (data · fruit-market → cloze +10 · Paul offline)
- ✅ cloze **v27**: **+10** (c-253–262) → **262** · themes `fruit` · fruitTagged **10** · **봉지·상자** 포함 · snacks/restaurant 분리 · NIKL/Sejong · 해요체 · 브랜드 없음.
- ✅ Games manifest **v101** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: fruit-market → **bingo +8–10** 또는 **listen-match +8–10** (오렌지 residual OK).

### Cursor (data · fruit-market + speed +10 · Paul offline)
- ✅ intermediate **v26**: +1 pack **fruit-market** **12**어 → 합계 **316** · 과일·채소·시장·사과·바나나·포도·수박·딸기·오렌지·토마토·봉지·상자 · snacks/restaurant lemma 분리 · NIKL/Sejong · 브랜드 없음.
- ✅ speed **v27**: **+10** (sq-261–270) → **270** · themes `fruit` · fruitTagged **10** · 봉지·상자 pack thin.
- ✅ Games manifest **v100** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next: **fruit-market → cloze +8–10** (봉지·상자).

### Cursor (ThemeSm20d · particle/dictation/tel/scramble furniture chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm20a 라벨/ORDER 재사용 · sibling data furnitureTagged=**10**×4 + `themes` 착지 확인.
- ✅ particle/dictation/tel/scramble → 칩 KO **가구** / ZH **家具** · 전 8게임 furniture 칩 활성 · furniture 스윕 닫힘 · housing/chores와 별개.
- ✅ smoke 전 8게임 furniture focus OK · `_smoke_games_theme_filter.js` · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #67.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · furniture-room → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **v26**: **+10** (ps-247–256) → **256** · themes `furniture` · furnitureTagged **10** · topic3/subject4/object3 · **문·방**.
- ✅ dictation **v28**: **+10** (d-253–262) → **262** · themes `furniture` · furnitureTagged **10** · 해요체 · **문·방**.
- ✅ telephone **v25**: **+10** (tel-244–253) → **253** · themes `furniture` · furnitureTagged **10**.
- ✅ word-scramble **v25**: **+10** (ws-246–255) → **255** · themes `furniture` · furnitureTagged **10**.
- ✅ Games manifest **v99** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: **ThemeSm20d** particle+dictation+tel+scramble furniture 칩 enable/smoke (**가구/家具**).

### Cursor (ThemeSm20 wave verify · furniture chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm20a 라벨/ORDER/themes 재사용 확인.
- ✅ furnitureTagged>0 4게임(speed/cloze/bingo/listen)=**10** → 칩 KO **가구** / ZH **家具** 활성 · particle/dictation/tel/scramble furnitureTagged=**0** → themes 미추가·칩 숨김.
- ✅ smoke 4게임 furniture focus OK · `_smoke_games_theme_filter.js` · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #66 유지.
- ⏭ Claude Now/Next **비어 있음** · sibling 제안 = particle/dictation(+tel/scramble) data · invent Next 금지.

### Cursor (ThemeSm20a · speed furniture chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm20a.
- ✅ 전 8게임 furniture 칩 캐논 KO **가구** / ZH **家具** / EN Furniture · THEME_ORDER `furniture` · housing(주거)·chores(집안일)과 별개.
- ✅ speed(+ sibling cloze/bingo/listen) furnitureTagged=**10** + `themes` → 칩 활성 · empty 4게임 themes 미추가 · smoke speed furniture focus OK · `_smoke_games_theme_filter.js`.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #66.
- ⏭ Claude Now/Next **비어 있음** · sibling 제안 = particle/dictation(+tel/scramble) data · invent Next 금지.

### Cursor (data · furniture-room → bingo/listen +10 · Paul offline)
- ✅ bingo **v32**: **+10** (bg-298–307) → **307** · themes `furniture` · furnitureTagged **10** · **거울·식탁** 포함 · 가구·소파·옷장·책장·거실·책상·의자·창문 · NIKL/Sejong · existing kept.
- ✅ listen **v32**: **+10** (lm-265–274) → **274** · themes `furniture` · furnitureTagged **10** · **거울·식탁** · 해요체 · NIKL/Sejong · existing kept.
- ✅ Games manifest **v98** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: furniture-room → **particle/dictation(+tel/scramble) +8–10** (문·방).

### Cursor (data · furniture-room → cloze +10 · Paul offline)
- ✅ cloze **v26**: **+10** (c-243–252) → **252** · themes `furniture` · furnitureTagged **10** · **거실·방** 포함 · 가구·책상·의자·소파·옷장·창문·문·책장 · 해요체 · NIKL/Sejong · existing kept.
- ✅ Games manifest **v97** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: furniture-room → **bingo/listen +8–10** (거울·식탁).

### Cursor (data · 중급 furniture-room + speed +10 · Paul offline)
- ✅ intermediate **v25**: +1 pack `furniture-room` **12**어 → 합 **304** · 가구·책상·의자·소파·옷장·창문·문·거울·책장·식탁·거실·방 · home-chores 침대·부엌·냉장고 · housing 월세·이사 분리 · NIKL/Sejong·Tammy · 브랜드 없음.
- ✅ speed **v26**: **+10** (sq-251–260) → **260** · themes `furniture` · furnitureTagged **10** · 거실·방 pack thin → cloze.
- ✅ Games manifest **v96** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: furniture-room → **cloze +8–10** (거실·방).

### Cursor (ThemeSm19d · particle/dictation/tel/scramble direction chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm19a 라벨/ORDER 재사용 · sibling data directionTagged=**10**×4 + `themes` 착지 확인.
- ✅ particle/dictation/tel/scramble → 칩 KO **방향** / ZH **方向** · 전 8게임 direction 칩 활성 · directions 스윕 닫힘.
- ✅ smoke 전 8게임 direction focus OK · `_smoke_games_theme_filter.js` · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #65.

### Cursor (data · directions-location → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **v25**: **+10** (ps-237–246) → **246** · themes `direction` · directionTagged **10** · topic3/subject4/object3 · **길·지도**.
- ✅ dictation **v27**: **+10** (d-243–252) → **252** · themes `direction` · directionTagged **10** · 해요체 · **길·지도**.
- ✅ telephone **v24**: **+10** (tel-234–243) → **243** · themes `direction` · directionTagged **10**.
- ✅ word-scramble **v24**: **+10** (ws-236–245) → **245** · themes `direction` · directionTagged **10**.
- ✅ Games manifest **v95** · transit 출구·travel 안내소 분리 · NIKL/Sejong · 브랜드/지도앱명 없음 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: **ThemeSm19d** particle+dictation+tel+scramble direction 칩 enable (**방향/方向**).

### Cursor (ThemeSm19 wave verify · direction chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm19a 라벨/ORDER/themes 재사용 확인.
- ✅ directionTagged>0 4게임(speed/cloze/bingo/listen)=**10** → 칩 KO **방향** / ZH **方向** 활성 · particle/dictation/tel/scramble directionTagged=**0** → themes 미추가·칩 숨김.
- ✅ older beginner tag `directions`(복수) ≠ 칩 `direction` · smoke 강화 OK · `_smoke_games_theme_filter.js` · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #64 유지.
- ⏭ Claude Now/Next **비어 있음** · sibling 제안 = particle/dictation(+tel/scramble) data · invent Next 금지.

### Cursor (ThemeSm19a · speed(+cloze/bingo/listen) direction chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm19a.
- ✅ 전 8게임 direction 칩 캐논 KO **방향** / ZH **方向** / EN Direction · THEME_ORDER `direction` · travel(여행)·transit(교통)과 별개.
- ✅ speed+cloze+bingo+listen directionTagged=**10** + `themes` → 칩 활성 · empty 4게임 themes 미추가 · smoke 4게임 direction focus OK · `_smoke_games_theme_filter.js`.
- ✅ cloze 레거시 particle 이중태그 `direction` 노이즈 제거 · directions-location 문항만 `direction` 유지.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #64.
- ⏭ Claude Now/Next **비어 있음** · sibling 제안 = particle/dictation(+tel/scramble) · invent Next 금지.

### Cursor (data · directions-location → bingo/listen +10 · Paul offline)
- ✅ bingo-beginner **v31**: **+10** (bg-288–297) → **297** · themes `direction` · directionTagged **10** · 앞·뒤·옆·위·**아래**·왼쪽·오른쪽·근처·**사이**·건너편.
- ✅ listen-match **v31**: **+10** (lm-255–264) → **264** · themes `direction` · directionTagged **10** · 해요체 · **아래·사이**.
- ✅ Games manifest **v94** · transit 출구·travel 안내소 분리 · NIKL/Sejong · 브랜드/지도앱명 없음 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: directions-location → **particle/dictation(+tel/scramble) +8–10** (길·지도 residual).

### Cursor (data · directions-location → cloze +10 · Paul offline)
- ✅ cloze **v25**: **+10** (c-233–242) → **242** · themes `direction` · directionTagged **10** · **길·지도**.
- ✅ Lemmas: 앞·뒤·옆·위·왼쪽·오른쪽·근처·건너편·길·지도 · 해요체 · NIKL/Sejong · transit 출구·travel 안내소 분리 · 브랜드/지도앱명 없음.
- ✅ Games manifest **v93** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: directions-location → **bingo/listen +8–10** (아래·사이).

### Cursor (data · 중급 directions-location + speed +10 · Paul offline)
- ✅ intermediate **v24**: +1 pack `directions-location` **12**어 → 합 **292** · 앞·뒤·옆·위·아래·왼쪽·오른쪽·근처·사이·건너편·길·지도 · transit 출구·travel 안내소 분리 · NIKL/Sejong · 브랜드 없음.
- ✅ speed-quiz **v25**: **+10** (sq-241–250) → **250** · themes `direction` · 길·지도 pack thin.
- ✅ Games manifest **v92** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: directions-location → **cloze +8–10** (길·지도).

### Cursor (ThemeSm18d · particle/dictation/tel/scramble body chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm18a 라벨/ORDER 재사용 · sibling data bodyTagged=**10**×4 + `themes` 착지 확인.
- ✅ particle/dictation/tel/scramble → 칩 KO **신체** / ZH **身体** · 전 8게임 body 칩 활성 · body 스윕 닫힘.
- ✅ smoke 전 8게임 body focus OK · `_smoke_games_theme_filter.js` · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #63.

### Cursor (data · body-parts → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **v24**: **+10** (ps-227–236) → **236** · themes `body` · bodyTagged **10** · topic3/subject4/object3 · **입·어깨**.
- ✅ dictation **v26**: **+10** (d-233–242) → **242** · themes `body` · bodyTagged **10** · 해요체 · **입·어깨**.
- ✅ telephone **v23**: **+10** (tel-224–233) → **233** · themes `body` · bodyTagged **10** · short whisper · 입·어깨.
- ✅ scramble **v23**: **+10** (ws-226–235) → **235** · themes `body` · bodyTagged **10** · 입·어깨.
- ✅ Games manifest **v91** · bodyTagged 합 **80** (전 8게임×10) · NIKL/Sejong · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: **ThemeSm18d** body chip enable (particle+dictation+tel+scramble).

### Cursor (ThemeSm18 wave verify · body chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm18a 라벨/ORDER/themes 재사용 확인.
- ✅ bodyTagged>0 4게임(speed/cloze/bingo/listen)=**10** → 칩 KO **신체** / ZH **身体** 활성 · particle/dictation/tel/scramble bodyTagged=**0** → themes 미추가·칩 숨김.
- ✅ smoke 재확인 OK · `_smoke_games_theme_filter.js` · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #62 유지.
- ⏭ Claude Now/Next **비어 있음** · sibling 제안 = particle/dictation(+tel/scramble) data · invent Next 금지.

### Cursor (ThemeSm18a · speed(+cloze/bingo/listen) body chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm18a.
- ✅ 전 8게임 body 칩 캐논 KO **신체** / ZH **身体** / EN Body · THEME_ORDER `body`.
- ✅ speed+cloze+bingo+listen bodyTagged=**10** + `themes` → 칩 활성 · empty 4게임 themes 미추가 · smoke 4게임 body focus OK · `_smoke_games_theme_filter.js`.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #62.
- ⏭ Claude Now/Next **비어 있음** · sibling 제안 = particle/dictation(+tel/scramble) · invent Next 금지.

### Cursor (data · body-parts → bingo/listen +10 · Paul offline)
- ✅ bingo-beginner **v30**: **+10** (bg-278–287) → **287** · themes `body` · bodyTagged **10** · 머리·손·발·얼굴·몸·팔·다리·목·**귀**·**코**.
- ✅ listen-match-beginner **v30**: **+10** (lm-245–254) → **254** · themes `body` · bodyTagged **10** · 해요체 · **귀·코** 포함.
- ✅ Games manifest **v90** · bodyTagged 합 **40** (speed+cloze+bingo+listen) · health-clinic·sports·weather 눈(snow)과 분리 · NIKL/Sejong · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: body-parts → **particle/dictation(+tel/scramble) +8–10** (입·어깨).

### Cursor (data · body-parts → cloze +10 · Paul offline)
- ✅ cloze-beginner **v24**: **+10** (c-223–232) → **232** · themes `body` · bodyTagged **10** · 머리·손·발·얼굴·몸·팔·다리·목·**입**·**어깨**.
- ✅ Games manifest **v89** · health-clinic·sports·weather 눈(snow)과 분리 · NIKL/Sejong 해요체 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: body-parts → **bingo/listen +8–10** (귀·코).

### Cursor (ThemeSm17d · particle/dictation/tel/scramble chores chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm17a 라벨/ORDER 재사용 · sibling data choresTagged=**10**×4 + `themes` 착지 확인.
- ✅ particle/dictation/tel/scramble → 칩 KO **집안일** / ZH **家务** · 전 8게임 chores 칩 활성 · chores 스윕 닫힘.
- ✅ smoke 전 8게임 chores focus OK · `_smoke_games_theme_filter.js` · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #61.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · home-chores → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **v23**: **+10** (ps-217–226) → **226** · themes `chores` · choresTagged **10** · topic3/subject4/object3 · **청소기·세탁기** 포함.
- ✅ dictation **v25**: **+10** (d-223–232) → **232** · themes `chores` · choresTagged **10** · 해요체 · **수건·침대**.
- ✅ telephone **v22**: **+10** (tel-214–223) → **223** · themes `chores` · choresTagged **10** · short whisper · 수건·침대.
- ✅ scramble **v22**: **+10** (ws-216–225) → **225** · themes `chores` · choresTagged **10** · 수건·침대.
- ✅ Games manifest **v87** · 전 8게임 choresTagged=**10** · NIKL/Sejong · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: **ThemeSm17d** particle+dictation+tel+scramble chores 칩 enable (**집안일/家务**).

### Cursor (ThemeSm17b/c · bingo/listen chores chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm17a 라벨/ORDER 재사용 · ThemeSm17b/c.
- ✅ bingo/listen choresTagged=**10** + `themes` → 칩 KO **집안일** / ZH **家务** · speed+cloze 유지.
- ✅ particle/dictation/tel/scramble choresTagged=**0** → themes 미추가 · 칩 숨김.
- ✅ smoke bingo+listen(+speed/cloze) chores focus OK · `_smoke_games_theme_filter.js` · hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #59/#60.
- ⏭ Claude Now/Next **비어 있음** · sibling 제안 = particle/dictation(+tel/scramble) data · invent Next 금지.

### Cursor (data · home-chores → bingo/listen +10 · Paul offline)
- ✅ bingo-beginner **v29**: **+10** (bg-268–277) → **277** · themes `chores` · choresTagged **10** · 청소·빨래·설거지·부엌·냉장고·닦다·씻다·정리하다·**수건**·**침대**.
- ✅ listen-match **v29**: **+10** (lm-235–244) → **244** · themes `chores` · choresTagged **10** · 해요체 · **수건**·**침대** 포함.
- ✅ Games manifest **v86** · cloze 청소기·세탁기 유지 · nature 쓰레기·clothes 세탁소·housing 수리와 분리 · NIKL/Sejong · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: home-chores → **particle/dictation(+tel/scramble) +8–10**.

### Cursor (ThemeSm17a · speed(+cloze) chores chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm17a.
- ✅ 전 8게임 chores 칩 캐논 KO **집안일** / ZH **家务** / EN Chores · THEME_ORDER `chores`.
- ✅ speed+cloze choresTagged=**10** + `themes` → 칩 활성 · empty 6게임 themes 미추가 · smoke speed+cloze chores focus OK · `_smoke_games_theme_filter.js`.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #59.
- ⏭ Claude Now/Next **비어 있음** · sibling 제안 = bingo/listen · invent Next 금지.

### Cursor (data · home-chores → cloze +10 · Paul offline)
- ✅ cloze-beginner **v23**: **+10** (c-213–222) → **222** · themes `chores` · choresTagged **10** · 청소·빨래·설거지·부엌·냉장고·닦다·씻다·정리하다·**청소기**·**세탁기**.
- ✅ Games manifest **v85** · nature 쓰레기·clothes 세탁소·housing 수리와 분리 · NIKL/Sejong 해요체 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next: home-chores → **bingo/listen +8–10** (수건·침대).

### Cursor (data · 중급 home-chores + speed +10 · Paul offline)
- ✅ Intermediate **v22**: +1 pack `home-chores` **12**어 · 합계 **268** · 청소·빨래·설거지·부엌·냉장고·닦다·씻다·정리하다·수건·침대·**청소기**·**세탁기**.
- ✅ speed-quiz **v23**: **+10** (sq-221–230) → **230** · themes `chores` · 청소기·세탁기 pack thin.
- ✅ Games manifest **v84** · nature 쓰레기·housing 수리·clothes 세탁소·restaurant 요리·beginner 비누와 분리 · NIKL/Sejong · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next: home-chores → **cloze +8–10** (청소기·세탁기).

### Cursor (ThemeSm16 · time chips all 8 + sweep close · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm16a 라벨/ORDER 재사용 · ThemeSm16d sibling 제안 흡수.
- ✅ timeTagged: speed **10** · cloze **12** · bingo **16** · listen **11** · particle **10** · dictation **10** · tel **10** · scramble **11** · 전원 `themes` `time`.
- ✅ 전 8게임 칩 **시간/时间** 활성 · smoke 전 8 time focus OK · `_smoke_games_theme_filter.js` · time 스윕 닫힘.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #58 전 8게임.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (data · time-appointment → particle/dictation(+tel/scramble) +10 · Paul offline)
- ✅ particle **v22**: **+10** (ps-207–216) → **216** · themes `time` · 시간·약속·주말·시계·요일·오전·오후·기다리다.
- ✅ dictation **v24**: **+10** (d-213–222) → **222** · themes `time` · 일찍·시·분 포함.
- ✅ telephone **v21**: **+10** (tel-204–213) → **213** · themes `time`.
- ✅ scramble **v21**: **+10** (ws-206–215) → **215** · themes `time` · timeTagged=**11**(ws-16 기존).
- ✅ Games manifest **v83** · NIKL/Sejong 해요체 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 제안: **ThemeSm16d** particle/dictation/tel/scramble time 칩 enable · invent Next 금지.

### Cursor (ThemeSm16a · speed time chip enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm16a (speed time-appointment 착지 후).
- ✅ 전 8게임 time 칩 캐논 KO **시간** / ZH **时间** / EN Time · THEME_ORDER `time`.
- ✅ speed timeTagged=**10** + `themes` → 칩 활성 · empty 게임 themes 미추가 · smoke speed time focus OK · `_smoke_games_theme_filter.js`.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ask-paul #58.
- ⏭ Sibling: time-appointment → **bingo/listen +8–10** (시계·일찍) · Claude Next 대기 · invent Next 금지.

### Cursor (data · time-appointment → cloze +10 · Paul offline)
- ✅ cloze-beginner **v22**: **+10** (c-203–212) → **212** · themes `time` · 시간·약속·만나다·기다리다·시·분·요일·주말·**오전**·**오후**.
- ✅ Games manifest **v81** · timeTagged=**10** · 시계·일찍 → bingo/listen 잔여 · NIKL/Sejong 해요체 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next: time-appointment → **bingo/listen +8–10** (시계·일찍) · ThemeSm16 / ThemeSm16b 칩 residual.

### Cursor (data · 중급 time-appointment + speed +10 · Paul offline)
- ✅ Intermediate **v21**: +1 pack `time-appointment` **12**어 · 합계 **256** · 시간·시계·약속·만나다·기다리다·일찍·분·시·요일·주말·**오전**·**오후**.
- ✅ speed-quiz **v22**: **+10** (sq-211–220) → **220** · themes `time` · 오전·오후 pack thin.
- ✅ Games manifest **v80** · work 일정·public 예약·beginner 늦다·celebration 휴가와 분리 · NIKL/Sejong · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next: time-appointment → **cloze +8–10** (오전·오후).

### Cursor (ThemeSm15d · celebration chips 4 games + sweep close · Paul offline)
- ✅ sibling data 착지 확인: particle **206** · dictation **212** · tel **203** · scramble **205** · celebrationTagged=**10** + `themes` · manifest **v79**.
- ✅ ThemeSm15d: 4게임 칩 **축하/庆祝** 활성(THEME_ORDER+i18n 기존 · themes/tags 착지) · smoke 전 8게임 celebration focus OK.
- ✅ celebration 스윕 닫힘 · invent Next/lemma 없음 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Claude Now/Next **비어 있음** · invent Next 금지 · self-QA만.

### Cursor (ThemeSm15a–c · celebration chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm15 residual (+ cloze/bingo/listen data 착지).
- ✅ 전 8게임 celebration 칩 캐논 KO **축하** / ZH **庆祝** / EN Celebration · THEME_ORDER `celebration`.
- ✅ speed+cloze+bingo+listen celebrationTagged=**10** + `themes` → 칩 활성 · 타 4게임 tags=0 → 칩 숨김.
- ✅ smoke 4게임(+speed/cloze) celebration focus OK · `_smoke_games_theme_filter.js` · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Sibling: celebration → particle/dictation(+tel/scramble) · ThemeSm15d · Claude Next 대기 · invent Next 금지.

### Cursor (data · celebration-holiday → bingo/listen +10 · Paul offline)
- ✅ bingo-beginner **v27**: **+10** (bg-248–257) → **257** · themes `celebration` · 생일·축하·선물·명절·**초대**·파티·**케이크**·휴가·모임·건배.
- ✅ listen-match **v27**: **+10** (lm-215–224) → **224** · themes `celebration` · 해요체 · 초대·케이크 포함.
- ✅ Games manifest **v78** · 결혼식·연휴 cloze 유지 · NIKL/Sejong · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next: celebration-holiday → **particle/dictation(+tel/scramble) +8–10** · ThemeSm15c 칩 residual.

### Cursor (data · celebration-holiday → cloze +10 · Paul offline)
- ✅ cloze-beginner **v21**: **+10** (c-193–202) → **202** · themes `celebration` · 생일·축하·선물·명절·파티·휴가·모임·건배·**결혼식**·**연휴**.
- ✅ Games manifest **v77** · 초대·케이크 → bingo/listen 잔여 · NIKL/Sejong 해요체 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next: celebration-holiday → **bingo/listen +8–10** (초대·케이크) · ThemeSm15 / ThemeSm15b 칩 residual.

### Cursor (data · 중급 celebration-holiday + speed +10 · Paul offline)
- ✅ Intermediate **v20**: +1 pack `celebration-holiday` **12**어 · 합계 **244** · 생일·축하·선물·명절·초대·파티·케이크·휴가·모임·건배·**결혼식**·**연휴**.
- ✅ speed-quiz **v21**: +10 (sq-201–210) → **210** · themes `celebration` · 결혼식·연휴는 팩 thin.
- ✅ Games manifest **v76** · hobby 축제·family 결혼·emotion·restaurant 손님과 분리 · NIKL/Sejong·Tammy · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: celebration-holiday → **cloze +8–10** (결혼식·연휴) · ThemeSm15 칩 **축하/庆祝**.

### Cursor (ThemeSm14d residual · media docs/smoke sync · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm14d Done 후 residual만.
- ✅ 전 8게임 mediaTagged=**10** + `themes` media 재확인 · `_smoke_games_theme_filter.js` focus 주석에 media 스윕 닫힘 반영 · smoke **OK**.
- ✅ `research-topik-bida-vocab-ko.md` §6 게임 카운트 동기화 (particle **196** · dictation **202** · tel **193** · scramble **195** · manifest **v75** · media 스윕 닫힘).
- ✅ ask-paul #56 유지(Paul 스팟체크) · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Claude Next 대기 · invent Next 금지.

### Cursor (ThemeSm14d · particle/dictation/tel/scramble media chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · sibling 4게임 media data 착지 후 ThemeSm14d **retry Done**.
- ✅ particle/dictation/tel/scramble mediaTagged=**10** + `themes` media → 칩 KO **미디어** / ZH **媒体** 활성(라벨·THEME_ORDER는 ThemeSm14).
- ✅ smoke 전 8게임 media focus OK · `_smoke_games_theme_filter.js` 4게임 focus에 media 추가 · media 스윕 닫힘 · 새 lemma 없음 · hangul.js 미터치 · ask-paul #56 갱신.
- ⏭ Claude Next 대기 · invent Next 금지 · sibling media 닫힘.
- ⛔ 커밋/푸시 없음.

### Cursor (data · media-news → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ particle **+10** (ps-187–196) → **196** · 언론·제목 포함 · themes `media`.
- ✅ dictation **+10** (d-193–202) → **202** · 텔레비전·라디오 포함.
- ✅ telephone **+10** (tel-184–193) → **193** · scramble **+10** (ws-186–195) → **195**.
- ✅ Games manifest **v75** · 해요체 · NIKL/Sejong · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: **ThemeSm14d** particle/dictation/tel/scramble media 칩 enable (tags=10 · 칩 **미디어/媒体** · smoke 4게임 media focus) — blocked prep 해제.

### Cursor (ThemeSm14d · particle/dictation/tel/scramble media chips · blocked · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm14d 시도(4게임 media 착지 전).
- ⛔ 당시 particle/dictation/tel/scramble mediaTagged=**0** → 칩 enable/smoke 스킵 (speed+cloze+bingo+listen=**10** 유지).
- ✅ **이후** sibling data +10 착지 → mediaTagged=**10** · ThemeSm14d **retry ready**.
- ⛔ 커밋/푸시 없음 · invent Next 금지.

### Cursor (ThemeSm14c · bingo/listen media chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · sibling bingo/listen media data 착지 후 ThemeSm14c **Done**.
- ✅ bingo mediaTagged=**10** (bg-238–247) + listen=**10** (lm-205–214) + `themes` media → 칩 KO **미디어** / ZH **媒体** 활성(라벨·THEME_ORDER는 ThemeSm14).
- ✅ smoke bingo+listen(+speed/cloze) media focus OK · `_smoke_games_theme_filter.js` bingo/listen focus에 media 추가 · 새 lemma 없음 · hangul.js 미터치 · ask-paul #56 갱신.
- ⏭ Sibling: media → particle/dictation(+tel/scramble) · Claude Next 대기 · invent Next 금지.
- ⛔ 커밋/푸시 없음.

### Cursor (data · media-news → bingo/listen +10 · Paul offline)
- ✅ Bingo **v26**: **+10** (bg-238–247) · 합계 **247** · themes `media` · 뉴스·신문·방송·기자·보도·**텔레비전**·**라디오**·프로그램·시청·기사 · 언론·제목 cloze 유지 · music bg-228–237 유지.
- ✅ Listen **v26**: **+10** (lm-205–214) · 합계 **214** · themes `media` · 동일 lemma · 해요체 · NIKL/Sejong · 원작 · 브랜드 없음.
- ✅ Games manifest **v74** · ThemeSm14 칩 캐논 유지 → bingo/listen mediaTagged=**10**도 칩 **미디어/媒体** 활성(ThemeSm14c Done) · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: media-news → **particle/dictation(+tel/scramble) +8–10**.

### Cursor (ThemeSm14b · cloze media chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm14b **retry** (cloze data 착지 후).
- ✅ cloze mediaTagged=**10** + `themes` media → 칩 KO **미디어** / ZH **媒体** 활성(라벨·THEME_ORDER는 ThemeSm14).
- ✅ bingo/listen mediaTagged=**0** → 칩 미활성(ThemeSm14c blocked · 데이터 교차 대기).
- ✅ smoke cloze+speed media focus OK · `_smoke_games_theme_filter.js` cloze focus에 media 추가 · 새 lemma 없음 · hangul.js 미터치 · ask-paul #56 갱신.
- ⏭ Sibling: media → bingo/listen · Claude Next 대기 · invent Next 금지.
- ⛔ 커밋/푸시 없음.

### Cursor (data · media-news → cloze +10 · Paul offline)
- ✅ Cloze **v20**: **+10** (c-183–192) · 합계 **192** · themes `media` · 뉴스·신문·방송·기자·보도·프로그램·시청·기사·**언론**·**제목** · 텔레비전·라디오 → bingo/listen 잔여 · music c-173–182 유지.
- ✅ Games manifest **v73** · ThemeSm14 칩 캐논 유지 → cloze mediaTagged=**10**도 칩 **미디어/媒体** 활성(speed+cloze) · hangul.js 미터치 · 커밋/푸시 없음.
- ✅ 원작 · NIKL/Sejong 해요체 · 방송사/앱/신문 브랜드 없음 · news-taste·digital-comms lemma 분리 · bad=0 검증.
- ⏭ Next 추천: media-news → **bingo/listen +8–10** (텔레비전·라디오) · 이후 particle/dictation(+tel/scramble).

### Cursor (ThemeSm14b · cloze[+bingo/listen] media chips · blocked · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm14b 시도(cloze 착지 전).
- ⛔ 당시 cloze/bingo/listen mediaTagged=**0** → 칩 enable/smoke 스킵 (speed=**10** 유지).
- ✅ **이후** sibling cloze +10 착지 → cloze mediaTagged=**10** · ThemeSm14b cloze 부분 **unblocked/partial Done** · bingo/listen tags=0 잔여.
- ⛔ 커밋/푸시 없음 · ask-paul 신규 없음(#56 유지).

### Cursor (ThemeSm14 · media chip residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm residual **media** / pack `media-news` → tag `media`.
- ✅ 전 8게임 칩 캐논 KO **미디어** / ZH **媒体** / EN Media · THEME_ORDER `media` · digital(디지털/数码)과 별개.
- ✅ Sibling data 착지 후 speed mediaTagged=**10** + `themes` → 칩 활성 · 타 7게임 tags=0→숨김 · smoke speed media focus OK · hangul.js 미터치 · 커밋/푸시 없음.
- ✅ ask-paul #56 · invent Next 금지 (sibling cloze는 data 레인).

### Cursor (data · 중급 media-news + speed +10 · Paul offline)
- ✅ Intermediate **v19**: +1 pack `media-news` **12**어 · 합계 **232** · 뉴스·신문·방송·기자·보도·텔레비전·라디오·프로그램·시청·기사·**언론**·**제목**.
- ✅ Speed **v20**: **+10** (sq-191–200) · 합계 **200** · themes `media` · 언론·제목 pack thin · news-taste·digital-comms lemma 분리 · 브랜드 없음.
- ✅ Games manifest **v72** · README / research-topik-bida / crossfill 갱신 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: media-news → **cloze +8–10** (언론·제목) · ThemeSm14 칩 **미디어/媒体** 이미 있음 · speed mediaTagged=10 → 칩 활성 확인(ThemeSm14b).

### Cursor (ThemeSm13c · particle/dictation/tel/scramble music chips · retry → Done · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm13c **재시도 → Done**.
- ✅ 재확인: particle/dictation/tel/scramble musicTagged=**10** + `themes` `music` (sibling data · manifest **v71**) → 칩 **음악/音乐** 활성(전 8게임).
- ✅ smoke OK · 전 8게임 music focus · 캐논 KO **음악** / ZH **音乐** · hobby(취미/爱好)와 별개 · hangul.js 미터치 · 커밋/푸시 없음.
- ✅ ask-paul #55 · music 스윕 닫힘 · invent Next 금지.

### Cursor (data · music-arts → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ Particle **v19**: **+10** (ps-177–186) · 합계 **186** · themes `music` · 예술·감상·무대·악기·가수·춤·배우·노래·부르다·그림·그리다·연주 · clothes ps-167–176 유지.
- ✅ Dictation **v21**: **+10** (d-183–192) · 합계 **192** · themes `music` · 해요체 · NIKL/Sejong · 원작 · 배우·무대·부르다·그리다 포함 · clothes d-173–182 유지.
- ✅ Telephone **v18**: **+10** (tel-174–183) · 합계 **183** · scramble **v18**: **+10** (ws-176–185) · 합계 **185**.
- ✅ Games manifest **v71** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: **ThemeSm13c** particle/dictation/tel/scramble music 칩 enable (tags=10 · 칩 **음악/音乐** · smoke 4게임 music focus) — blocked prep 해제.

### Cursor (ThemeSm13c · particle/dictation/tel/scramble music chips · blocked · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm13c 시도.
- ⛔ 4게임 musicTagged=**0** · themesHasMusic=**false** → 칩 enable/smoke 스킵 (speed/cloze/bingo/listen musicTagged=10 · 칩 **음악/音乐** 유지).
- ✅ smoke 확인: particle/dictation/tel/scramble music 칩 **없음**(정상) · 4게임 music focus 미포함.
- ⏭ **Retry ready** → sibling music-arts → particle/dictation(+tel/scramble) +8–10 착지 후 ThemeSm13c 재개 · invent Next 금지.
- ⛔ 커밋/푸시 없음 · ask-paul 신규 없음(#54 유지).

### Cursor (ThemeSm13b · bingo/listen music chips · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · sibling data musicTagged=**10** (bingo bg-228–237 · listen lm-195–204) + `themes` `music` 확인 → 칩 **음악/音乐** 활성.
- ✅ smoke bingo+listen(+speed/cloze) music focus OK · 타 4게임 tags=0→숨김 · hangul.js 미터치 · 커밋/푸시 없음.
- ✅ ask-paul #54 · invent Next 금지.

### Cursor (data · music-arts → bingo/listen +10 · Paul offline)
- ✅ Bingo **v25**: **+10** (bg-228–237) · 합계 **237** · themes `music` · 예술·악기·연주·감상·노래·가수·**부르다**·그림·**그리다**·춤 · 배우·무대 cloze 유지 · clothes bg-218–227 유지 · beginner leisure 음악 유지.
- ✅ Listen **v25**: **+10** (lm-195–204) · 합계 **204** · themes `music` · 해요체 · NIKL/Sejong · 원작 · 부르다·그리다 포함 · clothes lm-185–194 유지.
- ✅ Games manifest **v70** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: **ThemeSm13b** bingo/listen music 칩 smoke · 이후 music → **particle/dictation(+tel/scramble) +8–10**.

### Cursor (ThemeSm13 · music chip residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm residual **music** / pack `music-arts` → tag `music`.
- ✅ 전 8게임 칩 캐논 KO **음악** / ZH **音乐** / EN Music · THEME_ORDER `music` · hobby(취미/爱好)와 별개.
- ✅ speed+cloze musicTagged=**10** + `themes` → 칩 활성 · 타 6게임 tags=0→칩 숨김 정상 · smoke OK · hangul.js 미터치 · 커밋/푸시 없음.
- ✅ ask-paul #53 · invent Next 금지.

### Cursor (data · music-arts → cloze +10 · Paul offline)
- ✅ Cloze **v19**: **+10** (c-173–182) · 합계 **182** · themes `music` · **배우·무대** 포함 · 예술·악기·연주·감상·노래·가수·그림·춤 · 해요체 · NIKL/Sejong · 원작 · clothes c-163–172 유지.
- ✅ Games manifest **v69** · ThemeSm13 칩 캐논(이미 JS) → cloze musicTagged=**10**도 칩 **음악/音乐** 활성 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: music-arts → **bingo/listen +8–10** (부르다·그리다) · 이후 ThemeSm13b · particle/dictation.

### Cursor (data · 중급 music-arts + speed +10 · Paul offline)
- ✅ Intermediate **v18**: **+1 pack** `music-arts` **12**어 (예술·악기·연주·감상·노래·가수·부르다·그림·그리다·춤·배우·무대) · 합계 **220** · hobby-culture·beginner leisure-simple과 lemma 분리 · 기존 18팩 유지 · NIKL/Sejong·Tammy · 원작 · 브랜드 없음.
- ✅ Speed **v19**: **+10** (sq-181–190) · 합계 **190** · themes `music` · **배우·무대** pack thin · clothes sq-171–180 유지.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ThemeSm13 music 칩은 implement 레인.
- ⏭ Next 추천: music-arts → **cloze +8–10** (배우·무대) · 이후 bingo/listen · ThemeSm13 music 칩 residual.

### Cursor (ThemeSm12c · particle/dictation/tel/scramble clothes chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm12c **재시도 → Done**.
- ✅ 재확인: particle/dictation/tel/scramble clothesTagged=**10** + `themes` `clothes` (sibling data v18/v20/v17/v17 · manifest v68) → 칩 **옷/服装** 활성(전 8게임).
- ✅ smoke OK · 전 8게임 clothes focus · 캐논 KO **옷** / ZH **服装** · shopping(쇼핑/购物)과 별개 · hangul.js 미터치 · 커밋/푸시 없음.
- ✅ ask-paul #52 유지 · clothes 스윕 닫힘 · invent Next 금지.

### Cursor (data · clothes → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ Particle **v18**: **+10** (ps-167–176) · 합계 **176** · themes `clothes` · 옷·세탁소·치마·신발·사이즈·맞다·색깔·코트·입다·바지·환불 · restaurant ps-157–166 유지.
- ✅ Dictation **v20**: **+10** (d-173–182) · 합계 **182** · themes `clothes` · 해요체 · NIKL/Sejong · 원작 · 브랜드 없음.
- ✅ Telephone **v17**: **+10** (tel-164–173) · 합계 **173** · scramble **v17**: **+10** (ws-166–175) · 합계 **175**.
- ✅ Games manifest **v68** · ThemeSm12 칩 캐논 유지 → 4게임 clothesTagged=**10** · hangul.js 미터치 · 커밋/푸시 없음.
- ✅ ThemeSm12c Done (아래) · clothes 스윕 닫힘.

### Cursor (ThemeSm12c · particle/dictation/tel/scramble clothes chips · blocked retry · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm12c **재시도**.
- ⛔ 재확인: particle/dictation/tel/scramble clothesTagged=**0**/0/0/0 · `themes`에 `clothes` **미포함** → 칩 enable 불가(숨김 정상).
- ✅ ThemeSm12 캐논 유지(KO **옷** / ZH **服装**) · speed+cloze+bingo+listen clothesTagged=**10** → 칩 활성 · 4게임 칩 없음.
- ⏭ 해제 전제 unchanged: sibling **clothes→particle/dictation(+tel/scramble) +8–10** data 후 themes+칩 · invent Next 금지 · 커밋/푸시 없음 · Paul ask 추가 없음(#51 유지).

### Cursor (ThemeSm12b · bingo/listen clothes chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm12b **재시도 → Done**.
- ✅ bingo/listen clothesTagged=**10** + `themes` `clothes` (sibling data v24/v67) → 칩 **옷/服装** 활성(speed+cloze+bingo+listen).
- ✅ smoke OK · bingo+listen(+speed/cloze) clothes focus · particle 이하 tags=0→칩 숨김 정상 · hangul.js 미터치 · 커밋/푸시 없음.
- ✅ ask-paul #51 · ⏭ sibling: clothes→particle/dictation(+tel/scramble) · invent Next 금지.

### Cursor (data · clothes-shopping → bingo/listen +10 · Paul offline)
- ✅ Bingo **v24**: **+10** (bg-218–227) · 합계 **227** · themes `clothes` · **색깔·환불** 포함 · 옷·입다·벗다·바지·치마·신발·사이즈·맞다 · 세탁소·코트 cloze 유지 · restaurant bg-208–217 유지.
- ✅ Listen **v24**: **+10** (lm-185–194) · 합계 **194** · themes `clothes` · **색깔·환불** · 해요체 · NIKL/Sejong · 원작 · 브랜드 없음.
- ✅ Games manifest **v67** · ThemeSm12 칩 캐논 유지 → bingo/listen clothesTagged=**10** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: clothes→**particle/dictation(+tel/scramble) +8–10** (ThemeSm12b Done).

### Cursor (ThemeSm12b retry · bingo/listen clothes · still blocked · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm12b **재시도**.
- ⛔ 재확인: bingo clothesTagged=**0** · listen clothesTagged=**0** · `themes`에 `clothes` **미포함** → 칩 enable 불가(숨김 정상).
- ✅ ThemeSm12 캐논 유지(KO **옷** / ZH **服装**) · speed+cloze clothesTagged=**10** → 칩 활성 · smoke clothes focus: speed+cloze만 clothes 칩 · bingo/listen 칩 없음.
- ⏭ 해제 전제 unchanged: sibling **clothes→bingo/listen +8–10**(색깔·환불) data 후 themes+칩 · invent Next 금지 · 커밋/푸시 없음 · Paul ask 추가 없음(#50 유지).

### Cursor (ThemeSm12b · bingo/listen clothes chips · blocked prep · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm12b 시도.
- ⛔ bingo clothesTagged=**0** · listen clothesTagged=**0** · 양 뱅크 `themes`에 `clothes` 없음 → 칩 활성 불가(숨김 정상).
- ✅ ThemeSm12 캐논 유지(KO **옷** / ZH **服装**) · speed+cloze clothesTagged=**10** → 칩 활성 · smoke clothes focus OK(speed+cloze).
- ⏭ 해제 전제: sibling **clothes→bingo/listen +8–10**(색깔·환불) data 착지 후 themes+칩 enable · invent Next 금지 · 커밋/푸시 없음.

### Cursor (data · clothes-shopping → cloze +10 · Paul offline)
- ✅ Cloze **v18**: **+10** (c-163–172) · 합계 **172** · themes `clothes` · **세탁소·코트** 포함 · 옷·입다·벗다·치마·사이즈·색깔·환불·맞다 · restaurant c-153–162 유지 · NIKL/Sejong 해요체 · 원작 · 브랜드 없음.
- ✅ Games manifest **v66** · ThemeSm12 칩 캐논 유지 → cloze clothesTagged=**10**도 칩 **옷/服装** 활성 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: clothes-shopping → **bingo/listen +8–10**.

### Cursor (ThemeSm12 · clothes chip residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm residual **clothes** (sibling 1b).
- ✅ 8× games JS: `theme_clothes` 캐논 EN **Clothes** / KO **옷** / ZH **服装** · THEME_ORDER `clothes`.
- ✅ speed+cloze clothesTagged=**10** + `themes` → 칩 **옷/服装** 활성 · 타 6게임 tags=0→칩 숨김 · beginner **shopping**(쇼핑/购物)과 별개.
- ✅ smoke OK · speed+cloze clothes focus · hangul.js 미터치 · lemma invent 없음 · 커밋/푸시 없음.
- ✅ ask-paul #50 · ⏭ sibling: clothes→bingo/listen · invent Next 금지.

### Cursor (data · 중급 clothes-shopping + speed +10 · Paul offline)
- ✅ Intermediate **v17**: **+1 pack** `clothes-shopping` **12**어 (옷·입다·벗다·바지·치마·신발·사이즈·색깔·맞다·환불·세탁소·코트) · 합계 **208** · beginner shopping/cosmetics와 lemma 분리 · 기존 17팩 유지 · NIKL/Sejong·Tammy · 원작 · 브랜드 없음.
- ✅ Speed **v18**: **+10** (sq-171–180) · 합계 **180** · themes `clothes` · **세탁소·코트** pack thin · restaurant sq-161–170 유지.
- ✅ hangul.js 미터치 · 커밋/푸시 없음 · ThemeSm12 clothes 칩은 implement 레인.
- ⏭ Next 추천: clothes-shopping → **cloze +8–10** (세탁소·코트) · 이후 bingo/listen · ThemeSm12 clothes 칩 residual.

### Cursor (ThemeSm11c · particle/dictation/tel/scramble restaurant chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm11c (data 착지 후).
- ✅ 4게임 restaurantTagged=**10** + `themes` restaurant → 칩 KO **식당** / ZH **餐饮** 활성(라벨·THEME_ORDER는 ThemeSm11).
- ✅ Counts: particle **166** · dictation **172** · tel **163** · scramble **165** · manifest **v65**.
- ✅ smoke 전 8게임 restaurant focus OK · restaurant 스윕 닫힘 · 새 lemma 없음 · hangul.js 미터치 · ask-paul #48.
- ⏭ Claude Next 대기 · invent Next 금지 · 커밋/푸시 없음.

### Cursor (data · restaurant → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ Particle **v17**: **+10** (ps-157–166) · 합계 **166** · themes `restaurant` · **손님·계산·반찬** · topic3/subject4/object3 · cloze와 구분 · NIKL/Sejong 해요체 · 브랜드 없음 · 기존 ps-01–156 유지.
- ✅ Dictation **v19**: **+10** (d-163–172) · 합계 **172** · themes `restaurant` · **반찬·짜다·손님·계산** · 원작 · 기존 유지.
- ✅ Telephone **v16**: **+10** (tel-154–163) · 합계 **163** · Scramble **v16**: **+10** (ws-156–165) · 합계 **165** · themes `restaurant`.
- ✅ Games manifest **v65** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: **ThemeSm11c** particle/dictation/tel/scramble restaurant 칩 enable (tags=10 · 칩 **식당/餐饮** · smoke 4게임 restaurant focus).

### Cursor (ThemeSm11b · bingo/listen restaurant chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm11b retry.
- ✅ bingo/listen restaurantTagged=**10** + `themes` restaurant 확인 → 칩 **식당/餐饮** (ThemeSm11 캐논·THEME_ORDER 유지) · speed+cloze도 restaurant focus.
- ✅ smoke OK (`_smoke_games_theme_filter.js`) · bingo+listen(+speed/cloze) restaurant focus · hangul.js 미터치 · 커밋/푸시 없음.
- ✅ ask-paul #47 · ⏭ Claude Next 대기 · invent Next 금지 · (sibling) restaurant → particle/dictation(+tel/scramble).

### Cursor (data · restaurant → bingo/listen +10 · Paul offline)
- ✅ Bingo **v23**: **+10** (bg-208–217) · 합계 **217** · themes `restaurant` · **손님·계산** 포함 · 식당·메뉴·주문·요리·식사·맛있다·배고프다·음식 · bg-33 음식(food) 별개 · 반찬·짜다 cloze 유지 · nature bg-198–207 유지 · 원작 · NIKL/Sejong.
- ✅ Listen-match **v23**: **+10** (lm-175–184) · 합계 **184** · themes `restaurant` · 해요체 · **손님·계산** · lm-16 맛있어요 유지 · nature lm-165–174 유지.
- ✅ Games manifest **v64** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: **ThemeSm11b bingo/listen restaurant chips enable** (tags=10 · 칩 식당/餐饮 · smoke) · 이후 restaurant → particle/dictation(+tel/scramble).

### Cursor (ThemeSm11b · bingo/listen restaurant chips · blocked · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm11b 시도.
- ⛔ bingo/listen restaurantTagged=**0** · themesHasRestaurant=**false** → 칩 enable/smoke 스킵 (speed+cloze restaurantTagged=10 · 칩 **식당/餐饮** 유지).
- ⏭ **Retry ready** → sibling restaurant → bingo/listen +8–10 (손님·계산) 착지 후 ThemeSm11b 재개 · invent Next 금지.
- ⛔ 커밋/푸시 없음 · ask-paul 신규 없음(#46 유지).

### Cursor (data · restaurant → cloze +10 · Paul offline)
- ✅ Cloze **v17**: **+10** (c-153–162) · 합계 **162** · themes `restaurant` · **반찬·짜다** 포함 · 식당·메뉴·주문·음식·요리·식사·맛있다·배고프다 · 손님·계산 → bingo/listen 잔여 · nature c-143–152 유지 · 원작 해요체 · NIKL/Sejong.
- ✅ Games manifest **v63** · ThemeSm11 칩 **식당/餐饮** cloze 활성 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: **restaurant → bingo/listen +8–10** (손님·계산).

### Cursor (ThemeSm11 · restaurant chip residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm residual **restaurant**.
- ✅ 8게임 `theme_restaurant` 캐논 KO **식당** / ZH **餐饮** / EN Restaurant · THEME_ORDER `restaurant`.
- ✅ speed+cloze restaurantTagged=**10** + `themes` → 칩 활성 · 타 6게임 tags=0(칩 숨김) · bingo `food`(음식) 별개 유지.
- ✅ smoke OK · ask-paul #46 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Claude Next 대기 · invent Next 금지 · (sibling 제안) restaurant → bingo/listen.

### Cursor (data · 중급 restaurant-cooking + speed +10 · Paul offline)
- ✅ Intermediate **v16**: `restaurant-cooking` **+12** (식당·메뉴·주문·음식·요리·식사·맛있다·배고프다·반찬·계산·손님·짜다) · 합계 **196** · 17 packs · beginner snacks/cafe와 lemma 분리 · 기존 팩 유지 · NIKL/Sejong·Tammy · 브랜드 없음.
- ✅ Speed **v17**: **+10** (sq-161–170) · 합계 **170** · themes `restaurant` · 칩 캐논은 ThemeSm11 **식당/餐饮** · **반찬·짜다** pack thin · nature sq-151–160 유지.
- ✅ Games manifest **v62** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: **restaurant → cloze +8–10** (반찬·짜다) · 이후 bingo/listen · ThemeSm11 **Done**.

### Cursor (self-QA residual · nature counts + ThemeSm10d smoke · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · residual만.
- ✅ Counts 재확인: particle **156** · dictation **162** · tel **153** · scramble **155** · natureTagged=**10** each · `themes` nature · manifest **v61**.
- ✅ `node scripts/_smoke_games_theme_filter.js` OK · 전 8게임 nature focus/칩 유지.
- ✅ docs 잔여: `research-topik-bida-vocab-ko.md` ThemeSm10d blocked 체크박스 → Done 갱신.
- ⏭ Claude Next 대기 · invent Next 금지 · 커밋/푸시 없음 · ask-paul 신규 없음.

### Cursor (ThemeSm10d · particle/dictation/tel/scramble nature chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm10d **retry** (data 착지 후).
- ✅ 4게임 natureTagged=**10** + `themes` nature → 칩 KO **자연** / ZH **自然** 활성(라벨·THEME_ORDER는 ThemeSm10).
- ✅ Counts: particle **156** · dictation **162** · tel **153** · scramble **155** · manifest **v61**.
- ✅ smoke 전 8게임 nature focus OK · nature 스윕 닫힘 · 새 lemma 없음 · hangul.js 미터치 · ask-paul #45 갱신.
- ⏭ Claude Next 대기 · invent Next 금지.
- ⛔ 커밋/푸시 없음.

### Cursor (data · nature-environment → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ Particle **v16**: **+10** (ps-147–156) · 합계 **156** · themes `nature` · **동물·공원** · topic3/subject4/object3 · cloze와 구분 · NIKL/Sejong 해요체 · 브랜드 없음 · 기존 ps-01–146 유지.
- ✅ Dictation **v18**: **+10** (d-153–162) · 합계 **162** · themes `nature` · **동물·공원** · 원작 · 기존 유지.
- ✅ Telephone **v15**: **+10** (tel-144–153) · 합계 **153** · Scramble **v15**: **+10** (ws-146–155) · 합계 **155** · themes `nature`.
- ✅ Games manifest **v61** · hangul.js 미터치 · ask-paul #45 · 커밋/푸시 없음.
- ✅ smoke 전 8게임 nature focus OK · ThemeSm10d(칩) 해제 조건 충족 · nature 스윕 data lane 닫힘.
- ⏭ Next 추천: **ThemeSm10d** 칩 enable 확인(또는 이미 Done) · Claude Next 대기 · invent Next 금지.

### Cursor (ThemeSm10d · particle/dictation/tel/scramble nature chips · blocked · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm10d 시도.
- ⛔ 4게임 natureTagged=**0** · themesHasNature=**false** → 칩 enable/smoke 스킵 (speed/cloze/bingo/listen natureTagged=10 · 칩 **자연/自然** 유지).
- ⏭ **Retry ready** → sibling nature → particle/dictation (+tel/scramble) +8–10 착지 후 ThemeSm10d 재개 · invent Next 금지.
- ⛔ 커밋/푸시 없음 · ask-paul 신규 없음(#44 유지).

### Cursor (ThemeSm10c · bingo/listen nature chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm10c (data 착지 후).
- ✅ bingo natureTagged=**10** + listen=**10** + `themes` nature → 칩 KO **자연** / ZH **自然** 활성(라벨·THEME_ORDER는 ThemeSm10).
- ✅ smoke bingo+listen(+speed/cloze) nature focus OK · 새 lemma 없음 · hangul.js 미터치 · ask-paul #44.
- ⏭ Claude Next 대기 · invent Next 금지.
- ⛔ 커밋/푸시 없음.

### Cursor (data · nature-environment → bingo/listen +10 · Paul offline)
- ✅ Bingo **v22**: **+10** (bg-198–207) · 합계 **207** · themes `nature` · **동물·공원** 포함 · 쓰레기·재활용은 cloze 유지 · weather lemmas 없음 · NIKL/Sejong · 브랜드 없음 · 기존 bg-01–197 유지.
- ✅ Listen-match **v22**: **+10** 해요체 TTS (lm-165–174) · 합계 **174** · 동일 lemma · pack/speed/cloze/tel과 다른 원작 구 · 기존 lm-01–164 유지.
- ✅ Manifest **v60** · bingo **207** · listen **174**.
- ✅ hangul.js 미터치 · commit/push 없음.
- ⏭ Next 추천: **ThemeSm10c** bingo/listen nature 칩 enable · smoke bingo+listen(+speed/cloze) nature focus.

### Cursor (ThemeSm10b · cloze nature chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm10b **retry**.
- ✅ cloze natureTagged=**10** + `themes` nature → 칩 KO **자연** / ZH **自然** 활성(라벨·THEME_ORDER는 ThemeSm10).
- ✅ bingo/listen natureTagged=**0** → 칩 미활성(ThemeSm10c blocked · 데이터 교차 대기).
- ✅ smoke cloze+speed nature focus OK · 새 lemma 없음 · hangul.js 미터치 · ask-paul #43.
- ⏭ Sibling: nature → bingo/listen · Claude Next 대기 · invent Next 금지.
- ⛔ 커밋/푸시 없음.

### Cursor (data · nature-environment → cloze +10 · Paul offline)
- ✅ Cloze **v16**: **+10** (c-143–152) · 합계 **152** · themes `nature` · **쓰레기·재활용** 포함 · 동물·공원은 bingo/listen 예약 · weather lemmas 없음 · NIKL/Sejong 해요체 · 브랜드 없음 · 기존 c-01–142 유지.
- ✅ Manifest **v59** · cloze **152**.
- ✅ hangul.js 미터치 · commit/push 없음.
- ⏭ Next 추천: **ThemeSm10b** cloze 칩 enable · nature → **bingo/listen +8–10** (동물·공원).

### Cursor (ThemeSm10b · cloze nature chips · blocked · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm10b 시도.
- ⛔ cloze/bingo/listen natureTagged=**0** · themesHasNature=**false** → 칩 enable/smoke 스킵 (speed만 natureTagged=10 · 칩 **자연/自然** 유지).
- ⏭ **Retry ready** → sibling nature → cloze/bingo/listen +8–10 착지 후 ThemeSm10b 재개 · invent Next 금지.
- ⛔ 커밋/푸시 없음 · ask-paul 신규 없음(#42 유지).

### Cursor (ThemeSm10 · nature chip residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm nature residual.
- ✅ 8× games: `theme_nature` 캐논 EN **Nature** / KO **자연** / ZH **自然** · THEME_ORDER `nature`.
- ✅ speed natureTagged=**10** + `themes` → 칩 활성 · 타 7게임 tags=0 → 칩 숨김 · 뱅크 JSON 미터치.
- ✅ smoke speed nature focus + 전 게임 캐논 OK · hangul.js 미터치 · ask-paul #42.
- ⏭ Claude Next 대기 · sibling nature → cloze/bingo/listen · invent Next 금지.

### Cursor (data · 중급 nature-environment + speed +10 · Paul offline)
- ✅ Intermediate **v15**: 팩 **+1** `nature-environment` **12**어 (자연·환경·산·강·바다·숲·나무·꽃·동물·공원·쓰레기·재활용) · 합계 **184** · weather-season과 분리 · NIKL/Sejong·Tammy · 브랜드 없음 · 기존 15팩 유지.
- ✅ Speed **v16**: **+10** (sq-151–160) · 합계 **160** · themes `nature` · 쓰레기·재활용 팩 thin · speed.js 칩 **자연/自然**.
- ✅ Games manifest **v58** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: nature → **cloze/bingo/listen +8–10** (쓰레기·재활용) · ThemeSm10b cloze 칩 enable.

### Cursor (ThemeSm9d · particle/dictation/tel/scramble sports chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm9d retry (data 착지 후).
- ✅ 4게임 sportsTagged=**10** + `themes` sports → 칩 KO **스포츠** / ZH **体育** 활성(라벨·THEME_ORDER는 ThemeSm9).
- ✅ Counts: particle **146** · dictation **152** · tel **143** · scramble **145** · manifest **v57**.
- ✅ smoke 전 8게임 sports focus OK · sports 스윕 닫힘 · 새 lemma 없음 · hangul.js 미터치 · ask-paul #41 갱신.
- ⏭ Claude Next 대기 · invent Next 금지 · 커밋/푸시 없음.

### Cursor (data · sports-exercise → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ Particle **v15**: **+10** (ps-137–146) · 합계 **146** · themes `sports` · **경기장·체력** · topic3/subject4/object3 · cloze와 구분 · NIKL/Sejong 해요체 · 브랜드 없음.
- ✅ Dictation **v17**: **+10** (d-143–152) · 합계 **152** · themes `sports` · **경기장·체력** · 원작 · 기존 유지.
- ✅ Telephone **v14**: **+10** (tel-134–143) · 합계 **143** · Scramble **v14**: **+10** (ws-136–145) · 합계 **145** · themes `sports`.
- ✅ Games manifest **v57** · hangul.js 미터치 · ask-paul #41 · 커밋/푸시 없음.
- ⏭ Next 추천: **ThemeSm9d** — 4게임 sports 칩 enable (스포츠/体育) · smoke · invent Next 금지.

### Cursor (ThemeSm9d · particle/dictation/tel/scramble sports chips · blocked · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · ThemeSm9d 시도.
- ⛔ 당시 4게임 sportsTagged=**0** · themesHasSports=**false** → 칩 enable/smoke 스킵 (이후 data +10으로 해제).
- ⏭ **Retry ready** → data 착지 후 ThemeSm9d 재개.
- ⛔ 커밋/푸시 없음 · ask-paul 신규 없음(#40 유지).

### Cursor (ThemeSm9c · bingo/listen sports chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm9c.
- ✅ bingo/listen sportsTagged=**10** + `themes` sports → 칩 KO **스포츠** / ZH **体育** 활성(라벨·THEME_ORDER는 ThemeSm9 · 데이터 교차 Done).
- ✅ smoke bingo+listen(+speed/cloze) sports focus OK · 4게임 sportsTagged=0(칩 숨김) · 새 lemma 없음 · hangul.js 미터치 · ask-paul #40.
- ⏭ Sibling: sports → particle/dictation (+tel/scramble) · ThemeSm9d prep · Claude Next 대기 · invent Next 금지.
- ⛔ 커밋/푸시 없음.

### Cursor (data · sports-exercise → bingo/listen +10 · Paul offline)
- ✅ Bingo **v21**: **+10** (bg-188–197) · 합계 **197** · themes `sports` · **이기다·지다** 포함 · 경기장·체력은 cloze/팩 유지 · NIKL/Sejong · 브랜드 없음.
- ✅ Listen **v21**: **+10** (lm-155–164) · 합계 **164** · themes `sports` · 해요체 · **이기다·지다** · 원작 · bg/lm 기존 유지.
- ✅ ThemeSm9c: bingo/listen sportsTagged=10 → 칩 **스포츠/体育** 활성 · smoke bingo+listen(+speed/cloze) sports focus.
- ✅ manifest **v56** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: sports → **particle/dictation +8–10** (경기장·체력) · 이후 tel/scramble.

### Cursor (ThemeSm9b · cloze sports chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm9b.
- ✅ cloze sportsTagged=**10** + `themes` sports → 칩 KO **스포츠** / ZH **体育** 활성(라벨·THEME_ORDER는 ThemeSm9).
- ✅ bingo/listen sportsTagged=**0** → 칩 미활성(ThemeSm9c blocked · 데이터 교차 대기).
- ✅ smoke cloze+speed sports focus OK · 새 lemma 없음 · hangul.js 미터치 · ask-paul #39.
- ⏭ Sibling: sports → bingo/listen · Claude Next 대기 · invent Next 금지.
- ⛔ 커밋/푸시 없음.

### Cursor (data · sports-exercise → cloze +10 · Paul offline)
- ✅ Cloze **v15**: **+10** (c-133–142) · 합계 **142** · themes `sports` · **경기장·체력** 포함 · 이기다·지다 → bingo/listen · c-01–132 유지 · NIKL/Sejong 해요체 · 브랜드 없음.
- ✅ ThemeSm9b: cloze sportsTagged=10 → 칩 **스포츠/体育** 활성 · smoke cloze+speed sports focus.
- ✅ manifest **v55** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: sports → **bingo/listen +8–10** (이기다·지다) · 이후 particle/dictation.

### Cursor (self-QA · sports counts + ThemeSm9b prep · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next/lemma 없음 · light residual만.
- ✅ Counts 재확인: intermediate **v14=172** · `sports-exercise` **12** · speed **150** sportsTagged **10** · themesHasSports **true**.
- ✅ 타 7게임(cloze/bingo/listen/particle/dictation/tel/scramble) sportsTagged **0** · 칩 숨김 정상.
- ✅ Sibling **ThemeSm9b prep** 메모: cloze sports tags 착지 후 칩 활성·smoke (UI 캐논 ThemeSm9 기준비).
- ⏭ Claude Next / Paul 게이트 · sibling data `sports→cloze/bingo/listen`은 Claude Next 또는 데이터 레인만 · invent 금지.
- ⛔ 커밋/푸시 없음 · ask-paul 신규 없음(#38 유지).

### Cursor (data · sports-exercise pack + speed +10 · Paul offline)
- ✅ Intermediate **v14**: 팩 **스포츠·운동** `sports-exercise` **+12** · 합계 **172** · 기존 팩 유지 · beginner leisure 운동·산책 분리 · NIKL/Sejong·Tammy · 브랜드 없음.
- ✅ Speed **v15**: **+10** (sq-141–150) · 합계 **150** · themes `sports` · 경기장·체력 팩 thin · ThemeSm9 칩 Sports/스포츠/体育 활성.
- ✅ manifest **v54** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: sports → **cloze/bingo/listen +8–10** (경기장·체력) · 이후 particle/dictation.

### Cursor (ThemeSm9 · sports chip residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm sports residual.
- ✅ 전 8게임 `theme_sports` 캐논 KO **스포츠** / ZH **体育** / EN Sports · THEME_ORDER `sports`.
- ✅ speed sportsTagged=10 + `themes` → 칩 활성 · 타 7게임 tags=0 → 칩 숨김 · 새 lemma 없음 · hangul.js 미터치.
- ✅ smoke sports 캐논 + speed sports focus OK · ask-paul #38.
- ⏭ Claude Next · sports → cloze/bingo/listen (sibling 추천만 · invent 금지) · Paul 게이트.
- ⛔ 커밋/푸시 없음.

### Cursor (ThemeSm8d · emotion chips enable 4games · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm8d 재시도.
- ✅ particle/dictation/telephone/scramble **emotionTagged=10** + `themes` emotion → 칩 **감정/情绪** 활성(라벨·THEME_ORDER는 ThemeSm8).
- ✅ smoke 전 8게임 emotion focus OK · 새 lemma 없음 · hangul.js 미터치 · ask-paul #37.
- ⏭ Claude Next 대기 · invent Next 금지 · emotion 스윕 닫힘.
- ⛔ 커밋/푸시 없음.

### Cursor (data · emotion-mood → particle/dictation/tel/scramble +10 · Paul offline)
- ✅ Particle **v14**: **+10** (ps-127–136) · 합계 **136** · themes `emotion` · topic3·subject4·object3.
- ✅ Dictation **v16**: **+10** (d-133–142) · 합계 **142** · 해요체 · NIKL/Sejong · cloze/listen과 문장 분리.
- ✅ Telephone **v13**: **+10** (tel-124–133) · 합계 **133** · scramble **v13**: **+10** (ws-126–135) · 합계 **135**.
- ✅ manifest **v53** · 기존 유지 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ emotion 스윕 닫힘 · ThemeSm8d(칩) sibling Done · Claude Next / Paul 게이트 · invent Next 금지.

### Cursor (ThemeSm8d · emotion chips enable 4games · blocked · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm8d 시도.
- ⛔ particle/dictation/telephone/scramble **emotionTagged=0** · `themes`에 emotion 없음 → 칩 enable 불가(빈 필터 금지).
- ✅ 라벨·THEME_ORDER `emotion` **감정/情绪** 는 ThemeSm8에서 이미 준비 · 새 lemma 없음 · hangul.js 미터치 · smoke 미실행(데이터 없음).
- ⏭ **먼저** sibling data: emotion → particle/dictation +8–10 (+tel/scramble) · 그다음 ThemeSm8d 재시도 · Claude Next 대기.
- ⛔ 커밋/푸시 없음.

### Cursor (data · emotion-mood → bingo/listen +10 · Paul offline)
- ✅ Bingo **v20**: **+10** (bg-178–187) · 합계 **187** · themes `emotion` · **기쁘다·외롭다** 포함 · 실망·불안은 cloze 유지.
- ✅ Listen **v20**: **+10** (lm-145–154) · 합계 **154** · 해요체 · NIKL/Sejong · pack/cloze/speed와 문장 분리.
- ✅ manifest **v52** · 기존 유지 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: emotion → **particle/dictation +8–10** (+tel/scramble).

### Cursor (ThemeSm8c · emotion chips enable bingo/listen · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm8c.
- ✅ bingo/listen emotionTagged=10 + `themes` emotion → 칩 **감정/情绪** 활성(라벨·THEME_ORDER는 ThemeSm8).
- ✅ smoke bingo+listen(+speed/cloze) emotion focus OK · 새 lemma 없음 · hangul.js 미터치.
- ⏭ Sibling: emotion → particle/dictation (+tel/scramble) · Claude Next 대기 · invent Next 금지.
- ⛔ 커밋/푸시 없음.

### Cursor (ThemeSm8b · emotion chips enable cloze · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm8b.
- ✅ cloze emotionTagged=10 + `themes` emotion → 칩 **감정/情绪** 활성(라벨·THEME_ORDER는 ThemeSm8).
- ✅ bingo/listen emotion tags=0 → 칩 미활성(데이터 교차 대기).
- ✅ smoke cloze+speed emotion focus OK · 새 lemma 없음 · hangul.js 미터치.
- ⏭ Sibling: emotion → bingo/listen · Claude Next 대기 · invent Next 금지.
- ⛔ 커밋/푸시 없음.

### Cursor (data · emotion-mood → cloze +10 · Paul offline)
- ✅ Cloze **v14**: **+10** (c-123–132) · 합계 **132** · themes `emotion` · **실망·불안** 포함 · 원작 해요체 · NIKL/Sejong · pack/speed와 문장 분리.
- ✅ manifest **v51** · 기존 c-01–122 유지 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: emotion → **bingo/listen +8–10** (기쁘다·외롭다) · 이후 particle/dictation · ThemeSm emotion cloze 칩 smoke.

### Cursor (ThemeSm8 · emotion chip residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm emotion residual.
- ✅ 전 8게임 `theme_emotion` 캐논 KO **감정** / ZH **情绪** / EN Emotion · THEME_ORDER `emotion`.
- ✅ speed emotionTagged=10 + `themes` → 칩 활성 · 타 7게임 tags=0 → 칩 숨김 · 새 lemma 없음.
- ✅ smoke emotion 캐논 + speed emotion focus OK · hangul.js 미터치.
- ⏭ Claude Next · emotion → cloze/bingo/listen (sibling 추천) · invent Next 금지.
- ⛔ 커밋/푸시 없음.

### Cursor (data · emotion-mood pack + speed +10 · Paul offline)
- ✅ Intermediate **v13**: 팩 **감정·기분** `emotion-mood` **+12** · 합계 **160** · 기존 팩 유지 · NIKL/Sejong·Tammy · 브랜드 없음.
- ✅ Speed **v14**: **+10** (sq-131–140) · 합계 **140** · themes `emotion` · 실망·불안 팩 thin · `speed.js` 칩 Emotion/감정/情绪.
- ✅ manifest **v50** · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: emotion → **cloze/bingo/listen +8–10** (실망·불안) · 이후 particle/dictation · ThemeSm emotion 칩.

### Cursor (ThemeSm7c · hobby chips enable 4games · Done · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm7c 재시도.
- ✅ sibling data 후 particle/dictation/tel/scramble **hobbyTagged=10** + `themes` hobby → 칩 **취미/爱好** 활성(라벨·THEME_ORDER는 ThemeSm7).
- ✅ smoke `_smoke_games_theme_filter.js` 4게임 **hobby focus** · 전 8게임 hobby 칩 OK · 새 lemma 없음 · hangul.js 미터치.
- ⏭ Claude Next 대기 · invent Next 금지 · hobby-culture sweep closed.
- ⛔ 커밋/푸시 없음.

### Cursor (data · hobby-culture → particle/dictation + tel/scramble +10 · Paul offline)
- ✅ Particle **v13**: **+10** (ps-117–126) · 합계 **126** · topic3/subject4/object3 · **작품·여가** 포함 · themes `hobby`.
- ✅ Dictation **v15**: **+10** (d-123–132) · 합계 **132** · 원작 해요체 · NIKL/Sejong · cloze/listen과 문장 분리.
- ✅ Telephone **v12**: **+10** (tel-114–123) · 합계 **123** · Scramble **v12**: **+10** (ws-116–125) · 합계 **125**.
- ✅ manifest **v49** · 기존 문항 유지 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next: **ThemeSm7c** hobby chips enable particle/dictation/tel/scramble (tags/`themes` 준비됨) · hobby data sweep 닫힘.

### Cursor (ThemeSm7c · hobby chips enable 4games · blocked · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm7c 시도.
- ⛔ particle/dictation/telephone/scramble **hobbyTagged=0** · `themes`에 hobby 없음 → 칩 enable 불가(빈 필터 금지).
- ✅ 라벨·THEME_ORDER `hobby` **취미/爱好** 는 ThemeSm7에서 이미 준비 · 새 lemma 없음 · hangul.js 미터치.
- ⏭ **먼저** sibling data: hobby → particle/dictation +8–10 (+tel/scramble) · 그다음 ThemeSm7c 재시도 · Claude Next 대기.
- ⛔ 커밋/푸시 없음.

### Cursor (ThemeSm7b · hobby chips enable bingo/listen · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm7b.
- ✅ bingo/listen `hobby` tags(각 10)+`themes` 확인 → 칩 **취미/爱好** 활성(라벨·THEME_ORDER는 ThemeSm7).
- ✅ smoke `_smoke_games_theme_filter.js` bingo+listen **hobby focus** · OK · 새 lemma 없음 · hangul.js 미터치.
- ⏭ sibling: hobby → particle/dictation (+tel/scramble) · ThemeSm7c 후보 · Claude Next 대기 · invent Next 금지.
- ⛔ 커밋/푸시 없음.

### Cursor (data · hobby-culture → bingo/listen +10 · Paul offline)
- ✅ Bingo **v19**: **+10** (bg-168–177) · 합계 **177** · 문화·공연·전시·관람·미술관·박물관·축제·독서·**연극**·**관심** · themes `hobby` · beginner leisure 분리.
- ✅ Listen **v19**: **+10** 해요체 (lm-135–144) · 합계 **144** · pack/cloze/speed와 다른 원작 구 · NIKL/Sejong · 브랜드 없음.
- ✅ manifest **v48** · hangul.js 미터치 · 작품·여가 cloze 유지 · particle/dictation residual.
- ⏭ Next 추천: hobby-culture → **particle/dictation +8–10** (+tel/scramble).
- ⛔ 커밋/푸시 없음.

### Cursor (ThemeSm7 · hobby chip residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm hobby residual.
- ✅ 전 8게임 hobby 칩 KO **취미** / ZH **爱好** / EN Hobby · THEME_ORDER `hobby` · speed+cloze `themes`+tags(각 10) → 칩 활성 · 타 게임은 tags 없어 칩 숨김(`leisure` 유지).
- ✅ speed ZH **兴趣→爱好** 캐논 · smoke hobby focus(speed+cloze)+캐논 OK · 새 lemma 없음 · hangul.js 미터치.
- ⏭ sibling: hobby → bingo/listen · Claude Next 대기 · invent Next 금지.
- ⛔ 커밋/푸시 없음.

### Cursor (data · hobby-culture → cloze +10 · Paul offline)
- ✅ Cloze **v13**: **+10** (c-113–122) · 합계 **122** · 문화·공연·전시·관람·미술관·박물관·축제·독서·**작품**·**여가** · themes `hobby` · 원작 해요체 · c-01–112 유지.
- ✅ manifest **v47** · hangul.js 미터치 · NIKL/Sejong · 브랜드 없음 · 연극·관심 → bingo/listen thin.
- ⏭ Next 추천: hobby-culture → **bingo/listen +8–10** (연극·관심 포함).
- ⛔ 커밋/푸시 없음.

### Cursor (data · hobby-culture pack + speed +10 · Paul offline)
- ✅ Intermediate **v12**: 팩 **취미·문화** `hobby-culture` **+12** · 합계 **148** · 기존 팩 유지 · beginner leisure와 lemma 분리.
- ✅ Speed **v13**: **+10** (sq-121–130) · 합계 **130** · themes `hobby` · 작품·여가 팩 thin · `speed.js` 칩 Hobby/취미/(초기 兴趣 → ThemeSm7 **爱好**).
- ✅ manifest **v46** · hangul.js 미터치 · 원작 해요체 · NIKL/Sejong · 브랜드 없음.
- ⏭ Next 추천: hobby → **cloze/bingo/listen +8–10** (작품·여가) · 이후 particle/dictation · ThemeSm hobby 칩.
- ⛔ 커밋/푸시 없음.

### Cursor (residual · family 4게임 count + ThemeSm6c smoke · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · self-QA만.
- ✅ particle **116**/family10 · dictation **122**/10 · tel **113**/10 · scramble **115**/family11(ws-19 기존 basic+family) · manifest **v45** · 큐 수치와 일치.
- ✅ smoke `_smoke_games_theme_filter.js` 전 8게임 family 칩·focus **OK** · i18n **가족/家人** 캐논 유지 · 코드 수정 없음.
- ⏭ Claude Next / Paul 게이트 대기 · invent Next 금지.
- ⛔ 커밋/푸시 없음 · ask-paul 신규 없음.

### Cursor (ThemeSm6c · family chips enable particle/dictation/tel/scramble · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm6c.
- ✅ sibling data lane 후 particle/dictation/tel/scramble `family` tags+`themes` 확인 → 칩 **가족/家人** 활성(라벨·THEME_ORDER는 ThemeSm6).
- ✅ smoke `_smoke_games_theme_filter.js` **4게임 family focus** · OK · 전 8게임 family 칩.
- ✅ 새 lemma 없음 · hangul.js 미터치 · ask-paul #30 전 8게임.
- ⏭ Claude Next 대기 · sibling 비어 있음 · invent Next 없음.
- ⛔ 커밋/푸시 없음.

### Cursor (data · family-relations → particle/dictation + tel/scramble +10 · Paul offline)
- ✅ Particle **v12**: **+10** (ps-107–116) · 합계 **116** · 가족·아내·**관계**·부모님·형제·아들·동생·친척·결혼·사촌 · themes `family` · 기존 유지.
- ✅ Dictation **v14**: **+10** (d-113–122) · 합계 **122** · 가족·부모님·형제·친척·결혼·남편·아내·아들·딸·**관계** · 기존 유지.
- ✅ Telephone **v11**: **+10** (tel-104–113) · 합계 **113** · 관계 포함 · themes `family`.
- ✅ Scramble **v11**: **+10** (ws-106–115) · 합계 **115** · 관계 포함.
- ✅ manifest **v45** · family-relations **스윕 닫힘** · hangul.js 미터치 · 원작 해요체 · NIKL/Sejong.
- ⏭ Next 추천: family 스윕 닫힘 · **새 중급 테마** 또는 **TOPIK polish** · Claude Next 대기 · invent Next 금지.
- ⛔ 커밋/푸시 없음.

### Cursor (ThemeSm6b · family chips enable bingo/listen · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm6b.
- ✅ bingo/listen `family` tags+`themes` 이미 있음 → 칩 **가족/家人** 활성(라벨·THEME_ORDER는 ThemeSm6).
- ✅ smoke `_smoke_games_theme_filter.js` bingo+listen **family focus** · OK · particle/dictation/tel family 태그 0 → 칩 대기.
- ✅ 새 lemma 없음 · hangul.js 미터치.
- ⏭ sibling: family → particle/dictation (+ ThemeSm6c) · Claude Next 대기 · invent Next 없음.
- ⛔ 커밋/푸시 없음 · ask-paul #30 갱신.

### Cursor (data · family-relations → bingo/listen +10 · Paul offline)
- ✅ Bingo **v18**: **+10** (bg-158–167) · 합계 **167** · 부모님·형제·친척·결혼·남편·아내·**아들**·**딸**·동생·사촌 · themes `family` · **가족** 중복 스킵(bg-29) · 기존 유지.
- ✅ Listen-match **v18**: **+10** (lm-125–134) · 합계 **134** · 동일 lemma · cloze/pack과 다른 해요체 · 기존 유지.
- ✅ manifest **v44** · crossfill 턴 AQ · hangul.js 미터치 · thin 잔여: **관계** → particle/dictation.
- ⏭ Next 추천: family-relations → **particle/dictation +8–10** (관계 · +tel/scramble) · 또는 ThemeSm family bingo/listen 칩 smoke.
- ⛔ 커밋/푸시 없음.

### Cursor (data · family-relations → cloze +10 · Paul offline)
- ✅ Cloze **v12**: **+10** (c-103–112) · 합계 **112** · 가족·부모님·형제·친척·결혼·남편·아내·동생·**사촌**·**관계** · themes `family` · 원작 해요체 · c-01–102 유지.
- ✅ manifest **v43** · crossfill 턴 AP · hangul.js 미터치 · thin 잔여: **아들·딸** → bingo/listen.
- ⏭ Next 추천: family-relations → **bingo/listen +8–10** (아들·딸 포함; bg-29「가족」중복 주의).
- ⛔ 커밋/푸시 없음.

### Cursor (ThemeSm6 · family chip residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm family residual.
- ✅ 캐논: KO **가족** · ZH **家人** · EN Family (태그 id `family` · pack id `family-relations`) · speed 기존 ZH **家庭** → **家人** 통일.
- ✅ 8게임 `theme_family` + THEME_ORDER · tags 있는 **speed·cloze·scramble** 칩 활성 · 새 lemma 없음.
- ✅ smoke `_smoke_games_theme_filter.js` family 캐논+speed/cloze/scramble focus · OK.
- ⏭ sibling: family → bingo/listen (+ chip enable) · Claude Next 대기 · invent Next 없음.
- ⛔ 커밋/푸시 없음 · ask-paul #30.

### Cursor (data · family-relations pack + speed +10 · Paul offline)
- ✅ Intermediate theme **family-relations** **v11**: **+12** (가족·부모님·형제·친척·결혼·남편·아내·아들·딸·동생·사촌·관계) · 합계 **136** · 기존 팩 유지 · 브랜드 없음 · NIKL/Sejong.
- ✅ Speed-quiz **v12**: **+10** (sq-111–120) · 합계 **120** · themes `family` · 사촌·관계는 팩만.
- ✅ `speed.js` 칩 **가족/家庭** · manifest **v42**.
- ⏭ Next 추천: family-relations → **cloze/bingo/listen +8–10** (사촌·관계).
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (ThemeSm5c · digital chips enable particle/dictation/tel/scramble · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음 · ThemeSm5c.
- ✅ data lane이 particle/dictation/tel/scramble `digital` tags+`themes` 이미 채움 → 칩 **디지털/数码** 활성 (라벨·THEME_ORDER는 ThemeSm5).
- ✅ smoke `_smoke_games_theme_filter.js` 4게임 **digital focus** · **전 8게임** digital 칩 OK · 새 lemma 없음.
- ⏭ Claude Next / Paul 게이트 · invent Next 없음 · digital-comms 스윕 닫힘.
- ⛔ 커밋/푸시 없음 · ask-paul #29 갱신.

### Cursor (data · digital-comms → particle/dictation + tel/scramble +10 · Paul offline)
- ✅ Particle **v11**: **+10** (ps-97–106) · 합계 **106** · 통화·알림·메시지·연결 · topic 3 · subject 4 · object 3 · themes `digital`.
- ✅ Dictation **v13**: **+10** (d-103–112) · 합계 **112** · 통화·알림 포함 · listen/cloze와 다른 해요체.
- ✅ Telephone **v10**: **+10** (tel-94–103) · 합계 **103** · 통화·알림.
- ✅ Scramble **v10**: **+10** (ws-96–105) · 합계 **105** · 통화·알림.
- ✅ Digital-comms **스윕 완료** (pack → 8게임).
- ⏭ Next 추천: 다음 중급 theme pack + speed · 또는 TOPIK polish · ThemeSm digital focus smoke.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (ThemeSm5b · digital chips enable bingo/listen · Paul offline)
- ✅ Claude Now/Next **비어 있음** · invent Next 없음.
- ✅ bingo/listen에 `digital` tags+`themes` 이미 있음 → 칩 **디지털/数码** 활성 (라벨·THEME_ORDER는 ThemeSm5).
- ✅ smoke `_smoke_games_theme_filter.js` bingo+listen **digital focus** 추가 · OK (speed/cloze/bingo/listen).
- ⏭ sibling 제안: digital-comms → **particle/dictation +8–10** (통화·알림 · +tel/scramble).
- ⛔ 커밋/푸시 없음 · ask-paul #29 갱신.

### Cursor (data · digital-comms → bingo/listen +10 · Paul offline)
- ✅ Bingo **v17**: **+10** (bg-148–157) · 합계 **157** · themes `digital` · 메시지·연결 포함 · 기존 유지.
- ✅ Listen-match **v17**: **+10** (lm-115–124) · 합계 **124** · 해요체 원작 · cloze/pack/speed와 다른 문장.
- ✅ lemmas: 와이파이·충전·앱·문자·인터넷·휴대폰·배터리·데이터·메시지·연결 (통화·알림 → particle/dictation).
- ✅ manifest **v40** · hangul.js 미터치 · 브랜드 없음 · NIKL/세종.
- ⏭ Next 추천: digital-comms → **particle/dictation +8–10** (통화·알림 · +tel/scramble).
- ⛔ 커밋/푸시 없음.

### Cursor (ThemeSm5 · digital chip residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 ThemeSm digital residual.
- ✅ 캐논: KO **디지털** · ZH **数码** · EN Digital (태그 id `digital` · pack id `digital-comms`).
- ✅ 8게임 `theme_digital` + THEME_ORDER · speed+cloze themes 메타 → 칩 활성.
- ✅ smoke `_smoke_games_theme_filter.js` digital 캐논+speed/cloze focus · OK.
- ⏭ sibling 제안: digital-comms → bingo/listen +8–10 · invent Next 없음.
- ⛔ 커밋/푸시 없음 · ask-paul #29.

### Cursor (data · digital-comms → cloze +10 · Paul offline)
- ✅ Cloze **v11**: **+10** (c-93–102) · 합계 **102** · themes `digital` · 해요체 · 브랜드 없음 · pack/speed와 다른 원작.
- ✅ lemmas: 와이파이·충전·앱·문자·인터넷·휴대폰·배터리·데이터·통화·알림 (메시지·연결 → bingo/listen).
- ✅ cloze/speed `theme_digital` 칩 · manifest **v39** · hangul.js 미터치.
- ⏭ Next 추천: digital-comms → **bingo/listen +8–10**.
- ⛔ 커밋/푸시 없음.

### Cursor (Shop + ops/review residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 Shop·ops/review residual polish.
- ✅ `hub/shop/`: EN/KO/ZH · Hub 도어 제목 정렬 · Shop≠Games · Lemon/체크아웃 **미배선**.
- ✅ `ops/review.html`: `**jabi.**` 마크다운 누출 제거 · §3 Vercel stale 정리 · 파일럿·체크아웃 미배선 · `paul-review-ko.md` §3 동기.
- ⏭ Claude Next / Paul 게이트 · invent Next 없음 · sibling digital-comms 체인은 Claude 승격 대기.
- ⛔ 커밋/푸시 없음 · ask-paul #27–#28.

### Cursor (data · weather thin 일기예보 + digital-comms pack/speed · Paul offline)
- ✅ Bingo **v16**: **+1** 일기예보 (bg-147) · 합계 **147** · weather sweep closed.
- ✅ Listen-match **v16**: **+1** 일기예보 (lm-114) · 합계 **114**.
- ✅ Intermediate theme **digital-comms** **v10**: **+12** (와이파이·충전·앱·문자·인터넷·휴대폰·배터리·데이터·메시지·통화·연결·알림) · 합계 **124** · 브랜드명 없음 · 비밀번호 banking 유지.
- ✅ Speed-quiz **v11**: **+10** (sq-101–110) · 합계 **110** · themes `digital`.
- ✅ manifest **v38** · crossfill 턴 AK · hangul.js 미터치.
- ⏭ Next 추천: digital-comms → **cloze/bingo/listen +8–10**.
- ⛔ 커밋/푸시 없음.

### Cursor (ThemeSm4b · weather chips enable · Paul offline)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 ThemeSm4 잔여: weather 태그 존재 확인 후 칩 활성화.
- ✅ particle/dictation/telephone/scramble: `themes`+weather 태그 이미 있음(턴 AI) · 칩 KO **날씨** / ZH **天气** 전 8게임.
- ✅ smoke `_smoke_games_theme_filter.js` focus에 particle/dictation/tel **weather** 추가 · 전 게임 weather chip OK.
- ⏭ Claude Next / Paul 게이트 · invent Next 없음 · thin 일기예보는 Claude 승격 대기.
- ⛔ 커밋/푸시 없음 · ask-paul #26 스팟체크(전 8게임) 갱신.

### Cursor (data · weather-season → particle/dictation + tel/scramble +10)
- ✅ Particle **v10**: **+10** weather (ps-87–96: 날씨·계절·장마·기온·비·눈·안개·일기예보·태풍·바람) · 합계 **96** · themes `weather` · ps-01–86 유지.
- ✅ Dictation **v12**: **+10** 해요체 (d-93–102) · 합계 **102** · 맑다·흐리다·일기예보 · listen과 다른 원작 · d-01–92 유지.
- ✅ Telephone **v9**: **+10** (tel-84–93) · 합계 **93** · tel-06 날씨 kept · themes `weather`.
- ✅ Scramble **v9**: **+10** (ws-86–95) · 합계 **95** · ws-08 kept.
- ✅ manifest **v37** · crossfill 턴 AI · hangul.js 미터치 · weather 스윕 대체로 완료 · thin 잔여: bingo/listen **일기예보**.
- ⏭ Next 추천: bingo/listen **일기예보 +1–2** · 또는 다음 중급 theme 1팩 · 대안 TOPIK polish.
- ⛔ 커밋/푸시 없음.

### Cursor (ThemeSm weather chip residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 ThemeSm residual: weather 칩 라벨 통일.
- ✅ 8게임 `theme_weather`: KO **날씨** / ZH **天气** / EN Weather · THEME_ORDER 전원 `weather`.
- ✅ 칩 활성: speed · cloze · bingo · listen · scramble · particle/dictation/tel은 라벨 prep만(교차 lemma 미발명).
- ✅ smoke `_smoke_games_theme_filter.js` weather focus+캐논 · hangul.js 미터치.
- ⏭ sibling: weather → particle/dictation/tel · Claude Next 대기 · invent Next 없음.
- ⛔ 커밋/푸시 없음 · ask-paul #26 weather 칩 스팟체크.

### Cursor (data · weather-season → bingo/listen +10)
- ✅ Bingo **v15**: **+10** weather (bg-137–146: 계절·기온·**맑다**·**흐리다**·비·눈·바람·**안개**·장마·**태풍**) · 합계 **146** · bg-01–136 유지 · themes `weather`.
- ✅ Listen-match **v15**: **+10** 해요체 TTS (lm-104–113) · 합계 **113** · cloze/팩/speed와 다른 원작 · lm-01–103 유지.
- ✅ manifest **v36** · crossfill 턴 AH · hangul.js 미터치 · thin 잔여: **일기예보**.
- ⏭ Next 추천: weather → **particle/dictation +8–10** · 또는 telephone/scramble · 대안 다음 중급 theme / TOPIK polish.
- ⛔ 커밋/푸시 없음.

### Cursor (data · weather-season → cloze +10)
- ✅ Cloze **v10**: **+10** weather 조사 빈칸 (c-83–92: 날씨·계절·기온·비·눈·바람·**안개**·장마·**태풍**·일기예보) · 합계 **92** · c-01–82 유지 · themes `weather`.
- ✅ 원작 해요체 · 팩/speed 예문과 구분 · 국립국어원/세종 · Bida 덤프 없음 · 맑다·흐리다는 speed/pack.
- ✅ manifest **v35** · crossfill 턴 AG · hangul.js 미터치.
- ⏭ Next 추천: weather → **bingo/listen +8–10** (안개·태풍·맑다·흐리다) · 또는 particle/dictation · 대안 다음 중급 theme / TOPIK polish.
- ⛔ 커밋/푸시 없음.

### Cursor (Hub + Games door i18n polish · Paul offline)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 Hub·Games 도어 카피/i18n residual.
- ✅ `hub/index.html` 폴백 = `i18n.js` 정렬 · TOPIK II EN 폴백(한→영) · Teach/Learn/aboutPaul 잘림 복구 · `doorLearnTitle` EN **TOPIK I practice**.
- ✅ Games index: lead EN/KO/ZH Shop 문구 정렬 · Play 뱃지 KO **하기→시작** · ZH Shop `=` 패턴.
- ✅ manifest blurbs: KO `soft`/`MCQ` → 부드러운/객관식 · listen/bingo TTS·gloss → 학습자 용어 · Speechling/Kahoot는 ask-paul #24.
- ⏭ Claude Next 대기 · invent Next 없음 · Paul 게이트 유지.
- ⛔ 커밋/푸시 없음 · ask-paul #24–#25만 추가.

### Cursor (ThemeSm travel chip residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 ThemeSm residual: travel 칩 라벨 통일.
- ✅ 8게임 `theme_travel`: KO **여행** / ZH **旅游** / EN Travel (clinic 병원/医院 · school 학교/学校 패턴) · THEME_ORDER+`themes` 메타 전부 travel 보유.
- ✅ ZH `旅行`→`旅游` 캐논 · smoke `_smoke_games_theme_filter.js` travel focus+캐논 · 8게임 focus OK.
- ✅ 새 lemma/콘텐츠 없음 · hangul.js 미터치.
- ⏭ Claude Next 대기 · invent Next 없음 · Paul 게이트(Phase2/N7b/Stop) 유지.
- ⛔ 커밋/푸시 없음 · ask-paul #23 travel 칩 스팟체크만 추가.

### Cursor (data · travel thin + particle/dictation/tel/scramble)
- ✅ Bingo **v14**: **+2** thin (bg-135–136 **체크아웃·안내소**) · 합계 **136** · 팩 12 lemma bingo 완비.
- ✅ Listen-match **v14**: **+2** (lm-102–103) · 합계 **103** · dictation/팩과 다른 원작.
- ✅ Particle **v9**: **+10** travel (ps-77–86) · 합계 **86** · topic 3 · subject 4 · object 3 · 체크아웃·안내소 포함 · cloze와 다른 원작.
- ✅ Dictation **v11**: **+10** (d-83–92) · 합계 **92** · listen과 다른 원작.
- ✅ Telephone **v8**: **+10** (tel-74–83) · 합계 **83**.
- ✅ Scramble **v8**: **+10** (ws-76–85) · 합계 **85**.
- ✅ particle/dictation/telephone/scramble.js 필터 칩 **여행(travel)** · THEME_ORDER.
- ✅ manifest **v33** · crossfill 턴 AE · hangul.js 미터치 · cloze 체크아웃·안내소 thin 잔여.
- ⏭ Next 추천: cloze **체크아웃·안내소 +2** thin · 또는 **다음 중급 theme pack** · 대안 TOPIK polish.
- ⛔ 커밋/푸시 없음.

### Cursor (path-progress residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 path-progress residual.
- ✅ `path-progress.js`: `KEYS` 고정(`jabi.hangul.v1`/`jabi.basic.v1`) · save soft-fail · empty id 가드 · topik2 트랙 거부 · `topik-coach-v1` 미터치.
- ✅ Basics: meta status/`filled` 제거 · pilot/scaffold 뱃지 → practice · crown hint · i18n fallback.
- ✅ Hangul: nav Basics/TOPIK II i18n · badge escape · cache `20260727e`.
- ✅ TOPIK II: list meta `track.id`/status 제거 · practice 뱃지 · bankId/`pilot` preview 누출 제거 · path-progress 미소비.
- ✅ smoke `_smoke_path_progress.js` OK.
- ⏭ Claude Next 대기 · invent Next 없음 · Paul 게이트 유지.
- ⛔ 커밋/푸시 없음 · ask-paul #22 Path 도어 스팟체크만 추가.

### Cursor (data · travel-lodging → cloze + bingo/listen +10)
- ✅ Cloze **v8**: **+10** travel 조사 빈칸 (c-71–80: 숙소·숙박·여행지·여권·관광·**관광지**·항공권·체크인·짐·**여관**) · 합계 **80** · c-01–70 유지 · `cloze.js` 필터 칩 **여행**.
- ✅ Bingo **v13**: **+10** (bg-125–134) · 합계 **134** · 관광지·여관 포함 · `bingo.js` 칩 **여행**.
- ✅ Listen-match **v13**: **+10** 해요체 TTS (lm-92–101) · 합계 **101** · cloze·팩과 다른 원작 · `match.js` 칩 **여행**.
- ✅ manifest **v32** · crossfill 턴 AD · Bida §8 체크 · hangul.js 미터치 · 체크아웃·안내소 thin 잔여.
- ⏭ Next 추천: bingo/listen **체크아웃·안내소 +2** thin · 또는 particle/dictation travel · 대안 telephone/scramble.
- ⛔ 커밋/푸시 없음.

### Cursor (Teach residual polish · Paul offline)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 Teach seat/report residual.
- ✅ 핸드오프 JSON: strengths `{tag,rate}` · weaknesses `{tag,wrongs}` (corrects/hints/total 제거).
- ✅ 디버그 누출 제거: raw `mode:` · UI `topik-coach-v1` · mailto `seat-open-*` · sparseness raw EN.
- ✅ 카피: privacy 한 줄 · tried/sparseness i18n · open seats `mailtoSubject` · schema tagRow + escalation ZH.
- ✅ smoke `_smoke_teacher_select.js` OK · Lemon/결제 미배선.
- ⏭ Claude Next 대기 · invent Next 없음 · Paul 게이트(Phase2/N7b/Stop) 유지.
- ⛔ 커밋/푸시 없음 · ask-paul #21 Teach 스팟체크만 추가.

### Cursor (ThemeSm school chip residual · Paul offline)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 ThemeSm residual: school 칩 라벨 통일.
- ✅ 8게임 `theme_school`: KO **학교** / ZH **学校** / EN School (clinic 병원/医院 패턴) · THEME_ORDER+`themes` 메타 전부 school 보유.
- ✅ smoke `_smoke_games_theme_filter.js`: particle/dictation/telephone/scramble에도 school focus · SCHOOL 캐논 assert · 8게임 focus OK.
- ✅ 새 lemma/콘텐츠 없음 · hangul.js 미터치.
- ⏭ Claude Next 대기 · invent Next 없음 · Paul 게이트(Phase2/N7b/Stop) 유지.
- ⛔ 커밋/푸시 없음 · ask-paul #20 school 칩 스팟체크만 추가.

### Cursor (data · school-class → particle/dictation + telephone/scramble +10)
- ✅ Particle **v8**: **+10** school (ps-67–76) · 합계 **76** · topic 3 · subject 4 · object 3 · **과제·수강** · `particle.js` 필터 칩 **학교**.
- ✅ Dictation **v10**: **+10** 해요체 (d-73–82) · 합계 **82** · **과제·수강** · listen과 다른 원작 · `dictation.js` 칩 **학교**.
- ✅ Telephone **v7** / Scramble **v7**: 각 **+10** (tel-64–73 · ws-66–75) · 합계 **73** / **75** · **과제·수강** · 칩 **학교**.
- ✅ manifest **v30** · crossfill 턴 AB · Bida §8 체크 · hangul.js 미터치.
- ⏭ Next 추천: bingo/listen **과제·수강 +2** thin · 또는 다음 중급 theme pack · 대안 TOPIK I/II polish.
- ⛔ 커밋/푸시 없음.

### Cursor (Games theme-filter smoke · Paul offline self-QA)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 8게임 theme 필터 smoke.
- ✅ 라벨: clinic KO/ZH **병원/医院** 통일 (speed · cloze · particle · dictation; bingo/listen/tel/scramble 기존과 맞춤).
- ✅ Listen-match **v11**: 기존 태그 기반 `themes` 메타(+school) · 칩/localStorage 경로 정리.
- ✅ Bingo: 3×3 미만 테마 칩 숨김 (cafe/leisure 등 empty toast 데드엔드 제거) · focus clinic/workplace/school/housing/banking OK.
- ✅ 검증: `scripts/_smoke_games_theme_filter.js` + `_smoke_games_dictation.js` OK · 새 lemma 없음.
- ⏭ Claude Next 대기 · invent Next 없음 · Paul 게이트(Phase2/N7b/Stop) 유지.
- ⛔ 커밋/푸시 없음 · ask-paul 추가 없음.

### Cursor (data · school-class → cloze + bingo/listen +10)
- ✅ Cloze **v7**: **+10** school 조사 빈칸 (c-61–70: 수업·숙제·시험·강의·등록·학기·출석·성적·교실·교재) · 합계 **70** · c-01–60 유지 · `cloze.js` 필터 칩 **학교**.
- ✅ Bingo **v11**: **+10** (bg-113–122) · 합계 **122** · tags `school` · 기존 `학교` lemma 유지.
- ✅ Listen-match **v10**: **+10** 해요체 TTS (lm-80–89) · 합계 **89** · cloze·팩 예문과 다른 원작.
- ✅ games manifest **v29** · 국립국어원/세종 생존 해요체 · hangul.js 미터치 · 커밋/푸시 없음.
- ⏭ Next 추천: school-class → **particle +8–10** 또는 **dictation/telephone/scramble** (과제·수강 포함) · 대안 다음 중급 theme pack.
- ⛔ 커밋/푸시 없음.

### Cursor (TOPIK I verified polish · Paul offline self-QA)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 TOPIK I verified listen/read 폴리시.
- ✅ 뱅크: early Meaning·Look에서 정답 문자열/`Match:` 누출 제거 · flat hint Pair 절 스크럽 · why ZH 짧은 항목 보강 · answerText↔choice 일치 유지.
- ✅ UI: `isSpoilerHintLine` **Match** 대소문자(「Listening match:」 오탐 제거) · 온보딩 `jamo-id`(giyeok 등) 디버그 노출 제거 · dead `.jamo-id` CSS.
- ✅ 검증: early scaffold empty/partial **0** · key mismatch **0** · Lemon 없음.
- ⏭ Claude Next 대기 · invent Next 없음 · Sibling: health-clinic 게임 교차 Done · Paul 게이트(Phase2/N7b/Stop) 유지.
- ⛔ 커밋/푸시 없음.

### Cursor (data · health-clinic → word-scramble +10)
- ✅ Word-scramble **v6**: **+10** clinic (ws-56–65) · 합계 **65** · **통증·복용·회복·주사** 포함 · 증상·진료·처방·접수·진찰·약사 · themes `clinic` · ws-01–55 유지 · 다른 게임과 다른 원작.
- ✅ games manifest **v27** · 국립국어원/세종 생존 해요체 · 병원·약국 브랜드 없음 · hangul.js 미터치.
- ⏭ Next 추천: clinic 스윕 대체로 완료 → **다음 중급 theme pack** 또는 **TOPIK I verified polish**. 대안 telephone clinic 잔여(통증·복용·회복·주사 thin) · 또는 검사·입원 bingo thin.
- ⛔ 커밋/푸시 없음.

### Cursor (data · health-clinic → particle + dictation + telephone thin)
- ✅ Particle **v7**: **+10** clinic (ps-57–66) · 합계 **66** · topic 3 · subject 4 · object 3 · **검사·입원** 포함 · `particle.js` 필터 칩 **클리닉**.
- ✅ Dictation **v9**: **+10** clinic 해요체 (d-63–72) · 합계 **72** · **검사·입원** · listen과 다른 원작 · `dictation.js` 필터 칩.
- ✅ Telephone **v6**: **+8** thin (tel-56–63) · 합계 **63** · 검사·입원·약사.
- ✅ games manifest **v26** · 국립국어원/세종 생존 해요체 · 병원·약국 브랜드 없음 · hangul.js 미터치.
- ⏭ Next 추천: health-clinic → **word-scramble +8–10** (통증·복용·회복·주사) · 또는 TOPIK I verified polish · 또는 다음 intermediate theme pack.
- ⛔ 커밋/푸시 없음.

### Cursor (data · health-clinic → cloze + bingo/listen +10)
- ✅ Cloze **v6**: **+10** clinic 조사 빈칸 (c-51–60: 증상·진료·처방·접수·진찰·통증·복용·회복·**약사**·**주사**) · 합계 **60** · c-01–50 유지 · `cloze.js` 필터 칩 **클리닉**.
- ✅ Bingo **v10**: **+10** (bg-103–112) · 합계 **112** · tags `clinic`.
- ✅ Listen-match **v9**: **+10** 해요체 TTS (lm-70–79) · 합계 **79** · cloze와 다른 원작 구 · 약사·주사 포함.
- ✅ games manifest **v25** · 국립국어원/세종 생존 해요체 · 병원·약국 브랜드 없음 · hangul.js 미터치.
- ⏭ Next 추천: health-clinic → **particle +8–10** 또는 **dictation/telephone/scramble** clinic 교차 · 잔여 lemma **검사·입원** 보강 · 대안 TOPIK I verified polish.
- ⛔ 커밋/푸시 없음.

### Cursor (Hangul path residual polish · Paul offline)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 Hangul path 잔여 polish.
- ✅ path meta: `track.id` 제거 · preview 토큰 span + flex gap · chip `g.id` 폴백 제거 · dead `.hangul-badge--ready` · unused `hangulKind` i18n.
- ✅ css/js cache-bust **`20260727d`** · stroke tube **`STROKE_DATA_V=20260727c` 유지** · 새 자음 획순 art 없음 · 안vs못 글모음 미출하.
- ✅ smoke `_smoke_hangul_path.js` OK · ask-paul #18.
- ⏭ Claude Next 대기 · invent Next 없음 · Paul 게이트(Phase2/N7b/Stop) 유지.
- ⛔ 커밋/푸시 없음.

### Cursor (data · health-clinic pack + speed-quiz +10)
- ✅ Intermediate theme **건강·클리닉** (`health-clinic`) **+12** lemma (증상·진료·처방·접수·진찰·통증·복용·회복·검사·입원·약사·주사) · packs **7** · items **76** · v6 · 기존 6팩 유지 · 초급 clinic-basic과 lemma 분리.
- ✅ Speed-quiz **v7**: **+10** clinic/intermediate MCQ (sq-61–70) · 합계 **70** · themes `clinic` · 약사·주사 → 다음 게임.
- ✅ `speed.js` 필터 칩 **클리닉** · games manifest **v24**.
- ⏭ Next 추천: cloze 또는 bingo/listen에 **health-clinic +8–10** (약사·주사 포함) · 대안 particle clinic · 또는 TOPIK I verified polish.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (data+games · workplace residual thin · particle +3 · dictation +2)
- ✅ Particle **v6**: **+3** (ps-54–56: 출근은·퇴근이·발급을) · 합계 **56** · workplace topic/subject/object **4** each · ps-01–53 **유지**.
- ✅ Dictation **v8**: **+2** (d-61–62: 출장·서명) · 합계 **62** · workplace **12**/12 · d-01–60 **유지**.
- ✅ games manifest **v23** · 교차 메모 턴 V · public-workplace 게임 스윕 **완료**.
- ⏭ Next 추천: 중급 **건강·클리닉** 테마팩 1개 → Games 교차 · 또는 **TOPIK I verified** listen/read 폴리시.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (data+games · dictation workplace +10 · 통장·비밀번호 +2)
- ✅ Dictation **v7**: **+10** workplace/intermediate (d-49–58: 서류·제출·발급·증명서·민원·담당자·부서·출근·퇴근·연차) · **+2** banking thin (d-59–60: 통장·비밀번호) · 합계 **60** · themes `workplace` · d-01–48 **유지**.
- ✅ `dictation.js` 필터 칩 **직장(workplace)** · **화장품(cosmetics)** · games manifest **v22**.
- ✅ particle ps-45 smoke: `서류은`→`서류는` (모음 뒤 **는**) · 교차 메모 턴 U.
- ⏭ Next 추천: **particle 출근·퇴근·발급 +3** · 대안 출장·서명 → dictation +2 · 또는 TOPIK II draft 폴리시. workplace 게임 스윕 대체로 완료.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (Basics grammar deepen 03–06 · Paul offline)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 Sibling **문법 대조 카드 03–06 연장**.
- ✅ Unit **03** `jan-won` 잔(고유어)↔원(한자어) · trap · 글모음 `#two-number-systems`.
- ✅ Unit **04** `isseoyo-opseoyo` 있어요↔없어요 · trap(이에요 구분) · `#isseoyo-vs-opseoyo` · `봐도 돼요?` trap.
- ✅ Unit **06** `an-adj-verb` 안+형↔안+V · trap · 음식 주세요+계산 보강 · Particle Snap CTA **없음** (#9).
- ✅ 글모음 역링크 · research §6-1 · ask-paul #14–15 · queue Sibling Done 메모.
- ⏭ Claude Next 대기 · invent Next 없음.
- ⛔ 커밋/푸시 없음.

### Cursor (data+games · telephone/scramble workplace +10)
- ✅ Telephone **v5**: **+10** workplace/intermediate (tel-46–55) · 합계 **55** · 출근·퇴근·발급 포함 · themes \workplace\ · tel-01–45 **유지**.
- ✅ Word-scramble **v5**: **+10** 동일 lemma 어순 (ws-46–55) · 합계 **55** · themes \workplace\ · ws-01–45 **유지**.
- ✅ \	elephone.js\ / \scramble.js\ 필터 칩 **직장(workplace)** · games manifest **v21**.
- ✅ 교차 메모 턴 T: [esearch-theme-games-crossfill-ko.md\](research-theme-games-crossfill-ko.md) · [esearch-topik-bida-vocab-ko.md\](research-topik-bida-vocab-ko.md) §8 체크.
- ⏭ Next 추천: **dictation workplace +8–10** · 대안 particle 출근·퇴근·발급 +3 · 또는 TOPIK II draft 폴리시.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (TOPIK II write polish · Paul offline self-QA)
- ✅ Claude Now/Next **비어 있음** → invent Next 없이 **쓰기 51–54 draft 폴리시**.
- ✅ `draft-write-51…54.json`: 학습자 카피 Stub→코치 · Lemon 학습자 문구 제거 · trait ZH `结构·连贯` · NIKL 보조동사 띄어쓰기(`건네 주십시오`) · EN/ZH 분량=Hangul chars · Q51-04 ZH 约会→约好的时间.
- ✅ `topik2.js` i18n: Stub→형성 채점 · ZH `字（韩文）` · manifest write-54 노트 Lemon「나중에」약속 제거.
- ✅ smoke `_smoke_topik2_scoring.js` OK · 채점 가중/로직 **미변경**.
- ⏭ Claude Next 대기 · invent Next 없음 · ask-paul #12–13.
- ⛔ 커밋/푸시 없음 · Lemon/ML 없음.

### Cursor (data+games · particle-snap workplace +9)
- ✅ Particle **v5**: **+9** workplace/intermediate (ps-45–53) · 합계 **53** · 은/는·이/가·을/를 각 **3** · themes `workplace` · ps-01–44 **유지**.
- ✅ `particle.js` 필터 칩 **직장(workplace)** · games manifest **v20**.
- ✅ 교차 메모 턴 S: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md) · [`research-topik-bida-vocab-ko.md`](research-topik-bida-vocab-ko.md) §8 체크.
- ⏭ Next 추천: **telephone / word-scramble workplace +8–10** · 대안 dictation workplace · 또는 TOPIK II draft 폴리시.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (data+games · bingo/listen workplace 잔여 +10)
- ✅ Bingo **v9**: **+10** (bg-93–102: 서류·제출·발급·증명서·민원·담당자·부서·출근·퇴근·연차) · 합계 **102** · workplace **12**/12 · 기존 유지.
- ✅ Listen-match **v8**: **+10** 해요체 TTS (lm-60–69) · 합계 **69** · cloze와 다른 원작 구 · 기존 유지.
- ✅ games manifest **v19** · 교차 메모 턴 R: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md) · [`research-topik-bida-vocab-ko.md`](research-topik-bida-vocab-ko.md) §8 체크.
- ⏭ Next 추천: **particle-snap workplace +8–10** · 대안 telephone/scramble 또는 dictation workplace · 또는 TOPIK II draft 폴리시.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (R2 · TOPIK II debug strip + draft polish · Paul offline)
- ✅ Now **R2**: `topik2.js` 유닛 카드 SECTION/BANK/ITEMS 제거 · practice count 메타 · player meta q.id/type 숨김 · `topik2.css` practice-meta.
- ✅ listen/read draft: `아니어요`→`아니에요` **83** · answerText↔choices 일치 검증 0 mismatch · read-03/01 EN·ZH 글로스 소수 · listen-03·read-03 JSON 정규화.
- ✅ write 51–52: model∈acceptedAnswers 확인만(내용 미개작) · Lemon/ML 미배선.
- ⏭ Claude Next 대기 · invent Next 없음 · Paul 게이트(Phase2/N7b/Stop) 유지 · ask-paul #11.
- ⛔ 커밋/푸시 없음.

### Cursor (data+games · public-workplace → cloze + bingo/listen)
- ✅ Cloze **v5**: **+10** workplace/intermediate (c-41–50: 서류·제출·발급·증명서·민원·담당자·부서·연차·**출장**·**서명**) · 합계 **50** · themes `workplace` · c-01–40 **유지**.
- ✅ Bingo **v8** · **+2** 출장·서명 (bg-91–92) · 합계 **92**.
- ✅ Listen-match **v7** · **+2** 해요체 TTS (lm-58–59) · 합계 **59** · cloze와 다른 원작 구.
- ✅ games manifest **v18** · 교차 메모 턴 Q: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md).
- ✅ cloze/bingo/listen 필터 칩 **직장(workplace)** 라벨.
- ⏭ Next 추천: bingo/listen workplace 잔여 lemma **+8–10** (서류·제출·발급·증명서·민원·담당자·부서·출근·퇴근·연차) · 대안 particle-snap workplace · 또는 TOPIK II draft 폴리시.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (data+games · public-workplace pack → speed-quiz)
- ✅ Intermediate theme packs **v5**: 팩 5→**6** · 단어 52→**64** (+12 `public-workplace` / **공공·직장**: 서류·제출·발급·증명서·민원·담당자·부서·출근·퇴근·연차·출장·서명) · 해요체 글로스·예문 · 브랜드/기관앱명 없음 · 기존 팩 **유지**.
- ✅ Speed Quiz **v6**: **+10** workplace/intermediate MCQ (sq-51–60) · 합계 **60** · 필터 칩 `workplace` · 출장·서명 보류 · sq-01–50 유지.
- ✅ games manifest **v17** · 교차 메모 턴 P: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md).
- ⏭ Next 추천: **cloze 또는 bingo/listen**에 workplace +8–10 (출장·서명 포함) · 대안 dictation 통장·비밀번호 +2 · 또는 TOPIK II draft 폴리시.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (ThemeUX4 · bingo theme filter · Paul offline)
- ✅ Claude Now/Next 비어 있음 → Sibling 잔여: bingo top-level `themes` 메타(기존 item tags 17) + Speed Quiz식 칩 UI.
- ✅ `bingo-beginner.json` v7 · `bingo-board` localStorage `jabi.games.bingo.theme` · 5×5 부족 시 3×3 자동 · 새 lemma 없음 · Particle Snap CTA 미배선.
- ⏭ Claude Next 대기 · invent Next 없음 · 커밋/푸시 없음 · ask-paul #10(얇은 테마).

### Cursor (data+games · cosmetics→dictation gap)
- ✅ Dictation **v6**: **+8** cosmetics 해요체 (d-41–48: 화장품·로션·크림·립스틱·피부·바르다·샴푸·비누) · 합계 **48** · shopping/snack/transit/banking **유지**.
- ✅ games manifest **v16** · 교차 메모 턴 O: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md).
- ⏭ Next 추천: 중급 **공공·직장** 새 테마팩 1개 · 대안 TOPIK II draft 폴리시 · 또는 dictation 통장·비밀번호 +2.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (ThemeUX3 · dictation + listen-match + telephone + scramble filter · Paul offline)
- ✅ Claude Next 비어 있음 → Sibling: Speed Quiz 테마 필터를 **Dictation** · **Listen Match** · **Telephone** · **Word Scramble**에 복제.
- ✅ 기존 뱅크 `themes`/`tags`만 · localStorage · 문항 테마 태그 · 새 문항/콘텐츠 없음 · Particle Snap CTA 미배선.
- ✅ **Bingo 스킵** — item tags는 있으나 top-level `themes` 메타 없음.
- ⏭ Claude Next 대기 · invent Next 없음 · 커밋/푸시 없음.

### Cursor (data+games · speed housing + 한도·비밀번호)
- ✅ Speed Quiz **v5**: **+10** housing/intermediate MCQ (sq-41–50) · 합계 **50** · 필터 칩 `housing` · sq-01–40 유지.
- ✅ Bingo **v6**: **+2** 한도·비밀번호 (bg-89–90) · 합계 **90**.
- ✅ Listen Match **v6**: **+2** 해요체 TTS (lm-56–57) · 합계 **57** · 브랜드/앱명 없음.
- ✅ games manifest **v15** · 교차 메모 턴 N: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md).
- ⏭ Next 추천: **화장품→dictation 갭**(+6–8) · 또는 중급 **공공·직장** 새 테마팩 1개 · 대안 TOPIK II draft 폴리시.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (data+games · bingo + listen-match money-banking)
- ✅ Bingo Board **v5**: **+10** banking/money (bg-79–88: 계좌·이체·입금·출금·잔액·수수료·현금·환전·통장·송금) · 합계 **88** · bg-01–78 유지.
- ✅ Listen Match **v5**: **+10** banking/intermediate 해요체 TTS (lm-46–55, 동일 lemma · telephone/dictation과 다른 원작 구) · 합계 **55** · lm-01–45 유지.
- ✅ games manifest **v14** · 교차 메모 턴 M: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md).
- ⏭ Next 추천: housing/banking 테마→게임 스윕 **대체로 완료**. 남은 얇은 조각 — **한도·비밀번호 +2**(bingo/listen) 또는 **speed-quiz housing +8–10**. 대안: 새 테마(공공·직장) 1팩.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (data+games · listen-match housing-services crossfill)
- ✅ Listen Match **v4**: **+10** housing/intermediate 해요체 TTS (lm-36–45: 관리비·고장·수리·배달·문의·불편·월세·이사·열쇠·이웃) · 합계 **45** · 초급 lm-01–35 **유지**.
- ✅ games manifest **v12** · 교차 메모 턴 L: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md).
- ⏭ Next 추천: **telephone/scramble banking** +8–10. 대안: dictation 통장·비밀번호 +2 · 또는 speed-quiz housing.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (Theme→game UX · cloze + particle filter chips · Paul offline)
- ✅ Claude Next 비어 있음 → Sibling 잔여 UX: **Cloze Race** · **Particle Snap**에 Speed Quiz와 동일 테마 필터 칩 복제.
- ✅ 기존 뱅크 `themes`/`tags`만 (쇼핑·간식·교통·화장품·주거·은행·중급) · localStorage · 문항 태그 · 새 문항 없음.
- ✅ Particle Snap CTA **미배선** (ask-paul #9 대기) · invent Claude Next 없음 · 커밋/푸시 없음.
- ⏭ Claude Next 대기.

### Cursor (data+games · dictation money-banking crossfill)
- ✅ Dictation **v5**: **+10** banking/intermediate 해요체 (d-31–40: 계좌·이체·입금·출금·잔액·수수료·현금·환전·송금·한도) · 합계 **40** · 초급 shopping/snack/transit **30문항 유지**.
- ✅ games manifest **v11** · 교차 메모 턴 J: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md).
- ⏭ Next 추천: **listen-match housing** +8–10. 대안: telephone/scramble banking +8–10.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (data+games · bingo housing-services crossfill)
- ✅ Bingo Board **v4**: **+10** housing-services (bg-69–78: 관리비·고장·수리·배달·문의·불편·월세·이사·열쇠·이웃) · 합계 **78** · 기존 68칸 유지.
- ✅ games manifest **v10** · 교차 메모 턴 I: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md).
- ⏭ Next 추천: **dictation banking** +8–10. 대안: **listen-match housing** +8–10.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (data+games · particle-snap housing/banking crossfill)
- ✅ Particle Snap **v4**: **+12** housing/banking/intermediate (ps-33–44) · 합계 **44** · 초급 shopping/snack/transit/cosmetics **32문항 유지**.
- ✅ 은/는·이/가·을/를 각 **4** · 주거 5 · 금융 7 · 원작 해요체 · 브랜드/은행앱명 없음.
- ✅ games manifest **v9** · 교차 메모 턴 H: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md).
- ⏭ Next 추천: **bingo housing** +8–10 (housing-services 교차). 대안: dictation banking +8–10.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (Theme→game UX · speed-quiz filter chips · Paul offline)
- ✅ Claude Now 비어 있음 → Sibling Theme→game 잔여 UX: **Speed Quiz** 테마 필터 칩 (전체·쇼핑·간식·교통·은행·중급) · 문항 태그 · 기존 `themes`/`tags`만 · 새 문항 없음.
- ✅ Particle Snap CTA **미배선** (ask-paul #9 대기).
- ✅ 교차 메모 턴 G · 큐 Sibling Theme→game Done · invent Next 없음 · 커밋/푸시 없음.
- ⏭ Claude Next 대기 · 선택: cloze/particle 동일 필터 칩 복제.

### Cursor (data+games · cloze housing/banking crossfill)
- ✅ Cloze Race **v4**: **+10** housing/banking/intermediate 빈칸 (c-31–40) · 합계 **40** · 초급 shopping/snack/transit/cosmetics **30문항 유지**.
- ✅ Intermediate theme packs **v4**: housing-services 6→**10** (+월세·이사·열쇠·이웃) · 합계 단어 48→**52** · money-banking 유지.
- ✅ Beginner theme packs **미변경** (v3 · 7팩 · ~60).
- ✅ games manifest **v8** · 교차 메모 턴 F: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md).
- ⏭ Next: particle-snap에 housing/banking +8–12 · 또는 bingo housing 교차.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (Basics grammar deepen · Sibling handoff · Paul offline)
- ✅ 01 `eunneun-iga` · 02 `e-eseo` · 05 `e-eseo-location` 대조 카드 (세종·국어원 역할 구분 · 함정 · 글모음 링크).
- ✅ `basic.js`/`basic.css`: `kind:contrast` · `trap` · `related` 렌더 · i18n「함정/Watch out/注意」.
- ✅ 리서치 §6-1 · track-manifest research ref · 글모음 역링크 · ask-paul #8–9.
- ✅ invent Claude Next 없음 · 커밋/푸시 없음.
- ⏭ Sibling next: Theme→game 잔여 · Claude Next 대기.

### Cursor (data+games · intermediate money-banking → speed-quiz)
- ✅ Intermediate theme packs **v3**: 팩 4→**5** · 단어 36→**48** (+12 `money-banking`: 계좌·이체·입금·출금·잔액·수수료·현금·환전·통장·송금·한도·비밀번호) · 원작 · 브랜드/은행앱명 없음 · 국립국어원/세종 해요체.
- ✅ Beginner theme packs **미변경** (v3 · 7팩 · ~60).
- ✅ Speed Quiz **v4**: **+10** banking/intermediate MCQ · 합계 **40** · games manifest **v7**.
- ✅ 교차 메모 턴 E: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md) · vocab README 갱신.
- ⏭ Next: cloze-race에 housing/banking 빈칸 +8–12 · 또는 housing-services 팩 보강 후 bingo.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (data+games · tel/scramble/lm cosmetics cross-fill)
- ✅ Telephone / Word Scramble / Listen Match v3: 각 **+7** cosmetics (로션·피부·크림·립스틱·샴푸·비누·화장품) · 합계 **각 35** · 브랜드명 없음 · 해요체 원작.
- ✅ games manifest v6 · 교차 메모 턴 D: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md).
- ⏭ Next: intermediate theme-pack → 게임 1회 교차 · 또는 speed-quiz UI theme 태그 필터.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (Hangul stroke tube 미학 · Sibling handoff #1 · Paul offline)
- ✅ Now 비어 있음 → Sibling #1: tube joints + practice UI polish.
- ✅ `gen-jamo-strokes-gulim.py`: `BUFFER_RES=18` + light simplify (medians/획순 유지) · 13+tense JSON 재생성.
- ✅ `hangul.js`/`hangul.css`: soft outline·drawingWidth 5 · stage 격자+십자 가이드 · Trace clear 톤 · cache `20260727c`.
- ✅ smoke `_smoke_hangul_path.js` OK · 커밋/푸시 없음.
- ⏭ Sibling next: Theme→game 잔여 · Claude Next 대기.

### Cursor (data+games · cloze/particle theme align · bingo cosmetics)
- ✅ Cloze Race v3 · Particle Snap v3: **30 / 32** 문항 shopping/snack/transit/cosmetics 장면 재정렬 (원작 · 국립국어원/세종식 해요체 · Bida 없음).
- ✅ Bingo v3: **+8** cosmetics 칸 · 합계 **68**어 (브랜드명 없음).
- ✅ games manifest v5 · 교차 메모 턴 C: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md).
- ⏭ Next: telephone/scramble/listen-match cosmetics 교차(+6–8) · 또는 intermediate 팩→게임 1회 교차.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (R1 콘텐츠·인터페이스 리뷰 수정 · Paul offline)
- ✅ SoT: [`content-interface-review-2026-07-27-ko.md`](content-interface-review-2026-07-27-ko.md) 1–6순위 전부.
- ✅ Basics: 유닛 디버그(topic/bank/문항ID) 제거 · filled=뱅크 기준 · preview에서 bankId 제거.
- ✅ Hangul: kind/slug 행 제거 · step pill 스텝 변경 시에만 · check choices `{en,ko,zh}` 64개 · `e-mak`→`eu-mak`.
- ✅ smoke `_smoke_hangul_path.js` OK · 커밋/푸시 없음.
- → Sibling next: Hangul stroke tube 미학 ([`cursor-work-queue-ko.md`](cursor-work-queue-ko.md) Sibling handoff #1).

### Cursor (data+games · speed/dictation theme align · cosmetics pack)
- ✅ Speed Quiz v3 · Dictation v4: **각 30** 문항 shopping/snack/transit 장면 재정렬 (원작 · Bida 덤프 없음 · 국립국어원/세종식 생존 해요체).
- ✅ Theme packs beginner v3: **+1팩 cosmetics-basic (+8어, 브랜드명 없음)** · 합계 7팩 · 60어.
- ✅ 교차 메모 갱신: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md). ask-paul-later **신규 없음**.
- ⏭ Next: cloze + particle 뱅크를 같은 테마(+cosmetics)로 정렬 · 또는 bingo cosmetics +6–8.
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (data+games reinforcement · Paul offline parallel)
- ✅ Theme packs v2: beginner +28어·+2테마(간식·쇼핑) · intermediate +18어·+1테마(주거·서비스). 원작 예문만 · Bida verbatim 없음.
- ✅ Games: bingo +12 · telephone/scramble/listen-match 각 +8.
- ✅ TOPIK II listen-04 / read-04 각 +1Q (요금·심야버스) · track-manifest 5Q.
- ✅ 메모: [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md) · Paul 보류 [`ask-paul-later-ko.md`](ask-paul-later-ko.md).
- ⛔ 커밋/푸시 없음 · hangul.js 미터치.

### Cursor (Hanzi Writer × 한글 획순 전체 감사)
- ✅ SoT: [`docs/audit-hanzi-writer-hangul-ko.md`](audit-hanzi-writer-hangul-ko.md) — 중국 leftover / Y-up / 퀴즈 페이드 / CDN 차단. **이전 부분 stroke verify 대체**.
- ✅ Fix: `hangul.js` `HANGUL_HW` · `radStrokes:[]` · `strokeFadeDuration:0` · Trace 전 `hideCharacter` · cache `20260727b`.
- ✅ smoke hangul path + ㄹㅂㅇㅋ 시각 확인. 커밋/푸시 없음.

## 2026-07-26

### Cursor (Canva 순서 스크립트 문서)
- ✅ Paul용 실행 순서: [`hub/app/assets/chars/CANVA-SCRIPTS-ORDERED-ko.md`](../hub/app/assets/chars/CANVA-SCRIPTS-ORDERED-ko.md) — Script A ㄴ → B ㄷ…ㅎ · BATCH-12 상단 포인터. 앱/커밋 없음.

### Cursor (프로토콜 §3-2 리서치·큐 소유권 잠금)
- ✅ Paul 확정: Next 발명=Claude만 · 큐 항목 구현 중 범위 안 리서치 자동 OK(Paul 대기 X) · 큐 비면 self-QA만. [`claude-cursor-loop-ko.md`](claude-cursor-loop-ko.md) §3-2 · 큐 상단 포인터. 앱/커밋 없음.

### Cursor (self-QA pass · Claude Next 없음 → QA)
- 게이트 당시: **Next = Paul 게이트만** (Phase2 캘리브 · N7b · Stop) → **QA 리뷰**.
- smoke 전부 OK: hangul v5 · path-progress · games×8 · geulmoeum · teacher-select · topik1 · topik2 listen/read/write scoring.
- 수정: 글모음 `yo-vs-seumnida` CTA `#deck=honorifics` stub → **Speed Quiz** · geulmoeum smoke `#deck=` 가드.
- 큐: **QA1 Done**. (작업 중/직후 Claude가 **Now=D1 디자인 리프레시 v2** 채움 → 다음 체인에서 D1.)
- ⛔ 커밋/푸시/Lemon/Vercel 없음.

### Cursor (Hub 도어 #7 선생님 선택 · 연구→채움 · 체인 완료)
- ✅ 리서치: [`docs/research-teacher-select-content-fill-ko.md`](research-teacher-select-content-fill-ko.md) — AI 보고 핸드오프 · 검증 좌석 · 가짜 프로필 금지 · Phase 3 비범위.
- ✅ 스캐폴드: `hub/teach/` 흐름 3단 · localStorage `topik-coach-v1` 리포트 미리보기·JSON 복사 · Paul 앵커 + open/waitlist 좌석 · Me→Teach CTA · Hub 도어 Draft 뱃지.
- ✅ smoke: `node scripts/_smoke_teacher_select.js` OK (4 seats · pilot).
- ✅ **Hub research-fill 체인 #1–#7 완료** → Notion sync · **pause** (Lemon/commit Stop · Phase2 캘리브·N7b는 Paul 게이트).
- ⛔ 커밋/푸시 없음. Hangul/Games/글모음 미터치.

### Cursor (Claude↔Cursor 루프 프로토콜 문서화)
- ✅ [`docs/claude-cursor-loop-ko.md`](claude-cursor-loop-ko.md) — Claude=brain(Next·docs) · Cursor=hands(구현) · cron 한계(세션 묶임·~7d) · splice·Stop.
- ✅ [`cursor-work-queue-ko.md`](cursor-work-queue-ko.md) 상단 포인터·역할 분담 · #7 Next에 Teach research 링크.
- ✅ PROGRESS §7에 루프 한 줄. 앱 코드·커밋 없음 (Paul/Claude docs 커밋 루틴에 맡김).

### Cursor (Hub 도어 #6 글모음 · 연구→채움)
- ✅ 리서치: [`docs/research-geulmoeum-content-fill-ko.md`](research-geulmoeum-content-fill-ko.md) — 병행 읽기·L1 질문 타이밍 · 레포 blog placeholder 갭 · Reddit 파이프라인 비범위.
- ✅ 콘텐츠: `hub/blog/data/` manifest + **6편** 원작 EN∥KO (요/습니다 · 은는/이가 · the 없음 · 두 수 체계 · 있어요 · 반말) · 목록/상세 EN|KO 탭 · soft CTA.
- ✅ 도어·카피: Hub i18n「Text collection / 글모음」· Coming soon 제거 · zh i18n 문법 수정.
- ✅ smoke: `node scripts/_smoke_geulmoeum.js` OK.
- ⏭ **Next = #7 선생님 선택**. Hangul/Games 미터치.
- ⛔ 커밋/푸시 없음.

### Cursor (Hangul path v5 · 획순 학습 후 재수정 → #5 Games)
- ✅ Phase A: 획순 JSON·Replay/Trace·리서치 학습 → [`docs/hangul-stroke-shapes-learned-ko.md`](hangul-stroke-shapes-learned-ko.md).
- ✅ Phase B: manifest **v5** · `02` 미리보기 `ㄴㅁㄹ ㄱㄷㅂ ㅅㅈ` · soft/stops/ㅅㅈ 예시 분리 · `ji` stub denylist · 획순 배지=실데이터만 · 디테일 `pilot` 제거 · 레슨 Trace에서 ㅈ 칸 숨김.
- ✅ smoke: `node scripts/_smoke_hangul_path.js` OK · `_smoke_path_progress.js` OK.
- ✅ Phase C: **#5 Games polish** — manifest v2 · Hub/Games 카피(Shop≠Games) · Dictation 16→20 · `node scripts/_smoke_games_dictation.js`.
- ⏭ **Next = #6 글모음**. Paul: Hangul Trace 수동 QA.
- ⛔ 커밋/푸시 없음.

### Cursor (Hub 도어 #4 TOPIK II · 연구→채움)
- ✅ 리서치: [`docs/research-topik2-content-fill-ko.md`](research-topik2-content-fill-ko.md) — NIIED/TopikLab 구조(듣기50·쓰기4·읽기50 · 180분·300점 · Q51–54) · 유형 매핑 · 형성 채점/AES/축 매핑 갭 · 풀모의≠목표.
- ✅ 콘텐츠: `draft-listen-03`(태도·다음행동·세부·목적) · `draft-read-03`(목적·배열·일치·빈칸) · write 51–54 각 +1 · manifest v2 · 조기 `Match:` 완화.
- ✅ 도어·카피: Hub i18n / `hub/index.html` — 듣기·읽기·쓰기 연습 · 형성 점수(공식 아님).
- ✅ smoke: `node scripts/_smoke_topik2_listen_read.js` OK (listen/read 24Q + write 14Q) · `_smoke_topik2_scoring.js` OK (부분점수 유지).
- ⏭ **Next = #5 Games research-fill polish** (선호) · #6 글모음 후순위. Hangul 미터치.
- ⛔ 커밋/푸시 없음.

### Cursor (Hub 도어 #3 TOPIK I · 연구→채움)
- ✅ 리서치: [`docs/research-topik1-content-fill-ko.md`](research-topik1-content-fill-ko.md) — NIIED/TopikLab 구조(듣기30·읽기40·100분·200점) · 유형 매핑 · verified/SRS/click-topik 갭 · 힌트 UX 유지.
- ✅ 콘텐츠: `verified-listen-02.json`(5Q: 응답·장소·주제·행동·세부) · `verified-read-04.json`(6Q: purpose·content·order·notice·topic·blank) · 기존 세트 제목 정렬 · `app.js`/`qa.js` 배선.
- ✅ 도어·카피: Hub i18n TOPIK I=읽기+듣기+퀘스트 · 최종모의=읽기 세트3 정직화 · TOPIK II「껍데기」카피 수정.
- ✅ smoke: `python scripts/_smoke_topik1_banks.py` OK (46Q · 유형 커버).
- ⏭ **Next = #4 TOPIK II research-fill**. Hangul/Basics/Games 미터치.
- ⛔ 커밋/푸시 없음.

### Cursor (Hub 도어 #2 기초 · 연구→채움)
- ✅ 리서치: [`docs/research-basic-content-fill-ko.md`](research-basic-content-fill-ko.md) — 세종한국어 1 주제 vs jabi 6단원 매핑 · TOPIK I 생존(소개·쇼핑·주문) · 표준 식음료·위치 · 단원별 문법 앵커.
- ✅ 콘텐츠: `hub/app/data/basic/track-manifest.json` v3 **`pilot`** — 01–06 각 대화·표현·스텝·8MCQ 연구 보강(은/는·에 가다·잔/원·에 있다 등). 스크립트 `scripts/build-basic-research-fill.py`.
- ✅ 도어 카피: Hub i18n / `hub/index.html` / basic UI — 「상세 초안」제거 · 연구 근거·XP·크라운.
- ✅ smoke: `node scripts/_smoke_path_progress.js` OK · basic banks 48Q / pilot 검증 OK · UI `hub/app/basic/` (http).
- ⏭ **Next = #3 TOPIK I research-fill**. Hangul/Games 미착수.
- ⛔ 커밋/푸시 없음.

### Cursor (Hub 도어 #1 한글 · 연구→채움)
- ✅ 리서치: [`docs/research-hangul-content-fill-ko.md`](research-hangul-content-fill-ko.md) — 세종 입문 00–17 구조 · 국어원 맞춤법(획순 미규정) · 7대표 받침 · Duolingo vs 교실 깊이 · 레슨별 채움 가이드.
- ✅ 콘텐츠: `hub/app/data/hangul/track-manifest.json` v3 **`pilot`** — 00–17 전 레슨 연구 근거 원작 보강(받침 순서·ㅇ 이중 역할·획 관행 명시). stroke `trace` URL 유지.
- ✅ 도어 카피: Hub i18n / `hub/index.html` — 「초안」오해 제거 · 연구 근거·획순·XP·크라운.
- ✅ smoke: `node scripts/_smoke_path_progress.js` OK · UI `hub/app/hangul/` (http).
- ⏭ **Next = #2 기초 수업** (같은 research-first → `research-basic-content-fill-ko.md` → basic fill). Basics/TOPIK/Games 미착수.
- ⛔ 커밋/푸시 없음.

### Cursor (G8 Telephone · Paul 선호 E5 · 체인 pause)
- ✅ **Telephone (전화게임)** MVP: `hub/app/games/telephone/` · 원작 20문장 · 솔로 속삭임(기억 모드: 보고/듣고 → 전달 숨김 → 입력) · 왜곡 모드(깨진 한국어 고쳐 쓰기) · soft 유사도 채점 · TTS 선택 · Sunstage Play.
- ✅ manifest pilot · Hub/Games i18n · smoke 확장 · Paul liked 세트 완료(Speed/Scramble/Bingo/Listen Match/Telephone + Dictation/Cloze).
- ⏸ **자동 게임 체인 pause** — 다음 Games 자동 착수 없음. Smoke: `hub/app/games/telephone/` (http) · `node scripts/_smoke_games_dictation.js`.
- ⛔ 커밋/푸시 없음.

### Cursor (G7 Listen Match · Paul 선호 E4)
- ✅ **Listen Match** MVP: `hub/app/games/listen-match/` · 원작 20구 · TTS(ko-KR) → 4지 한국어 탭 · soft miss(점수 미처벌) · 스킵/포기 · Sunstage Play.
- ✅ manifest pilot · Hub/Games i18n · smoke 확장 · Telephone planned 카드 · 기존 게임 미파괴.
- ⏭ 자동 Next: **Telephone (E5 스트레치)**. Smoke: `hub/app/games/listen-match/` (http) · `node scripts/_smoke_games_dictation.js`.
- ⛔ 커밋/푸시 없음.

### Cursor (G6 Bingo Board · Paul 선호 E3)
- ✅ **Bingo Board** MVP: `hub/app/games/bingo-board/` · 원작 48어휘 · 5×5/3×3 · FREE 중앙 · gloss 콜 + TTS 듣기 · 칸 탭 마크 · 줄(행/열/대각) 빙고 · Sunstage Play.
- ✅ manifest pilot · Hub/Games i18n · smoke 확장 · 기존 게임 미파괴.
- ⏭ 자동 Next: **Listen Match (G7)**. Smoke: `hub/app/games/bingo-board/` (http) · `node scripts/_smoke_games_dictation.js`.
- ⛔ 커밋/푸시 없음.

### Cursor (G5 Word Scramble · Paul 선호 E2)
- ✅ **Word Scramble** MVP: `hub/app/games/word-scramble/` · 원작 20문항 · 토큰 탭 조립·되돌리기 · soft pace(비처벌) · Sunstage Play.
- ✅ manifest pilot · Hub/Games i18n · smoke 확장 · 기존 게임 미파괴.
- ⏭ 자동 Next: **Bingo Board (G6)**. Smoke: `hub/app/games/word-scramble/` (http) · `node scripts/_smoke_games_dictation.js`.
- ⛔ 커밋/푸시 없음.

### Cursor (G4 Speed Quiz · Paul 선호 E1)
- ✅ 리서치 섹션 「Paul 선호 · 구현 쉬운 순」 — #1/2/4/7/8/12 매핑 · 교실 빙고=#12 · 스크램블=#7 · 전화=목록 외(E5).
- ✅ 쉬운 순: Speed Quiz → Word Scramble → Bingo → Listen Match → Telephone.
- ✅ **Speed Quiz** MVP: `hub/app/games/speed-quiz/` · 원작 20 MCQ · soft pace(비처벌) · A–D 탭 · 키 1–4 · Sunstage Play.
- ✅ manifest pilot · Hub i18n · smoke 확장 · Particle Snap 중복 없음(이미 출시).
- ⏭ 자동 Next: **Word Scramble (G5)**. Smoke: `hub/app/games/speed-quiz/` (http) · `node scripts/_smoke_games_dictation.js`.
- ⛔ 커밋/푸시 없음.

### Cursor (G3 Particle Snap)
- ✅ `hub/app/games/particle-snap/` — 은/는·이/가·을/를 2칩 탭 · soft snap bar(비처벌) · Sunstage Play.
- ✅ 원작 `particle-beginner.json` 24문항 · manifest pilot · Games 인덱스 카드 · i18n 도어 카피.
- ✅ smoke: `node scripts/_smoke_games_dictation.js` (dictation+cloze+particle).
- ✅ 워크큐 Next = **Syllable Build** 또는 **Listen Match** · 커밋/푸시 없음 · 기존 게임 미파괴.
- ⏭ UI smoke: `hub/app/games/particle-snap/` (http).

### Cursor (Games 카테고리 + Dictation MVP)
- ✅ 리서치: [`docs/research-jabi-games-ko.md`](research-jabi-games-ko.md) — Speechling UX · 영/한 학습 게임 갭 · 추천 12종 · Shop≠Games.
- ✅ Hub **Games** 도어 (`hub/index.html` + i18n EN/KO/ZH) — Shop과 분리. Shop 카피 = 굿즈·보드(상거래 후속).
- ✅ `hub/app/games/` 인덱스 + `data/games/manifest.json` 플러그인 스캐폴드 · **Dictation** 파일럿.
- ✅ Dictation: Speechling식 듣기→입력→diff · TTS ko-KR · 느린 재생 · 원작 beginner 16문장 · Sunstage Play.
- ✅ Practice에 Games 링크 가볍게 · Lemon/커밋/푸시 없음 · TOPIK/hangul 경로 미파괴.
- ⏭ 다음 게임 후보: **Cloze Race** (리서치 P1). Smoke: `hub/app/games/` · `hub/app/games/dictation/` (http).

### Cursor (TOPIK II listen/read 뱅크 02)
- ✅ 원작 추가: `draft-listen-02.json` 4Q · `draft-read-02.json` 4Q (일치·안내·이어가기·중심 / 세부·제목·내용일치·빈칸).
- ✅ `track-manifest` — `topik2-listen-02` · `topik2-read-02` pilot · order 재번호(쓰기 05–08 · mock 09). `topik2.js` 변경 없음(기존 MCQ 유닛 로더).
- ✅ smoke: `node scripts/_smoke_topik2_listen_read.js` (01+02 = 듣기 8Q · 읽기 8Q).
- ⛔ 오디오/Lemon/Canva chars · 커밋/푸시 없음 · write 추가 없음.
- ⏭ UI smoke: `hub/app/topik2/` (http) → 01–04 듣기/읽기 뱅크 → 연습하기.

### Cursor (Paul Canva ㄴ nieun 준비)
- ✅ Paul 「Canva ㄴ」 — `CANVA-BATCH-12-ko.md` ㄴ 워크시트 복붙·단계(1–6)·파일명·참고 PNG·넣었어 후속 명확화 · ㄷ 가볍게 대기.
- ✅ `README` / `CANVA-PASTE-WORKSHEET` 포인터 → 지금=nieun. giyeok SVG/가짜 SVG 미생성.
- ⛔ 커밋/푸시 없음.
- ⏭ Paul: Canva 스레드에서 `nieun-1.png`…`6.png` → `source/` → 채팅 **넣었어**.

### Cursor (C6 Crowns polish · hangul/basic)
- ✅ `path-progress.js` — 스킬 `crowns` 1–3 · 재도전 티어당 +3 XP · 최대 3에서 XP 없음 · 체크포인트는 `crownBump:false`.
- ✅ Hangul/Basic 패스 노드 왕관 비주얼 · 배지「다시 도전」/★★★ · Basic 연습 버튼 재도전 라벨.
- ✅ legacy `done` (crowns 없음) → getCrowns=1 · `topik-coach-v1` 미터치 · 획순/쓰기 채점 미터치.
- ✅ smoke: `node scripts/_smoke_path_progress.js` OK.
- ✅ 큐: C6 Done · **자동 체인 pause** (다음 후보 TOPIK 뱅크 / Paul 게이트).
- ⛔ 커밋/푸시 없음.
- ⏭ Smoke: hangul 체크 재통과 · basic 연습 재완주 → 왕관 1→2→3. Parent = **pause**.

### Cursor (Notion Done/Next sync · C5 후)
- ✅ Notion: PM 허브 · [Done/Next](https://app.notion.com/p/3a96d7c83f4481ed8abce83a78bd93af) · Phase0 / TOPIK / Phase1 상세 · Map(+3 Done 행) · Inbox(OOV done · Crowns next · Canva ㄴ · stroke QA).
- ✅ Done 미러: 힌트 UX · Hangul/Basics+Play 색 · TOPIK II 쓰기 채점 Phase1.1 · listen/read 파일럿 · C5 path XP · AES 리서치.
- ✅ Next 선택: **Crowns polish** (TOPIK II 추가 뱅크·pause 대신).
- ✅ 로컬: 이 로그 · `docs/cursor-work-queue-ko.md` 갱신.
- ⛔ 커밋/푸시 · 앱 기능 작업 없음.
- ⏭ Parent 자동 = **Crowns polish** (hangul/basic 크라운·재도전 톤).

### Cursor (C5 Duolingo path XP · hangul/basic)
- ✅ `hub/app/js/path-progress.js` — keys `jabi.hangul.v1` / `jabi.basic.v1` (TOPIK `topik-coach-v1` 미터치).
- ✅ Hangul: 체크 정답 → 스킬 완료 +10 XP · 체크포인트 버튼 → +5 XP · 노드 `is-complete` + XP HUD.
- ✅ Basic: 파일럿 MCQ 런 끝까지 → 유닛 완료 +10 XP · 패스 UI 반영.
- ✅ smoke: `node scripts/_smoke_path_progress.js` OK.
- ⛔ Lemon/Canva/커밋·푸시 없음.
- ⏭ Smoke: `hub/app/hangul/` · `hub/app/basic/` (http) → 완료 후 새로고침 유지. **다음 자동 = Notion Done/Next sync** (대안: crowns polish / smoke doc).

### Cursor (TOPIK II listen+read 파일럿 · Paul 「계속 진행」)
- ✅ 원작 뱅크: `draft-listen-01.json` 4Q(일치·안내·이어가기·중심) · `draft-read-01.json` 4Q(안내 세부·제목·내용일치·문맥 빈칸).
- ✅ `track-manifest` listen/read → `pilot` · `topik2.js` MCQ 플레이어 + 듣기 대본 선택 공개 · CSS/HTML 크롬.
- ✅ 스모크: `node scripts/_smoke_topik2_listen_read.js` OK · 쓰기 채점 스모크 회귀 OK.
- ⛔ 오디오/Lemon/AI · 커밋/푸시 없음 · Canva/Vercel 미터치.
- ⏭ Smoke URL: `hub/app/topik2/` (http) → 01 듣기 / 02 읽기 → 연습하기. **다음 자동 = C5 Duolingo XP/skill localStorage.**

### Cursor (쓰기 부분점수·다시쓰기 · Paul 채점 규칙)
- ✅ UI 유지: 0–100 합산 + 3 trait(내용/조직·흐름/언어) · disclaimer 「연습용 형성 점수 · 공식 TOPIK 아님」.
- ✅ Q51–52 **부분점수**: exact/공백·근접편집·어간·경어 근사·의미 있는 시도 → 중위 점수+고칠 점 피드백 (이진 0/100 폐기).
- ✅ Q53–54 checklist/휴리스틱 **연속 점수**(부분 크레딧). CTA **「다시 쓰고 제출」** · 시도 최근/최고 · 하트 없음.
- ✅ 축 매핑 문서 [`docs/topik2-writing-axis-mapping-ko.md`](topik2-writing-axis-mapping-ko.md) · bank `scoring` 라벨 정렬 · 리서치 상태 Phase 1.1.
- ⛔ Lemon/신경망 AES · Hangul/Basics 재작업 · 커밋/푸시 없음.
- ⏭ Smoke: `node scripts/_smoke_topik2_scoring.js` OK · `hub/app/topik2/` http로 다시 제출 UX.

### Cursor (듀오+세종 콘텐츠 · 색 오버홀 · Paul)
- ✅ **감사(정직):** 한글 00–17=최소 본문만(세종 상세·듀오 스텝 아님). 기초 01–02=6MCQ+노트, 03–06=제목 stub. TOPIK I verified OK. TOPIK II 쓰기 51–54 파일럿 · 듣기/읽기 빈 셸.
- ✅ **한글:** `track-manifest` v2 — 전 레슨 Intro→Teach→Practice(check)→Checkpoint 상세 초안(세종 00–17 구조만, 원작). 획순 `trace` 02/04/05 유지. 스킬 패스 UI.
- ✅ **기초:** 01–06 전부 상세 초안(대화·표현·스텝·각 8문항). 스킬 패스 UI. `draft-basic-unit03~06.json` 신규.
- ✅ **색:** Sunstage Play — `brand.json` / `hub.css` / `app.css` (`#EAF4FF` · `#FF8A14` · `#12C5B0` · path/xp/heart).
- ✅ **TOPIK II:** 듣기/읽기 가벼운 셸 모듈만(뱅크 없음). 쓰기 채점/AES 리서치 문서 미터치.
- ⛔ 커밋/푸시 없음 · giyeok SVG/Lemon 미터치.
- ⏭ Smoke: `hub/` · `hub/app/hangul/` · `hub/app/basic/` · `hub/app/topik2/` (http).

### Cursor (쓰기 Phase 1 형성 점수 UI · Paul)
- ✅ Paul: 리서치 기반 **스코어링 UI 구현** + 확인 질문 준비. 기본값: 0–100 합산 + 3 trait · disclaimer · 51–52 cloze 고/저 · 53–54 휴리스틱→trait · 4층 피드백 · LLM/Lemon 없음.
- ✅ `topik2.js`/`topik2.css`/`index.html`: 점수 패널 · trait 막대 · 규칙 라벨 · sticky disclaimer · 확인 후 모범/개요 선택 공개 유지.
- ✅ bank `scoring.traits` 가중: `draft-write-51..54.json`. 리서치·큐·DAILY 상태 Phase 1 done.
- ⏭ Smoke: `hub/app/topik2/` http → Q51 정답/오답 · Q53 단문 · disclaimer. Paul 확인 질문 답변 대기. 커밋/푸시 없음.

### Cursor (영어 AES 딥다이브 → jabi · Paul)
- ✅ WebSearch/Fetch: PEG·IEA/LSA·e-rater/c-rater·IntelliMetric·Coh-Metrix·ASAP/CNN-LSTM/BERT·LLM AES·GECToR·Criterion/WriteToLearn/MI Write/DET/Turnitin · formative 점수·게이밍·trait.
- ✅ 신설 [`docs/research-english-aes-for-jabi-ko.md`](research-english-aes-for-jabi-ko.md) — §A 지형 · §B 형성점수+4층피드백 · §C Phase R→1(점수 필수)→캘리브→모델 · §D Claude 확인 체크리스트.
- ✅ papers/grading 교차링크 · Phase1 “점수 없음” **폐기**(Paul: 학생은 점수 봐야 함). UI/ML/Lemon **미구현**.
- ⏭ **Paul OK:** 영어 AES 문서 → Phase 1 구현 승인 여부. **Claude:** §D 조사 확인용.

### Cursor (쓰기 채점 리서치-first · Paul)
- ✅ 현황 점검: `topik2.js` = **문자열 매칭(51–52) + 키워드·분량·격식 stub(53–54)**. AI/Lemon/ML **없음**.
- ✅ 논문·공식 합성 → `docs/research-topik2-writing-scoring-papers-ko.md` (AES PEG/IEA/e-rater/c-rater/BERT·LLM · TOPIK 루브릭 · 타당성·게이밍 · formative AWE).
- ⛔ **스코어링 알고리즘 고도화 pause** — Paul이 해당 문서 리뷰·승인 전 Phase 1+ / 블랙박스 점수 / Lemon 채점 금지. 콘텐츠(52–54)는 stub 채점만.
- ⏭ Paul: 리서치 문서 확인 → Phase 0 유지 vs Phase 1(투명 루브릭) 승인. **→ 저녁에 영어 AES 문서로 게이트 이동.**

### Cursor (TOPIK II content beyond Q51 · C3)
- ✅ 쓰기 **52–54** 원작 파일럿 뱅크: `draft-write-52.json`(빈칸 3) · `draft-write-53.json`(단문 2) · `draft-write-54.json`(논술 2).
- ✅ `topik2.js` 플레이어: 빈칸 + textarea 단문/논술 · stub 체크리스트 · **조기 모범 비유출**(확인 후 선택 공개). Q51 stub 문구도 순화.
- ✅ `track-manifest.json` v1 · write 51–54 전부 `pilot` · listen/read는 planned 셸 유지.
- ✅ 큐: C3 Done → **체인 pause** (listen/read 뱅크는 잔여·별도 재개). Lemon/AI 없음 · 커밋/푸시 없음.
- ⏭ Smoke: `hub/app/topik2/` (http) → 04/05/06 유닛 열기 → 연습하기.

### Cursor (Basic track content fill · C2)
- ✅ 01–02 뱅크 확장: 각 6문항 + objective/explain/phrases. 01-01 받침 버그 수정(민준→이에요).
- ✅ 매니페스트 v1 · track `pilot` · 03–06 planned stub(카페·쇼핑·길찾기·음식) 실제목·목표.
- ✅ `basic.js` MCQ 플레이어 배선(대화 연습 →) · TOPIK `app.js`/획순/giyeok/Lemon 미터치.
- ✅ 큐: C2 Done → **다음 = TOPIK II content beyond Q51**.
- ⏭ Smoke: `hub/app/basic/` (http). 커밋/푸시 없음.

### Cursor (힌트 UX · Paul 「개선점 정리.doc」)
- ✅ Word `.doc` 추출 → 이슈 7건(답 유출·힌트 중복·달다/닫다/출발·도착·말해 주다).
- ✅ 웹 리서치 → `docs/research-hint-ux-ko.md` (VanLehn/Duolingo/Anki/Clozemaster/TOPIK 앱).
- ✅ `app.js`: 단계 힌트(전략→제거→why 최후) · `Match:/답:`·정답 그림 조기 차단.
- ✅ verified 뱅크: v2-02/03/04/08 힌트 재작성 · steps[2] 순화 · 빈칸→안내문 순서 완화.
- ✅ `validate-topik-data.py` OK · `hint-logic-report.md` 갱신. 커밋/푸시 없음 · Sunstage/획순 미터치.
- ⏭ Paul smoke: 연습2에서 도움말 1–2에 정답 단어가 안 보이는지.

### Cursor (Hangul 콘텐츠 #1 · 레슨 00–17 최소 본문)
- ✅ Paul: scaffold에 **기본 콘텐츠** 채우기 — **한글 트랙만** (다음=Basic).
- ✅ `track-manifest.json` v1 · track `pilot` — 전 레슨 00–17에 objective / explain / examples / task (원작). 02/04/05는 기존 `trace` 유지.
- ✅ `hangul.js` 레슨 열면 모듈 렌더 · 획순 상단/레슨 배선 유지 · TOPIK `app.js` 미터치 · giyeok/Lemon 없음.
- ✅ 큐: Hangul content #1 Done → **다음 = Basic track content fill**.
- ⏭ Smoke: `hub/app/hangul/` (http). 커밋/푸시 없음.

### Cursor (N9 · 획순 앱 배선 — Claude 미완 인수)
- ✅ Paul: Cursor=기본 프로그래밍 · Claude=확인/리서치/기획만. 획순 구현 Cursor 인수.
- ✅ **인벤토리:** Claude origin 커밋 — `jamo-strokes-13.json`(13+ㅣ+깨진 `ji`) · tense · Hanzi Writer vendor · hangul-02/04/05 `type:trace` · 소형 인라인 위젯.
- ✅ **배선 강화:** Hangul 페이지 상단 **13자모 + 경음 로스터** · 풀사이즈 Replay/Trace 패널 · URL별 stroke JSON 캐시(13↔tense 교차 버그 수정) · ㅈ/`ji` 스텁은 폴백.
- ✅ Sunstage/giyeok SVG/Canva 파이프라인/`app.js` 퀴즈 엔진 **미터치**. Vercel URL 발명 없음.
- ✅ 큐 N9 Done · PROGRESS §7 · strokes/README 소유권 갱신. 커밋/푸시 없음.
- ⏭ **Claude 리뷰:** Trace 수동 채점 · 국어원 획순 대조 · ㅈ 정식 데이터. **Paul:** Hangul에서 ㄱ 하나 풀 Trace smoke.

### Cursor (ko/jabi 도메인 · .app vs 중국)
- ✅ Paul 질문: `.app`은 TLD 일괄 차단 아님(HSTS-preload→HTTPS 필수). `kojabi.com`/`jabiko.com` 불가 · **korjabi.com / jabikor.com / getkojabi.com** 등 .com 가용($11.25). 구매 없음.

### Cursor (N7a · 나머지 12 자음 파이프라인 슬라이스)
- ✅ **「12 자음 일괄」정의:** 파트너 13(ㅈ 제외) − ㄱ = ㄴ…ㅎ 12자 × stage 1–6 Canva→trace→SVG. Cursor≠72장 아트 발명.
- ✅ `hub/app/assets/chars/manifest.json` · `scripts/trace-char-sources.py` · `_check.html` 로스터 · `CANVA-BATCH-12-ko.md`(ㄴ·ㄷ 워크시트).
- ✅ 앱 `charArtSrc`+글리프 폴백 유지 · **giyeok Paul-OK SVG 미터치.**
- ⏭ **Paul:** Canva 우선 **ㄴ nieun** 1–6 → `source/` · (병행) Vercel hub URL. Cursor N7b=PNG 오면 추적만.

### Cursor (OOV content_review 배치 · Paul 「OOV 진행」)
- ✅ `build-vocab-allowlist.py` — 활용 peel/`SURFACE_LEMMA`/META·이름 보강.
- ✅ verified 뱅크 순화: 창가→창문 옆 · 호실→방 · 안내 제목 제거 · 추천→말해 주었어요 · 중앙→가운데 · 이사하기→이사 가요 · 세트→연습 N 등.
- ✅ 리포트 재생성: surface **144→34**, noise ~20, **content_review 87→0**.
- ✅ `validate-topik-data.py` OK. Notion Done/Next 가산 메모. 커밋/푸시 없음 · stroke/Lemon 미터치.

### Cursor (도메인 후보 · Vercel 가격 조회만, 구매 없음)
- ✅ jabi. 상품용 후보 ~18개 조회: **jabi.app**($9.99)·**getjabi.com**($11.25) 등 가용. jabi.com/io 불가. `.kr`는 Vercel 미지원(가비아 약 ₩16,500/년 참고).

### Cursor (Paul OK 게이트 · chars / jabi. / Sunstage / Vercel)
- ✅ Paul: `_check.html` **3–5 OK** · **Vercel/jabi. OK** · 디자인 다른 안은 말할 때만 → **Sunstage Clear 기본안 수락**.
- ✅ 기록: giyeok stage **3–6 Paul OK** · `jabi.` 브랜딩 OK · `ops-links` `phase-0-hub`/`phase-0-vercel` `paulOk:true`.
- ℹ️ Vercel MCP: 팀 프로젝트는 **`paul-intro`(wensonjabi.com)만** 존재. hub 스테이징(#2) **미생성**. `hub/vercel.json` 확인 OK (cleanUrls · sw no-cache).
- ⏭ **Paul 다음:** Vercel → Add New Project → 같은 repo → **Root Directory = `hub`** → Deploy → 미리보기 URL을 채팅에 붙여넣기 → Claude Task A.
- ⏭ **Cursor 해제:** 나머지 12 자음 일괄 가능. 커밋/푸시 없음. 획순(Claude) 미터치.

### Cursor (Notion sync)
- ✅ PM 허브 · [7. Done/Next](https://app.notion.com/p/3a96d7c83f4481ed8abce83a78bd93af) · Phase0/TOPIK/Phase1 — Sunstage P0+P1 · design-mocks · TOPIK II Q51 파일럿 반영. Next=**체인 pause** (선택 OOV는 Paul 재개 시). 커밋/푸시 없음.

### Cursor (TOPIK II 콘텐츠 파일럿)
- ✅ 경로: 쓰기 **Q51 원작 뱅크** (듣기/읽기 엔진 재사용보다 작음 · 리서치 51→54 순).
- ✅ `hub/app/data/topik2/draft-write-51.json` — 원작 빈칸 3 · `acceptedAnswers` + stub 피드백 (AI/Lemon 없음).
- ✅ `topik2/` 목록 → 파일럿 유닛 열기 → **연습하기** 플레이어 배선. manifest `write-51` = pilot.
- ✅ **다음이었던 Notion sync → 완료** (위 §). 커밋/푸시 없음.

### Cursor (UI/UX · Sunstage Clear P1)
- ✅ P1: 온보딩 모드/자모 타일 Sunstage 레인 · Hangul/Basics/TOPIK II 목록 크롬 공유(`hub.css`) · Nunito 폰트.
- ✅ SRS/미션 “퀘스트” 톤 · zh/ko 도어·모드 카피 미세 조정 · 접수/소프트캡 CTA 완화.
- ✅ 모션 3: XP 바 채움 · 현재 스테이지 칩 펄스 · 클리어 배너 등장 (`prefers-reduced-motion` 존중).
- ✅ **다음이었던 TOPIK II 파일럿 → 완료** (위 §).

### Cursor (UI/UX · Sunstage Clear P0 구현)
- ✅ Paul 「UI/UX제안 된 내용대로 진행」 — 글자 선택 없음 → **A. Sunstage Clear** 기본 채택 (밝은 게임 · 주황 XP).
- ✅ P0: Hub 학습 경로(한글→기초→TOPIK I→II) vs Blog/Teach/Shop 무게 분리 + scaffold 뱃지.
- ✅ Home XP 주스바 + 스테이지 칩; 스탯 5칸 → 연속/오늘복습 2칸.
- ✅ Practice: Hangul/Basics/TOPIK II 링크 제거 → Hub 안내 문구만; 모의고사+SRS 유지.
- ✅ Quiz 결과: XP/스테이지 클리어 배너 + 다음 미션 CTA (`runTodayMission`).
- ✅ 토큰 스텁: `brand.json` + `hub.css` `:root` (Sunstage) — hub/앱 라이트 적용. giyeok SVG/획순 미터치.
- ℹ️ 목업 갤러리 `hub/ops/design-mocks/`는 덮어쓰지 않음 (참고용).
- ✅ **P1 완료** (위 §).
- ⏭ 커밋/푸시 없음.

### Cursor (작업 큐 · 자동 체인)
- ✅ **Cursor 자동 체인 큐 활성** — `docs/cursor-work-queue-ko.md` · Sunstage P0→P1→TOPIK II 파일럿 (Lemon/stroke/commit Stop). PROGRESS §7 포인터.

### Claude (경음 배선 + 획순 배선 완료 지점)
- ✅ **ㄲㄸㅃㅆ 배선(hangul-05)** — 기존 자음 모양을 나란히 두 개 복제해서 생성(손으로 새로 안 그림), 겹침 없이 렌더링 확인 → `jamo-strokes-tense.json`.
- ℹ️ **획순 배선 현재 범위 정리**: hangul-02(기본자음)·04(격음)·05(경음) 3개 레슨, 자모 17개(13+ㄲㄸㅃㅆ) 배선 완료. 나머지 레슨은 모음/이중모음(모음 캐릭터 보류 결정으로 스킵) 또는 받침·연음(새 글자 모양 아님, 새 stroke 데이터 불필요) — 지금 갖고 있는 13자모 데이터로는 여기가 자연스러운 완료 지점.
- 🔄 다음: 모음 캐릭터 결정 바뀌거나 ㅈ 데이터 필요해지면 재개, 아니면 Paul 검토 대기

### Cursor (UI/UX · 밝은 게임형 제안)
- ✅ Hub/앱/트랙 스킴 감사 후 **UI/UX 백로그(P0–P2)** + 밝은 게임형 디자인 **3안** 정리.
- ✅ Canvas: `ui-ux-game-bright-proposals.canvas.tsx` · 공유용 `docs/ui-ux-game-bright-proposals-ko.md`.
- ✅ 획순은 Claude 통합 면만 명시(미개편). CSS 전면 리스타일·커밋 없음.
- ✅ **러프 목업 3장** 생성 → `hub/ops/design-mocks/` (A sunstage / B ticket / C quest + `index.html` 갤러리). 실앱 미터치·커밋 없음.
- ✅ **방향 확정(기본안):** Sunstage Clear → P0 구현 (위 §).

### Claude (한글 획순 배선)
- ✅ **13자모 stroke 데이터 완성** — ㄱ 최초 방향 오류(세로획 반대쪽) 발견·수정, 렌더링된 SVG path를 Python 소스와 직접 대조해 검증 → `hub/app/assets/chars/strokes/jamo-strokes-13.json`.
- ✅ **hangul-02·04 모듈 배선** — Cursor의 `track-manifest.json`/`hangul.js` 스캐폴딩에 `type:"trace"` 모듈 추가, Hanzi Writer 위젯 실제 렌더링(클릭→퀴즈 모드). ㅈ(데이터 없음)는 "준비 중" 폴백으로 자연 처리. 브라우저 검증 완료(콘솔 에러 0).
- ✅ **기초수업 콘텐츠 초안 2과** (인사·일상생활, jabi. 원작, 기존 blank 스키마 재사용) → `hub/app/data/draft-basic-unit0{1,2}.json`
- ✅ **TOPIK II 작문 채점 리서치** — 54번이 쓰기 100점 중 50점 최대 비중 확인, 3축(내용/구조/언어사용) 정성 피드백형 AI 채점 프롬프트 제안(숫자 점수 대신) → `docs/research-topik2-writing-grading-ko.md`
- 🔄 다음: 나머지 lessons(모음·경음·받침 등)에도 stroke/콘텐츠 확장은 Paul 확인 후

### Cursor (TOPIK II 스캐폴딩 · #5a)
- ✅ Paul 「토픽 II 진행」 OK 후 scaffold 착수·완료. **Lemon(#5b)는 stub 없이 보류.**
- ✅ `hub/app/data/topik2/track-manifest.json` — 00 overview · listen · read · write 51–54 · mock (전부 scaffold/planned; draft 뱅크 없음).
- ✅ `hub/app/topik2/` — 목록 UI. hub TOPIK II door · 앱 Practice 링크 · hangul/basic 교차 · i18n EN/KO/ZH.
- ✅ PROGRESS §6–§7: #5a **완료** / #5b Lemon **보류**. stroke/SVG/`app.js` 퀴즈 엔진 미터치.
- ✅ **Notion 동기 (#5a 완료):** PM 허브 · [7. Done/Next](https://app.notion.com/p/3a96d7c83f4481ed8abce83a78bd93af) · TOPIK I · Phase0 · Phase1 — scaffold 완료 / 콘텐츠 Next / Lemon 보류.
- 🔄 **다음 Cursor:** 쓰기 51→54 원작 파일럿 또는 듣기/읽기 엔진 재사용 — Paul 우선순위. Lemon wait.
- 🔄 **다음 Claude:** 획순 UI + 13자모/앱 stroke 배선 (Cursor 비접촉).

### Cursor (TOPIK II OK · 상태 정정)
- ✅ Paul 「토픽 II 진행」 — 이전 Done/Next의 **#5 전체 보류/stop은 stale**.
- ✅ **상태:** TOPIK II = Cursor **scaffold 완료** (위 §#5a) · Lemon/결제 = **계속 보류**.
- ✅ Notion·`PROGRESS` §7 반영.
- 🔄 **다음 Cursor:** #5a 완료 — 실콘텐츠는 Paul 우선순위 · Lemon wait.
- 🔄 **다음 Claude:** 획순 UI + 13자모/앱 stroke 배선 (Cursor 비접촉).

### Cursor (진행 정리 · Notion 동기)
- ✅ **Done/Next 인벤토리** — Cursor #1–#4 완료 · giyeok 2–5 재추적 · Claude 획순 파일럿/13자모(origin) · #5 당시 보류(이후 Paul OK로 정정) · 미커밋 로컬 다수.
- ✅ **Notion 갱신** — PM 허브 상태/다음/작업 로그 · [7. 백로그 Done/Next](https://app.notion.com/p/3a96d7c83f4481ed8abce83a78bd93af) · TOPIK I·Phase0·Phase1 상세 페이지 Progress 반영.
- 🔄 **다음 Paul:** chars 3–5 시각 OK · §2/`jabi. OK` · Vercel URL → Claude Task A.
- 🔄 **다음 Claude:** 획순 UI + 13자모/앱 stroke 배선 (Cursor 비접촉).
- 🔄 **다음 Cursor:** TOPIK II #5a scaffold 완료 — 위 §#5a 참고. Lemon(#5b) 보류.

### Cursor (기초 수업 스캐폴딩 · #4)
- ✅ `hub/app/data/basic/track-manifest.json` — 파일럿 01–02 + `03+ planned` stub (신규 본문 미작성).
- ✅ `hub/app/basic/` — 목록 UI + 파일럿 뱅크 id peek. hub Basics door · 앱 Practice 링크 · hangul↔basic 교차 링크.
- ✅ 기존 `draft-basic-unit01/02` 연결만. 퀴즈 엔진/`app.js`/stroke/SVG 미터치.
- 🔄 **다음 Cursor:** #5a TOPIK II → **완료** (위). #5b Lemon **보류**.
- 🔄 **다음 Claude:** 획순 UI + ㅣ/ㅇ/ㄱ 파일럿 + 13자모 stroke 배선.

### Cursor (review 잔여 · #3)
- ✅ **gitignore** — `scripts/_trial_*.py` · `*.bak` · `*.bak-*` · `*.svg.bak*` 추가 (backtest/__pycache__/_trial_source 기존 유지).
- ✅ **OOV 노이즈 분류** — `build-vocab-allowlist.py` 활용형 peel 강화 + `noise_likely`/`content_review`. 리포트 재생성: surface **219→144**, noise 43, **content 87**. 뱅크 문항 리라이트는 이번 배치에서 안 함.
- ✅ `vocab/README-ko.md` 노이즈 정책 한 줄. PROGRESS §7 #3 완료.
- ⏭️ **스킵:** stroke/`app.js`(Claude) · SVG blur(다른 에이전트 완료) · 마스터플랜 "TOPIK Coach" 문자열(Claude 예정) · content_review 87개 전수 리라이트(끝없는 정리).
- 🔄 **다음 Cursor:** #4 → **완료** (위 §기초 수업). #5 보류 → stop.
- 🔄 **다음 Claude:** 획순 UI + ㅣ/ㅇ/ㄱ 파일럿 + 13자모 stroke 배선.

### Cursor (한글 트랙 스캐폴딩 · #2)
- ✅ `hub/app/data/hangul/track-manifest.json` — 레슨 00–17 stub (제목·kind·jamoPreview·groups, `modules: []`).
- ✅ `hub/app/hangul/` — 목록 UI (본문·오디오·획순 없음). hub Hangul door + 앱 Practice 링크 stub.
- ✅ `README-data-ko.md` 한글 섹션 · PROGRESS §7 #2 완료. HTTP 스모크: manifest 18레슨 · hub door 링크 OK.
- ✅ Claude 비접촉: `strokes/**` · Hanzi Writer · `app.js` · giyeok SVG/tracer 미수정.
- 🔄 **다음 Cursor:** #3 막히지 않은 review 잔여 → **완료**. #4 기초도 **완료** (위 §기초 수업). #5 보류 → stop.
- 🔄 **다음 Claude:** 획순 UI + ㅣ/ㅇ/ㄱ 파일럿 + 13자모 stroke 배선.

### Cursor (캐릭터 · stage5 블러/머리)
- ✅ Paul «이거 말하는 거야?» → **맞음** (`char-giyeok-5.svg`). 원인: PNG 부츠≈검정 대비 낮음 + 트레이서가 검정 아웃라인을 BG와 함께 지운 뒤 **남색을 실루엣로 씀**. 초록 가로바 비율은 PNG상 2–6 모두 ~20%(Canva 머리 드리프트 아님).
- ✅ `trace-character-multi.py` 수정 후 **2–5 재추적**. **stage6 미터치**. 미리보기: `hub/app/assets/chars/_check.html`.
- 🔄 **다음:** Paul SVG 재확인. 새 Canva PNG 필수 아님(부츠만 더 밝은 남색이면 대비 보강).

### Cursor (백로그 · 트랙 순서 확정)
- ✅ Paul 「전체 구성 — Cursor가 순서 정하고 하나씩」 → 리서치 기본안 **채택·문서화** (`PROGRESS` §7 · `paul-review` §3b · `ops/review.html`).
- ✅ **정한 순서:** ①문서화(이번) → ②한글 스캐폴딩(데이터·레슨 stub·nav) → ③막히지 않은 review 잔여 → ④기초 수업 → ⑤TOPIK II·Lemon·Phase1+ **보류**.
- ✅ **Claude 비접촉 확인:** 획순 UI · `strokes/**` · ㅣ/ㅇ/ㄱ 파일럿 · 13자모 stroke 배선 · 관련 app.js/CSS — 손대지 않음. SVG blur(`char-giyeok-5` 등)도 비접촉.
- 🔄 **다음 Cursor:** #2 한글 트랙 스캐폴딩 → **완료** (위 §한글 스캐폴딩). 다음은 #3.
- 🔄 **다음 Claude:** 획순 UI + ㅣ/ㅇ/ㄱ 파일럿 + 13자모/앱 stroke 배선 (전담 범위만).

### Cursor (캐릭터 · stage 3–5)
- ✅ Paul **넣었어** — `source/giyeok-3.png`…`5.png` 확인(1·2·6 유지). PNG 시각: 3=남색부츠 / 4=+갈색지팡이 / 5=+금테갈색방패 · 빨간팬티·초록ㄱ·검정BG OK.
- ✅ `python scripts/trace-giyeok-sources.py` → `char-giyeok-3.svg`…`5.svg` (~5KB). stage1·2 동일 해시 유지 · **stage6은 Paul OK 원본 유지**(재추적 결과 되돌림).
- 🔄 **다음:** Paul이 `_check.html`에서 3–5 시각 OK — **Paul OK 아직 아님**.

### Cursor (병렬 · 퀴즈/QA — 캐릭터와 분리)
- ✅ **태그 UI** — 분석/결과/SRS에 `grammar:와/과` raw ID 대신 `formatTagLabel()` (`와/과 · 문법` / ZH `语法` 등). Claude UX 리뷰 🟢4 반영.
- ✅ **성장 XP 임계** — stage2 40→**100**(대략 모의 1세트), 이후 250/450/700/1000. 세트 중반 승급 완화(Claude UX 🟡3). PNG/SVG 미터치.
- ✅ **힌트 리포트 동기** — `hub/ops/qa/hint-logic-report.md`를 현재 verified 뱅크 35문항으로 재생성(휴관일·내과·반팔 잔존 제거 확인). 뱅크 본문은 이미 하향 완료 → 추가 문항 수정 없음.
- ✅ `README-data-ko.md` 반댓말 예: 반팔→티셔츠.

### Cursor
- ✅ **안내문 TOPIK I 어휘 하향** — `v3-03` 병원: 내과/접수 → 약국·식당·화장실; 질문 한국어 유지(EN/ZH). `v1-06` 휴관일→쉬는 날. README 어휘 규칙.
- ✅ **대비 표기** — 반댓말·시제·같은 패턴 모두 `A · B` (≠/↔ 금지).
- ✅ **문제 본문 한국어 고정** + `underline[]`(그곳/그것) · 번역 버튼은 지시문 옆, L1만 표시(지문 미반복), 라벨 EN/译/×, **UI 언어** 기준.
- ✅ **도움말 누적** — 단계 교체→스택(점선 구분) · 끝 토스트.
- ✅ **한국어 UI 순화** — 연속 학습·경험치·도움말·붙잡기/천천히/길잡이 · 성장 단계 아기·바지·장화…
- ✅ **어휘 패러프레이즈** — v1-04 선지 「아침에 하는 일」「병원 가기」.
- ✅ **어휘 소스 조사** — Guide∩1671≈589 추출 · 정책=국립국어원 A ∪ (1671−추상) · `hub/app/data/vocab/` · canvas `topik1-vocab-sources`.
- ✅ **JAEM→jabi canvas** — 일일미션/목표맵만 참고(라이브 코호트·II 금지).
- ✅ **vocab allowlist** — NIKL A(~894) ∪ (1671−hard) → `vocab-allowlist.json` (~1742) · OOV 리포트.
- ✅ **OOV 표현 하향(일부)** — 반팔→티셔츠, 목적지→어디에 가요, 소속/상관없다/동작장소 등 why·힌트 순화.
- ✅ **giyeok-6 SVG** — Canva 풀히어로(`raw-hero-4`) 추적 · **Paul OK**.
- 🔄 **다음:** Paul `_check.html` 3–5 시각 확인 → OK면 확정. (커밋/푸시 대기)
- ⏸️ Paul 대기: Vercel Task A · §2 OK.
### Claude
- ✅ `docs/handoff-growth-character-ko.md` 업데이트(Q1–D22) 확인 — 6단계 아이템 순서·13개 로스터가 내가 독자적으로 설계한 것과 일치함을 확인
- ✅ ㄱ(giyeok) 파일럿: 6단계 아이템 장착 데모(베이비→팬티→부츠→무기→방패→왕관) Canva 생성 + 전체 장착 히어로 폼 실제 SVG 추적 성공(다중 색상 트레이서 `scripts/trace-multicolor-demo.py`, 커밋 `e507ffe`)
- ⚠️ 발견: Canva **그리드 생성은 아이템이 단계 간 누적 안 됨**(6칸 중 4번째 칸에서 이전 아이템 사라짐, 2회 재현) → 프로덕션은 자비 로고처럼 **단계별 단독 고해상도 생성 후 추적** 방식으로 가야 함
- ✅ **파일 형식 webp → svg로 변경** (Paul 승인) — `hub/app/assets/chars/README.md`에 반영, 이유·Cursor 이의제기 여지 기록. `<img>` 태그 로딩 방식은 동일해서 Cursor 앱 코드 변경 불필요.
- ✅ Canva "jabi App Icon Design" 스레드에 확정 스펙(13 로스터·6단계·스타일락) 레퍼런스 노트 게시 — 앞으로 이 스레드에서 계속 생성할 때 기준
- 🔄 다음: Cursor **SVG OK** (이견 없음) → giyeok 최종 프로덕션 SVG → Paul 확인 → 나머지 12개 로스터 단계별 단독 생성
- ✅ `scripts/trace-character-multi.py` 프로덕션 트레이서 — 반점 노이즈 제거(open-close 모폴로지) + 색상 병합 버그 수정(외곽선 레이어 색을 전체 실루엣 평균이 아니라 외곽선 전용 픽셀로 계산하도록). ㄱ 1단계(베이비) SVG 검증 완료.
- ⚠️ **브라우저 자동화 비효율 확인** — Canva 스레드 무거워질수록 스크린샷·타이핑 실패, Paul Chrome 창이 비가시 상태(`hasFocus:false`)면 스크린샷 자체 불가. **앞으로 캐릭터 생성+추적은 Cursor의 Canva MCP+터미널로 넘기는 게 맞음**(Claude는 스크린샷 없이 못 하는 작업이라 구조적으로 비효율).
- ✅ 리서치(WebSearch/WebFetch, 로그인 불필요): TOPIK 접수(한국 topik.go.kr vs 중국 NEEA topik.neea.edu.cn, 회차별 접수기간이라 하드코딩 금지) + Lemon Squeezy(상품 설정 자체는 5분, 단 신원인증·계좌연결·세금서류는 Paul이 미리 해둬야 정산 뚫림) → `docs/research-registration-lemon-ko.md`
- 🔄 다음: Vercel Task A는 Paul `jabi. OK`+URL 대기 중(미착수)
- ✅ `.gitignore` 보안 수정 push (`c8cd941`) — `scripts/llm-keys.local.ps1` 무시 항목 복원
- ✅ Claude/Cursor 작업 분담 확정(Paul 요청) — Claude는 웹리서치·Vercel URL 연동·스펙 확정·브랜치 충돌 병합만, 나머지는 Cursor 기본값. 코드로 안 남음, `docs/DAILY-LOG.md`/Paul 대화 참고.
- ✅ 리서치+제안: **DB 필요성 + TOPIK 응시 판단 기준 + 성장 시각화** → `docs/research-readiness-data-model-ko.md`. 핵심 발견: 지금 앱은 100% localStorage, 백엔드 DB 전무(D11 계정·동기화 미착수) — `attempt_log`/`mock_attempts` 시계열 테이블 없인 D3(오답 개선 추이)·D2(준비도 공식) 둘 다 계산 불가능. Supabase 도입 + "최종 간이 모의 3회 중 2회 80%+" 판정 공식 제안.
- 🔄 다음: 위 문서 Paul/Cursor 검토 → D11 착수 시점 논의
- ✅ **정정**: 위 DB 리서치 중 "시계열 없이 계산 불가능" 부분 정정 — Cursor가 이미 `state.attempts`/`state.readinessLog`/`tagStrengthRows()`로 로컬 추이·강약 계산 구현 완료(가중 공식: 최근3회×0.65+마지막×0.35). DB 필요성은 유효하나 시급성 낮춤, D11/결제 시점으로 좁혀서 재정의.
- ✅ **UX 리뷰**: 로컬 서버로 온보딩→퀴즈→분석 실제로 걸어봄(중국어 UI) → `docs/ux-review-onboarding-flow-ko.md`. **🔴 발견 1**: 연습 세트 1회(10문항)만 풀어도 "준비도 90%, TOPIK 등록하기" CTA가 즉시 뜸 — `estimateReadiness()`가 표본 수 게이트 없음, 최소 시도 횟수 제한 제안. **🔴 발견 2**: `app.js`에 `assets/chars/` 참조 0건 — giyeok SVG 6단계 다 있는데 온보딩·홈·프로필 어디에도 캐릭터 이미지 안 보임(텍스트만). 그 외: 성장 속도 너무 빠름(1세트만에 stage1→2), 오답 태그 raw ID 노출(`grammar:와/과`), 퀴즈 중 이탈 경로 없음. 잘 되는 것: 오답별 맞춤 설명, 힌트 1단계, 중국어 로컬라이제이션, Mercy 톤 일관성.
- 🔄 다음: 위 두 발견(등록 CTA 타이밍, 캐릭터 아트 미연결) Cursor 코드 반영 검토
- ✅ **D11 착수 시점 재정의** — 마스터플랜 Phase 1 스펙(localStorage v1, Pro는 매뉴얼 코드 v0, 계정은 "later")과 D11("처음부터 로그인") 불일치 발견. 실제 착수는 Lemon Squeezy 셀프서비스 결제 전환 시점으로 제안, 그 전엔 과잉설계. 임시 안전장치로 "진행상황 내보내기/가져오기" 제안 → `docs/research-readiness-data-model-ko.md` §6.
- ✅ **D4b 명예의 전당 스펙 제안** — 트리거(80%+ AND stage6) 확정됐지만 화면 연출 미정(코드 0건)이던 것에 1회성 모달+영구 배지 리스트+선택적 이미지저장 제안, Mercy 톤 유지. Cursor 이견 없으면 그대로 진행 → `docs/handoff-growth-character-ko.md` D4b.
- 🔄 다음: 위 두 스펙 Cursor 검토, 이견 있으면 조정
- ✅ **D20 리서치**: 타 앱 무료/Pro 설계 비교(Duolingo 볼륨게이트=유저 불만多, LingoDeer 콘텐츠벽=체감폭 좁음, Memrise 기능게이트=우호적) → "하루 횟수 캡" 빼고 **기능 게이트 하나로 단순화**(연습 무제한, 최종모의+상세분석만 Pro) 제안. Mercy 톤·D17 정책과 더 일치 → `docs/handoff-growth-character-ko.md` D20.
- 🔄 다음: D20 제안 Cursor/Paul 검토
- ✅ **코드 직접 수정(Paul 요청, Cursor는 이미지 작업 중)** — 3건 전부 브라우저 검증 완료, **미커밋**(app.js가 HEAD 대비 2000줄+ 차이나서 제 것만 분리 불가): ①캐릭터 아트 연결(`charArtSrc()`, 온보딩·홈 화면에 img+onerror 폴백, 아트 없는 자음은 자동 텍스트로) ②`estimateReadiness()`에 `attemptCount` 추가, 등록 CTA는 3회 이상 시도부터만(`MIN_ATTEMPTS_FOR_REGISTER`) ③퀴즈 화면에 "← jabi." 이탈 버튼(`persistSession()`+`goTab("home")`, 기존 세션 재개 로직 그대로 활용, 데이터 손실 없음 확인).
- ⚠️ **Cursor 정리 요청**: `backtest_kospi_signal.py`/`backtest_out.txt`(무관 파일) · `scripts/__pycache__/` · `hub/app/assets/chars/source/`의 한글 이름 임시폴더·`_trial_*` 이미지들 → gitignore 추가 또는 삭제 권장. 나머지 미커밋 파일들(data/*.json, scripts/*.py, .env.example 등)은 그냥 커밋해도 됨.
- ✅ **다음 트랙 리서치**: TOPIK II·한글 읽기쓰기·기초수업(세종학당 표준교육과정 참고) → `docs/research-next-tracks-ko.md`. **한글 읽기·쓰기를 최우선 제안** — 기존 자음 캐릭터 13개 시스템과 거의 그대로 겹침(신규는 획순 트레이싱 UX·모음 캐릭터뿐), TOPIK II는 쓰기(작문) 채점 엔진이 아예 새로 필요해 부담 가장 큼 → 가장 나중 제안.
- 🔄 다음: 트랙 순서(한글→기초→TOPIK II) Paul 확인, "세종학당 파일" 있으면 공유 요청
- ✅ **정정 (같은 날 Cursor):** Paul이 Cursor에 순서 위임 → 위 제안 순서를 **채택 기록 완료** (`PROGRESS` §7). Paul 별도 확인 대기 해제.

---

## 2026-07-25

### Cursor
- ✅ Paul PC **Notion · Google Drive · Canva MCP** 연결 확인 (워크스페이스 검색 OK)
- ✅ Notion **PM 허브** + **§5 Cursor MCP** 페이지 동기화 (Phase 0 상태·작업 로그·MCP 완료 반영)
- ✅ repo `docs/PROGRESS.md` §5 갱신
- ✅ **Claude Task A 핸드오프** — `docs/claude-task-a-vercel-deploy.md` (Vercel URL·`jabi. OK` 후 **Claude가 직접** brand/ops-links/PROGRESS/DAILY/Notion·push). Notion PM 허브 작업 로그에도 기록.
- 🔄 Paul: **`jabi. OK`** · **Vercel 배포** → URL을 **Claude**에게 (Task A)
- ✅ **Task B (SRS v1 데모)** — `nextReview`·오늘 due·복습 세션(최대 3문항)·데모 시드·가이드 `hub/app/docs/SRS-DEMO-ko.md`
- ✅ **Task B-2** — 홈 「오늘 복습 N」 바로 시작 + 결과 CTA(남은 복습/약점 보기)
- ✅ **정책:** 공식=`local/` 참고만 · 앱=`verified-read` 원작만 로드 (공식 언플러그)
- ✅ **퀴즈 UX:** 제출·힌트 버튼 + 힌트/오답 횟수 → 결과 화면 학습 패턴 스냅샷 (`state.learner`)
- ✅ **힌트 로직 고정:** Meaning→Look→Pair (`hint.steps`) · 국립국어원/초급앱 받침 가르침 · v3-01 이에요/예요 재작성 · 문법 빈칸 일괄
- ✅ **시각:** 명사·명확 동사 + 한국어 라벨 항상 · 메타 아이콘 제거
- 🔄 **다음:** 읽기·듣기 주제형도 steps 템플릿 확장 · Paul QA
- ✅ **설계 D1–D22** — `docs/handoff-growth-character-ko.md`

### Claude
- ⏳ **Task A 대기** — Paul `jabi. OK` + Vercel URL → `docs/claude-task-a-vercel-deploy.md` 실행 (Cursor는 A 안 함)
- ✅ Kimi 브랜치와 갈라짐 **병합 완료** (merge `7881ceb`): Kimi의 jabi.+3모드 + Claude의 버그수정 2개(언어토글 홈튕김·스트릭 UTC)·모의 2세트·SRS 연습을 **전부 보존**, 브라우저로 온보딩→모드→퀴즈→언어전환→SRS 전 과정 검증(콘솔 에러 0)
- ✅ 랜딩(`hub/index.html`) jabi. 톤 적용 (`53fe1f7`) — hero "Korean, caught gently." + Catch/Mercy/Guide
- ✅ Notion 허브에 "작업 상세" 하위 페이지 6개 + repo `docs/PROGRESS.md` 인덱스 생성
- ✅ 잘못된 Notion 링크 9곳(로봇뉴스 샘플 가리키던 것) → PM 허브로 교체
- 🔄 다음: Notion 결정란 jabi. 반영(진행 중), Canva 로고(Paul MCP 로그인 필요), Vercel 배포(Paul)
- ⚠️ Paul: 위 커밋들 **로컬에만** 있음 — origin push 승인 필요(현재 push는 fast-forward, 충돌 없음)

---

## 2026-07-25 (Cursor Cloud — Paul "직접해")

### Cursor Agent
- ⚠️ Notion MCP 이 Cloud run: still `needsAuth` — Notion API 호출 불가
- ✅ 대신 repo 동기화: `docs/notion-sync-block.md`(Notion 붙여넣기), paul-review jabi., manifest jabi., placeholder titles, integrations MCP 상태 기록
- 🔄 Paul PC Cursor(Notion MCP ON) 채팅: `docs/notion-sync-block.md Notion PM 허브에 반영해줘`

---
- ✅ origin `cursor/hub-phase0-0f7e` pull 확인 (`855cadb`, main 대비 **17 commits**, PR #2 Draft)
- ✅ repo와 PROGRESS.md 대체로 일치: jabi. brand.json, 3모드, mock-02, SRS 연습, Notion PM URL `Paul-PM-3a76…`
- ⚠️ `hub/jabi-logo-preview.html` — DAILY-LOG에는 있으나 **repo에 파일 없음** (재생성 또는 Kimi 커밋 누락 확인)
- ⚠️ 문서·manifest 일부仍 "TOPIK Coach" (Claude 정리 예정)
- 🔄 다음: Paul **MCP Login** → 채팅 `MCP 연결했어`

---

### 23:40 Kimi
- jabi. 리브랜딩 완료: brand.json, app.js, i18n.js, index.html
- 3모드 확정: Catch / Mercy / Guide
- 로고 프리뷰 4옵션 생성 (`hub/jabi-logo-preview.html`)
- Option D (lowercase + period) 임시 확정 → Claude에서 Canva 디자인 이어갈 예정
- 🔄 다음: Claude — Canva 로고 디자인, 랜딩 페이지 jabi. 톤 적용

### 23:20 Paul
- 브랜딩 방향 확정: "jabi." (wensonjabi에서 추출)
- 자비/잡이/길잡이 3중 의미 확정
- Canva 연계는 Claude에서 이어서 진행하기로

---

# 로그 작성 규칙

```
### HH:MM 이름
- 한 줄 요약
- 한 줄 요약
- 🔄 다음: 누구 — 할 일
```

- `🔄 다음:` — 핸드오프가 필요한 항목
- `⚠️ Paul:` — Paul의 결정/확인이 필요한 항목
- `✅ 완료:` — 완료된 항목
