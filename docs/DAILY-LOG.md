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

### Claude (트랙 UX 개편 제안서 -- 실사용 감사 + 3편 병렬 학술리서치 + 큐 우선순위 재지정)
- Paul이 이전에 정리했다는 UI/UX 개선사항(Basics/Hangul PPT식 흐름, TOPIK II가 TOPIK I과 다른 패턴, Basic info 온보딩 배치)이 왜 반영 안 됐는지 질문 -> DAILY-LOG/큐/PROGRESS/메모리 전수 검색했으나 기록 전무 확인, Cursor에게 지시가 실제로 전달된 적이 없었음을 확인.
- Paul의 메타 질문("Cursor가 지금 하는 작업이 우선순위 맞냐")에 답변: Cursor가 Next(N8/N9/N10 대기 중)를 무시하고 sibling-handoff 어휘 테마팩 체인(advice~warn-caution까지 이어짐)을 계속 돌고 있음을 확인. 큐 규칙에 "Next가 sibling-handoff보다 항상 우선" 명시 추가.
- 로컬 서버로 TOPIK I/TOPIK II/Basics/Hangul/Games 직접 조작하며 실측: (1) Basics 유닛 상세가 SKILL STEPS 라벨(Intro->Teach->Dialogue->Practice->Checkpoint)만 있고 실제로는 전부 한 페이지 긴 스크롤로 렌더링됨 확인 (2) TOPIK I(Practice 탭=평평한 목록) vs TOPIK II(00~13 번호+원형배지 타임라인, 비기능 스캐폴딩 항목 섞임) vs Basics(유사 타임라인) vs Games(개별 카드) 4가지 다른 패턴 확인 (3) localStorage 초기화 후 Hangul/Basics를 먼저 열면 온보딩이 아예 안 뜨고 TOPIK I 진입 시에만 트리거됨 확인, "Me" 탭엔 개별 항목 수정 불가한 "Redo onboarding"(전체 재실행)만 있고 다른 트랙엔 설정 화면 자체가 없음 확인.
- 3개 병렬 리서치 에이전트로 국문+영문+Google Scholar 학술근거 수집: 마이크로러닝/청킹(Sweller CLT, worked-example effect, Bloom mastery learning, Sanchez&Wiley 2009 스크롤연구, 도현미·김민정 2022, 배재홍·신호영 2020) / 온보딩 배치(Adamczyk&Bailey 2004 CHI 인터럽션비용, Bol et al 2018 privacy calculus, Ko&Kim 2025 국내 몰입연구, NN/g, Duolingo 1회성 온보딩 관행) / 트랙간 일관성(Nielsen 휴리스틱#4, SDT 유능감, 이보경·두경일 2015, Kejun Liu 2024, Duolingo 알파벳트랙 패스통합 사례). 각 에이전트 모두 학술근거와 업계참고자료를 명확히 구분하고 근거 얇은 부분 정직하게 고지.
- docs/proposal-ux-overhaul-tracks-ko.md 신규 작성 -- 3개 문제(PPT흐름 부재/트랙간 불일치/온보딩 배치) 각각 실측+학술근거+구체 제안, 우선순위표, Paul 확인 필요 4개 질문. Paul 승인 전까지 스펙/큐잉 안 함(문서만).
- hub/app/** 미편집(리뷰만).

### Claude (채점 원칙 개정 -- AI 참고점수 노출 + N10 검증데이터 파이프라인 스펙)
- Paul 피드백: "AI는 절대 채점 금지" 원칙이 과했다는 지적 -- 조형익(2025) 논문의 실제 결론은 "AI 단독 즉시배포 시기상조, AI보조+검증 모델"이었지 영구 금지가 아니었음. jabi의 계획(학습자 실제 TOPIK 성적 제공 -> 지속 검증)은 그 논문의 전문가패널 대조보다 강한 검증 기준(실제 시험결과)이라는 점에 동의, 원칙 개정.
- AskUserQuestion 2문항으로 확정: (1) AI 참고점수를 N9부터 바로 노출, 규칙기반 점수 옆에 별도 표시 (2) 실제 TOPIK 성적 제출(검증데이터 핵심) 기능도 지금 같이 스펙 작성.
- spec-topik2-ai-coaching-layer-ko.md 개정: TOOL 스키마에 languageScore(0~100, 언어축 한정 AI 참고점수) 추가, UI에 "언어 82 · AI 참고 76" 식 별도 배지 표시(규칙기반 값은 덮어쓰지 않음), "AI 채점 절대금지" 문구를 "AI 참고점수는 노출하되 검증 전까지 대표점수는 규칙기반 유지"로 수정.
- spec-topik2-calibration-data-ko.md 신규 작성(N10) -- 계정 없이 localStorage 익명 uid로 다회 기록 연결, 코칭 로그(숫자만, 원문 텍스트 미저장 -- 프라이버시 최소화 설계), 실제 TOPIK 성적 제출 폼+API(api/topik2-official-score.js) 신규. 분석·재보정 로직은 이번 스코프 아님(로깅 파이프라인만) -- 열린 질문(보존기간·개인정보처리방침·원문저장여부·재보정 시점)은 Paul 확인 필요로 명시.
- cursor-work-queue-ko.md Next에 N10 큐잉(N9 이후 착수 권장, 차단 없음).
- 링크 안 열리는 문제 확인: 이 세션 작업 디렉터리가 paul-intro가 아니라 DebateChamber라 상대경로 링크가 깨짐 -- 이후 절대경로로 안내하기로.
- hub/app/**, api/** 미편집.

### Claude (callClaude 오류 추가 정정 + N9 -- TOPIK2 AI 코칭 레이어 스펙 + 큐잉)
- 추가 정정: "jabi의 CLAUDE.md에 이미 있는 레벨별 코칭 차등"이라는 서술도 callClaude와 같은 원인(DebateChamber CLAUDE.md 오염)으로 확인 -- paul-intro 저장소엔 CLAUDE.md 파일 자체가 없고 topik2.js에 level 분기 코드도 없음(grep 확인). research-genai-korean-writing-pedagogy-ko.md, research-ai-korean-writing-synthesis-ko.md 2건 추가 정정.
- Paul에게 AskUserQuestion 4문항으로 확인: (1) 범위 Q51~54 전체 (2) 인프라 서버리스 프록시 (3) Tier 2는 나중 (4) 최소 버전(문법·표현 코칭)부터.
- 인프라 조사 중 이 저장소(paul-intro)에 이미 실사용 중인 Anthropic API 서버리스 패턴 발견: api/_polish.js·api/polish-thought.js·api/generate-followup.js -- claude-sonnet-5 모델, tool-use 구조화출력, 키 부재시 조용한 폴백, 재시도 1회. 새 인프라 설계 불필요, 기존 패턴 그대로 재사용 가능(ANTHROPIC_API_KEY도 이미 설정돼 있을 가능성 높음).
- docs/spec-topik2-ai-coaching-layer-ko.md 신규 작성 -- api/topik2-coach.js 초안 코드(기존 패턴 그대로 복제) + topik2.js 변경 지점 + 회귀체크리스트. write-blank(51/52)·write-short(53)·write-essay(54) 전 유형 커버. AI는 코칭·설명 전용이며 표시 점수(trait bar)에 영향 금지 명시 -- 조형익(2025) 논문의 "최신모델도 AI단독채점 신뢰도 무의미" 발견을 근거로 인용.
- cursor-work-queue-ko.md Next에 N9 큐잉(차단 없음, Paul 승인 완료 명시, N8과 독립).
- hub/app/**, api/** 미편집 -- 실제 구현은 Cursor 담당.

### Claude (한국어 AI 논문 모음 10편 병렬 리서치 + callClaude 오류 정정 + 마스터 종합)
- Paul 지시: "한국어 AI 논문 모음" 폴더 잔여 10편(개인화복습·작문피드백·문법오류교정·초급말하기·읽기자료·프랑스인발음·세종AI선생님·논설문AI프로그램·쓰기평가활용·에세이자동채점XAI, 총 226~282쪽)을 병렬 에이전트 10개로 각각 리서치 -> research-*-ko.md 작성 -> 카테고리별 폴더(쓰기평가-채점/쓰기교수법-피드백/챗봇-수업설계/개인화-복습시스템/읽기/문법오류교정-NLP/발음-음성학) 이동. 전부 완료.
- 리서치 중 중대 오류 발견·정정: 오늘 작성한 문서 다수가 "jabi가 이미 규칙기반+생성형 AI(`callClaude`) 하이브리드 코칭을 구현 중"이라고 서술했는데, 이는 이 세션에 함께 떠 있던 완전히 무관한 다른 프로젝트(DebateChamber)의 실제 함수명을 jabi 코드로 착각해 끌어온 오류. hub/app/** 전수 grep으로 재확인 -> jabi에는 생성형 AI 호출이 전혀 없음(topik2.js는 "AI writing coach not wired for this unit yet" 플레이스홀더만 존재). 9개 문서(신규 6개+기존 3개) 전부 "이미 구현 중" -> "아직 없음, 다음에 만들어야 할 기능"으로 정정. N8(54번 trait 재조정) 스펙 자체는 실제 코드를 직접 읽고 검증한 내용이라 이 오류와 무관, 그대로 유효.
- docs/research-ai-korean-education-master-synthesis-ko.md 신규 작성 -- 13편(기존 3편+신규 10편) 전체를 Tier 1(TOPIK2 AI 코칭 레이어 신규 구축 등 최우선)/Tier 2(개인화 시작점·조사오류 우선순위화·읽기자료 파이프라인)/Tier 3(AI 대화연습·AI단독채점·발음평가·자체GEC모델 학습은 지금 하지 말 것)로 우선순위화.
- 핵심 결론: jabi는 여러 논문이 공통 제안하는 "규칙기반+생성형 AI" 하이브리드의 절반(규칙기반)만 갖고 있음 -- 나머지 절반(AI 코칭 레이어) 신규 구축이 최우선 제안. 단 조형익(2025)이 GPT-5/Gemini2.5 최신모델로도 AI단독채점 신뢰도가 통계적으로 무의미함을 실증 -> "AI 코칭 추가"와 "AI가 점수를 매기게 하는 것"은 다른 일이라는 경고를 명시.
- 작업 중 발견: 병렬 에이전트 중 최소 3개가 공용 스크래치패드 파일명(`paper.txt`) 충돌로 다른 논문 텍스트가 잠깐 섞였으나 전부 자체 감지해 고유 파일명으로 재추출·정정함(각 문서에 이슈 기록).
- hub/app/** 미편집, 실제 코드 변경 없음.

### Claude (박정아(2024) 규칙기반 챗봇 논문 정독 + 3편 종합 -- 구형 기술을 Claude 기준으로 재정의)
- Paul이 "한국어 AI 논문 모음" 폴더 마지막 자료(경희대 박사논문, 160쪽) 전달 + "구형 기술 기준 논문을 현재 Claude Sonnet/Fable 기준으로 재정의하라" 지시.
- 실험에 쓰인 "AI 챗봇"이 카카오챗봇빌더/단비AI로 만든 규칙기반(if/then, 시나리오 트리) 챗봇임을 확인 -- ChatGPT는 이론적 배경에만 인용, 실험 미사용. 지금까지 읽은 3편 중 가장 구형 기술.
- 핵심 발견: 규칙기반 챗봇은 "문제 이해·분석"·"글의 구성" 지도를 못 해서 학습자들이 이 부분은 교사 도움을 더 크게 인식(통계적으로 유의) -- 시나리오 밖 자연어 이해가 아키텍처상 불가능했기 때문. Sonnet 기준으로는 이미 해소되는 한계이며, jabi의 callClaude 기반 코칭 힌트/첨삭이 정확히 이 영역을 커버 중임을 확인.
- 저자가 결론에서 직접 예언한 "규칙기반의 일관성 + 생성형의 유연성 결합" 미래 과제가, jabi의 실제 아키텍처(휴리스틱 채점 + callClaude 코칭)와 정확히 일치함을 확인 -- 논문 저자가 못 해본 걸 jabi는 이미 구현 중.
- docs/research-rulebased-chatbot-writing-effect-ko.md(개별 요약) + docs/research-ai-korean-writing-synthesis-ko.md(3편 종합 + 6개 항목별 "구형 한계 -> Claude 재정의") 신규 작성.
- 반영 후보 4건 정리(단계적 프롬프트 UX, AI 프롬프트에 배점표 직접 반영, 오류 명시 지적 프롬프트 원칙, Fable 캐릭터 코칭 멘트 실험) -- Paul 확인 전까지 스펙/큐잉 보류.
- hub/app/** 미편집.

### Claude (이지은(2025) 생성형 AI 한국어 쓰기 교수법 논문 -- 정독 + 반영 후보 정리)
- Paul이 목원대 석사논문(생성형 AI를 활용한 한국어 학습 방법 연구, 중급 표현 교육) PDF 전달. fitz로 94쪽 전체 추출 후 정독.
- "초안은 AI 없이 직접, 피드백만 AI로" 원칙이 jabi draft-write-54.json의 "Early tips must not leak a full model essay" 설계와 이미 일치함을 확인(간접 검증).
- 단계적(progressive) 프롬프트(문법->구조->표현->어휘->뉘앙스 순으로 나눠 요청)가 일괄 수정 요청보다 학습효과 높다는 실증 사례 확인.
- AI 피드백 자체도 비문법적 수정을 내놓은 사례 존재(교사 최종 개입 필수) -- jabi가 AI/Lemon 단독채점 대신 규칙기반 formative로 설계한 방향과 부합.
- 설문: 쓰기 최대 난점은 문법(23%)이 아니라 분량 완성(40%)·장르별 구조(33%) -- 코칭 힌트가 문법 편중이면 재고 필요.
- ChatGPT가 자발 제안한 오답노트형 워크시트(빈칸고치기+어휘+O/X퀴즈+정답지) 패턴 확인 -- jabi 복습 워크시트 기능 아이디어로 기록.
- 말하기: AI가 오류를 맥락으로 관대하게 이해해버리면 학습자가 자기 오류를 인지 못하는 역설 확인 -- 향후 jabi AI 대화연습 기능 설계 시 유의사항.
- 초급 부적합/중급 이상 대상이라는 결론이 jabi 레벨별 코칭 차등(초급 자동힌트+자동첨삭/중급 필요시힌트/고급 필요시첨삭) 설계와 방향 일치.
- docs/research-genai-korean-writing-pedagogy-ko.md 신규 작성 + 반영 후보 3건(분량/구조 힌트 강화, 단계적 프롬프트 UX, 오답노트 워크시트) 정리 -- Paul 확인 전까지 스펙/큐잉 안 함.
- hub/app/** 미편집.

### Claude (자동 검토 사이클 -- 54번 trait 가중치 재조정 스펙 · N8 큐잉)
- 큐/PROGRESS/DAILY-LOG/최근 커밋 리뷰: Cursor의 테마 스윕 체인이 advice-counsel(ThemeSm54d)에서 닫히고 후속 sibling 슬라이스가 없음 확인. Next 테이블엔 Paul 게이트 걸린 항목 2개만 남아 실질 공백.
- Paul이 "9항목 구조 상세히 설명해봐" 질문 후 "좋아 반영해" 승인 -> 허영수(2024) 9항목 배점을 jabi 3-trait(내용/조직/언어)에 정확히 환산.
- 계산 결과: 논설문(54번)은 논문상 "주장의 설득력"+"내용의 충실성"이 사실상 전부 내용(66점), "표현의 적절성"(34점) 중 응집성(15)=조직, 격식체+유창성(19)=언어 -- 즉 정확한 가중치는 content 0.66 / organization 0.15 / language 0.19 (현재 0.35/0.30/0.35와 크게 어긋남).
- 격식체(casualOnly) 페널티 상수(langFormal=24)는 그대로 둬도 되는지 직접 계산 검증 -- language 가중치를 0.19로 낮추면 순수 격식체 위반의 총점 손실이 약 5~8점으로 논문 기준(9~10점 상한) 안에 자동으로 들어옴. 코드 상수 변경 불필요, JSON 가중치만 변경하면 됨.
- docs/spec-topik2-write54-trait-reweight-ko.md 신규 작성(계산 전 과정 + 구현 체크리스트 + 회귀 확인 방법, Q53은 변경 불필요 이유 포함). cursor-work-queue-ko.md Next에 N8 행 추가(차단 없음, Paul 승인 완료 명시).
- hub/app/** 미편집(Hard stop 준수) -- 실제 JSON/코드 변경은 Cursor 담당.

### Claude (허영수(2024) 박사논문 원문 확보 -- 캘리브레이션 시리즈 결정적 근거)
- Paul이 RISS에서 놓쳤던 허영수 연세대 박사논문(2024, 고급 학습자 쓰기 평가 준거 개발) 원문 PDF를 직접 구해서 전달. poppler 없어서 PyMuPDF(fitz)로 235쪽 전체 텍스트 추출 후 정독.
- 핵심 확인: "표현 양식의 적절성"(격식체) = 논설문/설명문 둘 다 100점 중 11점짜리 항목, 구어체 종결어미(-아요) 끝까지 써도 최저 2/11점 -- 순수 격식체 위반 최대 손실 100점 중 9~10점. "-습니다"는 항상 적절. 우리가 사람 피드백만으로 수렴했던 "격식체가 language 축 전체를 좌우하면 안 된다" 결론이 실증 데이터로 교차검증됨.
- 그 외: 논설문/설명문 모두 3영역x9항목 구조(우리 3축과 대응), 장르간 상관 .543(53/54 별도 캘리브레이션이 타당했음 재확인), "전부 단문이면 문장유창성 만점 불가" 확정 규칙, "독자에 대한 고려"(11점) -- 우리가 안 다루던 항목.
- docs/research-heo2024-writing-rubric-ko.md 신규 작성(전체 배점표) + docs/topik2-writing-axis-mapping-ko.md에 요약 섹션 추가.
- 다음 논의: topik2.js 채점 로직을 이 논문의 9항목 구조로 고도화할지 -- 스코프 커서 Paul과 별도 논의 필요.

### Claude (54번 B 최종 재조정 -- 캘리브레이션 마무리)
- Paul: B(82)도 "완벽기준 재보정" 원칙으로 다시 올려야 하냐는 질문에 Y 답변.
- B의 "생각합니다" 반복·나열식 내용도 상상 속 더 나은 버전과의 비교였을 뿐, 실제 결함(요구사항누락/문체전환/의미방해오류)은 없음 -- 82->89로 재조정, D(90)에 근접.
- docs/topik2-write54-calibration-samples-ko.md에 "B 재조정" 섹션 + 전체 최종 스프레드 정리: A62 < E76 < B89 ~ D90 < C93 < F96 (54번), G65 < H92 ~ I96 (53번). "진짜 결함 있는 경우(A/E)"와 "결함 없이 잘 쓴 경우"사이 뚜렷한 단절 확인 -- 이번 라운드로 캘리브레이션 사이클 일단락.

### Claude (RISS 검색 -- 절반의 성공)
- Paul: riss.kr도 검색해보라는 지시.
- 허영수 박사논문(연세대 2024) 원문은 이번에도 확보 실패(control_no 잘못 짚어서 다른 논문 열림) -- 정직하게 실패로 기록.
- 대신 검색 요약에서 핵심 결론 확보: 논설문/설명문 장르가 다르면 학습자 쓰기능력도 달라진다는 것 확인 -- 우리가 54번(논설문형)/53번(설명문형)을 별도 배치로 나눠 캘리브레이션한 게 우연히 맞는 접근이었음을 뒷받침.
- 부산물: 잘못 연 논문(고려대 이지영 2012)에서 실제 한국 학교현장 6개 분석적 평가항목 확인 -- 주장일관성/내용타당성/근거풍부성/구조성/문단간유기성/문단내응집성. 우리 3축보다 세분화된 예시, 판단문구 어휘로 참고 가능.
- docs/topik2-writing-axis-mapping-ko.md에 "RISS 검색 결과" 섹션 추가(실패도 정직하게 기록). Paul에게 정확한 RISS 링크 요청.

### Claude (Paul의 KCI 논문 목록 확인 + 조사오류 논문 초록 확보)
- Paul이 Claude 웹에서 KCI 검색해 논문 9건 목록 정리해서 보내줌. 그중 가장 관련 높은 2건(ChatGPT+베트남학습자 최신논문, 시험답안쓰기 논문) 추가 검색.
- 결정적 성과: 조사 오류 화석화 논문 KCI 상세페이지를 article ID로 직접 WebFetch해서 이번엔 초록 전체 확보(원혜영, 우리말연구 44호 2016) -- 고급학습자 7명 8개시기 56편 종단분석, 총오류523개 중 50.8%문법·그중55.2%조사오류, 최빈출이 이/가·을/를(제일 기초조사), 학습자별 반복적 화석화 패턴 확인. 이전엔 제목만 있었는데 이번엔 구체 수치까지 확보돼서 "반복조사오류 관대화" 원칙이 훨씬 단단해짐.
- 이정연 "외국인 유학생 시험 답안 쓰기 교육 효과 연구" 확인 -- 내용·구성·표현 3차원 평가 명시, 우리 3축 구조가 한국어 학계에서도 쓰이는 프레임이라는 한국어 맥락 첫 근거 확보(지금까지 IELTS 영어자료로만 정당화했었음).
- 박영주 ChatGPT-베트남학습자 논문 정확히는 못 찾음(너무 최신) -- 대신 유사한 중국인고급학습자 ChatGPT 연구 확인, AI피드백-한국어쓰기 연구가 활발히 나오는 중임은 확인.
- 교훈: KCI 검색 스니펫만 보지 말고 article ID로 상세페이지 직접 WebFetch하면 로그인 없이도 초록까지 보이는 경우 있음 -- 앞으로 기본 절차로 채택.
- docs/topik2-writing-axis-mapping-ko.md에 "추가 리서치" 섹션 반영.

### Claude (근본 원인 발견 -- "100점" 기준점 자체가 잘못됨)
- Paul: G/H/I 전부 더 올려야 함(G->65, H->90+, I->95+) + "너는 지금 외국인 쓰기 수준을 과대평가하고 있어" -- 방향이 헷갈려서(점수는 올리라면서 과대평가라니) AskUserQuestion으로 확인.
- 확인 결과: "완벽(100점)의 기준이 너무 높다"는 뜻 -- 내 머릿속 100점이 원어민 전문작가 수준으로 고정돼 있어서, H/I처럼 실제로 흠 없는 글도 상상 속 상한선과 비교해 계속 깎고 있었던 것. 이게 라운드1부터 지금까지 매번 "너무 낮다" 피드백 받은 근본 원인이었음(하나로 수렴).
- 새 기준점 확정: 100점=TOPIK 학습자가 현실적으로 도달 가능한 최고 수준(6급=원어민급으로 이미 정의됨), 원어민 전문작가 수준 아님. 실제 결함(요구사항누락/문체전환/의미방해오류)만 감점, "더 잘 쓸 수 있었을 상상 속 버전"과 비교 감점 금지.
- G 56->65, H 80->92, I 92->96로 재조정. docs/topik2-writing-axis-mapping-ko.md에 "핵심 교훈" 섹션으로 이 원칙을 전체 채점의 기본값으로 명시.
- 54번 세트(특히 B=82)도 같은 기준 재검토 필요한지 Paul 확인 대기.

### Claude (쓰기 53번 캘리브레이션 배치 -- 문항유형 확장)
- Paul: KCI/DBpia 계정은 만드는 중, 나중에 다시 물어보라고 함(대기). 새 학습자 평가 검토 요청.
- 54번(논술)만 계속 하는 대신 53번(200-300자 단문, 그래프 설명형)으로 확장 -- 실제 뱅크 draft-write-53.json 문제(운동 비율 그래프) 재사용, 가중치도 다름(내용0.4/조직0.3/언어0.3, 54번은 0.35/0.30/0.35).
- 가상학생 G(낮음,56)/H(중간,80)/I(높음,92) 작성 -- 54번에서 확정한 최종 원칙(문체일관성 중시, 의미방해없는 오류는 관대) 그대로 적용해서 문항유형이 달라도 일관되게 작동하는지 확인.
- G는 "가장 큰 변화 시점 언급" 요구조건을 실질적으로 누락한 걸 명확한 내용축 감점 사유로 처리 -- 이 판단이 맞는지 Paul 확인 요청.
- docs/topik2-write53-calibration-samples-ko.md 신규 작성(54번 문서와 별개 파일, 54번 결과와 비교표 포함). 53번 점수대가 54번과 비슷한 위치에 떨어져서 원칙 일관성 확인됨.

### Claude (쓰기 캘리브레이션 6명 통합 재검토 + 리서치 방법론 정리)
- Paul 요청: 유효하면 A-F 전체를 최종 원칙으로 다시 보고, 리서치를 어디서 어떻게 했는지 정리.
- A/B/C를 최종 원칙(반복 문법오류 관대·의미전달 방해 여부 중심)으로 재검토 -- A/B는 원래 문제가 "문법패턴 반복"이 아니라 전반적 얕음/어휘반복이라 원칙변경 영향 작음(소폭 상향), C는 F와 같은 고득점 클러스터로 재평가.
- 최종 6명 통합: A 62 / B 82 / E 76 / D 90 / C 93 / F 96 -- 낮음/중간 뚜렷히 구분, 진짜 잘 쓴 3명(C·D·F)은 클러스터로 묶어 Paul 판단과 일치시킴.
- docs/topik2-write54-calibration-samples-ko.md에 "전체 재검토 -- 6명 통합" 섹션 추가.
- 리서치 방법론 정리: docs/topik2-writing-axis-mapping-ko.md에 검색/fetch 12건 전부를 표로 -- 검색어, 도구, 알아낸것, 접근수준(원문 읽음 vs 제목만 vs 접근실패)을 투명하게 기록. 핵심 교훈 명시: 한국어 논문은 전부 유료라 제목만 확인 가능했고, 반대로 자료 많은 IELTS를 그대로 이식했다가(9번 항목, 산발적/체계적 원칙) 이번 라운드에 틀린 결론으로 이어졌던 것이 핵심 실수 -- 앞으로는 타언어 자료는 구조 참고용으로만, 한국어 자체 근거(제목만이라도) 우선.
- Paul 확인 대기.

### Claude ("체계적 오류=더 감점" 원칙 철회 -- 캘리브레이션 큰 수정)
- Paul 강한 피드백: 산발적/체계적 오류 구분 자체가 거꾸로일 수 있다 -- 반복오류가 오히려 명확한 재학습 대상이지 나쁜 신호가 아님. D의 예시 오류는 모국어화자도 흔히 씀. D 78점은 심하게 낮음(본인이 대학에서 중국어모국어 4학년 가르치는데 사전없이 D 수준 쓰는 학생 3% 미만 -- 90점 근처가 맞음). E는 70대후반~80대초반. F는 모국어화자 중에서도 뛰어난 수준. 총평: 외국인 학습자 실제 능력/오류패턴에 대한 이해가 부족하니 심도있게 재조사하라는 직접 지적.
- 재조사: TOPIK 6급 자체가 "원어민에 가까운 수준"으로 정의됨 확인. 결정적으로 한국어 학습자(고급 단계 포함) 조사 오류 화석화가 정상 현상이라는 논문 제목 확인(국립국어원 학습자 말뭉치 연구 계열, 원문 미열람) -- 반복오류=능력부족이라는 전제 자체가 한국어 L2에는 안 맞음. 영어 SLA CAF 프레임워크도 오류유형별 심각도 비교가 "여전히 정의하기 어렵다"고 스스로 인정 -- 지난 라운드에 IELTS 수험사이트 요약을 과신했던 것으로 판단.
- 원칙 철회: "반복 오류=감점" 논리 폐기. 새 기준=의미전달 방해 여부. 문체 불안정(격식<->반말 전환)은 별개 문제로 유지(의미전달 자체를 흔듦). Paul의 실제 강의 경험을 논문보다 강한 보정 신호로 채택.
- 재채점: D 78->90, E 53->76, F 91->96. D-E 격차 25점->14점.
- docs/topik2-write54-calibration-samples-ko.md "배치 2 재조정" + docs/topik2-writing-axis-mapping-ko.md "원칙 철회" 섹션 추가. 1라운드 A/B/C(60/81/91)도 이 새 원칙으로 재검토 필요한지 Paul 확인 대기.

### Claude (쓰기 캘리브레이션 배치 2 -- 새 원칙 스트레스테스트)
- Paul 요청: 개정된 기준(일관성 우선·산발적vs체계적 오류)으로 새 학습자 만들어서 다시 채점.
- 새 주제(AI 도구 학교 허용 여부, draft-write-54.json 2번)로 가상학생 D/E/F 작성, 이번엔 의도적으로 다른 오류 유형 배치:
  D=산발적 오류만(조사탈락+이중피동, 서로 다른 유형, 격식체는 끝까지 일관) -> 종합 78
  E=문체 전환형(격식->해요체->반말투->격식으로 문단마다 흔들림, 오류 개수는 적음) -> 종합 53
  F=비정형 구조(질문으로 열고 템플릿 안 따름, 논증은 더 탄탄) -> 종합 91
- 핵심 테스트 결과: D가 E보다 25점 높음 -- 오류 개수는 E가 적어도 문체 비일관(체계적)이 산발적 오류보다 훨씬 나쁜 신호로 처리됨(라운드2~3 원칙대로 작동 확인). F는 정형 템플릿 안 따라도 감점 안 되고 오히려 응집성으로 최고점.
- docs/topik2-write54-calibration-samples-ko.md에 "학습자 배치 2" 섹션 추가. Paul 확인 대기 -- D vs E 25점차, F의 비정형 구조 고득점 처리가 맞는 방향인지.

### Claude (타언어 채점 기준 대조 -- 영어·일본어)
- Paul: 한국어 자료보다 영어/일본어 채점기준 공개자료가 훨씬 많으니 그걸로 루브릭 구조·판단원칙을 보완하라는 지시.
- 리서치: IELTS Writing Task 2 밴드 디스크립터 -- 4개 기준(Task Response/Coherence/Lexical/Grammar) 각 25% 동일비중 공개돼있음. 가장 쓸모있던 원칙 = "고득점도 문법실수 있을수 있지만 산발적(isolated)이면 괜찮고 체계적(systematic) 패턴이면 감점" -- 우리 언어축 판단에 명시 채택.
- 일본어 敬体/常体(です・ます 대 だ・である) -- TOPIK 격식체 문제와 구조 동일. 핵심원칙은 "격식체 자체"보다 "일관성 유지"임을 확인 -- TOPIK54는 장르상 격식체가 관례지만 평가 핵심은 처음부터 끝까지 하나의 문체 유지 여부.
- docs/topik2-writing-axis-mapping-ko.md에 "타언어 채점 기준 대조" 섹션 추가 -- 다음 라운드부터 언어축 서술에 산발적/체계적 오류 구분 + 문체준수/일관성 두 갈래로 명시하기로.
- 다음 라운드 캘리브레이션 샘플 만들 때 이 원칙 적용 예정.

### Claude (쓰기 채점 캘리브레이션 라운드 2 -- 기준점 재조정)
- Paul 회신: 3명 다 점수가 너무 낮다는 판단(A는 60+, B는 80+, C는 90+가 맞다고 봄), A-B 언어축 30점 차도 과하다고 지적, 격식체 감점이 그렇게 커야 하는지 의문 제기 + 리서치 요청.
- 리서치: topiklab.com 등에서 격식체(-습니다) 미준수가 실제 자주 언급되는 감점 요인인 건 확인됨(Paul 의문과 달리 근거 있음) -- 다만 4개 평가 요소 중 "중간" 비중 하나일 뿐, language 축 전체를 좌우할 요인은 아님(1라운드가 과했던 것 확인). 국내 학습자 쓰기 평가 논문(KCI/DBpia)은 제목만 확인, 원문 유료라 못 읽음 -- 정직하게 문서에 명시.
- 방법론 수정: 채점 기준점을 "이상적 원어민 격식체" -> "실제 비원어민 학습자의 현실적 성취"로 이동. 재채점: A 39->60, B 65->81, C 86->91. A-B 언어축 격차 30점->12점으로 축소.
- docs/topik2-write54-calibration-samples-ko.md에 라운드 2 섹션 추가(원본 라운드 1 보존, 델타 명시) + docs/topik2-writing-axis-mapping-ko.md에 캘리브레이션 반영 노트 추가.
- 다음 라운드 회신 양식 넣어둠 -- Paul 확인 대기, 계속 파인튜닝.

### Claude (쓰기 54번 채점 캘리브레이션 샘플 3종)
- Paul 지시: 가상 학습자 만들어서 지금 루브릭 대입 채점 + 근거 설명, Paul이 동의도 회신 후 파인튜닝.
- docs/topik2-write54-calibration-samples-ko.md 작성 -- 같은 주제(재택근무, 기존 draft-write-54.json 재사용)로 낮음/중간/높음 3단계 가상 에세이 직접 작성(약 390/510/640자), 기존 3-trait 루브릭(내용 0.35·조직 0.30·언어 0.35)으로 축별 점수+판단근거 서술, 종합 39/65/86으로 스프레드 확보.
- 가장 뚜렷한 신호로 언어축의 A-B 격차(격식체 준수 여부 하나로 30점) 표시 -- Paul 검증 포인트로 문서에 명시.
- 문서 끝에 Paul 회신 양식(학생별 본인 점수 + 동의도 1~5 + 코멘트) 넣어둠 -- 받으면 다음 3명 다시 만들어서 파인튜닝 예정.
- 이번 턴에 병행 처리한 것 정리: 획순 4건 QA 수정(커밋 완료) + 섹터별 캐릭터/명예의전당 스펙(커밋 완료) + 이 캘리브레이션 문서. TOPIK II를 TOPIK I 형식 기준으로 맞추라는 지시는 SpecPartner 큐 항목에 메모 완료.

### Claude (Paul 육안 QA 반영 + 섹터 캐릭터 스펙)
- Paul이 획순 로스터 스크린샷으로 4개 지적: ㅈ 획순에서 아예 빠짐(캐릭터 파트너 제외와 혼동됐던 부분) -- ㅍ 모양 불명확 -- ㅎ 비율 -- ㄲㄸㅃㅆ 세로 과다.
- scripts/gen-jamo-strokes-gulim.py 수정 후 재생성, PNG 렌더로 4개 전부 직접 확인: ㅈ 실제 데이터 추가(ㅊ의 모자 뺀 부분 재사용) -- ㅍ 바닥바를 올려 발이 보이게(밀폐 상자처럼 안 보이게) -- ㅎ 모자 두께/길이 키움 -- 쌍자음 세로 길이 줄이고 두께 키움(750→300, half_w 상향). jamo-strokes-13/tense.json 갱신, README "다음 단계"에 hangul.js 쪽 배선 지시 작성(ROSTER_13을 파트너선택용/획순연습용 분리 필요 -- 안 그러면 ㅈ가 캐릭터 선택 화면에도 새서 나옴).
- Paul 추가 지시 3건 수신:
  1) 난이도/언어는 최초 로그인 1회만 묻고 이후 설정에서 변경 가능해야 함.
  2) 캐릭터는 섹터(트랙)마다 하나씩 고르고 그 안에서 독립 성장.
  3) "나" 페이지에 명예의 전당 -- 섹터별 키운 캐릭터 전시, 최고 레벨 강조.
  코드 확인 결과 캐릭터 성장 시스템이 지금 TOPIK I 하나에만 있음(한글/기초/TOPIK II엔 없음) -- 리팩터가 아니라 기능 확장. docs/spec-partner-per-sector-hall-of-fame-ko.md로 기획 작성(데이터 모델·화면·단계별 순서).
  4) TOPIK II는 먼저 TOPIK I 형식/UX로 맞추라는 지시도 받음 -- Cursor가 TOPIK II 작업 시 TOPIK I을 기준 삼도록 SpecPartner 항목에 메모.
  5) 쓰기 채점 캘리브레이션용 가상 학습자 샘플 3명 만들어서 정리하는 작업은 별도로 진행 중(다음 커밋).
- ㄴ 캐릭터: Paul이 "확인 없이 계속 만들어서 채워라" 승인 -- 다른 작업 없을 때 Canva 스레드 이어서 진행 예정.
- 조치: 큐 Now에 S1jieut(hangul.js 로스터 분리) + SpecPartner(섹터 캐릭터 스펙) 등록.
- 다음(Cursor): S1jieut 먼저(작음), 이어서 SpecPartner §4 순서대로(TOPIK II partner 시스템 우선).

### Claude (6시간 주기 -- R1 재검증 + R2 발견)
- git pull, 큐/PROGRESS/로그 확인 -- Cursor가 R1 전체 + sibling handoff 5건(stroke tube, basics grammar, theme->game 전 게임, dictation/telephone/scramble money-banking) 전부 완료해놓음.
- R1 4개 항목 로컬 서버로 재검증: Basics 디버그 블록 사라짐, Hangul 종류 필드 사라짐, Hangul 퀴즈 choices KO 정상 출력, Basics 카운터 "6 filled" 정상. D1 디자인도 홈/퀴즈 화면에 실제 반영 확인.
- TOPIK I 리딩 문항 1개 실제 풀이+제출 확인(정상), Games Speed Quiz 1문항 확인(정상).
- 새 발견: TOPIK II 유닛 카드(14개 전부, hub/app/topik2/)에 R1이 고쳤던 것과 같은 계열의 디버그 노출(SECTION/BANK/ITEMS) 그대로 남아있음 -- R1이 Basics만 스코프였어서 놓친 부분. content-interface-review 문서에 §0/§9로 추가.
- 조치: 큐 Now = R2(TOPIK II 디버그 제거)로 등록.
- 다음(Cursor): R2 -- hub/app/topik2/ 렌더러에서 SECTION/BANK/ITEMS 3블록만 제거(NOTE·버튼은 유지).

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
