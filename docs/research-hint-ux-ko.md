# 힌트 UX 리서치 · jabi. TOPIK (2026-07-26)

Paul `개선점 정리.doc` + 웹 리서치 후, **답을  spoiler하지 않는 단계적 힌트**로 앱을 고침.

## Paul 이슈 요약 (문서에서 추출)

| # | Paul 메모 | 해석 |
|---|-----------|------|
| 1 | 힌트 중복 | Meaning→Look→Pair를 한 번에 덤프 → 같은 정보 반복 |
| 2 | 달아요 힌트 | `달다` 모를 수 있음 → **단 음식** 그림으로 의미 스캐폴드 |
| 3 | 안내·출발·도착 | 버스 안내문에서 **어려운 어휘가 핵심** (공항 그림으로 답 유출 금지) |
| 4 | 닫다 | `주세요`만 가르치지 말고 **동사 닫다** 먼저 |
| 5 | **답이 나와있어** | (최대 문제) 초반 힌트에 `Match:/답:`·정답 그림 |
| 6 | 적절한 힌트야 | 전략형 힌트는 유지할 것 |
| 7 | 책이 아니라 추천 | 시각 단서가 쉬운 명사(책)에만 머물면 안 됨 → **말해 주다≈알리다/권하다** |

## 리서치 결론 (구현에 반영)

1. **단계적 힌트(점→가르침→bottom-out)**  
   약한 전략 힌트 → 방향 힌트 → (필요 시) 정답 설명. 첫 탭에 답을 주면 학습이 막힘.  
   출처: VanLehn, *The Behavior of Tutoring Systems* (2006); Andes ITS lessons ([CMU PDF](https://oli.cmu.edu/wp-content/uploads/2012/05/VanLehn_2005_Andes_Physics_Tutoring_System.pdf)).

2. **Progressive disclosure / graduated assistance**  
   일반 넛지 → 구체 단서 → 명시적 해는 최후. Duolingo도 ZPD 안에서 스캐폴드 후 오개념을 재출제.  
   출처: [Duolingo Method whitepaper](https://duolingo-papers.s3.amazonaws.com/reports/Duolingo_whitepaper_duolingo_method_2023.pdf); [Progressive AI Assistance Scaling](https://uxuiprinciples.com/en/principles/progressive-ai-assistance-scaling).

3. **힌트 ≠ 정답 공개; 점수/의존도 관리**  
   On-demand 힌트 + 힌트 사용 시 부분 점수(Duolingo 측정 모델). Clozemaster는 글자 힌트 시 점수 반감.  
   출처: Tilburg hint-scoring / Duolingo data; [Clozemaster hints](https://docs.clozemaster.com/article/68-how-do-i-enable-disable-hints); [힌트 품질 테스트](https://languavibe.com/language-app-hints-quality-test/).

4. **부분 단서(Anki cloze hint)는 답을 대체하지 않음**  
   `{{c1::word::hint}}`처럼 **힌트는 단서**, 숨긴 단어는 유지.  
   출처: [Anki Manual — Cloze](https://docs.ankiweb.net/editing.html).

5. **난이도 급상승 완화**  
   TOPIK 앱들(Thinkbig 등)은 ZPD·적응 커리큘럼으로 “갑자기 너무 어려운 문항”을 피함. 세트 안에서 **빈칸 문법 → 안내문/주제** 순으로 배치.  
   출처: [Thinkbig TOPIK review](https://blogbuz.co.uk/inside-thinkbig-topik-a-complete-review-for-effective-topik-exam-preparation/).

## jabi.에 적용한 설계

| 단계 | 동작 | 답 공개? |
|------|------|----------|
| 1 | 그림(있을 때) — 캡션이 정답이면 자동 마스킹 | 금지 |
| 2 | 전략: `steps[0–1]`만 (Meaning+Look). `Match:/답:`·정답 문자열 제거 | 금지 |
| 3 | 오답 하나 제거 + `distractWhy` | 부분(왜 아닌지) |
| 4 | `why` bottom-out (정답 설명 가능) | 허용(최후) |

코드: `hub/app/js/app.js` — `earlyScaffoldLines`, `safeVisualForHint`, `showHint`.  
데이터: Paul 지목 문항(v2-02/03/04/08) + verified 뱅크 `steps[2]` 순화 + 문항 순서 완화.

## Smoke-test (Paul)

1. 연습 2 → **v2-03 버스 안내**: 도움말 1–2에 **공항**이 안 나오는지.  
2. **v2-02 달아요**: 단 음식 그림 → `보다` 패턴만, 정답 보기 이름 없음.  
3. **v2-04**: `닫다` 설명 후 `주세요`.  
4. **v2-08**: 책 대신 **친구에게 말하다**.  
5. 도움말 4(마지막)에서만 `why`로 정답 설명이 나오는지.
