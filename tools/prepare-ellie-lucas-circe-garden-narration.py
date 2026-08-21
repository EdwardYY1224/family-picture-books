"""Prepare local CosyVoice prompts for the Circe picture book."""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / "books" / "ellie-lucas-circe-garden.js").read_text(encoding="utf-8").split("const COPY", 1)[0]
prompts = []
for lang in ("zh", "en"):
    found = [json.loads(m.group(1)) for m in re.finditer(rf'\b{lang}:("(?:\\.|[^"\\])*")', source)]
    if len(found) != 51:
        raise ValueError(f"{lang}: expected cover plus 50 page strings, got {len(found)}")
    prompts += [
        {"id": f"ellie-lucas-circe-garden-{lang}-page-{i:02d}", "text": text}
        for i, text in enumerate(found[1:], 1)
    ]
target = ROOT / "voice-lab" / "prompts" / "ellie-lucas-circe-garden-natural.json"
target.write_text(json.dumps(prompts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
revised = [item for item in prompts if int(item["id"].rsplit("-", 1)[-1]) >= 15]
revised_target = ROOT / "voice-lab" / "prompts" / "ellie-lucas-circe-garden-revised-pages.json"
revised_target.write_text(json.dumps(revised, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"PROMPTS={len(prompts)} REVISED={len(revised)}\n{target}\n{revised_target}")
