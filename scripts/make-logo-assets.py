"""Generate jabi. logo assets (SVG + PNG) from one shared geometry definition.

Style locked with Paul 2026-07-25: bold dark-brown outline, warm orange body,
the Hangul jamo ㅈ as head/torso with two short stubby legs, two dot eyes.

Run:  python scripts/make-logo-assets.py
Writes into hub/app/icons/.
"""

from pathlib import Path

from PIL import Image, ImageDraw

# ---------------------------------------------------------------- palette
ORANGE = "#F5983D"
OUTLINE = "#4A2410"
BG = "#FFE8C4"

# ------------------------------------------------------------ geometry
# All coordinates are on a 512x512 canvas. The character is built from
# round-capped strokes so the silhouette reads the same in SVG and raster.
SIZE = 512
OUTLINE_EXTRA = 26  # total added width -> 13px of outline on each side

# (x1, y1, x2, y2, stroke_width)
# The ㅈ (bar + two diagonals) is the head/torso; the diagonals stop high so the
# two legs below read as legs rather than turning the mark into a spider.
# The diagonals splay outward quickly so open space stays visible between the
# arms and the legs — otherwise the lower half fuses into one blob.
STROKES = [
    (146, 165, 366, 165, 58),  # ㅈ top horizontal bar (the head, carries the eyes)
    (256, 194, 170, 282, 50),  # ㅈ left diagonal — ~45°, so it still reads as ㅈ
    (256, 194, 342, 282, 50),  # ㅈ right diagonal
    (230, 235, 230, 362, 30),  # left leg — thinner than the arms so it reads as a leg
    (282, 235, 282, 362, 30),  # right leg
]

EYES = [(228, 165, 11), (284, 165, 11)]  # (cx, cy, r)

CORNER_RADIUS = 112  # rounded-square app-icon badge


# ---------------------------------------------------------------- SVG
def build_svg(with_background: bool) -> str:
    def stroke_pass(color: str, extra: int) -> str:
        return "\n".join(
            f'    <line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" '
            f'stroke="{color}" stroke-width="{w + extra}" stroke-linecap="round"/>'
            for x1, y1, x2, y2, w in STROKES
        )

    bg = (
        f'  <rect width="{SIZE}" height="{SIZE}" rx="{CORNER_RADIUS}" fill="{BG}"/>\n'
        if with_background
        else ""
    )
    eyes = "\n".join(
        f'    <circle cx="{cx}" cy="{cy}" r="{r}" fill="{OUTLINE}"/>' for cx, cy, r in EYES
    )

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}" \
role="img" aria-label="jabi.">
{bg}  <g>
{stroke_pass(OUTLINE, OUTLINE_EXTRA)}
  </g>
  <g>
{stroke_pass(ORANGE, 0)}
  </g>
  <g>
{eyes}
  </g>
</svg>
"""


# ---------------------------------------------------------------- PNG
def rounded_mask(size: int, radius: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size - 1, size - 1], radius, fill=255)
    return mask


def draw_strokes(draw: ImageDraw.ImageDraw, color: str, extra: int, scale: float) -> None:
    """Round-capped lines: PIL has no round cap, so add end circles by hand."""
    for x1, y1, x2, y2, w in STROKES:
        width = int(round((w + extra) * scale))
        p1 = (x1 * scale, y1 * scale)
        p2 = (x2 * scale, y2 * scale)
        draw.line([p1, p2], fill=color, width=width)
        r = width / 2
        for cx, cy in (p1, p2):
            draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)


def build_png(px: int, with_background: bool) -> Image.Image:
    # Supersample 4x then downscale for smooth edges.
    ss = 4
    canvas = px * ss
    scale = canvas / SIZE

    img = Image.new("RGBA", (canvas, canvas), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    if with_background:
        draw.rounded_rectangle(
            [0, 0, canvas - 1, canvas - 1], int(CORNER_RADIUS * scale), fill=BG
        )

    draw_strokes(draw, OUTLINE, OUTLINE_EXTRA, scale)
    draw_strokes(draw, ORANGE, 0, scale)

    for cx, cy, r in EYES:
        cx, cy, r = cx * scale, cy * scale, r * scale
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=OUTLINE)

    return img.resize((px, px), Image.LANCZOS)


# ---------------------------------------------------------------- main
def main() -> None:
    out = Path(__file__).resolve().parent.parent / "hub" / "app" / "icons"
    out.mkdir(parents=True, exist_ok=True)

    (out / "icon.svg").write_text(build_svg(with_background=True), encoding="utf-8")
    (out / "jabi-mark.svg").write_text(build_svg(with_background=False), encoding="utf-8")

    for px in (192, 512):
        build_png(px, with_background=True).save(out / f"icon-{px}.png")
    build_png(180, with_background=True).save(out / "apple-touch-icon.png")

    for f in sorted(out.iterdir()):
        print(f"{f.name:24} {f.stat().st_size:>7,} bytes")


if __name__ == "__main__":
    main()
