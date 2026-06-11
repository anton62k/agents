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
  surfaces: [] # backend | frontend | infra | docs | library | method | repo
  stack:
    primary: unknown
    secondary: []
  frameworks: []
  tooling:
    static_analysis: []
    structure_checks: []
    ci_providers: []
  verification_capabilities:
    primary_local_gate: available | missing | unknown
    typecheck: available | missing | unknown | not-applicable
    lint: available | missing | unknown | not-applicable
    tests: available | missing | unknown | not-applicable
    build_or_package: available | missing | unknown | not-applicable
    architecture_or_structure: available | missing | unknown | not-applicable
    static_analysis: configured | optional | unavailable | unknown
    remote_ci: available | missing | unknown
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
- Keep commands and provider-specific settings out of this route artifact unless
  they are placeholders copied from the consuming repo overlay.
- Do not set approval to `approved` until the human explicitly approves.
