# anton62k/agents

Canonical agent method for building and maintaining software projects.

This repository contains reusable role definitions, pipelines, references,
templates, adapters, and method rules used to run AI coding agents consistently
across Codex, Claude Code, and future orchestrator runtimes.

Product repositories should keep project-specific context. This repository keeps
the reusable method.

## Principle

Project repos contain context. `anton62k/agents` contains method.

Use this repository to standardize how agents route work, choose roles, produce
handoff artifacts, apply gates, and keep platform-specific files reproducible.

## Structure

- `method/` - canonical rules for role, pipeline, and environment definitions.
- `roles/` - portable role definitions and role knowledge references.
- `references/` - shared practices reused by multiple roles.
- `stacks/` - language and ecosystem knowledge used by roles.
- `pipelines/` - portable multi-role workflows with gates and handoff contracts.
- `adapters/` - notes for running the same method in Codex, Claude Code, and revo.
- `templates/common/` - consuming-repo entrypoint templates.
- `templates/artifacts/` - fillable route, run-state, and handoff artifacts.
- `checklists/requirements.md` - canonical requirements readiness gate.
- `legacy/` - archived older material. It is not runtime agent knowledge and
  should not be loaded by roles, stacks, pipelines, or adapters.

## How To Use

For an existing project, add a small repo-local `AGENTS.md` that points here and
records only local facts: stack, build runner or package manager, branch policy,
CI commands, release branch, deployment target, and domain-specific constraints.
When useful, add `CLAUDE.md`, `REVIEW.md`, `VERIFICATION.md`, and optional
`REPOSITORY.md` from `templates/common/`. These are recommended entrypoints, not
a mandatory migration checklist; existing repo docs can serve as the overlay.

For multi-agent work, start with `method/README.md`. Keep role behavior in
`roles/`, workflow order in `pipelines/`, and local values in ignored env/local
overlays rather than committed markdown.

For a new device or a new consuming repo, start with `method/bootstrap.md`, then
run the manual startup flow in `method/manual-run.md`.

To update the method itself, follow `method/maintenance.md`.

Do not link runtime behavior to `legacy/`. When an archived idea is still useful,
rebuild it as new canonical behavior in `method/`, `roles/`, `pipelines/`,
`references/`, `stacks/`, `adapters/`, `templates/artifacts/`, or
`checklists/requirements.md` after approval.
