# AGENTS.md

This repository uses the canonical agents method from `{{AGENTS_REPO_PATH}}`.

## Canonical Method

- Start multi-role work with `{{AGENTS_REPO_PATH}}/method/manual-run.md`.
- Use `{{AGENTS_REPO_PATH}}/method/bootstrap.md` for local setup.
- Use `{{AGENTS_REPO_PATH}}/method/materialization.md` for generated files.
- Discover roles from `{{AGENTS_REPO_PATH}}/roles/INDEX.md`.
- Discover pipelines from `{{AGENTS_REPO_PATH}}/pipelines/INDEX.md`.
- Keep concrete local values in ignored `.agents/local.*` files.

## Repo Facts

- Package manager: TODO
- Runtime/framework: TODO
- Protected branch: TODO
- Release branch: TODO
- Local verify command: TODO
- Sonar project key: TODO

## Required Workflow

- Inspect existing structure before editing.
- Keep changes scoped.
- Run local verification before commit.
- Check CI after push.
- Treat Sonar unresolved issues as blockers when Sonar is configured.
- Answer PR review threads in-thread and resolve only after validation.
