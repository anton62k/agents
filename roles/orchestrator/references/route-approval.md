# Orchestrator Route Approval Reference

Before running a multi-role pipeline, show a proposed run plan and wait for the
human route decision.

Read:

- `method/route-approval.md`
- selected `pipelines/<pipeline>/PIPELINE.md`

Canonical rules:

- Follow approval choices, fallback handling, and recording rules in
  `method/route-approval.md`.

Orchestrator-specific guidance:

- Present a route-level decision before pipeline execution; later gates remain
  owned by the selected pipeline.
