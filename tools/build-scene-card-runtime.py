"""Build phone-ready scene-card WebP files from accepted PNG originals.

The manifest is the source of truth. Existing assets marked ``ready`` are never
overwritten; accepted originals marked ``needed`` are resized to a 768 px long
edge and encoded as WebP quality 86. Transparent sprites keep their alpha.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "assets" / "scene-cards"
INCOMING_DIR = ASSET_DIR / "incoming"
MANIFEST_PATH = ASSET_DIR / "scene-card-manifest.json"
LONG_EDGE = 768
QUALITY = 86


def assets() -> list[dict]:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    return [asset for batch in manifest["batches"] for asset in batch["assets"]]


def expected_size(ratio: str) -> tuple[int, int]:
    return (LONG_EDGE, 512) if ratio == "3:2" else (LONG_EDGE, LONG_EDGE)


def build(check_only: bool) -> int:
    failures: list[str] = []
    built = 0
    checked = 0

    for asset in assets():
        destination = ASSET_DIR / asset["file"]
        size = expected_size(asset["ratio"])

        if asset["status"] == "ready":
            if not destination.exists():
                failures.append(f"missing approved runtime file: {destination.name}")
            continue

        source = INCOMING_DIR / Path(asset["file"]).with_suffix(".png").name
        if not source.exists():
            failures.append(f"missing accepted original: {source.name}")
            continue

        if not check_only:
            with Image.open(source) as image:
                has_alpha = asset["ratio"].endswith("transparent")
                image = image.convert("RGBA" if has_alpha else "RGB")
                image = image.resize(size, Image.Resampling.LANCZOS)
                image.save(
                    destination,
                    format="WEBP",
                    quality=QUALITY,
                    method=6,
                    exact=has_alpha,
                )
            built += 1

        if destination.exists():
            with Image.open(destination) as runtime:
                checked += 1
                if runtime.size != size:
                    failures.append(
                        f"wrong runtime size: {destination.name} "
                        f"is {runtime.size[0]}x{runtime.size[1]}, expected {size[0]}x{size[1]}"
                    )
                if asset["ratio"].endswith("transparent") and "A" not in runtime.getbands():
                    failures.append(f"alpha missing from transparent sprite: {destination.name}")
        elif check_only:
            failures.append(f"missing runtime file: {destination.name}")

    print(f"Scene-card runtime: built={built}, checked={checked}, failures={len(failures)}")
    for failure in failures:
        print(f"- {failure}")
    return 1 if failures else 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--check",
        action="store_true",
        help="Validate existing runtime files without writing anything.",
    )
    args = parser.parse_args()
    return build(args.check)


if __name__ == "__main__":
    sys.exit(main())
