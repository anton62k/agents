# Worktree Sandbox

`worktree-sandbox` manages one Docker Sandbox per Git worktree without adding
files to the repository. It auto-detects Node.js and pnpm versions, reads an
optional external project profile, generates runtime state under
`$HOME/.worktree/.sandbox`, and mounts that state beside the worktree.

```bash
worktree-sandbox plan /path/to/worktree
worktree-sandbox create /path/to/worktree
worktree-sandbox up /path/to/worktree
worktree-sandbox exec /path/to/worktree -- pnpm test
worktree-sandbox verify /path/to/worktree
worktree-sandbox status /path/to/worktree
worktree-sandbox stop /path/to/worktree
worktree-sandbox remove /path/to/worktree
```

External profiles live at
`$HOME/.agents/projects/<project>/<repo>/sandbox.toml`. Generated env,
Compose, logs, and lifecycle state live at
`$HOME/.worktree/.sandbox/<project>/<repo>/<task>`.

The profile can define resources, PostgreSQL and Redis, setup/migration/build/
start/verify commands, application port and readiness, and safe environment
values. Without a profile the tool derives what it can from `.nvmrc` and
`package.json`.

Git stays on the host. Source edits are visible immediately inside the sandbox
through the worktree mount. If the worktree has a record under
`$HOME/.worktree/.registry`, lifecycle commands update its sandbox state
atomically.

`up` creates or resumes the sandbox, starts services, installs dependencies,
migrates, builds, launches the application, and waits for readiness. `stop`
preserves VM and database state. `remove` deletes runtime state while retaining
the Git worktree.
