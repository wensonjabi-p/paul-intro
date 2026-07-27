# 리서치 — 영어 AES/AWE 알고리즘 → jabi TOPIK II 쓰기 (2026-07-26)

> **Paul 지시 (이번 라운드):**  
>
> 1. **더 깊게 조사** (Phase 1 UI 구현 금지 — 연구 문서가 UI 스펙을 자연스럽게 적을 때만 스펙 수준).  
> 2. 학생은 **반드시 점수(형성적)를 봐야 함** — 공식 TOPIK 점수 주장 금지, 연습용 가시 점수는 **필수**.  
> 3. 완벽한 분석보다 **명확한 실수 · 반복 패턴 · 흐름/조직** → 루브릭 정렬 수정.  
> 4. **영어 AES를 1차 딥다이브** 후 TOPIK II(51 vs 53–54)에 매핑.
>
> **상태:** Phase 1.1 **부분점수·다시쓰기 루프** (규칙 가중합 · Lemon/신경망 AES 없음). 캘리브레이션(Phase 2) 대기.  
> **짝 문서:** TOPIK 축 매핑 = [`topik2-writing-axis-mapping-ko.md`](topik2-writing-axis-mapping-ko.md) · 게이트 요약 = [`research-topik2-writing-scoring-papers-ko.md`](research-topik2-writing-scoring-papers-ko.md) · 프롬프트 초안(미구현) = [`research-topik2-writing-grading-ko.md`](research-topik2-writing-grading-ko.md)

---



## 0. Guardrail


| 허용                                     | 금지 (Paul OK 전)                |
| -------------------------------------- | ----------------------------- |
| 이 문서·papers 문서·DAILY-LOG·work-queue 갱신 | “공식 TOPIK 점수” 카피·배점 단정 · Lemon |
| 형성 점수 **표시** (Phase 1 규칙 엔진)           | 신경망 AES / raw LLM 숫자 엔진       |
| Q51–54 **콘텐츠** + trait 가중 JSON         | 캘리브레이션 없는 급수 확정               |
| Claude용 **조사 확인용** 체크리스트               |                              |


**한 줄:** 영어 AES를 깊게 이해한 뒤, jabi는 **보이는 형성 점수 + 층위 피드백**으로 설계한다. **Phase 1.1 = shipped (부분점수·다시쓰기·규칙만).**

---



## A. 영어 AES 알고리즘 지형 (딥)



### A.1 한눈에 보는 계열표


| 계열                        | 대표                                             | 점수 산출 방식                                                                                                                         | 강점                                                                                                     | 실패 모드                                                                         | 출처                                                                                                                                                                                                                                                                                                                     |
| ------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **PEG** (고전 회귀)           | Page (1966~); Measurement Inc. / ERB MI Write  | 인간 채점 답안 1500–2000장으로 **수백 언어 feature(proxes)** 추출 → 다중회귀로 인간 점수 예측. 운영 전 홀드아웃(~300)으로 QWK 등 검증                                  | 인간 합의에 근접하는 **안정적 예측**; 6 traits(아이디어·조직·문체·어휘·문장유창·관습) **트레이트 점수**로 확장 가능; 형성 AWE(MI Write)와 결합 사례 다수 | **내용 의미**보다 표면 proxy; 길이·어휘 난이도 게이밍; 프롬프트별 재학습 필요                             | [MI Gentle Intro PDF](https://www.measurementinc.com/sites/default/files/AGentleIntroductiontoAutomatedScoring.pdf); [ERB PEG](https://www.erblearn.org/blog/peg-scoring-algorithm/); [JITE overview](https://jite.org/documents/Vol2/v2p319-330-30.pdf)                                                               |
| **IEA / LSA**             | Landauer, Foltz, Laham → Pearson WriteToLearn  | 대량 텍스트로 **LSA 의미 공간** 학습 → 학생 에세이를 기채점 에세이와 **의미 유사도**로 비교해 점수·내용 피드백                                                            | **내용/개념** 채점에 강함; PEG의 “스타일만” 한계 보완; WriteToLearn에서 **홀리스틱 + 6 traits + 맞춤법/문법** 동시 UI                 | 어순·논리 전개 약함; 프롬프트·도메인 훈련 자료 의존; trait 인간 합의가 홀리스틱보다 낮을 수 있음                   | [Foltz 2013 PDF](http://wordvec.colorado.edu/papers/Foltz_2013.pdf); [WriteToLearn overview](https://www.pearsonassessments.com/content/dam/school/global/clinical/us/assets/writetolearn/WTL-General-Overview.pdf); [IEA feedback help](https://help.pearsoncmg.com/mfdl/student/Content/write_activity_feedback.htm) |
| **e-rater** (ETS)         | Attali & Burstein; Criterion                   | NLP로 grammar/usage/mechanics/style + **담화 조직·전개** + 어휘·주제어휘 feature → **소수·직관적 feature**로 회귀(v.2). Criterion은 **점수 + 진단 피드백** 분리 | 구성개념(construct)에 맞춘 feature; Criterion과 피드백 공유; TOEFL/GRE 등에서 인간 합의 강함(과제 적합성 전제)                      | 길이 암시 feature 이슈(v.1→v.2에서 보정); 주장의 “사실 정확성”보다 **쓰기 질** 중심; 고부담은 인간+기계 병행이 일반 | [ERIC e-rater v.2](https://files.eric.ed.gov/fulltext/EJ843852.pdf); [ETS e-rater PDF](https://www.ets.org/pdfs/criterion/score-essays-with-erater-engine.pdf); [ets.org/erater](https://www.ets.org/erater.html)                                                                                                      |
| **c-rater** (ETS)         | Leacock & Chodorow                             | **단답·개념 매칭**: 술어구조·형태·동의어·대명사 해소 등. 에세이 e-rater와 **기술 분리**. 문항별 루브릭 개념을 명시                                                       | 빈칸/단답에 적합; string match보다 부분점수·동의어에 강함(~84% 인간 합의 보고)                                                  | 문항마다 **모델 구축 비용**; 장문 논술에는 부적합                                                | [AAAI/FLAIRS c-rater PDF](https://cdn.aaai.org/ocs/122/122-2394-1-PB.pdf); [Automating model building](https://aclanthology.org/W09-2509.pdf)                                                                                                                                                                          |
| **IntelliMetric**         | Vantage Learning                               | 프롬프트별 전문가 채점셋으로 학습; **400+** 의미·통사·담화 feature + 독점 ML; 홀리스틱 + 다차원(내용·조직·문장·관습 등); 이상응답(Legitimatch) 플래그                          | 상용 장수; 즉시 피드백; 다차원 진단                                                                                  | feature **비공개(블랙박스)**; 프롬프트별 재훈련; 투명성·감사(audit) 어려움                           | [RB-929 PDF](https://www.vantage.com/pdfs/research/RB929.pdf); [How it works](http://www.vantagelearning.com/products/intellimetric/intellimetric-how-it-works/)                                                                                                                                                       |
| **Feature / Coh-Metrix류** | Graesser, McNamara 등                           | 응집성·연결어·참조응집·LSA 겹침·통사복잡도·어휘다양성 등 **손 feature** → 회귀/ML                                                                          | **조직·흐름**을 수치화; L2 쓰기 연구에 자주 쓰임; 설명 가능                                                                 | feature만으로 고부담 대체 불가; 과제 유형에 따라 응집 feature 설명력이 달라짐                           | [Coh-Metrix ASU](https://soletlab.asu.edu/coh-metrix/); [Language Testing 2020](https://journals.sagepub.com/doi/10.1177/0265532220929918); [IJCAI 2024 discourse AES](https://www.ijcai.org/proceedings/2024/0791.pdf)                                                                                                |
| **신경망 AES**               | Taghipour & Ng (2016) CNN+LSTM; ASAP 벤치        | end-to-end: 임베딩 → CNN/LSTM → 회귀. 지표 = **QWK**. ASAP ≈ 8 프롬프트, 12,900+ 에세이                                                        | feature 엔지니어링 부담↓; ASAP에서 강한 기준선                                                                       | **설명 어려움**; 길이 편향 잔존; **프롬프트 특화**≫교차 프롬프트; 인간 골드 대량 필요                        | [Taghipour & Ng PDF](https://aclanthology.org/D16-1193.pdf); [Ke & Ng IJCAI 2019 survey](https://www.ijcai.org/proceedings/2019/0879.pdf); [Deep AES survey 2024](https://link.springer.com/article/10.1007/s10462-024-11017-5)                                                                                        |
| **BERT / RoBERTa AES**    | R²BERT; multi-scale BERT; hybrid + handcrafted | 사전학습 LM fine-tune(회귀+랭킹 등); 때로 Coh-Metrix/손 feature 결합                                                                           | ASAP QWK 상위권; trait/멀티태스크 확장                                                                           | 블랙박스; fairness·generalizability 이슈; 교차 프롬프트 약함                                | [arXiv 2401.05655](https://arxiv.org/html/2401.05655v1); [Uto et al. COLING 2020](https://aclanthology.org/); [Ramesh & Sanampudi IJCAI 2024](https://dl.acm.org/doi/10.24963/ijcai.2024/897)                                                                                                                          |
| **LLM AES (프롬프트)**        | GPT-4o 등; 2024–25 평가                           | zero/few-shot, CoT, multi-trait specialization                                                                                   | 루브릭 정렬 **코멘트**에 강함; 소표본에서도 인간 합의 접근 가능(프롬프트 설계 시)                                                      | **하위집단 편향**(L1/ELL); 문법·어휘 과가중 vs 내용; 적대적 길이 복제; 공정성 연구 부족                    | [ACL 2025 WIP PDF](https://aclanthology.org/2025.aimecon-wip.9.pdf); [Huang et al. 2025 review](https://doi.org/10.59863/famj7696); [arXiv 2504.21330](https://arxiv.org/html/2504.21330v1)                                                                                                                            |
| **GEC (점수 아님)**           | GECToR; LanguageTool; Grammarly                | 토큰 태깅/규칙으로 **국소 오류 수정** — AES와 직교                                                                                                | “명확한 실수” 층에 최적; 패턴 집계(조사·시제·맞춤법) 가능                                                                    | 조직·논증·과제수행은 **못 함**; 점수와 혼동하면 안 됨                                             | [GECToR BEA 2020](https://aclanthology.org/2020.bea-1.16.pdf); [grammarly/gector](https://github.com/grammarly/gector)                                                                                                                                                                                                 |




### A.2 Feature 스택 (고전→현대가 공통으로 쓰는 것)

영어 AES가 실제로 “본 축:

1. **길이·유창 proxy** — 단어 수, 문장 수 (PEG다”고 문헌에 반복되는 proxes; 신경망도 암묵 편향 — [Jeon & Strube 2021](https://aclanthology.org/2021.sustainlp-1.4.pdf))
2. **어휘** — 유형/토큰, 저빈도·학술어, 평균 어장
3. **문법·관습** — 오류율, 구두점, 맞춤법 (Criterion/GEC와 공유)
4. **통사** — 문장 길이 분산, 절 복잡도
5. **담화·응집** — 연결어, 참조 응집, 문단 구조 (Coh-Metrix; e-rater organization/development)
6. **내용·논증** — LSA/임베딩 유사도, 프롬프트 키워드, 논증 구조(최신 연구·LLM이 보완)

**시사점:** “완벽한 의미 분석”보다 **트레이트별로 다른 feature**가 정석이다. ASAP++는 content / organization / word choice / sentence fluency / conventions 등을 **별도 인간 점수**로 달아 trait AES를 가능하게 함 ([Mathias & Bhattacharyya LREC 2018](https://aclanthology.org/L18-1187.pdf)).

### A.3 신경망·벤치마크 메모

- **ASAP (Kaggle 2012):** 표준 벤치. 장르 혼재(논증·원문응답·서사). 평가 = **QWK**.
- **ASAP++:** trait 라벨 확장 → “홀리스틱만”보다 **축별 피드백** 연구에 필수.
- **신경망 한계:** 길이 복제·키워드 반복·난해 어휘 삽입에 **취약** ([JEM gaming](https://doi.org/10.1111/jedm.12427); [overstable/oversensitive](https://doi.org/10.5210/dad.2023.101); [LLM AES adversarial](https://aclanthology.org/2025.aimecon-sessions.10.pdf)).
- **LLM:** few-shot CoT로 PEG급 합의에 접근 가능하나 ELL 등 **공정성 잔존**; 인간보다 **문법 정확성**에 가중치가 쏠리는 경향 ([score validity blackbox](https://www.sciencedirect.com/science/article/pii/S2666920X26000305)).



### A.4 상용·에듀텍 패턴 (점수 + 피드백을 어떻게 보여주나)


| 제품                             | 점수 노출                                 | 피드백 층                                                                            | jabi에 쓸 패턴                                        |
| ------------------------------ | ------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Criterion** (ETS)            | e-rater **즉시 점수**                     | 진단 툴로 grammar/usage/mechanics/style/조직·전개 — **점수 엔진과 피드백 모듈 분리**                 | 점수 ≠ 전체 UX. 피드백은 별 파이프                            |
| **WriteToLearn** (Pearson/IEA) | **홀리스틱 = traits 평균**(예: 6점 척도 traits) | 6 traits + 맞춤법/문법 + (KAT) 중복·관련성                                                 | **트레이트 먼저, 합산은 파생**                               |
| **MI Write / PEG**             | traits 1–5 + 합산 6–30                  | trait별 문장 피드백 + 철자/문법 하이라이트                                                      | 형성 루프·다회 수정이 목적                                   |
| **IntelliMetric**              | 홀리스틱 + 도메인                            | 다차원 진단                                                                           | “프롬프트별 학습” 비용 경고                                  |
| **Turnitin Feedback Studio**   | 주로 **교사 루브릭/폼 점수**                    | QuickMarks·유사도·드래프트 코치 — **자동 AES보다 루브릭 UI**                                     | 루브릭 체크리스트 UX 참고                                   |
| **Duolingo English Test**      | 10–160 + **쓰기 서브스코어**                 | 쓰기: content / coherence / vocab·grammar **feature → ML** (수천 전문가 채점 학습). R/L은 규칙 | **서브스코어 공개** + 고부담은 캘리브·공정성 모니터링. jabi는 고부담 주장 금지 |
| **Grammarly / LanguageTool**   | (대개) 점수 없거나 스타일 점수                    | **국소 오류·패턴**                                                                     | GEC 층으로만 차용 — AES 대체 아님                           |


**제품이 Paul 방향과 맞는 공통점:**  
학생에게 **숫자(또는 trait 막대)를 보여주되**, 그 옆에 **고칠 곳(오류) · 왜(패턴) · 어디로(루브릭 축)** 을 같이 둔다. 점수만 단독으로 두지 않는다.

### A.5 Formative vs summative · 점수를 보여줄 때의 동기·게이밍·신뢰

- **형성(AWE):** 즉시 점수+피드백 → 연습량↑, 동기·수정 루프에 유리 (MI Write 현장 연구; meta g≈0.6 ESL 리뷰류). **교사 대체 아님**.
- **총괄(고부담):** 인간 이중채점·이상응답 플래그·공정성 모니터링이 전제 (DET/ETS). jabi **아님**.
- **점수 노출 리스크:**  
  - 길이·키워드·반복으로 **점수만 올리는 게이밍**  
  - 표면 오류만 고쳐 **조직은 방치**  
  - 점수를 “실력 확정”으로 오인 → 과신
- **완화(문헌·제품 합의):**  
  1. **트레이트 점수**를 합산보다 크게 보이게  
  2. 점수 옆에 **근거 체크리스트 / 오류 하이라이트**  
  3. 명시적 고지: *연습용 · 공식 TOPIK 아님 · 오차 있음*  
  4. 이상 패턴(복붙·과도한 반복·분량만 채움) **감점 또는 플래그**  
  5. 다회 제출 시 “점수만 +1”보다 **약한 축 개선**을 강조



### A.6 GEC vs 홀리스틱 AES — 제품을 어떻게 합치나

```
[학생 초안]
    │
    ├─(1) GEC / 규칙 검사 → 명확한 실수 하이라이트 + 오류 유형 집계(패턴)
    ├─(2) 담화·조직 휴리스틱 / Coh-Metrix류 → 흐름·연결어·문단
    ├─(3) 과제·내용 체크 (키워드·필수 항목 / c-rater류) → 루브릭 “내용”
    └─(4) 점수기: trait 가중 합 또는 소형 모델 → 가시 형성 점수 + disclaimer
```

영어 상용(Criterion, WriteToLearn, MI Write)은 대체로 **(4)와 (1)을 분리**한다. jabi도 동일하게: **GEC≠점수**, **점수는 루브릭 축의 요약**.

### A.7 Trait vs holistic


|         | Holistic         | Trait (analytic)                          |
| ------- | ---------------- | ----------------------------------------- |
| 출력      | 단일 점수            | 축별 점수(+합산)                                |
| 학습 효과   | “몇 점?”에만 집착하기 쉬움 | **어디를 고칠지** 안내                            |
| 인간 신뢰도  | 보통 trait보다 높음    | trait 간 상관↑, 합의↓ 가능 (WriteToLearn 문서도 인정) |
| jabi 권고 | **합산은 보여주되 2순위** | TOPIK 3축을 trait로 **1순위**                  |




### A.8 리스크 요약 (L2·편향·과신)

- **L2:** 기계가 문법 오류에 과민 → 내용 좋은 L2 답안이 저평가될 수 있음 (LLM AES 연구).
- **편향:** L1/인구통계 추론 → 점수 오차 확대 가능.
- **과신:** 교사/공식 채점 대체로 오인.
- **적대:** 길이 복제·키워드 나열 (현재 jabi softKeywords도 동일 위험).

---



## B. Paul이 원하는 제품 패턴 → jabi 권장 아키텍처



### B.1 목표 한 줄

> **보이는 형성 점수** + **(1) 명확한 실수 (2) 반복 패턴 (3) 흐름/조직 (4) 선택적 루브릭 체크리스트** — 완벽한 의미 분석·공식 TOPIK 점수 **아님**.



### B.2 점수 표시 (책임 있는 imperfect score)


| 요소      | 권장                                                                                             | 이유                           |
| ------- | ---------------------------------------------------------------------------------------------- | ---------------------------- |
| 스케일     | **연습 점수 0–100** *또는* 축별 0–5 + 합산(WriteToLearn/MI Write식). TOPIK 배점(51=10 …)을 **그대로 흉내 내지 말 것** | 공식 배점과 시각적으로 분리              |
| 구성      | **3 trait 필수 표시:** 내용·과제 / 전개·조직 / 언어 사용 → 합산은 가중 평균(예: 54는 언어 비중↑)                            | TOPIK 공개 3축과 정렬; trait-first |
| 고지 (항상) | 「연습용 형성 피드백 · **공식 TOPIK 점수 아님** · 오차·누락 가능 · 수정 나침반으로 쓰세요」                                    | formative framing            |
| 신뢰 신호   | “근거 N개 충족 / 미충족”, “감지된 반복 오류 K종”을 점수 **아래**에                                                   | 블랙박스 숫자 방지                   |
| 불확실     | 규칙·모델 신뢰 낮으면 점수 옆 **「참고」** 배지 또는 구간(예: 62±8) — 구현 Phase는 Paul OK 후                             | imperfect를 정직하게              |


**어떻게 불완전 점수를 책임 있게 보여주나 (연구 권고):**

1. **합산보다 trait를 먼저** 읽히게 (막대 3개 > 큰 원 숫자 1개).
2. 점수 산출식을 **사람이 읽을 수 있게** (초기: 체크리스트·분량·격식·오류율 가중합).
3. “급수 확정 / 합격” **카피 금지**.
4. 게이밍 탐지 시 점수 **동결 또는 감점** + “분량만 늘리기 / 같은 문장 반복” 메시지.
5. 다회 제출 비교: Δ총점과 함께 **어느 trait가 올랐는지**.



### B.3 피드백 4층


| 층                | 내용                                       | 영어 대응                                         | TOPIK 매핑         |
| ---------------- | ---------------------------------------- | --------------------------------------------- | ---------------- |
| **1. 명확한 실수**    | 맞춤법·조사·시제·격식체 이탈·문장 부호 — 하이라이트 + 짧은 수정 예 | GECToR / LanguageTool / Criterion diagnostics | 언어 사용            |
| **2. 반복 패턴**     | 같은 오류 유형 ≥2회 → “조사 누락이 3번” 식 **패턴 카드**   | Grammarly Insights류; 교사 QuickMark 패턴          | 언어 + 수정 우선순위     |
| **3. 흐름/조직**     | 문단·연결어·도입-전개-마무리·그래프 항목 누락               | Coh-Metrix connectives; e-rater org/dev       | 전개 구조 (특히 53–54) |
| **4. 루브릭 체크리스트** | 문항 JSON `checklist` + 축별 ○/△/×           | Turnitin rubric / ASAP++ traits               | 내용·과제            |




### B.4 문항 유형별 (51 fill-in vs 53–54 essay)


| 문항        | 영어 대응                     | 점수                                       | 피드백 초점                            |
| --------- | ------------------------- | ---------------------------------------- | --------------------------------- |
| **51–52** | **c-rater / cloze**       | 정답 근접도 0–100 (동의어 사전·부분점수). 맞으면 100에 가깝게 | 명확한 형태·의미 실수. 긴 에세이 AES **금지**    |
| **53**    | short constructed + trait | trait 3축 → 합산. 분량 200–300자 밴드            | 자료 항목 누락(내용) · 설명 순서(조직) · 격식(언어) |
| **54**    | essay AES + GEC           | 동일 3축, 언어·논증 비중↑. 600–700자 밴드            | 주장-근거-결론 · 담화 표지 · 반복 문법 패턴       |




### B.5 지금 만들지 말 것 (What NOT first)

1. **트레이트·근거 없는 블랙박스 단일 숫자** (IntelliMetric식 불투명 / raw LLM “72점”).
2. **캘리브레이션·골드셋 없는** “공식 TOPIK 환산”.
3. **Lemon / 유료 API** 채점.
4. 완벽한 의미·논리 검증기 (과잉 분석 — Paul 방향과 반대).
5. ASAP 영어 모델 그대로 한국어에 이식 (언어·루브릭 불일치).



### B.6 현재 stub과의 관계

`topik2.js` Phase 1.1: Q51–52 **퍼지 부분점수**(exact/near/stem/honorific/meaningful) → 중위 형성 점수; Q53–54 분량·격식·softKeywords·checklist **연속 trait** → 합산 0–100 + 4층 피드백. CTA「다시 쓰고 제출」·시도 최근/최고. disclaimer 고정. Lemon/신경망 **없음**.

---



## C. 단계 계획 (갱신 — 점수 노출 반영)

이전 papers 문서 Phase 1의 “점수 숫자 없음”은 **Paul의 새 지시와 충돌 → 폐기**. 아래로 교체.


| Phase      | 이름                     | 범위                                                           | 점수                          | 기술                               | Paul 게이트          |
| ---------- | ---------------------- | ------------------------------------------------------------ | --------------------------- | -------------------------------- | ----------------- |
| **R**      | Research               | 영어 AES 딥다이브 + 본 문서                                           | —                           | 문서만                              | 완료                 |
| **0**      | Stub 유지                | 콘텐츠·투명 규칙                                                    | 미표시 가능                      | 현행 `acceptedAnswers` / checklist | 콘텐츠 OK            |
| **1**      | Trait+GEC식 + **보인 점수** | 51–52 부분점수; 53–54 3축 가시 점수+4층 피드백(규칙·사전·휴리스틱). disclaimer 고정 | **필수 표시** (형성)              | 설명 가능한 가중합. 한국어 GEC는 규칙/사전 우선    | **완료 (UI shipped)** |
| **2**      | Calibration            | Paul/교사 샘플 채점셋으로 가중·임계값 조정; 게이밍 테스트                          | 동일 UI, 숫자만 보정               | QWK·축별 합의 목표(내부)                 | 샘플셋 + OK          |
| **3**      | Optional model assist  | LLM/로컬 — **코멘트·패턴 문장** 보조. 점수는 규칙/캘리브 엔진이 주인                 | 모델이 점수를 **덮어쓰지 않음**(또는 제안만) | JSON 설명 가능 출력                    | 별도 OK             |
| **4**      | (보류) 준총괄               | 공식 유사 주장·Lemon                                               | —                           | —                                | **명시 승인 전 금지**    |


```
Research(R) ──▶ Phase1 (score+traits+GEC-style) ✅
                      │
                      ▼
                 Phase2 calibration (next)
                      │
                      ▼
                 Phase3 optional model (score owner = rules)
                      ✗ Lemon / official claim
```

**UI 구현:** Phase 1.1 = `hub/app/topik2/` + bank `scoring.traits` + [`topik2-writing-axis-mapping-ko.md`](topik2-writing-axis-mapping-ko.md) (2026-07-26).

---



## D. Claude 핸드오프 — 「조사 확인용」 체크리스트

> Paul 분담: **Cursor = 코드**, **Claude = 리서치 검토**. 아래만 확인하면 됨 (구현 착수 아님).

- [ ] §A 표의 PEG / IEA·LSA / e-rater / c-rater / IntelliMetric / neural·BERT / LLM / GEC 요약이 **왜곡 없이** 읽히는가?
- [ ] 핵심 링크(ERIC e-rater, Taghipour & Ng, ASAP++, GECToR, WriteToLearn traits, DET scoring, gaming JEM)가 **열리거나 대체 가능한가?**
- [ ] §B가 Paul 방향과 맞는가: **점수 필수 노출** · 공식 TOPIK 아님 · 실수/패턴/흐름 우선 · 블랙박스·Lemon 후순위?
- [ ] 51–52 = c-rater류, 53–54 = trait AES+GEC 매핑이 타당한가?
- [ ] §C Phase R→1에서 **점수 표시**가 명시되고, 구 Phase1 “점수 없음”이 폐기되었는가?
- [ ] imperfect score 책임 고지(disclaimer·trait-first·게이밍 플래그)가 충분한가?
- [ ] 한국어 GEC/형태소 현실성: Phase 1을 **규칙·사전**으로 두고 모델은 Phase 3 — 동의?
- [ ] papers 문서와 모순 없어 교차 링크만으로 읽히는가?

**Claude 출력 형식 제안:** 위 체크 항목별 OK / 수정요청 1줄 + Paul에게 “Phase 1 구현 승인 여부” 한 줄.

---



## E. 참고 링크 (확장)

**고전·상용:** [Dikli/ERIC overview ED494415](https://files.eric.ed.gov/fulltext/ED494415.pdf) · [PEG MI](https://www.measurementinc.com/sites/default/files/AGentleIntroductiontoAutomatedScoring.pdf) · [e-rater v.2 ERIC](https://files.eric.ed.gov/fulltext/EJ843852.pdf) · [c-rater](https://cdn.aaai.org/ocs/122/122-2394-1-PB.pdf) · [IntelliMetric RB-929](https://www.vantage.com/pdfs/research/RB929.pdf) · [WriteToLearn](https://www.pearsonassessments.com/en-us/Store/Professional-Assessments/Academic-Learning/WriteToLearn/p/100000030) · [DET scoring](https://blog.englishtest.duolingo.com/how-is-the-duolingo-english-test-scored/)

**신경망·서베이:** [Taghipour & Ng](https://aclanthology.org/D16-1193.pdf) · [Ke & Ng 2019](https://www.ijcai.org/proceedings/2019/0879.pdf) · [Deep AES survey](https://link.springer.com/article/10.1007/s10462-024-11017-5) · [Ramesh & Sanampudi 2024](https://dl.acm.org/doi/10.24963/ijcai.2024/897) · [ASAP++](https://aclanthology.org/L18-1187.pdf) · [Fairness AES](https://arxiv.org/html/2401.05655v1)

**LLM·리스크:** [LLM AES fairness 2025](https://aclanthology.org/2025.aimecon-wip.9.pdf) · [LLM demographic bias](https://arxiv.org/html/2504.21330v1) · [Gaming JEM](https://doi.org/10.1111/jedm.12427) · [Length bias](https://aclanthology.org/2021.sustainlp-1.4.pdf) · [Adversarial LLM AES](https://aclanthology.org/2025.aimecon-sessions.10.pdf)

**GEC·응집:** [GECToR](https://aclanthology.org/2020.bea-1.16.pdf) · [Coh-Metrix](https://soletlab.asu.edu/coh-metrix/)

**형성 AWE:** [MI Write](https://www.measurementinc.com/miwrite/) · [Frontiers meta-analysis](https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2023.1162454/full)

---

*작성: Cursor agent · 2026-07-26 · Phase 1.1 partial credit + rewrite loop · 커밋/푸시/Lemon/신경망 AES 없음*