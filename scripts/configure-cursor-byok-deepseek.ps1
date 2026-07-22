# Configure Cursor BYOK for DeepSeek on Windows (VPN OFF)
# Usage: .\scripts\configure-cursor-byok-deepseek.ps1

$ErrorActionPreference = "Stop"
$ScriptDir = $PSScriptRoot
$KeysFile = Join-Path $ScriptDir "llm-keys.local.ps1"
$StateDb = Join-Path $env:APPDATA "Cursor\User\globalStorage\state.vscdb"
$BackupDb = "$StateDb.bak-byok-deepseek"

$CursorExe = Join-Path $env:LOCALAPPDATA "Programs\cursor\Cursor.exe"
$CursorApp = Join-Path (Split-Path $CursorExe -Parent) "resources\app"

$AppUserKey = "src.vs.platform.reactivestorage.browser.reactiveStorageServiceImpl.persistentStorage.applicationUser"
$SecretKey = "secret://cursorAuth/openAIKey"
$DeepSeekBaseUrl = "https://api.deepseek.com/v1"
$ModelName = "deepseek-v4-flash"
$ApiKeyEnvName = "DEEPSEEK_API_KEY"

if (-not (Test-Path $KeysFile)) { Write-Error "Missing llm-keys.local.ps1" }
. $KeysFile

try { $ApiKeyValue = (Get-Item -Path "Env:$ApiKeyEnvName" -ErrorAction SilentlyContinue).Value } catch { $ApiKeyValue = $null }
if (-not $ApiKeyValue -or $ApiKeyValue -like "sk-your-*") {
  Write-Error "$ApiKeyEnvName not loaded or still placeholder"
}
Write-Host ("${ApiKeyEnvName}: loaded")

if (-not (Test-Path $StateDb)) { Write-Error "state.vscdb not found" }
Copy-Item -LiteralPath $StateDb -Destination $BackupDb -Force
Write-Host "Backup: $BackupDb"

$EncryptHelper = Join-Path $ScriptDir "configure-cursor-byok-encrypt.cjs"
$EncryptedPayloadFile = Join-Path $env:TEMP "cursor-openai-key.enc.json"
if (Test-Path $EncryptedPayloadFile) { Remove-Item $EncryptedPayloadFile -Force }

if (-not (Test-Path $CursorExe)) { Write-Error "Cursor.exe not found" }
if (-not (Test-Path $CursorApp)) { Write-Error "Cursor app folder not found" }

$useLegacy = $false
$prevElectron = $env:ELECTRON_RUN_AS_NODE
$env:ELECTRON_RUN_AS_NODE = "1"
$env:API_KEY_ENV_VAR_NAME = $ApiKeyEnvName

try {
  Push-Location $CursorApp
  & $CursorExe $EncryptHelper $EncryptedPayloadFile 2>&1 | ForEach-Object {
    $line = "$_"
    if ($line -match "sk-") { return }
    Write-Host $line
  }

  if ($LASTEXITCODE -ne 0 -or -not (Test-Path $EncryptedPayloadFile)) {
    Write-Warning "Encrypted secret write unavailable; using legacy plaintext key row for Cursor to migrate on launch."
    $useLegacy = $true
  }
}
catch {
  Write-Warning "Encryption helper error; using legacy plaintext key row for Cursor to migrate on launch."
  $useLegacy = $true
}
finally {
  Pop-Location
  if ($null -eq $prevElectron) { Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue }
  else { $env:ELECTRON_RUN_AS_NODE = $prevElectron }
}

$PyScript = Join-Path $ScriptDir "configure-cursor-byok-apply.py"
$pyArgs = @(
  $PyScript,
  "--db", $StateDb,
  "--app-user-key", $AppUserKey,
  "--secret-key", $SecretKey,
  "--base-url", $DeepSeekBaseUrl,
  "--model", $ModelName,
  "--api-key-env-name", $ApiKeyEnvName
)

if ($useLegacy) {
  $pyArgs += "--use-legacy-key"
} else {
  $pyArgs += @("--encrypted-file", $EncryptedPayloadFile)
}

python @pyArgs
Remove-Item -LiteralPath $EncryptedPayloadFile -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== Verification ===" -ForegroundColor Cyan
python (Join-Path $ScriptDir "check-cursor-byok-detail.py")

python -c "import sqlite3; c=sqlite3.connect(r'$StateDb'); s=c.execute('SELECT 1 FROM ItemTable WHERE key=?',('secret://cursorAuth/openAIKey',)).fetchone(); l=c.execute('SELECT 1 FROM ItemTable WHERE key=?',('cursorAuth/openAIKey',)).fetchone(); print('openAIKey_secret_present:', bool(s)); print('openAIKey_legacy_present:', bool(l))"

