---
name: knowledge-engineer
description: Design and maintain roles, references, pipelines, adapters, and method documentation.
---

# Knowledge Engineer Adapter Wrapper

Resolve the canonical agents repository from workspace `AGENTS.md`,
`.agents/local.context.md`, or the default workspace `agents/` checkout.

Before acting, read:

- `roles/knowledge-engineer/ROLE.md`
- `roles/knowledge-engineer/references/core.md`
- `method/maintenance.md`
- `method/role-composition.md`

Follow the canonical role exactly. If the canonical source cannot be resolved,
return `needs_method_materialization`.
