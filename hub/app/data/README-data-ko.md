## TOPIK I 연습 (2026-07-26 · research-fill #3)

- **뱅크:** `verified-read-01..04.json` (읽기 36Q) · `verified-listen-01..02.json` (듣기 10Q) · 전부 `jabi-original` · hint.steps/why/distractWhy.
- **유형:** blank · topic · notice · purpose · content · order · listening(응답·장소·주제·행동·일치).
- **엔진:** `hub/app/js/app.js` — MOCK/LISTEN 로드 · SRS 퀘스트(오답 태그) · 최종 UI = 읽기 세트 3 대용(풀 70Q 아님).
- **제외:** `click-topik-*.json` (CLIcK · I–II 혼합) — 메인 Practice 미연결.
- **허브 문:** TOPIK I = 읽기·듣기·퀘스트. 리서치: `docs/research-topik1-content-fill-ko.md`.
- **힌트 UX:** `docs/research-hint-ux-ko.md` — 조기 Match:/답: 금지 유지.

## 한글 트랙 스캐폴딩 (2026-07-26)

- **매니페스트:** `hangul/track-manifest.json` v1 · track `pilot` — 레슨 00–17 전부 최소 본문(objective / explain / examples / task). hangul-02/04/05에 `type:trace`. 상단 획순 로스터는 매니페스트와 별도로 13+경음 전부 노출.
- **UI:** `hub/app/hangul/` — 레슨 열면 모듈 렌더 + **획순 연습**(상단·레슨 내). 오디오·퀴즈 엔진 연동은 아직.
- **허브 문:** `hub/index.html` → Hangul door. 앱 Practice에 링크 stub.
- **저작권:** 세종학당은 단원 순서·그룹 방법론만 참고. 본문은 jabi. 원작 최소 콘텐츠.

## 기초 수업 트랙 (2026-07-26 · content fill C2)

- **매니페스트:** `basic/track-manifest.json` v1 · track `pilot` — 파일럿 1–2과 + 03–06 planned(카페·쇼핑·길찾기·음식) 실제목·목표.
- **파일럿 뱅크:** `draft-basic-unit01-greetings.json` · `draft-basic-unit02-daily-life.json` (각 6문항 + objective/explain/phrases, 원작 대화형).
- **UI:** `hub/app/basic/` — 단원 노트 + MCQ 대화 연습 플레이어. TOPIK `app.js` 미연결.
- **허브 문:** Basics door. 앱 Practice 링크 stub.

## TOPIK II 트랙 (2026-07-26 · research-fill #4)

- **매니페스트:** `topik2/track-manifest.json` v2 — 00 overview · listen/read **01–03 pilot** · write 51–54 pilot · full mock planned.
- **뱅크:** `draft-listen-01..03` · `draft-read-01..03` · `draft-write-51..54` (원작 · 형성 채점 필드 유지).
- **리서치:** `docs/research-topik2-content-fill-ko.md` · 축 매핑 · 영어 AES 문서.
- **UI:** `hub/app/topik2/` — MCQ(듣기·읽기) + 쓰기 형성 점수 플레이어. 듣기 오디오 미연결(대본 공개). AI/Lemon 없음.
- **허브 문:** TOPIK II = 듣기·읽기·쓰기 연습 · 형성 점수(공식 아님).
- **스모크:** `node scripts/_smoke_topik2_listen_read.js` · `node scripts/_smoke_topik2_scoring.js`.
- **Lemon:** 결제 stub 없음 — #5b 보류.

---

## 해설·힌트 규칙 (2026-07-26 · 로직 고정)

근거: **국립국어원**(이에요/예요 = 받침 있는 체언 → 이에요, 없으면 예요) + 초급 앱/블로그(Sol’s, MyKoreanLesson, KoreanClass101) = **뜻 → 끝소리 보기 → 형태 → 짝 예**.

### 어휘 수준 (TOPIK I · 초급)

- 안내문·지문은 **초급 기본 명사**만 (예: 병원, 약국, 식당, 화장실, 층, 학교, 도서관, 버스, 공항).
- **피하기:** 진료과·행정 전문어(내과, 접수 등), 안내문 한자어 난이도(휴관일·운영 시간 → **쉬는 날·여는 시간**).
- 화면 본문은 한국어(`prompt.ko`). EN/ZH는 **번역 버튼용** L1. 힌트·why도 모국어.

### 버튼 순서

1. **시각** — 명확한 명사·동사 이모지 + **한국어 라벨 항상** (`생일 · birthday`)  
2. **모국어 마이크로 스킬** — `hint.steps[]` (없으면 `hint[lang]` 한 줄)  
3. **소거 + why-not** — `distractWhy` (같은 스킬 수준)  
4. **why** — 정답 문장 + 스킬 한 줄 재확인  

그림이 없으면(추상 문법) 1단계를 건너뛰고 모국어부터.

### 모국어 힌트 템플릿 (문법 빈칸)

| 순서 | 역할 | 예 (이에요/예요) |
|------|------|------------------|
| 1 Meaning | 무엇과 같은지 | 이에요/예요 ≈ “is” after a noun (생일 = noun) |
| 2 Look | 어디를 볼지 | 생일 끝 → 받침 있음 → 이에요 |
| 3 Pair | 쉬운 짝 | 생일이에요·학생이에요 · 학교예요·친구예요 |

### 기호·대비 표기

| 관계 | 표기 | 예 |
|------|------|-----|
| **반댓말** | `A + 상황 · B + 상황` (`≠`/`↔` 쓰지 않음) | `추워요 + 코트 · 더워요 + 티셔츠` |
| **시제·자리·높임 대비** | 라벨 + `·` | `갔어요 + 지난주 · 가요 + 지금` · `커요 (문장 끝) · 큰 가방 (명사 앞)` |
| **좋은 예 둘** | `·` (또는 짧은 짝) | `생일이에요 · 학교예요` · `닫아 주세요 · 도와 주세요` |
| **오답 의미** | Pair에 넣지 않음 → 소거/`distractWhy` | `왜 맛있어요? 비 → 우산이 필요해요` |

### 문제 본문 (prompt)

- 화면에는 항상 **`prompt.ko`** (시험 한국어). EN/ZH UI여도 지시문·지문은 한국어.
- **번역 버튼** (`btn-prompt-translate`): 지시문(※ … 고르십시오) **같은 줄** 아이콘 토글. 켜면 그 줄 **바로 아래**에 L1만. 지문(유나는…)은 번역에 반복하지 않음. 안내문 질문 줄은 질문 아래 L1.
- 번역 언어 = **UI 언어**(EN→`prompt.en`, 中文→`prompt.zh`). 다른 L1로 폴백하지 않음.
- 밑줄 지시어: `"underline": ["그곳"]` → 본문에서 해당 어절에 `<u>` 표시.
- `prompt.en`/`zh` 채우기: `scripts/fill-prompt-translations.py`

**금지:** `N이에요/예요 = it is N. After consonant…`처럼 기호식만 던지기, 고난도 문법으로 유도, 메타 아이콘(📌 주제), 반댓말에 `≠`/`↔`.

**받침 용어:** EN에서는 `받침 (final consonant letter)`처럼 **한국어 용어 + 쉬운 뜻**. “consonant”만 던지지 않기.

### 시각

- 명사·명확 동사만. 캡션 **한국어 필수**.  
- 크기 비교 = CSS 박스 (`size-compare`).  
- 나중: `visual.img` 사진 같은 슬롯.

### 스키마

```json
"hint": {
  "steps": {
    "en": ["Meaning…", "Look…", "Pair…"],
    "zh": ["…"],
    "ko": ["…"]
  },
  "en": "flat fallback",
  "visual": { "emoji": ["🎂"], "ko": "생일", "en": "birthday", "zh": "生日" }
},
"distractWhy": { "1": { "en": "Why not 예요? …받침…", "zh": "…", "ko": "…" } },
"why": { "en": "… + skill restatement", "zh": "…", "ko": "…" }
```

### 검수
`hub/ops/qa/` · steps / visual / distractWhy · `why_too_hard`
