# 리서치 — TOPIK II 쓰기 채점: 논문·공식 기준 먼저 (2026-07-26)

> **Paul 지시:** 쓰기 스코어링 알고리즘은 **학술·공식 자료 리서치를 충분히 한 뒤**에만 진행.  
> **상태:** Phase 1.1 **부분점수·다시쓰기** (규칙 가중합). ML·LLM·Lemon **금지 유지**. Phase 2 캘리브 대기.  
> **갱신 (2026-07-26 저녁):** Paul — 학생은 **형성적 점수를 반드시 봐야 함**(공식 TOPIK 주장 금지). → [`research-english-aes-for-jabi-ko.md`](research-english-aes-for-jabi-ko.md) · 축 매핑 [`topik2-writing-axis-mapping-ko.md`](topik2-writing-axis-mapping-ko.md).  
> **콘텐츠:** 쓰기 51–54 원작 뱅크 + `scoring.traits` 가중.

관련: 설계 메모(프롬프트 초안·미구현) [`research-topik2-writing-grading-ko.md`](research-topik2-writing-grading-ko.md) · **영어 AES 딥다이브(주력)** [`research-english-aes-for-jabi-ko.md`](research-english-aes-for-jabi-ko.md)

---

## 0. Guardrail (다른 에이전트·큐용)

| 허용 | 금지 |
|------|------|
| Q51–54 **원작 문항·프롬프트·체크리스트·trait 가중** | “공식 TOPIK 점수” **주장** · 캘리브 없는 급수 단정 |
| `acceptedAnswers` / `softKeywords` / `checklist` → **가시 형성 점수** | BERT/LLM **블랙박스** 채점 API · Lemon |
| Phase 1 UI (`topik2.js` score panel) | Phase 2+ 캘리브 없는 배점 고정 단정 |
| 이 문서·영어 AES 문서·DAILY-LOG·work-queue 갱신 | |

**한 줄:** Phase 1.1 = **보이는 형성 점수 + 부분점수 + 다시쓰기 + trait 막대**. 공식 TOPIK·Lemon·신경망 AES 아님.

---

## 1. 현재 jabi 구현 (정직 요약)

### 1.1 플레이어 (`hub/app/topik2/topik2.js`)

파일 헤더: *formative trait scores (rules only, no AI/Lemon)*.

| 유형 | JSON `type` | 채점 | 점수 UI |
|------|-------------|------|---------|
| 빈칸 51–52 | `write-blank` | acceptedAnswers + **퍼지 부분점수**(near/stem/honorific) | 합산 0–100 · 조직축 N/A |
| 단문 53 | `write-short` | 분량·격식·softKeywords·checklist **연속 점수** → 3 trait | 합산 + 막대 3 + 4층 피드백 |
| 논술 54 | `write-essay` | 동일 + discourseMarkers · 언어 가중↑ | 동일 |

**없는 것:** OpenAI/Kimi/Lemon, 임베딩, 문법 파서, 공식 TOPIK 배점 매핑.

UI: 점수 패널 + trait 막대 + 「다시 쓰고 제출」·시도 최근/최고 + 고지: *연습용 형성 점수 · 공식 TOPIK 아님*. 모범/개요는 확인 후 선택 공개.
### 1.2 데이터 (`hub/app/data/topik2/draft-write-*.json`)

| 파일 | 채점 필드 |
|------|-----------|
| `draft-write-51.json`, `draft-write-52.json` | `acceptedAnswers[]`, `modelAnswer`, `feedback`, `why`, **`scoring.traits` (cloze-partial)** |
| `draft-write-53.json`, `draft-write-54.json` | `minChars`/`maxChars`, `checklist[]`, `softKeywords`, `discourseMarkers`(54), `modelOutline`, **`scoring.traits` (가중)** |

`sourceNote`: formative trait / cloze partial — no AI / Lemon / official TOPIK points.

### 1.3 한 문장 판정

> **지금 채점은 문자열·퍼지 매칭(51–52 부분점수) + 키워드·분량·격식 연속 휴리스틱(53–54)을 가시 형성 점수(0–100·3 trait)로 보여 줄 뿐이며, AES/ML/Lemon이 아니다.**

이전 설계 문서(`research-topik2-writing-grading-ko.md`)의 AI 프롬프트 초안은 **미구현**이다.

---

## 2. 문헌 합성 (peer-reviewed / 공식·준공식 우선)

### 2.1 AES 계보 (고전 → 트랜스포머)

| 계열 | 대표 | 핵심 | 출처 |
|------|------|------|------|
| **PEG** | Page (1966~) | 표면 proxy(길이·문장·구두점 등) → 회귀로 인간 점수 근사 | Page; Shermis & Burstein (eds.), *Automated Essay Scoring* — [PEG chapter](https://www.taylorfrancis.com/chapters/mono/10.4324/9781410606860-12/project-essay-grade-peg-mark-shermis-jill-burstein) |
| **IEA** | Landauer, Foltz, Laham | **LSA**로 내용 유사도(의미 공간) | overview: Dikli (2006) [JTLA](https://ejournals.bc.edu/index.php/jtla/article/view/1640); ERIC [ED494415](https://files.eric.ed.gov/fulltext/ED494415.pdf) |
| **e-rater** | Attali & Burstein (ETS) | NLP 언어·담화·내용 feature 하이브리드; Criterion 등 AWE와 연계 | Attali & Burstein (2006), *JTLA* “Automated essay scoring with e-rater v.2.0” |
| **c-rater** | Leacock & Chodorow (ETS) | **단답·개념 매칭**(에세이 e-rater와 분리). 동의어·형태·술어구조 등 | Leacock & Chodorow (2003); Sukkarieh & Blackmore, FLAIRS — [AAAI PDF](https://cdn.aaai.org/ocs/122/122-2394-1-PB.pdf) |
| **DNN / BERT AES** | Uto et al.; Ke & Ng surveys | feature engineering → 신경망·BERT 다중 스케일 표현 | Uto et al. (2021) [Behaviormetrika review](https://link.springer.com/content/pdf/10.1007/s41237-021-00142-y.pdf); Ke & Ng (2019) IJCAI survey; Ramesh & Sanampudi (2024) [IJCAI 2024 survey](https://dl.acm.org/doi/10.24963/ijcai.2024/897); Ormerod et al. / MDPI (2021) [transformers AES](https://www.mdpi.com/2624-8611/3/4/56) |
| **LLM AES** | 2024–25 평가 연구 | 프롬프트(CoT·few-shot)로 인간 합의 접근 가능하나 **공정성·편향 잔존**; PEG 등 feature 모델과 비교 필수 | ACL Anthology WIP (2025) [Evaluating LLM-Based AES](https://aclanthology.org/2025.aimecon-wip.9.pdf) |

**시사점:** AES는 50년+ 연구에도 “해결된 문제”가 아니다(Ramesh & Sanampudi 2024). 상용 시스템은 대규모 **인간 골드 점수**로 학습·검증한다. jabi에 그 데이터가 없다.

### 2.2 단답/클로즈 vs 자유 작문

- **빈칸·단답:** 정답 집합·개념 체크(c-rater류). 단순 string match는 **동의어·어순·부분 정답**에 취약(Leacock & Chodorow; 후속 c-rater 개선 논문).
- **자유 에세이:** 내용·조직·언어를 **별도 구성개념**으로 다루는 e-rater/PEG/IEA/신경망. ASAP 등 공개 벤치마크도 **인간 점수와의 QWK**가 표준 지표.
- Shermis 계열 short-form CR 대회: 기계가 고부담 인간 채점을 **항상 이기지는 못함** — 운영 전 신중 (Shermis, *Applied Measurement in Education* 계열 논의; short-form machine scoring 비교 연구).

**jabi 매핑:** Q51–52 ≈ short-answer / cloze → Phase 0–1에 적합. Q53–54 ≈ constructed essay → Phase 2+에서만 모델 보조, **합산 점수 단정 금지**.

### 2.3 TOPIK II 쓰기 공식·준공식 기준

공개 자료에서 반복 확인되는 구조(세부 내부 배점표는 완전 공개가 아닐 수 있음 — 기존 grading 문서와 동일 경고):

| 문항 | 형태 | 배점(일반 안내) | 평가 축 |
|------|------|----------------|---------|
| 51–52 | 빈칸에 알맞은 말/문장 | 각 ~10 | 내용·과제 + 언어 사용(정확성) |
| 53 | 자료 설명 ~200–300자 | ~30 | 내용·과제 / 전개 구조 / 언어 사용 |
| 54 | 의견 논술 ~600–700자 | ~50 | 동일 3축, 언어 사용 비중 큼 |

- 공식 시험 사이트·답안 작성 안내: [exam.topik.go.kr](https://exam.topik.go.kr)  
- 채점 축 요약(교육·학원 정리, 교차 확인): [TOPIK Lab Writing](https://info.topiklab.com/en/topik-writing/), [Chapter Korean](https://chapterkorean.com/en/introduction-of-topik-2-writing-test/), Tammy Korean 채점표 정리, 네이버 블로그 등 2차 정리  
- 공개 회차별 모범·채점 키워드 예: 제52회 정답·배점 PDF (쓰기 54 [채점기준] 문장형) — [SPBU mirror PDF](https://testingcenter.spbu.ru/images/files/TOPIK_II_answer.pdf)

**인간 채점:** 53–54는 복수 채점자, 큰 차이 시 3자 — AES가 “공식 점수”를 대체한다고 주장하면 **타당성 위험**.

### 2.4 타당성·공정성·게이밍·과적합

- **게이밍:** AI 채점은 인간 프로세스와 다른 근사 → 반복·무의미·표면 feature 조작에 취약 (Bejar 등; *Journal of Educational Measurement* case study — [doi:10.1111/jedm.12427](https://doi.org/10.1111/jedm.12427)).
- **공정성·표준:** AI 점수에 대한 타당성·신뢰도·하위집단 편향 검증 프레임 (OSF preprint *Testing Standards for AI-based Scores in AES* — [doi:10.31234/osf.io/vnq63_v2](https://doi.org/10.31234/osf.io/vnq63_v2)).
- **Responsible AI + 타당성 논증:** 루브릭·골드 데이터·인간 감독이 scoring inference를 지탱 (Burstein 등; arXiv [2411.02577](https://doi.org/10.48550/arxiv.2411.02577)).
- **운영화:** 정확도만으로 부족 — bias, robustness, explainability 트레이드오프 (arXiv [2506.21603](https://arxiv.org/html/2506.21603v1)).
- **고부담 LLM 자동채점 윤리:** 설명가능성·편향·적대적 공격 — 인간 채점자가 신뢰성에서 우위인 시나리오 (Cambridge Assessment *Research Matters 40* — [PDF](https://www.cambridgeassessment.org.uk/Images/research-matters-40-the-ethics-of-deploying-large-language-models-in-high-stakes-automarking.pdf)).

**jabi 시사점:** soft keyword만으로 “통과”하면 키워드 나열 게이밍 가능(현재 Phase 0도 한계 명시 필요). 블랙박스 숫자 점수는 학습자·Paul 모두에게 위험.

### 2.5 형성 평가(formative) vs 총괄 점수(summative) — L2/AWE

- AWE(Criterion 등)는 **즉시 피드백·다회 수정**에 강점; **표면 오류 편향·공식문 유도** 비판도 있음 (Zhang & Hyland 계열; Li et al. AWE engagement).
- 합성 리뷰: L2 교실에서 AWE는 언어 정확성 개선에 도움되는 경우가 많으나 **교사 피드백 대체 아님** (Cambridge repository synthesis — [AWE in L2 classrooms](https://api.repository.cam.ac.uk/server/api/core/bitstreams/40ef3827-bbf1-4ebd-bba6-1d149ea81777/content)).
- 권고: AWE를 **형성 루프**(전략·목표·콘퍼런스)에 끼워 넣기 (Wilson & Roscoe 계열 recommendations — [UDSpace PDF](https://udspace.udel.edu/bitstreams/78174da5-829d-4fdf-9420-1aedcb59240d/download)); “점수만” 찍지 말 것.
- Formative framing: AWE는 피드백 형태일 뿐, 과정 설계가 학습을 만든다 (NOBEL 2024 등).

**jabi 시사점 (Paul 갱신 반영):** 목표 = **가시 형성 점수** + 실수·패턴·흐름 피드백 + 투명 루브릭. “급수 확정 / 공식 배점”은 금지. 점수 표시 **방식**은 [`research-english-aes-for-jabi-ko.md`](research-english-aes-for-jabi-ko.md) §B–C. D17 “보장 아님” 톤 유지.

---

## 3. jabi 권장 단계 (갱신 — 형성 점수 노출)

상세·영어 근거: [`research-english-aes-for-jabi-ko.md`](research-english-aes-for-jabi-ko.md) §C.

| Phase | 범위 | 점수 | Paul 게이트 |
|-------|------|------|-------------|
| **R / 0 (현재)** | 리서치 + stub 콘텐츠 | UI에 점수 **미표시**(stub) | 리서치 문서 OK 대기 |
| **1** | Trait+GEC식 피드백 + **보인 형성 점수**(0–100 또는 축별+합산) · disclaimer · 4층 피드백(규칙 우선) | **필수 표시** | 영어 AES 문서 + 본 문서 OK |
| **2** | 샘플 캘리브레이션 · 게이밍 테스트 | 동일 UI, 숫자 보정 | 샘플셋 + OK |
| **3** | 모델 **보조** 코멘트(점수의 주인은 규칙/캘리브) | 모델이 점수 덮어쓰기 금지 | 별도 OK |
| **4 (보류)** | 준총괄·Lemon | — | 명시 승인 전 금지 |

```
[콘텐츠 뱅크] ──OK──▶ 계속 (stub 채점만)
[스코어링 UI/ML] ──X──▶ pause until Paul OK on english-aes + this doc
```

---

## 4. 명시적 pause 문장

> **채점 UI·ML·LLM·Lemon을 지금 구현하지 않는다.** Paul이 `docs/research-english-aes-for-jabi-ko.md`(주력)와 본 문서를 검토하고 **Phase 1(형성 점수 표시 포함)** 을 승인한 뒤에만 착수한다.

---

## 5. 참고 링크 빠른 목록

1. Attali & Burstein (2006) e-rater v.2 — JTLA  
2. Dikli (2006) AES overview — [JTLA](https://ejournals.bc.edu/index.php/jtla/article/view/1640)  
3. Ke & Ng (2019) AES survey — IJCAI  
4. Uto et al. (2021) DNN-AES review — [Springer PDF](https://link.springer.com/content/pdf/10.1007/s41237-021-00142-y.pdf)  
5. Ramesh & Sanampudi (2024) AES survey — [IJCAI](https://dl.acm.org/doi/10.24963/ijcai.2024/897)  
6. Leacock & Chodorow / c-rater — short-answer  
7. LLM AES fairness — [ACL 2025 WIP PDF](https://aclanthology.org/2025.aimecon-wip.9.pdf)  
8. Gaming vulnerability — [JEM](https://doi.org/10.1111/jedm.12427)  
9. Cambridge RM40 LLM automarking ethics — [PDF](https://www.cambridgeassessment.org.uk/Images/research-matters-40-the-ethics-of-deploying-large-language-models-in-high-stakes-automarking.pdf)  
10. TOPIK writing structure — [topiklab](https://info.topiklab.com/en/topik-writing/) · [exam.topik.go.kr](https://exam.topik.go.kr)

---

*작성: Cursor agent · 2026-07-26 · 저녁 갱신(점수 노출·영어 AES 교차링크) · 커밋/푸시/Lemon 없음*
