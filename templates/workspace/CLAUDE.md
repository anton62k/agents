# CLAUDE.md

@AGENTS.md

## Claude Code Workspace Notes

- Launch Claude Code from this workspace root when shared project subagents and
  skills should be visible across child repositories.
- Use `.claude/agents` for Claude Code subagents.
- Use `.claude/skills` for Claude Code skills.
- Treat `.claude/agents` and `.claude/skills` as adapter output from
  `{{AGENTS_REPO_PATH}}`; do not edit generated or symlinked files directly.
- Keep `.claude/settings.local.json` and other local Claude Code settings out of
  committed workspace setup.
