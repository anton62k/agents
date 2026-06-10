# Codex Adapter

Codex can run this method directly through skills and prompts.

## Mapping

- `method/manual-run.md` is the main startup procedure.
- `method/bootstrap.md` explains how the consuming repo points to this method.
- `roles/<role>/ROLE.md` becomes the role instruction block.
- `roles/<role>/references/` are loaded progressively as needed.
- `pipelines/<pipeline>/PIPELINE.md` guides the main Codex session.
- The main session owns human gates and writes run artifacts when requested.

## Discovery

Codex learns about available agents by reading `roles/INDEX.md`,
`pipelines/INDEX.md`, and the selected role files. A consuming repo may also
expose repo-local skills in `.agents/skills/`, but those skills should call back
to canonical method files instead of redefining role behavior.

## New Device Bootstrap

1. Make this repository available as `{{AGENTS_REPO_PATH}}`.
2. Open the consuming repo as `{{TARGET_REPO_PATH}}`.
3. Ensure `AGENTS.md` points Codex to `method/manual-run.md` and
   `method/bootstrap.md`.
4. Keep concrete paths and accounts in ignored local overlays.

## Rules

- Use placeholders from `method/env-boundary.md`.
- Keep review-only Codex calls non-interactive and read-only.
- Do not rely on Codex-specific output fields in canonical role definitions.
- Platform wrappers may add envelope fields, but the portable role result remains
  `output`, `artifacts`, `needsHuman`, and `lesson`.
