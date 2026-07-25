"""Trace the approved jabi. mascot PNG into a real SVG.

The artwork is flat: a dark silhouette with orange and red painted on top, so we
trace one mask per colour and stack them in that order. Contours come from
marching squares (which yields every closed loop, holes included) and are
simplified with Douglas-Peucker; holes work because the paths use evenodd.

Run:  python scripts/trace-logo.py <source.png>
Writes hub/app/icons/jabi-mark.svg and icon.svg (+ PNG sizes).
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

# Palette sampled from the approved artwork.
OUTLINE = "#121F25"
ORANGE = "#FF8E24"
RED = "#F8252E"
BADGE_BG = "#FFE8C4"

SIMPLIFY_EPS = 1.1  # px, in source resolution
MIN_LOOP_AREA = 12.0  # drop speckles from anti-aliasing

# Marching-squares: corner bits TL=1 TR=2 BR=4 BL=8 -> list of (from, to) edges.
SEGMENTS = {
    1: [("L", "T")], 2: [("T", "R")], 3: [("L", "R")], 4: [("R", "B")],
    5: [("L", "T"), ("R", "B")], 6: [("T", "B")], 7: [("L", "B")],
    8: [("B", "L")], 9: [("B", "T")], 10: [("T", "R"), ("B", "L")],
    11: [("B", "R")], 12: [("R", "L")], 13: [("R", "T")], 14: [("T", "L")],
}


def edge_point(kind, i, j):
    return {
        "T": (i, j + 0.5),
        "R": (i + 0.5, j + 1),
        "B": (i + 1, j + 0.5),
        "L": (i + 0.5, j),
    }[kind]


def trace(mask):
    """All closed contours of a boolean mask, as lists of (x, y)."""
    m = np.pad(mask, 1).astype(np.uint8)
    h, w = m.shape
    code = (m[:-1, :-1] + 2 * m[:-1, 1:] + 4 * m[1:, 1:] + 8 * m[1:, :-1]).astype(int)

    links = {}
    for i, j in zip(*np.nonzero((code > 0) & (code < 15))):
        for a, b in SEGMENTS[code[i, j]]:
            links.setdefault(edge_point(a, i, j), []).append(edge_point(b, i, j))

    loops = []
    while links:
        start = next(iter(links))
        pt, loop = start, []
        while True:
            nxts = links.get(pt)
            if not nxts:
                break
            nxt = nxts.pop()
            if not nxts:
                del links[pt]
            loop.append(pt)
            pt = nxt
            if pt == start:
                break
        if len(loop) >= 4:
            # marching squares works in (row, col); emit (x, y) and undo the pad
            loops.append([(c - 1, r - 1) for r, c in loop])
    return loops


def area(pts):
    x = np.array([p[0] for p in pts])
    y = np.array([p[1] for p in pts])
    return abs(np.dot(x, np.roll(y, -1)) - np.dot(y, np.roll(x, -1))) / 2


def simplify(pts, eps):
    """Douglas-Peucker, iterative so deep contours cannot blow the stack."""
    if len(pts) < 3:
        return pts
    keep = np.zeros(len(pts), bool)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    p = np.array(pts, float)
    while stack:
        lo, hi = stack.pop()
        if hi <= lo + 1:
            continue
        seg = p[hi] - p[lo]
        n = np.hypot(*seg)
        rel = p[lo + 1 : hi] - p[lo]
        d = (
            np.abs(np.cross(np.tile(seg, (len(rel), 1)), rel)) / n
            if n > 1e-9
            else np.hypot(rel[:, 0], rel[:, 1])
        )
        k = int(np.argmax(d))
        if d[k] > eps:
            k += lo + 1
            keep[k] = True
            stack += [(lo, k), (k, hi)]
    return [pts[i] for i in np.nonzero(keep)[0]]


def to_path(loops, sx, sy, ox, oy):
    out = []
    for loop in loops:
        if area(loop) < MIN_LOOP_AREA:
            continue
        pts = simplify(loop, SIMPLIFY_EPS)
        if len(pts) < 3:
            continue
        d = " ".join(
            f"{'M' if k == 0 else 'L'}{(x - ox) * sx:.1f} {(y - oy) * sy:.1f}"
            for k, (x, y) in enumerate(pts)
        )
        out.append(d + "Z")
    return "".join(out)


def main():
    src = Path(sys.argv[1] if len(sys.argv) > 1 else "jabi-pick2.png")
    im = Image.open(src).convert("RGBA")
    a = np.array(im)
    r, g, b, al = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int), a[..., 3]

    solid = al > 128
    red = solid & (r > 180) & (g < 110)
    orange = solid & (r > 200) & (g >= 110) & (b < 130) & ~red

    ys, xs = np.nonzero(solid)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    cw, ch = x1 - x0 + 1, y1 - y0 + 1

    # Mark viewBox is tight to the artwork; keep the source aspect ratio.
    vb_w, vb_h = 1000, round(1000 * ch / cw)
    s = vb_w / cw

    layers = [
        (OUTLINE, to_path(trace(solid), s, s, x0, y0)),
        (ORANGE, to_path(trace(orange), s, s, x0, y0)),
        (RED, to_path(trace(red), s, s, x0, y0)),
    ]
    body = "\n".join(
        f'  <path fill="{c}" fill-rule="evenodd" d="{d}"/>' for c, d in layers if d
    )

    out = Path(__file__).resolve().parent.parent / "hub" / "app" / "icons"
    out.mkdir(parents=True, exist_ok=True)

    mark = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w} {vb_h}" '
        f'role="img" aria-label="jabi.">\n{body}\n</svg>\n'
    )
    (out / "jabi-mark.svg").write_text(mark, encoding="utf-8")

    # Badge icon: same art centred in a 512 rounded square with breathing room.
    pad = 0.80  # fraction of the badge the art may occupy
    k = min(512 * pad / vb_w, 512 * pad / vb_h)
    tx, ty = (512 - vb_w * k) / 2, (512 - vb_h * k) / 2
    icon = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" '
        'role="img" aria-label="jabi.">\n'
        f'  <rect width="512" height="512" rx="112" fill="{BADGE_BG}"/>\n'
        f'  <g transform="translate({tx:.1f} {ty:.1f}) scale({k:.4f})">\n'
        + "\n".join(f"  {ln}" for ln in body.splitlines())
        + "\n  </g>\n</svg>\n"
    )
    (out / "icon.svg").write_text(icon, encoding="utf-8")

    # Raster sizes for PWA / iOS, rendered from the source art so they match.
    art = im.crop((x0, y0, x1 + 1, y1 + 1))
    for px, name in ((192, "icon-192.png"), (512, "icon-512.png"), (180, "apple-touch-icon.png")):
        canvas = Image.new("RGBA", (px, px), (0, 0, 0, 0))
        ImageDraw.Draw(canvas).rounded_rectangle(
            [0, 0, px - 1, px - 1], int(112 * px / 512), fill=BADGE_BG
        )
        fit = min(px * pad / cw, px * pad / ch)
        scaled = art.resize((max(1, round(cw * fit)), max(1, round(ch * fit))), Image.LANCZOS)
        canvas.alpha_composite(
            scaled, ((px - scaled.width) // 2, (px - scaled.height) // 2)
        )
        canvas.save(out / name)

    for f in sorted(out.iterdir()):
        print(f"{f.name:24} {f.stat().st_size:>8,} bytes")


if __name__ == "__main__":
    main()
