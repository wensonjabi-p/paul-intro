"""Production tracer for the item-equip character stages (any number of fill
colours). Extends trace_character.py's 2-colour pipeline with:

  - generic colour-cluster detection (works for baby/briefs/boots/weapon/
    shield/crown, whatever combination is actually present in one stage image)
  - a morphological open-then-close denoise pass per colour mask, since Canva's
    "flat vector" output still has soft per-pixel dither that a naive
    colour-distance clustering turns into speckle holes (seen in the first
    multicolor demo trace)
  - high-res downscale + connected-component cleanup so soft AI edges don't
    inflate SVG path data 5–10× (giyeok-3 was ~45KB of outline noise)
  - black-bg knock-out that PRESERVES the black outline (dilate fills, then
    flood only unprotected near-black) so navy boots stay a separate layer
    instead of becoming the silhouette colour (regression on giyeok-5)

Run:  python scripts/trace-character-multi.py <source.png> <out.svg>
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

from trace_character import to_path, trace

# Trace at this max edge length — icons don't need 2k source resolution, and
# high-res anti-alias rings become thousands of tiny SVG islands.
MAX_TRACE_SIDE = 720
MIN_COMPONENT_FRAC = 0.0008  # drop speckles < this fraction of silhouette


def denoise(mask, px):
    """Binary open then close: drops speckle, then fills pinholes."""
    if px < 3:
        px = 3
    if px % 2 == 0:
        px += 1
    im = Image.fromarray((mask * 255).astype(np.uint8))
    im = im.filter(ImageFilter.MinFilter(px)).filter(ImageFilter.MaxFilter(px))
    im = im.filter(ImageFilter.MaxFilter(px)).filter(ImageFilter.MinFilter(px))
    return np.array(im) > 128


def keep_large_components(mask, min_pixels):
    """Keep only connected components with enough pixels (4-connected)."""
    h, w = mask.shape
    visited = np.zeros_like(mask, dtype=bool)
    out = np.zeros_like(mask, dtype=bool)
    for y in range(h):
        for x in range(w):
            if not mask[y, x] or visited[y, x]:
                continue
            stack = [(y, x)]
            visited[y, x] = True
            comp = []
            while stack:
                cy, cx = stack.pop()
                comp.append((cy, cx))
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not visited[ny, nx]:
                        visited[ny, nx] = True
                        stack.append((ny, nx))
            if len(comp) >= min_pixels:
                for cy, cx in comp:
                    out[cy, cx] = True
    return out


def keep_largest_n(mask, n, min_pixels):
    """Keep the n largest connected components (each at least min_pixels)."""
    h, w = mask.shape
    visited = np.zeros_like(mask, dtype=bool)
    comps = []
    for y in range(h):
        for x in range(w):
            if not mask[y, x] or visited[y, x]:
                continue
            stack = [(y, x)]
            visited[y, x] = True
            comp = []
            while stack:
                cy, cx = stack.pop()
                comp.append((cy, cx))
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not visited[ny, nx]:
                        visited[ny, nx] = True
                        stack.append((ny, nx))
            if len(comp) >= min_pixels:
                comps.append(comp)
    comps.sort(key=len, reverse=True)
    out = np.zeros_like(mask, dtype=bool)
    for comp in comps[:n]:
        for cy, cx in comp:
            out[cy, cx] = True
    return out


def knock_out_bg(a, white_thresh=245, black_thresh=25, outline_pad=None):
    """Knock out solid white/black BACKGROUND without eating the black outline.

    Canva mascot exports are often on solid black; some AI PNGs use white.
    A naive edge-flood through near-black also erases the character outline
    (it is the same near-black and is connected to the canvas). That left navy
    boots as the darkest cluster, so the silhouette path painted in navy and
    boots merged into the outline (seen on giyeok-5).

    Fix: dilate non-black/non-white fills, protect near-black inside that halo
    (outline + AA), and only flood-remove near-black/white outside it.
    """
    h, w = a.shape[:2]
    rgb = a[..., :3].astype(int)
    opaque = a[..., 3] > 128
    near_white = (rgb.min(axis=2) >= white_thresh) & opaque
    near_black = (rgb.max(axis=2) <= black_thresh) & opaque
    if not (near_white.any() or near_black.any()):
        return a

    # Fills: green body, red briefs, navy boots, gold rim, brown staff, …
    colored = opaque & ~near_white & ~near_black
    if outline_pad is None:
        # ~3.5% of long side covers thick Canva outlines after downscale.
        outline_pad = max(7, min(41, int(round(max(h, w) * 0.035)) | 1))
    if outline_pad % 2 == 0:
        outline_pad += 1

    protect = np.zeros((h, w), dtype=bool)
    if colored.any():
        protect = (
            np.array(
                Image.fromarray((colored.astype(np.uint8) * 255)).filter(
                    ImageFilter.MaxFilter(outline_pad)
                )
            )
            > 128
        )

    from collections import deque

    edge_bg = near_white | near_black
    vis = np.zeros((h, w), dtype=bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if edge_bg[y, x] and not vis[y, x]:
                vis[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if edge_bg[y, x] and not vis[y, x]:
                vis[y, x] = True
                q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if not (0 <= ny < h and 0 <= nx < w) or vis[ny, nx]:
                continue
            # Stop at fill-adjacent near-black (true outline).
            if (near_white[ny, nx] or near_black[ny, nx]) and not protect[ny, nx]:
                vis[ny, nx] = True
                q.append((ny, nx))
    out = a.copy()
    out[vis, 3] = 0
    return out


def load_for_trace(src):
    """Load PNG, knock out bg, optionally downscale for stable tracing."""
    im = Image.open(src).convert("RGBA")
    a = knock_out_bg(np.array(im))
    im = Image.fromarray(a)
    w, h = im.size
    long_side = max(w, h)
    if long_side > MAX_TRACE_SIDE:
        scale = MAX_TRACE_SIDE / long_side
        im = im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.Resampling.LANCZOS)
        a = knock_out_bg(np.array(im.convert("RGBA")))
    # Lighter denoise than before (0.4% / max 5) — heavy open-close blurred
    # the black outline into a soft silhouette, especially on stage 5.
    denoise_px = max(3, min(5, int(round(max(a.shape[:2]) * 0.004)) | 1))
    return a, denoise_px


def trace_character(src, min_cluster_frac=0.006, merge_dist=35):
    a, denoise_px = load_for_trace(src)
    rgb = a[..., :3].astype(int)
    solid = a[..., 3] > 128
    solid = denoise(solid, denoise_px)

    # Drop leftover near-white speckles only. Do NOT drop lum<=25 — that is
    # the black outline we just preserved in knock_out_bg (dropping it made
    # navy boots become the darkest cluster / silhouette colour).
    lum = 0.299 * rgb[..., 0] + 0.587 * rgb[..., 1] + 0.114 * rgb[..., 2]
    solid &= ~((lum >= 245) & (a[..., 3] > 128))
    solid = denoise(solid, denoise_px)
    min_comp = max(40, int(solid.sum() * MIN_COMPONENT_FRAC))
    solid = keep_large_components(solid, min_comp)

    q = (rgb // 20 * 20)[solid]
    keys, counts = np.unique(q.reshape(-1, 3), axis=0, return_counts=True)
    raw = [(tuple(k), int(c)) for k, c in zip(keys, counts) if c > solid.sum() * min_cluster_frac]
    raw.sort(key=lambda kc: -kc[1])

    # Canva's "flat" fills still carry faint per-pixel shading, which the
    # colour-distance clustering above would otherwise see as a second colour
    # and trace as a spurious contour line inside the shape. Merge any cluster
    # that lands close to an already-accepted one instead of keeping it separate.
    cluster_keys = []
    for key, _ in raw:
        dists = [sum(abs(x - y) for x, y in zip(key, ck)) for ck in cluster_keys]
        if dists and min(dists) < merge_dist:
            continue
        cluster_keys.append(key)

    if not cluster_keys:
        raise SystemExit(f"no colour clusters found in {src}")

    lum_fn = lambda c: 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]

    def is_navy_boot(c):
        """Dark blue-ish fill (boots), not pure outline charcoal."""
        r, g, b = c
        L = lum_fn(c)
        return L > 20 and L < 55 and b >= r + 10 and b > 30

    # Absorb near-black AA / dither clusters into the outline key so we don't
    # paint a second soft charcoal layer on top of the silhouette (looks blurry).
    # Keep distinct navy boots.
    outline_key = min(cluster_keys, key=lum_fn)
    cluster_keys = [
        k
        for k in cluster_keys
        if k == outline_key or lum_fn(k) >= 28 or is_navy_boot(k)
    ]
    if outline_key not in cluster_keys:
        cluster_keys.insert(0, outline_key)

    # Assign every solid pixel to its NEAREST surviving cluster (not a fixed
    # radius) so merged/dropped near-duplicate shades don't leave gaps.
    centers = np.array(cluster_keys)
    diff = rgb[:, :, None, :] - centers[None, None, :, :]
    nearest = np.argmin(np.abs(diff).sum(axis=3), axis=2)

    def avg_hex(mask):
        m = rgb[mask].mean(axis=0)
        return "#%02X%02X%02X" % tuple(int(round(v)) for v in m)

    # Paint order: outline first, then every other cluster largest-first, so
    # small shapes (crown, weapon head) sit on what they overlap. The outline
    # PATH is the whole silhouette (so no white cracks show between disjoint
    # fill regions), but its COLOR must come from the outline-only pixels —
    # averaging over the whole silhouette would dilute it toward the fill colour.
    outline_idx = cluster_keys.index(outline_key)
    outline_only = solid & (nearest == outline_idx)
    outline_hex = avg_hex(outline_only)
    # Safety: if the darkest cluster is navy/charcoal boots (blue-ish, not
    # near-black), paint the silhouette in fixed charcoal so boots can still
    # appear as their own layer colour instead of washing the whole outline.
    or_, og, ob = (int(outline_hex[i : i + 2], 16) for i in (1, 3, 5))
    if lum_fn((or_, og, ob)) > 18 and ob >= or_ + 5:
        outline_hex = "#0A1218"
    layers = [(outline_hex, denoise(solid, denoise_px))]
    claimed = outline_only
    for i, key in enumerate(cluster_keys):
        if i == outline_idx:
            continue
        m = solid & (nearest == i) & ~claimed
        # Navy boots: keep only blue-ish mid-dark pixels so outline AA doesn't
        # dilute the boot fill toward near-black (looks merged on black BG).
        if is_navy_boot(key):
            pr, pg, pb = rgb[..., 0], rgb[..., 1], rgb[..., 2]
            pl = 0.299 * pr + 0.587 * pg + 0.114 * pb
            m &= (pb >= pr + 8) & (pb > 28) & (pl > 22) & (pl < 58)
        m = denoise(m, denoise_px)
        m = keep_large_components(m, max(30, min_comp // 2))
        # Boots sit on the feet — drop navy-tinted outline AA islands higher up,
        # then keep only the two largest foot blobs.
        if is_navy_boot(key) and m.any() and solid.any():
            sy = np.nonzero(solid)[0]
            y_cut = sy.min() + 0.62 * (sy.max() - sy.min())
            m = m & (np.arange(m.shape[0])[:, None] >= y_cut)
            m = keep_largest_n(m, 2, max(40, min_comp // 2))
        if m.sum() < 80:
            continue
        layers.append((avg_hex(m), m))
        claimed |= m

    ys, xs = np.nonzero(solid)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    scale = 1000 / (x1 - x0 + 1)
    vb_h = round(1000 * (y1 - y0 + 1) / (x1 - x0 + 1))

    paths = []
    for color, mask in layers:
        d = to_path(trace(mask), scale, x0, y0)
        if d:
            paths.append((color, d))
    return vb_h, paths


def main():
    src, out = sys.argv[1], sys.argv[2]
    vb_h, paths = trace_character(src)
    body = "\n".join(f'  <path fill="{c}" fill-rule="evenodd" d="{d}"/>' for c, d in paths)
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {vb_h}" role="img">\n{body}\n</svg>\n'
    Path(out).write_text(svg, encoding="utf-8")
    print(f"{len(paths)} layers -> {out} ({Path(out).stat().st_size:,} bytes)")
    for c, d in paths:
        print(f"  {c}  {len(d):>7,} path chars")


if __name__ == "__main__":
    main()
