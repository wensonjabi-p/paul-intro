# -*- coding: utf-8 -*-
"""Scan packs for basicsAlign + sample senseIds for Phase 4 mapping."""
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
base = Path(__file__).resolve().parents[2] / "app" / "data" / "vocab"

for name in ["jabi-theme-packs-beginner.json", "jabi-theme-packs-intermediate.json"]:
    data = json.loads((base / name).read_text(encoding="utf-8"))
    print("===", name, "v", data.get("version"), "===")
    for p in data["packs"]:
        ba = p.get("basicsAlign")
        themes = set()
        for it in p.get("items", []):
            for t in it.get("themes") or []:
                themes.add(t)
        sense_sample = [it["senseId"] for it in p.get("items", [])[:3] if it.get("senseId")]
        n = len(p.get("items", []))
        if ba is not None or name.endswith("beginner.json"):
            print(f"  {p['id']:28} items={n:3} basicsAlign={ba!r}")
            print(f"    themes={sorted(themes)} sample={sense_sample}")

# Theme keys that clearly map to basic units (evidence-driven candidates)
CANDIDATES = {
    "cafe": "basic-03",
    "shopping": "basic-04",
    "clothes": "basic-04",
    "color": "basic-04",
    "size": "basic-04",
    "transit": "basic-05",
    "direction": "basic-05",
    "places": "basic-05",
    "restaurant": "basic-06",
    "fruit": "basic-06",
    "kitchen": "basic-06",
    "pantry": "basic-06",
    "snack": "basic-06",
    "routine": "basic-02",
    "time": "basic-02",
    "country": "basic-01",
}

print("\n--- packs with candidate themeKeys ---")
for name in ["jabi-theme-packs-beginner.json", "jabi-theme-packs-intermediate.json"]:
    data = json.loads((base / name).read_text(encoding="utf-8"))
    for p in data["packs"]:
        themes = set()
        for it in p.get("items", []):
            for t in it.get("themes") or []:
                themes.add(t)
        hits = {t: CANDIDATES[t] for t in themes if t in CANDIDATES and CANDIDATES[t]}
        if hits or p.get("basicsAlign"):
            print(f"  {p['id']:28} hits={hits} ba={p.get('basicsAlign')}")
