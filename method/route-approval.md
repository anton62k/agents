# Route Approval

Route approval is the fast human review before execution starts.

## Purpose

The orchestrator may choose a pipeline, but the human confirms the route before
agents spend time or mutate a working tree.

## Proposed Route Plan

Before execution, show the route plan defined in `route-plan.md`.

## Approval Scope

Human approval is scoped to the last artifact or gate the orchestrator showed.

Route approval exists only when the latest pending gate is an explicit route
proposal that names the selected pipeline, roles, consensus policy, model
policy, budget policy, missing capabilities, `role_action_fallbacks`, and human
gates.

[DECISION] A generic `approve` authorizes only the route and role-action
fallbacks shown in the immediately preceding proposed route. It does not
authorize hidden, unstated, or later-added main-session fallbacks for role-owned
actions.

If the human approves a work order, plan, task spec, architecture note, review
finding, or any other non-route artifact, treat that approval as permission to
continue routing. It does not authorize pipeline execution or working-tree
mutation. The orchestrator must still show the proposed route and wait for route
approval before execution starts.

## Human Choices

- `approve` - run the selected pipeline with only the shown role-action
  fallbacks, if any.
- `change pipeline` - pick a different pipeline.
- `change roles` - adjust required, alternative, or optional roles.
- `change models` - change recommended model levels or concrete local model
  bindings.
- `change consensus` - change reviewer consensus mode or providers.
- `set budget` - set or change iteration, token, or reported-cost limits.
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
- `approve` means route approval only when the immediately preceding assistant
  message contained the explicit proposed route gate.
- [DECISION] `approve` authorizes only `role_action_fallbacks` shown in that
  proposed route. New or changed fallbacks require a refreshed route plan and a
  new route approval.
- If the immediately preceding gate was not a proposed route, continue to route
  planning and ask for route approval instead of starting execution.
- Keep this gate lightweight; do not ask for approval on every step.
- Approval changes `route_plan.approval.status` from `proposed` to `approved`,
  `changed`, or `rejected`.
- If `missing_capabilities` is not empty, default recommendation is
  `method first` or `analysis only`, not blind execution.
- If clarification blockers are already visible, show them in the route plan and
  route to analyst, architect, or human review before implementation.
- If model, consensus, or budget choices change, regenerate route plan and rerun
  capability check before execution.
- Record the approved route in run state, not in method markdown.
