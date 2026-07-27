# 획순 트레이싱 — 자음 14개 데이터 (ㅈ 정식 데이터 추가 완료)

> `docs/research-stroke-order-ui-ko.md`의 파일럿 실행 결과.  
> **2026-07-26:** Paul 분담 변경 — **구현은 Cursor**, Claude는 이후 확인·리서치·기획만.  
> **2026-07-27:** Hanzi Writer×한글 **전체 감사** → [`docs/audit-hanzi-writer-hangul-ko.md`](../../../../../docs/audit-hanzi-writer-hangul-ko.md) (이전 부분 verify 대체).  
> **2026-07-27 (밤):** Paul 육안 QA — ㅈ 획순 로스터 누락 · ㅍ 모양 불명확 · ㅎ 비율 · ㄲㄸㅃㅆ 세로 과다. `scripts/gen-jamo-strokes-gulim.py`에서 4개 전부 수정, `jamo-strokes-13.json`에 **ㅈ(jieut) 정식 데이터 추가**(ㅊ의 모자 뺀 나머지 재사용). `hangul.js` 쪽 로스터 배선은 아직 — 아래 "다음 단계" 참고.  
> 앱 배선: `hub/app/hangul/` (상단 자모 로스터 + 풀스크린 Trace 패널). TOPIK `app.js` 퀴즈 엔진에는 아직 미연결.

## 검증된 것

- Hanzi Writer(v3.7.3, MIT, `hub/app/js/vendor/hanzi-writer.min.js`)에 **커스텀 한글 자모 데이터 주입 성공** — `charDataLoader` 옵션으로 한자 대신 자체 제작 stroke/median 데이터 로딩.
- 좌표계 확인: 라이브러리가 렌더링에 적용하는 transform을 직접 읽어서(`translate(x,y) scale(s,-s)`) — **Y축이 위로 증가**(SVG 표준과 반대)임을 실측 확인(문서에 없던 부분).
- **자음 13개 전체**(`jamo-strokes-13.json`)를 hbar/vbar/diag/ring 조합 헬퍼 함수로 제작 → `_pilot-check13.html`에서 렌더링해 각 stroke의 실제 SVG path를 Python 소스와 대조 검증.
  - **ㄱ 최초 버전에 방향 오류 발견·수정**: 처음 만든 버전은 세로획이 왼쪽에, 가로획이 아래쪽에 있어서(Y축 반전 계산 실수) 실제 ㄱ 모양과 반대였음. bounding box만 봐서는 못 잡는 오류라 실제 렌더링된 path 문자열을 Python 생성값과 직접 대조해서 발견·수정.
  - 대각선 획(ㅅ의 두 획)도 좌표 정확히 검증됨.
  - **ㅂ (2026-07-26):** 아랫가로를 Y-up 위쪽(≈750)에 넣어 뒤집힌 ㅂ처럼 보임 → 아래(≈150)로 수정. `ssangbieup` 동기. CSS transform 문제는 아니었음.
  - **연속 획 튜브 (2026-07-26 밤):** `scripts/gen-jamo-strokes-gulim.py`(shapely round buffer)로 **획당 단일 연속 튜브**.
  - **튜브 조인트 미학 (2026-07-27):** `BUFFER_RES=18` + light simplify — 각진 fillet 완화 · median/획순 불변 · cache `20260727c`.
  - **블로그 획순 + 단일 시각 (2026-07-26 critical):** CSS 굴림 고스트 제거(어긋남). HW `showOutline`만 사용. ㄹㅊㅋㅌㅂㅇㅁㅍ 재구축 — `docs/research-hangul-stroke-order-blog-ko.md`.
- 애니메이션: 전 자모 **균일** `strokeAnimationSpeed: 0.5`, `delayBetweenStrokes: 450`.

## 확인 못 한 것 (다음에 필요)

- **퀴즈 모드(사용자가 직접 따라 그려서 채점받는 기능)를 자동화 테스트로는 검증 못 함** — 합성 이벤트로는 라이브러리 내부 리스너가 안 잡힘(자동화 한계로 보임, 라이브러리 버그 아닐 가능성 높음). **실제 사람이 마우스/터치로 직접 그려보는 수동 테스트 필요.**

## 파일

- `jamo-strokes-13.json` — 자음 13개 strokes/medians (연속 round-tube outline)
- `jamo-strokes-tense.json` — ㄲㄸㅃㅆ (동일 생성기)
- `gulim-glyph-ref.json` — New Gulim(NGULIM.TTF) 전체 글리프 path (QA/참고, 다획 분리 아님)
- `scripts/gen-jamo-strokes-gulim.py` — median → shapely buffer 재생성
- `_check-gulim.html` — HW-only outline+ink 확인 (굴림 고스트 없음)
- `_pilot-check13.html` — 13개 전체 렌더링 확인 페이지
- `_pilot-check.html` — 최초 3개(ㅣㅇㄱ) 파일럿 + 퀴즈 자동 트레이스 시도 페이지
- `jamo-strokes-pilot.json` — 최초 파일럿 3개 데이터(구버전, 참고용으로 남겨둠)

## 다음 단계

1. ~~**(Cursor) `hangul.js` 로스터 배선**~~ **Done 2026-07-27** — `ROSTER_PARTNERS`(13, ㅈ 없음) vs `ROSTER_STROKE`(14, ㅅ 다음 ㅈ/`jieut`) 분리 · 획순 허브는 `ROSTER_STROKE` · `STROKE_STUB_IDS`에서 `ji` 제거 · 파트너 온보딩은 `app.js` 13목록 유지(ㅈ=자비 가이드).
2. Hangul 페이지에서 새로 고친 ㅍ·ㅎ·ㄲㄸㅃㅆ·**ㅈ** Replay·Trace 육안 재확인(Paul).
3. 나머지 ㄹ·ㅂ·ㅇ·ㅋ Replay·Trace 수동 확인(진행 중이던 항목, 이번 수정과 별개).
4. (선택) ㅉ(쌍지읒) — jieut를 옆으로 축소 복제(`giyeok→ssanggiyeok` 방식).
5. (선택) TOPIK `app.js`에 `type: "trace"` 문제 타입 — 지금은 Hangul 트랙만.
