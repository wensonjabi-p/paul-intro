# 제안서 — 트랙 UX 개편 (Basics·Hangul PPT식 흐름 · 트랙 간 내비게이션 통일 · 온보딩 배치)

> **작성 방법**: 로컬 서버(`python -m http.server`, `hub/`)로 최신 앱을 직접 띄워 TOPIK I·TOPIK II·Basics·Hangul·Games를 실제 사용자처럼 조작(온보딩 완주 2회, 유닛 진입, localStorage 초기화 후 진입 경로 테스트 등)해 문제를 실측했습니다. 이어서 3개 병렬 리서치(마이크로러닝/청킹 설계, 온보딩 UX, 트랙 간 내비게이션 일관성)를 국문·영문·Google Scholar로 수행했습니다. **Paul 검토용 — 이 문서 승인 전까지 Cursor에 큐잉하지 않습니다.**
>
> **왜 이전 요청이 반영 안 됐는지**: DAILY-LOG·큐·PROGRESS·제 메모리를 전부 검색했지만 이 3가지 문제에 대한 기록을 찾지 못했습니다 — Cursor에게 지시가 실제로 전달된 적이 없었던 것으로 보입니다. 이 문서로 처음 정식 기록·큐잉합니다.

---

## 문제 1 — Basics·Hangul: "PPT식 흐름"이 라벨로만 존재하고 실제로는 긴 스크롤 카드 나열

### 실측 결과

Basics 01(인사·자기소개) 유닛을 펼치면, 데이터 안에 이미 이런 라벨이 있습니다:

> **SKILL STEPS**: Skill intro → Teach(문법) → Dialogue → Practice → Checkpoint

하지만 실제 렌더링은 이 5단계가 **전부 한 페이지에 순서대로 이어 붙여진 긴 스크롤**입니다 — OBJECTIVE → GRAMMAR 카드 2개(이에요/예요, 은/는↔이/가, 각각 예문 포함) → GRAMMAR NOTE → SKILL STEPS 텍스트 설명 → FIRST MEETING 대화 전문 → KEY PHRASES 8개 → 그제서야 맨 아래 "Practice dialogue →" 버튼 하나. 학습자는 실제 상호작용(클릭·입력) 없이 이 모든 걸 스크롤로 통과한 뒤에야 첫 문제를 만납니다. Hangul 트랙도 동일 패턴(레슨 펼치면 설명 카드 나열 후 맨 아래 연습).

즉 **의도된 설계(단계별 진행)와 실제 구현(단일 페이지 나열)이 이미 어긋나 있습니다** — 콘텐츠 데이터는 슬라이드 단위로 쪼개져 있는데 렌더러가 그걸 한 화면에 다 펼쳐버리는 것으로 보입니다.

### 근거

**학술 근거 (신뢰도 높음)**
- **인지부하 이론(Sweller, 1988)과 worked-example effect(Sweller & Cooper, 1985)**: 작동기억은 동시 처리량이 극히 제한적이라, 설명을 몰아서 준 뒤 나중에 연습시키는 것보다 "설명 직후 곧바로 그 개념만 연습"시키는 쪽이 학습 성과가 높음 — 인지과학에서 가장 반복 검증된 효과 중 하나. ([worked-example effect](https://en.wikipedia.org/wiki/Worked-example_effect), [Sweller & Cooper 원문](https://www.sciencedirect.com/science/article/abs/pii/S0361476X1000055X))
- **Bloom의 완전학습(Mastery Learning, 1968)**: 짧은 단원마다 형성평가→피드백→재확인의 타이트한 루프가 학습격차를 줄임. Hattie 메타분석에서 학습 진도를 약 5개월치 앞당기는 효과. ([ERIC 원문](https://files.eric.ed.gov/fulltext/ED490412.pdf))
- **스크롤 vs 페이지네이션 — Sanchez & Wiley (2009, *Human Factors*)**: 스크롤 형식이 페이지 단위 형식보다 복잡한 텍스트 이해도를 낮췄고, 특히 **작동기억 용량이 낮은 학습자(=초급 학습자)일수록 부정적 효과가 컸음** — "긴 스크롤 뒤 맨 아래 퀴즈" 패턴이 왜 나쁜지에 대한 가장 강한 단일 근거. ([SAGE 원문](https://journals.sagepub.com/doi/10.1177/0018720809352788))
- **국내 — 도현미·김민정 (2022), 「대학수업에서 마이크로러닝 설계원리 개발 및 효과성 검증」, 교육공학연구 38(1)**: 마이크로러닝 적용 집단이 미적용 집단 대비 수업 흥미·학업성취 모두 유의하게 향상. ([DBpia](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11237742))
- **국내 — 배재홍·신호영 (2020), 「마이크로 러닝이 대학생의 학습만족도와 학습효과에 미치는 영향」, 한국융합학회논문지 11(7)**: 마이크로러닝·이러닝·유인물 비교 시 마이크로러닝의 학습만족도가 최고. ([KCI](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002610569))

**업계 참고 (약한 근거, 보조용)**
- Nielsen Norman Group, "Scrolling and Attention" — 아이트래킹 541개 페이지 분석, 시선의 80.3%가 폴드 위쪽, 스크롤할수록 주의 지속적 감소. ([NN/g](https://www.nngroup.com/articles/scrolling-and-attention-original-research/))
- 언어학습 앱 게이미피케이션 체계적 문헌고찰(2023, *CALL*)은 "슬라이드 단위 UX 설계가 실제 학습성과에 미치는 영향"을 직접 검증한 동료심사 논문이 거의 없다고 스스로 인정 — 즉 **"PPT식 흐름"은 상위 원리(청킹·완전학습·스크롤 연구)로부터의 합리적 추론**이지, "슬라이드 UX 자체"를 정면 검증한 개별 연구는 부족함을 정직하게 밝힙니다.

**정직한 유보사항**: 즉시 퀴즈의 목적은 "장기 기억 극대화"가 아니라 **이해도 확인·주의 유지·다음 단계 진입 게이팅**으로 프레이밍해야 정확합니다(Karpicke & Roediger 2007 — 학습 직후 인출은 간격을 둔 인출보다 장기 파지 효과가 작음). 장기 기억은 별도 간격 복습 기능으로 보완해야 합니다.

### 제안

Basics·Hangul 유닛 상세 화면을 **데이터에 이미 있는 SKILL STEPS 라벨 그대로** 실제 슬라이드로 분리:
1. Intro(1화면, 목표 한 줄) → 2. Teach(문법 포인트 **하나씩**, 여러 개면 여러 슬라이드로 분리) → 3. Dialogue(대화 1화면) → 4. Practice(문항 1~2개씩, 즉시 정오답 확인) → 5. Checkpoint(마무리 미니체크) — 각 슬라이드 전환 시 "다음" 버튼, 뒤로가기 가능, 진행 점(●●○○○) 표시.

---

## 문제 2 — 트랙마다 완전히 다른 내비게이션 패턴 (TOPIK I ≠ TOPIK II ≠ Basics ≠ Games)

### 실측 결과

같은 앱 안에서 "문항/유닛 목록을 보여주는 화면"이 트랙마다 4가지 다른 형태로 구현돼 있습니다:

| 트랙 | 실제 패턴 |
|---|---|
| **TOPIK I** (Practice 탭) | 섹션별(Reading/Listening) **평평한 목록**, "Set 1~4" 텍스트 링크 |
| **TOPIK II** | 00~13 **번호+원형 배지 세로 타임라인**, 그 중 "00·Overview"(스캐폴딩, 클릭해도 아무 기능 없음)와 "13·Full mock(planned, 콘텐츠 없음)"이 실제 연습 유닛과 **구분 없이 섞여** 노출됨 |
| **Basics** | TOPIK II와 비슷한 번호+원형 배지 세로 목록이지만 "Duolingo-style skill path"라고 라벨링만 됨 (실제 Duolingo 특유의 노드맵 시각화는 없음) |
| **Games** | 8개 게임 **개별 카드**, PLAY 버튼, 번호 없음 |

Paul이 보여주신 스크린샷(TOPIK II 00~03 화면)이 정확히 이 불일치를 보여줍니다 — "기본 러닝 패턴은 이런 형태가 아니라 토픽1과 같은 화면"이라는 지적이 실측으로 확인됩니다.

### 근거

**학술 근거**
- **Nielsen의 일관성 휴리스틱(#4)**: 같은 제품 안에서 요소·구조가 다르면 사용자가 "이게 같은 의미인지" 매번 재확인해야 해 인지 부하·실수가 증가. ([NN/g](https://www.nngroup.com/articles/consistency-and-standards/))
- **자기결정이론(SDT) — 유능감(competence)**: 온보딩·내비게이션 전략의 성공 척도는 결국 "사용자가 시스템을 다루는 데 능숙해지는가"인데, 트랙마다 구조가 다르면 숙달감이 트랙 전환마다 리셋됨. ([NN/g 응용 해설](https://www.nngroup.com/articles/autonomy-relatedness-competence/))
- **국내 — 이보경·두경일 (2015), 「효과적인 학습을 위한 스마트러닝 앱 콘텐츠 UI 연구」, 한국디자인문화학회지 21(3)**: 국내 대표 학습 앱(해커스 토익 등 시험 대비 앱 포함) 비교에서 **시각 요소 불일치**가 실무에서도 흔히 확인되는 문제로 지적됨 — jabi.의 TOPIK 트랙과 직접 유비 가능. ([DBpia](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE06570846))
- **국내 — Kejun Liu & CHOU SOUK (2024), 한국콘텐츠학회논문지 24(2)**: 언어훈련 앱 UI는 일관성·단순성·직관성에 초점을 맞춰야 인지적 용이성이 확보된다고 결론. ([KCI](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003057521))
- **신중론 — Farag & Shemy (2011, *IJEL*)**: 선형/비선형 내비게이션의 우열은 학습자 인지 스타일에 따라 갈림(전체형은 선형, 분석형은 비선형에서 우수) — **"완전 획일화가 항상 정답"은 아니라는 균형추**로 인용. ([ERIC](https://eric.ed.gov/?id=EJ936216))

**업계 참고자료 (구체적 절충안 — 가장 실무적으로 유용)**
- **Duolingo 한국어 코스의 실제 구현**: 한글(알파벳) 학습을 별도 화면 구조로 빼지 않고, 메인 스킬 패스의 **첫 두 스킬로 그대로 포함**시킴 — 문자체계 학습과 어휘/문법 학습이 **동일한 노드-경로 UI, 동일한 체크포인트·레슨 단위 문법**으로 소비되어 사용자가 "완전히 다른 화면으로 전환됐다"고 느끼지 않음. ([Duolingo Alphabet 1](https://duolingo.fandom.com/wiki/Korean_Skill:Alphabet_1))
- **Duolingo의 2022년 스킬트리→선형 패스 전면 개편**: 초보 학습자의 완주율이 유의하게 개선되어 "다수 최적화"를 택함. ([Duolingo 공식 리포트](https://duolingo-papers.s3.amazonaws.com/reports/Duolingo_whitepaper_language_read_listen_write_speak_2024.pdf))

**핵심 프레임(리서치 종합)**: "**완전히 동일한 화면**"이 아니라 "**동일한 진행 문법**"이 검증된 절충안입니다 — 콘텐츠 특성(시험대비/회화/문자체계/게임)에 따라 도입부 길이·난이도 곡선은 다르게 가져가되, 유닛 표기·진행률 위치·"연습하기" 버튼 문법·완료 표시 방식은 트랙 전체에서 통일.

### 제안

1. TOPIK II를 **TOPIK I의 Practice 탭 패턴(섹션별 평평한 목록)에 맞춰 재구성** — 번호+원형 배지 타임라인 제거.
2. **"00·Overview"(스캐폴딩)와 "13·Full mock(planned)" 같은 비기능 항목을 실제 연습 유닛과 시각적으로 명확히 분리**(또는 콘텐츠 준비 전엔 아예 숨김) — 지금처럼 "PRACTICE" 버튼 유닛들 사이에 죽은 항목이 섞여 있으면 사용자가 클릭했다 허탕 치는 경험을 반복함.
3. Basics·Hangul·TOPIK II·Games 전체에 걸쳐 **공용 "유닛 카드" 컴포넌트**(제목·부제·문항수·CTA 버튼 문법 통일) 도입 검토 — 트랙별 콘텐츠 차이(문자체계 vs 시험대비 vs 게임)는 카드 안쪽 내용으로만 표현.

---

## 문제 3 — "Basic info" 온보딩이 TOPIK I 전용으로 갇혀 있고, 편집 가능한 설정 화면이 없음

### 실측 결과 (localStorage 조작으로 직접 재현)

1. **완전히 새 상태(localStorage 비움)로 Hangul을 먼저 열면 — "Basic info" 온보딩이 전혀 안 뜹니다.** Basics를 먼저 열어도 마찬가지. 온보딩은 `hub/app/index.html`(=TOPIK I 앱) 진입 시에만 트리거됩니다.
2. TOPIK I에서 온보딩 4단계(Basic info → 목표 → 모드 → 파트너)를 완주하면 `profile.onboardingDone=true`가 저장되고, 이후 TOPIK I 재방문 시엔 정상적으로 다시 안 뜹니다(이 부분은 실제로 버그 아님 — 재현 안 됨).
3. **하지만 이 프로필을 편집할 방법이 TOPIK I "Me" 탭의 "Redo onboarding" 버튼 하나뿐**입니다 — 개별 항목(모국어만 바꾸기 등)을 고치는 설정 폼이 없고, "다시하기"는 4단계 전체를 처음부터 다시 시킵니다.
4. **Hangul·Basics·TOPIK II엔 "Me"/설정 탭 자체가 없습니다** — 이 트랙들만 쓰는 사용자는 프로필을 만들 수도, 볼 수도, 고칠 수도 없습니다.

즉 Paul이 지적하신 그대로입니다 — "Basic info"는 **jabi 전체의 첫 가입 화면이 아니라 TOPIK I 앱 하나에 우연히 종속된 로컬 온보딩**이고, "학습자 개인 설정에서 변경"할 수 있는 화면은 아예 존재하지 않습니다(전체 재실행만 가능).

### 근거

**학술 근거**
- **Adamczyk & Bailey (2004, CHI)**: 과제 수행 도중(fine breakpoint)의 인터럽션이 과제 경계(coarse breakpoint)에서의 인터럽션보다 재개 지연·좌절감이 유의하게 큼 — **이미 특정 트랙에 진입해 사용 중인 사용자에게 온보딩을 재노출하는 것은 fine breakpoint 인터럽션**에 해당해 인지 비용이 큼. ([CHI 원문 PDF](https://interruptions.net/literature/Adamczyk-CHI04-p271-adamczyk.pdf))
- **Bol et al. (2018, *JCMC*)**: 개인정보 요청은 매번 프라이버시 계산(이익 vs 위험)을 거치며, 불필요하게 반복되는 요청은 신뢰·지각된 이익을 오히려 낮춤. ([Oxford Academic](https://academic.oup.com/jcmc/article/23/6/370/5140170))
- **국내 — Ko & Kim (2025), 「언어 교육 앱에서의 즐거움과 몰입도가 학습 지속성에 미치는 영향」, 산업진흥연구 10(3)**: 듀오링고·말해보카 사용자 185명 조사에서 몰입·즐거움이 학습 지속 의도를 유의하게 예측 — 예상치 못한 흐름 방해가 몰입을 저해한다는 논리적 연결고리로 인용. ([KCI](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003231056))

**업계 참고자료**
- **Nielsen Norman Group, "Mobile-App Onboarding"**: 콘텐츠를 좌우하는 개인화 질문(언어·숙련도 등)은 최초 온보딩에 넣되, 재노출은 오직 '진짜 새로운 기능'이 생겼을 때만, 그것도 건너뛸 수 있게 해야 함. ([NN/g](https://www.nngroup.com/articles/mobile-app-onboarding/))
- **Duolingo의 실제 관행**: 개인화 질문은 계정 생성 직후 **1회만** 등장, 이후 편집은 **별도 설정 화면**에서. ([Growth.design 케이스 스터디](https://growth.design/case-studies/duolingo-user-retention))
- **Progressive Profiling**: 가입 시 모든 정보를 한 번에 요구하지 말고 필요한 시점에 나눠 수집하는 패턴 — jabi.가 지금처럼 "TOPIK 응시 계획" 같은 특정 트랙 전용 질문까지 최초 진입 시 몰아 묻는 대신, 공통 최소 정보(모국어 등)만 가입 시 받고 트랙별 세부 정보는 그 트랙 진입 시 물어보는 방향도 검토 가치 있음. (약한 근거, 방향성 참고용)

### 제안

1. **온보딩을 TOPIK I 코드에서 분리해 hub 레벨(어느 트랙으로 처음 들어오든 공통)로 이동** — 최초 1회만, 트랙 무관하게 노출.
2. **모든 트랙에서 접근 가능한 공용 "설정"(또는 "나") 화면 신설** — 개별 항목(모국어/목표/공부시간 등)을 각각 수정할 수 있는 실제 폼. "전체 다시하기"는 그 화면 안의 부가 옵션으로만 유지.
3. TOPIK 전용 질문("Where you take TOPIK")은 공통 설문에서 분리해, 사용자가 실제로 TOPIK 트랙에 처음 들어갈 때만 물어보는 것도 검토(Progressive Profiling 방향).

---

## 우선순위 제안

| 순위 | 문제 | 근거 강도 | 공수(추정) | 영향 |
|---|---|---|---|---|
| 1 | 온보딩 배치(문제 3) | 학술+업계 근거 확실, 실측 재현 완료 | 중간 | 큼 — 신규 유저 첫인상 전체에 영향 |
| 2 | TOPIK II ≠ TOPIK I 패턴 통일(문제 2) | 학술 근거 확실(일관성 휴리스틱), 실측 완료 | 중간~큼 | 큼 — 매 트랙 전환마다 혼란 |
| 3 | Basics·Hangul PPT식 흐름(문제 1) | 학술 근거 가장 두터움(인지부하·완전학습·스크롤 연구) | 큼 — 렌더러 재설계 | 큼 — 학습 효과 자체에 직결 |

세 문제 다 규모가 있어, Paul 승인 후 각각 별도 스펙 문서로 쪼개 큐잉하는 걸 권장합니다.

## Paul 확인 필요

1. 위 3개 문제 진단·우선순위에 동의하시는지.
2. 문제 1(PPT식 흐름)을 Basics·Hangul **둘 다 동시에** 개편할지, 하나만 먼저 파일럿할지.
3. 문제 2의 "공용 유닛 카드 컴포넌트" 방향(트랙별 세부 카드 유지 vs 완전 공용화)에 대한 선호.
4. 문제 3의 "TOPIK 전용 질문 분리" 여부(공통 온보딩 + 트랙별 후속 질문 vs 지금처럼 한 번에 다 묻기).

승인해 주시면 각 문제별로 구체적 구현 스펙을 작성해 큐잉하겠습니다.
