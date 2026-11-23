# -*- coding: utf-8 -*-
"""Copy generated PNGs into chars/source and trace to SVG."""
from pathlib import Path
import shutil
import importlib.util

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path.home() / ".cursor/projects/c-Users-biker-Documents-ClaudeWeb-paul-intro/assets"
SRC = ROOT / "hub/app/assets/chars/source"
OUT = ROOT / "hub/app/assets/chars"

spec = importlib.util.spec_from_file_location(
    "trace_multi", ROOT / "scripts/trace-character-multi.py"
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

MAP = {
    2: "giyeok-2-pants.png",
    3: "giyeok-3-boots.png",
    4: "giyeok-4-weapon.png",
}

for stage, name in MAP.items():
    src_png = ASSETS / name
    if not src_png.exists():
        print("missing", src_png)
        continue
    dest = SRC / f"giyeok-{stage}.png"
    shutil.copy2(src_png, dest)
    vb, paths = mod.trace_character(str(dest))
    body = "\n".join(
        f'  <path fill="{c}" fill-rule="evenodd" d="{d}"/>' for c, d in paths
    )
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {vb}" role="img">\n{body}\n</svg>\n'
    out = OUT / f"char-giyeok-{stage}.svg"
    out.write_text(svg, encoding="utf-8")
    print(stage, "layers", len(paths), [c for c, _ in paths], "->", out.name)
