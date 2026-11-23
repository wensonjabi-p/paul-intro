# 감사 — Hanzi Writer × 한글 획순 (2026-07-27)

> **이 문서가 획순 “verify”의 단일 소스.** 이전 불완전·분산 QA(수동 Trace만 남긴 큐 메모, 부분 스크린샷 패스)는 이 감사로 **대체(supersede)**.  
> Vendor: `hub/app/js/vendor/hanzi-writer.min.js` (Hanzi Writer **v3.7.x**, MIT)  
> Wrapper: `hub/app/hangul/hangul.js` · Data: `jamo-strokes-13.json` / `jamo-strokes-tense.json`

---

## 한 줄 결론

엔진은 **중국어(한자)용**이지만, 데이터·좌표계·퀴즈 옵션을 Hangul-safe로 고정하면 **재작성 없이** 자모 획순에 쓸 수 있다. 이번 패스는 wrapper 중국 기본값 잔여를 제거하고, Y-up 일관성과 캐시 무효화를 문서·코드에 고정했다.

---

## Y-up 좌표계 (필수 · Hangul-safe)

| 항목 | 내용 |
|------|------|
| **HW 요구** | Make Me a Hanzi 관례: 대략 **1024×1024**, **Y가 위로 증가**. 렌더러가 `translate(…) scale(s, -s)`로 화면 SVG에 맞춤. |
| **뷰 박스** | 내부 positioner 기준점 약 `(0,-124)` ~ `(1024,900)` (높이 1024). 우리 자모 bbox는 대개 Y 150–780 → 안전. |
| **데이터** | `strokes[]` SVG path + `medians[]` 점열은 **반드시 Y-up으로 작성**. SVG 표준(Y-down)으로 그리면 ㅂ·ㄱ이 뒤집힌다. |
| **UI** | CSS로 뒤집지 않음. 헤더 굴림 글자는 **참고 라벨**만; 연습 캔버스는 JSON path만. |
| **과거 버그** | ㅂ 아랫가로를 Y≈750에 넣음 → 뒤집힌 ㅂ. ㄱ 좌우 반전. **데이터 오류이지 CSS 버그 아님.** |

→ **Y-up을 “한글에 맞게 바꾸지” 말 것.** HW가 요구하므로 데이터·문서·생성기(`gen-jamo-strokes-gulim.py`)만 Y-up에 맞춘다.

---

## 스키마 대조

| 필드 | HW(한자) | jabi. 한글 | 판정 |
|------|----------|------------|------|
| `strokes: string[]` | SVG path 순서 | 동일 | **Hangul-safe** |
| `medians: [x,y][][]` | 채점·애니 중심선 | 동일, 획수 일치 | **Hangul-safe** |
| `radStrokes: number[]` | 部首 획 인덱스 | JSON에 없음 → loader가 `[]` 주입 | **수정함** (중국 leftover 차단) |
| 문자 키 | 한자 1글자 / CDN 파일명 | `giyeok` 등 로마 id | **Hangul-safe** (CDN 미사용) |
| 기본 `charDataLoader` | `cdn.jsdelivr…/hanzi-writer-data/{char}.json` | 커스텀만 | **필수 차단** |

실측(감사 시점): 13자모 + 경음 4개 `strokes.length === medians.length`, bbox in-grid. `ji`는 1획 스텁 · UI denylist.

---

## Mismatch 목록

심각도: **P0** 사용자에게 틀린 한글 / **P1** 중국 잔여·착시 / **P2** 문서·운영 / **OK** Hangul-safe

| ID | 심각도 | 유형 | 발견 | 조치 |
|----|--------|------|------|------|
| M1 | P0→OK | 좌표계 | Y-up 미숙지 시 뒤집힌 자모 | 문서 고정 + 기존 ㅂ/ㄱ 데이터 교정 유지 |
| M2 | P1 | 중국 leftover | `radicalColor` / `radStrokes` 한자 部首 | `radicalColor: null`, loader `radStrokes: []` |
| M3 | P1 | 중국 leftover | 기본 CDN이 `giyeok.json` 등 한자 데이터 시도 가능 | `charDataLoader` 전용 + `onLoadCharDataError` |
| M4 | P1 | 퀴즈 착시 | Trace 진입 시 `strokeFadeDuration:400`으로 전체 잉크 페이드 → “한글이 녹아 사라짐”처럼 보임 | `strokeFadeDuration: 0` + Trace 전 `hideCharacter()` |
| M5 | P1 | 중국 leftover | 힌트/완료색 기본 `#AAF` (한자 데모 시안) | `highlightColor` / `highlightCompleteColor` 브랜드 웜톤 |
| M6 | P1 | 퀴즈 옵션 | `leniency` 등 미명시 → 한자 기본값만 | `leniency: 1.15`, `acceptBackwardsStrokes: false`, `showHintAfterMisses: 3` 명시 |
| M7 | P1 | UI | CSS 굴림 고스트 vs HW path 어긋남 (과거) | 이미 제거 · 회귀 금지 (`hangul-practice-gulim-ref`) |
| M8 | P2 | 캐시 | 구 JSON이 브라우저에 남음 | `STROKE_DATA_V=20260727c` (+ tube polish) · `?v=` on css/js |
| M9 | OK | 데이터 | ㄹㅂㅇㅋ 획순·방향 (블로그 재구축) | smoke + 시각 확인 유지 |
| M10 | OK | 스텁 | `ji` ≠ ㅈ | denylist · 로스터 제외 |
| M11 | P2 | 미완 | ㅈ/ㅉ 정식 데이터 없음 | 의도적 보류 (콘텐츠 갭, 엔진 버그 아님) |
| M12 | P2 | QA 한계 | Playwright로 Trace 채점 자동화 불가 | Paul 수동 Trace 필요 (문서화) |

---

## Wrapper 옵션 매트릭스 (`HANGUL_HW`)

| 옵션 | 한자 기본 | Hangul 설정 | 이유 |
|------|-----------|-------------|------|
| `showOutline` create | true | false → Trace 때만 on | Replay 이중 레이어 방지 |
| `showCharacter` | true | false → animate로 그림 | 시작 고스트 없음 |
| `radicalColor` | null | **null 고정** | 部首 없음 |
| `strokeFadeDuration` | 400 | **0** | Trace 전환 페이드 착시 제거 |
| `highlightColor` | `#AAF` | `#f0a060` | 중국 데모색 제거 |
| `leniency` | 1 | **1.15** | 자모·터치 친화 |
| `acceptBackwardsStrokes` | false | false | 방향 교육 유지 |
| `showHintAfterMisses` | 3 | 3 | 기존 카피(“3 misses”)와 일치 |
| `charDataLoader` | CDN | 로컬 JSON only | 중국 데이터 차단 |

---

## CSS / 오버레이

- `.hangul-practice-stage`: HW만. 굴림 고스트 **금지**.
- 헤더 `.hangul-practice-glyph`: 굴림 = **정답 참고 라벨** (메트릭 ≠ pedagogical path — 의도).
- opacity on missing roster cells만 (연습 SVG fade 아님).

---

## 리서치 문서 정렬

| 문서 | 역할 |
|------|------|
| `research-stroke-order-ui-ko.md` | HW 채택 제안 (초기) |
| `hangul-stroke-shapes-learned-ko.md` | 자모별 획·함정 학습 노트 |
| `research-hangul-stroke-order-blog-ko.md` | 블로그 획순 재구축 근거 |
| **`audit-hanzi-writer-hangul-ko.md`** | **중국 leftover 감사 · 현재 SoT** |

---

## Paul 재테스트

1. Hard refresh Hangul 페이지 (`Ctrl+Shift+R`). 로컬이면 `http://…/hub/app/hangul/` 또는 배포 URL.
2. 상단 로스터에서 **ㄹ · ㅂ · ㅇ · ㅋ** Replay → Trace.
3. 확인: 모양 안 뒤집힘 · Trace 시 잉크가 “녹아 사라지지” 않고 바로 회색 윤곽 · 힌트색이 시안이 아님.
4. (선택) ㅂ 가운데→아래 가로 순서 · ㅇ 맨 위 시작 · ㄹ 3획[기역,긋고,니은] · ㅋ 닫기 가로.

캐시 토큰: **`20260727c`** (`hangul.js` / `hangul.css` / stroke JSON `?v=`). Tube joint polish 이후.

### 감사 시 자동 검증 (2026-07-27)

- `node scripts/_smoke_hangul_path.js` → OK (wrapper Hangul-safe 가드 포함).
- HTTP: `/app/hangul/` 가 `20260727b` · `HANGUL_HW` · `strokeFadeDuration:0` 서빙 확인.
- HW `getScalingTransform(280,280,12)` → `scale(…, -…)` **Y-flip 실측**.
- ㄹㅂㅇㅋ 데이터 체크: 획수·ㅂ 가운데/아래 Y · ㅇ 상단 시계 시작 · ㅋ 닫기 Y=450 → pass.
- 수동 Trace 채점은 Paul hard-refresh 후 (자동화 한계 유지).

---

## 수정하지 않은 것

- Hanzi Writer vendor 본체 포크/재작성 없음.
- ㅈ 정식 stroke 제작 (별도 콘텐츠 작업).
- TOPIK `app.js` trace 타입 연결 (Hangul 트랙만).

*작성: Cursor · 2026-07-27 · 커밋/푸시 없음*
