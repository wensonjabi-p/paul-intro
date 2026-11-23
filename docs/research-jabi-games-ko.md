# jabi. 학습 게임 리서치 · 추천 목록

> **날짜:** 2026-07-26  
> **목적:** Hub **Games** 카테고리(디지털 플레이어블 학습 게임) 로드맵. Shop ≠ Games — Shop은 보드게임·캐릭터 굿즈 등 상거래(후속).  
> **벤치마크:** [Speechling Korean Dictation](https://speechling.com/ko/dictation/korean) UX 조사 + 영어/타언어 학습 게임 갭 조사.  
> **저작권:** Speechling·Duolingo 등 **콘텐츠 스크래핑 금지**. 원작 뱅크 + 포맷 영감만.

---

## 1. Speechling 받아쓰기 UX (벤치마크)

| 요소 | 관찰 | jabi MVP 반영 |
|------|------|----------------|
| 흐름 | 듣기 → 타이핑 → 정답 확인 | ✅ |
| 재생 | 다시 듣기 (Ctrl+Enter), 남/여 목소리 | TTS 재생 · 느린 속도 · 기기 보이스 제한 문서화 |
| 채점 | 내 답 vs 정답 대비 | 정규화 + 글자 단위 diff |
| 진행 | 정답 시 자동 넘김 · 스킵 · 포기 · 나중에 복습 | 자동 넘김 옵션 · 스킵 · 포기(정답 공개) · 복습 큐는 v2 |
| 모듈 | 초급~고급 · 주제 모듈 | MVP = beginner 원작 소뱅크 · 모듈 UI는 스캐폴드 |
| 오디오 | 녹음 파일 | MVP = Web Speech API `speechSynthesis` ko-KR (품질·브라우저 편차 있음) |

**한계 (명시):** TTS ≠ 원어민 녹음. 조사·억양·숫자 읽기는 기기별 상이. 나중에 녹음/SSML 교체 가능한 `audio` 필드 예약.

---

## 2. 시장 스냅샷 (영감 · 갭)

| 제품/유형 | 강점 | 한국어 갭 |
|-----------|------|-----------|
| **Speechling** dictation | 문장 받아쓰기·코칭 | 무료 한국어 있음 — jabi는 **jabi 뱅크·Sunstage UX·트랙 연동**으로 차별 |
| **Duolingo** Stories / listening | 스토리·탭 투 타입 | 한국어 스토리·받아쓰기 밀도는 영어 대비 얕음 |
| **ELSA Speak** | 발음 AI·게이미피케이션 | **한국어 타깃 약함** (주로 L2 English) |
| **Busuu** | 대화·커뮤니티 교정 | 한국어 게임형 드릴 얇음 |
| **HelloChinese** dictation/tone | 한어 받아쓰기·성조 게임 | 한국어 동급 앱 드묾 → **jabi 기회** |
| **Drops** | 비주얼 어휘 5분 | 받아쓰기·문장 생산 약함 |
| **Eggbun / LingoDeer** | 한국어 구조 | 아케이드형 “한 판” 게임보다 레슨 중심 |
| **교실 고전** (빙고·전화게임·스크램블) | 참여·반복 | 디지털 한국어 전용 패키지 부족 |

---

## 3. 추천 게임 목록 (우선순위)

| # | 이름 (가칭) | 포맷 | 영감 | 한국어 갭? | jabi 우선 |
|---|-------------|------|------|------------|-----------|
| 1 | **Dictation** 받아쓰기 | 듣기 → 타이핑 → diff | Speechling | 중 — 존재하나 트랙·원작 연동 여지 | **P0 ✅** |
| 2 | **Cloze Race** 빈칸 레이스 | 문장 빈칸 · 시간/하트 | Speechling fill-blank · Duolingo | 중 — 한국어 조사/어미 빈칸에 특히 적합 | **P1 ✅** |
| 3 | **Particle Snap** 조사 스냅 | 은/는·이/가·을/를 빠른 선택 | 교실 조사 드릴 · HelloChinese tone snap 류 | **고** — 한국어 특화, 영어 앱에 없음 | **P1 ✅** |
| 4 | **Listen Match** 듣기 짝맞추기 | 오디오 ↔ 문장/그림 매칭 | Duolingo listening · 교실 memory | 중 | **P1 ✅ (Paul E4)** |
| 5 | **Shadow Echo** 따라말하기 | 듣기 → 녹음 → 파형/길이 힌트 (채점 약함 OK) | Speechling speak · ELSA | **고** — 한국어 발음 피드백 앱 희소 | P2 (마이크 권한) |
| 6 | **Syllable Build** 음절 조립 | 초·중·종성 블록으로 글자 만들기 | Hangul 트랙 · 교실 자모 카드 | **고** — 한글 전용 | P1–P2 (Hangul 연동) |
| 7 | **Word Scramble** 어순 맞추기 | 토큰 탭으로 문장 완성 | Duolingo · Busuu | 중 — 어순·높임 변형 풍부 | **P2 ✅ (Paul E2)** |
| 8 | **Speed Quiz** 스피드 MCQ | 15–30초 한 판 · XP | Kahoot / Quizlet Live | 낮 — 있으나 jabi 뱅크 재활용 가치 | **P2 ✅ (Paul E1)** |
| 9 | **Story Tap** 스토리 탭 | 짧은 스토리 · 탭해 빈칸/선택 | Duolingo Stories | **중–고** — 한국어 Stories 품질·양 부족 | P2–P3 |
| 10 | **Number/Time Call** 숫자·시간 받아쓰기 | 가격·시각·전화 숫자 TTS | Speechling 숫자 모듈 · 교실 | 중 — 실용·초급 수요 | P2 |
| 11 | **Honorific Switch** 높임 변환 | 반말↔존댓말 한 줄 변환 | 교실 role-play | **고** — 타언어에 거의 없는 축 | P3 |
| 12 | **Bingo Board** 어휘 빙고 | 듣기/힌트로 칸 지우기 | 교실 빙고 | 낮–중 — 구현 쉬움·캐주얼 | **P3 ✅ (Paul E3)** |

### 우선순위 요약

1. **Dictation** — ✅ 완료
2. **Cloze Race** — ✅ 완료 (조사·어미 빈칸 · soft pace)
3. **Particle Snap** — ✅ 완료 (은/는·이/가·을/를 2칩 스냅)
4. **Speed Quiz** — ✅ 완료 (Paul 선호 E1 · soft timer MCQ)
5. **Word Scramble** — ✅ 완료 (Paul 선호 E2 · 교실 스크램블)
6. **Bingo Board** — ✅ 완료 (Paul 선호 E3 · 교실 빙고)
7. **Listen Match** — ✅ 완료 (Paul 선호 E4 · TTS ↔ 문장)
8. **Telephone** — ✅ 완료 (E5 스트레치 · Paul liked · **자동 체인 pause**)

---

## Paul 선호 · 구현 쉬운 순

> **Paul 선택 (2026-07-26):** 목록 **#1, 2, 4, 7, 8, 12** + 교실 고전 바이브(빙고·전화게임·스크램블).  
> **기준:** 마이크 후순위 · 기존 JSON/MCQ/TTS 패턴 재사용 · OSS/캔버스는 선택.  
> **이미 출시:** #1 Dictation · #2 Cloze Race · (#3 Particle Snap — 선호 목록 밖이지만 완료 → 스킵) · #8 Speed Quiz (E1) · #7 Word Scramble (E2) · #12 Bingo Board (E3) · #4 Listen Match (E4) · **Telephone (E5)**

### ID 매핑

| # | 이름 | 교실 고전 매핑 |
|---|------|----------------|
| 1 | **Dictation** 받아쓰기 | — |
| 2 | **Cloze Race** 빈칸 레이스 | — |
| 4 | **Listen Match** 듣기 짝맞추기 | (듣기 메모리류) |
| 7 | **Word Scramble** 어순 맞추기 | **스크램블** |
| 8 | **Speed Quiz** 스피드 MCQ | Kahoot식 교실 퀴즈 |
| 12 | **Bingo Board** 어휘 빙고 | **빙고** |
| — | **Telephone** (전화게임) | 목록 번호 없음 → 디지털 체인 리텔 후보(후순위) |

### 쉬운 → 어려운 백로그 (미출시만)

| 순 | 게임 | 이유 (구현 난이도) | 상태 |
|----|------|-------------------|------|
| **E1** | **Speed Quiz** (#8) | 순수 MCQ + soft timer · 마이크 없음 · cloze 칩 UX 재사용 | ✅ |
| **E2** | **Word Scramble** (#7) | 토큰 탭/정렬 · 문장 뱅크 재사용 · 탭으로 조립 | ✅ |
| **E3** | **Bingo Board** (#12) | 그리드 + 듣기/힌트 마크 · TTS 선택 | ✅ |
| **E4** | **Listen Match** (#4) | TTS ↔ 문장 매칭 UX · 4지 선택 | ✅ |
| **E5** | **Telephone** (목록 외) | 솔로 속삭임 · recall/distort · soft 유사도 | ✅ **Done · 체인 pause** |

---

## 4. Games 아키텍처 (플러그인)

```
hub/app/games/
  index.html          # 카드 목록 (manifest 로드)
  games.css
  games.js
  dictation/          # gameId = dictation
  cloze-race/         # gameId = cloze-race
  particle-snap/      # gameId = particle-snap
  speed-quiz/         # gameId = speed-quiz
  word-scramble/      # gameId = word-scramble
  bingo-board/        # gameId = bingo-board
  listen-match/       # gameId = listen-match
  telephone/          # gameId = telephone
hub/app/data/games/
  manifest.json       # id, title, href, status, priority
  dictation-beginner.json
  cloze-beginner.json
  particle-beginner.json
  speed-quiz-beginner.json
  word-scramble-beginner.json
  bingo-beginner.json
  listen-match-beginner.json
  telephone-beginner.json
```

- Hub 도어 **Games** → `/app/games/` (Shop과 분리).
- 새 게임 = `manifest` 한 줄 + `games/<id>/` 폴더.
- 공통 톤: Sunstage Play 토큰 (`brand.json` / `hub.css` `:root`).

---

## 5. Shop vs Games (Paul 확정 의도)

| | **Games** | **Shop** |
|--|-----------|----------|
| 무엇 | 플레이어블 디지털 학습 게임 | 보드게임 · 캐릭터 굿즈 · 템플릿 상거래 |
| 지금 | Dictation · Cloze · Particle Snap · Speed Quiz · Word Scramble · Bingo · Listen Match · **Telephone** | 플레이스홀더 (Lemon 등 후속) |
| 결제 | 없음 (학습 루프) | 후속 상거래 |

---

## 6. 다음 액션

- [x] Dictation MVP + Hub Games 도어
- [x] **Cloze Race** (빈칸 레이스) — 원작 20문항 · 칩/입력 · soft pace bar · `cloze-beginner.json`
- [x] **Particle Snap** (조사 스냅) — 원작 24문항 · 은/는·이/가·을/를 2칩 탭 · `particle-beginner.json`
- [x] **Speed Quiz** (Paul 선호 E1) — soft timer MCQ · `speed-quiz-beginner.json`
- [x] **Word Scramble** (Paul 선호 E2) — 토큰 탭 어순 · `word-scramble-beginner.json`
- [x] **Bingo Board** (Paul 선호 E3) — 5×5/3×3 · gloss/TTS 콜 · 줄 빙고 · `bingo-beginner.json`
- [x] **Listen Match** (Paul 선호 E4) — TTS ↔ 4지 문장 · `listen-match-beginner.json`
- [x] **Telephone** (E5 스트레치 · Paul liked) — 솔로 recall/distort · `telephone-beginner.json` · **자동 게임 체인 pause**
- [x] **#5 research-fill polish (2026-07-26)** — Hub/Games 카피 정합 · manifest v2 + research 링크 · Dictation 뱅크 16→20(생존·기초 원작) · Shop≠Games 명시
- [x] **뱅크 확장 (2026-07-26 · data lane)** — dictation/cloze/speed **20→30** · particle **24→32** · manifest v3 카운트 노트 · 원작만
- [ ] TTS → 녹음 오디오 교체 파이프라인
- [ ] Games XP를 hangul/basic path와 분리 키로 연동 (선택)
- [ ] Syllable Build (#6 Hangul 연동) — planned

*Sources: Speechling dictation KO page UX (2026-07-26 fetch); product category knowledge (Duolingo, ELSA, Busuu, HelloChinese, Drops, Eggbun, LingoDeer, classroom adaptations). No third-party sentence banks copied.*
