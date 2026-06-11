# AGENTS.md

This repository uses the canonical agents method from `{{AGENTS_REPO_PATH}}`.

## Canonical Method

- Start multi-role work with `{{AGENTS_REPO_PATH}}/method/manual-run.md`.
- Use `{{AGENTS_REPO_PATH}}/method/bootstrap.md` for local setup.
- Use `{{AGENTS_REPO_PATH}}/method/materialization.md` for generated files.
- Discover roles from `{{AGENTS_REPO_PATH}}/roles/INDEX.md`.
- Discover pipelines from `{{AGENTS_REPO_PATH}}/pipelines/INDEX.md`.
- Fill handoff artifacts from `{{AGENTS_REPO_PATH}}/templates/artifacts/`.
- Keep concrete local values in ignored `.agents/local.*` files.

## Repo Facts

- Primary stack: TODO
- Package manager or build runner: TODO / not applicable
- Runtime/framework: TODO / not applicable
- Protected branch: TODO
- Release branch: TODO
- Local verify command: TODO
- Static-analysis providers: TODO / none

## Required Workflow

- Inspect existing structure before editing.
- Keep changes scoped.
- Run local verification before commit.
- Check CI after push.
- Treat unresolved static-analysis findings as blockers when the provider is
  configured and the repo policy makes it required.
- Answer PR review threads in-thread and resolve only after validation.
