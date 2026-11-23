# Creates or updates global Cursor MCP config (Windows).
# Run in PowerShell — NOT inside Cursor's MCP file editor if that tab keeps loading.
#
#   Right-click → Run with PowerShell
# or:
#   powershell -ExecutionPolicy Bypass -File "%USERPROFILE%\Documents\paul-intro\scripts\windows-setup-mcp.ps1"

$ErrorActionPreference = "Stop"
$dir = Join-Path $env:USERPROFILE ".cursor"
$file = Join-Path $dir "mcp.json"

$json = @'
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
'@

if (-not (Test-Path $dir)) {
  New-Item -ItemType Directory -Path $dir -Force | Out-Null
  Write-Host "Created folder: $dir"
}

# Backup existing file
if (Test-Path $file) {
  $bak = "$file.bak-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
  Copy-Item $file $bak -Force
  Write-Host "Backup: $bak"
}

Set-Content -Path $file -Value $json -Encoding UTF8
Write-Host "Wrote: $file"
Write-Host ""
Write-Host "Next:"
Write-Host "  1. Fully QUIT Cursor (tray icon too), then reopen."
Write-Host "  2. Settings -> Tools and MCP -> Login on notion and google-drive."
Write-Host "  3. Chat: MCP connected"

Read-Host "Press Enter to close"
