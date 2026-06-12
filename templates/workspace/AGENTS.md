# AGENTS.md

This workspace uses the canonical agent playbook from `{{AGENTS_REPO_PATH}}`.

## Workspace Contract

- Launch Codex from this workspace root when shared agents should be visible
  across child repositories.
- Use `{{AGENTS_REPO_PATH}}/method/manual-run.md` for multi-role work.
- Use `{{AGENTS_REPO_PATH}}/method/bootstrap.md` for new-device setup.
- Use `{{AGENTS_REPO_PATH}}/method/materialization.md` before changing symlinks
  or generated platform files.
- Discover roles from `{{AGENTS_REPO_PATH}}/roles/INDEX.md`.
- Discover pipelines from `{{AGENTS_REPO_PATH}}/pipelines/INDEX.md`.
- Keep concrete local values in ignored `.agents/local.*` files.
- If this workspace root is versioned, merge
  `{{AGENTS_REPO_PATH}}/templates/workspace/gitignore` into its ignore rules.

## Symlinked Platform Files

Expected workspace links:

- `.agents/skills -> {{AGENTS_REPO_PATH}}/adapters/codex/materialized/skills`
- `.codex/agents -> {{AGENTS_REPO_PATH}}/adapters/codex/materialized/agents`
- `.claude/agents -> {{AGENTS_REPO_PATH}}/adapters/claude-code/materialized/agents`
- `.claude/skills -> {{AGENTS_REPO_PATH}}/adapters/claude-code/materialized/skills`

Do not symlink canonical `roles/` or `pipelines/` directly into platform
discovery folders. Platform files are adapter wrappers.

## Method Updates

After updating `{{AGENTS_REPO_PATH}}`, run its materialization freshness check
before assuming new roles or skills are visible:

- `node tools/validate.mjs` in `{{AGENTS_REPO_PATH}}`;
- verify the symlinks above still point to adapter materialized directories;
- when a role or directly invokable pipeline was added, renamed, removed, or
  rerouted, follow `{{AGENTS_REPO_PATH}}/method/materialization.md`.

In symlink mode, do not copy adapter files into the workspace just because the
canonical method changed. If a platform does not follow a symlink in the current
environment, switch only that target to generated mode.

## Child Repository Overlays

Child repositories should contain only repo-specific facts when needed:

- `VERIFICATION.md` for exact commands and quality gates;
- `REVIEW.md` for review policy;
- `REPOSITORY.md` for repo structure and source-of-truth order;
- a thin child `AGENTS.md` only when Codex is launched from inside that child.

Repo-local overlays win for concrete commands, paths, policies, and domain
facts. Canonical roles and pipelines stay in `{{AGENTS_REPO_PATH}}`.

## Required Workflow

- Inspect the relevant child repo before editing.
- Use `VERIFICATION.md` or the repo-declared equivalent when present.
- If a repo-local verification contract is missing, infer checks from scripts,
  CI config, static-analysis config, and source layout, then report fallback use.
- Run local verification before commit.
- Check CI, static analysis, provider status, and review threads after push.
- Answer PR review threads in-thread and resolve only after validation.
