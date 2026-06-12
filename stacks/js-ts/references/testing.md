# Testing Reference

Testing scope should scale with product risk and blast radius.

## Hard Rules

- [DECISION] Prefer repo scripts and repo-local test commands over direct tool
  invocation.
- [DECISION] Select tests from the touched behavior surface first: API contract,
  state management, persistence, generated contract, package surface, browser
  workflow, or integration boundary.
- [DECISION] Run narrower checks while iterating, then run the full required
  gate before handoff when the pipeline requires it.
- [DECISION] When reporting validation, state whether the command was targeted
  or the full required gate.
- [DECISION] Do not report success when only a subset of required gates ran.
- [DECISION] Do not replace risky integration behavior with mocks only because a
  narrower unit test is easier. Use the repo's test kit or real dependency mode
  when the repo defines one for that boundary.

## Coverage By Surface

- [DECISION] Libraries need runtime tests for behavior, type tests for public
  TypeScript contracts, and package/build checks for exported files.
- [DECISION] Frontends need unit or component coverage for state, parsing, and
  reusable UI logic; critical browser-visible workflows need browser or e2e
  checks when risk warrants it.
- [DECISION] Backends need behavior coverage for API contracts, persistence,
  queues, auth boundaries, and risky migrations.
- [DECISION] Generated contract changes need at least one check that proves the
  generated consumer surface still matches the source schema or declaration
  surface.
