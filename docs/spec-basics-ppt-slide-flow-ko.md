# 스펙 — Basics 유닛 상세를 슬라이드형(PPT식) 흐름으로 개편

> Paul 승인(2026-07-27) — [`proposal-ux-overhaul-tracks-ko.md`](proposal-ux-overhaul-tracks-ko.md) 문제 1의 파일럿 트랙으로 **Basics** 선정(Hangul은 이번 스코프 아님 — 획순 연습이라는 시각 요소가 섞여 있어 더 복잡, 추후 별도 검토). Cursor 담당(Claude는 `hub/app/**` 편집 금지).

---

## 현재 구조 (실제 코드 확인)

`hub/app/basic/basic.js`의 `renderDetail(unit, bank)`(388행~)가 유닛 하나를 펼칠 때 이 순서로 **전부 한 HTML 블록에 이어붙임**:

1. `objective`(목표 한 줄)
2. `renderGrammarCards(bank)`(339행) — `bank.grammarCards[]`를 카드로 나열(문법 포인트 여러 개면 전부 한 화면에)
3. `explain`(문법 노트)
4. `renderSteps(bank)`(323행) — **`bank.steps[]`(5단계: intro/teach/dialogue/practice/checkpoint)를 그냥 `<ol>` 텍스트 목록으로 나열** — 각 단계가 실제 화면 전환이 아니라 한 줄 요약 텍스트임
5. `renderDialogue(bank)`(308행) — `bank.dialogue.lines[]` 전문
6. `renderPhrases(bank)`(292행) — `bank.phrases[]` 전체 나열
7. 맨 아래 "Practice dialogue →" 버튼 1개 → 클릭 시 `playerState`(7행) 기반 **기존 문항 플레이어**(`renderPlayerQuestion`, 183행)가 열림 — **이 플레이어는 이미 한 문항씩(`playerState.index`) 즉시 정오답 피드백을 주는 방식으로 잘 만들어져 있음, 변경 불필요**.

**핵심 발견**: 데이터(`bank.steps[]`)는 이미 5단계로 정확히 쪼개져 있습니다(각 step에 `id`/`title`/`body`, `hub/app/data/draft-basic-unit01-greetings.json` 22~88행 확인). **문제는 렌더러가 이 구조를 슬라이드로 안 쓰고 텍스트 목록으로 뭉개고 있다는 것** — 즉 데이터 마이그레이션 없이 렌더러만 고치면 됩니다.

## 목표 구조 — 슬라이드 시퀀스

`renderDetail()`을 유닛을 펼치는 순간 바로 전체 콘텐츠를 뿌리는 대신, **슬라이드 상태 머신**으로 교체:

```js
let lessonState = { unit: null, bank: null, slideIndex: 0 }; // playerState(7행)와 같은 패턴으로 추가
```

슬라이드 순서(각 슬라이드 = 화면 전환, 상단에 진행 점 ●●○○○, 하단에 "다음"/"이전" 버튼):

| # | 슬라이드 | 데이터 소스 | 내용 |
|---|---|---|---|
| 1 | **Intro** | `bank.steps[0]`(id=intro) | 제목+본문 — "이 단원에서 뭘 배우는지" 한 화면 |
| 2 | **Teach** | `bank.steps[1]`(id=teach) + `bank.grammarCards[]` | step 본문 요약 + 그 아래 관련 grammarCards. **문법 포인트가 2개 이상이면(예: 이에요/예요 + 은는/이가) 카드별로 하위 슬라이드 분리를 권장**(예: 2a, 2b) — 단 이번 파일럿은 유닛 1개(01·인사)만 우선 검증하고, 카드 개수가 유닛마다 달라 하위분리 필요 여부는 유닛별로 판단 |
| 3 | **Dialogue** | `bank.steps[2]`(id=dialogue) + `bank.dialogue` | step 본문 + 대화 전문. `bank.phrases[]`(핵심 표현)는 이 슬라이드 하단에 **접이식(옵션) 섹션**으로 붙임 — 8개 항목을 별도 필수 슬라이드로 만들면 오히려 마찰이 커짐(참고자료 성격) |
| 4 | **Practice** | `bank.steps[3]`(id=practice) | step 본문(짧은 안내) 한 화면 → "시작" 누르면 **기존 문항 플레이어(변경 없음)**로 자연스럽게 이어짐 |
| 5 | **Checkpoint** | `bank.steps[4]`(id=checkpoint) | step 본문(마무리 목표) + "연습 시작하기"로 이어지거나, 이미 연습을 마쳤으면 완료 표시. **데이터에 체크포인트 전용 인터랙션 문항이 없음** — 이번 스코프는 텍스트 마무리 화면으로 충분, 별도 체크포인트 문항 타입 설계는 후속 과제로 명시 |

## 구현 메모

- 기존 `renderGrammarCards`/`renderDialogue`/`renderPhrases` 함수는 **그대로 재사용** — 호출 위치만 슬라이드별로 분산.
- `renderSteps()`는 더 이상 안 씀(전체 나열 대신 슬라이드 각각의 헤더로 흡수) — 삭제하거나 미사용으로 남겨도 무방.
- 슬라이드 전환은 `playerState`처럼 `lessonState.slideIndex`를 바꾸고 `renderDetail()`(또는 신설 `renderLessonSlide()`)을 다시 그리는 방식 — 기존 `render()` 재호출 패턴 그대로 따름.
- **뒤로가기 가능**해야 함(1-2 처럼 배지 재확인하고 싶을 때). "이전" 버튼 + 진행 점 클릭으로 임의 슬라이드 이동 허용해도 됨(막을 필요 없음 — 강제 순차보다 자유 이동이 자기주도 학습에 낫다는 리서치 근거, `proposal-ux-overhaul-tracks-ko.md` 문제 2 관련).
- 유닛 목록 화면(`renderList`, 460행)에서 "이미 본 유닛"인지 표시하려면 `lessonState` 완료 여부를 기존 `progressApi()`(395행에서 이미 씀)와 연동 — 슬라이드를 끝까지 봤는지, 아니면 연습(퀴즈)까지 마쳤는지 중 어느 걸 "완료"로 볼지는 기존 `progressApi().isDone()` 정의를 그대로 따르면 됨(변경 불필요, 지금처럼 퀴즈 완료 기준 유지 권장).
- 다국어(`t()` 헬퍼) — 슬라이드 진행 UI 문구("다음"/"이전"/"N/5") KO/EN/ZH 추가.

## 하지 않는 것 (스코프 아웃)

- **Hangul 트랙 개편** — 이번엔 Basics만. Hangul은 획순 연습(시각·인터랙션 요소)이 섞여 있어 같은 패턴을 그대로 옮기기 어려움 — 별도 검토.
- **grammarCards 세분화(문법 포인트별 하위 슬라이드 자동 분리)** — 유닛 01만 우선 검증, 나머지 5개 유닛(02~06)은 01 결과 확인 후 일괄 적용.
- **체크포인트 전용 인터랙션 문항 타입 신설** — 텍스트 마무리 화면으로 충분, 데이터 스키마 확장은 후속 과제.
- **phrases[]를 문항화(퀴즈처럼 하나씩 체크)하는 것** — 참고자료로 유지.

## 회귀·검증 체크리스트

1. 유닛 01을 열어 Intro→Teach→Dialogue→Practice→Checkpoint 5슬라이드가 실제로 순서대로 전환되는지, 뒤로가기 되는지.
2. Teach 슬라이드에서 `grammarCards` 2개(이에요/예요, 은는/이가 대조)가 정상 렌더링되는지(줄바꿈·예문 포함).
3. Dialogue 슬라이드의 접이식 phrases 섹션이 펼침/접힘 정상 동작하는지.
4. Practice 슬라이드에서 "시작" 클릭 시 기존 문항 플레이어(`playerState`)가 그대로 정상 작동하는지(이 부분 로직 변경 없어야 함 — 회귀 없는지만 확인).
5. `progressApi()` 완료 판정이 슬라이드 개편 전후로 동일하게 동작하는지(유닛 목록 화면의 완료 배지가 깨지지 않는지).
6. 유닛 02~06(아직 슬라이드 미적용)은 기존 방식 그대로 정상 작동하는지(01만 먼저 바뀌므로 회귀 없어야 함 — 또는 렌더러를 공용으로 바꾼다면 5개 유닛 전부 한 번에 바뀌는 게 자연스러움, 유닛별 롤아웃 여부는 Cursor 구현 시 판단).
7. `git commit`/`push`는 Paul 요청 전까지 보류.
