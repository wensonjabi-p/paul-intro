# Cursor Models setup - Kimi + DeepSeek (China semester)
# Run: .\scripts\setup-cursor-china-models.ps1

$keysFile = Join-Path $PSScriptRoot "llm-keys.local.ps1"
if (-not (Test-Path $keysFile)) {
    Write-Host "Missing scripts/llm-keys.local.ps1" -ForegroundColor Red
    exit 1
}
. $keysFile

Write-Host ""
Write-Host "=== Cursor Settings > Models ===" -ForegroundColor Cyan
Write-Host "Scroll to TOP — Kimi is in the OpenAI block (above Google / Azure / AWS Bedrock)." -ForegroundColor White
Write-Host ""
Write-Host "[Kimi - main in China, VPN OFF]" -ForegroundColor Yellow
Write-Host "  1. OpenAI API Key          toggle ON  -> paste MOONSHOT key"
Write-Host "  2. Override OpenAI Base URL toggle ON  -> https://api.moonshot.cn/v1"
Write-Host "  3. Add custom model        kimi-k2.5 -> Enter -> toggle ON"
Write-Host ""
Write-Host "[DeepSeek - backup / coding]" -ForegroundColor Yellow
Write-Host "  Switch Base URL only: https://api.deepseek.com/v1"
Write-Host "  API Key: DEEPSEEK key from llm-keys.local.ps1"
Write-Host "  Add model: deepseek-v4-flash"
Write-Host ""
Write-Host "Notes:" -ForegroundColor DarkGray
Write-Host "  - kimi-k2.7-code = Cursor built-in; unrelated to this BYOK setup." -ForegroundColor DarkGray
Write-Host "  - China without VPN: pick kimi-k2.5 (custom add), not kimi-k2.7-code." -ForegroundColor DarkGray
Write-Host "  - Refresh Model List: skip — Moonshot needs manual add." -ForegroundColor DarkGray
Write-Host "  - One OpenAI override at a time. Default in Hangzhou: Kimi." -ForegroundColor DarkGray
Write-Host ""

if ($env:MOONSHOT_API_KEY -and $env:MOONSHOT_API_KEY -notlike "sk-your-*") {
    Write-Host "MOONSHOT key: loaded" -ForegroundColor Green
} else {
    Write-Host "MOONSHOT key: not configured" -ForegroundColor Yellow
}
if ($env:DEEPSEEK_API_KEY -and $env:DEEPSEEK_API_KEY -notlike "sk-your-*") {
    Write-Host "DEEPSEEK key: loaded" -ForegroundColor Green
} else {
    Write-Host "DEEPSEEK key: not configured" -ForegroundColor Yellow
}

Set-Clipboard -Value "https://api.moonshot.cn/v1"
Write-Host ""
Write-Host "Copied Kimi Base URL to clipboard." -ForegroundColor Green
Write-Host "Open: gear icon > Cursor Settings > Models" -ForegroundColor White
