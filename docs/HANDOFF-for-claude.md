# Handoff — Claude에서 이어서 작업하기

> **작성:** 2026-07-24  
> **Repo:** https://github.com/wensonjabi-p/paul-intro  
> **작업 브랜치:** `cursor/hub-phase0-0f7e`  
> **PR (Draft):** https://github.com/wensonjabi-p/paul-intro/pull/2  
> **main:** 아직 hub 미merge (Phase 0 전부 feature 브랜치에만 있음)

---

## 1. Owner & 목표 (한 줄)

**Paul Bhang (BHANG SANGHOON)** — 한국어교원 2급, 항저우 대학 강의, Zoom 튜터(주 5–7, $20–30/hr, 대상: 한국 거주 영어권·영어 강사).

**목표:** `wensonjabi.com` = **Paul 정체성만** 유지하고, 교육 제품(임시명 **TOPIK Coach**)은 **별도 hub**에서 TOPIK I 앱 + 블로그 + (나중) 강사·상점. AI-first, 게이미피케이션, 약점 SRS, Pro는 Lemon Squeezy, 1:1은 PayPal/Wise 직접.

---

## 2. 아키텍처 (고정)

```
[LIVE — touch only after merge checklist]
  wensonjabi.com     paul-intro (identity)

[STAGING — built here]
  Vercel project #2, Root Directory = hub/
    /           landing (Learn · Read · Teach · Shop)
    /app        TOPIK I PWA MVP
    /blog       placeholder
    /teach      placeholder
    /shop       placeholder
    /ops        Paul PM dashboard (links + review)
    /ops/review.html   Korean "thoughts so far" for Paul OK

[CONFIG]
  hub/config/brand.json      product name TBD, theme, Lemon placeholders
  hub/config/ops-links.json  PM map URLs, progress, paulOk flags
  hub/config/integrations.json  MCP automation rules when connected
```

**Codename in code:** `topik-coach` — rename via `brand.json` later.

---

## 3. Locked decisions (Paul §2 — OK not yet confirmed in chat)

| # | Decision |
|---|----------|
| 1 | Product brand **TBD**; wensonjabi.com = identity only |
| 2 | Blog **EN + KO** parallel |
| 3 | App v1 **TOPIK I only** (reading mock first; listening later) |
| 4 | Payments: **Lemon Squeezy** Pro; tutor **not** on MoR |
| — | Hub **separate** until merge checklist (master plan §1) |
| — | Reddit → blog **semi-auto**; no auto Reddit posting |
| — | Tutor optional: AI report → live session |

Full spec: `docs/wensonjabi-ecosystem-master-plan.md` (Phases 0–5, §10 Lemon Squeezy).

---

## 4. Implemented in code (Phase 0)

### 4.1 Hub & app

- Static hub EN/KO (`hub/index.html`, `hub/js/i18n.js`, `hub/css/hub.css`)
- **TOPIK I app** (`hub/app/`): 10 MCQ reading mock (`mock-read-01.json`), streak/XP/level, wrong-answer **tags → SRS v0** (object in localStorage key `topik-coach-v1`), PWA (`sw.js`, `manifest.webmanifest`, SVG icon)
- Scoring fix: score = wrong **question** count, not unique tag count
- Placeholders: blog, teach, shop, privacy draft
- `hub/vercel.json` — static deploy

### 4.2 PM / ops

- `hub/ops/index.html` + `ops.js` — reads `hub/config/ops-links.json`, milestones, work items, link buttons (Notion, GitHub, Vercel, Google, Canva, Lemon)
- `hub/ops/review.html` — Korean summary for Paul; asks for **`§2 OK`**
- `docs/paul-review-ko.md` — same content in Markdown
- `docs/ops-paul-workflow.md` — Notion DB schema (Map, Milestones, Inbox, Decisions)
- `docs/templates/google-content-queue.csv` — Sheet import template

### 4.3 Cursor / MCP (config only — Paul Login pending)

- `.cursor/mcp.json`: notion, canva, google-drive URLs
- `.cursor/rules/paul-ecosystem-mcp.mdc` — agent: sync Notion ↔ ops-links; no code if `paulOk: false`
- `docs/cursor-integrations-ko.md`, `docs/windows-mcp-fix-ko.md`
- `scripts/windows-setup-mcp.ps1` — Windows global `~/.cursor/mcp.json` when UI hangs

### 4.4 Not touched

- Root `index.html` / live paul-intro on wensonjabi.com
- Lemon Squeezy checkout, webhooks, Pro unlock
- n8n, Kimi blog pipeline, Reddit automation
- Vercel deploy (Paul account — not done in agent env)

---

## 5. Git history (feature branch)

```
8a5fb34 Phase 0 hub MVP + master plan
332e062 PM ops dashboard + ops-links.json
b0a9cb5 review.html + Notion URL in ops-links
00e3609 integrations doc + cursor rules
8352e9f .cursor/mcp.json
94759bd Windows MCP script + windows-mcp-fix-ko.md
```

---

## 6. Paul Notion & ops-links (partial)

**Notion PM page (Paul provided):**  
https://app.notion.com/p/3a56d7c83f4481229fdde56471410908  

Stored in `ops-links.json` → `notion.pmHomePage`, `notion.workspaceHome`.

**Empty (Paul to fill or agent after MCP):**

- `notion.mapDatabase`, milestones/inbox/decisions DB URLs
- `google.contentQueueSheet`, `canva.brandFolder`
- `items[].links.vercel` for hub deploy
- Most items: `paulOk: false` except `identity-wensonjabi`, `master-plan-doc`

**Paul workflow preferences (from chat):**

1. Daily hub: **Notion (A)**
2. Uses **Google (A)**, **Canva (A)**, **Vercel (A)**
3. Wants click-through progress map (Notion + `/ops/`)
4. **§2 OK** and **`MCP 연결했어`** not yet received
5. Windows: Cursor `mcp.json` editor **loads forever** — use PowerShell path in `docs/windows-mcp-fix-ko.md`
6. Confusion: searched for `paul-intro` inside `.cursor` — wrong; optional to open repo folder; global `~/.cursor/mcp.json` is enough

---

## 7. MCP / agent constraints

| System | Status |
|--------|--------|
| Notion MCP (Cursor) | `needsAuth` in Cloud Agent — Paul must OAuth Desktop and/or cursor.com/agents |
| Canva MCP | Paul had 33 tools in UI (likely OK locally) |
| Google Drive MCP | `https://drivemcp.googleapis.com/mcp/v1` in mcp.json; OAuth after Login |
| Cloud Agent | Cannot complete OAuth inside VM; cannot open Paul’s Windows folders |

**After Paul says `MCP 연결했어`:** create Notion page 「한국어 생태계 — Paul PM」, Map DB, sync `ops-links.json`, respect `paulOk`.

---

## 8. Paul to-do (blocking automation)

1. PowerShell → `%USERPROFILE%\.cursor\mcp.json` (see `docs/windows-mcp-fix-ko.md`)
2. Cursor → Tools & MCP → **notion**, **google-drive** Login
3. Chat: **`MCP 연결했어`**
4. Read `hub/ops/review.html` or `docs/paul-review-ko.md` → **`§2 OK`** or corrections
5. Vercel: New project, repo `paul-intro`, **Root Directory `hub`**, share preview URL
6. (Optional) Merge PR #2
7. (Optional) Sheet + Canva URLs → update `ops-links.json`

---

## 9. Local preview

```bash
cd hub
python3 -m http.server 8080
# http://localhost:8080/
# http://localhost:8080/app/
# http://localhost:8080/ops/review.html
```

`ERR_CONNECTION_REFUSED` = server not running on **Paul’s machine** (not a code bug).

---

## 10. Phase roadmap (next work for Claude/Cursor)

| Phase | Focus | Not started |
|-------|--------|-------------|
| **0 exit** | Vercel URL, §2 OK, optional Notion Map | Vercel, Notion DB, merge |
| **1** | SRS review UI, more mocks, Kimi weekly summary stub, **Lemon Pro + webhook unlock**, tutor teaser | All |
| **2** | Reddit → Sheet → Kimi → blog EN/KO | Sheet URL, pipeline |
| **3+** | Tutor dashboard, shop, merge wensonjabi | per master plan |

**Phase 1 Pro checklist:** master plan §11 + `integrations.json` → `whenAuthenticated`.

---

## 11. Key files quick index

| Path | Purpose |
|------|---------|
| `docs/wensonjabi-ecosystem-master-plan.md` | Single long spec |
| `docs/paul-review-ko.md` | Paul confirmation content |
| `docs/HANDOFF-for-claude.md` | This file |
| `hub/config/brand.json` | Rename product/domain |
| `hub/config/ops-links.json` | PM links & progress |
| `hub/app/js/app.js` | App logic + localStorage |
| `hub/README.md` | Vercel deploy steps |

---

## 12. Suggested first message to Claude

Paste:

```
paul-intro repo, branch cursor/hub-phase0-0f7e, PR #2.
Read docs/HANDOFF-for-claude.md and docs/wensonjabi-ecosystem-master-plan.md.
Paul pending: MCP OAuth, §2 OK, Vercel hub deploy.
Continue from Phase 0 exit unless Paul says otherwise.
Do not modify wensonjabi.com root until merge checklist passes.
```

---

## 13. Contacts / links

- Identity: https://www.wensonjabi.com/
- GitHub: https://github.com/wensonjabi-p/paul-intro
- PR: https://github.com/wensonjabi-p/paul-intro/pull/2
- Lemon (later): https://app.lemonsqueezy.com/
- Waitlist placeholder in `brand.json` links.waitlist

---

*End of handoff.*
