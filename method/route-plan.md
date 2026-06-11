# Route Plan And Run State

The route plan is the stable contract between intake, discovery, capability
check, route approval, and pipeline execution.

## Route Plan Schema

```yaml
route_plan:
  request_summary: ""
  selected_pipeline: ""
  why: ""
  execution_mode: codex | claude-code | revo-future
  required_roles: []
  alternative_roles: [] # structure is defined in method/intake.md
  optional_roles: []
  surface: backend | frontend | infra | docs | library | method | repo | unknown
  stack: js-ts | unknown
  frameworks: []
  local_values_needed: []
  missing_capabilities: []
  clarification_blockers: []
  human_gates: []
  first_artifacts: []
  approval:
    status: proposed | approved | changed | rejected
    decision: >
      approve | change pipeline | change roles | analysis only |
      method first | stop
    notes: ""
```

## Manual Run State

Manual Codex or Claude Code runs may keep run state in chat or in a run artifact
when the consuming repo asks for one. Future revo runs should store the same
fields in runtime state.

```yaml
run_state:
  run_id: "{{RUN_ID}}"
  route_plan: {}
  current_pipeline_step: ""
  gates:
    - id: route-approval
      status: open | approved | rejected
      decision: ""
    - id: clarification
      status: open | cleared | blocked
      decision: needs_analyst | needs_architect | needs_human | ""
  artifacts: []
  blockers: []
```

## Rules

- Do not start mutating pipeline steps until `approval.status` is `approved`.
- If the human changes the pipeline or roles, regenerate the route plan and rerun
  capability check before execution.
- If `missing_capabilities` contains blocking items, recommend `method first` or
  `analysis only`.
- If `clarification_blockers` contains blocking items, stop with
  `needs_analyst`, `needs_architect`, or `needs_human`.
- Store resolved local values only in run state, never in committed method docs.
- Keep this schema portable; adapters may wrap it but must not rename canonical
  fields.
