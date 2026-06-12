# Package Managers Reference

Package manager rules apply to npm, pnpm, yarn, and compatible script runners.

## Hard Rules

- [DECISION] Detect the package manager from committed repo metadata and the
  repo overlay before running install or script commands.
- [DECISION] Prefer explicit package-manager metadata, lockfiles, workspace
  manifests, repo docs, and CI setup over habits from nearby repositories.
- [DECISION] Prefer repo scripts over ad hoc tool invocations.
- [DECISION] Use lockfile-respecting installs for CI-oriented workflows when the
  selected package manager supports them.
- [DECISION] Do not add or preserve multiple lockfiles unless the repo overlay
  explicitly requires that state.
- [DECISION] If local and remote CI use different package-manager behavior,
  record the difference in repo-local docs or scripts before handing off.
- [DECISION] If package-manager evidence conflicts and the safe runner is not
  obvious from repo docs or CI, stop with `needs_human`.

## Workspaces

- [DECISION] Identify the package scope before selecting install, test, build,
  or package gates.
- [DECISION] Use the repo-declared workspace runner and selectors instead of
  translating commands between package managers by memory.
- [DECISION] Run root-level aggregate scripts only when the repo contract says
  they are the intended verification gate for the touched package set.
