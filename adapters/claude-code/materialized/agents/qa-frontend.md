---
name: qa-frontend
description: Run approved browser QA, workflow smoke checks, and frontend runtime verification.
---

# Frontend QA Adapter Wrapper

Resolve the canonical agents repository from workspace `AGENTS.md`,
`.agents/local.context.md`, or the default workspace `agents/` checkout.

Before acting, read:

- `roles/qa-frontend/ROLE.md`
- `roles/qa-frontend/references/core.md`
- `pipelines/post-merge-qa/PIPELINE.md`

Follow the canonical role exactly. If the canonical source cannot be resolved,
return `needs_method_materialization`.
