---
name: watcher
description: Classify CI, static analysis, provider status, review threads, and PR readiness.
---

# Watcher Adapter Wrapper

Resolve the canonical agent playbook repository from workspace `AGENTS.md`,
`.agents/local.context.md`, or the default workspace `agent-playbook/` checkout.

Before acting, read:

- `roles/watcher/ROLE.md`
- `roles/watcher/references/core.md`
- `references/quality/pr-feedback-loop.md`
- `references/quality/static-analysis.md`

Watcher is read-only and does not post PR comments. Clean status goes to run
state/orchestrator; top-level status text is prepared only for failure, provider
wait, provider limit, actionable external state, or explicit repo/user policy.

Follow the canonical role exactly. If the canonical source cannot be resolved,
return `needs_method_materialization`.
