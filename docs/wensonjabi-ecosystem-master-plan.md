# wensonjabi Korean Ecosystem — Master Plan

> **Status:** Planning (2026-07-23)  
> **Owner:** Paul Bhang (BHANG SANGHOON)  
> **Principle:** Hub is built **separately** from live wensonjabi.com until merge checklist passes.

---

## 0. Architecture Overview

```
[STAGING — build here first]
  hub.wensonjabi.com (or wensonjabi-hub.vercel.app)
    ├── /           Hub links (Learn · Read · Teach · Shop · About Paul)
    ├── /blog       Reddit-sourced + editorial posts
    ├── /app        TOPIK Coach PWA (AI core)
    └── /teach      Tutor option info + waitlist (later: dashboard)

[LIVE — do not change until merge]
  wensonjabi.com    paul-intro (Fragments of Thought) — identity only

[MERGE — when ready]
  wensonjabi.com → nav/footer links to /app, /blog OR subdomain redirect
```

---

## 1. Separate Hub Strategy

### Why separate
- paul-intro is identity art; ecosystem is product — different UX and release cadence.
- Avoid breaking live site while iterating app + blog + payments.

### Recommended setup

| Item | Choice |
|------|--------|
| Code | New folder `hub/` in repo OR new repo `wensonjabi-hub` |
| Deploy | Vercel project #2 → `wensonjabi-hub.vercel.app` |
| Custom domain (when ready) | `hub.wensonjabi.com` or `learn.wensonjabi.com` |
| Live site | `wensonjabi.com` unchanged |

### Merge checklist (all must pass)
- [ ] Hub homepage loads < 2s, mobile OK
- [ ] App MVP: mock test + SRS + streak works offline
- [ ] Blog: ≥ 10 published posts, SEO titles/descriptions
- [ ] Legal: privacy policy + terms (app + tutor option)
- [ ] Payments: Pro tier tested (1 real transaction)
- [ ] Tutor flow: AI report PDF + Calendly booking tested once
- [ ] Single nav design approved by Paul
- [ ] Redirect map written (old URLs → new)

### Merge action (one afternoon)
1. Add to paul-intro footer: “Learn Korean → hub.wensonjabi.com”
2. Or DNS: `learn.wensonjabi.com` → hub project
3. Optional later: merge static sites into one Vercel project with routes

---

## 2. Phase Plan

### Phase 0 — Foundation (≈ 15–20 hours)

**Goal:** Staging hub exists; no product yet.

| # | Task | Output | Tool |
|---|------|--------|------|
| 0.1 | Create Vercel project #2 + `hub/index.html` | Landing with 4 doors | Cursor |
| 0.2 | Hub copy EN (+ KO later) | Learn / Read / Teach / Shop | Kimi draft → Paul edit |
| 0.3 | Link to paul-intro | “About Paul → wensonjabi.com” | HTML |
| 0.4 | Blog skeleton `/blog` | List + post template | Static MD or HTML |
| 0.5 | Waitlist form | Email → Google Sheet or Formspree | n8n optional |
| 0.6 | Brand tokens from paul-intro | `#050419`, `#D4A24E`, fonts | CSS vars |

**Exit criteria:** URL shareable; paul-intro untouched.

---

### Phase 1 — AI App MVP (≈ 60–80 hours) ★ HEART

**Goal:** AI-first TOPIK coach; tutor = external link only.

| # | Task | Output |
|---|------|--------|
| 1.1 | `hub/app/` PWA shell | manifest, sw.js, offline shell |
| 1.2 | TOPIK I reading mock × 1 | JSON question bank |
| 1.3 | Scoring + wrong-answer tags | `grammar:*`, `vocab:*` |
| 1.4 | Weak-deck SRS | Only missed items; SM-2 or simple intervals |
| 1.5 | Gamification v1 | Streak, XP, level (TOPIK I bands) |
| 1.6 | AI weekly summary v0 | Kimi API: “3 weak areas” from local stats export |
| 1.7 | Pro gate (manual codes first) | Gumroad/Lemon code → unlock unlimited mocks |
| 1.8 | Tutor teaser page | “Coach option — AI report + live session” waitlist |

**Data schema (localStorage v1):**

```json
{
  "userId": "uuid",
  "streak": 5,
  "xp": 1200,
  "level": 2,
  "attempts": [{
    "mockId": "topik1-read-01",
    "at": "ISO8601",
    "wrong": [{ "qid": "q3", "tags": ["grammar:이/가", "vocab:시간"] }]
  }],
  "srs": [{ "tag": "grammar:이/가", "nextReview": "ISO8601", "ease": 2.5 }]
}
```

**Exit criteria:** 5 beta users (your Zoom students) complete 1 mock + 3 SRS days.

---

### Phase 2 — Content Loop (≈ 25–35 hours + ongoing 2h/week)

**Goal:** Reddit questions → blog → hub → app deep link.

See **Section 3** for full Reddit→blog proposal.

| # | Task | Output |
|---|------|--------|
| 2.1 | Reddit intake pipeline (semi-auto) | Sheet queue |
| 2.2 | Kimi: blog + app tags + pin copy | Per post bundle |
| 2.3 | Publish to `hub/blog/{slug}.html` | 2 posts/week target |
| 2.4 | App deep links | `hub/app/#deck=honorifics` |
| 2.5 | Pinterest queue (optional) | 4 pins/week via n8n |

**Exit criteria:** 10 blog posts; ≥ 1 post drives waitlist signup.

---

### Phase 3 — Tutor Option (≈ 40–50 hours)

**Goal:** Optional human layer; not marketplace scale.

| # | Task | Output |
|---|------|--------|
| 3.1 | AI Learner Report PDF/HTML | Weak tags, mock scores, SRS stats |
| 3.2 | Tutor dashboard v1 | Read-only report list (auth: magic link) |
| 3.3 | Tutor notes → updates student plan | Text field → export to student app |
| 3.4 | Booking | Calendly embed + PayPal/Wise |
| 3.5 | Onboard 3 tutors | Contract template, 한국어교원 2급 filter |

**Tutor flow:**

```
Student uses app → AI report generated
  → Tutor opens dashboard, reviews report
  → Tutor schedules Zoom, sets focus (speaking / writing / direction)
  → Session: Q&A + study plan
  → Tutor summary → fed back into AI “focus tags” for next week
```

**Exit criteria:** 10 paid tutor sessions completed with report handoff.

---

### Phase 4 — Ecosystem Shop (≈ 30–40 hours)

**Goal:** Games + Canva templates under same hub.

| # | Task | Output |
|---|------|--------|
| 4.1 | Gumroad: 1 learning game pack | PDF/web mini-game |
| 4.2 | Gumroad: Korean teacher slide template pack | Sejong-style |
| 4.3 | Hub `/shop` links to Gumroad | |
| 4.4 | App cross-sell | “Print worksheet” → shop |

---

### Phase 5 — Teacher Assistant App (≈ 50–70 hours)

**Goal:** B2B for Korean teachers; shares backend with learner app.

| # | Task | Output |
|---|------|--------|
| 5.1 | Class roster + student report view | |
| 5.2 | Sejong unit mapper | |
| 5.3 | Assign deck to class | |
| 5.4 | $9–19/mo per teacher | |

---

## 3. Reddit → Blog Automation (PROPOSAL)

### Design principles
- **Automate discovery + drafting; human approves publish.**
- **Never auto-post to Reddit** (ban/spam risk).
- **Every post links to hub app or waitlist.**

### Subreddits (start narrow)

| Subreddit | Use |
|-----------|-----|
| r/Korean | Grammar, TOPIK, study questions |
| r/KoreanLanguage | Learner questions |
| r/TEFL | Teachers in Korea learning Korean |
| r/hanguk | Life in Korea language context |

### n8n workflow (semi-automated)

```
[Schedule: daily 08:00 CST]
  → Reddit API search (last 24h, flair: Question OR title contains ?)
  → Filter: score ≥ 3, not NSFW, not duplicate URL in Sheet
  → Write row to Google Sheet "Content Queue"
      columns: status, reddit_url, title, subreddit, score, created_at

[Manual: Paul 15 min/day OR 2×/week]
  → Set status=picked on 1–2 rows

[Schedule: when status=picked]
  → Fetch Reddit post body (API)
  → Kimi prompt (see below)
  → Write outputs to Sheet: blog_md, app_tags, pin_title, pin_desc, video_script_60s
  → Set status=draft_ready

[Manual: Paul 20 min/post]
  → Edit blog_md, approve
  → Set status=approved

[Schedule: when status=approved]
  → Commit blog MD to git OR POST to static generator
  → Vercel redeploy hub
  → Optional: Pinterest API pin with hub/blog URL
  → Set status=published
```

### Kimi prompt template (per Reddit post)

```
You are Paul Bhang's editorial assistant (Korean teacher, 한국어교원 2급, context-first).

Input: Reddit question (title + body) from {subreddit}.

Output JSON only:
{
  "blog_title": "",
  "blog_slug": "",
  "blog_body_md": "800-1200 words, helpful, not promotional, link to app at end as soft CTA",
  "app_deck_tags": ["grammar:...", "vocab:..."],
  "app_cta_line": "Practice this in TOPIK Coach (free)",
  "pin_title": "max 60 chars",
  "pin_desc": "220 chars, SEO",
  "video_script_60s": "optional Shorts voiceover",
  "reddit_comment_draft": "helpful reply WITHOUT link first; add hub link only if sub rules allow"
}

Rules: No school names. Accurate Korean grammar. Mention honorifics/nuance when relevant.
```

### Blog post footer (every post)

```markdown
---
**Practice:** [Open this topic in TOPIK Coach →](https://hub.wensonjabi.com/app/#deck={slug})
**About Paul:** [wensonjabi.com](https://www.wensonjabi.com/)
**Coach option (AI report + live tutor):** [Learn more →](/teach)
```

### What NOT to automate
- Publishing Reddit replies without reading rules
- Auto-posting identical content to multiple subreddits
- Video voice without review (use slide + captions first)

### Tools & cost

| Tool | Cost |
|------|------|
| n8n self-host | ~$5/mo VPS or n8n cloud free tier |
| Reddit API | Free (OAuth app) |
| Kimi API | Existing membership |
| Google Sheet | Free |
| Vercel hub project | Free tier |

### Success metrics (Phase 2)

| Metric | Target @ 10 posts |
|--------|-------------------|
| Organic blog visits | 200+/month |
| Waitlist / app opens from blog | 20+ |
| Time per post (after pipeline) | ≤ 35 min (incl. edit) |

---

## 4. Pricing (v1)

| Tier | Price | Includes |
|------|-------|----------|
| Free | $0 | 1 mock/week, SRS 20 cards, streak |
| Pro | $6.99/mo or $49/yr | Unlimited mocks, AI weekly report, all decks |
| Coach session | $25–35/hr | AI report shared with tutor, Zoom |
| Tutor platform fee | 15% | From coach session (later) |

---

## 5. Tech Stack

| Layer | Choice |
|-------|--------|
| Hub + blog | Static HTML/MD, Vercel |
| Learner app | PWA (same as paul-intro pattern) |
| Data v1 | localStorage; v2 Supabase |
| AI | Kimi/DeepSeek via serverless API route |
| Payments | Lemon Squeezy or Gumroad |
| Tutor booking | Calendly |
| Content queue | Google Sheet + n8n |
| Email waitlist | Formspree or Sheet |

---

## 6. First 14 Days — Start Here

### Day A–B: Hub shell
- [ ] Create `hub/index.html` (4 doors + link to wensonjabi.com)
- [ ] New Vercel project, deploy preview URL
- [ ] Privacy policy stub page

### Day C–D: App wireframe
- [ ] `hub/app/index.html` — mock list, 1 quiz UI, streak display
- [ ] `hub/app/data/mock-01.json` — 10 sample questions

### Day E–F: Content pipeline setup
- [ ] Google Sheet “Content Queue” with columns from §3
- [ ] Manual: pick 2 Reddit posts, run Kimi prompt by hand
- [ ] Publish 1 blog post on hub

### Day G: Beta
- [ ] Send hub/app link to 3 Zoom students
- [ ] Collect feedback in Sheet

**Do NOT yet:** tutor dashboard, Gumroad shop, App Store, merge with wensonjabi.com

---

## 7. Decision Log

| Date | Decision |
|------|----------|
| 2026-07-23 | Hub separate until merge checklist |
| 2026-07-23 | AI-first app; tutor optional with AI report handoff |
| 2026-07-23 | Reddit → blog semi-auto; no auto Reddit posting |
| 2026-07-23 | Staging domain: `hub.wensonjabi.com` or Vercel preview |

---

## 8. Locked Decisions (2026-07-23)

| # | Decision | Notes |
|---|----------|-------|
| 1 | **Product brand TBD** — not locked to wensonjabi | wensonjabi.com = Paul identity only. Hub/app use working title until rename. See §9. |
| 2 | **Blog: EN + KO parallel** | Same topic, two posts or one page with tabs; Reddit intake EN-first, KO within 48h |
| 3 | **App v1: TOPIK I only** | Listening + reading mocks, TOPIK I vocab tags, level bands L1–L2 |
| 4 | **Payments: Lemon Squeezy (primary)** | Pro subscription + unlock codes. Gumroad optional Phase 4 for template/game discovery. Tutor sessions: PayPal/Wise direct (not platform MoR). See §10. |

### Hub subdomain (interim)
- Vercel preview URL first → then neutral subdomain e.g. `learn.{product-domain}` when brand is chosen
- Do **not** use `hub.wensonjabi.com` until product name is final (optional: use only for staging)

---

## 9. Brand & Domain — Change Later (Yes)

Paul is correct: **wensonjabi = personal identity**, not necessarily the education product name.

### What stays fixed
- `wensonjabi.com` → paul-intro, “About Paul”, tutor Reddit profile, trust anchor

### What can rename anytime
- App name, hub title, blog series name, `@product` social, custom domain

### How we build so rename is cheap
| Layer | Use internal codename | Display name in config |
|-------|----------------------|-------------------------|
| Repo folder | `hub/` | `PRODUCT_NAME` in one JSON |
| App manifest | `topik-coach` | `name` field |
| Blog | `/blog` | site title in header |
| Payments | Lemon Squeezy product title | editable without code |

**One file:** `hub/config/brand.json` — change title, domain, colors; redeploy.

### Rename checklist (when you pick final name)
1. Register domain (e.g. `topikcoach.app`, `hangulpath.com` — brainstorm later)
2. Update `brand.json` + Lemon Squeezy checkout branding
3. 301 redirects from old staging URL (keep 6–12 months)
4. wensonjabi.com footer: “My Korean learning project → {new URL}”

### Interim working title (code only)
**TOPIK Coach** — descriptive, rename before public marketing if desired.

---

## 10. Payment Platform — Lemon Squeezy (Recommended)

### Paul’s revenue types

| Revenue | Tool | Why |
|---------|------|-----|
| App Pro $6.99/mo | **Lemon Squeezy** | Subscriptions, webhooks, license/unlock |
| One-off game/template (Phase 4) | Lemon Squeezy first; Gumroad if need Discover | Same stack vs marketplace |
| Tutor 1:1 $25–35/hr | **PayPal / Wise / KakaoPay direct** | MoR platforms take 5–10% + ill-suited for services |

### Gumroad vs Lemon Squeezy (2026)

| | Lemon Squeezy | Gumroad |
|--|---------------|---------|
| Fee | **5% + $0.50** | 10% + $0.50 |
| MoR (global tax/VAT) | Yes | Yes (since 2025) |
| **Subscriptions** | Strong (trials, dunning, proration) | Basic monthly/yearly |
| SaaS / app unlock API | **Yes** | Weak |
| Creator marketplace | No | **Discover** (30% if via Discover) |
| Best for | **App Pro, software** | Ebooks, art, first-time creators |
| Payout | PayPal, bank (min $50) | PayPal, bank |

### Fee example — Pro $6.99/mo
- Lemon Squeezy: ~$0.85 fee → **~$6.14 net**
- Gumroad: ~$1.20 fee → **~$5.79 net**

At 100 subscribers: **~$35/mo more** on Lemon Squeezy.

### Recommendation
1. **Start Lemon Squeezy** — one Pro product, webhook → app unlock
2. **Phase 4:** add Gumroad **only** for template packs if you want Discover traffic (duplicate listing OK)
3. **Tutors:** Calendly + invoice; no change

### Lemon Squeezy setup (Phase 1 end)
- Product: “TOPIK Coach Pro” — $6.99/mo + $49/yr
- License key or email gate → API validates on hub/app
- Test mode → 1 real purchase before merge

---

## 11. PM Hub — Notion + click-through links (2026-07-24)

**Paul workflow:** capture thoughts → structure in Notion → **Paul OK** → execute (GitHub/Docs/Canva) → reflect progress on Map rows.

| Layer | Tool | Role |
|-------|------|------|
| Daily map | **Notion** (Map, Milestones, Inbox, Decisions) | Goals, schedule, status, URL fields for every app |
| Click mirror | **`hub/ops/`** + **`hub/config/ops-links.json`** | Same links/progress when Notion is slow (VPN) |
| Spec backup | **`docs/ops-paul-workflow.md`** | DB schema, weekly loop, Sheet columns |
| Code truth | GitHub PRs | Linked from each Map row |

**Setup:** duplicate Notion board → add URL properties per `docs/ops-paul-workflow.md` §2 → paste Notion/Sheet/Canva URLs into `ops-links.json` top-level `notion.*` and each `items[].links.*` → open `/ops/` on Vercel preview.

**Phase 1 Pro checklist (after Paul OK on `phase-1-pro-lemon`):**
- [ ] Lemon Squeezy product (test mode): $6.99/mo + $49/yr
- [ ] Checkout URL in `brand.json` → `pricing.checkoutUrl`
- [ ] Webhook endpoint (Vercel serverless or n8n) → store email/license
- [ ] App reads Pro flag (license input v0 → account later)
- [ ] One real test purchase + refund policy checked

---

*Phase 0 files: `hub/index.html`, `hub/config/brand.json`, `hub/config/ops-links.json`, `hub/ops/`*
