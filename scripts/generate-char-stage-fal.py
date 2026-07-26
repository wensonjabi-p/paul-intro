"""Generate next growth-stage PNG via fal.ai Ideogram Character.

Requires FAL_KEY in environment or project-root `.env`.

Usage:
  python scripts/generate-char-stage-fal.py \\
    --ref hub/app/assets/chars/source/giyeok-2.png \\
    --out hub/app/assets/chars/source/giyeok-3.png \\
    --stage 3

Stages 3–6 add boots / weapon / shield / crown while locking the reference look.
"""

from __future__ import annotations

import argparse
import os
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


LOCK = (
    "CRITICAL: reproduce the EXACT same character as the reference image. "
    "It is NOT a human, NOT a letter C, NOT a blob with a face. "
    "It is a flat green Hangul consonant ㄱ (giyeok) shaped like a thick rounded "
    "inverted-L: long horizontal top bar extending LEFT, vertical stem on the RIGHT, "
    "two short stubby green legs at the bottom. Bright red briefs at the hips. "
    "Thick even near-black outline. Flat solid colors only. Solid pure BLACK "
    "background (#000000). No face, no eyes, no crown unless stage says so, no text, "
    "no symbols on the body, no gray/blue backdrop."
)

STAGE_PROMPTS = {
    3: (
        f"{LOCK} Change ONLY the feet: put small dark navy rounded boots on the "
        "existing short legs. Keep red briefs. No staff, no shield, no crown."
    ),
    4: (
        f"{LOCK} Keep red briefs and dark navy boots. ONLY add a large clear brown "
        "wooden shepherd-crook staff beside the body (thick shaft + hooked top). "
        "No shield, no crown."
    ),
    5: (
        f"{LOCK} Keep red briefs, navy boots, and brown hook staff. ONLY add a large "
        "clear round shield with gold/yellow rim and brown center. No crown."
    ),
    6: (
        f"{LOCK} Keep red briefs, navy boots, brown hook staff, and gold round shield. "
        "ONLY add a small yellow three-point crown on the top bar of the ㄱ."
    ),
}

NEGATIVE = (
    "human, person, face, eyes, mouth, crown unless requested, letter C, letter O, "
    "photorealistic, 3d render, gradient, soft shadow, bevel, glow, text, watermark, "
    "grid, collage, multiple characters, white background, gray background, blue "
    "background, chest symbol, elongated body, extra head bump"
)


def load_dotenv():
    env_path = ROOT / ".env"
    if not env_path.is_file():
        return
    for line in env_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        k, v = k.strip(), v.strip().strip('"').strip("'")
        if k and k not in os.environ:
            os.environ[k] = v


def main():
    load_dotenv()
    ap = argparse.ArgumentParser()
    ap.add_argument("--ref", required=True, type=Path, help="Approved reference PNG")
    ap.add_argument("--out", required=True, type=Path, help="Output PNG path")
    ap.add_argument("--stage", required=True, type=int, choices=sorted(STAGE_PROMPTS))
    ap.add_argument("--speed", default="BALANCED", choices=["TURBO", "BALANCED", "QUALITY"])
    ap.add_argument("--prompt", default=None, help="Override stage prompt")
    ap.add_argument(
        "--mode",
        default="remix",
        choices=["character", "remix"],
        help="character=ref only; remix=edit source image (better for letter mascots)",
    )
    ap.add_argument("--strength", type=float, default=0.88, help="remix strength 0–1")
    args = ap.parse_args()

    key = os.environ.get("FAL_KEY", "").strip()
    if not key:
        sys.exit(
            "FAL_KEY missing. Create project-root .env with one line:\n"
            "  FAL_KEY=your_key_here\n"
            "(Do not paste the key into chat.)"
        )

    if not args.ref.is_file():
        sys.exit(f"reference not found: {args.ref}")

    try:
        import fal_client
    except ImportError:
        sys.exit("Install fal client: pip install fal-client")

    prompt = args.prompt or STAGE_PROMPTS[args.stage]
    print(f"uploading ref {args.ref} …")
    ref_url = fal_client.upload_file(str(args.ref))
    endpoint = (
        "fal-ai/ideogram/character/remix"
        if args.mode == "remix"
        else "fal-ai/ideogram/character"
    )
    print(f"ref url ok; {endpoint} stage {args.stage} ({args.speed}) …")

    arguments = {
        "prompt": prompt,
        "reference_image_urls": [ref_url],
        "rendering_speed": args.speed,
        "style": "FICTION",
        "expand_prompt": False,
        "num_images": 1,
        "image_size": "portrait_4_3",
        "negative_prompt": NEGATIVE,
    }
    if args.mode == "remix":
        arguments["image_url"] = ref_url
        arguments["strength"] = args.strength

    result = fal_client.subscribe(
        endpoint,
        arguments=arguments,
        with_logs=True,
    )

    images = result.get("images") if isinstance(result, dict) else None
    if not images:
        # some client versions nest under data
        images = (result or {}).get("data", {}).get("images") if isinstance(result, dict) else None
    if not images:
        sys.exit(f"unexpected fal response: {result!r}")

    url = images[0]["url"]
    args.out.parent.mkdir(parents=True, exist_ok=True)
    urllib.request.urlretrieve(url, args.out)
    print(f"saved {args.out} ({args.out.stat().st_size:,} bytes)")
    print(f"source url: {url}")


if __name__ == "__main__":
    main()
