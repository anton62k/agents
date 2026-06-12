# Escalation Vocabulary

This file owns route-blocking marker semantics. Roles, pipelines, checklists,
and artifact templates may point here and add local examples, but they must not
redefine these meanings.

## Route Stop Actions

- `needs_analyst` - requirements, scope, behavior, acceptance criteria, product
  ambiguity, or source contradictions must be resolved before the next role can
  act safely.
- `needs_architect` - requirements are clear enough, but technical shape,
  boundaries, contracts, data model, runtime flow, migration, quality
  attributes, or ADR direction must be decided before implementation.
- `needs_human` - human approval, external permission, product decision, major
  architecture or ADR approval, secret access, destructive action, merge, or
  deployment decision is required.
- `needs_method_materialization` - canonical method files or platform adapter
  wrappers cannot be resolved or are incompatible with the current consuming
  workspace setup.
- `stop` - the approved route should not continue and no narrower method-owned
  route stop action applies.

Use the smallest correct route stop action. Do not widen `needs_analyst` into
`needs_human` when the analyst can resolve the blocker from available sources.

## Operational Feedback Actions

These actions route feedback after execution has started. They are not
clarification markers by themselves:

- `needs_developer` - an actionable code, test, docs, generated-artifact, or
  config finding belongs to the developer or selected developer specialization.
- `needs_reviewer` - a finding needs risk classification, false-positive
  judgment, accepted-risk judgment, or adversarial review before developer work.
- `waiting` - a remote provider, CI system, review bot, deploy, or external
  process is still running or rate-limited and has no actionable local owner yet.
- `continue` - the current run can proceed to the next approved step.

Provider waiting states should include `resume_after` when the provider gives a
specific wait time.

## Related Route Approval Decisions

`method first` is a human route approval decision defined by
`route-approval.md`. It means the current request should run the
`method-development` pipeline before normal execution because method capability
is missing or too weak. It is not a role-emitted clarification marker.

## Blocking Clarification Markers

Developer execution must not start while any marker below is unresolved:

- unresolved `task_spec.open_questions`;
- unapproved `task_spec.human_actions`;
- `task_spec.escalation.needs_human`;
- `task_spec.escalation.needs_architect`;
- `architecture_plan.escalation.needs_analyst`;
- `architecture_plan.escalation.needs_human`;
- `requirements_check.status` other than `ready`;
- explicit `implementation_brief.stop_and_escalate_if` items;
- explicit `verification_plan.stop_and_escalate_if` items;
- missing required capabilities or unresolved alternative roles;
- local values required for the current step but not supplied in run state or an
  ignored local overlay;
- unresolved `needs_method_materialization`.

## Role Application

- Analyst returns `needs_architect` when technical shape must be decided before
  coding and returns `needs_human` when source-backed requirements or required
  approvals cannot be resolved by analysis.
- Architect returns `needs_analyst` when product intent, scope, domain rules, or
  acceptance criteria are unclear and returns `needs_human` when architecture,
  ADR, or risk approval is required.
- Developer returns `needs_analyst`, `needs_architect`, or `needs_human` instead
  of filling gaps outside the approved implementation boundary, and may return
  `needs_reviewer` when an implementation finding needs risk classification,
  false-positive judgment, accepted-risk judgment, or provider-rule
  interpretation before code should change.
- Watcher, QA, integrator, merger, and deploy roles may return `waiting`,
  `needs_developer`, `needs_reviewer`, or `needs_human` according to the feedback
  owner and gate status.

## Owner Rule

When adding a new route stop action or operational feedback action, update this
file first, then update route-plan, run-state, artifact templates, and validator
coverage in the same PR.
