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

### Claude (콘텐츠·인터페이스 전수 리뷰)
- Paul 요청: 커서가 만든 트랙 하나씩 화면·콘텐츠 확인, 애매한 한국어는 국립국어원 기준 대조.
- 결과: [docs/content-interface-review-2026-07-27-ko.md](content-interface-review-2026-07-27-ko.md) -- Hangul/Basics 깊게, TOPIK I/II·Games·글모음·Teach는 랜딩+표본.
- 핵심 발견(인터페이스): Basics 유닛 카드에 파일경로/문항ID/타입이 그대로 노출되는 디버그 블록(가장 시급) -- Hangul 레슨도 내부 kind/slug 필드 노출 -- Hangul 퀴즈 choices 15개+ 다국어 처리 안 됨(KO/ZH에서도 영어) -- Basics "0 filled" 카운터가 실제와 모순.
- 콘텐츠: 표본 검증한 항목(7종성·연음규칙·평격경 삼중대립·이에요예요·은는vs이가·TOPIK II 54번 형식)은 전부 정확. "음악" 연음 예시 로마자 표기 "e-mak"만 오타(eu-mak이어야).
- 오탐 정정: 캐릭터 선택 화면에서 ㄴ~ㅎ 카드가 빈 것은 버그 아님(아직 아트 없음, 정상) -- DOM 확인 결과 giyeok/nieun 이미지는 정상 로드.
- 조치: cursor-work-queue-ko.md Now = R1(위 항목 우선순위 순으로 수정)로 등록.
- 다음(Cursor): R1 -- Basics 디버그 블록 제거부터 순서대로.

## 2026-07-26

### Claude (Task A -- Vercel hub 스테이징 URL 배선)
- Vercel 프로젝트 paul-intro-hub 생성 (Paul 계정, Root=hub). main 브랜치에는 hub/가 없어서(PR #2 미merge) 초기 import는 branch=main으로만 가능 -- 이후 Deploy Hook을 cursor/hub-phase0-0f7e에 만들어 트리거, 그 브랜치 빌드로 스테이징 URL 확보.
- URL: https://paul-intro-hub-git-cursor-hub-pha-05ff42-wensonjabi-ps-projects.vercel.app -- jabi. 허브 랜딩 정상 로딩 확인.
- 조치: brand.json domain.staging 채움, ops-links.json phase-0-hub/phase-0-vercel/phase-0-ops-dashboard/phase-1-app-mvp vercel 링크 채움, PROGRESS.md §1/§3 갱신.
- 다음: Paul이 URL 클릭 확인. app.js SRS/듣기는 Cursor B 소유(미터치).

### Claude (D1 큐 등록 -- 디자인 핸드오프 실행 갭 발견)
- 확인: 디자인 목업 v2 핸드오프 문서(design-handoff-mockup-v2-ko.md)가 어제 DAILY-LOG에만 기록되고 cursor-work-queue-ko.md Next에는 등록 안 돼 있었음 -- 자동체인이 Now/Next 테이블만 읽어서 안 집힘. app.css 확인 결과 partner-glyph/mode-icon 등 아직 미변경.
- 조치: cursor-work-queue-ko.md Now를 D1(디자인 리프레시 v2 적용)로 갱신, 차단 없음으로 표시.
- 다음(Cursor): D1 -- design-handoff-mockup-v2-ko.md 우선순위표 1번(캐릭터 남색 배지)부터 순서대로 적용.

### Claude (디자인 목업 v2 핸드오프)
- 홈/퀴즈/모드선택 3화면 목업(v2) 제작 -- Dribbble 남색배지 일러스트 x Finch 여백 x 카카오프렌즈 표정절제 블렌드. 20대 초반 여성 타겟, 아동용 교육 사이트 느낌 탈피 목표.
- 핸드오프 스펙: [docs/design-handoff-mockup-v2-ko.md](design-handoff-mockup-v2-ko.md) -- 실제 app.css 클래스(.home-partner/.choice/.mode-card/.tab-bar 등) 기준 구체 CSS 스니펫 + 우선순위표.
- 다음(Cursor): 위 문서 1순위(캐릭터 남색 배지)부터 순서대로 적용. app.js/app.css 미터치(문서만 작성).

### Claude (경음 배선 + 획순 배선 완료 지점)
- ✅ **ㄲㄸㅃㅆ 배선(hangul-05)** — 기존 자음 모양을 나란히 두 개 복제해서 생성(손으로 새로 안 그림), 겹침 없이 렌더링 확인 → `jamo-strokes-tense.json`.
- ℹ️ **획순 배선 현재 범위 정리**: hangul-02(기본자음)·04(격음)·05(경음) 3개 레슨, 자모 17개(13+ㄲㄸㅃㅆ) 배선 완료. 나머지 레슨은 모음/이중모음(모음 캐릭터 보류 결정으로 스킵) 또는 받침·연음(새 글자 모양 아님, 새 stroke 데이터 불필요) — 지금 갖고 있는 13자모 데이터로는 여기가 자연스러운 완료 지점.
- 🔄 다음: 모음 캐릭터 결정 바뀌거나 ㅈ 데이터 필요해지면 재개, 아니면 Paul 검토 대기

### Claude (한글 획순 배선)
- ✅ **13자모 stroke 데이터 완성** — ㄱ 최초 방향 오류(세로획 반대쪽) 발견·수정, 렌더링된 SVG path를 Python 소스와 직접 대조해 검증 → `hub/app/assets/chars/strokes/jamo-strokes-13.json`.
- ✅ **hangul-02·04 모듈 배선** — Cursor의 `track-manifest.json`/`hangul.js` 스캐폴딩에 `type:"trace"` 모듈 추가, Hanzi Writer 위젯 실제 렌더링(클릭→퀴즈 모드). ㅈ(데이터 없음)는 "준비 중" 폴백으로 자연 처리. 브라우저 검증 완료(콘솔 에러 0).
- ✅ **기초수업 콘텐츠 초안 2과** (인사·일상생활, jabi. 원작, 기존 blank 스키마 재사용) → `hub/app/data/draft-basic-unit0{1,2}.json`
- ✅ **TOPIK II 작문 채점 리서치** — 54번이 쓰기 100점 중 50점 최대 비중 확인, 3축(내용/구조/언어사용) 정성 피드백형 AI 채점 프롬프트 제안(숫자 점수 대신) → `docs/research-topik2-writing-grading-ko.md`
- 🔄 다음: 나머지 lessons(모음·경음·받침 등)에도 stroke/콘텐츠 확장은 Paul 확인 후


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
- 🔄 **다음:** Canva에서 ㄱ stage 2–5 단독 PNG → `source/giyeok-2..5.png` → 추적. 프롬프트는 `hub/app/assets/chars/README.md`.
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
