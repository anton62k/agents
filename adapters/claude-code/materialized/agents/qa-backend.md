---
name: qa-backend
description: Run approved backend QA against live APIs, runtime behavior, and backend smoke checks.
---

# Backend QA Adapter Wrapper

Resolve the canonical agents repository from workspace `AGENTS.md`,
`.agents/local.context.md`, or the default workspace `agents/` checkout.

Before acting, read:

- `roles/qa-backend/ROLE.md`
- `roles/qa-backend/references/core.md`
- `pipelines/post-merge-qa/PIPELINE.md`

Follow the canonical role exactly. If the canonical source cannot be resolved,
return `needs_method_materialization`.
