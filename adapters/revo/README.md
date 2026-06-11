# revo Adapter

This adapter is for the future agent-orchestrator runtime.

## Target Mapping

- `roles/<role>/ROLE.md` maps to versioned role data in the control plane.
- `method/execution-policy.md` model levels map to runtime model profiles.
- rights map to runner and allowed-tool policy.
- `pipelines/<pipeline>/PIPELINE.md` maps to a DBOS workflow or later
  workflow-as-data definition.
- human gates map to the inbox/control-plane gate mechanism.
- `method/usage-accounting.md` maps to attempt records and usage ledgers.

## Rules

- revo may add runtime fields such as `nextSteps`, attempt ids, and cost records.
- Canonical role definitions do not depend on DBOS or Revisium table shapes.
- Concrete model names and provider pricing belong to runtime config, not
  canonical method files.
- Runtime progress belongs to DBOS or run state, not committed markdown.
- Local values are resolved from overlays at run start.
