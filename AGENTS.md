# AGENTS.md - anton62k/agents

This repository stores the canonical agent method. Older material under
`legacy/` is archived and must not be used as runtime agent knowledge.

## Scope

- Keep content project-agnostic unless it is explicitly an example.
- Prefer small reusable files over large mixed documents.
- Product repositories should copy templates or link to prompts, then keep only
  repo-specific facts locally.
- Multi-repo workspaces should prefer one workspace-root setup with symlinks to
  adapter materialized files instead of copying agent definitions into every
  child repository.
- Do not put private credentials, tokens, or customer data here.

## Editing Rules

- Keep canonical behavior in `method/`, `roles/`, `pipelines/`, `references/`,
  `stacks/`, `adapters/`, `templates/artifacts/`, and canonical checklists.
- Do not load `legacy/` from roles, stacks, pipelines, adapters, or runtime
  references.
- Rebuild useful ideas as new canonical rules through small PRs instead of
  linking to legacy files.
- Avoid duplicating the same rule across many files. Link to the canonical file.
- Do not commit concrete local environment values in markdown: personal GitHub
  accounts, absolute home paths, hostnames, namespaces, token names that expose
  private infrastructure, passwords, API keys, or one-machine paths. Use
  placeholders and the env boundary in `method/env-boundary.md`.
- Role and pipeline markdown is method, not run state. Runtime status, local
  account selection, approvals, PR numbers, and deployment coordinates belong in
  a run ledger or ignored local overlay.
- When adding or changing roles, stacks, frameworks, or pipelines, follow
  `method/maintenance.md` and `method/role-composition.md`.
- When changing bootstrap or platform discovery, follow the official platform
  surfaces recorded in `method/materialization.md`; do not invent local
  discovery paths.

## Quality Bar

Agent workflows should assume:

- local verification before PR;
- CI verification after push;
- configured static-analysis aggregate gates are not enough by themselves;
- unresolved provider findings must be inspected and fixed or explicitly
  accepted with evidence;
- PR review threads must be answered in-thread and resolved only after fixes are
  verified;
- release commits and tags must be validated against registry/GitHub Actions.
