# 디자인 핸드오프 — 목업 v2 (귀여움×독특함×게임)

> Claude가 만든 목업(홈/퀴즈/모드선택 3화면)을 실제 `app.css`/`app.js` 클래스에 매핑한 스펙. Cursor가 CSS 작업할 때 참고용 — `app.css`/`app.js`는 직접 안 건드렸습니다.

## 참고 레퍼런스 (섞은 소스)

- Dribbble "Wellbeing and Gamification app" (George Samuel) — 남색 원형 배지 일러스트, 색종이 점 장식
- Finch (Self-Care Pet) — 여백 많은 카드 구성
- 카카오프렌즈 — 표정 절제(무표정/단순 표정일수록 성숙하게 읽힘). jabi. 캐릭터는 원래 얼굴이 없어서 이미 충족됨.
- 타겟: 20대 초반 여성. "아동용 교육 사이트" 느낌 배제, 유치함 대신 귀여움+독특함+게임감.

## 핵심 원칙 3가지

1. **캐릭터는 항상 남색(`#0F1B2E`) 원형 배지 안에** — 지금처럼 흰 사각 카드(`.partner-glyph`)에 가두지 말 것. 원형 배지가 이 리프레시의 시그니처 모티프.
2. **주황 하나로 강조를 몰지 말고 teal(#12C5B0)·gold(#FFD54A)·heart(#FF5C6C)를 상황별로 배분** — XP는 gold 방향, 스트릭은 heart, 보조 액션은 teal.
3. **버튼 위계**: 주요 액션(제출/시작)만 두꺼운 하단 테두리 "3D press" 스타일, 나머지는 지금처럼 얇게.

---

## 1. 홈 — 캐릭터 배지

**대상**: `.home-partner`, `.partner-glyph`, `.partner-art` (`app.css:871-916`)

지금은 `.partner-glyph`가 흰 배경 72×72 사각 카드. 이걸 남색 원형 배지로 교체:

```css
.home-partner {
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 26px 0 18px;
  background: radial-gradient(120% 100% at 50% 0%, #16233B 0%, #0F1B2E 62%);
  border: none;
  border-radius: 28px;
  position: relative;
  overflow: hidden;
}

.partner-glyph {
  width: 158px;
  height: 158px;
  border-radius: 50%;
  background: linear-gradient(155deg, #1B2C48 0%, #0F1B2E 100%);
  box-shadow:
    0 0 0 6px rgba(255, 138, 20, 0.14),
    0 14px 30px rgba(0, 0, 0, 0.35) inset,
    0 10px 24px rgba(0, 0, 0, 0.25);
  border: none;
}

.partner-art {
  width: 55%;
  height: 55%;
  filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35));
}

.partner-name,
.partner-stage {
  color: #fff;
}
.partner-stage {
  color: rgba(255, 255, 255, 0.6);
}
```

**추가 요소** (배지 안/밖에 절대배치):
- 스테이지 태그 알약: `STAGE 2` 같은 텍스트를 배지 하단에 오렌지 알약으로 겹쳐 걸기 (`position: absolute; bottom: -10px;` + `border: 2px solid #0F1B2E`로 배지와 경계 분리)
- 색종이 점 4개(6~8px 원, gold/teal/accent/흰색 반투명) + 번개 이모지 2개를 배지 주변에 흩뿌리기 — `position: absolute`로 배경 카드 모서리 쪽에

## 2. 홈 — XP 바

**대상**: `.xp-bar`, `.xp-bar-fill` (`app.css:197-211`)

지금 14px, 이미 나쁘지 않지만 목업은 16px + 상단 유리질감 하이라이트:

```css
.xp-bar {
  height: 16px;
}

.xp-bar-fill::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 6px;
  right: 6px;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
}
.xp-bar-fill {
  position: relative;
}
```

## 3. 퀴즈 — 선택지 A/B/C/D 뱃지

**대상**: `.choices`, `.choice` (`app.css:458-493`)

이 화면이 리뷰 문서에서 "시험지 같다"고 지적한 화면. 각 `.choice` 앞에 원형 색상 뱃지 추가:

```css
.choice {
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 16px;
  transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
}

.choice::before {
  content: attr(data-letter); /* app.js에서 렌더링 시 A/B/C/D 채워서 data-letter 속성으로 넣어주면 됨 */
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 900;
  color: #fff;
  flex-shrink: 0;
}

.choice:nth-of-type(1)::before { background: #1B2C48; }  /* A: 남색 */
.choice:nth-of-type(2)::before { background: #12C5B0; }  /* B: teal */
.choice:nth-of-type(3)::before { background: #FF8A14; }  /* C: 오렌지 */
.choice:nth-of-type(4)::before { background: #8B6FE8; }  /* D: 보라 */

.choice.selected {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(255, 138, 20, 0.18);
}
```

정답 제출 시 살짝 튀는 마이크로 애니메이션(`transform: scale`)을 `.choice.correct`에 걸면 리뷰 문서 6번 항목까지 해결됨.

**정답 반응 토스트** — `.result-clear` (`app.css:267-281`)를 재활용하되, 목업처럼 남색 배경 + 미니 배지(giyeok 얼굴만, 60px 버전) 아이콘을 왼쪽에 붙이면 "캐릭터가 반응한다"는 느낌을 줄 수 있음. 미니 배지 CSS는 위 1번의 `.partner-glyph`를 `width/height: 60px`, `img: 34px`로 축소한 버전.

## 4. 퀴즈/전체 — 주요 액션 버튼 3D press

**대상**: `.btn` (`app.css:315-327`)

```css
.btn {
  border-bottom: 4px solid #E86F00; /* accent-deep */
  box-shadow: 0 6px 16px rgba(255, 138, 20, 0.35);
  font-weight: 900;
}
.btn:active {
  transform: translateY(2px);
  border-bottom-width: 2px;
}
```
`.btn-ghost`는 지금처럼 얇게 유지 — 위계 대비가 핵심.

## 5. 모드선택 — 카드 아이콘을 원형 배지로

**대상**: `.mode-card`, `.mode-icon` (`app.css:70-128`, `.mode-card.recommended`는 `811-815`에 이미 있음)

지금 `.mode-icon`은 그냥 28px 이모지 텍스트. 남색 원형 배지로 감싸기:

```css
.mode-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 21px;
  background: linear-gradient(155deg, #1B2C48, #0F1B2E);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25) inset;
  margin-bottom: 0; /* 기존 8px 제거하고 flex row로 전환 필요 */
}

.mode-card {
  display: flex;
  align-items: center;
  gap: 13px;
}

/* 모드별 링 컬러 (data-mode 속성 이미 있음, app.js 수정 불필요) */
.mode-card[data-mode="mercy"] .mode-icon {
  box-shadow: 0 0 0 3px rgba(18, 197, 176, 0.35) inset, 0 6px 14px rgba(0,0,0,0.2) inset;
}
.mode-card[data-mode="guide"] .mode-icon {
  box-shadow: 0 0 0 3px rgba(122, 200, 255, 0.35) inset, 0 6px 14px rgba(0,0,0,0.2) inset;
}
.mode-card[data-mode="catch"] .mode-icon {
  box-shadow: 0 0 0 3px rgba(255, 138, 20, 0.4) inset, 0 6px 14px rgba(0,0,0,0.2) inset;
}
```

`.mode-card.recommended`엔 "추천" 리본 추가:
```css
.mode-card.recommended {
  position: relative;
}
.mode-card.recommended::after {
  content: "추천";
  position: absolute;
  top: -9px;
  right: 16px;
  background: var(--accent);
  color: #17110A;
  font-size: 10px;
  font-weight: 900;
  padding: 3px 10px;
  border-radius: 999px;
  box-shadow: 0 4px 10px rgba(255, 138, 20, 0.4);
}
```
> 참고: 지금 `.mode-card`는 `h2`/`p`를 세로로 쌓는 레이아웃이라 위 flex row 전환이 마크업 순서(아이콘 먼저, 텍스트 나중)에 영향 안 주는지 `app.js`에서 확인 필요.

## 6. 하단 탭바 — 아이콘 추가

**대상**: `.tab-bar`, `.tab-btn` (`app.css:744-775`)

지금 텍스트만 있음. `app.js`에서 탭 라벨 앞에 이모지(🏠/📖/🧑)를 붙이거나 `.tab-btn::before`로 넣기만 해도 리뷰 문서 8번 항목 해결됨 — CSS만으로는 안 되고 `app.js`의 탭 라벨 문자열 수정 필요.

---

## 우선순위 제안

| 순위 | 항목 | 파급력 |
|---|---|---|
| 1 | 캐릭터 남색 배지 (홈) | 가장 큼 — 이 리프레시의 시그니처 |
| 2 | 퀴즈 선택지 A/B/C/D 뱃지 | 큼 (체류시간 제일 긴 화면) |
| 3 | 버튼 3D press | 중간, 공수 낮음 |
| 4 | 모드카드 배지+추천 리본 | 중간 |
| 5 | XP 바 유리질감 | 작음, 공수 낮음 |
| 6 | 탭바 아이콘 | 작음, `app.js` 수정 필요 |

목업 전체(3화면, 인터랙티브 아님)는 Claude 세션 히스토리의 아티팩트로 존재 — 필요하면 Paul에게 링크 요청.
