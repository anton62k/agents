# CLAUDE.md

This repository uses the canonical agents method from `{{AGENTS_REPO_PATH}}`.

## Canonical Method

- Start multi-role work with `{{AGENTS_REPO_PATH}}/method/manual-run.md`.
- Use `{{AGENTS_REPO_PATH}}/method/bootstrap.md` for local setup.
- Use `{{AGENTS_REPO_PATH}}/method/materialization.md` for generated files.
- Discover roles from `{{AGENTS_REPO_PATH}}/roles/INDEX.md`.
- Discover pipelines from `{{AGENTS_REPO_PATH}}/pipelines/INDEX.md`.
- Fill handoff artifacts from `{{AGENTS_REPO_PATH}}/templates/artifacts/`.
- Generated `.claude/agents/*` files must point back to canonical roles.

## Repo Facts

- Package manager: TODO
- Runtime/framework: TODO
- Protected branch: TODO
- Local verify command: TODO

## Required Workflow

- Keep the main session responsible for human gates.
- Use subagents only within their approved rights.
- Keep local accounts, paths, and secrets in ignored local overlays.
- Do not let generated Claude Code files override canonical method behavior.
