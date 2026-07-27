# Pony Class learning games

This folder turns the parent-provided 16-track **I Grow Up** English course set
into five short, touch-friendly games for a four-year-old.

## Content map

- Tracks 01–04: body-part words, `Point to…`, `Touch…`, eyes/mouth/teeth
  functions, and body songs.
- Tracks 05: U–Z letter sounds and example words.
- Tracks 06–10: face and upper-body words, feelings, 1–20, quantities, and
  `What do you have?` patterns.
- Tracks 11–15: hands, feet, action verbs, ability patterns, and face songs.
- Track 16: going-home greetings, bag/jacket reminder, and a short reflection.

The source recordings are private/local course inputs and are deliberately not
committed to this public repository. Runtime prompts use browser speech
synthesis with checked, cleaned phrases derived from the lessons. The raw ASR
transcript is also excluded because music can create inaccurate repeated text.

## Four-year-old interaction rules

- One spoken instruction and three large choices per round.
- No reading is required; text remains visible for the accompanying adult.
- A first mistake replays the prompt; a second mistake adds a visual hint.
- No timer, lives, penalty sound, score, or forced repetition.
- Progress is local-only in `localStorage["pony-class-progress-v1"]`.
