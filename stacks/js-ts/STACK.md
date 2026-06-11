# Stack: js-ts

## Purpose

Shared JavaScript and TypeScript ecosystem knowledge for developers, reviewers,
analysts, and integrators.

## Applies To

- Node.js services.
- Browser or frontend TypeScript applications.
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

Core references:

- `references/typescript.md`
- `references/package-managers.md`
- `references/testing.md`
- `references/lint-format.md`
- `references/verification.md`
- `references/application-architecture.md`

Conditional references:

- `references/backend-testing.md`
- `references/backend-api-layers.md`
- `references/nestjs-backend.md`
- `references/prisma-data-access.md`
- `references/cqrs-backend.md`
- `references/graphql-api.md`
- `references/backend-integrations-jobs.md`
- `references/nestjs-prisma-cqrs-graphql.md` as a composite route only
- `references/react-ui-boundary.md`
- `references/mobx-reactivity.md`
- `references/mvvm-frontend.md`
- `references/frontend-di-composition.md`
- `references/frontend-fsd.md`
- `references/react-mobx-mvvm.md` as a composite route only

Load conditional references only when route evidence, repo overlay, package
metadata, config, or human approval selects the matching framework or pattern.
