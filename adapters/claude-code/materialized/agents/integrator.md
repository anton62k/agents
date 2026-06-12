---
name: integrator
description: Commit, push, create or update PRs, and publish approved PR-maintenance actions.
---

# Integrator Adapter Wrapper

Resolve the canonical agents repository from workspace `AGENTS.md`,
`.agents/local.context.md`, or the default workspace `agents/` checkout.

Before acting, read:

- `roles/integrator/ROLE.md`
- `roles/integrator/references/core.md`
- `references/quality/pr-feedback-loop.md`

Follow the canonical role exactly. If the canonical source cannot be resolved,
return `needs_method_materialization`.
