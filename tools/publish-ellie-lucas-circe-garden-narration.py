"""Publish locally generated Circe-book narration.

Pages 1-14 retain the previously approved compact MP3 files. Revised pages
15-50 use the newly generated PCM WAV directly so publishing does not depend on
an external audio encoder.
"""
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
mp3_src = ROOT / "voice-lab" / "outputs" / "ellie-lucas-circe-garden-natural-mp3"
wav_src = ROOT / "voice-lab" / "outputs" / "ellie-lucas-circe-garden-natural-wav"
for lang, folder in {"zh": "audio-ellie-lucas-circe-garden-zh", "en": "audio-ellie-lucas-circe-garden"}.items():
    dst = ROOT / "books" / folder
    dst.mkdir(parents=True, exist_ok=True)
    for i in range(1, 15):
        source = mp3_src / f"ellie-lucas-circe-garden-{lang}-page-{i:02d}.mp3"
        if not source.is_file() or source.stat().st_size < 1000:
            raise FileNotFoundError(source)
        shutil.copy2(source, dst / f"page-{i:02d}.mp3")
    for i in range(15, 51):
        source = wav_src / f"ellie-lucas-circe-garden-{lang}-page-{i:02d}.wav"
        if not source.is_file() or source.stat().st_size < 1000:
            raise FileNotFoundError(source)
        shutil.copy2(source, dst / f"page-{i:02d}.wav")
print("PUBLISHED=100 (28 MP3 + 72 WAV)")
