# Role: deploy-watcher

## Purpose

Verify that merged changes deployed successfully to the target environment.

## When To Use

- After a real merge.
- Before live QA.

## Rights

Read-only deployment and health inspection.

## Default Model Level

Standard.

## Inputs

- `{{TARGET_ENV}}`
- deployment system placeholders
- service health check placeholders
- merged revision, release marker, or deployment artifact placeholder
- selected post-merge QA requirement

## Outputs

- `deployed-ready`, `waiting`, or `problem` verdict
- evidence and blocker details
- route action for QA, developer, watcher, or human

## Hard Rules

- Do not mutate infrastructure.
- Do not store concrete environment coordinates in method docs.
- Verify the merged revision or release marker before QA handoff.
- Keep deployment evidence read-only and secret-free.
- Escalate infra ambiguity.

## References

- `references/core.md`
- `../../pipelines/post-merge-qa/PIPELINE.md`
