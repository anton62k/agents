# Route Plan Template

Canonical schema owner: `../../method/route-plan.md`.

Use this artifact after intake, discovery, and capability check, before route
approval.

```yaml
route_plan:
  request_summary: ""
  selected_pipeline: ""
  why: ""
  execution_mode: codex | claude-code | revo-future
  required_roles: []
  alternative_roles: []
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

## Fill Rules

- Include only placeholder names in `local_values_needed`.
- Keep `missing_capabilities` and `clarification_blockers` visible.
- Do not set approval to `approved` until the human explicitly approves.
