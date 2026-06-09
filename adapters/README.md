# Adapters

Adapters explain how to run the same canonical roles and pipelines on specific
execution surfaces.

- `codex/` - Codex skills, direct prompts, and non-interactive review calls.
- `claude-code/` - Claude Code subagents, skills, commands, and hooks.
- `revo/` - future agent-orchestrator import/runtime mapping.

Adapters must not fork role behavior. If behavior differs, update the canonical
role or pipeline and document only the platform mechanics here.
