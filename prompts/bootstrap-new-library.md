# Bootstrap New Library

Use this prompt to create a new TypeScript library repository.

## Goal

Create a production-ready library scaffold that can be maintained by agents and
released through a predictable alpha/stable flow.

## Required Inputs

- package name and npm scope;
- runtime target;
- public API summary;
- package manager;
- release channel strategy;
- Sonar project key;
- repository visibility and license.

## Agent Task

1. Inspect the empty or existing repository first.
2. Create a minimal TypeScript package scaffold.
3. Add repo-local `AGENTS.md` and `REVIEW.md` from templates.
4. Add README with badges, install, quick start, API, testing, release notes.
5. Add docs for architecture, quality gates, release train, limitations.
6. Add CI for install, format, typecheck, lint, tests, build, Sonar.
7. Add local scripts: `verify`, `sonar:local`, `sonar:issues:local`,
   `ci:local:sonar` when Sonar is used.
8. Add type tests when the library exports a public TypeScript API.
9. Open an initial PR with only scaffold/docs/quality gates before broad feature
   implementation.

## Acceptance

- `npm run verify` passes locally.
- CI passes on PR.
- Sonar has zero unresolved new issues.
- README explains current status and release channel.
- Release workflow is documented before first publish.
