# 리서치 — TOPIK必备单词 로컬 팩 인벤토리 · jabi. 반영 방침 (2026-07-27)

> **소스 폴더:** `C:\Users\biker\Downloads\TOPIK必备单词` (Paul 로컬, ~92.5 MB, 파일 14개)  
> **목적:** 팩에 **무엇이 있는지** 기록하고, TOPIK I/II·문법·어휘 티어로 **어떻게 매핑할지** 정리한 뒤, 앱에는 **구조·테마만** 흡수한다.  
> **저작권:** KoreaXin(韩国新网)·金龙一 「TOPIK必备单词」시리즈, 「我为韩语狂」, 「疯狂记单词说韩语」, 「韩语必背单词2000」 등은 **상용/편찬 IP로 취급**. **목록·예문·암기법·해설 원문 통째 이식 금지**. 테마·난이도 구조 → **원작 jabi. 예문·카드**.  
> **짝 문서:** [`research-korean-grammar-explain-ko.md`](research-korean-grammar-explain-ko.md) · [`hub/app/data/vocab/README-ko.md`](../hub/app/data/vocab/README-ko.md)

---

## 1. 한 줄 결론

이 팩은 **중문권 TOPIK 대비 단어장 + 입문 교재 + 테마 단어 노트** 묶음이다. jabi.에는 **초급=테마 생존 / 중급=POS·파생·관용 / 고급=시험회차·뉴스·추상어** 구조를 참고하되, **NIKL A ∪ Tammy allowlist를 정본으로 유지**하고 뱅크에는 **원작 짧은 예문만** 넣는다.

---

## 2. 인벤토리

| 파일 | 크기 | 형식 | 내용 요약 | 텍스트 추출 |
|------|------|------|-----------|-------------|
| `TOPIK必备单词(初级).pdf` | 3.2 MB | PDF ~38p | 초급 필수어 (이미지 위주) | 거의 불가(스캔) |
| `TOPIK必备单词2011(中级).pdf` | 2.9 MB | PDF ~111p | KoreaXin 중급 Word List · [名/动/形/副/俗/惯] · [记][例][派][同] · Section 34=최근 진제 추가분 | 가능 |
| `TOPIK必备单词2012(高级).pdf` | 0.8 MB | PDF ~27p | 고급 표(어휘·품사·중역·비고) · 회차(N회) 묶음 · **저작권 고지 명시** | 가능 |
| `0302-0307.pdf` | 0.3 MB | PDF 5p | 沪江韩语 뉴스 읽기 샘플(물가 등) | 가능(글자 단위 깨짐 있음) |
| `我为韩语狂入门篇—上.pdf` | 24.3 MB | PDF | 입문 교재 상권 | 대용량·교재 IP |
| `我为韩语狂入门篇—上_20171010060355.pdf` | 24.3 MB | PDF | **상권 중복 복사** | 동일 |
| `我为韩语狂入门篇—下.pdf` | 17.2 MB | PDF | 입문 교재 하권 | 대용량·교재 IP |
| `我为韩语狂入门篇—下_20171010060355.pdf` | 17.2 MB | PDF | **하권 중복 복사** | 동일 |
| `疯狂记单词说韩语_对应文本1--10.doc` … `41--51.doc` | 55–1338 KB | .doc×5 | 레슨 1–51 대응 텍스트 · `번호 + 표제어 + [名] + 중역` | OLE 문자열 부분 추출 |
| `韩语必背单词2000.doc` | 81 KB | .doc | 테마별 KO↔ZH 글로스(음료·영화·병명·간식·교통·화장품 등) | 부분 추출 |

**없음:** xlsx / csv / epub / 이미지 단독 폴더.  
**중복:** `我为韩语狂…_20171010060355` 상·하 = 본편과 동일 바이트급 복제.

### 2-1. 추출 도구 메모

- PDF: `pypdf` (초급은 이미지 PDF라 본문 0).  
- `.doc`(구형 OLE): UTF-16LE/CP949 문자열 휴리스틱 — 본문·메타 혼재.  
- **추출 원문은 로컬 임시만**, 레포에 덤프하지 않음.

---

## 3. TOPIK I vs II 매핑

| 팩 레이어 | 대략 CEFR / TOPIK | jabi. 위치 | 흡수 방식 |
|-----------|-------------------|------------|-----------|
| 初级 PDF + 必背2000 테마 + 疯狂记 초반 | A1–A2 / **TOPIK I** | Hangul 이후 · Basics 01–06 · Games beginner | 테마 팩 + 원작 예문 |
| 中级 Word Lists + 관용/속담 태그 | B1 / **TOPIK II 초중** | TOPIK II listen/read draft · 중급 테마 JSON | 구조(POS·파생·동의)만 · 원작 문장 |
| 高级 + 沪江 뉴스 | B2+ / **TOPIK II 중상** | TOPIK II write/read 심화 · 고급 티어 메모 | 티어 라벨·뉴스 장면만 · 원문 금지 |
| 我为韩语狂 입문 상·하 | A1 코스 | Basics 문법 카드 테마 정렬 | 교수 순서 힌트만 |

**주의:** 팩의 「初级/中级/高级」는 **KoreaXin·중국 시중 티어**이지 NIKL A/B/C 공식 등급과 1:1이 아니다. 정본 allowlist는 계속 **NIKL A ∪ (Tammy 1671 − hard)**.

---

## 4. 어휘 티어 구조 (팩에서 배운 패턴)

1. **초급 = 테마 클러스터**  
   음료·영화/여가·증상/병원·간식·승하차·화장품 등 **장면 묶음**. 암기 앱·빙고·스피드퀴즈에 맞음.
2. **중급 = 알파벳·리스트 + 메타 필드**  
   `Word List N` · 품사 · [记] 한자/어원 힌트 · [例] · [派] 파생 · [同] 유의 · [俗] 속담.  
   jabi. teach 카드에 옮길 때는 **「이름 / 결정 규칙 / 예 2–3 / 함정」** 4칸으로 재작성(교재 [记] 문장 복제 금지).
3. **고급 = 시험 회차·뉴스·추상·의태어**  
   `N회` 묶음, 사설·생계·균형 등 추상 명사, 의성·의태어 부사. TOPIK II reading/listening 장면용.
4. **증분 섹션**  
   중급 Section 34 = 「최근 진제에서 뽑은 추가」패턴 → jabi.는 **공개 기출·NIKL**로만 보강, 팩 리스트 복사 없음.

---

## 5. 문법·예문 패턴 (채택할 것 / 말 것)

### 채택 (구조·교수법)

| 패턴 | jabi. 적용 |
|------|------------|
| 표제어 + 품사 + 짧은 글로스 | Games / theme-pack `gloss.{en,ko,zh}` |
| 예문 1줄 + 상황 | Basics `grammarCards.examples` · 글모음 `examples` |
| 파생·유의 한 줄 | teach 카드 「함정/확장」칸 (원작 문장) |
| 속담·관용은 **별 티어** | TOPIK II / 글모음 후속 — 초급 뱅크에 섞지 않음 |
| 생존 장면(주문·표·증상) | Basics 03·05·06 · Games tags (`cafe`,`transport`,`clinic`) |

### 채택하지 말 것

- KoreaXin/必背/疯狂记 **표제어 순서 그대로의 verbatim 덤프**
- [记] 암기법·중문 해설·교재 대화문 **복제**
- 沪江 뉴스 본문·我为韩语狂 레슨 스크립트
- allowlist를 팩 목록으로 **교체**

### 문법 테마 ↔ 기존 jabi. 정렬

| 생존/코스 테마 (팩에서 관측) | 이미 있는 jabi. | 추가 여지 |
|------------------------------|-----------------|-----------|
| 음료·주문 | Basics 03 · bingo cafe | theme-pack `drinks` 원작 예문 |
| 교통·표 | Basics 05 · bingo transport | `transit` 원작 |
| 증상·병원 | bingo 병원 | `clinic` 원작 (의료 전문어 남발 금지) |
| 여가·영화 | (얇음) | `leisure` 소량 |
| -아요/어요 · 에/에서 · 은/는 | 글모음 + Basics 문법 카드 | **신규 FAQ 불필요**(이미 있음) |
| 뉴스·물가 읽기 | TOPIK II draft | 원작 짧은 안내문만 |

---

## 6. 앱 반영 (안전 · 누적)

| 산출물 | 역할 |
|--------|------|
| `hub/app/data/vocab/jabi-theme-packs-beginner.json` | **원작** 초급 테마(음료·교통·클리닉·여가·간식·쇼핑·**화장품**) + 예문 · v3 ≈60어 |
| `hub/app/data/vocab/jabi-theme-packs-intermediate.json` | **원작** 중급(…·의견·판단·**습관·생활**) · **v53** **640**어 |
| Games bingo / telephone / scramble / listen-match | 테마 정렬 원작 문구 보강 (2026-07-27) · bingo **437** · listen **404** · particle **376** · telephone **373** · scramble **375** · dictation **382** · cloze **382** · speed **390** · daily-routine 8-bank Done · size-quantity speed+cloze+bingo/listen Done · particle/dictation(+tel/scramble) next · manifest **v150** |
| TOPIK II `draft-listen-04` / `draft-read-04` | 요금·심야버스 **원작** +1Q |
| `hub/app/data/vocab/README-ko.md` | Bida 팩 정책·교차 링크 |
| `docs/research-theme-games-crossfill-ko.md` | 교차 보강 패턴 메모 |
| `docs/research-korean-grammar-explain-ko.md` | 본 문서 교차 링크 |

**하지 않음:** `vocab-allowlist.json`에 팩 목록 merge · verified TOPIK I 뱅크에 상용 리스트 삽입 · stroke/Hanzi Writer 변경 · 커밋/푸시.

---

## 7. 저작권 스탠스 (Paul용)

1. 폴더명은 학습 자료 보관용으로 보이며, **제목·저작권 고지·KoreaXin 브랜딩**상 상용 편찬물이다.  
2. Paul이 jabi.용으로 「써도 된다」고 해도, **안전 기본값 = 구조·테마만 학습 → 원작 뱅크**.  
3. 표제어(한국어 단어 자체)는 언어 재료이나, **큐레이션·중역·예문·암기 카피**는 IP.  
4. 정본 공개 소스 우선: **NIKL 학습용 어휘 A**, **TOPIK 2015 mirror**, **Tammy TOPIK I 1671**(기존 README).  
5. 로컬 `_tmp_bida_extract*` 는 연구용이며 **레포에 올리지 않는다**.

---

## 8. 다음 후보 (미구현)

- [x] TOPIK II에 **원작** 뉴스형 초단문(요금·심야버스) — listen/read-04 +1Q (2026-07-27)
- [x] 초급 theme **화장품·미용** 소량 팩(생존만 · 브랜드명 금지) — beginner v3 (2026-07-27)
- [x] 중급 theme **금융·이체** + speed-quiz 교차(+10) — intermediate v3 · speed v4 (2026-07-27)
- [x] cloze-race에 money-banking / housing-services 빈칸 교차(+10) — cloze v4 (2026-07-27)
- [x] bingo + listen-match money-banking +10 each — bingo v5 · listen-match v5 (2026-07-27)
- [x] bingo/listen **한도·비밀번호 +2** + speed-quiz housing +10 — bingo/listen v6 · speed v5 (2026-07-27)
- [x] 화장품→dictation 갭(+8) — dictation v6 · d-41–48 · 합계 48 (2026-07-27)
- [x] public-workplace → cloze +10 (출장·서명 포함) + bingo/listen +2 — cloze v5 · bingo v8 · listen v7 (2026-07-27)
- [x] bingo/listen workplace 잔여 lemma +10 (서류·제출·발급·증명서·민원·담당자·부서·출근·퇴근·연차) — bingo v9=102 · listen v8=69 (2026-07-27)
- [x] particle-snap workplace +9 (은/는·이/가·을/를 각 3) — particle v5=53 · ps-45–53 (2026-07-27)
- [x] telephone + scramble workplace +10 each (출근·퇴근·발급 포함) — telephone/scramble v5=55 · tel/ws-46–55 (2026-07-27)
- [x] dictation workplace +10 + 통장·비밀번호 +2 — dictation v7=60 · d-49–60 (2026-07-27)
- [x] workplace residual thin — particle 출근·퇴근·발급 +3 · dictation 출장·서명 +2 — particle v6=56 · dictation v8=62 (2026-07-27)
- [x] 중급 theme **건강·클리닉** 1팩 + speed-quiz 교차(+10) — intermediate v6=76 · speed v7=70 (2026-07-27) · 초급 clinic-basic과 lemma 분리
- [x] health-clinic → cloze/bingo/listen (+약사·주사) — cloze v6=60 · bingo v10=112 · listen v9=79 (2026-07-27)
- [x] health-clinic → particle/dictation + telephone thin — particle v7=66 · dictation v9=72 · telephone v6=63 (2026-07-27)
- [x] health-clinic → scramble +10 (통증·복용·회복·주사) — scramble v6=65 · ws-56–65 (2026-07-27)
- [x] 중급 theme **학교·수업** 1팩 + speed-quiz 교차(+10) — intermediate v7=88 · speed v8=80 (2026-07-27) · workplace lemma 분리
- [x] school-class → cloze/bingo/listen 교차(+10) — cloze v7=70 · bingo v11=122 · listen v10=89 (2026-07-27)
- [x] school-class → particle/dictation + telephone/scramble (+10 each · 과제·수강) — particle v8=76 · dictation v10=82 · telephone v7=73 · scramble v7=75 (2026-07-27)
- [x] bingo/listen school thin **과제·수강 +2** — bingo v12=124 · listen v12=91 (2026-07-27)
- [x] 중급 theme **여행·숙소** 1팩 + speed-quiz 교차(+10) — intermediate v8=100 · speed v9=90 (2026-07-27) · 예약·환전·안내(행위)와 lemma 분리 · 관광지·여관은 팩만
- [x] travel-lodging → cloze/bingo/listen 교차(+10 · 관광지·여관) — cloze v8=80 · bingo v13=134 · listen v13=101 (2026-07-27) · 체크아웃·안내소 thin 잔여
- [x] bingo/listen travel thin **체크아웃·안내소 +2** — bingo v14=136 · listen v14=103 (2026-07-27)
- [x] travel-lodging → particle/dictation (+ telephone/scramble) — particle 86 · dictation 92 · tel 83 · scramble 85 · travel 칩 (2026-07-27)
- [x] cloze travel thin **체크아웃·안내소 +2** — cloze v9=82 · c-81–82 (2026-07-27)
- [x] 중급 theme **날씨·계절** 1팩 + speed-quiz 교차(+10) — intermediate v9=112 · speed v10=100 (2026-07-27)
- [x] weather-season → cloze +10 (안개·태풍 포함) — cloze v10=92 · c-83–92 (2026-07-27)
- [x] weather-season → bingo/listen 교차(+10 · 안개·태풍·맑다·흐리다) — bingo v15=146 · listen v15=113 (2026-07-27) · thin 잔여: 일기예보
- [x] weather-season → particle/dictation (+ telephone/scramble) — particle 96 · dictation 102 · tel 93 · scramble 95 · 일기예보 thin (2026-07-27)
- [x] bingo/listen weather thin **일기예보 +1** — bingo v16=147 · listen v16=114 (2026-07-27) · weather sweep closed
- [x] 중급 theme **디지털·통신** 1팩 + speed-quiz 교차(+10) — intermediate v10=124 · speed v11=110 (2026-07-27) · 브랜드명 금지 · 비밀번호는 banking 유지
- [x] digital-comms → cloze +10 — cloze v11=102 · c-93–102 (2026-07-27) · 메시지·연결은 bingo/listen 잔여
- [x] digital-comms → bingo/listen 교차(+10 · 메시지·연결) — bingo v17=157 · listen v17=124 (2026-07-27) · 통화·알림은 particle/dictation 잔여
- [x] digital-comms → particle/dictation (+ telephone/scramble) — particle 106 · dictation 112 · tel 103 · scramble 105 · 통화·알림 포함 · digital sweep closed (2026-07-27)
- [x] 중급 theme **가족·관계** 1팩 + speed-quiz 교차(+10) — intermediate v11=136 · speed v12=120 (2026-07-27) · NIKL/Sejong · 브랜드 없음 · 사촌·관계는 팩만(게임 thin)
- [x] family-relations → cloze +10 (사촌·관계 포함; 아들·딸 → bingo/listen) — cloze v12=112 · c-103–112 (2026-07-27)
- [x] family-relations → bingo/listen +10 (아들·딸 포함; bingo 가족 bg-29 중복 스킵) — bingo v18=167 · listen v18=134 (2026-07-27) · 관계 → particle/dictation 잔여
- [x] family-relations → particle/dictation +8–10 (관계 · +tel/scramble) — particle 116 · dictation 122 · tel 113 · scramble 115 · family sweep closed (2026-07-27)
- [x] 중급 theme **취미·문화** 1팩 + speed-quiz 교차(+10) — intermediate v12=148 · speed v13=130 (2026-07-27) · beginner leisure-simple과 lemma 분리 · 작품·여가는 팩만(게임 thin)
- [x] hobby-culture → cloze +10 (작품·여가 포함; 연극·관심 → bingo/listen) — cloze v13=122 · c-113–122 (2026-07-27)
- [x] hobby-culture → bingo/listen 교차(+10 · 연극·관심) — bingo v19=177 · listen v19=144 (2026-07-27) · 작품·여가는 cloze 유지 · particle/dictation 잔여
- [x] hobby-culture → particle/dictation +8–10 (+tel/scramble · 작품·여가) — particle 126 · dictation 132 · tel 123 · scramble 125 · hobby sweep closed (2026-07-27)
- [x] 중급 theme **감정·기분** 1팩 + speed-quiz 교차(+10) — intermediate v13=160 · speed v14=140 (2026-07-27) · NIKL/Sejong·Tammy · 실망·불안은 팩만(게임 thin)
- [x] emotion-mood → cloze +10 (실망·불안 포함; 기쁘다·외롭다 → bingo/listen) — cloze v14=132 · c-123–132 (2026-07-27)
- [x] emotion-mood → bingo/listen +10 (기쁘다·외롭다 포함) — bingo v20=187 · listen v20=154 (2026-07-27) · 실망·불안은 cloze 유지
- [x] emotion-mood → particle/dictation +10 — particle v14=136 · dictation v16=142 · themes emotion (2026-07-27) · ThemeSm8d 칩 감정/情绪
- [x] emotion-mood → telephone/scramble +10 — telephone v13=133 · scramble v13=135 · themes emotion (2026-07-27) · ThemeSm8d 칩 · emotion sweep closed · manifest v53
- [x] 중급 theme **스포츠·운동** 1팩 + speed-quiz 교차(+10) — intermediate v14=172 · speed v15=150 (2026-07-27) · beginner leisure 운동·산책 분리 · 경기장·체력은 팩만(게임 thin) · themes `sports`
- [x] ThemeSm9 sports chip residual — 8게임 칩 캐논 KO **스포츠** / ZH **体育** · THEME_ORDER · speed 칩 활성 · 타 7게임 tags=0 (2026-07-27)
- [x] sports-exercise → cloze +10 (경기장·체력 포함; 이기다·지다 → bingo/listen) — cloze v15=142 · c-133–142 (2026-07-27)
- [x] sports-exercise → bingo/listen +10 (이기다·지다 포함) — bingo v21=197 · listen v21=164 (2026-07-27) · 경기장·체력은 cloze/팩 유지
- [x] ThemeSm9c bingo/listen sports chips — sportsTagged=10 → 칩 **스포츠/体育** · smoke (2026-07-27)
- [x] sports-exercise → particle/dictation +10 (+tel/scramble · 경기장·체력) — particle v15=146 · dictation v17=152 · telephone v14=143 · scramble v14=145 · manifest v57 (2026-07-27) · sports sweep closed (data)
- [x] ThemeSm9d particle/dictation/tel/scramble sports chips — tags=10 착지 → 칩 **스포츠/体育** · smoke (2026-07-27)
- [x] 중급 theme **자연·환경** 1팩 + speed-quiz 교차(+10) — intermediate v15=184 · speed v16=160 (2026-07-27) · weather-season과 lemma 분리 · 쓰레기·재활용은 팩만(게임 thin) · themes `nature`
- [x] nature-environment → cloze +10 (쓰레기·재활용 포함; 동물·공원 → bingo/listen) — cloze v16=152 · c-143–152 (2026-07-27) · ThemeSm10b 칩 자연/自然
- [x] nature-environment → bingo/listen +10 (동물·공원 포함) — bingo v22=207 · listen v22=174 (2026-07-27) · 쓰레기·재활용은 cloze 유지
- [x] ThemeSm10c bingo/listen nature 칩 enable — natureTagged=10 → 칩 **자연/自然** · smoke (2026-07-27)
- [x] nature-environment → particle/dictation/tel/scramble +10 — particle v16=156 · dictation v18=162 · telephone v15=153 · scramble v15=155 · manifest v61 (2026-07-27) · ThemeSm10d 칩 자연/自然 · nature sweep closed
- [x] 중급 theme **식당·요리** 1팩 + speed-quiz 교차(+10) — intermediate v16=196 · speed v17=170 (2026-07-27) · beginner snacks/cafe와 lemma 분리 · 반찬·짜다는 팩만(게임 thin) · themes `restaurant` · 브랜드 없음
- [x] restaurant-cooking → cloze +10 (반찬·짜다 포함) — cloze v17=162 · c-153–162 (2026-07-27) · 손님·계산 → bingo/listen 잔여 · themes `restaurant` · ThemeSm11 칩 **식당/餐饮**
- [x] restaurant-cooking → bingo/listen +10 (손님·계산) — bingo v23=217 · listen v23=184 · bg-208–217 / lm-175–184 · themes `restaurant` · 반찬·짜다 cloze 유지 · manifest v64 (2026-07-27)
- [x] ThemeSm11b bingo/listen restaurant chips enable — restaurantTagged=10 → 칩 **식당/餐饮** · smoke bingo+listen(+speed/cloze) (2026-07-27)
- [x] restaurant-cooking → particle/dictation(+tel/scramble) +10 — particle v17=166 · dictation v19=172 · telephone v16=163 · scramble v16=165 · manifest v65 (2026-07-27) · ThemeSm11c 칩 enable retry ready
- [x] ThemeSm11c particle/dictation/tel/scramble restaurant chips enable — Done (2026-07-27) · restaurant 스윕 닫힘
- [x] 중급 theme **옷·쇼핑중급** 1팩 + speed-quiz 교차(+10) — intermediate v17=208 · speed v18=180 (2026-07-27) · beginner shopping/cosmetics와 lemma 분리 · 세탁소·코트는 팩만(게임 thin) · themes `clothes` · 브랜드 없음
- [x] clothes-shopping → cloze +10 (세탁소·코트 포함) — cloze v18=172 · c-163–172 (2026-07-27) · themes `clothes` · ThemeSm12 칩 **옷/服装** (speed+cloze)
- [x] clothes-shopping → bingo/listen +10 (색깔·환불) — bingo v24=227 · listen v24=194 · bg-218–227 / lm-185–194 · themes `clothes` · 세탁소·코트 cloze 유지 · manifest v67 (2026-07-27)
- [x] ThemeSm12b bingo/listen clothes chips enable — clothesTagged=10 → 칩 **옷/服装** smoke (2026-07-27)
- [x] clothes-shopping → particle/dictation(+tel/scramble) +10 — particle 176 · dictation 182 · tel 173 · scramble 175 · manifest v68 (2026-07-27)
- [x] ThemeSm12c particle/dictation/tel/scramble clothes chips enable — Done · clothes 스윕 닫힘 (2026-07-27)
- [x] 중급 theme **음악·예술** 1팩 + speed-quiz 교차(+10) — intermediate **v18=220** · speed **v19=190** (2026-07-27) · hobby-culture·beginner leisure와 lemma 분리 · 배우·무대는 팩만(게임 thin) · themes `music` · 브랜드 없음
- [x] music-arts → cloze +10 (배우·무대 포함) — cloze **v19=182** · c-173–182 (2026-07-27) · themes `music` · 부르다·그리다 → bingo/listen 잔여 · ThemeSm13 칩 **음악/音乐** (speed+cloze)
- [x] ThemeSm13 music chip residual — 8게임 칩 **음악/音乐** · THEME_ORDER · speed+cloze musicTagged=10→칩 활성 · hobby와 별개 (2026-07-27)
- [x] music-arts → bingo/listen +10 (부르다·그리다) — bingo **237** · listen **204** · ThemeSm13b 칩 (2026-07-27)
- [x] music-arts → particle/dictation/tel/scramble +10 — particle **186** · dictation **192** · tel **183** · scramble **185** · manifest **v71** (2026-07-27)
- [x] ThemeSm13c particle/dictation/tel/scramble music chips enable — Done · music 스윕 닫힘 (2026-07-27)
- [x] 중급 theme **미디어·뉴스** 1팩 + speed-quiz 교차(+10) — intermediate **v19=232** · speed **v20=200** (2026-07-27) · news-taste·digital-comms와 lemma 분리 · 언론·제목은 팩만(게임 thin) · themes `media` · 브랜드 없음
- [x] ThemeSm14 media chip residual — 8게임 칩 **미디어/媒体** · THEME_ORDER (2026-07-27) · speed tags=10 착지 후 칩 활성
- [x] ThemeSm14b speed media chip enable — Done · speed mediaTagged=**10** (2026-07-27)
- [x] media-news → cloze +10 (언론·제목) — cloze **v20=192** · c-183–192 · themes `media` (2026-07-27) · 텔레비전·라디오 → bingo/listen
- [x] ThemeSm14b cloze media chips enable — Done · cloze mediaTagged=**10** + `themes` → 칩 **미디어/媒体** · smoke cloze+speed (2026-07-27)
- [x] media-news → bingo/listen +10 (텔레비전·라디오) — bingo **247** · listen **214** · bg-238–247 / lm-205–214 · themes `media` · manifest **v74** (2026-07-27) · 언론·제목 cloze 유지
- [x] ThemeSm14c bingo/listen media chips enable — Done · bingo/listen mediaTagged=**10** → 칩 **미디어/媒体** (2026-07-27)
- [x] media-news → particle/dictation(+tel/scramble) +10 — particle **196** · dictation **202** · tel **193** · scramble **195** · manifest **v75** (2026-07-27)
- [x] ThemeSm14d particle/dictation/tel/scramble media chips enable — Done · mediaTagged=**10** → 칩 **미디어/媒体** · media 스윕 닫힘 (2026-07-27)
- [x] 중급 theme **축하·명절** 1팩 + speed-quiz 교차(+10) — intermediate **v20=244** · speed **v21=210** (2026-07-27) · hobby 축제·family 결혼·emotion·restaurant 손님과 lemma 분리 · 결혼식·연휴는 팩만(게임 thin) · themes `celebration` · 브랜드 없음
- [x] celebration-holiday → cloze +10 (결혼식·연휴) — cloze **v21=202** · c-193–202 · themes `celebration` (2026-07-27) · 초대·케이크 → bingo/listen
- [x] celebration-holiday → bingo/listen +10 (초대·케이크) — bingo **v27=257** · listen **v27=224** · bg-248–257 / lm-215–224 · themes `celebration` · manifest **v78** (2026-07-27) · 결혼식·연휴 cloze 유지
- [x] celebration-holiday → particle/dictation(+tel/scramble) +8–10 · ThemeSm15d chips Done · celebration 스윕 닫힘
- [x] ThemeSm15a–d celebration chips — 전 8게임 celebrationTagged=**10** · 칩 **축하/庆祝** (2026-07-27)
- [x] 중급 theme **시간·약속** 1팩 + speed-quiz 교차(+10) — intermediate **v21=256** · speed **v22=220** (2026-07-27) · work 일정·public 예약·beginner 늦다·celebration 휴가와 lemma 분리 · 오전·오후는 팩만(게임 thin) · themes `time` · 브랜드 없음
- [x] time-appointment → cloze +10 (오전·오후) — cloze **v22=212** · c-203–212 · themes `time` (2026-07-27)
- [x] time-appointment → bingo/listen +10 (시계·일찍) — bingo **267** · listen **234** · themes `time` · manifest **v82** (2026-07-27)
- [x] time-appointment → particle/dictation(+tel/scramble) +10 — particle **216** · dictation **222** · tel **213** · scramble **215** · manifest **v83** (2026-07-27)
- [x] ThemeSm16 / ThemeSm16d time chips — 전 8게임 timeTagged≥**10** · 칩 **시간/时间** · time 스윕 닫힘 (2026-07-27)
- [x] 중급 theme **집안일** 1팩 + speed-quiz 교차(+10) — intermediate **v22=268** · speed **v23=230** (2026-07-27) · nature 쓰레기·housing 수리·clothes 세탁소·restaurant 요리·beginner 비누와 lemma 분리 · 청소기·세탁기는 팩만(게임 thin) · themes `chores` · 브랜드 없음
- [x] home-chores → cloze +10 (청소기·세탁기) — cloze **v23=222** · c-213–222 · themes `chores` (2026-07-27)
- [x] home-chores → bingo/listen +10 (수건·침대) — bingo **277** · listen **244** · themes `chores` · manifest **v86** (2026-07-27)
- [x] ThemeSm17a/b/c chores chips — speed+cloze+bingo+listen choresTagged=**10** · 칩 **집안일/家务** · empty 4게임 숨김 (2026-07-27)
- [x] home-chores → particle/dictation(+tel/scramble) +10 — particle **226** · dictation **232** · tel **223** · scramble **225** · manifest **v87** (2026-07-27)
- [x] ThemeSm17d particle+dictation+tel+scramble chores chips — 전 8게임 choresTagged=**10** · 칩 **집안일/家务** · chores 스윕 닫힘 (2026-07-27)
- [x] 중급 theme **신체** 1팩 + speed-quiz 교차(+10) — intermediate **v23=280** · speed **v24=240** (2026-07-27) · health-clinic·sports·weather 눈(snow)과 lemma 분리 · 입·어깨는 팩만(게임 thin) · themes `body` · 브랜드 없음
- [x] body-parts → cloze +10 (입·어깨) — cloze **v24=232** · c-223–232 · themes `body` (2026-07-27)
- [x] body-parts → bingo/listen +10 (귀·코) — bingo **287** · listen **254** · themes `body` · manifest **v90** (2026-07-27)
- [x] body-parts → particle/dictation(+tel/scramble) +10 (입·어깨) — particle **236** · dictation **242** · tel **233** · scramble **235** · themes `body` · manifest **v91** (2026-07-27)
- [x] ThemeSm18a body chip — speed+cloze+bingo+listen bodyTagged=**10** · 칩 **신체/身体** · empty 4게임 숨김 (2026-07-27)
- [x] ThemeSm18d body chip — particle+dictation+tel+scramble bodyTagged=**10** · 칩 **신체/身体** · body 스윕 닫힘 (2026-07-27)
- [x] 중급 theme **방향·위치** 1팩 + speed-quiz 교차(+10) — intermediate **v24=292** · speed **v25=250** (2026-07-27) · beginner transit 출구·travel 안내소와 lemma 분리 · 길·지도는 팩만(게임 thin) · themes `direction` · 브랜드/지도앱명 없음
- [x] directions-location → cloze +10 (길·지도) — cloze **v25=242** · c-233–242 · themes `direction` · directionTagged **10** (2026-07-27)
- [x] directions-location → bingo/listen +10 (아래·사이) — bingo **v31** · listen **v31** · directionTagged **10/10** · themes `direction` (2026-07-27)
- [x] ThemeSm19a direction chip — speed+cloze+bingo+listen directionTagged=**10** · 칩 **방향/方向** · empty 4게임 숨김 · travel/transit과 별개 (2026-07-27)
- [x] directions-location → particle/dictation/tel/scramble +10 (길·지도) — particle **v25=246** · dictation **v27=252** · tel **v24=243** · scramble **v24=245** · themes `direction` · directionTagged **10**×4 · manifest **v95** (2026-07-27)
- [x] ThemeSm19d direction chip — particle+dictation+tel+scramble directionTagged=**10** · 칩 **방향/方向** · directions 스윕 닫힘 (2026-07-27)
- [x] ThemeSm20a furniture chip — speed(+cloze/bingo/listen) furnitureTagged=**10** · 칩 **가구/家具** · empty 4게임 숨김 · housing/chores와 별개 (2026-07-27)
- [x] furniture-room → particle/dictation/tel/scramble +10 (문·방) — particle **v26=256** · dictation **v28=262** · tel **v25=253** · scramble **v25=255** · furnitureTagged **10**×4 · themes `furniture` · manifest **v99** (2026-07-27)
- [x] ThemeSm20d furniture chip — particle+dictation+tel+scramble furnitureTagged=**10** · 칩 **가구/家具** · furniture 스윕 닫힘 (2026-07-27)
- [x] 중급 theme **과일·시장** 1팩 + speed-quiz 교차(+10) — intermediate **v26=316** · speed **v27=270** (2026-07-27) · beginner snacks·restaurant와 lemma 분리 · 봉지·상자는 팩만(게임 thin) · themes `fruit` · 브랜드 없음
- [x] fruit-market → cloze +10 (봉지·상자 포함) — cloze **v27=262** · themes `fruit` (2026-07-27)
- [x] fruit-market → bingo/listen +10 (오렌지) — bingo **317** · listen **284** · themes `fruit` (2026-07-27)
- [x] fruit-market → particle/dictation/tel/scramble +10 (상자) — particle **266** · dictation **272** · tel **263** · scramble **265** · ThemeSm21a/d 칩 **과일/水果** · fruit 스윕 닫힘 (2026-07-27)
- [x] 중급 theme **주방·식기** 1팩 + speed-quiz 교차(+10) — intermediate **v27=328** · speed **v28=280** (2026-07-27) · restaurant·chores·fruit·beginner 잔과 lemma 분리 · 쟁반·프라이팬은 팩만(게임 thin) · themes `kitchen` · 브랜드 없음
- [x] kitchen-tableware → cloze +10 (쟁반·프라이팬 포함) — cloze **v28=272** · themes `kitchen` · kitchenTagged **10** (2026-07-27)
- [x] kitchen-tableware → bingo/listen +10 (포크·주전자) — bingo **327** · listen **294** · themes `kitchen` (2026-07-27)
- [x] kitchen-tableware → particle/dictation/tel/scramble +10 (쟁반·프라이팬) — particle **276** · dictation **282** · tel **273** · scramble **275** · kitchenTagged **10**×4 · manifest **v107** (2026-07-27)
- [x] ThemeSm22d kitchen chip smoke (전 8 · 주방/厨房) — kitchenTagged=**10**×8 · 칩 **주방/厨房** · kitchen 스윕 닫힘 (2026-07-27)
- [x] 중급 theme **문구·필기구** 1팩 + speed-quiz 교차(+10) — intermediate **v28=340** · speed **v29=290** (2026-07-27) · school-class·work·workplace와 lemma 분리 · 필통·자는 팩만(게임 thin) · themes `stationery` · 브랜드 없음
- [x] office-stationery → cloze +10 (필통·자 포함) — cloze **v29=282** · stationeryTagged **10** · 칩 **문구/文具** · manifest **v109** (2026-07-27)
- [x] office-stationery → bingo/listen +10 (책·노트) — bingo **v35=337** · listen **v35=304** · stationeryTagged **10** each · manifest **v110** (2026-07-27)
- [x] office-stationery → particle/dictation(+tel/scramble) +10 (필통·자) — particle **v29=286** · dictation **v31=292** · tel **v28=283** · scramble **v28=285** · stationeryTagged **10**×4 · manifest **v111** (2026-07-27)
- [x] ThemeSm23d stationery chip enable (particle/dictation/tel/scramble · 문구/文具) → 8-bank 스윕 닫기 — Done (2026-07-27)
- [x] 중급 theme **우편·소포** 1팩 + speed-quiz 교차(+10) — intermediate **v29=352** · speed **v30=300** (2026-07-27) · housing 배달·fruit 상자와 lemma 분리 · 엽서·도착은 팩만(게임 thin) · themes `mail` · 브랜드 없음
- [x] post-mail → cloze +10 (엽서·도착 포함) — cloze mailTagged **10** · 8-bank 스윕 닫힘 (2026-07-27)
- [x] 중급 theme **동물·반려동물** 1팩 + speed-quiz 교차(+10) — intermediate **v30=364** · speed **v31=310** (2026-07-27) · nature-environment 동물·산·강·바다·공원과 lemma 분리 · 키우다·동물원은 팩만(게임 thin) · themes `pets` · 브랜드 없음
- [x] animals-pets → cloze +10 (키우다·동물원 포함) — cloze **v31=302** · petsTagged **10** · 칩 **동물/动物** · manifest **v117** (2026-07-27)
- [x] animals-pets → bingo/listen +10 (키우다·동물원) — bingo **v37=357** · listen **v37=324** · petsTagged **10**×2 · manifest **v118** (2026-07-27)
- [x] animals-pets → particle/dictation(+tel/scramble) +10 (소·돼지) — particle **v31=306** · dictation **v33=312** · tel **v30=303** · scramble **v30=305** · petsTagged **10**×4 · manifest **v119** (2026-07-27)
- [x] ThemeSm25d particle+dictation+tel+scramble pets chip enable → pets 8-bank 스윕 닫기 — Done (2026-07-27)
- [x] 중급 theme **운전·도로** 1팩 + speed-quiz 교차(+10) — intermediate **v31=376** · speed **v32=320** (2026-07-27) · beginner transit·public-life 교통과 lemma 분리 · 주차장·막히다는 팩만(게임 thin) · themes `driving` · 브랜드 없음
- [x] vehicles-driving → cloze +10 (주차장·막히다 포함) — cloze **v32=312** · drivingTagged **10** · 칩 **운전/驾驶** · manifest **v121** (2026-07-27)
- [x] vehicles-driving → bingo/listen + particle/dictation(+tel/scramble) + ThemeSm26d → 8-bank 스윕 닫힘 (2026-07-27)
- [x] 중급 theme **시내·장소** 1팩 + speed-quiz 교차(+10) — intermediate **v32=388** · speed **v33=330** (2026-07-27) · money/fruit/nature/hobby/clinic/mail/transit/school/travel과 lemma 분리 · 운동장·역은 팩 thin → cloze · themes `places` · 브랜드 없음
- [x] city-places → cloze +10 (운동장·역 포함) — cloze **v33=322** · placesTagged **10** · themes `places` · manifest **v125** (2026-07-27) · 카페·경찰서 → bingo/listen → **Done**
- [x] city-places → bingo/listen +10 (카페·경찰서) — bingo **v39=377** · listen **v39=344** · placesTagged **10**×2 · themes `places` · manifest **v126** (2026-07-27)
- [x] ThemeSm27b/c bingo/listen places chips enable — 칩 **장소/场所** · smoke bingo+listen(+speed/cloze) (2026-07-27)
- [x] city-places → particle/dictation(+tel/scramble) +10 — particle **326** · dictation **332** · tel **323** · scramble **325** · placesTagged **10**×4 · manifest **v127** (2026-07-27)
- [x] ThemeSm27d particle+dictation+tel+scramble places chip enable → city-places 8-bank 스윕 닫기 — Done (2026-07-27)
- [x] 중급 theme **식재료·찬장** 1팩 + speed-quiz 교차(+10) — intermediate **v33=400** · speed **v34=340** (2026-07-27) · restaurant/fruit/kitchen/drinks 우유/snacks와 lemma 분리 · 간장·양파는 팩만(게임 thin) · themes `pantry` · 브랜드 없음
- [x] pantry-ingredients → cloze +10 (간장·양파 포함) — cloze **v34=332** · pantryTagged **10** · themes `pantry` · manifest **v129** (2026-07-27) · 생선·빵 → bingo/listen → **Done**
- [x] pantry-ingredients → bingo/listen +10 (생선·빵 포함) — bingo **v40=387** · listen **v40=354** · pantryTagged **10**×2 · themes `pantry` · manifest **v130** (2026-07-27)
- [x] pantry-ingredients → particle/dictation(+tel/scramble) +10 — particle **v34=336** · dictation **v36=342** · tel **v33=333** · scramble **v33=335** · pantryTagged **10**×4 · themes `pantry` · manifest **v131** (2026-07-27)
- [x] ThemeSm28d particle+dictation+tel+scramble pantry chip enable → pantry 8-bank 스윕 닫기 — Done (2026-07-27)
- [x] 중급 theme **욕실·위생** 1팩 + speed-quiz 교차(+10) — intermediate **v34=412** · speed **v35=350** (2026-07-27) · cosmetics 샴푸·비누 · chores 수건·씻다 · furniture 거울 · nature 쓰레기와 lemma 분리 · 깨끗하다·손수건은 팩만(게임 thin) · themes `bathroom` · 브랜드 없음
- [x] bathroom-hygiene → **cloze +10** (깨끗하다·손수건 포함) — cloze **v35=342** · bathroomTagged **10** · themes `bathroom` · manifest **v133** (2026-07-27) · 면도·더럽다 → bingo/listen → **Done**
- [x] bathroom-hygiene → **bingo/listen +10** (면도·더럽다 포함) — bingo **v41=397** · listen **v41=364** · bathroomTagged **10**×2 · themes `bathroom` · manifest **v134** (2026-07-27)
- [x] ThemeSm29b/c bingo/listen bathroom chips enable — bathroomTagged **10**×4 (speed+cloze+bingo+listen) · 칩 **욕실/浴室** · empty 4 숨김 (2026-07-27)
- [x] bathroom-hygiene → **particle/dictation(+tel/scramble) +10** — particle **v35=346** · dictation **v37=352** · tel **v34=343** · scramble **v34=345** · bathroomTagged **10**×4 · themes `bathroom` · **면도·더럽다** · manifest **v135** (2026-07-27)
- [x] ThemeSm29d particle/dictation/tel/scramble bathroom chips enable → bathroom 8-bank 스윕 닫기 — Done (2026-07-27)
- [x] 중급 theme **직업·일** 1팩 + speed-quiz 교차(+10) — intermediate **v35=424** · speed **v36=360** (2026-07-27) · work-study 직장 · workplace · clinic 의사 · health 약사 · media 기자 · driving 경찰·운전 · music 가수·배우와 lemma 분리 · 회사·월급은 팩만(게임 thin) · themes `jobs` · 브랜드 없음
- [x] jobs-occupations → **cloze +10** (회사·월급 포함) — cloze **v36=352** · jobsTagged **10** · themes `jobs` · manifest **v137** (2026-07-27)
- [x] jobs-occupations → bingo/listen +10 — bingo **v42=407** · listen **v42=374** · jobsTagged **10**×2 · manifest **v138** (2026-07-27)
- [x] ThemeSm30a jobs chip enable (speed+cloze+bingo+listen) — 칩 **직업/职业** (2026-07-27)
- [x] jobs-occupations → particle/dictation(+tel/scramble) +10 — particle **356** · dictation **362** · tel **353** · scramble **355** · jobsTagged **10**×4 · manifest **v139** (2026-07-27)
- [x] ThemeSm30d particle/dictation/tel/scramble jobs chips enable → jobs 8-bank 스윕 닫기 — Done (2026-07-27)
- [x] 중급 theme **나라·국적** 1팩 + speed-quiz 교차(+10) — intermediate **v36=436** · speed **v37=370** (2026-07-27) · travel 여권·숙소 · family · school · jobs와 lemma 분리 · 해외·유학생은 팩만(게임 thin) → cloze Done · themes `country` · 브랜드 없음
- [x] countries-nationality → **cloze +10** (해외·유학생 포함) — cloze **v37=362** · countryTagged **10** · themes `country` · manifest **v141** (2026-07-27)
- [x] countries-nationality → **bingo/listen +10** — bingo **v43=417** · listen **v43=384** · countryTagged **10**×2 · themes `country` · manifest **v142** (2026-07-27)
- [x] countries-nationality → **particle/dictation(+tel/scramble) +10** — particle **v37=366** · dictation **v39=372** · tel **v36=363** · scramble **v36=365** · countryTagged **10**×4 · themes `country` · manifest **v143** (2026-07-27)
- [x] ThemeSm31d particle/dictation/tel/scramble country chip enable → countries 8-bank 스윕 닫기 — Done (2026-07-27)
- [x] 중급 theme **일상·일과** 1팩 + speed-quiz 교차(+10) — intermediate **v37=448** · speed **v38=380** (2026-07-27) · time 시계·약속 · chores · bathroom · restaurant 식사와 lemma 분리 · 어제·내일 cloze Done · themes `routine` · 브랜드 없음
- [x] daily-routine → **cloze +10** (어제·내일 포함) — cloze **v38=372** · routineTagged **10** · themes `routine` · manifest **v145** (2026-07-27)
- [x] daily-routine → **bingo/listen +10** — bingo **v44=427** · listen **v44=394** · routineTagged **10**×2 · themes `routine` · manifest **v146** (2026-07-27)
- [x] daily-routine → **particle/dictation(+tel/scramble) +10** — particle **v38=376** · dictation **v40=382** · tel **v37=373** · scramble **v37=375** · routineTagged **10**×4 · themes `routine` · manifest **v147** (2026-07-27)
- [x] ThemeSm32d particle/dictation/tel/scramble routine chip enable → daily-routine 8-bank 스윕 닫기 — Done (2026-07-27)
- [x] 중급 theme **크기·양** 1팩 + speed-quiz 교차(+10) — intermediate **v38=460** · speed **v39=390** (2026-07-27) · clothes 사이즈·색깔 · body · directions 길 · furniture와 lemma 분리 · 넓다·좁다 cloze Done · themes `size` · 브랜드 없음
- [x] size-quantity → **cloze +10** (넓다·좁다 포함) — cloze **v39=382** · sizeTagged **10** · themes `size` · manifest **v149** (2026-07-27)
- [x] size-quantity → **bingo/listen +10** — bingo **v45=437** · listen **v45=404** · sizeTagged **10**×2 · themes `size` · 높다·낮다 · manifest **v150** (2026-07-27)
- [x] size-quantity → **particle/dictation(+tel/scramble) +10** — particle **v39=386** · dictation **v41=392** · tel **v38=383** · scramble **v38=385** · sizeTagged **10**×4 · themes `size` · manifest **v151** (2026-07-27)
- [x] ThemeSm33d particle/dictation/tel/scramble size chip enable → size-quantity 8-bank 스윕 닫기 — Done (2026-07-27)
- [x] 중급 theme **온도·감각** 1팩 + speed-quiz 교차(+10) — intermediate **v39=472** · speed **v40=400** (2026-07-27) · weather 맑다·흐리다 · restaurant 짜다·맛있다 · snacks 달다·맵다 · bathroom · size와 lemma 분리 · 쓰다·부드럽다 cloze Done · themes `senses` · 브랜드 없음
- [x] temperature-senses → **cloze +10** (쓰다·부드럽다 포함) — cloze **v40=392** · sensesTagged **10** · themes `senses` · manifest **v153** (2026-07-27)
- [x] ThemeSm34a speed(+cloze) senses chip enable — 칩 **감각/感觉** · Done (2026-07-27)
- [x] temperature-senses → **bingo/listen +10** (시다·싱겁다) · ThemeSm34b/d · senses 8-bank 스윕 닫힘 — Done (2026-07-27)
- [x] 중급 theme **색깔·모양** 1팩 + speed-quiz 교차(+10) — intermediate **v40=484** · speed **v41=410** (2026-07-27) · clothes 색깔·사이즈 · size · senses · nature와 lemma 분리 · 세모·모양 cloze Done · themes `color` · 브랜드 없음
- [x] colors-shapes → **cloze +10** (세모·모양 포함) — cloze **v41=402** · colorTagged **10** · themes `color` · manifest **v157** (2026-07-27)
- [x] colors-shapes → **bingo/listen +10** · particle/dictation(+tel/scramble) · ThemeSm35d → colors-shapes 8-bank 스윕 닫힘 — Done (2026-07-27)
- [x] 중급 theme **소지품·잡화** 1팩 + speed-quiz 교차(+10) — intermediate **v41=496** · speed **v42=420** (2026-07-27) · clothes 옷·신발·코트 · time 시계 · bathroom 손수건과 lemma 분리 · 귀걸이·넥타이 cloze Done · themes `accessories` · 브랜드 없음
- [x] accessories-belongings → **cloze +10** (귀걸이·넥타이 포함) — cloze **v42=412** · accessoriesTagged **10** · themes `accessories` · c-403–412 · skip 가방·우산 · manifest **v161** (2026-07-27)
- [x] accessories-belongings → **bingo/listen +10** (우산·가방) — bingo **v48=467** · listen **v48=434** · accessoriesTagged **10**×2 · themes `accessories` · ThemeSm36a 칩 **소지품/随身** · manifest **v162** (2026-07-27)
- [x] accessories-belongings → **particle/dictation(+tel/scramble) +8–10** — particle **v42=416** · dictation **v44=422** · tel **v41=409** · scramble **v41=411** · accessoriesTagged **10/10/8/8** · Prefer 귀걸이·넥타이 · ThemeSm36d 칩 **소지품/随身** · manifest **v163** (2026-07-27)
- [x] ThemeSm36d particle/dictation/tel/scramble accessories chip enable — 전 8 칩 **소지품/随身** · accessories-belongings 스윕 닫힘 — Done (2026-07-27)
- [x] 중급 theme **전기·가전** 1팩 + speed-quiz 교차(+10) — intermediate **v42=508** · speed **v43=430** (2026-07-27) · chores 냉장고·청소기·세탁기 · media 텔레비전 · digital 배터리·충전 · housing 열쇠와 lemma 분리 · 전자레인지·다리미 cloze Done · themes electric · 브랜드 없음
- [x] electricity-appliances → **cloze +10** (전자레인지·다리미 포함) — cloze **v43=422** · electricTagged **10** · themes `electric` · c-413–422 · chip KO **전기** / ZH **电器** · manifest **v165** (2026-07-27)
- [x] electricity-appliances → **bingo/listen +10** — bingo **v49=477** · listen **v49=444** · electricTagged **10**×2 · themes `electric` · bg-468–477 · lm-435–444 · Prefer remaining · 전자레인지·다리미 · chip **전기/电器** · manifest **v166** (2026-07-27)
- [x] electricity-appliances → **particle/dictation(+tel/scramble) +8–10** — particle **v43=426** · dictation **v45=432** · tel **v42=417** · scramble **v42=419** · electricTagged **10/10/8/8** · Prefer **켜다** · themes `electric` · manifest **v167** (2026-07-27)
- [x] ThemeSm37d(+37b) electric chip enable — 전 8 칩 **전기/电器** · electricity-appliances 스윕 닫힘 — Done (2026-07-27)
- [x] 중급 theme **건물·시설** 1팩 + speed-quiz 교차(+10) — intermediate **v43=520** · speed **v44=440** (2026-07-27) · electric 엘리베이터·계단 · furniture 문·창문 · housing 열쇠·이웃 · beginner transit 출구 · driving 주차장과 lemma 분리 · 베란다·아파트 cloze Done · bingo/listen Done · themes `building` · 브랜드 없음
- [x] building-facilities → **cloze +10** (베란다·아파트 포함) — cloze **v44=432** · buildingTagged **10** · themes `building` · c-423–432 · chip KO **건물** / ZH **建筑** · manifest **v169** (2026-07-27)
- [x] building-facilities → **bingo/listen +10** — bingo **v50=487** · listen **v50=454** · buildingTagged **10**×2 · themes `building` · bg-478–487 · lm-445–454 · Prefer 복도·층 · chip KO **건물** / ZH **建筑** · manifest **v170** (2026-07-27)
- [x] building-facilities → **particle/dictation(+tel/scramble) +8–10** — particle **v44=436** · dictation **v46=442** · tel **v43=425** · scramble **v43=427** · buildingTagged **10/10/8/8** · Prefer **복도·층·베란다** · themes `building` · manifest **v171** (2026-07-27)
- [x] ThemeSm38d particle/dictation/tel/scramble building chip enable — 전 8 칩 **건물/建筑** · building-facilities 스윕 닫힘 — Done (2026-07-27)
- [x] 중급 theme **동작·이동** 1팩 + speed-quiz 교차(+10) — intermediate **v44=532** · speed **v45=450** (2026-07-27) · body-parts · directions · driving · sports · routine 일어나다·자다 · beginner transit 타다·내리다 · electric 엘리베이터·계단과 lemma 분리 · 따라가다·들어오다 cloze Done · themes `motion` · 브랜드 없음
- [x] movement-actions → **cloze +10** (따라가다·들어오다 포함) — cloze **v45=442** · motionTagged **10** · themes `motion` · c-433–442 · chip KO **동작** / ZH **动作** · manifest **v173** (2026-07-27)
- [x] movement-actions → **bingo/listen +10** (들다·건너다 포함) — bingo **v51=497** · listen **v51=464** · motionTagged **10**×2 · themes `motion` · bg-488–497 · lm-455–464 · chip KO **동작** / ZH **动作** · manifest **v174** (2026-07-27)
- [x] movement-actions → **particle/dictation(+tel/scramble)** — particle **v45=446** · dictation **v47=452** · tel **v44=433** · scramble **v44=435** · motionTagged **10/10/8/8** · Prefer 따라가다·들어오다 · themes `motion` · manifest **v175** (2026-07-27)
- [x] ThemeSm39a+39b(+39d) motion chip enable — 전 8 칩 **동작/动作** · movement-actions 스윕 닫힘 — Done (2026-07-27)
- [x] 중급 theme **부탁·도움** 1팩 + speed-quiz 교차(+10) — intermediate **v45=544** · speed **v46=460** (2026-07-27) · motion · emotion · digital · work-study 준비(n) · money 환전 · mail 보내다·받다 · time 만나다·기다리다와 lemma 분리 · 부탁하다·확인하다 cloze Prefer · themes `favor` · 브랜드 없음
- [x] requests-favors → **cloze +8–10** (부탁하다·확인하다 포함) — cloze **v46=452** · c-443–452 · themes `favor` (2026-07-27)
- [x] ThemeSm40a favor chip enable — speed+cloze favorTagged=**10** · 칩 **부탁/拜托** · empty 6 숨김 (2026-07-27)
- [x] requests-favors → **bingo/listen +10** (찾다·만들다 포함) — bingo **v52=507** · listen **v52=474** · favorTagged **10**×2 · themes `favor` · bg-498–507 · lm-465–474 · chip KO **부탁** / ZH **拜托** · manifest **v178** (2026-07-27)
- [x] requests-favors → **particle/dictation(+tel/scramble)** (물어보다·확인하다) — particle **v46=456** · dictation **v48=462** · tel **v45=441** · scramble **v45=443** · favorTagged **10/10/8/8** · themes `favor` · Prefer 물어보다·확인하다 · chip KO **부탁** / ZH **拜托** · manifest **v179** (2026-07-27)
- [x] **ThemeSm40d** favor chip smoke close — 전 8 SHOW · 칩 **부탁/拜托** · requests-favors 스윕 닫힘 — Done (2026-07-27)
- [x] 중급 theme **생각·계획** 1팩 + speed-quiz 교차(+10) — intermediate **v46=556** · speed **v47=470** (2026-07-27) · favor · emotion · school · work-study와 lemma 분리 · 믿다·계획하다 cloze Prefer · themes `think` · 브랜드 없음
- [x] thoughts-plans → **cloze +8–10** (믿다·계획하다 포함) — cloze **v47=462** · thinkTagged **10** · c-453–462 · chip KO **생각** / ZH **想法** · manifest **v181** (2026-07-27)
- [x] ThemeSm41a think chip enable — speed+cloze+bingo+listen thinkTagged=**10** · 칩 **생각/想法** · empty 4 숨김 (2026-07-27)
- [x] thoughts-plans → **bingo/listen +8–10** (배우다·가르치다 포함) — bingo **v53=517** · listen **v53=484** · thinkTagged **10**×2 · themes `think` · bg-508–517 · lm-475–484 · chip KO **생각** / ZH **想法** · manifest **v182** (2026-07-27)
- [x] thoughts-plans → **particle/dictation(+tel/scramble) +8–10** — particle **v47=466** · dictation **v49=472** · tel **v46=449** · scramble **v46=451** · thinkTagged **10/10/8/8** · Prefer 믿다·계획하다 · themes `think` · chip KO **생각** / ZH **想法** · manifest **v183** (2026-07-27)
- [x] **ThemeSm close** think chip smoke — 전 8 SHOW · 칩 **생각/想法** · thoughts-plans 스윕 닫힘 — Done (2026-07-27)
- [x] 중급 theme **말·대화** 1팩 + speed-quiz 교차(+10) — intermediate **v47=568** · speed **v48=480** (2026-07-27) · digital · media · music 부르다 · think · favor 물어보다 · work 발표 · celebration 초대와 lemma 분리 · 질문하다·설명하다 cloze Prefer · themes `speech` · 브랜드 없음
- [x] speech-talk → **cloze +8–10** (질문하다·설명하다 포함) — cloze **v48=472** · speechTagged **10** · c-463–472 · chip KO **대화** / ZH **对话** · manifest **v185** (2026-07-27)
- [x] speech-talk → **bingo/listen +8–10** (전화하다·대화 포함) — bingo **v54=527** · listen **v54=494** · speechTagged **10**×2 · bg-518–527 · lm-485–494 · chip KO **대화** / ZH **对话** · manifest **v186** (2026-07-27)
- [x] speech-talk → **particle/dictation(+tel/scramble) +8–10** — particle **v48=476** · dictation **v50=482** · tel **v47=457** · scramble **v47=459** · speechTagged **10/10/8/8** · Prefer 질문하다·설명하다 · themes `speech` · chip KO **대화** / ZH **对话** · manifest **v187** (2026-07-27)
- [x] **ThemeSm close** speech chip smoke — 전 8 SHOW · 칩 **대화/对话** · speech-talk 스윕 닫힘 — Done (2026-07-27)
- [x] 중급 theme **변화·진행** 1팩 + speed-quiz 교차(+10) — intermediate **v48=580** · speed **v49=490** (2026-07-27) · speech · think · favor · motion · routine · size · work 준비(n)와 lemma 분리 · 늘다·줄다 cloze Prefer · themes `change` · 브랜드 없음
- [x] change-progress → **cloze +8–10** (늘다·줄다 포함) — cloze **v49=482** · changeTagged **10** · c-473–482 · chip KO **변화** / ZH **变化** · manifest **v189** (2026-07-27)
- [x] change-progress → **bingo/listen +8–10** (생기다·나타나다 포함) — bingo **v55=537** · listen **v55=504** · changeTagged **10**×2 · bg-528–537 · lm-495–504 · chip KO **변화** / ZH **变化** · ThemeSm43b smoke 4 SHOW · manifest **v190** (2026-07-27)
- [x] change-progress → **particle/dictation(+tel/scramble) +8–10** (늘다·줄다 thin) — particle **v49=486** · dictation **v51=492** · tel **v48=465** · scramble **v48=467** · changeTagged **10/10/8/8** · ThemeSm close · change 스윕 닫힘 · manifest **v192** (2026-07-27)
- [x] 중급 theme **비교·정도** 1팩 + speed-quiz 교차(+10) — intermediate **v49=592** · speed **v50=500** (2026-07-27) · change · size · colors와 lemma 분리 · 똑같다·전혀 cloze Prefer · themes `compare` · 브랜드 없음
- [x] comparison-degree → **cloze +10** (똑같다·전혀) — cloze **v50=492** · compareTagged **10** · c-483–492 · theme `compare` · ThemeSm44a 칩 KO **비교** / ZH **比较** · manifest **v194** (2026-07-27)
- [x] comparison-degree → **bingo/listen +8–10** (만큼·반대 Prefer) — bingo **v56=547** · listen **v56=514** · compareTagged **10**×2 · ThemeSm44a 4 SHOW · manifest **v195** (2026-07-27)
- [x] comparison-degree → **particle/dictation(+tel/scramble) +8–10** · Prefer 똑같다·전혀 · particle **v50=496** · dictation **v52=502** · tel **v49=473** · scramble **v49=475** · compareTagged **10/10/8/8** · ThemeSm close 전 8 · chip KO **비교** / ZH **比较** · manifest **v196** (2026-07-27) · **스윕 닫힘**
- [x] 중급 theme **이유·원인·결과** 1팩 + speed-quiz 교차(+10) — intermediate **v50=604** · speed **v51=510** (2026-07-27) · compare · change · think · speech · favor · news 영향 · family 관계와 lemma 분리 · 관련·효과 cloze Prefer · themes `reason` · 브랜드 없음
- [x] **ThemeSm45a** reason chip enable — 칩 KO **이유** / ZH **原因** / EN Reason · THEME_ORDER · speed reasonTagged=**10** SHOW · empty 7 HIDE · `_smoke-reason-focus.js` PASS · think/speech/favor 별개 (2026-07-27)
- [x] cause-reason → **cloze +10** (관련·효과 Prefer) — cloze **v51=502** · reasonTagged **10** · c-493–502 · themes `reason` · chip KO **이유** / ZH **原因** · manifest **v198** (2026-07-27)
- [x] **ThemeSm45b** cloze reason chip enable — reasonTagged=**10** + `themes` → SHOW · `_smoke-reason-focus.js` 4 SHOW(speed+cloze+bingo/listen) · empty 4 HIDE PASS · invent Next/lemma 없음 (2026-07-27)
- [x] cause-reason → **bingo/listen +10** (그래서·왜냐하면 Prefer) — bingo **v57=557** · listen **v57=524** · reasonTagged **10**×2 · themes `reason` · chip KO **이유** / ZH **原因** · manifest **v199** (2026-07-27)
- [x] cause-reason → **particle/dictation(+tel/scramble) +8–10** · Prefer 관련·효과 · particle **v51=506** · dictation **v53=512** · tel **v50=481** · scramble **v50=483** · reasonTagged **10/10/8/8** · ThemeSm45d close · cause-reason 스윕 닫힘 · manifest **v200** (2026-07-27)
- [x] 중급 theme **문제·해결** 1팩 + speed-quiz 교차(+10) — intermediate **v51=616** · speed **v52=520** (2026-07-27) · favor 도와주다·확인하다 · think 고르다·결정하다 · reason 방법·과정 · change 생기다 · emotion 걱정과 lemma 분리 · 상황·조건 cloze Prefer · themes `problem` · chip 제안 KO **문제** / ZH **问题** · 브랜드 없음
- [x] problem-solution → **cloze +10** (상황·조건 Prefer) — cloze **v52=512** · problemTagged **10** · c-503–512 · themes `problem` · chip KO **문제** / ZH **问题** · manifest **v202** (2026-07-27)
- [x] problem-solution → **bingo/listen +10** (힘들다·쉽다 Prefer) — bingo **v58=567** · listen **v58=534** · problemTagged **10**×2 · themes `problem` · chip KO **문제** / ZH **问题** · manifest **v203** (2026-07-27)
- [x] **ThemeSm46a** speed problem chip enable — 칩 KO **문제** / ZH **问题** / EN Problem · THEME_ORDER · speed problemTagged=**10** SHOW (2026-07-27)
- [x] **ThemeSm46b** cloze problem chip enable — cloze problemTagged=**10** + `themes` → SHOW · smoke 2 SHOW (2026-07-27)
- [x] **ThemeSm46c** bingo/listen problem chip enable — bingo/listen problemTagged=**10** + `themes` → SHOW · smoke 4 SHOW (2026-07-27)
- [x] problem-solution → **particle/dictation(+tel/scramble) +8–10** · Prefer 상황·조건 residual · particle **v52=516** · dictation **v54=522** · tel **v51=489** · scramble **v51=491** · problemTagged **10/10/8/8** · ThemeSm46d close · problem-solution 스윕 닫힘 · manifest **v204** (2026-07-27)
- [x] **ThemeSm46d** problem chip smoke close — 전 8 SHOW · 칩 KO **문제** / ZH **问题** · favor/reason/think 별개 · invent Next/lemma 없음 (2026-07-27)
- [x] 중급 theme **의견·판단** 1팩 + speed-quiz 교차(+10) — intermediate **v52=628** · speed **v53=530** (2026-07-27) · compare 반대 · hobby 관심 · favor 필요하다 · clothes 맞다 · think 믿다 · problem 선택하다와 lemma 분리 · 칭찬하다·비판하다 cloze Prefer · themes `opinion` · chip 제안 KO **의견** / ZH **意见** · 브랜드 없음
- [x] opinion-judgment → **cloze +10** (칭찬하다·비판하다 Prefer) · cloze **v53=522** · theme `opinion` · chip KO **의견** / ZH **意见** (2026-07-27)
- [x] opinion-judgment → **bingo/listen +10** (확실하다·분명하다 Prefer) · bingo **v59=577** · listen **v59=544** · opinionTagged **10**×2 · theme `opinion` · chip KO **의견** / ZH **意见** (2026-07-27)
- [x] opinion-judgment → **particle/dictation(+tel/scramble) +8–10** — particle **v53=526** · dictation **v55=532** · tel **v52=497** · scramble **v52=499** · Prefer 칭찬하다·비판하다 residual · themes `opinion` · opinionTagged **10/10/8/8** (2026-07-27) · ThemeSm47d close · chip KO **의견** / ZH **意见**
- [x] **ThemeSm47d** opinion chip smoke close — 전 8 SHOW · 칩 KO **의견** / ZH **意见** · think/speech/favor/problem 별개 · **opinion-judgment 스윕 닫힘** · invent Next/lemma 없음 (2026-07-27)
- [x] 중급 theme **습관·생활** 1팩 + speed-quiz 교차(+10) — intermediate **v53=640** · speed **v54=540** (2026-07-27) · routine · celebration 휴가 · sports 연습 · reason 목표 · problem 경험 · work 스트레스 · hobby 여가와 lemma 분리 · 포기하다·참다 cloze Prefer · themes `habit` · chip KO **습관** / ZH **习惯** · 전 8 ThemeSm48d close · 브랜드 없음
- [x] habits-lifestyle → particle/dictation(+tel/scramble) — particle **536** · dictation **542** · tel **505** · scramble **507** · habitTagged **10/10/8/8** · Prefer 포기하다·참다 · ThemeSm48d · 2026-07-27
- [x] 중급 theme **규칙·허락** 1팩 + speed-quiz 교차(+10) — intermediate **v54=652** · speed **v55=550** (2026-07-27) · driving 위험·조심하다 · public-life 가능 · school 시험 · favor · habit · problem과 lemma 분리 · 어기다·허용하다 cloze Prefer · themes `rules` · chip 제안 KO **규칙** / ZH **规则** · 브랜드 없음
- [x] rules-permission → **cloze +10** (어기다·허용하다 Prefer) — cloze **v55=542** · rulesTagged **10** · c-533–542 · themes `rules` · chip KO **규칙** / ZH **规则** · manifest **v214** (2026-07-27)
- [x] rules-permission → **bingo/listen +10** (예의·질서 Prefer) — bingo **v61=597** · listen **v61=564** · rulesTagged **10**×2 · themes `rules` · chip KO **규칙** / ZH **规则** · manifest **v215** (2026-07-27)
- [x] rules-permission → **particle/dictation(+tel/scramble) +8–10** · Prefer 허용하다·안전하다 residual · particle **v55=546** · dictation **v57=552** · tel **v54=513** · scramble **v54=515** · rulesTagged **10/10/8/8** · ThemeSm49d close · rules-permission 스윕 닫힘 · manifest **v216** (2026-07-27)
- [x] **ThemeSm49d** rules chip smoke close — 전 8 SHOW · 칩 KO **규칙** / ZH **规则** · favor/problem/jobs/opinion 별개 · invent Next/lemma 없음 (2026-07-27)
- [x] 중급 theme **친구·사교** 1팩 + speed-quiz 교차(+10) — intermediate **v55=664** · speed **v56=560** (2026-07-27) · celebration 모임·초대 · family · time 만나다·약속 · speech · emotion 외롭다 · directions 사이·근처 · housing 이웃과 lemma 분리 · 사귀다·방문 cloze Prefer · themes `friends` · chip 제안 KO **친구** / ZH **朋友** · SNS 브랜드 없음
- [x] friends-social → **cloze +10** (사귀다·방문 Prefer) — cloze **v56=552** · friendsTagged **10** · c-543–552 · themes `friends` · chip KO **친구** / ZH **朋友** · ThemeSm50b · manifest **v218** (2026-07-27)
- [x] **ThemeSm50b** cloze friends chip enable — speed+cloze 2 SHOW · empty 6 HIDE · 칩 KO **친구** / ZH **朋友** · celebration/family 별개 · invent Next/lemma 없음 (2026-07-27)
- [x] friends-social → **bingo/listen +10** (반갑다·가깝다 Prefer) — bingo **v62=607** · listen **v62=574** · friendsTagged **10**×2 · ThemeSm50c · manifest **v219** (2026-07-27)
- [x] friends-social → **particle/dictation(+tel/scramble) +8–10** · Prefer 사귀다 residual · particle **v56=556** · dictation **v58=562** · tel **v55=521** · scramble **v55=523** · friendsTagged **10/10/8/8** · ThemeSm50d close · friends-social 스윕 닫힘 · manifest **v220** (2026-07-27)
- [x] 중급 theme **성격·인품** 1팩 + speed-quiz 교차(+10) — intermediate **v56=676** · speed **v57=570** (2026-07-27) · emotion · habit 부지런하다·게으르다 · friends 친하다 · rules 예의 · senses 조용하다·밝다 · favor 고맙다 · opinion 칭찬하다와 lemma 분리 · 겸손하다·엄격하다 cloze Prefer · themes `personality` · chip 제안 KO **성격** / ZH **性格** · 브랜드 없음
- [x] personality-character → **전 8 ThemeSm51c close** — personalityTagged **10**×6 + **8**×2 · 칩 KO **성격** / ZH **性格** · 스윕 닫힘 (2026-07-27)
- [x] 중급 theme **사과·예의 표현** 1팩 + speed-quiz 교차(+10) — intermediate **v57=688** · speed **v58=580** (2026-07-27) · favor 고맙다 · rules 예의 · friends · emotion 걱정 · housing 불편(n) · fruit 사과(apple) · personality와 lemma 분리 · 번거롭다·공손하다 cloze Prefer · themes `apology` · chip KO **미안** / ZH **抱歉** · 브랜드 없음
- [x] apology-politeness → **cloze +10** (번거롭다·공손하다 Prefer) — cloze **v58=572** · apologyTagged **10** · c-563–572 · ThemeSm52a · chip KO **미안** / ZH **抱歉** · Skip 인사하다·불편하다 → bingo/listen (2026-07-27)
- [x] apology-politeness → **bingo/listen +8–10** (인사하다·불편하다 Prefer) · themes `apology` · chip KO **미안** / ZH **抱歉** · ThemeSm52c–52d · **스윕 닫힘** (2026-07-27)
- [x] 중급 theme **성공·도전** 1팩 + speed-quiz 교차(+10) — intermediate **v58=700** · speed **v59=590** (2026-07-27) · habit 노력하다·포기하다 · reason 목표·결과 · problem 경험 · personality 자신감 · school 시험·성적 · think · emotion · apology와 lemma 분리 · 성취·바라다 cloze Prefer · themes `success` · chip KO **성공** / ZH **成功** · 브랜드 없음
- [x] success-challenge → **cloze +10** (성취·바라다 Prefer) — cloze **v59=582** · successTagged **10** · c-573–582 · ThemeSm53a · chip KO **성공** / ZH **成功** · Skip 자랑하다·성과 → bingo/listen (2026-07-27)
- [x] success-challenge → **bingo/listen +8–10** (자랑하다·성과 Prefer) · themes `success` · ThemeSm53b · chip KO **성공** / ZH **成功** (2026-07-27)
- [x] success-challenge → **particle/dictation(+tel/scramble) +8–10** (희망·기대하다 residual) — particle **v59=586** · dictation **v61=592** · tel **v58=545** · scramble **v58=547** · successTagged **10/10/8/8** · ThemeSm53c close · chip KO **성공** / ZH **成功** · **스윕 닫힘** (2026-07-27)
- [x] 중급 theme **조언·제안** 1팩 + speed-quiz 교차(+10) — intermediate **v59=712** · speed **v60=600** (2026-07-27) · opinion 추천하다·중요하다 · speech 대답하다·질문하다·알리다 · favor 물어보다 · think · problem · success · housing 문의(n)와 lemma 분리 · 조언·상담 cloze Prefer · themes `advice` · chip KO **조언** / ZH **建议** · 브랜드 없음
- [x] advice-counsel → **cloze +8–10** (조언·상담 Prefer) · ThemeSm54a/b — cloze **v60=592** · adviceTagged **10** (2026-07-27)
- [x] advice-counsel → **bingo/listen +8–10** (답변·안내하다 Prefer) · ThemeSm54c — bingo **647** · listen **614** (2026-07-27)
- [x] advice-counsel → **particle/dictation(+tel/scramble) +8–10** (조언·상담 residual) — particle **v60=596** · dictation **v62=602** · tel **v59=553** · scramble **v59=555** · adviceTagged **10/10/8/8** · ThemeSm54d close · chip KO **조언** / ZH **建议** · **스윕 닫힘** (2026-07-27)
- [x] 중급 theme **격려·응원** 1팩 + speed-quiz 교차(+10) — intermediate **v61=724** · speed **v61=610** (2026-07-27) · advice 조언하다·제안하다·권하다 · favor 도와주다 · success 희망·기대하다 · opinion 칭찬하다 · emotion · friends · sports와 lemma 분리 · 격려·위로 cloze Prefer · themes `encourage` · chip 제안 KO **격려** / ZH **鼓励** · 브랜드 없음
- [x] encourage-support → **cloze +8–10** (격려·위로 Prefer) · ThemeSm55a/55b — cloze **v61=602** · encourageTagged **10** · chip KO **격려** / ZH **鼓励** (2026-07-27)
- [x] encourage-support → **bingo/listen +8–10** (응원·지지 Prefer) · ThemeSm55c — bingo **v67=657** · listen **v67=624** · encourageTagged **10**×2 · bg-648–657 · lm-615–624 · chip KO **격려** / ZH **鼓励** · smoke 4 SHOW (2026-07-27)
- [x] encourage-support → **particle/dictation(+tel/scramble) +8–10** (격려·위로 residual) — particle **v61=606** · dictation **v63=612** · tel **v60=561** · scramble **v60=563** · encourageTagged **10/10/8/8** · ThemeSm55d close · chip KO **격려** / ZH **鼓励** · **스윕 닫힘** (2026-07-27)
- [x] 중급 theme **약속·신뢰** 1팩 + speed-quiz 교차(+10) — intermediate **v62=736** · speed **v62=620** (2026-07-27) · think 믿다 · rules 지키다·어기다 · time 약속(n) · personality 솔직하다 · favor 확인하다 · encourage 의지하다·안심하다 · advice · apology · success와 lemma 분리 · 진실·거짓말 cloze Prefer · themes `promise` · chip 제안 KO **약속** / ZH **约定** · 브랜드 없음
- [x] promise-trust → **cloze +8–10** (진실·거짓말 Prefer) — cloze **v62=612** · promiseTagged **10** · c-603–612 · ThemeSm56a · Suggest bingo/listen (2026-07-27)
- [x] ThemeSm56b cloze promise chip SHOW — smoke **2 SHOW** (speed+cloze) · chip KO **약속** / ZH **约定** · Suggest bingo/listen (2026-07-27)
- [x] promise-trust → **bingo/listen + particle/dictation(+tel/scramble)** · ThemeSm56d close · **스윕 닫힘** (2026-07-27)
- [x] 중급 theme **거절·수락** 1팩 + speed-quiz 교차(+10) — intermediate **v63=748** · speed **v63=630** (2026-07-27) · opinion 동의하다 · compare 반대 · rules 허락하다 · promise · favor 부탁하다 · advice 제안하다 · apology · speech 대답하다와 lemma 분리 · 승낙·거부 cloze Prefer · themes `refuse` · chip 제안 KO **거절** / ZH **拒绝** · 브랜드 없음
- [x] refuse-accept → **cloze + bingo/listen + particle/dictation(+tel/scramble)** · ThemeSm57 close · refuseTagged **10×6 + 8×2** · smoke 전 8 SHOW · chip KO **거절** / ZH **拒绝** · **스윕 닫힘** (2026-07-27)
- [x] 중급 theme **불만·항의** 1팩 + speed-quiz 교차(+10) — intermediate **v64=760** · speed **v64=640** (2026-07-27) · emotion 걱정 · housing 불편 · problem 문제 · opinion 비판하다 · compare 반대 · refuse · apology · favor와 lemma 분리 · 이의·하소연 cloze Prefer · themes `complain` · chip 제안 KO **불만** / ZH **不满** · ThemeSm 미터치 · 브랜드 없음
- [ ] complain-dissatisfaction → cloze +8–10 (이의·하소연 Prefer)
- [ ] theme-pack → Games bingo/speed-quiz 태그 자동 병합 스크립트 (수동 정렬로 충분하면 보류)
- [ ] 중급 `grammarCards`에 「파생·유의」슬롯 UI  
- [ ] TOPIK I verified listen/read 폴리시 · 또는 TOPIK II draft 폴리시
- [ ] Paul이 팩에 대해 「직접 작성 노트 / 구매 라이선스」확정 시 정책 재검토 → [`ask-paul-later-ko.md`](ask-paul-later-ko.md)

---

*작성: Cursor · 2026-07-27 · 커밋/푸시 없음*
