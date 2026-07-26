# TOPIK I vocabulary sources (jabi.)

## Verdict

**Do not use TOPIK GUIDE “6000 Most Common Korean Words” as the TOPIK I bank.**  
Part 1 is a **frequency** slice (~1–1000) of 국립국어원 research, **not** TOPIK grade-tagged.

## Allowlist (canonical)

| File | Content |
|------|---------|
| **`vocab-allowlist.json`** | **NIKL A ∪ (Tammy 1671 − hard) ∪ particles** — use this |
| `vocab-allowlist.txt` | Lemmas only |
| `bank-oov-report.json` | Surface OOV scan of `verified-*.json` |
| `allowlist-build-summary.json` | Build counts |
| `source/nikl-topik-combined.tsv` | julienshim NIKL/TOPIK mirror |
| `source/nikl-a-lemmas.json` | NIKL A (~894 unique after sense-number strip) |
| `source/tammy-topik1-1671.json` | Tammy TOPIK I list |

**Rebuild:** `python scripts/build-vocab-allowlist.py`

**Policy:** bank / distractors = **NIKL A ∪ (1671 − abstract Sino)**.  
Reject: 내과·접수·일과·방문·휴관일 unless taught in-app. Paraphrase answers.

### Counts (2026-07-26)

- NIKL A unique lemmas: ~894 (source rows ~982; sense numbers collapsed)
- Tammy 1671 after hard filter: ~1660
- Union allowlist: ~1742
- Note: julienshim TSV stores NIKL A/B/C sizes in the `topik_level` column

## Older extracts (secondary)

| File | Content |
|------|---------|
| `topik1-from-guide-part1-kept.json` | Guide Part1 ∩ 1671 − hard (~589) — **frequency aid only** |
| `guide-part1-not-in-topik1.json` | Part1 not in 1671 |
| `samples-for-report.json` | Preview samples |

## Better sources (preferred order)

1. **국립국어원 한국어 학습용 어휘 — 등급 A (~982)** — https://www.korean.go.kr/ (etc_seq=71)
2. **TOPIK 공개 어휘 목록 (2015)** — mirror: https://github.com/julienshim/combined_korean_vocabulary_list
3. **Tammy TOPIK I 1671** — https://learning-korean.com/elementary/20210101-10466/
4. **TOPIK GUIDE 6000** — frequency ranking only
