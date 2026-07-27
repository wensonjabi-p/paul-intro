"""Phase 2: attach levelBand + allowlist freq marks to theme pack items."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[2] / "app" / "data" / "vocab"
allow = json.loads((root / "vocab-allowlist.json").read_text(encoding="utf-8"))
allow_set = set(allow["lemmas"])


def level_band(file_meta: dict) -> str:
    """Map pack file level/topikBand → item levelBand (schema §3)."""
    level = file_meta.get("level")
    topik = file_meta.get("topikBand")
    if level == "beginner" or topik == "I":
        return "beg"
    if level == "intermediate" or topik == "II-low":
        return "int-low"
    raise ValueError(f"unknown level mapping: {level}/{topik}")


def attach_phase2(item: dict, lb: str, in_al: bool) -> dict:
    """Insert levelBand (and allowlist marks) after themes or senseId."""
    item.pop("levelBand", None)
    item.pop("freqBand", None)
    item.pop("inAllowlist", None)

    new: dict = {}
    inserted = False
    anchor = "themes" if "themes" in item else "senseId"
    for k, v in item.items():
        new[k] = v
        if k == anchor and not inserted:
            new["levelBand"] = lb
            if in_al:
                new["freqBand"] = "A"
                new["inAllowlist"] = True
            inserted = True
    if not inserted:
        item_id = item.get("id")
        raise RuntimeError(f"could not insert for {item_id}")
    return new


def main() -> None:
    print("allowlist lemmas:", len(allow_set))
    results = {}
    for fname in [
        "jabi-theme-packs-beginner.json",
        "jabi-theme-packs-intermediate.json",
    ]:
        path = root / fname
        data = json.loads(path.read_text(encoding="utf-8"))
        lb = level_band(data)
        n_items = 0
        n_level = 0
        n_freq = 0
        for pack in data["packs"]:
            for i, item in enumerate(pack["items"]):
                n_items += 1
                lemma = item["lemma"]
                in_al = lemma in allow_set
                pack["items"][i] = attach_phase2(item, lb, in_al)
                n_level += 1
                if in_al:
                    n_freq += 1
        path.write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        results[fname] = {
            "levelBand_value": lb,
            "items": n_items,
            "with_levelBand": n_level,
            "with_freqBand_A_and_inAllowlist": n_freq,
            "not_in_allowlist": n_items - n_freq,
        }
    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
