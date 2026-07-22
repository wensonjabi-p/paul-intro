# Agent-style API test: chat + simple tool-call round-trip (what Cursor Agent uses)
. "$PSScriptRoot\llm-keys.local.ps1"

function Test-Chat {
    param([string]$Name, [string]$Url, [string]$Key, [string]$Body)
    Write-Host "`n=== $Name chat ===" -ForegroundColor Cyan
    try {
        $r = Invoke-RestMethod -Uri $Url -Method POST -Headers @{
            Authorization = "Bearer $Key"; "Content-Type" = "application/json"
        } -Body $Body -TimeoutSec 90
        $t = $r.choices[0].message.content
        Write-Host "PASS: $($t.Substring(0, [Math]::Min(100, $t.Length)))" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "FAIL: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message -ForegroundColor DarkRed }
        return $false
    }
}

function Test-KimiTool {
    Write-Host "`n=== Kimi tool-call (Agent-like) ===" -ForegroundColor Cyan
    $body = @{
        model = "kimi-k2.5"
        messages = @(@{ role = "user"; content = "What is 2+2? Use the answer tool." })
        tools = @(@{
            type = "function"
            function = @{
                name = "answer"
                description = "Return the numeric answer"
                parameters = @{
                    type = "object"
                    properties = @{ value = @{ type = "integer" } }
                    required = @("value")
                }
            }
        })
        thinking = @{ type = "disabled" }
    } | ConvertTo-Json -Depth 10 -Compress
    try {
        $r = Invoke-RestMethod -Uri "https://api.moonshot.cn/v1/chat/completions" -Method POST -Headers @{
            Authorization = "Bearer $env:MOONSHOT_API_KEY"; "Content-Type" = "application/json"
        } -Body $body -TimeoutSec 90
        $tc = $r.choices[0].message.tool_calls
        if ($tc) { Write-Host "PASS: tool_calls present ($($tc.Count))" -ForegroundColor Green; return $true }
        Write-Host "WARN: no tool_calls, content: $($r.choices[0].message.content)" -ForegroundColor Yellow
        return $true
    } catch {
        Write-Host "FAIL: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message -ForegroundColor DarkRed }
        return $false
    }
}

function Test-DeepSeekTool {
    Write-Host "`n=== DeepSeek tool-call (Agent-like) ===" -ForegroundColor Cyan
    $body = '{"model":"deepseek-v4-flash","messages":[{"role":"user","content":"What is 2+2? Use the answer tool."}],"tools":[{"type":"function","function":{"name":"answer","description":"Return numeric answer","parameters":{"type":"object","properties":{"value":{"type":"integer"}},"required":["value"]}}}],"thinking":{"type":"disabled"}}'
    try {
        $r = Invoke-RestMethod -Uri "https://api.deepseek.com/v1/chat/completions" -Method POST -Headers @{
            Authorization = "Bearer $env:DEEPSEEK_API_KEY"; "Content-Type" = "application/json"
        } -Body $body -TimeoutSec 90
        $tc = $r.choices[0].message.tool_calls
        if ($tc) { Write-Host "PASS: tool_calls present ($($tc.Count))" -ForegroundColor Green; return $true }
        Write-Host "WARN: no tool_calls, content: $($r.choices[0].message.content)" -ForegroundColor Yellow
        return $true
    } catch {
        Write-Host "FAIL: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message -ForegroundColor DarkRed }
        return $false
    }
}

Write-Host "Direct API + Agent-style tests" -ForegroundColor White
$k1 = Test-Chat -Name "Kimi" -Url "https://api.moonshot.cn/v1/chat/completions" -Key $env:MOONSHOT_API_KEY -Body '{"model":"kimi-k2.5","messages":[{"role":"user","content":"Reply exactly: KIMI_OK"}],"max_tokens":20,"thinking":{"type":"disabled"}}'
$d1 = Test-Chat -Name "DeepSeek" -Url "https://api.deepseek.com/v1/chat/completions" -Key $env:DEEPSEEK_API_KEY -Body '{"model":"deepseek-v4-flash","messages":[{"role":"user","content":"Reply exactly: DEEPSEEK_OK"}],"max_tokens":20,"thinking":{"type":"disabled"}}'
$kt = Test-KimiTool
$dt = Test-DeepSeekTool

Write-Host "`n--- Summary ---" -ForegroundColor White
Write-Host "Kimi chat:       $(if($k1){'PASS'}else{'FAIL'})"
Write-Host "DeepSeek chat:   $(if($d1){'PASS'}else{'FAIL'})"
Write-Host "Kimi tool-call:  $(if($kt){'PASS'}else{'FAIL'})"
Write-Host "DeepSeek tool:   $(if($dt){'PASS'}else{'FAIL'})"
