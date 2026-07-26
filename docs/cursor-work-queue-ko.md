# Cursor 작업 큐 (자동 체인)

> **갱신:** 2026-07-27 · **R1 Done (재검증 완료)** · **Now = R2 TOPIK II 디버그 노출 제거** · Sibling handoff 5건 전부 Done · Hub 도어 #1–#7 research-fill Done · Vercel hub URL 배포 완료  
> **리서치·큐 소유권:** Next 발명 = **Claude만**. Cursor는 큐 비었다고 백로그를 만들지 않음 · 큐 항목 **구현 중** 범위 안 리서치만 자동 OK · 큐 비면 self-QA만. 상세 → [`claude-cursor-loop-ko.md`](claude-cursor-loop-ko.md) **§3-2**.  
> **짝 문서:** [PROGRESS.md](PROGRESS.md) · [DAILY-LOG.md](DAILY-LOG.md) · **[research-teacher-select-content-fill-ko.md](research-teacher-select-content-fill-ko.md)** · **[research-geulmoeum-content-fill-ko.md](research-geulmoeum-content-fill-ko.md)** · **[research-jabi-games-ko.md](research-jabi-games-ko.md)** · **[research-topik2-content-fill-ko.md](research-topik2-content-fill-ko.md)** · **[research-topik1-content-fill-ko.md](research-topik1-content-fill-ko.md)** · **[research-basic-content-fill-ko.md](research-basic-content-fill-ko.md)** · **[research-hangul-content-fill-ko.md](research-hangul-content-fill-ko.md)** · **[research-english-aes-for-jabi-ko.md](research-english-aes-for-jabi-ko.md)** · [topik2-writing-axis-mapping-ko.md](topik2-writing-axis-mapping-ko.md) · [research-topik2-writing-scoring-papers-ko.md](research-topik2-writing-scoring-papers-ko.md)

---

## 자동 체인 규칙 (명시)

1. Cursor가 **항목 N**을 끝내면, parent는 Paul 대기 없이 **항목 N+1**을 바로 시작한다.
2. **예외(차단 — 자동 시작 금지):** Paul OK가 필요한 게이트 · 결제(Lemon) · Paul이 명시적으로 멈춤을 요청한 경우.
3. **병렬 OK**인 항목은 체인과 독립으로 돌릴 수 있다. P0를 막지 않는다.
4. Lemon / commit·push는 **Paul이 말하기 전까지** 큐에 넣지 않는다(아래 Stop 라인).
5. **분담 (2026-07-26 Paul):** Cursor = 구현(큐 항목 범위 안 리서치 자동 OK) · Claude = Next 채움 / 확인 / 기획. 큐 비면 Cursor는 self-QA만([§3-2](claude-cursor-loop-ko.md#3-2-리서치큐-소유권-paul-확정--2026-07-26)).

---

## Now (비행 중 — 중복 착수 금지)

| # | 작업 | Agent / ID | 메모 |
|---|------|------------|------|
| **R2** | **TOPIK II 유닛 카드 디버그 노출 제거** | 다음 자동 | `content-interface-review-2026-07-27-ko.md` §0 — R1이 Basics만 고쳤는데 `hub/app/topik2/` 14개 유닛 전부(Listening/Reading/Writing)에 같은 SECTION/BANK/ITEMS 디버그 블록이 그대로 남아있음(R1 재검증 중 발견). `NOTE`·"Practice these items →" 버튼은 정상이니 그대로 유지, 저 3블록만 제거. 차단 없음. |

---

## Sibling handoff (다음 Cursor 레인 — Claude Next 아님)

> Paul offline 자동 모드용. Claude가 Next를 채우기 전까지 sibling이 집을 수 있는 **구현 슬라이스** 제안.

| 우선 | 작업 | 범위 | 메모 |
|------|------|------|------|
| ~~**1**~~ | ~~**Hangul stroke tube 미학 polish**~~ | ~~`hub/app/hangul/` + stroke CSS/HW wrapper~~ | **Done 2026-07-27** — `BUFFER_RES=18` + simplify · cache `20260727c` · stage 가이드·clear 톤 · smoke OK |
| ~~**1**~~ | ~~**Basics grammar deepen**~~ | ~~`draft-basic-unit0*.json` grammarCards~~ | **Done 2026-07-27** — 01 `eunneun-iga` · 02 `e-eseo` · 05 복습 · trap+글모음 링크 · UI kind/trap/related |
| ~~**1**~~ | ~~**Theme→game 잔여**~~ | ~~cloze / particle (+ bingo cosmetics)~~ | **데이터 Done** · **UI Done** — speed+cloze+particle+**dictation+listen-match+telephone+word-scramble** theme 필터 · bingo는 top-level `themes` 메타 없음 → UX 스킵 · Particle Snap CTA는 ask-paul #9 |
| ~~**1**~~ | ~~**dictation money-banking**~~ | ~~`dictation-beginner.json`~~ | **Done 2026-07-27** — +10 banking/intermediate (d-31–40) · 합계 40 · 초급 30 유지 · manifest v11 |
| ~~**1**~~ | ~~**telephone + scramble money-banking**~~ | ~~`telephone-beginner.json` · `word-scramble-beginner.json`~~ | **Done 2026-07-27** — 각 +10 banking (tel/ws-36–45) · 합계 45 · 초급 35 유지 · manifest v13 · hangul.js 무변경 |
| ~~**1**~~ | ~~**cosmetics→dictation gap**~~ | ~~`dictation-beginner.json`~~ | **Done 2026-07-27** — +8 cosmetics (d-41–48) · 합계 48 · shopping/snack/transit/banking 유지 · manifest v16 |
| — | *(Claude Next 대기)* | — | invent Next 금지 · Theme UX 잔여 게임 Done |

---

## Done (이번 체인 슬라이스)

| # | 작업 | 메모 |
|---|------|------|
| **ThemeUX4** | **Bingo Board theme 필터** | bingo `themes` 메타(기존 item tags) · speed-quiz 칩 복제 · localStorage · 5×5 부족 시 3×3 자동 · 새 lemma 없음 · CTA 미배선 · invent Next 없음 |
| **ThemeUX3** | **Dictation + Listen Match + Telephone + Word Scramble theme 필터** | speed-quiz 패턴 복제 · 기존 themes/tags만 · localStorage · ask-paul #9 CTA 미배선 · bingo 스킵(themes 메타 없음) → ThemeUX4에서 보완 · invent Next 없음 |
| **ThemeUX2** | **Cloze + Particle theme 필터** | speed-quiz 패턴 복제 · 뱅크 themes/tags만 · localStorage · ask-paul #9 CTA 미배선 · invent Next 없음 |
| **ThemeUX1** | **Speed Quiz theme 필터** | 뱅크 themes/tags 칩 · 문항 태그 · ask-paul #9 CTA 미배선 · invent Next 없음 |
| **Tube1** | **Hangul stroke tube 미학** | `gen-jamo-strokes-gulim.py` 조인트 스무딩 · HW outline/drawing 톤 · practice stage 가이드+clear · medians/획순 유지 · `20260727c` · smoke OK |
| **Grammar1** | **Basics grammar deepen** | 01 은/는↔이/가 · 02 에↔에서 · 05 위치 복습 · `trap`/`related` UI · 글모음 역링크 · invent Next 없음 |
| **R1** | **콘텐츠·인터페이스 리뷰 수정** | [`content-interface-review-2026-07-27-ko.md`](content-interface-review-2026-07-27-ko.md) · Basics 디버그 블록 제거 · filled=뱅크 기준 · Hangul kind/slug 제거 · step pill 중복 제거 · check choices `{en,ko,zh}` 64개 · `e-mak`→`eu-mak` · smoke hangul OK |
| **D1** | **디자인 리프레시 v2** | `design-handoff-mockup-v2-ko.md` 1–6 · 남색 캐릭터 배지·STAGE 알약·색종이 · A/B/C/D 뱃지 · 3D press · 모드 원형 배지+추천 리본 · XP 유리질감(gold) · 탭 아이콘 · result-clear 미니 배지 · `hub.css`/`brand.json` navy 토큰 |
| **QA1** | **Cursor self-QA pass** | Claude Next 비어 있음 → smoke 전면 · 글모음 `#deck=honorifics` stub CTA → Speed Quiz · geulmoeum smoke 가드 · **Claude Next 대기** |
| **#7** | **선생님 선택 research-fill** | `research-teacher-select-content-fill-ko.md` · teach 리포트·좌석 · Hub/Me CTA · smoke OK |
| **#6** | **글모음 research-fill** | `research-geulmoeum-content-fill-ko.md` · 6편 EN∥KO · Hub 도어 카피 · smoke OK |
| **#5** | **Games research-fill polish** | `research-jabi-games-ko.md` · manifest v2 · Hub/Games 카피 · Dictation 16→20 · smoke OK |
| **Hangul HW audit** | **Hanzi Writer×한글 전체 감사** | [`audit-hanzi-writer-hangul-ko.md`](audit-hanzi-writer-hangul-ko.md) · wrapper Hangul-safe · Y-up 문서화 · cache `20260727b` · **이전 부분 stroke verify 대체** |
| **Hangul v5** | **획순 학습 후 path 재수정** | `hangul-stroke-shapes-learned-ko.md` · preview 묶음 · stub denylist · pilot 크롬 제거 · smoke v5 |
| **#4** | **TOPIK II research-fill** | `research-topik2-content-fill-ko.md` · listen/read-03 · write +1 · 도어·형성채점 유지 · smoke OK |
| **#3** | **TOPIK I research-fill** | `research-topik1-content-fill-ko.md` · listen-02 + read-04 · 도어·최종모의 카피 · smoke OK |
| **#2** | **기초 수업 research-fill** | `research-basic-content-fill-ko.md` · manifest v3 `pilot` 01–06 · 도어「초안」카피 수정 · XP/crowns/MCQ 유지 · smoke OK |
| **#1** | **한글 읽기·쓰기 research-fill** | `research-hangul-content-fill-ko.md` · manifest v3 `pilot` 00–17 · 도어「초안」카피 수정 · stroke/XP/crowns 유지 · smoke OK |
| **G8** | **Telephone (전화게임)** | `hub/app/games/telephone/` · 원작 20문장 · recall/distort · soft 유사도 · Paul 선호 E5 · **체인 pause** |
| **G7** | **Listen Match (듣기 짝맞추기)** | `hub/app/games/listen-match/` · 원작 20구 · TTS → 4지 탭 · soft miss · Paul 선호 E4 · Shop≠Games |
| **G6** | **Bingo Board (어휘 빙고)** | `hub/app/games/bingo-board/` · 원작 48어휘 · 5×5/3×3 · gloss/TTS 콜 · 줄 빙고 · Paul 선호 E3 · Shop≠Games |
| **G5** | **Word Scramble (어순 맞추기)** | `hub/app/games/word-scramble/` · 원작 20문항 · 토큰 탭 조립 · soft pace(비처벌) · Paul 선호 E2 · Shop≠Games |
| **G4** | **Speed Quiz (스피드 퀴즈)** | `hub/app/games/speed-quiz/` · 원작 20 MCQ · soft pace(비처벌) · A–D 탭 · Paul 선호 E1 · Shop≠Games |
| **G3** | **Particle Snap (조사 스냅)** | `hub/app/games/particle-snap/` · 원작 24문항 · 은/는·이/가·을/를 2칩 탭 · soft snap(비처벌) · manifest pilot |
| **G2** | **Cloze Race (빈칸 레이스)** | `hub/app/games/cloze-race/` · 원작 20문항 · 칩/입력 · soft pace(비처벌) · manifest pilot · Shop≠Games |
| **G1** | **Games + Dictation MVP** | Hub Games 도어 · `hub/app/games/` · Speechling식 받아쓰기 TTS · 원작 16문장 · Shop≠Games · `research-jabi-games-ko.md` |
| **C7** | **TOPIK II listen/read bank 02** | `draft-listen-02` · `draft-read-02` 각 4Q · manifest · smoke 확장 · 오디오/Lemon 없음 |
| **C6** | **Crowns polish** | hangul/basic 노드 크라운 1–3 · 재도전 +3 XP/티어(최대 3) · smoke 갱신 |
| **N11** | **Notion Done/Next sync** | PM·Done/Next·Phase·Map·Inbox 미러 · 커밋 없음 |
| **C5** | **Duolingo path progress persistence** | `jabi.hangul.v1` / `jabi.basic.v1` · XP+스킬 완료 · smoke |
| **C4** | **TOPIK II listen + read 파일럿** | `draft-listen-01` · `draft-read-01` · manifest pilot |
| **S1** | **쓰기 Phase 1.1 부분점수·다시쓰기** | 0–100 + trait · Q51–54 · Lemon/신경망 없음 |
| **C3** | **TOPIK II content beyond Q51** | write 52–54 원작 + stub 플레이어 |
| **C2** | **Basic track content fill** | 01–02 + planned 03–06 · track `pilot` |
| **C1** | **Hangul content #1** | 레슨 00–17 · track `pilot` · 획순 유지 |
| N1–N10 | UI/UX · Notion · OOV · 획순 · 힌트 등 | 이전 Done 유지 |

---

## Next (Cursor 자동 체인)

| 순번 | 항목 | 범위 | 차단? |
|------|------|------|-------|
| — | **쓰기 Phase 2 캘리브** | 샘플 채점셋으로 가중·임계 조정 · 게이밍 테스트 | **Paul 샘플/OK** |
| **N7b** | **12자음 Canva→SVG (글자별)** | Paul PNG → 추적·`_check` | **Paul Canva 게이트** |
| — | **Stop** | Lemon 전 정지 · commit/push는 Paul 요청 전 정지 · Vercel 프로젝트 생성은 Paul | **차단** |

---

## Parallel / 다른 소유자 (Cursor 자동 체인 아님)

| 소유 | 할 일 |
|------|--------|
| **Paul** | Canva: [`CANVA-BATCH-12-ko.md`](../hub/app/assets/chars/CANVA-BATCH-12-ko.md) 우선 **ㄴ nieun** 1–6 → `source/` · Vercel New Project Root=`hub` → URL · (선택) 커밋/푸시 · Hangul 획순 **Hard refresh 후 ㄹㅂㅇㅋ Replay/Trace** ([감사 SoT](audit-hanzi-writer-hangul-ko.md)) · **R1 spot-check:** Basics 유닛 펼침(디버그 없음) · Hangul KO 모드 퀴즈 선택지 |
| **Claude (리뷰/기획만)** | 감사 문서 대조 · **ㅈ 정식 데이터** 기획 · Task A (URL 후, docs만) · **Next 큐 채움** (Theme UX cloze/particle 칩 Done · invent 금지) |

---

## 상태 메모

- **R1 콘텐츠·인터페이스 리뷰** = **완료** (2026-07-27) — Basics 디버그 제거 · Hangul kind/slug·step pill · choices i18n · eu-mak · filled 카운터.
- **Tube1 stroke tube 미학** = **완료** (2026-07-27) — buffer res↑ + simplify · practice 가이드/clear · cache `20260727c` · 획순 median 유지.
- **D1 디자인 리프레시 v2** = **완료** (2026-07-26) — `hub/app/css/app.css` + `index.html`/`app.js` · navy 토큰 `hub.css`/`brand.json` · `hub/app/data/**` 미터치.
- **Cursor self-QA pass (QA1)** = **완료** (2026-07-26) — 게이트 당시 Next=Paul 게이트만 → smoke OK · 글모음 stub CTA 1건 수정.
- **Now = 비어 있음** — Theme UX (speed+cloze+particle+dictation+listen-match+telephone+scramble 필터) Done · bingo themes 메타 없어 UX 스킵 · Claude Next / Paul 게이트 유지.
- **#7 선생님 선택** = **완료** — [`research-teacher-select-content-fill-ko.md`](research-teacher-select-content-fill-ko.md) · `hub/teach/` · smoke `_smoke_teacher_select.js`. 가짜 강사 프로필 없음 · Phase 3 대시보드/결제 미배선.
- **Hub research-fill 체인 #1–#7 = 완료.** Lemon/commit Stop · Phase2 캘리브·N7b는 Paul 게이트.
- **#5b Lemon** = 보류 · Hangul **v5** 유지 · Games/글모음 polish Done.
- 앱 코드·커밋은 각 체인 태스크가 자기 범위에서만 수행. 이 문서는 **큐·규칙만** 담는다.
