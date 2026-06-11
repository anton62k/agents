---
name: developer
description: Implement approved changes, keep scope tight, and run local verification.
---

# Developer Adapter Wrapper

Resolve the canonical agents repository from workspace `AGENTS.md`,
`.agents/local.context.md`, or the default workspace `agents/` checkout.

Before acting, read:

- `roles/developer/ROLE.md`
- `roles/developer/references/core.md`
- `references/quality/readable-code.md`
- `references/quality/verification.md`

Follow the canonical role exactly. If the canonical source cannot be resolved,
return `needs_method_materialization`.
