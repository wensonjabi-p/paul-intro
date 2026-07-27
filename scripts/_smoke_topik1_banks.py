# -*- coding: utf-8 -*-
"""Smoke: TOPIK I verified banks after research-fill #3."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "hub" / "app" / "data"
APP_JS = ROOT / "hub" / "app" / "js" / "app.js"

BANKS = [
    "verified-read-01.json",
    "verified-read-02.json",
    "verified-read-03.json",
    "verified-read-04.json",
    "verified-listen-01.json",
    "verified-listen-02.json",
]

# Same spirit as app.js isSpoilerHintLine — not the word "match" inside "Listening match".
SPOILER = re.compile(r"^\s*(Match|답|对应|Answer)\s*[:：]", re.I)
NEW_BANKS = {"verified-read-04.json", "verified-listen-02.json"}
errors = []
ok = []

app = APP_JS.read_text(encoding="utf-8")
for needle in [
    "verified-read-04.json",
    "verified-listen-02.json",
    "Final-style reading",
]:
    if needle not in app:
        errors.append(f"app.js missing: {needle}")

total_q = 0
types = {}
for name in BANKS:
    path = DATA / name
    if not path.exists():
        errors.append(f"missing {name}")
        continue
    d = json.loads(path.read_text(encoding="utf-8"))
    qs = d.get("questions") or []
    if not qs:
        errors.append(f"{name}: empty questions")
        continue
    if not d.get("verified"):
        errors.append(f"{name}: verified != true")
    if d.get("source") != "jabi-original":
        errors.append(f"{name}: source not jabi-original")
    for q in qs:
        total_q += 1
        t = q.get("type") or "?"
        types[t] = types.get(t, 0) + 1
        if q.get("answer") is None or not q.get("choices") or len(q["choices"]) != 4:
            errors.append(f"{name}/{q.get('id')}: bad choices/answer")
        if q.get("answerText") != q["choices"][q["answer"]]:
            errors.append(f"{name}/{q.get('id')}: answerText mismatch")
        hint = q.get("hint") or {}
        steps = (hint.get("steps") or {}).get("en") or []
        for line in steps[:2]:
            if SPOILER.search(line or ""):
                errors.append(f"{name}/{q.get('id')}: early step spoiler: {line[:60]}")
            # Strict answer leak check only on research-fill new banks
            if name in NEW_BANKS:
                ans = (q.get("answerText") or "").strip()
                if ans and len(ans) > 2 and ans in (line or ""):
                    errors.append(f"{name}/{q.get('id')}: early step has answerText")
        if name.startswith("verified-listen") and not q.get("script"):
            errors.append(f"{name}/{q.get('id')}: missing script")
        if not hint.get("steps"):
            errors.append(f"{name}/{q.get('id')}: missing hint.steps")
        if not q.get("why"):
            errors.append(f"{name}/{q.get('id')}: missing why")
        if not q.get("distractWhy"):
            errors.append(f"{name}/{q.get('id')}: missing distractWhy")
    ok.append(f"{name}: {len(qs)}Q")

# Required type coverage after fill
for need in ["listening", "blank", "topic", "notice", "purpose", "content", "order"]:
    if need not in types:
        errors.append(f"missing type coverage: {need}")

print("BANKS:", "; ".join(ok))
print(f"TOTAL_Q={total_q} TYPES={types}")
if errors:
    print("FAIL:")
    for e in errors:
        print(" -", e)
    sys.exit(1)
print("OK topik1 research-fill smoke")
