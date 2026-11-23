# 어휘·용법 공통 레이어 — 스키마 & 정리 순서 (2026-07-27)

> **목적 문서:** theme packs · Games · Basics · TOPIK이 **한 어휘/용법 레이어**를 나눠 쓰게 할 초안.  
> **대상:** 문장 생성 · 채점 · 학습자 진도.  
> **정본 정책은 유지:** `vocab-allowlist.json` = TOPIK I 뱅크/디스트랙터 게이트. 테마 팩은 allowlist **대체 아님**.  
> **짝:** [`hub/app/data/vocab/README-ko.md`](../hub/app/data/vocab/README-ko.md) · [`research-topik-bida-vocab-ko.md`](research-topik-bida-vocab-ko.md) · [`research-theme-games-crossfill-ko.md`](research-theme-games-crossfill-ko.md)

---

## 1. 목적

지금은 어휘가 **세 곳에 흩어져** 있다.

| 위치 | 역할 | 한계 |
|------|------|------|
| theme packs (`jabi-theme-packs-*.json`) | lemma + gloss + 예문 + pack id | sense/빈도/진도 키 없음 |
| Games banks (`*-beginner.json`) | 문항 + `tags` / 파일급 `themes` | pack item과 약한 문자열 연결 |
| Basics / TOPIK tracks | unit·문항 중심 | 어휘 lemma와 공식 링크 거의 없음 |

공통 레이어를 두면:

1. **생성** — 같은 sense·usage pattern으로 예문·게임 문항·대화 줄을 맞출 수 있다.  
2. **채점** — “틀린 조사” vs “틀린 어휘 sense” vs “격식 불일치”를 같은 축으로 표기한다.  
3. **진도** — skill path / crown / XP를 **senseId·theme**에 걸 수 있다 (지금은 track·skill 단위).

**한 줄:** 파일을 당장 합치지 말고, **같은 필드 이름·같은 theme 키**로 점진 부착한다.

---

## 2. 핵심 엔티티 (최소)

네 가지. ID는 **안정 문자열**(rename 금지 — `path-progress.js`의 frozen key 철학과 동일).

### 2-1. Lemma

표제어 표면형. 활용형은 lemma로 peel 후 연결(기존 OOV 정책과 동일).

| 필드 | 필수 | 예 | 비고 |
|------|------|-----|------|
| `lemmaId` | ○ | `lem:습관` | 한글 lemma 기준; 동음이면 sense로 분기 |
| `lemma` | ○ | `습관` | 현재 pack `lemma` |
| `pos` | ○ | `n` / `v` / `adj` / `adv` / `part` … | 현재 pack `pos` |
| `levelBand` | △ Phase 2 | `beg` · `int-low` · `int` · `adv` | pack `level` / `topikBand`에서 유도 |
| `freqBand` | △ Phase 2 | `A` · `B` · `C` · `unk` | NIKL 등급 우선; Guide Part1은 보조 |

### 2-2. Sense

같은 lemma의 **뜻 단위**. 생성·채점·진도의 **기본 키**.

| 필드 | 필수 | 예 | 비고 |
|------|------|-----|------|
| `senseId` | ○ | `sns:습관.1` | Phase 1부터 pack item에 부착 |
| `lemmaId` | ○ | `lem:습관` | |
| `gloss` | ○ | `{en,ko,zh}` | 현재 item `gloss` |
| `themes` | ○ | `["habit"]` | **게임 theme 키** 캐논 (아래 §3) |
| `example` | △ | `{ko,en,zh}` | 현재 item `example` — usage로 승격 가능 |
| `derived` / `synonyms` | — | 현재 intermediate 필드 유지 | 메타만 |

현재 pack item `id`(`beg-dr-01`, `int-hb-01`)는 **로컬 슬롯 id**로 남기고, `senseId`를 **추가**한다 (breaking 없음).

### 2-3. Theme

장면·칩 필터 단위. pack `id`와 game `themes[]` / item `tags`를 잇는 다리.

| 필드 | 필수 | 예 |
|------|------|-----|
| `themeKey` | ○ | `habit` |
| `packId` | △ | `habits-lifestyle` |
| `chip` | △ | `{ko:"습관", zh:"习惯", en:"Habits"}` |
| `levelBand` | △ | `int-low` |

### 2-4. Usage pattern

문장 틀 / 화행 / 문법 훅. **생성·채점**에 직접 씀.

| 필드 | 필수 | 예 |
|------|------|-----|
| `usageId` | ○ | `use:주세요.order` |
| `pattern` | ○ | `{slot} 주세요` |
| `register` | ○ | `해요` |
| `speechAct` | ○ | `request` |
| `senseIds` | △ | 끼워 넣을 sense 목록 |
| `grammarHooks` | △ | pack의 `grammarHooks` (`아/어도 되다` …) |

---

## 3. 필수 분류 축

짧은 정의 + **지금 쓰는 값과 맞춘** 예.

| 축 | 정의 | 예 (현재 데이터와 정렬) |
|----|------|-------------------------|
| **theme** | 장면·칩 필터 키. 게임 `themes` / item `tags`에 들어가는 **짧은 영문 키** | `habit`, `friends`, `personality`, `rules`, `shopping`, `transit`, `clinic`, `routine`, `speech`, `think` … |
| **levelBand** | 수업·뱅크 난이도 밴드 (KoreaXin 初级/中级과 1:1 아님) | `beg` ← beginner packs / Basics · `int-low` ← intermediate + `topikBand: II-low` · 이후 `int` / `adv` |
| **freqBand** | 말뭉치·학습용 빈도 밴드 | `A` ← NIKL A (allowlist 핵심) · `B`/`C` · `unk` (미태깅) · Guide Part1은 **빈도 보조만** |
| **pos** | 품사 | `n` `v` `adj` `adv` `part` — pack과 동일 |
| **register** | 말투·격식 | `해요`(기본 생존·게임) · `합쇼` · `반말` · `문어`(TOPIK II 읽기 인접) |
| **skill / speechAct** | 학습·화행 목적 | skill: `order`, `ask-permission`, `describe-habit` · speechAct: `request`, `refuse`, `agree`, `describe` |
| **collocation / usage** | 같이 쓰는 말·틀 | `습관이 있다` · `~아/어도 되다` · pack `grammarHooks` + usage pattern |

### Theme 키 캐논 (pack id ↔ game key) — **Phase 0 frozen**

교차 보강에서 이미 쓰는 **짧은 키**를 정본으로 둔다. pack `id`는 설명용·파일용.  
**정본 파일:** [`hub/app/data/vocab/theme-key-canon.json`](../hub/app/data/vocab/theme-key-canon.json) · 표 전체는 아래 **§10 Phase 0 result**.

| pack `id` (예) | themeKey (게임 tags/themes) | 칩 예 |
|----------------|------------------------------|-------|
| `habits-lifestyle` | `habit` | 습관 / 习惯 |
| `friends-social` | `friends` | 친구 / 朋友 |
| `personality-character` | `personality` | 성격 / 性格 |
| `rules-permission` | `rules` | 규칙 / 规则 |
| `drinks-order` | **`cafe`** (기본값 · Paul 오픈) | 카페 / 咖啡 |
| `daily-routine` | `routine` | 일상 / 日常 |
| `speech-talk` | `speech` | 대화 / 对话 |
| `thoughts-plans` | `think` | 생각 / 想法 |
| `opinion-judgment` | `opinion` | 의견 / 意见 |
| `change-progress` | `change` | 변화 / 变化 |

**이미 뱅크에 찍힌 키는 rename 금지** (진도·칩·smoke 깨짐). 신규 콘텐츠는 frozen `themeKey`만 사용.

---

## 4. 선택 축

지금은 비워 둬도 됨. 스키마만 예약.

| 축 | 언제 | 예 |
|----|------|-----|
| **errorType** | 채점·힌트 UX | **Phase 5 closed 8:** `particle` · `tense` · `honorific` · `ending` · `spelling` · `collocation` · `register` · `wrong-sense` — 정본 [`progress-contract-v1.json`](../hub/app/data/vocab/progress-contract-v1.json) |
| **prerequisites** | 스킬 패스 잠금 | sense/usage/grammarHook id 목록 (`은/는` 전에 주제 표지 …) |
| **courseMapping** | Basics / TOPIK 유닛 연결 | `basic-03` · `topik2-listen-04` · pack `basicsAlign: ["unit03-cafe"]` 승격 |

---

## 5. 현재 데이터 ↔ 새 필드 매핑 (점진 · breaking 최소화)

원칙: **기존 필드 삭제/rename 금지**. 새 필드는 optional로 붙인다.

| 현재 | 공통 레이어 | 하는 일 |
|------|-------------|---------|
| pack item `lemma` + `pos` + `gloss` | Lemma + Sense | `senseId` 추가; `lemmaId` 유도 |
| pack item `id` (`int-hb-01`) | (로컬) `packItemId` | 그대로 유지 · sense와 1:1 매핑 테이블 |
| pack `id` (`habits-lifestyle`) | Theme.`packId` | themeKey 매핑표로 연결 |
| pack `level` / `topikBand` | `levelBand` | beg / int-low … |
| pack `grammarHooks` | Usage.`grammarHooks` | Phase 3에서 usageId 부여 |
| pack `basicsAlign` | `courseMapping` | Phase 4 |
| pack `example` | Sense.example → Usage 후보 | 틀이 반복되면 usage로 승격 |
| game 파일 `themes: ["habit",…]` | Theme 목록 | Phase 0 캐논과 일치 검사 |
| game item `tags: […, "habit"]` | Sense.`themes` / Usage | themeKey 포함 여부 스모크 |
| `vocab-allowlist.json` | freqBand≈A 게이트 | **병합하지 않음** · sense에 `inAllowlist: true` 플래그만 가능 |
| basic `track-manifest` units | `courseMapping` | unit id ↔ themeKey / sense 묶음 |
| topik2 banks | `courseMapping` + register `문어` | 문항 메타에 senseIds 배열(후순위) |
| `path-progress.js` skill keys | Progress hooks | **Phase 5:** sense/theme = `jabi.vocab.v1` only · `jabi.hangul.v1` / `jabi.basic.v1` 동결 · 계약 [`progress-contract-v1.json`](../hub/app/data/vocab/progress-contract-v1.json) |

### 부착 예시 (개념)

```json
{
  "id": "int-hb-01",
  "lemma": "습관",
  "pos": "n",
  "senseId": "sns:습관.1",
  "themes": ["habit"],
  "levelBand": "int-low",
  "gloss": { "en": "habit", "ko": "습관", "zh": "习惯" },
  "example": { "ko": "아침에 운동하는 습관이 있어요." }
}
```

게임 문항은 당분간 `tags`만 유지해도 되고, 나중에 `"senseIds": ["sns:습관.1"]`를 **추가**한다.

---

## 6. 정리 순서 (Phases) — Paul이 따라갈 do-first

### Phase 0 — theme key 캐논 동결 ✅ (2026-07-27)
1. 게임 `themes[]` 유니온 + speed `THEME_ORDER` + pack id 인벤토리.  
2. pack `id` → `themeKey` 매핑 → `theme-key-canon.json`.  
3. 칩 라벨(KO/ZH/EN) 캐논 JSON에 동봉 (게임 i18n에서 수집).  
4. **금지 유지:** 이미 쓰인 key rename · 교차 채우기 중단 금지. → 상세 **§10**.

### Phase 1 — pack에 `senseId` 부착 ✅ (2026-07-27)
1. beginner → intermediate 순으로 item마다 `senseId` (+ 선택 `themes: [themeKey]`).  
2. 동음·다의만 수동 분기 (`눈` 눈알 vs 눈(snow) 등 — body pack 노트와 동일).  
3. 게임 뱅크는 아직 안 건드려도 됨.  
→ **완료:** beg **60** + int **676** = **736** items · `sns:lemma.N` · packOnly 3팩은 `senseId`만(themes 생략) · 동음 수동 분기 0건(lemma 중복 없음; weather `눈`=`sns:눈.1` snow).

### Phase 2 — lemma에 freq / level ✅ (2026-07-27)
1. allowlist ∩ pack lemma → `freqBand: A` + `inAllowlist: true`.  
2. pack 파일 `level`/`topikBand` → item `levelBand` (`beg` / `int-low`).  
3. NIKL B/C는 “있을 때만” — 추측 태깅 금지 (미포함 lemma는 freq 필드 생략).  
→ **완료:** 736 items 전부 `levelBand` · allowlist 교집합 **532**에 `freqBand:A`+`inAllowlist` · B/C 발명 0. 상세 **§10-6**.

### Phase 3 — usage patterns ✅ starter (2026-07-27)
1. 반복 예문·`grammarHooks`에서 `usageId` 초안 (주문·허락·습관 서술 등).  
2. register 기본값 `해요` (생존·게임).  
3. speechAct / skill 태그 소량부터.  
→ **완료(스타터):** [`usage-patterns.json`](../hub/app/data/vocab/usage-patterns.json) **28** patterns · cafe/favor/habit/rules 우선 · pack item `usageIds` **35**건만 명확 매칭 부착 · 상세 **§10-7**.

### Phase 4 — 코스 링크 (basic / TOPIK) ✅ starter (2026-07-27)
1. `basicsAlign` · track unit id → `courseMapping`.  
2. TOPIK I verified / TOPIK II draft 문항에 `senseIds` **optional** 배열.  
3. allowlist 정책 문서와 충돌 없게 (II·게임은 강제 스캔 범위 밖 유지 가능).  
→ **완료(스타터):** [`course-mapping.json`](../hub/app/data/vocab/course-mapping.json) **15** links (primary 13 · secondary 2) · pack **13** · sense bundle **134** · TOPIK은 pack `topikBand` 훅만(뱅크 미개입) · 상세 **§10-8**.

### Phase 5 — 진도·채점 훅 ✅ contract only (2026-07-27)
1. 채점 메타에 `errorType` 예약 필드.  
2. 진도: theme/sense 숙련도는 **새 storage key** `jabi.vocab.v1` — 기존 hangul/basic path key 동결 유지.  
3. 생성 파이프라인(나중에)이 `senseId + usageId + register`를 입력으로 받도록 계약만 고정.  
→ **완료(계약만):** [`progress-contract-v1.json`](../hub/app/data/vocab/progress-contract-v1.json) · `errorType` **8** · storage `jabi.vocab.v1` · 생성 입력 `senseId` 필수 + `usageId`/`register` 선택(기본 해요) · UI/게임/`path-progress.js` 구현 **없음** · 상세 **§10-9**.

### 구조 다음 (앱 배선 · 콘텐츠와 분리)

공통 레이어 **구조 Phases 0–5 완료**. 다음에 앱을 연결할 때(지금 하지 않음):

1. 채점/힌트가 `errorType` 8개를 쓰면 붙이기 (뱅크 mass rewrite 금지).  
2. theme·sense 숙련도 UI가 필요하면 `jabi.vocab.v1`만 읽고 쓰기 (`jabi.hangul.v1` / `jabi.basic.v1` 동결).  
3. 예문·문항 생성기가 생기면 `generationInput` 계약(`senseId` + optional `usageId` + `register`)만 따르기.

**병행 유지:** theme pack ↔ 게임 **교차 채우기**는 이 스키마와 독립 — crossfill 큐/Prefer/ThemeSm 그대로 계속.

---

## 7. 하지 말 것 (지금 루프에서 막지 말 것)

- 테마 팩 ↔ 게임 **교차 채우기 계속** (ThemeSm / Prefer / chip enable 루프 유지).  
- `vocab-allowlist.json`에 테마 팩 **통째 merge** 금지.  
- 상용 Bida/KoreaXin 리스트·예문 **verbatim** 금지.  
- 기존 game `themes` / `tags` **대량 rename** 금지.  
- `hangul.js` 변경 없음.  
- 공통 레이어 미완을 이유로 **콘텐츠 추가 중단 금지**.  
- 이 문서에 Claude queue Next 항목 **발명 금지** — 실행은 기존 crossfill/큐 규칙 따름.  
- 커밋/푸시는 Paul 지시 있을 때만.

---

## 8. Paul에게 나중에 물을 것 (블로커만 · 지금은 진행 가능)

| 항목 | 왜 | 기본값(진행용) |
|------|-----|----------------|
| `drinks-order` → `cafe` 확정? | 칩·필터 이름 | **`cafe`** (이미 bingo/listen/tel/scramble에 찍힘) |
| `transport` vs `transit` | 레거시 병존 | **`transit` 정본** · `transport` alias · 대량 rename 없음 |
| `public-life` / `work-study` / `news-taste` 전용 키? | 칩 없음 | **packOnly** · 새 키 발명 금지 |
| `clothes-shopping`에 `shopping` 이중 태그? | 필터 UX | **`clothes` only** |
| senseId 형식 (`sns:습관.1` vs 영문 slug) | 장기 안정 | 한글 lemma + 번호 허용 · 한번 정하면 고정 |
| 진도 단위를 sense vs theme 중 어디에 둘지 | Phase 5 UX | **둘 다 예약** (`jabi.vocab.v1` themes + senses) · 당분간 **theme 칩 + track skill** UI 병행 · 앱 배선은 나중 |

→ 상세는 필요 시 `docs/ask-paul-later-ko.md`에 한 줄 추가. **Phase 0 완료 · Phase 1은 위 기본값으로 착수 가능.**

---

## 9. 산출 위치

| 단계 | 파일 | 상태 |
|------|------|------|
| 스키마 | `docs/vocab-common-layer-schema-ko.md` | **이 문서** |
| Phase 0 | `hub/app/data/vocab/theme-key-canon.json` | **frozen v1 (2026-07-27)** |
| Phase 1 | pack JSON에 `senseId` (+ `themes`) 부착 | **✅ 2026-07-27** · beg 60 + int 676 · 나중에 `senses.json` 분리 가능 |
| Phase 2 | item `levelBand` + allowlist `freqBand:A`/`inAllowlist` | **✅ 2026-07-27** · levelBand 736 · freqA 532 · B/C 0 |
| Phase 3 | `hub/app/data/vocab/usage-patterns.json` + pack `usageIds` 소량 | **✅ starter 2026-07-27** · 28 patterns · 35 items 링크 |
| Phase 4 | `hub/app/data/vocab/course-mapping.json` | **✅ starter 2026-07-27** · 15 links · 13 packs · TOPIK band hooks only |
| Phase 5 | `hub/app/data/vocab/progress-contract-v1.json` | **✅ contract 2026-07-27** · errorType 8 · `jabi.vocab.v1` · gen input |

README(`hub/app/data/vocab/README-ko.md`)에 캐논 JSON 한 줄 링크 — 스키마 본문은 이 문서가 정본.

---

## 10. Phase 0 result — theme key **frozen** (2026-07-27)

> **동결 대상:** 신규 콘텐츠·교차 보강이 쓸 `themeKey`.  
> **기계 정본:** [`theme-key-canon.json`](../hub/app/data/vocab/theme-key-canon.json).  
> **인벤토리:** 게임 파일 `themes[]` 유니온 **71** · speed `THEME_ORDER` **58**(중 `intermediate` 메타) · beginner packs **7** · intermediate packs **57**.

### 10-1. 카운트

| 구분 | 수 | 비고 |
|------|----|------|
| **frozen themeKey** (신규 정본) | **60** | ORDER 콘텐츠 57 + `cafe`·`cosmetics`·`leisure` |
| aliases (레거시·rename 금지) | 5 | `transport`→`transit`, `directions`→`direction`, `friend`→`friends`, `money`→`banking`, `daily`→`routine` |
| packOnly (themeKey 없음) | 3 | `public-life`, `work-study`, `news-taste` |
| meta/coarse (팩 아님) | 8 | `intermediate`, `basic`, `food`, `object`, `place`, `people`, `lang`, `services` |
| pack → themeKey 매핑됨 | 61 / 64 | 위 3 packOnly 제외 |

### 10-2. pack id ↔ themeKey (전체)

| themeKey | chip KO / ZH | pack id(s) | notes |
|----------|--------------|------------|-------|
| `shopping` | 쇼핑 / 购物 | `shopping-basics` | |
| `snack` | 간식 / 零食 | `snacks-street` | |
| `transit` | 교통 / 交通 | `transit-ticket` | alias: `transport` |
| `cafe` | 카페 / 咖啡 | `drinks-order` | **Paul open** — 기본 `cafe` |
| `cosmetics` | 화장품 / 美妆 | `cosmetics-basic` | ORDER 밖 · 태그는 이미 존재 |
| `leisure` | 여가 / 休闲 | `leisure-simple` | ORDER 밖 · 태그 희소 |
| `clinic` | 병원 / 医院 | `clinic-basic`, `health-clinic` | beg+int 공유 · levelBand 구분 |
| `housing` | 주거 / 居住 | `housing-services` | |
| `banking` | 은행 / 银行 | `money-banking` | alias: `money` |
| `workplace` | 직장 / 职场 | `public-workplace` | ≠ `work-study` |
| `school` | 학교 / 学校 | `school-class` | |
| `travel` | 여행 / 旅游 | `travel-lodging` | |
| `weather` | 날씨 / 天气 | `weather-season` | |
| `digital` | 디지털 / 数码 | `digital-comms` | |
| `family` | 가족 / 家人 | `family-relations` | |
| `hobby` | 취미 / 爱好 | `hobby-culture` | |
| `emotion` | 감정 / 情绪 | `emotion-mood` | |
| `sports` | 스포츠 / 体育 | `sports-exercise` | |
| `nature` | 자연 / 自然 | `nature-environment` | |
| `restaurant` | 식당 / 餐饮 | `restaurant-cooking` | |
| `clothes` | 옷 / 服装 | `clothes-shopping` | **Paul open** 이중 shopping? 기본 clothes only |
| `music` | 음악 / 音乐 | `music-arts` | |
| `media` | 미디어 / 媒体 | `media-news` | ≠ `news-taste` |
| `celebration` | 축하 / 庆祝 | `celebration-holiday` | |
| `time` | 시간 / 时间 | `time-appointment` | |
| `chores` | 집안일 / 家务 | `home-chores` | |
| `body` | 신체 / 身体 | `body-parts` | |
| `direction` | 방향 / 方向 | `directions-location` | alias: `directions` |
| `furniture` | 가구 / 家具 | `furniture-room` | |
| `fruit` | 과일 / 水果 | `fruit-market` | |
| `kitchen` | 주방 / 厨房 | `kitchen-tableware` | |
| `stationery` | 문구 / 文具 | `office-stationery` | |
| `mail` | 우편 / 邮寄 | `post-mail` | |
| `pets` | 동물 / 动物 | `animals-pets` | |
| `driving` | 운전 / 驾驶 | `vehicles-driving` | |
| `places` | 장소 / 场所 | `city-places` | ≠ coarse `place` |
| `pantry` | 재료 / 食材 | `pantry-ingredients` | |
| `bathroom` | 욕실 / 浴室 | `bathroom-hygiene` | |
| `jobs` | 직업 / 职业 | `jobs-occupations` | |
| `country` | 국가 / 国家 | `countries-nationality` | |
| `routine` | 일상 / 日常 | `daily-routine` | alias: `daily` |
| `size` | 크기 / 大小 | `size-quantity` | |
| `senses` | 감각 / 感觉 | `temperature-senses` | |
| `color` | 색깔 / 颜色 | `colors-shapes` | |
| `accessories` | 소지품 / 随身 | `accessories-belongings` | |
| `electric` | 전기 / 电器 | `electricity-appliances` | |
| `building` | 건물 / 建筑 | `building-facilities` | |
| `motion` | 동작 / 动作 | `movement-actions` | |
| `favor` | 부탁 / 拜托 | `requests-favors` | |
| `think` | 생각 / 想法 | `thoughts-plans` | |
| `speech` | 대화 / 对话 | `speech-talk` | |
| `change` | 변화 / 变化 | `change-progress` | |
| `compare` | 비교 / 比较 | `comparison-degree` | |
| `reason` | 이유 / 原因 | `cause-reason` | |
| `problem` | 문제 / 问题 | `problem-solution` | |
| `opinion` | 의견 / 意见 | `opinion-judgment` | |
| `habit` | 습관 / 习惯 | `habits-lifestyle` | |
| `rules` | 규칙 / 规则 | `rules-permission` | |
| `friends` | 친구 / 朋友 | `friends-social` | alias: `friend` |
| `personality` | 성격 / 性格 | `personality-character` | |

### 10-3. packOnly · meta (동결하되 Sense 주테마 금지)

| id / key | 종류 | notes |
|----------|------|-------|
| `public-life` | packOnly | 전용 칩 없음 · 새 themeKey 발명 금지 (Paul open) |
| `work-study` | packOnly | `workplace`와 분리 · 전용 키 없음 |
| `news-taste` | packOnly | `media`와 분리 · 전용 키 없음 |
| `intermediate` | meta | 중급 코태그 대량 · 칩 중급/中级 있음 |
| `basic` `food` `object` `place` `people` `lang` `services` | coarse/legacy | 초기 bingo 분류 · 팩 아님 · rename 금지 |

### 10-4. 규칙 (신규 작업)

1. **frozen 60키**만 신규 pack/game 태그에 사용.  
2. alias·meta·coarse 키는 **기존 문항 유지** · 대량 rename 없음.  
3. packOnly 3팩은 themeKey 없이 남겨도 Phase 1(`senseId`) 진행 가능.  
4. 교차 채우기(ThemeSm / Prefer) **중단하지 않음**.

### 10-5. Phase 1 result ✅ (2026-07-27)

| 파일 | packs | items +senseId | +themes | 비고 |
|------|-------|----------------|---------|------|
| `jabi-theme-packs-beginner.json` | 7 | 60 | 60 | `drinks-order`→`cafe` 등 캐논 적용 |
| `jabi-theme-packs-intermediate.json` | 57 | 676 | 646 | packOnly 30 items: `public-life`/`work-study`/`news-taste` — themes 없음 |
| **합계** | 64 | **736** | 706 | unique lemma=736 · 기존 item `id` 유지 · 게임 뱅크 미변경 |

형식: `sns:{lemma}.{n}` (Paul 기본값 · 한글 lemma). 동음 분기: 이번 패스 lemma 중복 0 → 전부 `.1`. body pack이 eye `눈`을 생략했으므로 weather snow만 `sns:눈.1`; 추후 eye 추가 시 `.2` 수동 분기.

### 10-6. Phase 2 result ✅ (2026-07-27)

| 파일 | items | `levelBand` | `freqBand:A` + `inAllowlist` | 비고 |
|------|-------|-------------|------------------------------|------|
| `jabi-theme-packs-beginner.json` | 60 | 60 → `beg` | 52 | file `level:beginner` / `topikBand:I` |
| `jabi-theme-packs-intermediate.json` | 676 | 676 → `int-low` | 480 | file `level:intermediate` / `topikBand:II-low` |
| **합계** | **736** | **736** | **532** | allowlist 밖 204는 freq 필드 생략 · NIKL B/C 발명 없음 |

정본 allowlist: `hub/app/data/vocab/vocab-allowlist.json` (`lemmas` 1742). 기존 `id` / `senseId` / `themes` 유지 · 게임 뱅크·`hangul.js` 미변경. 스크립트: `hub/ops/qa/_phase2-vocab-level-freq.py`.

### 10-7. Phase 3 result ✅ starter (2026-07-27)

| 산출 | 수 | 비고 |
|------|----|------|
| `usage-patterns.json` | **28** | register 전부 `해요` · sense 연결 26 · grammarHook만(예문 없음) 2 |
| pack `usageIds` 부착 | **35** | beg 10 (`drinks-order`) + int 25 (favor 10 · habit 7 · rules 8) |
| 테마 범위 | 4 | `cafe` · `favor` · `habit` · `rules` — 736 전수 발명 없음 |
| 스크립트 | — | `hub/ops/qa/_phase3-usage-patterns.py` |

**성장 규칙 (카탈로그 늘릴 때):**

1. **반복·훅만** — 같은 틀이 예문에 2회+ 나오거나 pack `grammarHooks`에 이미 있으면 `usageId` 후보.  
2. **sense 강제 금지** — 예문이 틀과 안 맞으면 item에 `usageIds` 붙이지 않음 (카탈로그만 둬도 됨).  
3. **register 기본 `해요`** — 합쇼/반말/문어는 TOPIK II·Basics 고급 유닛에서만.  
4. **다음 배치 후보 테마** — `routine` · `speech` · `think` · `shopping`(얼마예요 교차) · `restaurant`(주문).  
5. **금지** — 736 lemma마다 패턴 1개씩 발명 · 게임 뱅크 mass rewrite · Claude Next 발명.

### 10-8. Phase 4 result ✅ starter (2026-07-27)

| 산출 | 수 | 비고 |
|------|----|------|
| `course-mapping.json` links | **15** | primary **13** · secondary **2** |
| unique packs | **13** | beg 6(+clinic 생략) · int 7 |
| unique senseIds (bundle) | **134** | pack 전 item sense — 문항별 태깅 아님 |
| `topikHooks` | **13** | pack file `topikBand`만 · verified/II 뱅크 미개입 |
| slugAlias | 6 | `unitNN-*` → `basic-NN` (`track-manifest`) |
| 스크립트 | — | `hub/ops/qa/_phase4-course-mapping.py` |

**포함 (증거 있음):**

| courseId | packs (strength) |
|----------|------------------|
| `basic-01` | `countries-nationality` |
| `basic-02` | `leisure-simple` · `daily-routine` |
| `basic-03` | `drinks-order` |
| `basic-04` | `shopping-basics` · `cosmetics-basic` · `clothes-shopping` · `snacks-street`(sec) |
| `basic-05` | `transit-ticket` · `directions-location` |
| `basic-06` | `snacks-street` · `restaurant-cooking` · `fruit-market` · `kitchen-tableware` · `drinks-order`(sec) |

**생략 (의도적):** `clinic-basic`(빈 basicsAlign) · `size-quantity`/`colors-shapes`/`time-appointment`/`city-places`/`pantry-ingredients`(장면 약함).

**성장 규칙:**

1. **basicsAlign 또는 unit objective 일치만** — 테마 키만 비슷하면 넣지 않음.  
2. **TOPIK 뱅크 rewrite 금지** — senseIds를 verified/draft 문항에 붙이려면 별도 Paul OK + 문항 단위 증거.  
3. **secondary**는 pack이 이미 선언한 이중 basicsAlign만.  
4. **다음 (앱 배선, 구조 밖):** 채점 `errorType` · `jabi.vocab.v1` 진도 UI · 생성기 `generationInput` — 계약은 Phase 5 동결.

### 10-9. Phase 5 result ✅ contract only (2026-07-27)

| 산출 | 내용 | 비고 |
|------|------|------|
| `progress-contract-v1.json` | 진도·채점·생성 **계약** | UI / 게임 로직 / path-progress 구현 **없음** |
| `errorType` | **8** (closed) | `particle` · `tense` · `honorific` · `ending` · `spelling` · `collocation` · `register` · `wrong-sense` |
| progress storage | **`jabi.vocab.v1`** | value: `{ version, themes:{themeKey→{seen,correct,mastery?}}, senses:{senseId→…} }` |
| frozen path keys | `jabi.hangul.v1` · `jabi.basic.v1` | **migrate 금지** · path-progress 헤더에 vocab 키 포인터만 |
| generationInput | `senseId` 필수 · `usageId`·`register` 선택 | `register` 기본 **`해요`** |

**규칙:** errorType catch-all(`other`) 없음 · 미지정이면 필드 생략 · hangul/basic skill id를 vocab blob에 쓰지 않음 · 앱 배선은 구조 다음 단계.
