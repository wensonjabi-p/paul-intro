# SRS 복습 v1 — 데모 가이드 (Paul)

> **목적:** 모의고사 → 약점 태그 → **오늘 복습 due** → 문제 풀기 → **다음 복습일**까지 한 바퀴를 눈으로 확인.

---

## 1. 어떤 데이터를 쓰나?

| 저장 | 위치 | 내용 |
|------|------|------|
| **문항 은행** | `hub/app/data/verified-read-01.json` … `03.json` (jabi. 원작) | 읽기 MCQ + tags |
| **학습 기록** | 브라우저 `localStorage` 키 `topik-coach-v1` | streak, xp, **`srs`**, attempts |

### `state.srs[태그]` (v1)

```json
{
  "grammar:와/과": {
    "count": 2,
    "nextReview": "2026-07-25",
    "intervalDays": 1,
    "ease": 2.5
  }
}
```

- **count** — 그 태그로 틀린 누적(모의+복습)
- **nextReview** — **이 날짜까지 오면** “오늘 복습 대상”
- **intervalDays** — 맞추면 늘어남(1→3→6…), 틀리면 1일

**듣기/AI는 Phase 1 다음 단계** — 지금은 **읽기 JSON + 태그**만.

---

## 2. 전체 흐름 (앞으로 확장)

```
[문항 JSON] ──► 모의고사 ──► 틀린 tags ──► srs[nextReview=오늘]
                      │
                      ▼
              홈 “오늘 복습 N”
                      │
                      ▼
         복습 세션 (태그당 1문항, 최대 3)
                      │
            맞음 ──► nextReview += interval
            틀림 ──► nextReview = 내일
```

---

## 3. 데모 보는 방법 (5분)

1. 터미널: `cd hub` → `python -m http.server 8080`
2. 브라우저: http://localhost:8080/app/
3. 모드 하나 고르기 (Catch 등)
4. **약점 태그 보기** → **「데모 약점 넣기 (3개)」** 클릭  
   → `grammar:와/과`, `vocab:형용사`, `grammar:존댓말` 오늘 due
5. **「오늘 복습 (N)」** (홈 버튼) 또는 SRS 화면에서 복습 시작 → 최대 3문항
6. 결과 화면에서 **다음 복습일** + **남은 복습 / 홈 / 약점 보기** CTA 확인
7. 홈으로 → **「오늘 복습」** 숫자 감소 (맞춘 태그는 미래로 밀림)

**모의 후:** 틀린 태그가 있으면 결과에서 **「오늘 복습 시작」**으로 바로 이어갈 수 있음.

---

## 4. 코드 위치

- `hub/app/js/app.js` — `getDueTags`, `startSrsReview`, `scheduleSrs`, `seedDemoSrs`
- `hub/app/index.html` — `#view-srs` 버튼 2개

---

*다음 B 단계: due만이 아닌 “간격 UI”, 듣기 JSON, Map DB 연동은 이후.*
