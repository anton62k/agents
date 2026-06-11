# AGENTS.md

This repository uses the canonical agents method from `{{AGENTS_REPO_PATH}}`.

## Repo Overlay

Repo-local instructions win for concrete commands, paths, release policy,
domain facts, and environment boundaries. The canonical agents method provides
roles, pipelines, artifact contracts, and adapter rules.

## Canonical Method

- Start multi-role work with `{{AGENTS_REPO_PATH}}/method/manual-run.md`.
- Use `{{AGENTS_REPO_PATH}}/method/bootstrap.md` for local setup.
- Use `{{AGENTS_REPO_PATH}}/method/materialization.md` for generated files.
- Discover roles from `{{AGENTS_REPO_PATH}}/roles/INDEX.md`.
- Discover pipelines from `{{AGENTS_REPO_PATH}}/pipelines/INDEX.md`.
- Fill handoff artifacts from `{{AGENTS_REPO_PATH}}/templates/artifacts/`.
- Keep concrete local values in ignored `.agents/local.*` files.

## Recommended Repo Docs

- `VERIFICATION.md` - exact local, conditional, static-analysis, and remote
  gates for this repository.
- `REVIEW.md` - repo-specific PR review rubric.
- `REPOSITORY.md` - optional map of repo structure, surfaces, generated files,
  and source-of-truth order.

Existing docs such as `docs/quality-gates.md`, README files, or CI docs may
replace these templates when they already contain the repo-specific truth.

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
- Prefer `VERIFICATION.md`; if it is absent, derive checks from repo scripts and
  CI and report residual uncertainty.
- Treat unresolved static-analysis findings as blockers when the provider is
  configured and the repo policy makes it required.
- Answer PR review threads in-thread and resolve only after validation.
