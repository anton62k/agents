# Requirements Checklist

This checklist is the readiness gate for `task_spec`. It helps the analyst and
orchestrator decide whether implementation can proceed, architecture is needed,
or clarification must stop the run.

Fillable template: `../templates/artifacts/requirements-check.md`.
Escalation vocabulary owner: `../method/escalation.md`.

## When To Run

- [DECISION] Analyst runs this checklist before marking `task_spec` ready.
- [DECISION] Orchestrator reruns or verifies it before preparing
  `implementation_brief`.
- [DECISION] Reviewer may use it to check consistency between requirements,
  architecture, tasks, and code.

## Checklist

- [ ] Sources inspected and listed with why each source was used.
- [ ] Problem, goal, and desired behavior are clear.
- [ ] Scope has explicit in-scope and out-of-scope items.
- [ ] Current behavior is captured when the work changes existing behavior.
- [ ] Functional requirements are testable.
- [ ] Non-functional requirements are captured when relevant.
- [ ] User or operator flows are described when behavior crosses interactions.
- [ ] System flows are described when behavior crosses services or modules.
- [ ] Edge cases, constraints, and dependencies are visible.
- [ ] Acceptance criteria are concrete enough for review and tests.
- [ ] Human-action items are separated from code tasks.
- [ ] Open questions are either resolved or marked as blockers.
- [ ] `needs_architect` is true when the task needs boundary, contract,
  data-shape, runtime-flow, migration, quality-attribute, or ADR decisions.
- [ ] No blocking clarification markers remain before developer execution.

## Output

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

## Status Rules

- [DECISION] Use `ready` only when requirements are implementable without
  guessing and no blocking clarification markers remain.
- [DECISION] Use route stop actions according to `../method/escalation.md`.

## Clarification Markers

Blocking clarification markers are defined by `../method/escalation.md`.

Developer execution must not start while any blocking marker remains.
