# Architecture Plan Template

Canonical schema owner: `../../roles/architect/references/core.md`.

The architect owns this artifact. It defines technical shape and constraints,
not product scope.

```yaml
architecture_plan:
  summary: ""
  decision_context: ""
  chosen_approach: ""
  alternatives_considered:
    - option: ""
      pros: []
      cons: []
      rejected_because: ""
  boundaries:
    modules: []
    ownership: []
  contracts:
    api: []
    events: []
    data: []
  data_model_changes: []
  migration_plan: []
  quality_attributes:
    performance: ""
    reliability: ""
    security: ""
    maintainability: ""
  risks: []
  implementation_slices: []
  test_strategy: []
  adr_candidate:
    needed: false
    title: ""
  escalation:
    needs_analyst: false
    needs_human: false
    reason: ""
```

## Fill Rules

- Keep requirements and acceptance criteria in `task_spec`.
- Use `implementation_slices` for sequencing, not exhaustive code steps.
- Set `adr_candidate.needed` for architecturally significant decisions.
- Set escalation flags instead of filling product or approval gaps.
