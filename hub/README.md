# TOPIK Coach Hub (staging)

Separate from `wensonjabi.com` (paul-intro). Deploy as its own Vercel project.

## Deploy

1. Vercel → **Add New Project** → same Git repo
2. **Root Directory:** `hub`
3. Build: none (static)
4. Output: `.`

Preview URL example: `https://your-project.vercel.app`

## Local preview

```bash
cd hub
python3 -m http.server 8080
# open http://localhost:8080/app/
```

## Structure

- `config/brand.json` — rename product/domain here later
- `index.html` — Learn / Read / Teach / Shop
- `app/` — TOPIK I MVP (mock + SRS tags + streak)
- `blog/`, `teach/`, `shop/` — placeholders

## Merge with wensonjabi.com

See `docs/wensonjabi-ecosystem-master-plan.md` §1 checklist.
