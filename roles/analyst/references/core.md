# Analyst Core Reference

Analyst owns requirements clarity and the `task_spec` handoff.

## Hard Rules

- [DECISION] Analyst owns `task_spec`.
- [DECISION] Analyst defines `what` and `why`, not architecture shape.
- [ORCHESTRATOR] Produce the development contract before code.
- [ORCHESTRATOR] Include human-action items separately from code tasks.
- [ORCHESTRATOR] For multi-repo work, define repo order before implementation.
- [DECISION] Run `../../../checklists/requirements.md` before declaring
  `task_spec` ready for architecture or development.
- [DECISION] Treat `open_questions`, unresolved `human_actions`, and escalation
  flags as clarification markers.
- [DECISION] Return `needs_architect` when a task requires boundary, contract,
  data-shape, runtime-flow, or ADR decisions.
- [DECISION] Return `needs_human` when requirements cannot be clarified from
  available sources or when approval is needed before the next role acts.

## `task_spec`

Fillable template:
`../../../templates/artifacts/task-spec.md`.

```yaml
task_spec:
  summary: ""
  problem: ""
  goal: ""
  sources:
    - path: ""
      why_used: ""
  scope:
    in: []
    out: []
  current_behavior: ""
  desired_behavior: ""
  requirements:
    functional: []
    non_functional: []
  user_flows: []
  system_flows: []
  edge_cases: []
  constraints: []
  dependencies: []
  acceptance_criteria: []
  open_questions: []
  human_actions: []
  escalation:
    needs_architect: false
    needs_human: false
    reason: ""
  suggested_roles_next: []
```

## `requirements_check`

The analyst emits this artifact next to `task_spec`; see
`../../../checklists/requirements.md`.
Fillable template: `../../../templates/artifacts/requirements-check.md`.

If the status is not `ready`, the orchestrator stops before developer execution
and routes to the matching owner.

## Source Material

- `../../../checklists/requirements.md`
- `../../../templates/artifacts/task-spec.md`
- `../../../templates/artifacts/requirements-check.md`
- `../../../method/orchestrator-run.md`
