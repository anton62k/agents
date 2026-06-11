# Artifact Templates

These templates are fillable copies of canonical run artifacts.

## Purpose

- Keep Codex, Claude Code, and future revo runs using the same artifact shapes.
- Make role handoffs compact and predictable.
- Keep concrete local values out of committed method files.

## Templates

- `route-plan.md` - route proposal and approval artifact.
- `run-state.md` - portable run-state snapshot.
- `task-spec.md` - analyst-owned requirements artifact.
- `requirements-check.md` - readiness gate for `task_spec`.
- `architecture-plan.md` - architect-owned technical-shape artifact.
- `implementation-brief.md` - compact developer handoff.

## Canonical Sources

The templates mirror schemas from these source files:

- `../../method/route-plan.md`;
- `../../method/orchestrator-run.md`;
- `../../roles/analyst/references/core.md`;
- `../../checklists/requirements.md`;
- `../../roles/architect/references/core.md`;
- `../../roles/developer/references/core.md`.

If a template conflicts with a canonical schema, the canonical schema wins.

## Rules

- Use placeholders for local paths, accounts, hosts, credentials, deployment
  targets, and environment-specific values.
- Store filled artifacts in chat, run state, or a consuming repo artifact
  location selected by the run.
- Do not copy filled run artifacts back into this repository.
- Keep templates adapter-neutral; Codex and Claude Code materialization may wrap
  them but must not rename canonical fields.
