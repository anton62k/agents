# Stack: js-ts

## Purpose

Shared JavaScript and TypeScript ecosystem knowledge for developers, reviewers,
analysts, and integrators.

## Applies To

- Node.js services.
- React/TypeScript frontends.
- TypeScript libraries.
- Repos using npm, pnpm, or compatible package-manager scripts.

## Inputs

- package manager from repo overlay.
- script names from repo overlay.
- TypeScript, lint, format, test, build commands as placeholders.

## Hard Rules

- Prefer repo scripts over direct tool invocation.
- Do not assume npm, pnpm, yarn, jest, vitest, eslint, or prettier command names;
  read the repo overlay or package metadata.
- Keep package-manager migration rules in references, not role dispatchers.
- Do not encode concrete Node versions in this stack unless the rule is
  ecosystem-wide; repo Node versions belong to overlays.

## References

- `references/typescript.md`
- `references/package-managers.md`
- `references/testing.md`
- `references/lint-format.md`
- `references/_learnings-candidate.md`
