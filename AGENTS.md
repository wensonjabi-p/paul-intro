# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is
A static PWA plus Vercel serverless functions. There is **no build step and no bundler** — the
frontend is plain HTML/JS served as-is (`index.html` interactive intro, `interview.html` interview
PWA, `admin.html` admin, backed by `data.js` / `data.en.js` / `data.zh.js`). The `api/*` files are
Vercel serverless/edge functions that add live features (AI synthesis, live thoughts feed,
comments, contact email, image generation).

### Running the frontend (the core product)
Serve the repo root as static files, e.g. `python3 -m http.server 3000`, then open
`http://localhost:3000/index.html`. The whole intro experience (word constellation → composed
thought), language switching, and localStorage persistence run **entirely client-side**. All
`/api/*` calls degrade gracefully: when the backend is absent, `fetch` failures are caught and the
app falls back to local/base content, so a plain static server is enough to develop and test the UI.
Use explicit `.html` paths (there are no Vercel clean-url rewrites in play locally).

### Running the backend functions
`vercel dev` is the full-fidelity local runtime, but note two hard requirements before it is useful:
- It needs an interactive `vercel login` + project link (not available non-interactively here).
- The functions need external service credentials that are **not** in this environment. Missing any
  of these just makes the corresponding feature unavailable; it does not break the frontend:
  - `KV_REST_API_URL` / `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL` / `_TOKEN`) — Upstash Redis KV
  - `BLOB_READ_WRITE_TOKEN`, `BLOB_PUBLIC_STORE_ID` — Vercel Blob (`@vercel/blob`)
  - `ANTHROPIC_API_KEY` — AI synthesis / polish / follow-ups / comment translation
  - `REPLICATE_API_TOKEN` — image generation
  - `RESEND_API_KEY` — contact form email
  - `ADMIN_SECRET`, `ADMIN_PASSWORD` — admin login + `middleware.js` cookie gate for `/admin.html`

### Lint / test / build
There is no linter, test suite, or build configured (`package.json` has no scripts). The only
dependency is `@vercel/blob`, used by the serverless functions. Deployment is automatic: pushing to
`main` triggers a Vercel deploy.

### Service worker gotcha
`sw.js` aggressively caches the listed assets under a versioned cache name (`CACHE = 'paul-...-vNN'`).
When editing a cached file (any `*.html`, `data*.js`, icons), a normal reload may serve the old
cached copy. Hard-reload / bypass the service worker, or bump the `CACHE` version string, to see
changes.
