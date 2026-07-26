# -*- coding: utf-8 -*-
"""Trace any giyeok-N.png found in chars/source into char-giyeok-N.svg."""
from pathlib import Path
import importlib.util

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "hub/app/assets/chars/source"
OUT = ROOT / "hub/app/assets/chars"

spec = importlib.util.spec_from_file_location(
    "trace_multi", ROOT / "scripts/trace-character-multi.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

found = sorted(SRC.glob("giyeok-*.png"))
if not found:
    print("No giyeok-*.png in", SRC)
    raise SystemExit(1)

for png in found:
    stage = png.stem.split("-")[-1]
    if not stage.isdigit():
        print("skip", png.name)
        continue
    vb, paths = mod.trace_character(str(png))
    body = "\n".join(
        f'  <path fill="{c}" fill-rule="evenodd" d="{d}"/>' for c, d in paths
    )
    svg_path = OUT / f"char-giyeok-{stage}.svg"
    svg_path.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {vb}" role="img">\n{body}\n</svg>\n',
        encoding="utf-8",
    )
    print(
        f"OK stage {stage}: {len(paths)} layers {[c for c,_ in paths]} -> {svg_path.name}"
    )
