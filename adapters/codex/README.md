# Codex Adapter

Codex can run this method directly through skills and prompts.

Official surfaces used by this adapter:

- `AGENTS.md` for persistent repo/workspace instructions.
- `.agents/skills/<skill>/SKILL.md` for repo-scoped skills.
- `.codex/agents/*.toml` for project-scoped custom agents.

## Mapping

- `method/manual-run.md` is the main startup procedure.
- `method/bootstrap.md` explains how the consuming repo points to this method.
- `method/materialization.md` defines generated or linked Codex-facing files.
- `roles/<role>/ROLE.md` becomes a `.codex/agents/<role>.toml` adapter wrapper.
- `roles/<role>/references/` are loaded progressively as needed.
- `pipelines/<pipeline>/PIPELINE.md` is exposed through `.agents/skills/*`
  wrappers when a workflow should be directly invokable.
- The main session owns human gates and writes run artifacts when requested.

## Discovery

Codex reads `AGENTS.md` for persistent instructions and scans `.agents/skills`
for skills. Codex custom agents live under `.codex/agents/*.toml`.

For a multi-repo workspace, launch Codex from the workspace root when shared
workspace agents and skills should be visible while working across child
repositories. If Codex is commonly launched from inside a child repository, add
a thin child `AGENTS.md` that points back to the workspace root and canonical
method.

Repo-local skills should call back to canonical method files instead of
redefining role behavior.

## New Device Bootstrap

1. Make this repository available as `{{AGENTS_REPO_PATH}}`.
2. Open the consuming workspace as `{{WORKSPACE_ROOT}}`.
3. Ensure `AGENTS.md` points Codex to `method/manual-run.md` and
   `method/bootstrap.md`.
4. Symlink workspace `.agents/skills` to
   `{{AGENTS_REPO_PATH}}/adapters/codex/materialized/skills`.
5. Symlink workspace `.codex/agents` to
   `{{AGENTS_REPO_PATH}}/adapters/codex/materialized/agents`.
6. Use `method/materialization.md` before generating or refreshing adapter
   wrappers.
7. Start Codex from the workspace root for shared multi-repo work.
8. Keep concrete paths and accounts in ignored local overlays.

## Rules

- Use placeholders from `method/env-boundary.md`.
- Keep review-only Codex calls non-interactive and read-only.
- Generated `.agents/*` and `.codex/*` files must include canonical source
  pointers when they mirror roles, pipelines, or skills.
- Do not rely on Codex-specific output fields in canonical role definitions.
- Platform wrappers may add envelope fields, but the portable role result remains
  `output`, `artifacts`, `needsHuman`, and `lesson`.
- Do not symlink canonical `roles/` directly into `.codex/agents`; use adapter
  wrappers.
