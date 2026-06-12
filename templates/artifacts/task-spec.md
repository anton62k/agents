# Task Spec Template

Canonical schema owner: `../../roles/analyst/references/core.md`.
Escalation vocabulary owner: `../../method/escalation.md`.

The analyst owns this artifact. It defines what should change, why it matters,
and how readiness will be judged.

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

## Fill Rules

- Ground `sources` in inspected files, docs, run artifacts, or external sources.
- Keep product ambiguity in `open_questions`, not hidden in prose.
- Put human work in `human_actions`, not mixed into developer tasks.
- Set escalation flags according to `../../method/escalation.md`.
