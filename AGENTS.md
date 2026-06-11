# AGENTS.md - anton62k/agents

This repository stores the canonical agent method plus older playbook material
under `legacy/`.

## Scope

- Keep content project-agnostic unless it is explicitly an example.
- Prefer small reusable files over large mixed documents.
- Product repositories should copy templates or link to prompts, then keep only
  repo-specific facts locally.
- Do not put private credentials, tokens, or customer data here.

## Editing Rules

- Keep canonical behavior in `method/`, `roles/`, `pipelines/`, `references/`,
  `stacks/`, `adapters/`, `templates/artifacts/`, and canonical checklists.
- Treat `legacy/` as source material, not the default location for new behavior.
- Promote useful legacy material into the canonical layer through small PRs.
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
