# ESLint, Prettier, Markdownlint

Recommended defaults:

- Formatting is checked in CI.
- ESLint runs with zero warnings.
- Markdownlint covers repo-authored markdown and ignores generated/vendor trees.
- Generated checkouts, vendored actions, `dist`, `coverage`, and package caches
  are excluded intentionally.

A lint ignore should explain ownership, not hide active source files.
