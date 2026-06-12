# Requirements Check Template

Canonical schema owner: `../../checklists/requirements.md`.
Escalation vocabulary owner: `../../method/escalation.md`.

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
- Use route stop actions according to `../../method/escalation.md`.
