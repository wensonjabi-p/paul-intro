# 시황 브리핑 자동화 — 3분 셋업

Cursor Automation 대신 **GitHub Actions**로 4통 자동 발송 (PC 꺼져도 동작).

## 1. Notion Integration 만들기 (1분)

1. https://www.notion.so/profile/integrations → **New integration**
2. 이름: `Market Briefing Bot`
3. **Internal integration** → Submit
4. **Secrets** / **액세스 토큰** 탭에서 token 복사
   - `ntn_...` 또는 `secret_...` (둘 다 API 토큰)

### DB 연결 (필수)

1. [📊 시황 & 포트 브리핑](https://app.notion.com/p/8aa7fba139d54c51af5afefc206a74fc) 열기
2. `···` → **Connections** → `Market Briefing Bot` **Connect**
3. [💼 포트폴리오 마스터](https://app.notion.com/p/3a66d7c83f4481aaa071c192c86e200f)도 동일하게 Connect

## 2. GitHub Secrets 추가 (1분)

Repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret | 값 |
|--------|-----|
| `NOTION_TOKEN` | `ntn_...` 또는 `secret_...` (Integration 액세스 토큰 전체) |
| `DEEPSEEK_API_KEY` | DeepSeek API key |

선택 (Kimi 쓸 때):

| Secret | 값 |
|--------|-----|
| `AI_BASE_URL` | `https://api.moonshot.cn/v1` |
| `AI_MODEL` | `moonshot-v1-8k` |
| `AI_API_KEY` | Kimi API key |

## 3. Push + Test run (1분)

```bash
git add .github/workflows/market-briefing.yml scripts/
git commit -m "Add automated market briefing to Notion"
git push
```

GitHub → **Actions** → **Market Briefing → Notion** → **Run workflow**

- slot: `us_premarket` (또는 원하는 슬롯) → Run

성공 시 Notion DB에 새 행 + **@Paul Bhang** 푸시.

## 스케줄 (UTC+8 평일)

| 시간 | slot |
|------|------|
| 07:30 | morning |
| 11:00 | midday |
| 14:45 | kr_close |
| 16:00 | us_premarket |

## 푸시

- DB **알림** 컬럼에 Paul 자동 할당 → Person 알림
- @멘션 댓글 자동 추가 → Inbox 푸시

Notion 앱: **설정 → Mobile push ON**, 앱 종료 후 테스트.

## 로컬 테스트

```powershell
$env:NOTION_TOKEN="ntn_..."
$env:DEEPSEEK_API_KEY="sk-..."
py scripts/market_briefing.py us_premarket
```
