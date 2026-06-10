# Orchestrator Capability Check Reference

Before route approval, verify that the method has the selected capabilities.

Read:

- `method/capability-check.md`
- `method/role-composition.md`

Rules:

- [DECISION] Missing required role, stack, pipeline, or adapter blocks automatic
  execution.
- [DECISION] Missing optional roles reduce coverage but do not block by default.
- [DECISION] Generic fallback for a missing specialization requires human route
  approval.
