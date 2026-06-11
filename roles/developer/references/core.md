# Developer Core Reference

Developer owns implementation inside approved requirements and architecture
constraints.

## Hard Rules

- [ORCHESTRATOR] Developer owns working tree changes and local verification.
- [ORCHESTRATOR] Developer does not own git/gh publishing.
- [ORCHESTRATOR] Failures claimed as pre-existing must be proven against the base.
- [DECISION] Developer consumes `implementation_brief` when analysis or
  architecture work preceded implementation.
- [DECISION] Developer decides local implementation details only inside the
  approved task and architecture constraints.
- [DECISION] Developer must not start implementation when `task_spec`,
  `requirements_check`, `architecture_plan`, or `implementation_brief` contains
  blocking clarification markers.
- [DECISION] Return `needs_analyst` when required behavior, scope, or acceptance
  criteria are unclear.
- [DECISION] Return `needs_architect` when coding would require changing module
  boundaries, contracts, data model, runtime flow, or ADR direction.
- [DECISION] Return `needs_human` when implementation requires approval for
  product ambiguity, significant architecture, secret access, destructive
  actions, merge, or deploy.

## `implementation_brief`

Fillable template:
`../../../templates/artifacts/implementation-brief.md`.

```yaml
implementation_brief:
  goal: ""
  required_behavior: []
  files_or_modules_to_inspect_first: []
  architecture_constraints: []
  implementation_slices: []
  acceptance_criteria: []
  required_tests: []
  risks_to_watch: []
  out_of_scope: []
  stop_and_escalate_if: []
```

## Clarification Gate

Before editing files, inspect the brief and upstream artifacts for unresolved
markers. If any marker blocks safe implementation, return the matching stop
state instead of guessing or widening scope.

## Source Material

- `../../../templates/artifacts/implementation-brief.md`
- `../../../checklists/requirements.md`
- `../../../method/orchestrator-run.md`
- `../../../method/role-composition.md`
