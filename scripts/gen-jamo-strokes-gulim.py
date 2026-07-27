#!/usr/bin/env python3
"""Regenerate Hangul jamo Hanzi Writer JSON — continuous pedagogical tubes.

Stroke order from Naver blog dustlf0415/221302879389 (see
docs/research-hangul-stroke-order-blog-ko.md). Each stroke = ONE shapely
round-buffered tube. Rings (ㅇ/ㅎ) = annuli; ㅇ median starts at TOP.

Paul (2026-07-26 night): remove CSS Gulim overlay mismatch — JSON is the
single visual system for Replay/Trace.

2026-07-27: smoother tube joints (BUFFER_RES + light simplify) — medians /
stroke order unchanged.

Usage:
  python scripts/gen-jamo-strokes-gulim.py
"""

from __future__ import annotations

import json
import math
from pathlib import Path

from shapely.geometry import LineString, Point

ROOT = Path(__file__).resolve().parents[1]
OUT_13 = ROOT / "hub/app/assets/chars/strokes/jamo-strokes-13.json"
OUT_TENSE = ROOT / "hub/app/assets/chars/strokes/jamo-strokes-tense.json"
GULIM_REF = ROOT / "hub/app/assets/chars/strokes/gulim-glyph-ref.json"
PREVIEW = ROOT / "hub/app/assets/chars/strokes/_preview-gulim-strokes.png"
NGULIM = Path(r"C:\Windows\Fonts\NGULIM.TTF")

HALF_W = 38.0  # gothic stem ≈ Gulim jamo; slight overlap at multi-stroke joints
# Quarter-circle segments at caps/joins — 12 looked faceted; 18 reads as a soft tube.
BUFFER_RES = 18
# Drop nearly-collinear exterior verts so round joints stay smooth without jagged L-chains.
SIMPLIFY_TOL = 0.55


def densify_median(median, step=24.0):
    """Even spacing along segments (smooth HW reveal). No backtracking."""
    if len(median) < 2:
        return [[float(p[0]), float(p[1])] for p in median]
    out = [[float(median[0][0]), float(median[0][1])]]
    for i in range(len(median) - 1):
        x0, y0 = float(median[i][0]), float(median[i][1])
        x1, y1 = float(median[i + 1][0]), float(median[i + 1][1])
        dx, dy = x1 - x0, y1 - y0
        L = math.hypot(dx, dy)
        if L < 1e-6:
            continue
        n = max(1, int(round(L / step)))
        for k in range(1, n + 1):
            t = k / n
            out.append([x0 + dx * t, y0 + dy * t])
    # dedupe
    clean = [out[0]]
    for p in out[1:]:
        if math.hypot(p[0] - clean[-1][0], p[1] - clean[-1][1]) > 0.5:
            clean.append(p)
    return [[round(p[0], 2), round(p[1], 2)] for p in clean]


def poly_to_path(coords):
    if not coords:
        return ""
    # shapely rings repeat first point at end
    pts = list(coords)
    if len(pts) > 1 and pts[0] == pts[-1]:
        pts = pts[:-1]
    parts = [f"M {pts[0][0]:.2f} {pts[0][1]:.2f}"]
    for x, y in pts[1:]:
        parts.append(f"L {x:.2f} {y:.2f}")
    parts.append("Z")
    return " ".join(parts)


def buffer_median(median, half_w=HALF_W):
    """Single continuous outline (round caps + round joins, smooth exterior)."""
    pts = [(float(p[0]), float(p[1])) for p in median]
    # drop dupes
    clean = [pts[0]]
    for p in pts[1:]:
        if math.hypot(p[0] - clean[-1][0], p[1] - clean[-1][1]) > 0.5:
            clean.append(p)
    if len(clean) == 1:
        geom = Point(clean[0]).buffer(half_w, resolution=BUFFER_RES)
    else:
        geom = LineString(clean).buffer(
            half_w,
            cap_style="round",
            join_style="round",
            resolution=BUFFER_RES,
        )
    if geom.is_empty:
        raise ValueError(f"empty buffer for {median}")
    # MultiPolygon unlikely; take largest
    if geom.geom_type == "MultiPolygon":
        geom = max(geom.geoms, key=lambda g: g.area)
    # Soften tube joints: simplify removes stair-step verts on round fillets
    # without changing stroke order / median pedagogy.
    try:
        soft = geom.simplify(SIMPLIFY_TOL, preserve_topology=True)
        if not soft.is_empty and soft.geom_type == "Polygon" and soft.area > geom.area * 0.92:
            geom = soft
    except Exception:
        pass
    return poly_to_path(list(geom.exterior.coords))


def ring_path(cx, cy, r_outer, r_inner, n=64):
    outer = [
        (cx + r_outer * math.cos(2 * math.pi * i / n), cy + r_outer * math.sin(2 * math.pi * i / n))
        for i in range(n)
    ]
    inner = [
        (
            cx + r_inner * math.cos(2 * math.pi * (n - i) / n),
            cy + r_inner * math.sin(2 * math.pi * (n - i) / n),
        )
        for i in range(n)
    ]
    return poly_to_path(outer) + " " + poly_to_path(inner)


def ring_median(cx, cy, r, n=32):
    """Circle median: start at TOP, go clockwise (Y-up). Paul: ㅇ start was weird at 3-o'clock."""
    out = []
    for i in range(n + 1):
        ang = math.pi / 2 - 2 * math.pi * i / n
        out.append([round(cx + r * math.cos(ang), 2), round(cy + r * math.sin(ang), 2)])
    return out


def make_char(medians, half_w=HALF_W):
    strokes = []
    dens = []
    for m in medians:
        strokes.append(buffer_median(m, half_w=half_w))
        dens.append(densify_median(m))
    return {"strokes": strokes, "medians": dens}


# Pedagogical medians (Y-up 1024). Order = blog mnemonics (research-hangul-stroke-order-blog-ko.md).
# Joints extend slightly so adjacent round tubes overlap (no white seam).
MED_13 = {
    "giyeok": [[[220, 750], [720, 750], [720, 150]]],
    "nieun": [[[220, 750], [220, 150], [720, 150]]],
    "digeut": [
        [[220, 750], [720, 750]],  # 긋고
        [[220, 720], [220, 150], [720, 150]],  # 니은
    ],
    # ㄹ: [기역, 긋고, 니은] — not Z/staircase
    "rieul": [
        [[220, 750], [720, 750], [720, 470]],
        [[200, 470], [740, 470]],
        [[220, 490], [220, 150], [720, 150]],
    ],
    # ㅁ: [내리고, 기역, 닫고]
    "mieum": [
        [[220, 750], [220, 150]],
        [[200, 750], [720, 750], [720, 150]],
        [[200, 150], [740, 150]],
    ],
    # ㅂ: [내리고, 내리고, 닫고, 닫고] + 위→아래 → middle then bottom
    "bieup": [
        [[220, 750], [220, 150]],
        [[720, 750], [720, 150]],
        [[220, 450], [720, 450]],
        [[220, 150], [720, 150]],
    ],
    "siot": [
        [[470, 750], [220, 150]],
        [[470, 650], [720, 150]],
    ],
    # ㅋ: [기역, 닫기] — bar crosses the vertical stem
    "kieuk": [
        [[220, 750], [720, 750], [720, 150]],
        [[400, 450], [720, 450]],
    ],
    # ㅌ: [긋고, 긋고, 니은] — not ㄷ+middle
    "tieut": [
        [[220, 750], [720, 750]],
        [[220, 500], [720, 500]],
        [[220, 520], [220, 150], [720, 150]],
    ],
    # ㅍ: [긋고, 내리고, 내리고, 닫고] — bottom bar sits above the leg
    # bottoms (feet poke out below it) so it reads as two bars + two legs,
    # not a sealed box/cup. Paul (2026-07-27): shape was unclear.
    "pieup": [
        [[220, 750], [720, 750]],
        [[280, 750], [280, 130]],
        [[660, 750], [660, 130]],
        [[280, 210], [660, 210]],
    ],
    # ㅊ: [모자쓰고, 기역에 꼬리] = hat + ㅈ (가로 + 두 빗침)
    "chieut": [
        [[400, 780], [540, 780]],
        [[260, 640], [680, 640]],
        [[470, 640], [220, 150]],
        [[470, 640], [720, 150]],
    ],
    # ㅈ: [가로, 왼빗침, 오른빗침] — chieut의 모자 뺀 나머지와 동일 모양
    # (2026-07-27: Paul QA — 획순 로스터에 ㅈ 실제 데이터로 추가, ji 스텁 폐기.
    # 캐릭터 파트너 선택에서는 여전히 제외 — 그건 hangul.js ROSTER_13이 별개로 담당.)
    "jieut": [
        [[260, 640], [680, 640]],
        [[470, 640], [220, 150]],
        [[470, 640], [720, 150]],
    ],
}


def build_13():
    data = {}
    for key, meds in MED_13.items():
        if key == "chieut":
            strokes, dens = [], []
            for i, m in enumerate(meds):
                w = 26.0 if i == 0 else HALF_W
                strokes.append(buffer_median(m, half_w=w))
                dens.append(densify_median(m))
            data[key] = {"strokes": strokes, "medians": dens}
        else:
            data[key] = make_char(meds)

    data["ieung"] = {
        "strokes": [ring_path(470, 450, 300, 238)],
        "medians": [ring_median(470, 450, 270)],
    }

    # Hat (tip+bar) enlarged relative to the ring — Paul (2026-07-27): hat
    # read as a tiny accent floating over an oversized ball. Ring shrunk
    # slightly, hat strokes thickened/lengthened so the two halves balance.
    tip = make_char([[[452, 800], [488, 700]]], half_w=32.0)
    bar = make_char([[[350, 645], [590, 645]]], half_w=32.0)
    data["hieut"] = {
        "strokes": tip["strokes"] + bar["strokes"] + [ring_path(470, 330, 185, 138)],
        "medians": tip["medians"] + bar["medians"] + [ring_median(470, 330, 162)],
    }

    return data


def build_tense():
    # Doubled letters previously reused the FULL single-letter height (750->150,
    # 600 units) for each thin half, which read as two tall spindly flagpoles
    # side by side. Paul (2026-07-27): "세로로 너무 길어". Compact the vertical
    # run (750->300, 450 units) and thicken strokes so the pair reads as one
    # squarish doubled glyph instead of an elongated picket fence.
    return {
        "ssanggiyeok": make_char(
            [
                [[210, 750], [410, 750], [410, 300]],
                [[470, 750], [670, 750], [670, 300]],
            ],
            half_w=34.0,
        ),
        "ssangdigeut": make_char(
            [
                [[210, 750], [410, 750]],
                [[210, 700], [210, 300], [410, 300]],
                [[470, 750], [670, 750]],
                [[470, 700], [470, 300], [670, 300]],
            ],
            half_w=32.0,
        ),
        "ssangbieup": make_char(
            [
                [[190, 750], [190, 300]],
                [[350, 750], [350, 300]],
                [[190, 525], [350, 525]],  # middle before bottom
                [[190, 300], [350, 300]],
                [[510, 750], [510, 300]],
                [[670, 750], [670, 300]],
                [[510, 525], [670, 525]],
                [[510, 300], [670, 300]],
            ],
            half_w=30.0,
        ),
        "ssangsiot": make_char(
            [
                [[290, 750], [190, 300]],
                [[290, 665], [390, 300]],
                [[590, 750], [490, 300]],
                [[590, 665], [690, 300]],
            ],
            half_w=34.0,
        ),
    }


def assert_ok(data, label):
    bad = []
    for k, v in data.items():
        if k == "ji":
            continue
        for i, s in enumerate(v["strokes"]):
            m_count = s.count("M ")
            if m_count > 1:
                if k == "ieung" or (k == "hieut" and i == 2):
                    continue
                bad.append(f"{label}.{k}[{i}] has {m_count} subpaths")
            if "Z M" in s and not (k == "ieung" or (k == "hieut" and i == 2)):
                bad.append(f"{label}.{k}[{i}] Z M break")
    return bad


def dump_gulim_ref():
    if not NGULIM.exists():
        return None
    try:
        from fontTools.ttLib import TTFont
        from fontTools.pens.boundsPen import BoundsPen
        from fontTools.pens.recordingPen import RecordingPen
    except ImportError:
        return None

    font = TTFont(str(NGULIM))
    cmap = {}
    for t in font["cmap"].tables:
        cmap.update(t.cmap)
    gs = font.getGlyphSet()
    upem = font["head"].unitsPerEm
    ref = {"font": "New Gulim", "upem": upem, "glyphs": {}}
    for ch in "ㄱㄴㄷㄹㅁㅂㅅㅇㅊㅋㅌㅍㅎ":
        gname = cmap.get(ord(ch))
        if not gname:
            continue
        bp = BoundsPen(gs)
        gs[gname].draw(bp)
        x0, y0, x1, y1 = bp.bounds
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        scale = 640.0 / max(x1 - x0, y1 - y0)

        def map_pt(x, y):
            return (512 + (x - cx) * scale, 450 + (y - cy) * scale)

        rec = RecordingPen()
        gs[gname].draw(rec)
        parts = []
        for op, args in rec.value:
            if op == "moveTo":
                x, y = map_pt(*args[0])
                parts.append(f"M {x:.2f} {y:.2f}")
            elif op == "lineTo":
                x, y = map_pt(*args[0])
                parts.append(f"L {x:.2f} {y:.2f}")
            elif op == "qCurveTo":
                for a in args:
                    if a is None:
                        continue
                    x, y = map_pt(*a)
                    parts.append(f"L {x:.2f} {y:.2f}")
            elif op == "curveTo":
                nums = []
                for a in args:
                    x, y = map_pt(*a)
                    nums.extend([f"{x:.2f}", f"{y:.2f}"])
                parts.append("C " + " ".join(nums))
            elif op == "closePath":
                parts.append("Z")
        ref["glyphs"][ch] = {"path": " ".join(parts), "bounds": list(bp.bounds)}
    GULIM_REF.write_text(json.dumps(ref, ensure_ascii=False, indent=2), encoding="utf-8")
    return ref


def render_preview(data_13):
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        return
    import re

    W, H = 960, 360
    img = Image.new("RGB", (W, H), (255, 255, 255))
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype(str(NGULIM), 100)
    except OSError:
        font = ImageFont.load_default()

    def draw_path(path, ox, oy, scale, fill):
        for sub in path.split("Z"):
            sub = sub.strip()
            if not sub:
                continue
            nums = [float(n) for n in re.findall(r"[-+]?\d*\.?\d+", sub)]
            if len(nums) < 6:
                continue
            poly = []
            for i in range(0, len(nums) - 1, 2):
                # HW Y-up → PIL Y-down
                poly.append((ox + nums[i] * scale, oy - nums[i + 1] * scale))
            if len(poly) >= 3:
                draw.polygon(poly, fill=fill)

    slots = [("rieul", 40), ("giyeok", 340), ("bieup", 640), ("nieun", 40)]
    # top row gulim + HW
    for name, x in [("rieul", 80), ("giyeok", 380), ("bieup", 680)]:
        ch = {"rieul": "ㄹ", "giyeok": "ㄱ", "bieup": "ㅂ"}[name]
        draw.text((x, 20), ch, font=font, fill=(160, 160, 160))
        for stroke in data_13[name]["strokes"]:
            draw_path(stroke, x - 40, 320, 0.2, (25, 25, 25))

    img.save(PREVIEW)
    print("wrote", PREVIEW)


def main():
    data_13 = build_13()
    data_tense = build_tense()
    bad = assert_ok(data_13, "13") + assert_ok(data_tense, "tense")
    if bad:
        raise SystemExit("continuity fail: " + "; ".join(bad))

    mid_y = data_13["bieup"]["medians"][2][0][1]
    bot_y = data_13["bieup"]["medians"][3][0][1]
    if mid_y < 350 or mid_y > 550:
        raise SystemExit(f"bieup stroke3 should be middle Y~450, got {mid_y}")
    if bot_y > 300:
        raise SystemExit(f"bieup stroke4 should be bottom Y~150, got {bot_y}")

    ie0 = data_13["ieung"]["medians"][0][0]
    if ie0[1] < 650:
        raise SystemExit(f"ieung should start near top, got {ie0}")

    if len(data_13["chieut"]["strokes"]) != 4:
        raise SystemExit("chieut must be 4 strokes (모자+ㅈ)")
    if len(data_13["mieum"]["strokes"]) != 3:
        raise SystemExit("mieum must be 3 strokes (내리고, 기역, 닫고)")
    if len(data_13["pieup"]["strokes"]) != 4:
        raise SystemExit("pieup must be 4 strokes (긋고, 내×2, 닫고)")

    OUT_13.write_text(json.dumps(data_13, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    OUT_TENSE.write_text(
        json.dumps(data_tense, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print("wrote", OUT_13)
    print("wrote", OUT_TENSE)
    ref = dump_gulim_ref()
    if ref:
        print("wrote", GULIM_REF, len(ref["glyphs"]), "glyphs")
    render_preview(data_13)

    r = data_13["rieul"]
    print("rieul", len(r["strokes"]), "strokes; subpaths", [s.count("M ") for s in r["strokes"]])
    print("bieup order mid->bot Y", mid_y, bot_y)
    print("ieung start", ie0)
    print("giyeok head", data_13["giyeok"]["strokes"][0][:80])


if __name__ == "__main__":
    main()
