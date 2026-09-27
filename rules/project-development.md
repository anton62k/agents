# Project development

Shared defaults for development in Git repositories. Explicit user instructions
take precedence. Project and repository AGENTS.md files can supply project
identity, repository layout, setup commands, and more specific conventions.

## Discover the project and repository

- By default, a directory directly under `$HOME` is a project. Its contents
  can be repositories or groups containing nested repositories. The project
  directory itself can also be a repository.
- Prefer project identity and layout declared in applicable AGENTS.md files over
  inference from the directory structure. Read applicable instructions before
  changing code, including instructions for the affected subdirectories.
- Identify the actual Git repository root rather than assuming that every
  directory is a repository. For an existing managed worktree, use its registry
  record and Git metadata to find the original repository and project.
- Store worktrees at `$HOME/.worktree/<project>/<repo>/<task>`.
  Use filesystem-safe names. Include the enclosing group in <repo> when needed
  to distinguish repositories with the same name; never reuse another
  repository's directory or registry entry.
- `$HOME/.worktree` is local infrastructure, not a project or a Git repository.

## Obtain worktree consent

- New development tasks use a separate worktree and task branch by default.
  Read-only investigation and discussion do not require a worktree.
- Before presenting the worktree proposal, assess whether the task would benefit
  from an isolated sandbox under the sandbox development rules. Include
  `Sandbox: proposed` with a concrete reason or `Sandbox: unnecessary` with a
  short reason in the same proposal. Do not request separate confirmation for
  the described reversible sandbox.
- Before creating a worktree or beginning code changes, present the concrete
  worktree path, branch name, and remote/default base branch, and ask the user to
  confirm. Read-only investigation and planning can continue while awaiting an
  answer; silence is not consent.
- An explicit request to create a worktree, or wording such as "develop as usual"
  or "use the standard workflow" already authorizes
  this workflow. Do not ask again when authorization exists in the conversation.
  An ordinary request such as "fix this bug" alone does not waive this question.
- Consent persists for the same task across messages and resumed work. Reuse the
  task's existing worktree; do not create a new one for each turn. An explicit
  instruction to use the current branch or checkout overrides the default.

## Create the worktree

- Determine the authoritative remote and its current default branch; do not
  assume origin, main, or master when repository configuration says otherwise.
- Fetch that remote and create a new task branch and worktree from the freshly
  fetched remote-tracking default branch. Record the base commit. Updating the
  original checkout's local default branch with checkout/pull is unnecessary.
- If the remote/default branch is ambiguous or fetching fails, explain the
  obstacle and resolve it before proceeding; do not silently use a stale base.
- Use one task branch and worktree per affected repository. Continuing a task
  does not reset, rebase, or otherwise update its branch automatically.
- Preserve the original checkout and other tasks. Do not automatically stash,
  reset, move uncommitted changes, overwrite an existing path, or remove another
  worktree to resolve a naming collision.
- Report the selected worktree path and branch when development begins. Run
  task-specific edits, dependency setup, and checks in that worktree.
- For a worktree containing supported source code, follow the CodeGraph rules
  after creation and before structural exploration. Do not copy another
  checkout's index.

## Copy ignored files and install dependencies

- By default, copy Git-ignored files from the source checkout into the new
  worktree, preserving relative paths. This includes .env and other ignored local
  configuration. Exclude node_modules directories at every nesting level and
  exclude `.codegraph/`; every code worktree gets a fresh worktree-local index.
- Honor additional copy exclusions in the project's AGENTS.md. Use Git's ignore
  rules to discover ignored files; do not treat every untracked file as ignored.
- Make independent copies, not shared writable symlinks or hard links. Do not
  follow source symlinks into external directories, copy Git administration data,
  or overwrite tracked files in the new worktree. Surface unresolved copy errors
  or conflicts before claiming setup is complete.
- Never print secret contents or store them in registry records. Copying ignored
  files does not authorize adding them to Git.
- Install dependencies using the project's declared package manager, lockfile,
  and AGENTS.md instructions. Prefer pnpm for new projects; do not automatically
  migrate existing projects. For pnpm projects, use pnpm install --frozen-lockfile
  unless the task requires dependency or lockfile changes.

## Maintain the local registry

Use one JSON record per worktree, outside the code checkout:

```text
$HOME/.worktree/
├── .registry/
│   ├── <project>/<repo>/<task>.json
│   └── .archive/<project>/<repo>/<task>--<removed-timestamp>.json
└── <project>/<repo>/<task>/
```

- Do not create a central registry.json or a second authoritative index.
  Aggregate individual records when a project or global overview is needed.
- Each record contains: version, id, project, repository (absolute original
  repository path), path (absolute worktree path), task, branch, base (remote,
  branch, commit), status, retentionReason, createdAt, lastActivityAt,
  lastCheckedAt, pr (null or an object with url, state, mergedAt), optional
  sandbox and CodeGraph metadata, and removedAt. Their metadata is defined by
  the corresponding topic rules. Use UTC ISO 8601 timestamps and null for
  values not yet applicable.
- Status is one of active, awaiting_merge, retained, cleanup_pending, or removed.
  Record why a worktree is retained, such as a paused task, no PR, a PR closed
  without merge, or remaining local work.
- Register a worktree when created. Update its record as work progresses, a PR
  is created or checked, or its lifecycle changes. Keep incomplete setup visible
  in the record rather than leaving an unregistered worktree behind.
- lastActivityAt records actual task work; lastCheckedAt records inspection of
  the worktree and PR. A periodic inspection must not make an inactive task
  appear recently worked on.
- Write records atomically and coordinate concurrent updates to the same record
  with a per-record lock covering read/modify/write and archive transitions.
  Different task records can be updated independently.
- The registry is an inventory, not proof that deletion is safe. Reconcile it
  with Git's worktree list, filesystem state, and current PR/merge state before
  lifecycle actions. Treat discrepancies or long inactivity as reasons to
  investigate a possibly stale worktree, never as automatic deletion criteria.

## Complete work and clean up

- Run checks appropriate to the change and report their results. Creating a
  worktree does not itself authorize commits, pushing, or opening a PR; follow
  the user's task instructions and applicable project workflow for those actions.
- Always finish with an explicit worktree outcome: removed after merge, or
  retained with its absolute path, branch, and reason. This applies even when
  no PR was created or the user decided against a PR.
- Confirm that the task's changes were merged before automatically removing its
  worktree. A closed PR alone is insufficient. Account for squash/rebase merges
  using the hosting service's merge evidence rather than ancestry alone.
- If merge is unconfirmed, retain the worktree. Once merge is confirmed, cleanup
  is the default and requires no new permission unless unresolved local work
  needs a user decision.
- Before removal, check for additional commits, uncommitted or untracked work,
  and unique or changed ignored files. Preserve unresolved local work and report
  why cleanup is pending. Do not blindly force-remove a worktree because its PR
  was merged. Known disposable installation output or unchanged setup copies
  need not prevent cleanup once verified.
- Remove a worktree-local CodeGraph index through `codegraph-manager remove`
  before removing its worktree. A missing index is already clean and must not
  block removal. Never remove the persistent index of the original checkout as
  part of worktree cleanup.
- Remove eligible worktrees through Git's worktree management. Only after
  successful removal set status to removed and removedAt to the actual removal
  time, then move the record into .registry/.archive/<project>/<repo>/ using a
  filesystem-safe UTC timestamp in its filename. Avoid archive name collisions.
  Keep failed removals visible as cleanup_pending with the reason.
- Retain archived records for 90 days from removedAt. Periodic cleanup may
  delete only archive records older than that limit; it must never delete live
  worktrees or their records based on age. Leave malformed or ambiguous records
  for review.
- Registry updates and merge checks happen during task work or an explicit
  maintenance run. A registry alone does not provide background monitoring.
  Cron or a systemd timer can be configured separately; these rules do not
  themselves install scheduled automation.
