---
name: agent-method
description: Run the canonical agent playbook from a workspace root; use for routing tasks, bootstrapping agents, or selecting roles and pipelines.
---

# Agent Method

Use this skill when the user asks to run the canonical agent playbook, choose a
pipeline, select roles, bootstrap a workspace, or continue a multi-role run.

## Steps

1. Resolve the canonical agent playbook repository from workspace `AGENTS.md`,
   `.agents/local.context.md`, or the default workspace `agent-playbook/` checkout.
2. Read `method/constitution.md`.
3. Read `method/manual-run.md`.
4. Read `method/execution-policy.md`.
5. Read `method/usage-accounting.md`.
6. Read `method/bootstrap.md` when setup or materialization is involved.
7. Read `method/materialization.md` before changing `.agents`, `.codex`, or
   `.claude` links.
8. Discover roles from `roles/INDEX.md`.
9. Discover pipelines from `pipelines/INDEX.md`.
10. When setup, method updates, role changes, pipeline invocation changes, or
    missing platform agents/skills are involved, run the materialization
    freshness check from `method/materialization.md` before declaring the
    workspace ready.
11. Use repo-local overlays for concrete commands, verification gates, review
   policy, domain facts, and environment boundaries.

If the canonical source cannot be resolved, return
`needs_method_materialization` and ask for the agents checkout location.
