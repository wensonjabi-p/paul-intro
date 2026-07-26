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


def knock_out_bg(a, white_thresh=245, black_thresh=25):
    """Treat near-white OR near-black corner-connected pixels as transparent.

    Canva mascot exports are often on solid black; some AI PNGs use white.
    """
    h, w = a.shape[:2]
    rgb = a[..., :3].astype(int)
    near_white = (rgb.min(axis=2) >= white_thresh) & (a[..., 3] > 128)
    near_black = (rgb.max(axis=2) <= black_thresh) & (a[..., 3] > 128)
    bg = near_white | near_black
    if not bg.any():
        return a
    from collections import deque
    vis = np.zeros((h, w), dtype=bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if bg[y, x] and not vis[y, x]:
                vis[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if bg[y, x] and not vis[y, x]:
                vis[y, x] = True
                q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and bg[ny, nx] and not vis[ny, nx]:
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
    # Adaptive kernel: ~0.6% of long side, odd, clamped
    denoise_px = max(3, min(9, int(round(max(a.shape[:2]) * 0.006)) | 1))
    return a, denoise_px


def trace_character(src, min_cluster_frac=0.006, merge_dist=35):
    a, denoise_px = load_for_trace(src)
    rgb = a[..., :3].astype(int)
    solid = a[..., 3] > 128
    solid = denoise(solid, denoise_px)

    # Drop leftover bg speckles
    lum = 0.299 * rgb[..., 0] + 0.587 * rgb[..., 1] + 0.114 * rgb[..., 2]
    solid &= ~(((lum >= 245) | (lum <= 25)) & (a[..., 3] > 128))
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
    outline_key = min(cluster_keys, key=lum_fn)

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
    layers = [(avg_hex(outline_only), denoise(solid, denoise_px))]
    claimed = outline_only
    for i, key in enumerate(cluster_keys):
        if i == outline_idx:
            continue
        m = denoise(solid & (nearest == i) & ~claimed, denoise_px)
        m = keep_large_components(m, max(30, min_comp // 2))
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
