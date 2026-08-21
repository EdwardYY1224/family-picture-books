"""Build runtime WebP art for Ellie, Lucas, and Circe's Magic Garden."""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "books" / "assets" / "ellie-lucas-circe-garden-warm-folk"


def main() -> None:
    for index in range(51):
        source = ASSET_DIR / f"page-{index:02d}.png"
        target = ASSET_DIR / f"page-{index:02d}.webp"
        with Image.open(source) as image:
            image = image.convert("RGB").resize((1536, 1024), Image.Resampling.LANCZOS)
            image.save(target, "WEBP", quality=86, method=6, exif=b"")
        print(f"{target.name}: {target.stat().st_size}")


if __name__ == "__main__":
    main()
