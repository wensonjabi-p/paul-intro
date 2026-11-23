# -*- coding: utf-8 -*-
"""One-shot polish: TOPIK II write drafts — NIKL spacing, EN/ZH gloss, no Stub/Lemon in learner copy."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1] / "hub" / "app" / "data" / "topik2"


def polish_text(s):
    if not isinstance(s, str):
        return s
    reps = [
        ("Stub coach: ", "Coach: "),
        ("Stub 코치: ", "코치: "),
        ("Stub教练：", "教练："),
        ("Stub OK — ", "OK — "),
        ("Stub 통과 — ", "통과 — "),
        ("Stub通过 — ", "通过 — "),
        ("Qualitative coach / Lemon later. ", ""),
        ("정성 코치/Lemon은 나중. ", ""),
        ("定性教练/Lemon稍后。", ""),
        ("非官方分。", "非官方分数。"),
    ]
    for a, b in reps:
        s = s.replace(a, b)
    return s


def walk(o):
    if isinstance(o, dict):
        return {k: walk(v) for k, v in o.items()}
    if isinstance(o, list):
        return [walk(x) for x in o]
    return polish_text(o)


def fix_traits(d):
    for t in d["scoring"]["traits"].values():
        if t["label"].get("zh") == "结构/连贯":
            t["label"]["zh"] = "结构·连贯"


def dump(path, d):
    path.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


# --- 51 ---
p51 = root / "draft-write-51.json"
d = walk(json.loads(p51.read_text(encoding="utf-8")))
d["verifiedAt"] = "2026-07-27"
d["sourceNote"] = (
    "Research fill — original jabi. sentence-completion items. Official TOPIK structure only "
    "(one blank, formal written register). No official prompts or wording. Formative cloze score "
    "with partial credit (exact / near / stem / honorific) + tip; no AI / Lemon / official TOPIK points. "
    "Spacing follows NIKL auxiliary-verb norms (e.g. 해 주십시오)."
)
fix_traits(d)
d["questions"][0]["prompt"]["en"] = (
    "Read and write the word(s) that fit the blank.\n\n"
    "You must not speak loudly in the library. For others, please quietly (    )."
)
acc = d["questions"][1]["acceptedAnswers"]
d["questions"][1]["acceptedAnswers"] = [
    "건네 주십시오" if a == "건네주십시오" else "건네 주세요" if a == "건네주세요" else a
    for a in acc
]
d["questions"][2]["prompt"]["en"] = (
    "Read and write the word(s) that fit the blank.\n\n"
    "The weather looks good this weekend. So with friends I (    ) to the mountains."
)
d["questions"][3]["prompt"]["zh"] = (
    "阅读后在括号内填入合适的话。\n\n"
    "约好的时间可能会稍晚一点。应提前(    )。"
)
dump(p51, d)
print("51", len(d["questions"]))

# --- 52 ---
p52 = root / "draft-write-52.json"
d = walk(json.loads(p52.read_text(encoding="utf-8")))
d["verifiedAt"] = "2026-07-27"
d["sourceNote"] = (
    "Research fill — original jabi. sentence-completion items (Q52 slot). Official TOPIK structure only "
    "(blank + formal written register). No official prompts. Formative cloze score with partial credit; "
    "no AI / Lemon. Early tips must not leak model wording. NIKL spacing in accepted answers."
)
fix_traits(d)
dump(p52, d)
print("52", len(d["questions"]))

# --- 53 ---
p53 = root / "draft-write-53.json"
d = walk(json.loads(p53.read_text(encoding="utf-8")))
d["verifiedAt"] = "2026-07-27"
d["sourceNote"] = (
    "Research fill — original short-composition prompts (~200–300 Hangul chars). Graph/info described in text "
    "(no official TOPIK items). Formative trait continuum from length/register/softKeywords/checklist — "
    "no AI / Lemon. Do not leak full model essay in early tips."
)
fix_traits(d)
for q in d["questions"]:
    pr = q["prompt"]
    pr["zh"] = pr["zh"].replace("约200–300字", "约200–300字（韩文字符）")
    pr["zh"] = pr["zh"].replace("写约200–300字", "写约200–300字（韩文字符）")
    for c in q.get("checklist", []):
        if c.get("id") == "length" and "zh" in c:
            c["zh"] = c["zh"].replace("200–300字", "200–300字（韩文）")
        if c.get("id") == "register":
            c["en"] = "Uses formal written endings (-습니다 / -다)"
            c["ko"] = "격식체 문어 종결(-습니다/-다) 사용"
            c["zh"] = "使用书面敬体语尾（-습니다/-다）"
dump(p53, d)
print("53", len(d["questions"]))

# --- 54 ---
p54 = root / "draft-write-54.json"
d = walk(json.loads(p54.read_text(encoding="utf-8")))
d["verifiedAt"] = "2026-07-27"
d["sourceNote"] = (
    "Research fill — original opinion essay prompts (~600–700 Hangul chars). Heaviest writing weight per research doc. "
    "Formative trait continuum (language weight ↑) — no Lemon / AI grading. Early tips must not leak a full model essay."
)
fix_traits(d)
for q in d["questions"]:
    pr = q["prompt"]
    pr["zh"] = pr["zh"].replace("约600–700字", "约600–700字（韩文字符）")
    for c in q.get("checklist", []):
        if c.get("id") == "register":
            c["en"] = "Keeps formal written register (-습니다 / -다)"
            c["ko"] = "격식체 문어 유지(-습니다/-다)"
            c["zh"] = "保持书面敬体（-습니다/-다）"
        if c.get("id") == "structure":
            c["en"] = "Uses discourse markers / multi-paragraph flow"
            c["ko"] = "담화 표지·문단 흐름이 보임"
            c["zh"] = "可见衔接词/多段结构"
dump(p54, d)
print("54", len(d["questions"]))
print("done")
