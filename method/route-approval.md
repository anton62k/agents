# Route Approval

Route approval is the fast human review before execution starts.

## Purpose

The orchestrator may choose a pipeline, but the human confirms the route before
agents spend time or mutate a working tree.

## Proposed Run Plan

Show this before execution:

```yaml
request_summary: ""
selected_pipeline: ""
why: ""
execution_mode: codex | claude-code | revo-future
required_roles: []
optional_roles: []
surface: ""
stack: ""
frameworks: []
local_values_needed: []
missing_capabilities: []
human_gates: []
first_artifacts: []
```

## Human Choices

- `approve` - run the selected pipeline.
- `change pipeline` - pick a different pipeline.
- `change roles` - adjust required or optional roles.
- `analysis only` - switch to `analysis-only`.
- `method first` - run `method-development` to add missing capability.
- `stop` - do not run.

## Rules

- Route approval is required before starting a multi-role pipeline.
- Keep this gate lightweight; do not ask for approval on every step.
- If `missing_capabilities` is not empty, default recommendation is
  `method first` or `analysis only`, not blind execution.
- Record the approved route in run state, not in method markdown.
