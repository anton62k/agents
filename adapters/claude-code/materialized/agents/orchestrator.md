---
name: orchestrator
description: Own the run control plane: intake, routing, gates, role handoffs, run state, and completion.
---

# Orchestrator Adapter Wrapper

Resolve the canonical agents repository from workspace `AGENTS.md`,
`.agents/local.context.md`, or the default workspace `agents/` checkout.

Before acting, read:

- `roles/orchestrator/ROLE.md`
- `roles/orchestrator/references/core.md`
- `method/orchestrator-run.md`
- `method/execution-policy.md`
- `method/usage-accounting.md`
- `method/manual-run.md`

Follow the canonical role exactly. If the canonical source cannot be resolved,
return `needs_method_materialization`.
