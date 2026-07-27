# -*- coding: utf-8 -*-
"""Batch-trace partner growth PNGs → SVG.

Reads hub/app/assets/chars/source/{id}-{1..6}.png and writes
hub/app/assets/chars/char-{id}-{stage}.svg via trace-character-multi.

By default, ids listed in manifest.json pipeline.doNotOverwrite (giyeok)
are skipped so Paul-OK SVGs are not clobbered. Pass --force to re-trace
a protected id (use with care).

Usage:
  python scripts/trace-char-sources.py              # all ids with new PNGs
  python scripts/trace-char-sources.py nieun        # one letter
  python scripts/trace-char-sources.py nieun digeut
  python scripts/trace-char-sources.py nieun --stages 1,2,3
  python scripts/trace-char-sources.py giyeok --force
  python scripts/trace-char-sources.py --status     # print roster gaps
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CHARS = ROOT / "hub/app/assets/chars"
SRC = CHARS / "source"
MANIFEST = CHARS / "manifest.json"


def load_tracer():
    spec = importlib.util.spec_from_file_location(
        "trace_multi", ROOT / "scripts/trace-character-multi.py"
    )
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def load_manifest():
    if not MANIFEST.exists():
        return {"partners": [], "pipeline": {"doNotOverwrite": ["giyeok"]}}
    return json.loads(MANIFEST.read_text(encoding="utf-8"))


def protected_ids(manifest: dict) -> set[str]:
    pipe = manifest.get("pipeline") or {}
    return set(pipe.get("doNotOverwrite") or [])


def partner_ids(manifest: dict) -> list[str]:
    return [p["id"] for p in manifest.get("partners") or []]


def art_status(manifest: dict) -> list[dict]:
    rows = []
    for p in manifest.get("partners") or []:
        pid = p["id"]
        stages = {}
        for n in range(1, 7):
            png = SRC / f"{pid}-{n}.png"
            svg = CHARS / f"char-{pid}-{n}.svg"
            stages[n] = {
                "png": png.exists(),
                "svg": svg.exists(),
                "paulOk": n in (p.get("paulOkStages") or []),
            }
        rows.append({"id": pid, "glyph": p.get("glyph"), "stages": stages, "status": p.get("status")})
    return rows


def _safe_print(msg: str) -> None:
    """Prefer UTF-8; fall back without crashing on legacy Windows consoles."""
    try:
        if hasattr(sys.stdout, "reconfigure"):
            sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass
    try:
        print(msg)
    except UnicodeEncodeError:
        print(msg.encode("ascii", errors="replace").decode("ascii"))


def print_status(manifest: dict) -> None:
    _safe_print(f"{'id':10}  1    2    3    4    5    6   status")
    for row in art_status(manifest):
        cells = []
        for n in range(1, 7):
            s = row["stages"][n]
            if s["paulOk"] and s["svg"]:
                cells.append("OK")
            elif s["svg"]:
                cells.append("svg")
            elif s["png"]:
                cells.append("png")
            else:
                cells.append("---")
        glyph = row.get("glyph") or ""
        _safe_print(
            f"{row['id']:10}  "
            + " ".join(f"{c:3}" for c in cells)
            + f"  {row.get('status') or ''} {glyph}"
        )


def write_svg(mod, png: Path, out: Path) -> None:
    vb, paths = mod.trace_character(str(png))
    body = "\n".join(
        f'  <path fill="{c}" fill-rule="evenodd" d="{d}"/>' for c, d in paths
    )
    out.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {vb}" role="img">\n'
        f"{body}\n</svg>\n",
        encoding="utf-8",
    )
    print(
        f"OK {png.name} → {out.name}  ({len(paths)} layers {[c for c, _ in paths]})"
    )


def trace_ids(
    ids: list[str],
    stages: list[int] | None,
    force: bool,
    manifest: dict,
) -> int:
    protect = protected_ids(manifest)
    mod = load_tracer()
    stage_set = set(stages) if stages else set(range(1, 7))
    done = 0
    skipped = 0

    for pid in ids:
        if pid in protect and not force:
            print(f"SKIP {pid} (Paul-OK protect; pass --force to overwrite)")
            skipped += 1
            continue
        for n in sorted(stage_set):
            png = SRC / f"{pid}-{n}.png"
            if not png.exists():
                continue
            out = CHARS / f"char-{pid}-{n}.svg"
            write_svg(mod, png, out)
            done += 1

    if done == 0 and skipped == 0:
        print("No matching source/{id}-{stage}.png found.")
        return 1
    print(f"traced={done} protected_skips={skipped}")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument(
        "ids",
        nargs="*",
        help="Partner ids (default: all with PNGs present, still respecting protect)",
    )
    ap.add_argument(
        "--stages",
        help="Comma list e.g. 1,2,3 (default 1–6)",
    )
    ap.add_argument(
        "--force",
        action="store_true",
        help="Allow overwrite of protected ids (giyeok)",
    )
    ap.add_argument(
        "--status",
        action="store_true",
        help="Print PNG/SVG/OK matrix and exit",
    )
    args = ap.parse_args()
    manifest = load_manifest()

    if args.status:
        print_status(manifest)
        return 0

    stages = None
    if args.stages:
        stages = [int(x.strip()) for x in args.stages.split(",") if x.strip()]

    ids = args.ids
    if not ids:
        # Auto: any partner that has at least one source PNG
        ids = []
        for pid in partner_ids(manifest):
            if any((SRC / f"{pid}-{n}.png").exists() for n in range(1, 7)):
                ids.append(pid)
        if not ids:
            print("No source PNGs for any partner. Drop files as source/{id}-{n}.png")
            print_status(manifest)
            return 1

    return trace_ids(ids, stages, args.force, manifest)


if __name__ == "__main__":
    sys.exit(main())
