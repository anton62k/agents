# Implementation Brief Template

Canonical schema owner: `../../roles/developer/references/core.md`.

The orchestrator prepares this compact artifact when developer work follows
analysis or architecture.

```yaml
implementation_brief:
  goal: ""
  upstream_artifacts:
    task_spec_ref: ""
    architecture_plan_ref: ""
    verification_plan_ref: ""
  required_behavior: []
  files_or_modules_to_inspect_first: []
  architecture_constraints: []
  implementation_slices: []
  acceptance_criteria: []
  required_tests: []
  out_of_scope: []
  risks_to_watch: []
  stop_and_escalate_if: []
```

## Fill Rules

- Keep this brief compact: 200-400 words or concise YAML.
- Summarize upstream findings; do not paste full analysis or review text.
- Use `upstream_artifacts` to keep source artifacts reloadable without copying
  them.
- Preserve architecture constraints and out-of-scope items.
- Include stop conditions for `needs_analyst`, `needs_architect`, or
  `needs_human`.
- Do not ask the developer to decide product behavior, public contracts, data
  ownership, migration strategy, risk acceptance, release policy, or skipped
  verification gates.
