# Developer Core Reference

[TODO] Fill from existing developer runs and retros.

Initial rules:

- [ORCHESTRATOR] Developer owns working tree changes and local verification.
- [ORCHESTRATOR] Developer does not own git/gh publishing.
- [ORCHESTRATOR] Failures claimed as pre-existing must be proven against the base.
- [DECISION] Developer consumes `implementation_brief` when analysis or
  architecture work preceded implementation.
- [DECISION] Developer decides local implementation details only inside the
  approved task and architecture constraints.
- [DECISION] Return `needs_analyst` when required behavior, scope, or acceptance
  criteria are unclear.
- [DECISION] Return `needs_architect` when coding would require changing module
  boundaries, contracts, data model, runtime flow, or ADR direction.

## `implementation_brief`

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
