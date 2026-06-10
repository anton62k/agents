# Pipeline: bugfix

## Purpose

Fix a known defect with enough analysis to avoid patching the wrong layer.

## Triggers

- User reports a bug.
- QA, watcher, CI, or review returns a concrete defect.

## Roles

`orchestrator`, `analyst` or `reviewer`, `developer`, `integrator`, `watcher`,
optional `architect`, optional `qa-backend` or `qa-frontend`.

## Steps

1. Orchestrator runs standard startup; see `../COMMON-STEPS.md`.
2. Reproduce or source-check the defect.
3. Define the minimal expected behavior and affected scope.
4. Optional architect checks boundary, contract, or data-shape impact for
   cross-module defects.
5. Developer fixes the defect and adds regression coverage where practical.
6. Reviewer verifies root cause, fix, and regression test.
7. Integrator publishes.
8. Watcher follows checks and review.
9. Optional QA verifies the live/user-facing path.

## Human Gates

- Missing reproduction with risky fix.
- Behavior/product decision.
- Merge approval unless explicitly authorized.

## Adapter Notes

Keep local values in overlays. Do not bake the reporter, account, target host, or
cluster into this pipeline.
