# Orchestrator Core Reference

[TODO] Fill from existing `.agents/PIPELINE.md`, `RESULT-PROTOCOL.md`, and real
run retros.

Initial rules:

- [DECISION] Every multi-role run starts with intake, capability check, and
  human route approval.
- [ORCHESTRATOR] Route mutating actions to the owner role.
- [ORCHESTRATOR] Stop only at configured human gates or unresolved ambiguity.
- [ORCHESTRATOR] Treat run state as the source of truth, not chat memory.
