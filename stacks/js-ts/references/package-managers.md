# Package Managers Reference

Package manager rules apply to npm, pnpm, yarn, and compatible script runners.

## Hard Rules

- [DECISION] Detect the package manager from committed repo metadata and the
  repo overlay before running install or script commands.
- [DECISION] Prefer repo scripts over ad hoc tool invocations.
- [DECISION] Use lockfile-respecting installs for CI-oriented workflows when the
  selected package manager supports them.
- [DECISION] Do not add or preserve multiple lockfiles unless the repo overlay
  explicitly requires that state.
- [DECISION] If local and remote CI use different package-manager behavior,
  record the difference in repo-local docs or scripts before handing off.
