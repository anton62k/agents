# Bootstrap Existing Repo

Use this prompt to bring an existing repository under agent-friendly quality and
workflow control.

## Agent Task

1. Inspect repo structure, package manager, scripts, CI, docs, and branch policy.
2. Identify current quality gates and missing gates.
3. Add or repair repo-local `AGENTS.md`, `REVIEW.md`, README, and docs index.
4. Normalize local commands around a single `verify` or equivalent.
5. Add Sonar local/CI issue inspection when Sonar is configured.
6. Remove stale bootstrap artifacts that no longer belong to the product repo.
7. Create a small PR with the workflow baseline before unrelated refactors.

## Acceptance

- Existing behavior is unchanged.
- Local verification passes.
- CI passes.
- Project-specific docs stay in the repo; reusable method moves to
  `anton62k/agents`.
