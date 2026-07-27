# jabi. 밝은 게임형 UI/UX 제안 (2026-07-26)

> 제안만. CSS 전면 개편 없음. 획순(stroke) UI는 Claude 소유 — 통합 면만 명시.
> 상세 백로그·캔버스: Cursor Canvas `ui-ux-game-bright-proposals.canvas.tsx`

## 현재 마찰 (요약)

| 화면 | 마찰 |
|------|------|
| Hub doors | Learn·Hangul·Basics·TOPIK II와 Blog·Teach·Shop이 같은 무게 → 학습 경로가 흐려짐. 스캐폴드가 “완성 앱”처럼 보임 |
| 트랙 목록 | Hangul/Basics/TOPIK II는 목록만; TOPIK I 탭 셸을 벗어나면 맥락 끊김 |
| Home | 스탯 5칸 + 파트너 + 미션 + SRS/코치 배너 — XP→스테이지→클리어 루프가 숫자로만 쪼개짐 (XP 바·클리어 연출 없음) |
| Practice / Quiz | Practice에 모의고사·트랙 링크·SRS가 한 덤프; 결과 화면은 점수 텍스트 위주 |
| Growth / Me / Onboarding | 파트너 아트는 강함. 소프트캡·접수 CTA·온보딩 폼이 게임감과 분리되어 보임 |

## Top 5 UX 수정 (우선)

1. **Hub IA** — 학습 도어(한글→기초→TOPIK I→II)와 Blog/Teach/Shop 시각 무게 분리 + scaffold 뱃지  
2. **Home** — XP 바 + 스테이지 칩; 스탯 카드 5개 동등 배치 축소; 파트너를 홈 히어로로  
3. **Practice** — Hangul/Basics/TOPIK II 링크는 Hub로; Practice는 모의고사+SRS만  
4. **Quiz 결과** — XP/스테이지 클리어 연출 → 다음 미션 CTA (접수는 Me/코치 레인 유지)  
5. **방향 1개 선택** → `brand.json` / `:root` 토큰 스텁만 (전면 리스타일 금지)

## 백로그 소유

| Pri | 항목 | Owner |
|-----|------|--------|
| P0 | Hub 학습/마케팅 도어 분리 | Cursor |
| P0 | Home XP 바·스테이지 | Cursor |
| P0 | Practice IA 정리 | Cursor |
| P1 | Quiz 결과 연출 | Cursor |
| P1 | 밝은 테마 토큰 스텁 | Cursor (Paul 방향 확정 후) |
| P1 | 온보딩 타일화 | Cursor |
| P1 | Hangul 목록 크롬 ↔ 획순 위젯 | Cursor 셸 / **Claude stroke** |
| P2 | SRS “퀘스트” 카피 | Cursor |
| P2 | zh/ko 도어 카피 동기 | Cursor |
| P2 | 소프트캡·접수 CTA 톤 | Paul OK + Cursor |

### 획순 통합 면 (Claude)

- Cursor: 레슨 목록, expand/collapse, “준비 중” 빈 칸, Hub 복귀  
- Claude: Hanzi Writer / stroke JSON, `.hangul-trace-*` 내부  
- 밝은 테마는 **페이지 bg/ink/크롬만** — stroke SVG path 스타일 건드리지 않음

---

## 디자인 방향 3안 (밝은 · 게임형)

공통 유지: `jabi.` 워드마크 · Catch/Mercy/Guide · 파트너 자모 성장 · (가능하면) 브라스/골드 계열 악센트 혈통.  
피할 것: purple-on-white, cream+serif+terracotta, broadsheet, Inter 기본 스택.

### A. Sunstage Clear (햇살 스테이지)

- **무드:** 한낮 코트 — 스테이지 클리어가 경기 종료처럼 느껴짐  
- **토큰:**
  ```css
  --bg: #F3F8FF;
  --bg-soft: #FFFFFF;
  --ink: #1A2433;
  --muted: #5A667A;
  --accent: #FF9F1C;
  --accent-2: #2EC4B6;
  --line: rgba(26,36,51,0.12);
  --success: #3DCC7A;
  ```
- **타이포:** Nunito Black · Pretendard · Space Mono (점수/XP)  
- **모티프:** XP 주스바 채움 · 도어=코트 레인 · 스테이지 클리어 배너  
- **리스크:** 시험 앱치고 너무 놀이터 같음; 주황 CTA가 Mercy 톤과 충돌 가능  

### B. Ticket Arcade (티켓 아케이드)

- **무드:** 밝은 매표소 — 도어마다 스탬프 티켓, XP는 펀치  
- **토큰:**
  ```css
  --bg: #F7FBFA;
  --bg-soft: #FFFFFF;
  --ink: #0D1B2A;
  --muted: #5C6B73;
  --accent: #FF5A5F;
  --accent-2: #00C2A8;
  --line: rgba(13,27,42,0.1);
  --ticket: #FFE66D;
  ```
- **타이포:** Hub Archivo Black · 앱 Nunito 800 · Space Mono (티켓 코드)  
- **모티프:** 천공 티켓 타일 · 제출=펀치 · SRS=대기열 티켓  
- **리스크:** 코랄 CTA vs “자비” 브랜드; 악센트 3색 이상 금지  

### C. Quest Map Board (퀘스트 맵)

- **무드:** 밝은 지도판 — 한글→기초→TOPIK 노드를 클리어  
- **토큰:**
  ```css
  --bg: #F4F7FB;
  --bg-soft: #FFFFFF;
  --ink: #15202B;
  --muted: #667788;
  --accent: #E8B84A; /* 기존 브라스 혈통 */
  --accent-2: #1FA7A0;
  --path: #A8D5FF;
  --line: rgba(21,32,43,0.1);
  ```
- **타이포:** Archivo Black (맵 타이틀) · Nunito · Space Mono (노드 ID 00–17)  
- **모티프:** Hub=지도 구역 · 파트너=현재 노드 · 스테이지 스탬프 · XP=노드 사이 트레일  
- **리스크:** Blog/Teach/Shop을 같이 두면 맵이 지저분해짐 → **P0 Hub IA 선행**  

---

## Paul이 고르면 다음 액션

1. 방향 **A / B / C** (또는 하이브리드 한 줄) 확정  
2. Cursor: `:root` + `brand.json` theme 토큰 스텁 + P0 IA 3건  
3. Claude: 획순 모듈 확장 계속 (목록 크롬은 Cursor 토큰만 상속)

커밋/푸시·전면 CSS 개편은 이 문서 범위 밖.
