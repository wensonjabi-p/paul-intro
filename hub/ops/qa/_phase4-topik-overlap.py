# -*- coding: utf-8 -*-
"""Light TOPIK overlap: pack lemmas that appear in verified TOPIK I banks."""
import json
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
root = Path(__file__).resolve().parents[3]
vocab = root / "hub" / "app" / "data" / "vocab"
data = root / "hub" / "app" / "data"

# Collect pack lemma -> senseId for clear Phase4 packs
FOCUS_PACKS = {
    "drinks-order",
    "shopping-basics",
    "transit-ticket",
    "snacks-street",
    "countries-nationality",
    "daily-routine",
    "restaurant-cooking",
    "directions-location",
    "fruit-market",
    "kitchen-tableware",
    "clothes-shopping",
    "leisure-simple",
    "cosmetics-basic",
}

lemma_to = {}
for name in ["jabi-theme-packs-beginner.json", "jabi-theme-packs-intermediate.json"]:
    packs = json.loads((vocab / name).read_text(encoding="utf-8"))["packs"]
    for p in packs:
        if p["id"] not in FOCUS_PACKS:
            continue
        for it in p["items"]:
            lemma_to[it["lemma"]] = {
                "senseId": it["senseId"],
                "packId": p["id"],
                "themes": it.get("themes") or [],
            }

# Scan verified TOPIK I banks for hangul surface containing lemmas (simple)
hangul = re.compile(r"[가-힣]+")
verified = list(data.glob("verified-*.json"))
hits = []
for vf in sorted(verified):
    text = vf.read_text(encoding="utf-8")
    tokens = set(hangul.findall(text))
    for lemma, meta in lemma_to.items():
        if lemma in tokens:
            hits.append((lemma, meta["senseId"], meta["packId"], vf.name))

# Dedup by senseId+file
seen = set()
print(f"verified files: {len(verified)}")
print("lemma hits in verified banks (surface contains exact lemma token):")
for lemma, sid, pid, fn in sorted(hits, key=lambda x: (x[2], x[0], x[3])):
    key = (sid, fn)
    if key in seen:
        continue
    seen.add(key)
    print(f"  {pid:24} {lemma:8} {sid:16} ← {fn}")
print(f"unique (senseId,file) pairs: {len(seen)}")
