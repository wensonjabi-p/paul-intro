# Cursor 작업 큐 (자동 체인)

> **갱신:** 2026-07-27 · **D1 디자인 리프레시 v2 Done** · **Now = R1 콘텐츠·인터페이스 리뷰 수정** · Hub 도어 #1–#7 research-fill Done · Hangul path **v5** 유지 · Vercel hub URL 배포 완료  
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
| **R1** | **콘텐츠·인터페이스 리뷰 수정** | 다음 자동 | `content-interface-review-2026-07-27-ko.md` — Basics 유닛 카드 디버그 블록 제거(1순위) → Hangul 퀴즈 choices 다국어화 → Hangul "종류" 필드 제거 → Basics 카운터 버그 → "음악" 오타 → 스텝배지 중복. 차단 없음. |

---

## Done (이번 체인 슬라이스)

| # | 작업 | 메모 |
|---|------|------|
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
| **Paul** | Canva: [`CANVA-BATCH-12-ko.md`](../hub/app/assets/chars/CANVA-BATCH-12-ko.md) 우선 **ㄴ nieun** 1–6 → `source/` · Vercel New Project Root=`hub` → URL · (선택) 커밋/푸시 · Hangul 획순 **Hard refresh 후 ㄹㅂㅇㅋ Replay/Trace** ([감사 SoT](audit-hanzi-writer-hangul-ko.md)) |
| **Claude (리뷰/기획만)** | 감사 문서 대조 · **ㅈ 정식 데이터** 기획 · Task A (URL 후, docs만) · **Next 큐 채움** |

---

## 상태 메모

- **D1 디자인 리프레시 v2** = **완료** (2026-07-26) — `hub/app/css/app.css` + `index.html`/`app.js` · navy 토큰 `hub.css`/`brand.json` · `hub/app/data/**` 미터치.
- **Cursor self-QA pass (QA1)** = **완료** (2026-07-26) — 게이트 당시 Next=Paul 게이트만 → smoke OK · 글모음 stub CTA 1건 수정.
- **Now = 비어 있음** — Claude Next 대기 · Paul 게이트만 남음.
- **#7 선생님 선택** = **완료** — [`research-teacher-select-content-fill-ko.md`](research-teacher-select-content-fill-ko.md) · `hub/teach/` · smoke `_smoke_teacher_select.js`. 가짜 강사 프로필 없음 · Phase 3 대시보드/결제 미배선.
- **Hub research-fill 체인 #1–#7 = 완료.** Lemon/commit Stop · Phase2 캘리브·N7b는 Paul 게이트.
- **#5b Lemon** = 보류 · Hangul **v5** 유지 · Games/글모음 polish Done.
- 앱 코드·커밋은 각 체인 태스크가 자기 범위에서만 수행. 이 문서는 **큐·규칙만** 담는다.
