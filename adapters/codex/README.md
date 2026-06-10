# Codex Adapter

Codex can run this method directly through skills and prompts.

## Mapping

- `roles/<role>/ROLE.md` becomes the role instruction block.
- `roles/<role>/references/` are loaded progressively as needed.
- `pipelines/<pipeline>/PIPELINE.md` guides the main Codex session.
- The main session owns human gates and writes run artifacts when requested.

## Rules

- Use placeholders from `method/env-boundary.md`.
- Keep review-only Codex calls non-interactive and read-only.
- Do not rely on Codex-specific output fields in canonical role definitions.
- Platform wrappers may add envelope fields, but the portable role result remains
  `output`, `artifacts`, `needsHuman`, and `lesson`.
