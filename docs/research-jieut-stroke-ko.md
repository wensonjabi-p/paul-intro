# 리서치 — ㅈ(jieut) 정식 획순 데이터 계획 (2026-07-26)

> **목적:** 한글 Trace에 **가짜 `ji` 스텁을 쓰지 않고**, 나중에 넣을 **정식 ㅈ(`jieut`) 획순 JSON** 계획만 정리.  
> **범위:** 데이터·로스터·키 이름·제작 순서. SVG path 좌표 **이번 슬라이스에서 만들지 않음**.  
> **짝:** [`hangul-stroke-shapes-learned-ko.md`](hangul-stroke-shapes-learned-ko.md) · [`research-stroke-order-ui-ko.md`](research-stroke-order-ui-ko.md) · [`research-hangul-content-fill-ko.md`](research-hangul-content-fill-ko.md) · `hub/app/assets/chars/strokes/jamo-strokes-13.json`

---

## 1. 결론

1. **`ji` 키 = 사용 금지.** 현재 `jamo-strokes-13.json`의 `ji`는 **세로 막대 1획**(ㅣ 형태)이라 **ㅈ이 아님**. Hangul UI는 이미 `STROKE_STUB_IDS = {"ji"}`로 Trace 연결을 막음 — 유지.
2. **정식 키 이름 = `jieut`.** 파트너 id·글리프 맵과 맞추고, 모음 `ㅣ`/`ji` 혼동을 끊는다. 완성 후 `GLYPH_TO_ID['ㅈ'] = 'jieut'`.
3. **파트너 로스터에는 여전히 ㅈ 없음.** ㅈ = 자비(jabi.) NPC · 성장 캐릭터 13마리 밖 (`chars/manifest.json`). **문해·획순 데이터 ≠ 파트너 아트.**
4. **제작 순서:** (1) `jieut` strokes+medians 원작 제작 → (2) 파일럿 Trace QA → (3) 레슨 Trace 셀/배지에만 연결 → (4) `ji` 키 삭제 또는 `_quarantine` 주석·별도 파일로 격리. **스텁을 고쳐 “ㅈ처럼 보이게” 하지 말 것.**
5. **ㅉ:** ㅈ 완성 **이후** `ssangjieut` (좌우 복제). 미리보기·그룹에 ㅈ 없이 ㅉ만 넣지 말 것.

---

## 2. 현황 (왜 지금 막혀 있나)

| 항목 | 상태 |
|------|------|
| 실사용 Trace | ㄱㄴㄷㄹㅁㅂㅅㅇㅊㅋㅌㅍㅎ (`jamo-strokes-13`) |
| `ji` | 세로 1획 스텁 · denylist · Trace 비활성 |
| 파트너 | 13자음 · **ㅈ 제외** |
| 문해 그룹 | `ㅅㅈ` 묶음 문자열은 가능 · Trace 칸은 ㅈ 숨김 |
| ㅊ | 이미 3획(위 짧은 획 + ㅅ형 대각) — **ㅈ 제작의 형태 참고** |

**함정:** `jamo-strokes-pilot.json` / `_pilot-check.html`에도 `ji` 라벨이 **ㅣ**로 쓰인 흔적 → 키 의미가 이미 오염. 신규 작업은 **`jieut`만**.

---

## 3. 교실 획 관행 (공식 필순 표준 없음)

국립국어원 「한글 맞춤법」은 **필순을 규정하지 않음**. jabi.는 초등·KFL 관행:

| 글자 | 권장 획수(jabi.) | 모양 메모 |
|------|------------------|-----------|
| **ㅅ** | 2 | 왼 대각↓ · 오른 대각↓ |
| **ㅈ** | **3** | ① 위 짧은 **가로**(왼→오) ② 왼 대각 ③ 오른 대각 — 즉 **ㅅ + 윗가로** |
| **ㅊ** | 3 | 위 짧은 획(점/짧은 세로·대각) + ㅅ형 두 대각 — 이미 JSON 있음 |
| **ㅉ** | 6 (2×ㅈ) | `jieut` 복제 |

**2획 교실 변형**(윗가로+왼대각을 한 획으로 묶는 경우)은 교수 노트에만 두고, **Trace JSON은 3획으로 고정**해 채점 스텝을 ㅊ·ㅅ과 맞춘다.

참고(복사 금지·좌표 재제작): [hangeul-stroke-order](https://github.com/MagisterAdamus/hangeul-stroke-order) (CC BY-SA 4.0) — 배포 시 동일조건 부담 → **jabi. 자체 1024 그리드 재제작**.

---

## 4. 데이터 스키마 (Hanzi Writer)

기존과 동일:

```json
"jieut": {
  "strokes": [ "SVG path…", "…", "…" ],
  "medians": [ [[x,y], …], …, … ]
}
```

- 좌표계 **1024×1024**, Y **위로 증가** (기존 학습 노트와 동일).
- **파일:** `jamo-strokes-13.json`에 `jieut` 추가 **또는** `jamo-strokes-jieut.json`을 로더가 merge — 구현은 stroke 담당 에이전트.
- **금지:** `ji` 키에 ㅈ path를 덮어쓰기 · `jieut` 없이 `ㅈ`만 UI에 노출 · 스텁 해제만으로 배지 ON.

---

## 5. 제작 체크리스트 (구현 시)

1. `siot` medians를 베이스로 대각 2획 정렬 → 그 위 짧은 가로 1획 추가.
2. `chieut` 1획(위 악센트)과 **혼동되지 않게** ㅈ 1획은 **가로**로 명확히.
3. `_pilot-check.html`에 `jieut` 셀만 추가 · `ji` 셀 제거/비표시.
4. `hangul.js`: `STROKE_STUB_IDS`에서 완성 후 `ji` 잔여 정리 · `GLYPH_TO_ID`에 `ㅈ → jieut`.
5. 레슨 Trace: 데이터 있는 글자만 칸 표시 (현행 규칙 유지).
6. 경음 `ㅉ`: `jieut` QA 통과 후 `jamo-strokes-tense.json`에 `ssangjieut`.
7. 파트너 Canva/성장 SVG **만들지 않음** (자비 NPC 정책).

---

## 6. 넣지 말 것

- 가짜 `ji`를 Trace·배지·크라운에 연결
- ㅈ을 파트너 13 목록에 편입
- 외부 SVG path 그대로 배포(라이선스) 또는 기출 복제
- 좌표 없는 “준비 중” 칸을 ㅈ로 위장

---

## 7. 다음 슬라이스 (이 문서 밖)

| 우선 | 작업 | 담당 가정 |
|------|------|-----------|
| P0 | `jieut` 3획 원작 JSON + pilot QA | stroke/한글 에이전트 |
| P1 | denylist·GLYPH·레슨 Trace 배선 | hangul.js |
| P2 | `ji` 격리/삭제 · tense `ㅉ` | 데이터 |
| — | 자비 스탠딩 아트 | Canva · 파트너와 분리 |

---

*작성: Cursor · research+data lane · 커밋/푸시 없음 · 가짜 path 미생성*
