# Claude Code Adapter

Claude Code can run this method through subagents, skills, slash commands, and
hooks.

## Mapping

- `method/manual-run.md` is the main startup procedure.
- `method/bootstrap.md` explains how the consuming repo points to this method.
- `roles/<role>/ROLE.md` can generate `.claude/agents/<role>.md`.
- `roles/<role>/references/` can generate or link to `.claude/skills/<role>/`.
- `pipelines/<pipeline>/PIPELINE.md` can generate workflow commands or skills.
- Human gates are handled by the main Claude Code session or deterministic hooks.

## Discovery

Claude Code learns about available agents from generated or linked
`.claude/agents/*` files, but the canonical source remains `roles/INDEX.md`,
`roles/<role>/ROLE.md`, and `pipelines/INDEX.md`.

Generated Claude Code files should include enough pointers back to this method
for the main session to reload canonical references when behavior is ambiguous.

## New Device Bootstrap

1. Make this repository available as `{{AGENTS_REPO_PATH}}`.
2. Open the consuming repo as `{{TARGET_REPO_PATH}}`.
3. Ensure `CLAUDE.md` points Claude Code to `method/manual-run.md` and
   `method/bootstrap.md`.
4. Generate or link `.claude/agents/*` only from canonical role definitions.

## Subagent Constraint

If a Claude Code subagent cannot prompt for interactive approval, do not give it
authority that depends on approval prompts. Use read-only subagents for review
and analysis. Keep writes in the main session or in explicitly authorized roles.

## Rules

- Do not commit local settings or resolved accounts.
- Generated `.claude/*` files should be reproducible from canonical definitions.
- If a platform limitation requires a deviation, record it here, not inside the
  role's core behavior.
