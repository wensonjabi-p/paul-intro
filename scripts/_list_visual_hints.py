# -*- coding: utf-8 -*-
import json
from pathlib import Path

TAG = {
    "grammar:와/과": ("👤 + 👤", "together"),
    "grammar:보다": ("📦 < 📦", "compare / than"),
    "grammar:요청": ("🙏", "please / may I"),
    "grammar:존댓말": ("🙇", "polite"),
    "grammar:에/에서": ("📍 →", "place / from–to"),
    "grammar:의문사": ("❓ 📍", "where / what"),
    "grammar:서술형": ("✏️ .", "end sentence"),
    "grammar:부정": ("🚫", "not"),
    "grammar:단위": ("🔢", "counter"),
    "grammar:과거": ("⏪", "past"),
    "grammar:때": ("⏰", "when"),
    "reading:주제": ("📌", "main topic"),
    "reading:안내문": ("📋", "notice"),
    "reading:내용일치": ("✅", "matches text"),
    "reading:지시어": ("👉", "points to"),
    "listening:날씨": ("🌧️", "weather"),
    "listening:장소": ("📍", "place"),
    "listening:계획": ("📅", "plan"),
    "listening:교통": ("🚌", "transport"),
    "listening:시간": ("🕐", "time"),
    "vocab:날씨": ("🌤️", "weather"),
    "vocab:장소": ("📍", "place"),
    "vocab:취미": ("🎨", "hobby"),
    "vocab:가족": ("👪", "family"),
    "vocab:음식": ("🍽️", "food"),
    "vocab:학교": ("🏫", "school"),
    "vocab:시간": ("🕐", "time"),
    "vocab:수": ("🔢", "number"),
    "vocab:교통": ("🚌", "transport"),
    "vocab:형용사": ("✨", "describing"),
}

out = []
root = Path(__file__).resolve().parents[1] / "hub" / "app" / "data"
for name in [
    "verified-read-01.json",
    "verified-read-02.json",
    "verified-read-03.json",
    "verified-listen-01.json",
]:
    data = json.loads((root / name).read_text(encoding="utf-8"))
    for q in data["questions"]:
        pk = q["prompt"].get("ko", "")
        lines = [
            ln.strip()
            for ln in pk.split("\n")
            if ln.strip() and not ln.strip().startswith("※")
        ]
        sent = " | ".join(lines)
        vis = (q.get("hint") or {}).get("visual")
        if vis and vis.get("kind") == "size-compare":
            emoji, cap, src = "□ < ■ (CSS)", vis.get("en", "big"), "override"
        elif vis and vis.get("emoji"):
            emoji = " ".join(vis["emoji"])
            cap = vis.get("en") or vis.get("label") or ""
            src = "override"
        else:
            emoji, cap, src = "💡", "fallback", "tag"
            for t in q.get("tags") or []:
                if t in TAG:
                    emoji, cap = TAG[t]
                    break
        out.append(
            {
                "file": name.replace("verified-", "").replace(".json", ""),
                "id": q["id"],
                "type": q.get("type"),
                "tags": q.get("tags") or [],
                "sentence": sent,
                "emoji": emoji,
                "caption": cap,
                "src": src,
            }
        )

dest = Path(__file__).resolve().parents[1] / "hub" / "ops" / "qa" / "visual-hint-map.json"
dest.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
print("wrote", dest, "n=", len(out))
# also print TSV for chat
for row in out:
    print(f"{row['id']}\t{row['emoji']}\t{row['caption']}\t{row['sentence'][:90]}")
