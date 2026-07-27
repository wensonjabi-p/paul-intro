"""One-off: trace a character with MORE than 2 fill colours (body + accent +
weapon/shield + crown), proving the tracer generalizes beyond jabi.'s 2-colour
briefs. Not wired into the main pipeline yet -- final item-colour rules land
once Paul locks the equip system (see hub/assets/characters/README-ko.md).

Run: python scripts/trace-multicolor-demo.py <source.png> <out.svg>
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image

from trace_character import to_path, trace


def main():
    src, out = sys.argv[1], sys.argv[2]
    im = Image.open(src).convert("RGBA")
    a = np.array(im)
    rgb = a[..., :3].astype(int)
    solid = a[..., 3] > 128

    # Coarse-cluster every solid pixel, keep clusters that matter.
    q = (rgb // 20 * 20)[solid]
    keys, counts = np.unique(q.reshape(-1, 3), axis=0, return_counts=True)
    clusters = [(tuple(k), int(c)) for k, c in zip(keys, counts) if c > solid.sum() * 0.008]
    clusters.sort(key=lambda kc: -kc[1])

    lum = lambda c: 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]
    outline_key = min(clusters, key=lambda kc: lum(kc[0]))[0]

    def near(key, tol=40):
        return solid & (np.abs(rgb - np.array(key)).sum(axis=2) < tol)

    ys, xs = np.nonzero(solid)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    scale = 1000 / (x1 - x0 + 1)

    def avg_hex(mask):
        m = rgb[mask].mean(axis=0)
        return "#%02X%02X%02X" % tuple(int(round(v)) for v in m)

    # Paint order: outline first (base), then every other cluster largest-first,
    # so smaller shapes (crown, weapon head) land on top of what they overlap.
    layers = [(outline_key, solid)]
    claimed = near(outline_key)
    for key, _ in clusters:
        if key == outline_key:
            continue
        m = near(key) & ~claimed
        if m.sum() < 80:
            continue
        layers.append((key, m))
        claimed |= m

    paths = []
    for key, mask in layers:
        d = to_path(trace(mask), scale, x0, y0)
        if d:
            paths.append(f'  <path fill="{avg_hex(mask)}" fill-rule="evenodd" d="{d}"/>')

    vb_h = round(1000 * (y1 - y0 + 1) / (x1 - x0 + 1))
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {vb_h}" role="img">\n'
        + "\n".join(paths)
        + "\n</svg>\n"
    )
    Path(out).write_text(svg, encoding="utf-8")
    print(f"{len(layers)} colour layers -> {out} ({Path(out).stat().st_size:,} bytes)")
    for key, mask in layers:
        print(f"  {avg_hex(mask)}  {mask.sum():>7,} px")


if __name__ == "__main__":
    main()
