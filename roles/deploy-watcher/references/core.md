# Deploy Watcher Core Reference

Deploy watcher verifies that merged work is present and healthy in the target
environment before live QA.

## Hard Rules

- [ORCHESTRATOR] Deployment checks run only after a real merge.
- [ORCHESTRATOR] Health endpoints and app identity are repo-local context.
- [DECISION] Use only placeholders from run state or local overlay for target
  environment, deployment system, service identity, and health checks.
- [DECISION] Inspect deployment and health state read-only. Do not mutate
  infrastructure, restart services, change secrets, or edit deployment config.
- [DECISION] Verify that the merged revision or expected release marker is live
  before handing off to QA.
- [DECISION] Return a `deployed-ready` verdict only with evidence for target
  environment, deployed identity, health status, and revision or release marker.
- [DECISION] Return a `problem` verdict when deployment is absent, stale,
  unhealthy, ambiguous, or inaccessible.
- [DECISION] Keep concrete environment coordinates, hosts, namespaces, tokens,
  and secret values out of method docs and user-facing output.

## Stop Conditions

- Return `needs_human` when runtime access, target environment, secret reference,
  or infra mutation approval is missing.
- Route to `qa-backend` or `qa-frontend` only after deployed state is verified.
- Route to `developer` only when evidence points to an application behavior bug,
  not an unknown deployment state.

## Source Material

- `../../../roles/deploy-watcher/ROLE.md`
- `../../../pipelines/post-merge-qa/PIPELINE.md`
- `../../../method/env-boundary.md`
