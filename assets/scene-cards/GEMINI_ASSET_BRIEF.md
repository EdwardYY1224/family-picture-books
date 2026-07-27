# Gemini production brief — refined game scene cards

This is the hand-off document for replacing the remaining simple SVG/CSS artwork in the school-English and age-four games.

## Files Gemini must read first

1. Style reference: `D:/AI_Kid_Education/books/assets/elsa-warm-folk/style-reference.png`
2. Accepted examples: this folder's `see.webp`, `hear.webp`, `smell.webp`, `sequence-wake.webp`
3. Full shot list: `scene-card-manifest.json`
4. Visual board: `style-board.html`

Do not use private photographs from `Kid Picture/`. The new cards should work equally well for Ellie and Lucas, so most cards use friendly animals, toys, hands, clothing, food, and places instead of one recurring child.

## Master prompt

Copy this prompt for every asset, then append the asset's `scene` field from the manifest:

> Create one standalone children's picture-book illustration for a touch game. Match the attached reference's warm Decorative Folk Flat look: soft opaque gouache, visible cream-paper grain, gently imperfect handmade edges, rounded childlike shapes, warm ivory, mustard, coral, powder blue, cocoa brown, muted teal and deep teal-blue. Show one instantly understandable action or concept, with no more than three supporting objects and generous negative space. Keep the subject large, centered, and readable at 110 pixels. Use a quiet cream background with a soft ground shadow. No embedded words, letters, numbers, symbols used as labels, UI, borders, logos, brands, watermarks, glossy vector finish, 3D rendering, photorealism, dense scenery, or educational-poster layout.

For square cards add:

> Square 1:1 composition, safe subject area inside the middle 82%, no important details touching the edge.

For landscape scenes add:

> Landscape 3:2 composition, safe subject area inside the middle 86%, leave clear negative space for interface overlays.

## Output contract

- Generate one asset per image. Do not generate contact sheets or multi-panel grids.
- Original delivery: PNG, sRGB, 1536×1536 for `1:1`, or 1800×1200 for `3:2`.
- Use the manifest filename, changing only `.webp` to `.png` for the original.
- Put originals in `assets/scene-cards/incoming/`.
- Do not overwrite the 11 accepted WebP examples.
- Codex will crop only if needed, convert runtime copies to 768px WebP quality 86, wire them into the game data, and retain SVG as an error fallback.

## Character and safety rules

- Prefer a varied cast: approximately 40% friendly animals, 35% object-only scenes, 25% diverse children.
- Children must look preschool or early school age, with ordinary unbranded clothing.
- No child should look like a real identifiable person unless the user explicitly supplies and authorizes a reference for that asset.
- Rainbow may appear only when the scene calls for a toy dog: caramel-apricot tight curly plush fur, floppy ears, black button eyes and nose, narrow black collar, visibly a toy.
- No frightening injury, shame, punishment, unsafe road behavior, or unsafe bath/water behavior.

## Assessment-critical elements Gemini must not draw

These stay as precise HTML/CSS/SVG foreground elements:

- numerals 0–10;
- letters U–Z;
- colored geometric answer shapes;
- red/yellow/green traffic-light circles;
- dashed drop zones and interaction targets.

Gemini may draw the surrounding story scene, but must not bake these answer glyphs into the bitmap.

## Special batches

### Comparison cards

All variants of one object must use the same camera, object design, and baseline. Only the measured dimension changes. The small/medium/large series must be unmistakable even at thumbnail size.

### Position adventure

`position-city-map.webp` is a single 3:2 interactive background. It must contain, from left to right, a teal city bus with an open visible doorway, a tall street lamp, a park bench with clear space below it, a coral postbox, and a low park fence with clear inside/outside regions. Do not put the bird in this background. `position-bird.webp` is a separate transparent-background draggable sprite.

### Emotion cards

Use one consistent neutral animal character across the five face cards. Change pose, eyebrows, eyes, and mouth; do not rely only on color. Avoid exaggerated crying or scary anger.

### Recycling cards

Show one clean object per card. Trash and used tissue may look used but never disgusting. Reuse items must look safe and intact.

## Acceptance checklist

- The concept is recognizable without reading the filename.
- The main subject fills roughly 55–75% of the frame.
- It still reads when reduced to 110×110 pixels.
- No text-like marks, accidental letters, numerals, logos, signatures, or watermarks.
- No extra fingers, doubled limbs, merged objects, or impossible anatomy.
- Palette and paper texture visually match the accepted examples.
- The asset matches the exact aspect ratio and required filename.

## Recommended generation order

Generate and review one batch before starting the next. A rejected batch should be corrected before its visual drift spreads to later batches.

1. `school-entry` — 5 assets. Establish the new entrance look.
2. `school-body` — 9 assets. Confirm anatomy and thumbnail clarity.
3. `school-count-prompts` + `school-letters` — 12 assets.
4. `school-home-dialogue` — 14 assets. Completes the school-English area.
5. `age4-hub` — 10 assets. Replaces all game-arcade tile icons.
6. `daily-sequence` — 26 assets. Completes the order game.
7. `emotions` — 11 assets. Review character consistency as one set.
8. `market` + `recycling` — 19 object cards.
9. `traffic-and-sounds` — 8 assets.
10. `comparison` — 17 assets; generate size families together.
11. `counting-bus` — 6 assets; generate passenger sprites as one consistent family.
12. `position-adventure` — 2 special interactive assets, generated last because layout coordinates must be checked in the game.

After placing PNGs in `assets/scene-cards/incoming/`, run:

```powershell
node tools/audit-scene-card-manifest.mjs
```

The report will show which batch is ready for conversion and integration.
