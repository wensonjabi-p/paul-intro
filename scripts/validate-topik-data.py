#!/usr/bin/env python3
"""Validate jabi. original question banks (verified-read)."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "hub" / "app" / "data"
FILES = [
    "verified-read-01.json",
    "verified-read-02.json",
    "verified-read-03.json",
    "verified-listen-01.json",
]


def validate_file(path: Path) -> list[str]:
    errs: list[str] = []
    data = json.loads(path.read_text(encoding="utf-8"))
    if not data.get("verified"):
        errs.append(f"{path.name}: verified must be true")
    qs = data.get("questions") or []
    ids = set()
    for i, q in enumerate(qs):
        loc = f"{path.name}#{q.get('id', i)}"
        if q.get("id") in ids:
            errs.append(f"{loc}: duplicate id")
        ids.add(q.get("id"))
        choices = q.get("choices") or []
        if len(choices) != 4:
            errs.append(f"{loc}: need exactly 4 choices")
        ans = q.get("answer")
        if not isinstance(ans, int) or ans < 0 or ans >= len(choices):
            errs.append(f"{loc}: bad answer index")
            continue
        at = q.get("answerText")
        if at is None:
            errs.append(f"{loc}: missing answerText")
        elif at != choices[ans]:
            errs.append(f"{loc}: answerText mismatch")
        if len(set(choices)) != len(choices):
            errs.append(f"{loc}: duplicate choices")
        prompt = q.get("prompt") or {}
        if not prompt.get("ko"):
            errs.append(f"{loc}: prompt.ko required")
        if not (q.get("tags") or []):
            errs.append(f"{loc}: tags required")
    return errs


def main() -> int:
    all_errs: list[str] = []
    for name in FILES:
        path = ROOT / name
        if not path.exists():
            all_errs.append(f"missing: {name}")
            continue
        all_errs.extend(validate_file(path))
    if all_errs:
        print("FAIL")
        for e in all_errs:
            print(" -", e)
        return 1
    print("OK — verified-read sets (original bank)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
