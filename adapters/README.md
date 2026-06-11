# Adapters

Adapters explain how to run the same canonical roles and pipelines on specific
execution surfaces. They also contain generated or hand-maintained wrapper
outputs that platform discovery folders can point to.

- `codex/` - Codex skills, direct prompts, and non-interactive review calls.
- `claude-code/` - Claude Code subagents, skills, commands, and hooks.
- `revo/` - future agent-orchestrator import/runtime mapping.

Adapters must not fork role behavior. If behavior differs, update the canonical
role or pipeline and document only the platform mechanics here.

## Materialized Output

Workspace symlinks should point to adapter materialized output:

- `adapters/codex/materialized/skills` -> `.agents/skills`
- `adapters/codex/materialized/agents` -> `.codex/agents`
- `adapters/claude-code/materialized/agents` -> `.claude/agents`
- `adapters/claude-code/materialized/skills` -> `.claude/skills`

Do not symlink canonical `roles/` or `pipelines/` directly into platform
discovery folders. Platform wrappers must point back to canonical sources and
preserve role rights, pipeline gates, and human-review stops.
