# Refined picture-book scene cards

These square scene cards are shared by the school-English and age-four game engines.

Gemini production hand-off:

- `GEMINI_ASSET_BRIEF.md`: master prompt, output contract, safety and acceptance rules
- `scene-card-manifest.json`: complete machine-readable shot list and filenames
- `style-board.html`: visual reference board with approved examples and palette
- `../../tools/audit-scene-card-manifest.mjs`: reports ready, incoming and missing files
- `../../tools/build-scene-card-runtime.py`: rebuilds accepted PNG originals as phone-ready WebP
- `../../tools/audit-scene-card-integration.mjs`: verifies that every manifest asset exists and is connected to the curriculum

Accepted PNG originals stay in `incoming/` for local rebuilds and are git-ignored;
only the compact runtime WebP files belong in the published curriculum.

## Visual direction

- Authoritative reference: `books/assets/elsa-warm-folk/style-reference.png`
- Warm Decorative Folk Flat illustration with soft opaque gouache
- Cream-paper grain, handmade edges, generous negative space
- Ivory, mustard, coral, powder blue, cocoa brown, muted teal, and deep teal-blue
- One unmistakable action per card; no embedded text, letters, UI, logos, or watermarks
- Characters are intentionally varied so the cards work equally well for Ellie and Lucas

## Runtime format

- 768 x 768 WebP for square cards; 768 x 512 WebP for 3:2 scenes
- Quality 86
- Meaning is carried by the illustration; the game supplies the accessible text label
- Existing SVG/icon artwork remains the loading-error fallback

## Current set

English action cards:

- `see.webp`: owl using binoculars to look at a butterfly
- `hear.webp`: rabbit listening to a bird
- `smell.webp`: caramel plush toy dog smelling a flower
- `eat.webp`: bear eating warm porridge
- `bite.webp`: squirrel biting an apple
- `draw.webp`: mouse drawing with a crayon
- `dance.webp`: fox dancing with a scarf

Morning-sequence cards:

- `sequence-wake.webp`: cozy bed at sunrise
- `sequence-brush.webp`: toothbrush, tooth cup, and gentle bubbles
- `sequence-eat.webp`: oatmeal, banana, spoon, and cup
- `sequence-leave.webp`: open door, backpack, and shoes

The manifest defines 150 accepted runtime assets in total. All 150 are integrated:

- 11 original approved examples
- 139 accepted PNG originals converted to runtime WebP
- school entrance, body, counting, letters, and after-school dialogue
- ten age-four game entrances plus position, counting, sound, comparison, sequence, recycling, emotion, and market activities
