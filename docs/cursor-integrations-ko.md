# Cursor 연동 — Notion · Canva · Google (Paul용)

> **목표:** Paul가 Cursor에서 **한 번 로그인**하면, 에이전트가 Notion/Canva를 **직접 열고·수정**하고 진행 상황을 맞춥니다.  
> **지금 상태:** 이 Cloud Agent 안에서는 OAuth를 대신 할 수 **없습니다**. Paul PC **Cursor 앱** + (Cloud Agent 쓸 때) **cursor.com/agents MCP** 에서 연결해야 합니다.

---

## 0. 한 줄 요약

| 앱 | Cursor MCP | 설정 위치 |
|----|------------|-----------|
| **Notion** | `https://mcp.notion.com/mcp` | **repo `.cursor/mcp.json`** (이미 추가됨) |
| **Canva** | `https://mcp.canva.com/mcp` |同上 |
| **Google Drive** (Docs/Sheet 파일) | `https://drivemcp.googleapis.com/mcp/v1` |同上 |

**중요:** Cursor에서 **`paul-intro` 폴더를 워크스페이스로 열어야** 프로젝트 `.cursor/mcp.json` 이 적용됩니다.  
(화면에 *No workspace folder open* 이면 MCP 파일이 비어 보일 수 있음 → **File → Open Folder → repo 루트**.)

연결 후 각 서버 옆 **Login / Connect** 한 번씩 (OAuth). Canva는 플러그인으로 이미 되어 있으면 **중복**일 수 있음 — 하나만 켜도 됩니다.

---

## 1. Notion (필수)

### A. Cursor Desktop (Paul PC)

1. Cursor 왼쪽 **Customize** (또는 [Marketplace](https://cursor.com/marketplace))  
2. **Notion** (`notion-workspace`) 설치  
3. **⌘⇧P** / **Ctrl+Shift+P** → **`Cursor Settings: Tools & MCP`**  
4. 목록에서 **Notion** → **Connect** → 브라우저로 Notion 로그인 · 허용  
5. Notion에서 **Paul PM 페이지**에 Integration 접근 허용 (처음 연결 시 Notion이 “페이지 선택” UI를 띄울 수 있음 →  
   https://app.notion.com/p/3a56d7c83f4481229fdde56471410908 포함)

### B. Cloud Agent (지금 이 대화 같은 원격 에이전트)

Desktop만 연결하면 **Cloud Agent는 Notion을 못 쓸 수 있습니다.**

1. [cursor.com/agents](https://cursor.com/agents)  
2. **MCP** 메뉴 → **Notion** 켜기 → **OAuth** (한 번 더)  
3. 팀 계정이면: Admin이 [Dashboard → Integrations & MCP](https://cursor.com/dashboard) 에 서버 등록 + **각 멤버 OAuth**

### C. 연결 확인

Paul: Cursor 채팅에  
**「Notion MCP 연결됐는지 확인하고, 내 PM 페이지 아래에 ‘한국어 생태계 — Paul PM’ 만들어줘」**

에이전트가 페이지/DB를 만들면 성공.

---

## 2. Canva (브랜드·썸네일)

1. Marketplace → **Canva** 설치  
2. **Tools & MCP** → **Canva** → **Connect** (OAuth)  
3. Cloud Agent도 쓰면 → [cursor.com/agents](https://cursor.com/agents) MCP에서 Canva OAuth  

연결 후:  
**「brand.json 색이랑 맞는 Canva 브랜드 키트 확인해줘」** → 에이전트가 Canva MCP로 디자인 읽기/수정 (Paul OK 전에는 공개용 export 안 함).

Canva 폴더 URL 생기면 → `hub/config/ops-links.json` → `canva.brandFolder` 에 붙여 넣기 → `/ops/` **Canva** 버튼 활성화.

---

## 3. Google (Docs · Sheet) — 공식 MCP 없음

Cursor **공식 플러그인 목록에 Google Workspace MCP는 없습니다.**

**당장 쓸 수 있는 방법 (택1):**

| 방법 | 설명 |
|------|------|
| **A. Notion만** | 할 일·블로그 큐를 Notion DB로 (에이전트가 자동 관리) — **추천** |
| **B. Sheet URL만** | Paul가 Sheet 만들고 **링크 복사** → `ops-links.json` → `google.contentQueueSheet` → 에이전트는 링크·CSV 템플릿(`docs/templates/google-content-queue.csv`) 기준으로 문서화; **셀 자동 편집은 OAuth/API 추가 전까지 수동** |
| **C. 나중에** | Google Cloud OAuth + 커뮤니티 MCP 또는 Apps Script webhook (Phase 2+) |

Sheet 만들기 (B):

1. Google Sheets → 새 스프레드시트  
2. **파일 → 가져오기 → 업로드** → repo의 `docs/templates/google-content-queue.csv`  
3. 공유: Paul + (선택) “링크 있는 사용자 보기”  
4. URL을 `hub/config/ops-links.json` 의 `google.contentQueueSheet` 에 저장  

---

## 4. 연결 후 에이전트가 **자동으로** 하는 일

`hub/config/integrations.json` 에 정의됨. 요약:

- **Notion:** PM 페이지·Map DB 유지, Phase/Progress/PR 링크 갱신, `ops-links.json` 과 URL 맞춤  
- **Canva:** `brand.json` 색·톤과 디자인 정합  
- **Google:** Sheet URL 있으면 큐 참고; 편집은 Notion 우선  

**규칙:** `ops-links.json` 에 `paulOk: false` 인 항목은 Paul OK 전까지 코드 작업 안 함.

---

## 5. 문제 해결

| 증상 | 조치 |
|------|------|
| MCP 도구가 안 보임 | Notion/Canva 플러그인 재설치, **Developer: Reload Window** |
| Desktop만 되고 Cloud는 안 됨 | [cursor.com/agents](https://cursor.com/agents) MCP에서 Notion/Canva **별도 OAuth** |
| Notion “page not found” | Notion **Connections**에서 Integration에 PM 페이지 공유 |
| OAuth 창 안 뜸 | **Tools & MCP** 에서 Disconnect → Connect 다시 |

로그: Cursor **Output → MCP**.

---

## 6. Paul 체크리스트 (복붙)

```
[ ] Cursor Desktop — Notion Connect
[ ] Cursor Desktop — Canva Connect
[ ] (Cloud Agent 씀) cursor.com/agents — Notion + Canva OAuth
[ ] 채팅: "MCP 연결했어 — Notion PM 세팅해줘"
[ ] (선택) Google Sheet URL → ops-links.json
```

완료 후 **`MCP 연결했어`** 한 줄 보내 주세요.
