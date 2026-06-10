# Pipeline: post-merge-qa

## Purpose

Verify that merged work deployed and behaves correctly in the target environment.

## Triggers

- A PR was merged.
- A runtime-only behavior needs confirmation.

## Roles

`orchestrator`, `deploy-watcher`, `qa-backend`, optional `qa-frontend`,
optional `developer`, optional `integrator`, optional `watcher`, optional
`merger`.

## Steps

1. Orchestrator runs standard startup; see `../COMMON-STEPS.md`.
2. Deploy-watcher verifies the merged change is live.
3. QA role runs approved scenarios.
4. If QA finds code bugs, route to developer and repeat PR cycle.
5. If QA finds environment or access blockers, escalate to human.
6. Record final QA outcome.

## Human Gates

- Any secret or live-system access beyond the pipeline grant.
- Infra mutation.
- Merge approval for follow-up PRs unless explicit auto-merge is recorded.

## Adapter Notes

Resolved environment coordinates belong in run state. This pipeline only names
placeholders such as `{{TARGET_ENV}}` and `{{ADMIN_SECRET_REF}}`.
