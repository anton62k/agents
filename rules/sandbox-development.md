# Sandbox development

Shared defaults for isolated development with Docker Sandboxes (`sbx`). Explicit
user instructions and applicable project or repository `AGENTS.md` files take
precedence. Load the project development rules whenever a Git worktree is used.

## Use the central workflow

- Use `$HOME/.local/bin/worktree-sandbox` by default. It provides `plan`,
  `create`, `up`, `exec`, `verify`, `status`, `stop`, and `remove` without adding
  infrastructure files to the repository.
- Start with `worktree-sandbox plan <worktree>` and inspect the detected runtime,
  services, commands, profile, ports, and readiness path before creation.
- Put project-specific settings in a local profile at
  `$HOME/.worktree/.profiles/<project>/<repo>/sandbox.toml`. Like the registry,
  it is machine state and is not versioned. Generated env, Compose, logs, PIDs,
  and lifecycle state belong under `$HOME/.worktree/.sandbox/<project>/<repo>/<task>`.
- Never add project profiles, launchers, fixtures, or scripts to `$HOME/.agents`.
  When a local profile is insufficient, discuss a repository-local workflow.
- Use a repository-local workflow only when the repository already has one or
  the team explicitly wants sandbox infrastructure versioned with the project.
  Do not add Dockerfiles, Compose files, scripts, or CI jobs merely to let the
  local agent use a sandbox.

## Decide when to use a sandbox

- Assess sandbox value while proposing the worktree. Recommend it with one
  concrete reason when the task runs the application, uses databases, Redis,
  queues or other stateful services, applies migrations, runs integration or
  end-to-end tests, needs specific runtime or system-library versions, risks
  local state, or can conflict with parallel tasks through ports or containers.
- Do not propose it for documentation, small static or configuration edits,
  formatting, isolated unit tests, or other work that does not benefit from a
  separate runtime. Do not add ceremony when an existing safe environment is
  already sufficient.
- Include the sandbox decision in the same startup proposal as worktree path,
  branch, and base. State either `Sandbox: proposed` with the reason or
  `Sandbox: unnecessary` with a short reason when the choice may otherwise be
  surprising. Do not ask for a second confirmation. Worktree consent covers the
  reversible sandbox described in that proposal.
- If the user already authorized the standard workflow, make the sandbox
  decision from these criteria, state the choice before creation, and proceed
  without another question. An applicable project rule or tested local
  profile can make sandbox use the project default.
- Keep ordinary CI independent of Docker Sandboxes. The sandbox runs the same
  repository verification gate locally; it does not need a dedicated CI job.
- If automatic detection is sufficient, no profile is required. Create a small
  local profile when service selection, commands, environment values,
  resources, application port, or readiness differs from the defaults.

## Keep one sandbox per worktree

- Derive the sandbox name from project, repository, task, and a hash of the
  absolute worktree path. Never share mutable VMs, Compose projects, databases,
  volumes, or caches between concurrent worktrees.
- Mount the host worktree read-write. Host edits become visible immediately in
  the sandbox, so copying source in either direction is unnecessary.
- Keep Git operations on the host. A linked worktree's `.git` file points to the
  original repository outside the mount; do not expose that Git administration
  directory merely to run Git inside the sandbox.
- Fixed service ports are safe inside separate sandbox VMs. Publish the
  application port ephemerally and discover its host mapping with `status`.

## Manage runtime and secrets

- Derive Node.js and pnpm from repository declarations and reuse versioned
  central templates. Templates contain toolchains only: no source, dependencies,
  secrets, database data, or task state.
- Prefer safe, deterministic profile values. Generated `sandbox.env` is mode
  600 and stays outside the repository. Do not print its contents or bake secrets
  into templates. Use copied project `.env` only when the task actually requires
  its credentials and the user-authorized environment is appropriate.
- `up` must be idempotent: ensure the VM and keepalive exist, start and health
  check services, install locked dependencies, migrate, build, start the app,
  and wait for readiness. `stop` preserves the VM filesystem and service data.
  `remove` deletes sandbox runtime state and leaves the worktree intact.

## Agent workflow

1. Create and register the worktree using the project development rules.
2. Run `worktree-sandbox plan <worktree>`. Add or adjust its local profile
   only when the plan is incomplete or unsafe.
3. Run `worktree-sandbox up <worktree>` and report the sandbox name and URL from
   `worktree-sandbox status <worktree>`.
4. Edit files on the host. Run application commands with
   `worktree-sandbox exec <worktree> -- <command>` and the full gate with
   `worktree-sandbox verify <worktree>`.
5. Commit, push, and deliver the PR through the normal host Git workflow. Use
   `stop` only for a short pause when preserving a warmed environment or local
   service state has concrete value.
6. After the required checks pass and the environment is no longer actively
   needed, run `worktree-sandbox remove <worktree>`. This normally happens after
   opening or updating a green PR, even though the worktree remains until merge.
   Recreate the sandbox if review requires more development.
7. Also remove it when work is abandoned or a PR is closed without merge unless
   the user explicitly asks to retain the environment. Always reconcile and
   remove any associated sandbox before removing the worktree.

Finish every task that used a sandbox with an explicit outcome: `removed`, or
`retained` with its name, worktree path, current status, and concrete reason.
Do not leave a stopped sandbox merely because its worktree is awaiting review.

Local `sbx` versions can stop a VM when no client session remains. Use the
central wrapper's discoverable host keepalive and verify observed state rather
than assuming detached Compose services keep it alive. Surface relevant log
tails on failure without dumping secrets or full logs.

## Registry metadata

For an existing managed worktree record, the central wrapper atomically updates
the `sandbox` object on create, up, status, stop, and remove. It records
`provider`, `name`, `status`, `template`, and `lastCheckedAt`. Allowed states are
`running`, `stopped`, `removed`, and `unknown`. The registry remains an inventory;
reconcile it with `sbx ls` before cleanup.

## Validate changes to the central workflow

Before calling a new runtime, service, or lifecycle implementation ready:

1. Create it from a clean worktree without a sandbox env file and confirm the
   repository stays clean.
2. Verify declared tool versions and cold and cached template creation.
3. Start services, migrate, build, and check readiness through the host port.
4. Run the repository's full verification gate inside the sandbox.
5. Stop and restart, then confirm expected state persists.
6. Run two worktree sandboxes concurrently and confirm distinct external ports,
   isolated data, and no internal port or Compose-name conflicts.
7. Exercise status, stop, and remove, including registry updates, and confirm
   removal leaves the Git worktree intact.

Record useful timings and version-specific behavior under
`$HOME/.worktree/.experiments`; do not add experimental reports to the
application repository.
