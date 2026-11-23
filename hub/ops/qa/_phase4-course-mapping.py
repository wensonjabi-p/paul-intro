# -*- coding: utf-8 -*-
"""Build Phase 4 course-mapping.json — clear basic alignments only."""
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
root = Path(__file__).resolve().parents[3]
vocab = root / "hub" / "app" / "data" / "vocab"

# Legacy basicsAlign slug → track unit id
SLUG_ALIAS = {
    "unit01-greetings": "basic-01",
    "unit02-daily-life": "basic-02",
    "unit03-cafe": "basic-03",
    "unit04-shopping": "basic-04",
    "unit05-directions": "basic-05",
    "unit06-food": "basic-06",
}

UNIT_META = {
    "basic-01": {"slug": "greetings", "order": 1},
    "basic-02": {"slug": "daily-life", "order": 2},
    "basic-03": {"slug": "cafe", "order": 3},
    "basic-04": {"slug": "shopping", "order": 4},
    "basic-05": {"slug": "directions", "order": 5},
    "basic-06": {"slug": "food", "order": 6},
}

# (packId, courseId, strength, evidence, themeKeyHint)
# strength: primary = main scene match; secondary = pack-declared secondary basicsAlign only
LINKS_SPEC = [
    # --- beginner: existing basicsAlign (authoritative) ---
    ("drinks-order", "basic-03", "primary", "basicsAlign:unit03-cafe + unit objective 음료 주문", None),
    ("drinks-order", "basic-06", "secondary", "basicsAlign:unit06-food (주문 패턴 공유)", None),
    ("transit-ticket", "basic-05", "primary", "basicsAlign:unit05-directions + 어디예요/에 타다 hooks", None),
    ("leisure-simple", "basic-02", "primary", "basicsAlign:unit02-daily-life", None),
    ("snacks-street", "basic-06", "primary", "basicsAlign:unit06-food", None),
    ("snacks-street", "basic-04", "secondary", "basicsAlign:unit04-shopping", None),
    ("shopping-basics", "basic-04", "primary", "basicsAlign:unit04-shopping", None),
    ("cosmetics-basic", "basic-04", "primary", "basicsAlign:unit04-shopping", None),
    # clinic-basic basicsAlign=[] — omitted (no invent)
    # --- intermediate: clear theme ↔ unit objective (research-basic §4–5) ---
    ("countries-nationality", "basic-01", "primary", "unit01 objective 국적 · themeKey country", "country"),
    ("daily-routine", "basic-02", "primary", "unit02 루틴 · themeKey routine", "routine"),
    ("clothes-shopping", "basic-04", "primary", "unit04 사이즈·색깔·옷 · themeKey clothes", "clothes"),
    ("directions-location", "basic-05", "primary", "unit05 직진·좌우·위치 · themeKey direction", "direction"),
    ("restaurant-cooking", "basic-06", "primary", "unit06 식당 주문 · themeKey restaurant", "restaurant"),
    ("fruit-market", "basic-06", "primary", "식음료 생존 · themeKey fruit (Paul Phase4 example)", "fruit"),
    ("kitchen-tableware", "basic-06", "primary", "식음료 생존 · themeKey kitchen (Paul Phase4 example)", "kitchen"),
]

packs_by_id = {}
for name in ["jabi-theme-packs-beginner.json", "jabi-theme-packs-intermediate.json"]:
    data = json.loads((vocab / name).read_text(encoding="utf-8"))
    for p in data["packs"]:
        packs_by_id[p["id"]] = {
            "pack": p,
            "file": name,
            "topikBand": data.get("topikBand"),
            "level": data.get("level"),
        }

links = []
for pack_id, course_id, strength, evidence, theme_hint in LINKS_SPEC:
    info = packs_by_id[pack_id]
    p = info["pack"]
    themes = set()
    sense_ids = []
    for it in p["items"]:
        if it.get("senseId"):
            sense_ids.append(it["senseId"])
        for t in it.get("themes") or []:
            themes.add(t)
    theme_key = theme_hint or (sorted(themes)[0] if themes else None)
    um = UNIT_META[course_id]
    links.append(
        {
            "linkId": f"map:{pack_id}.{course_id}",
            "packId": pack_id,
            "themeKey": theme_key,
            "courseKind": "basic",
            "courseId": course_id,
            "courseSlug": um["slug"],
            "strength": strength,
            "evidence": evidence,
            "senseIds": sense_ids,
            "source": {
                "packFile": info["file"],
                "basicsAlign": p.get("basicsAlign"),
                "packTopikBand": info["topikBand"],
            },
        }
    )

# Light TOPIK hooks — pack file topikBand only (no bank rewrite; no invented unit ids)
topik_hooks = []
seen_packs = set()
for link in links:
    pid = link["packId"]
    if pid in seen_packs:
        continue
    seen_packs.add(pid)
    band = link["source"]["packTopikBand"]
    if not band:
        continue
    topik_hooks.append(
        {
            "hookId": f"topikBand:{pid}",
            "packId": pid,
            "topikBand": band,
            "evidence": "pack file topikBand field — not a bank/unit link",
            "senseIds": [],
            "note": "Optional light marker only. Do not treat as TOPIK bank senseIds attachment.",
        }
    )

out = {
    "id": "jabi-course-mapping",
    "version": 1,
    "updated": "2026-07-27",
    "status": "phase-4-starter",
    "note": (
        "Phase 4 starter — pack ↔ Basics unit links with clear evidence only. "
        "Legacy pack basicsAlign slugs (unitNN-*) map to track-manifest basic-NN. "
        "clinic-basic omitted (empty basicsAlign). "
        "No TOPIK bank rewrite; topikHooks = pack topikBand markers only. "
        "Grow only when basicsAlign or unit objective clearly matches a theme."
    ),
    "schema": {
        "linkId": "map:{packId}.{courseId}",
        "courseKind": "basic | topik1 | topik2",
        "courseId": "basic-NN from hub/app/data/basic/track-manifest.json",
        "strength": "primary | secondary",
        "senseIds": "all senseIds currently in the pack (pack-level bundle, not per-item course tags)",
        "topikHooks": "pack-level topikBand only — no invented listen/read unit links",
    },
    "slugAlias": SLUG_ALIAS,
    "trackRef": {
        "basic": "hub/app/data/basic/track-manifest.json",
        "basicUnits": [
            {"id": "basic-01", "slug": "greetings"},
            {"id": "basic-02", "slug": "daily-life"},
            {"id": "basic-03", "slug": "cafe"},
            {"id": "basic-04", "slug": "shopping"},
            {"id": "basic-05", "slug": "directions"},
            {"id": "basic-06", "slug": "food"},
        ],
    },
    "links": links,
    "topikHooks": topik_hooks,
    "omitted": [
        {
            "packId": "clinic-basic",
            "reason": "basicsAlign=[] — no clear Basics unit yet",
        },
        {
            "packId": "size-quantity",
            "reason": "unit04 mentions size but pack is adjective list, not shopping scene — defer",
        },
        {
            "packId": "colors-shapes",
            "reason": "unit04 mentions color but pack is color/shape list — defer",
        },
        {
            "packId": "time-appointment",
            "reason": "unit02 uses time particle; pack is clock/appointment — softer than daily-routine",
        },
        {
            "packId": "city-places",
            "reason": "facility list; unit05 is wayfinding — directions-location already covers",
        },
        {
            "packId": "pantry-ingredients",
            "reason": "cooking ingredients ≠ restaurant order scene — defer vs kitchen/fruit",
        },
    ],
    "counts": {
        "links": len(links),
        "primary": sum(1 for L in links if L["strength"] == "primary"),
        "secondary": sum(1 for L in links if L["strength"] == "secondary"),
        "uniquePacks": len({L["packId"] for L in links}),
        "uniqueSensesLinked": len({s for L in links for s in L["senseIds"]}),
        "topikHooks": len(topik_hooks),
    },
}

path = vocab / "course-mapping.json"
path.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
c = out["counts"]
print(f"Wrote {path}")
print(
    f"links={c['links']} primary={c['primary']} secondary={c['secondary']} "
    f"packs={c['uniquePacks']} senses={c['uniqueSensesLinked']} topikHooks={c['topikHooks']}"
)
for L in links:
    print(f"  {L['linkId']:42} {L['strength']:10} senses={len(L['senseIds']):2}")
