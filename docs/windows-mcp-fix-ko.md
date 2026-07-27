# Paul — mcp.json 로딩만 될 때 (Windows)

Cursor **Settings 안의 mcp.json 탭**은 비어 있거나 **로딩만** 되는 경우가 많습니다.  
그 화면은 **쓰지 마세요.** 아래 **A → B → C** 순서로 하면 됩니다.

---

## A. Cursor 완전히 끄기

1. Cursor **File → Exit**
2. 작업 표시줄 **^** → Cursor 아이콘 있으면 **종료**
3. (선택) 작업 관리자에서 **Cursor** 프로세스 없는지 확인

**Cursor가 켜진 채로 `mcp.json` 을 열면** 로딩/잠금이 날 수 있습니다.

---

## B. PowerShell로 파일 만들기 (메모장·Cursor 편집기 X)

### B-1. PowerShell 열기

- **Win + X** → **터미널(Windows PowerShell)** 또는 **PowerShell**

### B-2. 아래 **한 블록 전체** 복사 → PowerShell에 붙여넣기 → Enter

```powershell
$dir = "$env:USERPROFILE\.cursor"
$file = "$dir\mcp.json"
New-Item -ItemType Directory -Path $dir -Force | Out-Null
@'
{
  "mcpServers": {
    "notion": {
      "url": "https://mcp.notion.com/mcp"
    },
    "canva": {
      "url": "https://mcp.canva.com/mcp"
    },
    "google-drive": {
      "url": "https://drivemcp.googleapis.com/mcp/v1"
    }
  }
}
'@ | Set-Content -Path $file -Encoding UTF8
notepad $file
```

- 마지막에 **메모장**이 열리면 내용이 위 JSON과 같는지 확인 → **저장** → 메모장 닫기  
- 메모장도 로딩이면 **B-3** 으로.

### B-3. 메모장도 안 열리면 — 파일만 만들었는지 확인

```powershell
Get-Item "$env:USERPROFILE\.cursor\mcp.json" | Format-List FullName, Length
Get-Content "$env:USERPROFILE\.cursor\mcp.json"
```

`Length` 가 0보다 크고 JSON이 보이면 **성공** (열기 없이도 OK).

### B-4. repo를 이미 clone 했다면 (선택)

```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\Documents\paul-intro\scripts\windows-setup-mcp.ps1"
```

(경로는 clone 한 위치에 맞게 바꾸세요.)

---

## C. Cursor 다시 켜고 Login

1. Cursor 실행  
2. **Settings → Tools & MCP**  
3. **notion**, **google-drive** → **Login** (Canva는 이미 33 tools면 생략 가능)  
4. 채팅: **`MCP 연결했어`**

---

## 그래도 `.cursor` 폴더가 이상하면

| 증상 | 시도 |
|------|------|
| PowerShell에서도 hang | 바이러스 백신이 `.cursor` 검사 중 → 잠시 끄거나 예외 추가 |
| `Access denied` | PowerShell **관리자 아님**으로 다시 실행; OneDrive `Users` 동기화 충돌 시 로컬 디스크 경로 사용 |
| MCP 파일 편집 포기 | [cursor.com/agents](https://cursor.com/agents) → **MCP** → Notion OAuth (Cloud Agent만 쓸 때) |

---

## Open Folder (`paul-intro`) 는 **필수 아님**

전역 `C:\Users\본인이름\.cursor\mcp.json` 만 있으면 모든 프로젝트에서 MCP가 뜹니다.
