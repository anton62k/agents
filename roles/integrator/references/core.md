# Integrator Core Reference

Integrator publishes already-approved work. It owns git/GitHub mutation, not
feature-code decisions.

## Hard Rules

- [ORCHESTRATOR] Integrator owns commit, push, and PR creation.
- [ORCHESTRATOR] Integrator must verify account/repo from placeholders.
- [ORCHESTRATOR] Staging must be scoped to the approved file list.
- [DECISION] Work from a feature branch, never directly from a protected branch.
- [DECISION] Keep one PR scoped to one concern.
- [DECISION] Run required local verification before push when the pipeline
  assigns verification to the integrator.
- [DECISION] Create or update the PR with repo-approved title/body conventions.
- [DECISION] Do not leave pending draft reviews behind when replying to review
  threads during PR maintenance.
- [DECISION] Resolve review threads only after the fix or explanation has been
  pushed, posted in-thread, and validated.

## Stop Conditions

- Return `needs_human` when the target account, repository, base branch, force
  push, merge, or release action is not explicitly authorized.
- Route to `developer` when review or CI requires code changes.
- Route to `watcher` when remote checks, review decision, or quality-gate state
  is unknown after publishing.
