# DeepSeek / Kimi(Moonshot) API 연결 테스트 — 중국 학기 Cursor 연동용
# 사용법 (PowerShell):
#   copy scripts\llm-keys.local.ps1.example scripts\llm-keys.local.ps1  # keys fill
#   .\scripts\test-llm-api.ps1

$ErrorActionPreference = "Stop"

$keysFile = Join-Path $PSScriptRoot "llm-keys.local.ps1"
if (Test-Path $keysFile) { . $keysFile }

function Test-LlmApi {
    param(
        [string]$Name,
        [string]$Url,
        [string]$ApiKey,
        [string]$Model,
        [string]$Body
    )
    Write-Host "`n=== $Name ===" -ForegroundColor Cyan
    if (-not $ApiKey) {
        Write-Host "SKIP: API key not set" -ForegroundColor Yellow
        return $false
    }
    try {
        $headers = @{
            "Authorization" = "Bearer $ApiKey"
            "Content-Type"  = "application/json"
        }
        $r = Invoke-RestMethod -Uri $Url -Method POST -Headers $headers -Body $Body -TimeoutSec 60
        $text = $r.choices[0].message.content
        Write-Host "OK: $($text.Substring(0, [Math]::Min(80, $text.Length)))..." -ForegroundColor Green
        return $true
    } catch {
        Write-Host "FAIL: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message -ForegroundColor DarkRed }
        return $false
    }
}

Write-Host "LLM API connectivity test (Korea / China direct)" -ForegroundColor White

$kimiOk = Test-LlmApi -Name "Kimi (Moonshot CN)" `
    -Url "https://api.moonshot.cn/v1/chat/completions" `
    -ApiKey $env:MOONSHOT_API_KEY `
    -Model "kimi-k2.5" `
    -Body '{"model":"kimi-k2.5","messages":[{"role":"user","content":"Reply with exactly: KIMI_OK"}],"max_tokens":20,"thinking":{"type":"disabled"}}'

$dsOk = Test-LlmApi -Name "DeepSeek" `
    -Url "https://api.deepseek.com/v1/chat/completions" `
    -ApiKey $env:DEEPSEEK_API_KEY `
    -Model "deepseek-v4-flash" `
    -Body '{"model":"deepseek-v4-flash","messages":[{"role":"user","content":"Reply with exactly: DEEPSEEK_OK"}],"max_tokens":20,"thinking":{"type":"disabled"}}'

Write-Host "`n--- Summary ---" -ForegroundColor White
Write-Host "Kimi:     $(if ($kimiOk) { 'PASS' } else { 'FAIL/SKIP' })"
Write-Host "DeepSeek: $(if ($dsOk) { 'PASS' } else { 'FAIL/SKIP' })"
if ($kimiOk -or $dsOk) {
    Write-Host "`nNext: Cursor Settings -> Models -> Add Custom Model (see chat for values)" -ForegroundColor Green
} else {
    Write-Host "`nSet MOONSHOT_API_KEY and/or DEEPSEEK_API_KEY, then re-run." -ForegroundColor Yellow
}
