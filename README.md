# Family Picture Books and Learning Games

A single static website with three child-facing entrances: Pony English-class
practice, the family's finished picture-book readers, and age-four ability
games. GitHub Pages serves the site directly from the repository root.

The school games in `school/` are derived from parent-provided lesson recordings.
Only cleaned learning targets and runtime prompts are published; the source
recordings and raw machine transcript remain local.

## Privacy rule

Never upload children's real photographs or private identity-reference files.
This repository may contain only finished illustrated page assets (`page-*.webp`),
book code, narration audio, and public site files.

The repository intentionally excludes:

- `Kid Picture/`;
- `.codex-remote-attachments/`;
- JPG, JPEG, and HEIC files;
- character-lock, style-reference, and cover-trial PNG files;
- generated development originals.

The automated privacy check rejects forbidden image types and unexpected files
inside `books/assets/` on every push and pull request.
