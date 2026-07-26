#!/usr/bin/env python3
"""Merge official TOPIK I reading extracts into hub/app/data/local full sets."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOCAL = ROOT / "hub" / "app" / "data" / "local"
KEYS = json.loads((LOCAL / "answer-keys-topik1.json").read_text(encoding="utf-8"))


def tag_for(q: dict) -> list[str]:
    inst = (q.get("instruction") or "") + (q.get("prompt") or "")
    tags = ["source:official"]
    if "맞지 않는" in inst:
        tags.append("reading:내용불일치")
    elif "내용이 같은" in inst or "내용과 같은" in inst:
        tags.append("reading:내용일치")
    elif "중심" in inst:
        tags.append("reading:중심내용")
    elif "순서" in inst:
        tags.append("reading:배열")
    elif "들어갈" in inst or "㉠" in (q.get("prompt") or ""):
        tags.append("grammar:빈칸")
    elif "무엇에 대한" in inst:
        tags.append("reading:주제")
    else:
        tags.append("reading:이해")
    return tags


def convert(session: int, raw: dict) -> dict:
    num = raw["num"]
    choices = list(raw["choices"])
    if len(choices) != 4:
        raise ValueError(f"{session}-{num}: need 4 choices")
    ans_1based = int(KEYS[str(session)]["reading"][str(num)])
    answer = ans_1based - 1
    answer_text = choices[answer]
    prompt_ko = raw["prompt"]
    if raw.get("instruction") and not prompt_ko.startswith("※"):
        prompt_ko = f"※ {raw['instruction'].lstrip('※ ').split('(각')[0].strip()}\n\n{prompt_ko}"
    return {
        "id": f"t{session}-r{num}",
        "num": num,
        "points": raw.get("points"),
        "type": "reading",
        "prompt": {
            "ko": prompt_ko,
            "en": f"[TOPIK I · {session}회 · Q{num}]\n\n{prompt_ko}",
        },
        "choices": choices,
        "answer": answer,
        "answerText": answer_text,
        "tags": tag_for(raw),
        "why": f"공식 정답 ①–④ 중 {ans_1based}",
    }


def build_set(session: int, items: list[dict]) -> dict:
    questions = [convert(session, q) for q in sorted(items, key=lambda x: x["num"])]
    # validate
    for q in questions:
        assert q["answerText"] == q["choices"][q["answer"]]
    return {
        "id": f"official-topik1-{session}-read",
        "title": {
            "en": f"TOPIK I · {session}th · Reading 31–70",
            "ko": f"TOPIK I · 제{session}회 · 읽기 31–70",
        },
        "level": "TOPIK I",
        "session": session,
        "form": "B-홀수형",
        "section": "reading",
        "verified": True,
        "verifiedAt": "2026-07-25",
        "source": "official-pdf-local",
        "sourceNote": f"From Downloads/토픽문제 제{session}회. local/ gitignored.",
        "answerKeyFile": "answer-keys-topik1.json",
        "questions": questions,
    }


def main() -> None:
    # Prefer merged extract if present
    path_full = ROOT / "tmp-click" / "official" / "extracted-read-31-70.json"
    path_a = ROOT / "tmp-click" / "official" / "extracted-read-31-40.json"
    path_b = ROOT / "tmp-click" / "official" / "extracted-read-41-70.json"
    path_102b = ROOT / "tmp-click" / "official" / "extracted-102-41-70.json"

    by_sess: dict[str, list] = {"102": [], "96": [], "91": []}

    if path_full.exists():
        data = json.loads(path_full.read_text(encoding="utf-8"))
        for s in by_sess:
            by_sess[s].extend(data.get(s, []))
    else:
        if path_a.exists():
            data = json.loads(path_a.read_text(encoding="utf-8"))
            for s in by_sess:
                by_sess[s].extend(data.get(s, []))
        if path_b.exists():
            data = json.loads(path_b.read_text(encoding="utf-8"))
            for s in by_sess:
                # drop any prior 41+ then add full 41-70 extract
                by_sess[s] = [q for q in by_sess[s] if q["num"] < 41] + data.get(s, [])
        else:
            if path_102b.exists():
                data = json.loads(path_102b.read_text(encoding="utf-8"))
                by_sess["102"] = [q for q in by_sess["102"] if q["num"] < 41] + data.get("102", [])

            path_partial = ROOT / "tmp-click" / "official" / "extracted-96-91-41-52.json"
            if path_partial.exists():
                data = json.loads(path_partial.read_text(encoding="utf-8"))
                for s in ("96", "91"):
                    existing = {q["num"]: q for q in by_sess[s]}
                    for q in data.get(s, []):
                        existing[q["num"]] = q
                    by_sess[s] = list(existing.values())

    for s, items in by_sess.items():
        # dedupe by num
        seen = {}
        for q in items:
            seen[q["num"]] = q
        items = list(seen.values())
        if not items:
            print("skip empty", s)
            continue
        nums = sorted(seen)
        print(s, "nums", nums[0], "-", nums[-1], "count", len(nums))
        payload = build_set(int(s), items)
        out = LOCAL / f"official-topik1-{s}-read.json"
        out.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("wrote", out, "n=", len(payload["questions"]))


if __name__ == "__main__":
    main()
