# Orchestrator Capability Check Reference

Before route approval, verify that the method has the selected capabilities.

Read:

- `method/capability-check.md`
- `method/role-composition.md`

Canonical rules:

- Follow required, optional, and fallback capability handling in
  `method/capability-check.md`.

Orchestrator-specific guidance:

- Surface missing or weak capabilities in the proposed run plan; do not silently
  drop required roles or references.
