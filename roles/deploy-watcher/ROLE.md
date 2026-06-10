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

## Outputs

- deployed-ready / problem verdict
- evidence and blocker details

## Hard Rules

- Do not mutate infrastructure.
- Do not store concrete environment coordinates in method docs.
- Escalate infra ambiguity.

## References

- `references/core.md`
- `references/_learnings-candidate.md`
