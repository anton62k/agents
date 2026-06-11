# CLAUDE.md

@AGENTS.md

## Claude Code Repo Overlay

This file is optional for standalone repositories or child repositories where
Claude Code is launched from inside the repo.

For multi-repo workspaces, prefer the workspace template:
`{{AGENTS_REPO_PATH}}/templates/workspace/CLAUDE.md`.

## Claude Code Rules

- Keep the main session responsible for human gates.
- Use subagents only within their approved rights.
- Keep local accounts, paths, and secrets in ignored local overlays.
- Prefer `VERIFICATION.md`; if it is absent, derive checks from repo scripts and
  CI and report residual uncertainty.
- Do not let generated Claude Code files override canonical method behavior.
