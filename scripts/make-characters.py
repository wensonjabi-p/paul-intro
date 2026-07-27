"""Build the 자음 companion character sheet: one SVG per jamo, per growth stage.

The growth ladder is Pokemon-style — a dark silhouette at stage 1 that resolves
into full colour by stage 4. That needs no extra artwork: every stage reuses the
same traced paths and only swaps fills, so a jamo costs one Canva generation and
one trace no matter how many stages we end up shipping.

Run:  python scripts/make-characters.py <roman>=<source.png> [...]
      python scripts/make-characters.py giyeok=C:/tmp/giyeok.png

Writes hub/assets/characters/char-<roman>-<stage>.svg (1..4) plus
char-<roman>.svg, which uses CSS custom properties for inline recolouring.
"""

import sys
from pathlib import Path

from trace_character import build_layers, mix, read_artwork, svg

OUT = Path(__file__).resolve().parent.parent / "hub" / "assets" / "characters"

# Stage 1 is a flat silhouette that resolves into full colour by stage 4.
# It is deliberately mid-slate rather than the near-black outline colour: the
# app runs on a very dark background, so a black silhouette would vanish.
SILHOUETTE = "#68717F"

# Per stage, how far each part is pulled back toward SILHOUETTE (1 = fully
# hidden). `flat` means the outline is greyed out too, so nothing reads yet.
STAGES = [
    {"flat": True, "body": 1.00, "accent": 1.00},
    {"flat": False, "body": 0.66, "accent": 0.85},
    {"flat": False, "body": 0.00, "accent": 0.50},
    {"flat": False, "body": 0.00, "accent": 0.00},
]


def build(roman, src):
    art = read_artwork(src)
    layers = build_layers(art)
    outline = art["outline_color"]
    body = art["body_color"]
    accent = art["accent_color"] or body

    OUT.mkdir(parents=True, exist_ok=True)
    written = []

    for i, s in enumerate(STAGES, start=1):
        colors = {
            "outline": SILHOUETTE if s["flat"] else outline,
            "body": mix(body, SILHOUETTE, s["body"]),
            "accent": mix(accent, SILHOUETTE, s["accent"]),
        }
        p = OUT / f"char-{roman}-{i}.svg"
        p.write_text(svg(layers, colors, f"{roman} stage {i}"), encoding="utf-8")
        written.append(p)

    # Master copy: custom properties so an inlined SVG can be themed from CSS.
    themed = {
        "outline": f"var(--char-outline, {outline})",
        "body": f"var(--char-body, {body})",
        "accent": f"var(--char-accent, {accent})",
    }
    p = OUT / f"char-{roman}.svg"
    p.write_text(svg(layers, themed, roman), encoding="utf-8")
    written.append(p)

    print(f"{roman}: outline {outline}  body {body}  accent {art['accent_color']}")
    for f in written:
        print(f"  {f.name:26} {f.stat().st_size:>6,} bytes")


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        raise SystemExit(1)
    for pair in args:
        roman, _, src = pair.partition("=")
        if not src:
            raise SystemExit(f"expected <roman>=<path>, got: {pair}")
        build(roman, src)


if __name__ == "__main__":
    main()
