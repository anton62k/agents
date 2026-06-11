# CLAUDE.md - anton62k/agents

@AGENTS.md

## Claude Code Notes

- This repository is canonical method, not a product workspace.
- Do not load `legacy/` as runtime agent knowledge.
- When updating Claude Code behavior, keep platform mechanics in
  `adapters/claude-code/` and portable behavior in `method/`, `roles/`,
  `pipelines/`, `references/`, and `stacks/`.
- Claude Code workspace files such as `.claude/agents/*` and `.claude/skills/*`
  are adapter output. They must point back to canonical sources and must not
  become a second source of truth.
