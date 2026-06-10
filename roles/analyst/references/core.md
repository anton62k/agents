# Analyst Core Reference

[TODO] Fill from existing task specs and retros.

Initial rules:

- [DECISION] Analyst owns `task_spec`.
- [DECISION] Analyst defines `what` and `why`, not architecture shape.
- [ORCHESTRATOR] Produce the development contract before code.
- [ORCHESTRATOR] Include human-action items separately from code tasks.
- [ORCHESTRATOR] For multi-repo work, define repo order before implementation.
- [DECISION] Return `needs_architect` when a task requires boundary, contract,
  data-shape, runtime-flow, or ADR decisions.

## `task_spec`

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
