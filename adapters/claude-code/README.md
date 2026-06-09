# Claude Code Adapter

Claude Code can run this method through subagents, skills, slash commands, and
hooks.

## Mapping

- `roles/<role>/ROLE.md` can generate `.claude/agents/<role>.md`.
- `roles/<role>/references/` can generate or link to `.claude/skills/<role>/`.
- `pipelines/<pipeline>/PIPELINE.md` can generate workflow commands or skills.
- Human gates are handled by the main Claude Code session or deterministic hooks.

## Subagent Constraint

If a Claude Code subagent cannot prompt for interactive approval, do not give it
authority that depends on approval prompts. Use read-only subagents for review
and analysis. Keep writes in the main session or in explicitly authorized roles.

## Rules

- Do not commit local settings or resolved accounts.
- Generated `.claude/*` files should be reproducible from canonical definitions.
- If a platform limitation requires a deviation, record it here, not inside the
  role's core behavior.
