# Paul PM Hub — 생각 · 목표 · 클릭 연동

> **목적:** Notion / Google / Canva / GitHub에서 **한 번 클릭**으로 같은 일(work item)의 진행·목표·산출물로 이동한다.  
> **원본:** 일상은 **Notion**, 백업·에이전트는 **`hub/config/ops-links.json`** + `docs/wensonjabi-ecosystem-master-plan.md`.

---

## 1. 한 화면 개념

```
                    ┌─────────────────┐
                    │  Notion Home    │
                    │  (Paul opens)   │
                    └────────┬────────┘
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
 Milestones            Ecosystem Map            Decisions
 (PM 일정·목표)         (진행·링크 허브)          (확정 기록)
     │                       │
     │    Relation           │  URL 필드 → 클릭
     └──────────►────────────┼──► GitHub PR
                             ├──► Google Doc / Sheet
                             ├──► Canva design
                             ├──► Vercel deploy
                             └──► Lemon Squeezy product
```

**Staging 미러:** Vercel `hub/ops/` 페이지가 `ops-links.json`을 읽어 같은 링크를 버튼으로 보여 준다 (Notion VPN 불안할 때).

---

## 2. Notion — DB 4개 (복제 후 URL만 채우기)

### 2.1 Ecosystem Map (진행 허브 ★)

각 행 = Phase 0 hub, Phase 1 Pro, Reddit 파이프라인 등.

| 속성 | 타입 | 용도 |
|------|------|------|
| Name | Title | 작업 이름 |
| Phase | Select | 0, 1, 2, 3, 4, 5 |
| Area | Select | Hub, App, Blog, Teach, Shop, Ops, Brand |
| Status | Select | Idea → Review → Ready → Doing → Beta → Live → Done |
| Progress | Number % | 0–100 (주관적 OK) |
| Goal | Text | 이번 단계에서 “끝”의 정의 (exit criteria 한 줄) |
| Paul OK | Checkbox | **체크 전에는 코드/발행 안 함** |
| Target date | Date | PM 목표일 |
| Milestone | Relation → Milestones | 목표 일정에 연결 |
| Depends on | Relation → Map (self) | 선행 작업 |
| Notion page | URL | 상세 메모 |
| GitHub | URL | PR / Issue / repo path |
| Vercel | URL | preview / production |
| Google Doc | URL | 초안 |
| Google Sheet | URL | 큐·피드백 표 (행은 설명에 `#row=`) |
| Canva | URL | 시안 |
| Lemon Squeezy | URL | 상품/대시보드 |
| Ops JSON id | Text | `ops-links.json`의 `id` (동기화용) |

**뷰**

- **Board** — Status  
- **Timeline** — Target date  
- **Paul review** — Status = Review OR (Ready AND Paul OK = false)  
- **Now** — Status = Doing  
- **By Phase** — Phase 그룹  

### 2.2 Milestones (PM 스케줄·목표)

| 속성 | 타입 |
|------|------|
| Name | Title | 예: Phase 0 exit, Beta 5 students |
| Phase | Select |
| Start / Target | Date |
| Status | Select | Planned, Active, Met, Slipped |
| Success metric | Text | 예: “Vercel hub URL + 1 mock 완료” |
| Map items | Relation → Ecosystem Map |

**뷰:** Timeline (Target), Table filtered Active.

### 2.3 Inbox (생각 캡처)

| 속성 | 타입 |
|------|------|
| Note | Title |
| Captured | Date |
| Status | Raw → Processed |
| Promote to | Relation → Map (비우면 주간 정리 때 연결) |

### 2.4 Decisions

| 속성 | 타입 |
|------|------|
| Decision | Title |
| Date | Date |
| Status | Proposed / Locked |
| Related | Relation → Map |

---

## 3. 클릭 연동 규칙

1. **모든 외부 도구 URL은 Map 행에만** 넣는다 (Inbox에는 넣지 않음).  
2. Google Sheet는 Map의 **Sheet URL** + 페이지 설명에 `Row 12`처럼 적거나 Sheet 열 `map_id`에 `ops-links` id 기록.  
3. Canva는 디자인마다 **Share link** → Map **Canva** 필드.  
4. GitHub PR merge 후 → Status **Beta/Done**, Progress 갱신, Notion **GitHub** = merged PR URL.  
5. **`hub/config/ops-links.json`** 의 `links.notion` / `links.github` 등을 Map과 **같은 값**으로 유지 (에이전트가 PR 전후로 갱신).

---

## 4. 주간 루프 (5분 + 30분)

| 단계 | 어디 | 행동 |
|------|------|------|
| Capture | Notion Inbox | 생각·Reddit·수업 피드백 |
| Sort | Map | Phase/Area, Goal, Target date |
| Review | 뷰 “Paul review” | Paul OK 체크 |
| Execute | GitHub / Docs / Canva | OK 난 행만 |
| Reflect | Map + Milestones | Progress %, Status, 링크 붙이기 |

---

## 5. Notion 템플릿 시작

1. [Code with Notion board](https://notion.notion.site/code-with-notion-board) 복제  
2. 위 속성 추가 (URL 필드 7개 + Relation 2개)  
3. Milestones / Inbox / Decisions DB 생성 후 Home에 링크  
4. Home 상단에 **Linked view** 3개: Now · Paul review · Timeline  
5. 복제한 **Map DB URL** → `ops-links.json` → `notion.mapDatabase`  
6. 각 Map 행 `Ops JSON id` ↔ json `items[].id`  

---

## 6. Google Sheet (콘텐츠 큐) — 열 권장

| map_id | reddit_url | status | doc_url | ko_doc_url | published_url | notion_url |

`map_id` = `content-loop`, `blog-post-001` 등 — Map 행과 1:1.

---

## 7. 에이전트(Cursor) 약속

- 작업 시작: Map/id 또는 `ops-links.json` id 명시  
- PR 본문: Notion Map URL (있으면)  
- PR merge 후: `ops-links.json` status/progress/links 갱신  
- Paul OK 없는 Ready 항목은 구현하지 않음  

---

## 8. 현재 repo 매핑 (초기)

| ops id | 설명 |
|--------|------|
| `milestone-phase-0` | Phase 0 exit |
| `phase-0-hub` | hub/ staging |
| `phase-0-vercel` | Vercel project #2 |
| `phase-1-app-mvp` | hub/app |
| `phase-1-pro-lemon` | Pro + webhook |
| `phase-2-content-loop` | Sheet + blog |
| `brand-canva` | Brand kit |
| `identity-wensonjabi` | paul-intro live |

상세 URL은 `hub/config/ops-links.json`.

---

*Master plan: `docs/wensonjabi-ecosystem-master-plan.md` §11*
