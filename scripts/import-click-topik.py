#!/usr/bin/env python3
"""Import a beginner-friendly slice of CLIcK TOPIK items → hub/app/data.

Source: https://github.com/rladmstn1714/CLIcK (LREC-COLING 2024)
Hugging Face: https://huggingface.co/datasets/EunsuKim/CLIcK

Run from repo root (needs network once to refresh raw JSON, or use tmp-click/).
"""
from __future__ import annotations

import json
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "hub" / "app" / "data"
CACHE = ROOT / "tmp-click"

URLS = {
    "textual": "https://raw.githubusercontent.com/rladmstn1714/CLIcK/main/Dataset/Language/Textual/Textual_TOPIK.json",
    "grammar": "https://raw.githubusercontent.com/rladmstn1714/CLIcK/main/Dataset/Language/Grammar/Grammar_TOPIK.json",
}


def load_json(name: str, url: str) -> list:
    CACHE.mkdir(exist_ok=True)
    path = CACHE / f"{name}.json"
    if not path.exists():
        with urllib.request.urlopen(url, timeout=60) as r:
            path.write_bytes(r.read())
    return json.loads(path.read_text(encoding="utf-8"))


def tag_for(q: dict, kind: str) -> list[str]:
    stem = q["question"]
    tags = [f"source:CLIcK", f"kind:{kind}"]
    if "무엇에 대한" in stem:
        tags.append("reading:주제")
    elif "내용이 같은" in stem or "내용과 같은" in stem:
        tags.append("reading:내용일치")
    elif "주제로" in stem:
        tags.append("reading:주제")
    elif "( )" in stem or "들어갈" in stem:
        tags.append("grammar:빈칸")
    else:
        tags.append("reading:이해")
    return tags


def convert_item(q: dict, kind: str) -> dict:
    choices = list(q["choices"])
    answer_text = q["answer"]
    if answer_text not in choices:
        raise ValueError(f"{q['id']}: answer not in choices")
    if len(choices) != 4 or len(set(choices)) != 4:
        raise ValueError(f"{q['id']}: need 4 unique choices")
    answer = choices.index(answer_text)
    para = (q.get("paragraph") or "").strip()
    stem = q["question"].strip()
    body = f"{para}\n\n{stem}" if para else stem
    return {
        "id": q["id"],
        "type": kind,
        "prompt": {
            "ko": body,
            "en": f"[CLIcK / TOPIK-sourced] Choose the best answer.\n\n{body}",
        },
        "choices": choices,
        "answer": answer,
        "answerText": answer_text,
        "tags": tag_for(q, kind),
        "why": f"CLIcK gold answer ({q['id']}): {answer_text}",
        "sourceId": q["id"],
    }


def pick_textual(items: list, ids: list[str]) -> list:
    by_id = {q["id"]: q for q in items}
    return [by_id[i] for i in ids if i in by_id]


def main() -> None:
    textual = load_json("Textual_TOPIK", URLS["textual"])
    grammar = load_json("Grammar_TOPIK", URLS["grammar"])

    # Prefer short “광고/안내·주제” style ids (low item numbers ≈ TOPIK I reading types).
    set1_ids = [
        "TK_2016_5",
        "TK_2016_6",
        "TK_2016_7",
        "TK_2017_5",
        "TK_2017_6",
        "TK_2017_7",
        "TK_2017_8",
        "TK_2018_5",
        "TK_2018_6",
        "TK_2018_7",
    ]
    set2_ids = [
        "TK_2018_8",
        "TK_2018_23",
        "TK_2018_24",
        "TK_2019_5",
        "TK_2019_6",
        "TK_2019_7",
        "TK_2019_8",
        "TK_2016_25",
        "TK_2016_26",
        "TK_2017_23",
    ]
    # Set 3: validated grammar bank from CLIcK TOPIK (first 10).
    set3 = grammar[:10]

    sets = [
        ("click-topik-01.json", "CLIcK TOPIK Reading · Set 1", "CLIcK TOPIK 읽기 · 세트 1", pick_textual(textual, set1_ids), "textual"),
        ("click-topik-02.json", "CLIcK TOPIK Reading · Set 2", "CLIcK TOPIK 읽기 · 세트 2", pick_textual(textual, set2_ids), "textual"),
        ("click-topik-03.json", "CLIcK TOPIK Grammar · Set 3", "CLIcK TOPIK 문법 · 세트 3", set3, "grammar"),
    ]

    for fname, title_en, title_ko, raw, kind in sets:
        questions = [convert_item(q, kind) for q in raw]
        if len(questions) != 10:
            missing = 10 - len(questions)
            raise SystemExit(f"{fname}: expected 10 got {len(questions)} (missing {missing})")
        payload = {
            "id": fname.replace(".json", ""),
            "title": {"en": title_en, "ko": title_ko},
            "level": "TOPIK I–II mix (CLIcK curated)",
            "verified": True,
            "verifiedAt": "2026-07-25",
            "source": "CLIcK",
            "sourceNote": (
                "Subset of CLIcK benchmark TOPIK items (Kim et al., LREC-COLING 2024). "
                "https://github.com/rladmstn1714/CLIcK — cite the paper if you publish results."
            ),
            "licenseNote": "Research benchmark redistribution with attribution; not NIIED official papers.",
            "questions": questions,
        }
        out = OUT / fname
        out.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("wrote", out, "n=", len(questions))


if __name__ == "__main__":
    main()
