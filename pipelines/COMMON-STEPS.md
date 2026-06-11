# Pipeline Common Steps

This file defines reusable pipeline steps. Pipeline-specific files link here
instead of restating the same orchestration gates.

## Standard Startup

Every multi-role pipeline starts with the orchestrator running:

1. Constitution: see `../method/constitution.md`.
2. Run lifecycle: see `../method/orchestrator-run.md`.
3. Intake: see `../method/intake.md`.
4. Discovery: see `../method/discovery.md`.
5. Capability check: see `../method/capability-check.md`.
6. Route plan: see `../method/route-plan.md`.
7. Route approval: see `../method/route-approval.md`.

The selected pipeline continues only after the route is approved or changed by
the human.

## Standard Human Gate

Route approval before execution is defined in `../method/route-approval.md`.
Pipeline files should list only gates that are specific to that pipeline.

## Standard Clarification Gate

Before developer execution, the orchestrator checks
`../checklists/requirements.md` and any role escalation fields. The pipeline
continues only when blocking clarification markers are resolved.

## Standard Verification Planning

Before developer execution, the orchestrator prepares `verification_plan` from
route capabilities, repo-local quality docs, selected stack references, selected
tooling references, and upstream risk notes.

Developer and watcher results should be reported through `verification_result`
or an equivalent run-state field.
