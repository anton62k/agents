# Shared agent configuration

This repository is the versioned source of shared behavior, engineering
guidelines, skills, and local tools used by coding agents.

The deployed checkout lives at `$HOME/.agents`. Codex, Claude Code, OpenCode,
Grok, and Antigravity CLI (`agy`) load the same `behavior.md` through
provider-specific entry points. Detailed rules are loaded only when their topic
applies.

## Layout

```text
behavior.md          Small global router loaded by every provider
rules/               Worktrees, saved prompts, CodeGraph, and sandbox lifecycle
guidelines/          Accepted engineering preferences and pending proposals
providers/           Cross-provider invocation guidance
skills/              Portable user-authored skills
tools/               Local lifecycle utilities
install/links.toml   Paths managed by the installer
bin/agents           Installation, validation, status, and update command
```

Runtime state does not belong here. Prompts, worktree registries, backups, caches,
sessions, authentication, trust state, CodeGraph indexes, and secrets stay outside
the repository.

## Fresh installation

Use this path only when `$HOME/.agents` does not exist:

```bash
test ! -e "$HOME/.agents"
git clone git@github.com:anton62k/agents.git "$HOME/.agents"
"$HOME/.agents/bin/agents" plan-install
"$HOME/.agents/bin/agents" install
"$HOME/.agents/bin/agents" doctor
```

Git refuses to clone into a non-empty directory. Do not remove an existing
`$HOME/.agents` to make this command succeed.

The installer creates only missing managed symlinks. It accepts an already-correct
symlink and stops before changing anything when a target is a regular file,
directory, or different symlink. It never overwrites provider instructions.

When CodeGraph is installed, `install` also runs the repository's idempotent
CodeGraph bootstrap for installed providers. Use `--skip-mcp` when intentionally
installing only files and symlinks.

## Existing installation

Clone the repository somewhere other than `$HOME/.agents` and inspect the existing
state without modifying it:

```bash
git clone git@github.com:anton62k/agents.git "$HOME/agents-bootstrap"
"$HOME/agents-bootstrap/bin/agents" plan-adopt "$HOME/.agents"
```

Review the inventory, import portable local rules through a pull request, and
prepare a backup under `$HOME/.local/state/agents/backups/`. Validate a candidate
checkout with `bin/agents check` before cutover. There is deliberately no
force-overwrite or automatic destructive adoption command.

A safe cutover uses a verified candidate:

```bash
git clone git@github.com:anton62k/agents.git "$HOME/.agents.next"
"$HOME/.agents.next/bin/agents" check

mkdir -p "$HOME/.local/state/agents/backups"
mv "$HOME/.agents" \
  "$HOME/.local/state/agents/backups/agents-$(date -u +%Y%m%dT%H%M%SZ)"
mv "$HOME/.agents.next" "$HOME/.agents"

"$HOME/.agents/bin/agents" install
"$HOME/.agents/bin/agents" doctor
```

Perform the two moves only after reviewing the inventory and backup destination.
Never replace them with `rm -rf`.

## Provider connections

`bin/agents install` manages these instruction entry points:

| Provider | Entry point |
| --- | --- |
| Codex | `$HOME/.codex/AGENTS.md` |
| Claude Code | `$HOME/.claude/CLAUDE.md` |
| OpenCode | `$HOME/.config/opencode/AGENTS.md` |
| Grok | `$HOME/.grok/AGENTS.md` |
| Antigravity CLI (`agy`) | `$HOME/.gemini/AGENTS.md` |

Each entry points to `$HOME/.agents/behavior.md`. Codex, OpenCode, and Grok
discover the shared `$HOME/.agents/skills` directory directly. Custom skills are
linked into Claude Code's native skill directory and Antigravity CLI's
`$HOME/.gemini/antigravity-cli/skills` directory without replacing unrelated skills.

Provider configuration remains provider-owned. The installer does not replace
configuration files, authentication, sessions, trust state, or caches.

### Antigravity CLI permissions

The installer connects shared instructions and skills and bootstraps CodeGraph
MCP for `agy`. Permissions remain local configuration. To enable persistent YOLO
mode, merge these keys into `$HOME/.gemini/antigravity-cli/settings.json`,
preserving its other fields:

```json
{
  "toolPermission": "always-proceed",
  "artifactReviewPolicy": "always-proceed"
}
```

Start a new `agy` session to load the settings and shared instructions. For a
single invocation, `agy --dangerously-skip-permissions` auto-approves tool
permission requests. The persistent settings above also disable artifact review
prompts. See the official [CLI reference](https://antigravity.google/docs/cli/reference/),
[global rules](https://antigravity.google/docs/rules/), and
[skill locations](https://antigravity.google/docs/skills/).

## Developing changes

Treat `$HOME/.agents` as the deployed default-branch checkout. Make every change
in a separate worktree and deliver it through a pull request:

```bash
git -C "$HOME/.agents" fetch origin
git -C "$HOME/.agents" worktree add \
  -b docs/example-rule \
  "$HOME/.worktree/agents/agents/example-rule" \
  origin/HEAD
```

Run validation in the task worktree:

```bash
bin/agents check
python3 -m unittest discover -s tests -v
```

After merge, update the deployed checkout and reconcile managed links:

```bash
"$HOME/.agents/bin/agents" update
```

`update` requires a clean checkout on the remote default branch. It fetches and
fast-forwards only, then runs installation and diagnostics. It never resets local
changes. Existing agent sessions may retain instructions loaded at session start;
start a new session to guarantee the new behavior is active.

## Commands

```text
agents plan-install          Show link changes without writing
agents install               Create missing safe links and bootstrap MCP
agents check                 Validate repository content
agents doctor                Validate content and a deployed installation
agents status                Show Git and managed-link status
agents update                Fast-forward and reconcile a deployed checkout
agents plan-adopt PATH       Compare an existing directory without modifying it
```

All commands are non-destructive by default. A conflict is an error that requires
review, not a reason to overwrite user data.
