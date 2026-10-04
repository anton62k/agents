# CodeGraph Manager

`codegraph-manager` owns local CodeGraph lifecycle without adding generated
indexes to application repositories.

```bash
codegraph-manager bootstrap
codegraph-manager ensure <repo-or-worktree>
codegraph-manager status <repo-or-worktree>
codegraph-manager remove <worktree>
```

`ensure` initializes a missing index or incrementally synchronizes an existing
one. Each Git worktree gets its own `.codegraph/`; indexes are never copied
between checkouts. Managed worktree registry records receive a `codegraph`
object with observed state and version.

`bootstrap` configures CodeGraph MCP for installed Codex, Claude, OpenCode, Grok,
and Antigravity CLI (`agy`) clients, disables CodeGraph telemetry, and configures
`$HOME/.config/git/ignore` as the global Git excludes file.
The `.codegraph/` rule keeps generated indexes out of every repository without
editing tracked `.gitignore` files.

Antigravity CLI stores its global MCP servers in
`$HOME/.gemini/config/mcp_config.json`. Bootstrap adds CodeGraph through
`agy mcp add codegraph codegraph serve --mcp` when its enabled entry is missing.
