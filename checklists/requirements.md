# Requirements Checklist

This checklist is the readiness gate for `task_spec`. It helps the analyst and
orchestrator decide whether implementation can proceed, architecture is needed,
or clarification must stop the run.

Fillable template: `../templates/artifacts/requirements-check.md`.

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
- [DECISION] Use `needs_analyst` when the analyst must resolve requirements,
  scope, behavior, acceptance criteria, or product ambiguity from available
  sources.
- [DECISION] Use `needs_architect` when requirements are clear enough, but
  technical shape requires architecture work before implementation.
- [DECISION] Use `needs_human` when a human must approve a product,
  architecture, security, merge, deploy, secret, or destructive-action decision.

## Clarification Markers

Blocking clarification markers are:

- unresolved `task_spec.open_questions`;
- unapproved `task_spec.human_actions`;
- `task_spec.escalation.needs_human`;
- `task_spec.escalation.needs_architect`;
- `architecture_plan.escalation.needs_analyst`;
- `architecture_plan.escalation.needs_human`;
- missing required capabilities or unresolved alternative roles;
- local values required for the current step but not supplied in run state or an
  ignored local overlay.

Developer execution must not start while any blocking marker remains.
