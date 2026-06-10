# Pipeline Common Steps

This file defines reusable pipeline steps. Pipeline-specific files link here
instead of restating the same orchestration gates.

## Standard Startup

Every multi-role pipeline starts with the orchestrator running:

1. Intake: see `../method/intake.md`.
2. Capability check: see `../method/capability-check.md`.
3. Route approval: see `../method/route-approval.md`.

The selected pipeline continues only after the route is approved or changed by
the human.

## Standard Human Gate

Route approval before execution is defined in `../method/route-approval.md`.
Pipeline files should list only gates that are specific to that pipeline.
