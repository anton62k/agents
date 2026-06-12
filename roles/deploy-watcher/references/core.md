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
- [DECISION] Return `waiting` when deployment is still progressing and no local
  owner can act yet. Include `resume_after` when the provider gives a useful
  wait time.
- [DECISION] Route to developer or the selected developer specialization only
  when deployment evidence points to an application behavior bug in the merged
  change. Unknown deployment state belongs to `waiting`, `problem`, or
  `needs_human`.

## Verification Inputs

Before inspection, deploy-watcher needs:

- `{{TARGET_ENV}}`;
- deployment system placeholder;
- service identity placeholder;
- health check placeholder;
- merged revision, release marker, image tag, package version, or equivalent
  deployment artifact placeholder;
- selected QA handoff requirement from the run or pipeline.

Concrete environment values must come from run state or ignored local overlays.
Do not add them to method files.

## Inspection Sequence

Use the narrowest read-only evidence that can prove deployment state:

1. Confirm the target environment and service identity are resolved.
2. Confirm the merged revision, release marker, or deployment artifact expected
   by the run.
3. Inspect deployment rollout or release state read-only.
4. Inspect service health, readiness, or smoke endpoint state read-only.
5. Compare live revision with expected revision.
6. Return the verdict and next route action.

Do not run QA scenarios until the deployed state is verified.

## Result Contract

Return a compact deployment result:

```yaml
deploy_watcher_result:
  verdict: deployed-ready | waiting | problem
  target_env: "{{TARGET_ENV}}"
  expected_revision: ""
  observed_revision: ""
  health_evidence: []
  blockers: []
  resume_after: ""
  next_route_action: continue
```

Use `next_route_action` from `../../../method/escalation.md`. For a ready
deployment, `continue` routes to the selected QA role. For inaccessible,
ambiguous, or permission-blocked deployment state, use `needs_human` unless a
provider wait state is the only blocker.

## Stop Conditions

- Return `needs_human` when runtime access, target environment, secret reference,
  or infra mutation approval is missing.
- Return `waiting` when the deploy provider is still rolling out or rate-limited
  and no local owner can act yet.
- Route to `qa-backend` or `qa-frontend` only after deployed state is verified.
- Route to `developer` or the selected developer specialization only when
  evidence points to an application behavior bug, not an unknown deployment
  state.

## Source Material

- `../../../roles/deploy-watcher/ROLE.md`
- `../../../pipelines/post-merge-qa/PIPELINE.md`
- `../../../method/env-boundary.md`
- `../../../method/escalation.md`
