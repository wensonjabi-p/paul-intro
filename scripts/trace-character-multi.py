"""Production tracer for the item-equip character stages (any number of fill
colours). Extends trace_character.py's 2-colour pipeline with:

  - generic colour-cluster detection (works for baby/briefs/boots/weapon/
    shield/crown, whatever combination is actually present in one stage image)
  - a morphological open-then-close denoise pass per colour mask, since Canva's
    "flat vector" output still has soft per-pixel dither that a naive
    colour-distance clustering turns into speckle holes (seen in the first
    multicolor demo trace)

Run:  python scripts/trace-character-multi.py <source.png> <out.svg>
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

from trace_character import to_path, trace

DENOISE_PX = 3  # odd kernel size for the open/close pass


def denoise(mask):
    """Binary open then close: drops speckle, then fills pinholes."""
    im = Image.fromarray((mask * 255).astype(np.uint8))
    im = im.filter(ImageFilter.MinFilter(DENOISE_PX)).filter(ImageFilter.MaxFilter(DENOISE_PX))
    im = im.filter(ImageFilter.MaxFilter(DENOISE_PX)).filter(ImageFilter.MinFilter(DENOISE_PX))
    return np.array(im) > 128


def trace_character(src, min_cluster_frac=0.006, merge_dist=110):
    im = Image.open(src).convert("RGBA")
    a = np.array(im)
    rgb = a[..., :3].astype(int)
    solid = a[..., 3] > 128
    solid = denoise(solid)  # clean the silhouette itself first

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

    lum = lambda c: 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]
    outline_key = min(cluster_keys, key=lum)

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
    layers = [(avg_hex(outline_only), denoise(solid))]
    claimed = outline_only
    for i, key in enumerate(cluster_keys):
        if i == outline_idx:
            continue
        m = denoise(solid & (nearest == i) & ~claimed)
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
    vb_h, paths = trace_character(src, )
    body = "\n".join(f'  <path fill="{c}" fill-rule="evenodd" d="{d}"/>' for c, d in paths)
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {vb_h}" role="img">\n{body}\n</svg>\n'
    Path(out).write_text(svg, encoding="utf-8")
    print(f"{len(paths)} layers -> {out} ({Path(out).stat().st_size:,} bytes)")
    for c, d in paths:
        print(f"  {c}  {len(d):>7,} path chars")


if __name__ == "__main__":
    main()
