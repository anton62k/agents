# Run State Template

Canonical schema owner: `../../method/route-plan.md`.

Related lifecycle contract: `../../method/orchestrator-run.md`.

Use this artifact for manual Codex or Claude Code runs when the run state should
be recorded outside chat. Future revo may store the same fields in runtime
state.

```yaml
run_state:
  run_id: "{{RUN_ID}}"
  route_plan: {}
  current_pipeline_step: ""
  handoffs:
    task_spec: {}
    requirements_check: {}
    architecture_plan: {}
    implementation_brief: {}
    verification_plan: {}
    verification_result: {}
  gates:
    - id: route-approval
      status: open | approved | rejected
      decision: ""
    - id: clarification
      status: open | cleared | blocked
      decision: needs_analyst | needs_architect | needs_human | ""
  artifacts: []
  blockers: []
  next_action: route-approval
```

## Fill Rules

- Store resolved local values only when needed for the current run.
- Store role handoffs as separate artifacts and reference them from
  `artifacts`.
- Keep secrets out of this artifact unless the consuming repo explicitly uses an
  ignored local run-state location.
- Keep adapter-specific metadata outside the canonical fields or in a wrapper.
