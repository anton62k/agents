# Roles

These are portable role definitions. They are intentionally thin at first. Deep
domain knowledge is added role by role through `references/` after real runs and
human approval.

## Base Roles

- `orchestrator` - routes the run, owns state and gates, never writes product
  code directly.
- `knowledge-engineer` - extracts role knowledge and maintains this method.
- `analyst` - turns a request into a grounded task spec, edge cases, and order.
- `developer` - implements or fixes code in a working tree.
- `reviewer` - adversarial read-only review; one voice in consensus.
- `integrator` - commits, pushes, and opens or updates PRs.
- `watcher` - classifies CI, Sonar, bot, and human review signals.
- `merger` - merges only when explicitly authorized for a run.
- `deploy-watcher` - verifies post-merge deployment.
- `qa-backend` - live backend QA through public/API surfaces.
- `qa-frontend` - browser QA for frontend workflows.

## Rule

Do not put local accounts, repo paths, tokens, or deployment coordinates in role
files. Use placeholders from `../method/env-boundary.md`.
