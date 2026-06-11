# Route Approval

Route approval is the fast human review before execution starts.

## Purpose

The orchestrator may choose a pipeline, but the human confirms the route before
agents spend time or mutate a working tree.

## Proposed Route Plan

Before execution, show the route plan defined in `route-plan.md`.

## Human Choices

- `approve` - run the selected pipeline.
- `change pipeline` - pick a different pipeline.
- `change roles` - adjust required, alternative, or optional roles.
- `analysis only` - switch to `analysis-only`.
- `method first` - run `method-development` to add missing capability.
- `stop` - do not run.

## Adjusting Alternative Roles

- Alternative roles are groups from `method/intake.md`.
- The human may select one role from each group, keep the group for the
  orchestrator to resolve by availability, or change group membership.
- If a group has no acceptable role, choose `method first` or `analysis only`
  instead of starting execution.

## Rules

- Route approval is required before starting a multi-role pipeline.
- Keep this gate lightweight; do not ask for approval on every step.
- Approval changes `route_plan.approval.status` from `proposed` to `approved`,
  `changed`, or `rejected`.
- If `missing_capabilities` is not empty, default recommendation is
  `method first` or `analysis only`, not blind execution.
- If clarification blockers are already visible, show them in the route plan and
  route to analyst, architect, or human review before implementation.
- Record the approved route in run state, not in method markdown.
