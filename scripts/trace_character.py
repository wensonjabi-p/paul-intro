"""Shared tracing core: turn a flat character PNG into layered SVG paths.

The artwork is painted dark-outline -> body -> accent, so we trace one mask per
colour and stack them in that order. Contours come from marching squares (which
yields every closed loop, holes included) and are simplified with
Douglas-Peucker; holes work because the paths use fill-rule evenodd.

The palette is detected rather than hardcoded, so the same code handles 자비
(orange body / red briefs) and every 자음 companion (its own two colours).
"""

import numpy as np
from PIL import Image

SIMPLIFY_EPS = 1.1  # px, in source resolution
MIN_LOOP_AREA = 12.0  # drop speckles left by anti-aliasing

# Marching squares: corner bits TL=1 TR=2 BR=4 BL=8 -> list of (from, to) edges.
SEGMENTS = {
    1: [("L", "T")], 2: [("T", "R")], 3: [("L", "R")], 4: [("R", "B")],
    5: [("L", "T"), ("R", "B")], 6: [("T", "B")], 7: [("L", "B")],
    8: [("B", "L")], 9: [("B", "T")], 10: [("T", "R"), ("B", "L")],
    11: [("B", "R")], 12: [("R", "L")], 13: [("R", "T")], 14: [("T", "L")],
}


def _edge_point(kind, i, j):
    return {
        "T": (i, j + 0.5),
        "R": (i + 0.5, j + 1),
        "B": (i + 1, j + 0.5),
        "L": (i + 0.5, j),
    }[kind]


def trace(mask):
    """Every closed contour of a boolean mask, as lists of (x, y)."""
    m = np.pad(mask, 1).astype(np.uint8)
    code = (m[:-1, :-1] + 2 * m[:-1, 1:] + 4 * m[1:, 1:] + 8 * m[1:, :-1]).astype(int)

    links = {}
    for i, j in zip(*np.nonzero((code > 0) & (code < 15))):
        for a, b in SEGMENTS[code[i, j]]:
            links.setdefault(_edge_point(a, i, j), []).append(_edge_point(b, i, j))

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


def _area(pts):
    x = np.array([p[0] for p in pts])
    y = np.array([p[1] for p in pts])
    return abs(np.dot(x, np.roll(y, -1)) - np.dot(y, np.roll(x, -1))) / 2


def _simplify(pts, eps):
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
        n = float(np.hypot(seg[0], seg[1]))
        rel = p[lo + 1 : hi] - p[lo]
        if n > 1e-9:
            d = np.abs(seg[0] * rel[:, 1] - seg[1] * rel[:, 0]) / n
        else:
            d = np.hypot(rel[:, 0], rel[:, 1])
        k = int(np.argmax(d))
        if d[k] > eps:
            k += lo + 1
            keep[k] = True
            stack += [(lo, k), (k, hi)]
    return [pts[i] for i in np.nonzero(keep)[0]]


def to_path(loops, scale, ox, oy):
    out = []
    for loop in loops:
        if _area(loop) < MIN_LOOP_AREA:
            continue
        pts = _simplify(loop, SIMPLIFY_EPS)
        if len(pts) < 3:
            continue
        out.append(
            " ".join(
                f"{'M' if k == 0 else 'L'}{(x - ox) * scale:.1f} {(y - oy) * scale:.1f}"
                for k, (x, y) in enumerate(pts)
            )
            + "Z"
        )
    return "".join(out)


def _hex(rgb):
    return "#%02X%02X%02X" % tuple(int(round(v)) for v in rgb)


def mix(a, b, t):
    """Blend hex colour a toward b by t (0 = a, 1 = b)."""
    ca = [int(a[i : i + 2], 16) for i in (1, 3, 5)]
    cb = [int(b[i : i + 2], 16) for i in (1, 3, 5)]
    return _hex([x + (y - x) * t for x, y in zip(ca, cb)])


def read_artwork(src):
    """Load a character PNG and split it into outline / body / accent masks.

    Colours are detected, not assumed: the darkest cluster is the outline, then
    the two largest remaining clusters are the body and its accent (the briefs).
    """
    im = Image.open(src).convert("RGBA")
    a = np.array(im)
    rgb = a[..., :3].astype(int)
    solid = a[..., 3] > 128

    # Cluster on a coarse grid so anti-aliased edges collapse into their parents.
    q = (rgb // 24 * 24)[solid]
    keys, counts = np.unique(q.reshape(-1, 3), axis=0, return_counts=True)
    big = [(tuple(k), int(c)) for k, c in zip(keys, counts) if c > solid.sum() * 0.02]
    big.sort(key=lambda kc: -kc[1])

    lum = lambda c: 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]
    outline_key = min(big, key=lambda kc: lum(kc[0]))[0]
    rest = [kc for kc in big if kc[0] != outline_key]
    body_key = rest[0][0] if rest else outline_key
    accent_key = next(
        (k for k, _ in rest[1:] if sum(abs(x - y) for x, y in zip(k, body_key)) > 60),
        None,
    )

    def near(key, tol=46):
        d = np.abs(rgb - np.array(key)).sum(axis=2)
        return solid & (d < tol)

    body = near(body_key)
    accent = near(accent_key) & ~body if accent_key else np.zeros_like(solid)

    # Exact colours: average the real pixels rather than the quantised key.
    def avg(mask, fallback):
        return _hex(rgb[mask].mean(axis=0)) if mask.any() else fallback

    return {
        "solid": solid,
        "body": body,
        "accent": accent,
        "outline_color": avg(near(outline_key), "#141428"),
        "body_color": avg(body, "#FF8E24"),
        "accent_color": avg(accent, "#F8252E") if accent.any() else None,
        "size": im.size,
        "image": im,
    }


def build_layers(art, width=1000):
    """Traced path data plus the viewBox, normalised to `width` units wide."""
    ys, xs = np.nonzero(art["solid"])
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    cw, ch = x1 - x0 + 1, y1 - y0 + 1
    scale = width / cw

    return {
        "viewbox": (width, round(width * ch / cw)),
        "crop": (int(x0), int(y0), int(x1) + 1, int(y1) + 1),
        "outline": to_path(trace(art["solid"]), scale, x0, y0),
        "body": to_path(trace(art["body"]), scale, x0, y0),
        "accent": to_path(trace(art["accent"]), scale, x0, y0) if art["accent"].any() else "",
    }


def svg(layers, colors, label, extra_attrs=""):
    """Assemble an SVG from traced layers and a {role: colour} mapping."""
    vb_w, vb_h = layers["viewbox"]
    paths = []
    for role in ("outline", "body", "accent"):
        d = layers[role]
        if d and colors.get(role):
            paths.append(f'  <path fill="{colors[role]}" fill-rule="evenodd" d="{d}"/>')
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w} {vb_h}" '
        f'role="img" aria-label="{label}"{extra_attrs}>\n' + "\n".join(paths) + "\n</svg>\n"
    )
