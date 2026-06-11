# Requirements Check Template

Canonical schema owner: `../../checklists/requirements.md`.

The analyst emits this artifact next to `task_spec`. The orchestrator verifies
it before developer execution.

```yaml
requirements_check:
  status: ready | needs_analyst | needs_architect | needs_human
  blockers: []
  evidence: []
  unresolved_markers:
    open_questions: []
    human_actions: []
    escalation: []
```

## Fill Rules

- Use `ready` only when implementation can proceed without guessing.
- Use `needs_analyst` for unresolved requirements, scope, behavior,
  acceptance criteria, or product ambiguity that the analyst can resolve.
- Use `needs_architect` when technical shape must be decided first.
- Use `needs_human` when approval or human action blocks the next role.
