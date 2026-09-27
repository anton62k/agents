# CodeGraph development

Shared defaults for local code intelligence with `@colbymchenry/codegraph`.
Explicit user instructions and applicable repository `AGENTS.md` files take
precedence. Generated indexes are local development infrastructure.

## Default authorization and scope

- The user has authorized automatic CodeGraph initialization for real source
  repositories and code-development worktrees under `$HOME`. Do not ask
  for separate confirmation when applying this default.
- Use `$HOME/.local/bin/codegraph-manager` for lifecycle operations. Run
  `codegraph-manager ensure <path>` when beginning code work or structural code
  exploration and the checkout has no usable local index. It initializes a new
  index or synchronizes an existing one.
- Do not initialize `$HOME` itself, project/group directories that merely
  contain multiple repositories, temporary dependency/reference clones,
  documentation-only repositories, `$HOME/.agents`, or
  `$HOME/.prompts`. CodeGraph is an AST-oriented source index; saved
  prompts remain discoverable through their metadata and text search.
- A newly cloned source repository receives its own index when it becomes a
  working repository. A throwaway clone used only for read-only upstream
  inspection does not need one.

## Use it with agents

- Codex, Claude, OpenCode, and Grok connect to the global `codegraph` MCP
  server. Detailed tool guidance arrives through the MCP initialization
  response. Each client's global instruction file links to the shared behavior
  file, which supplies the lifecycle defaults and command-line fallback.
- In an indexed checkout, use `codegraph_explore` first for structural questions:
  architecture, symbol discovery, callers/callees, execution flows, dependency
  relationships, and likely impact. Pass the exact checkout or worktree as
  `projectPath` when the tool accepts it.
- Use `rg` for exact text, literal configuration keys, non-code files, and cases
  where graph structure adds no value. Use ordinary file reads to verify or edit
  the selected source. CodeGraph supplements compilers, linters, and tests; it
  does not replace them.
- If MCP tools are unavailable in the current session, use
  `codegraph explore --path <path> "<question>"` through the shell. A newly configured
  MCP server becomes available to a main agent after that client starts a new
  session; do not repeatedly retry a tool absent from the current tool list.

## Keep indexes fresh

- CodeGraph watches indexed projects while its MCP server is active and catches
  up changes made while it was offline on the next connection. Do not run full
  re-indexing after ordinary edits.
- `codegraph-manager ensure` performs an incremental sync for an existing index.
  Use `codegraph index <path>` only for corruption, extraction-version changes,
  or another concrete reason requiring a full rebuild.
- Inspect uncertainty with `codegraph-manager status <path>`. If a result reports
  pending or stale files, allow the watcher to catch up or run
  `codegraph sync <path>` before relying on graph results.

## Worktrees and clones

- Every linked worktree has a separate `.codegraph/` built from that worktree's
  branch. Never copy or share an index from the original checkout: doing so can
  return symbols and flows from a different branch.
- After creating and registering a code worktree, run
  `codegraph-manager ensure <worktree>` before structural exploration. The
  manager records CodeGraph status in the worktree registry when a record exists.
- Exclude `.codegraph/` when copying ignored setup files into a worktree. The
  global Git excludes file hides `.codegraph/` in every checkout without adding
  repository changes.
- Before removing a worktree, run `codegraph-manager remove <worktree>`. This
  removes its database, watcher state, and any CodeGraph-owned fallback hooks,
  then marks the registry metadata removed. Retain the original checkout's index.
- For an existing managed worktree record, the manager atomically maintains a
  `codegraph` object with `status`, `root`, `version`, and `lastCheckedAt`.
  Expected states are `indexed`, `absent`, and `removed`.

## Sandbox boundary

- In the standard workflow, agents edit on the host and use Docker Sandboxes
  only for runtime and service execution. Keep CodeGraph and its MCP daemon on
  the host against the mounted worktree.
- Do not start a second CodeGraph writer inside a sandbox against the host's
  `.codegraph/`. An agent intentionally running inside a sandbox needs a
  separately designed index directory and lifecycle before concurrent host and
  sandbox indexing is allowed.

## Local storage and privacy

- `$HOME/.config/git/ignore` contains `.codegraph/` and is configured as
  Git's global excludes file. Do not add `.codegraph` files to commits.
- CodeGraph telemetry is disabled. Do not enable it without the user's explicit
  request.
