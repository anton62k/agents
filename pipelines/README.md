# Pipelines

Portable pipelines define role order, state artifacts, gates, and handoffs.

The current base is deliberately small:

- `feature-development` - full spec to PR, with review and watcher loops.
- `bugfix` - reproduce, patch, review, PR.
- `analysis-only` - read-only investigation and recommendation.
- `post-merge-qa` - deploy verification and live QA loop.

Runtime values use placeholders and are resolved per run.
