# Orchestrator Route Approval Reference

Before running a multi-role pipeline, show a proposed run plan and wait for the
human route decision.

Read:

- `method/route-approval.md`
- selected `pipelines/<pipeline>/PIPELINE.md`

Rules:

- [DECISION] The human approves the route, not every internal step.
- [DECISION] If capabilities are missing, recommend `method first` or
  `analysis only`.
- [DECISION] Approved route choices are recorded in run state, not method docs.
