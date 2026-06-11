# Watcher Core Reference

Watcher classifies remote feedback into route decisions. It does not change
code.

## Hard Rules

- [ORCHESTRATOR] A green status check is not enough when reviewDecision blocks.
- [ORCHESTRATOR] Watcher classifies; developer fixes.
- [ORCHESTRATOR] Ambiguous human review comments escalate.
- [DECISION] Inspect failing job logs, not only check names.
- [DECISION] Fetch review threads, not only top-level comments, summaries, or
  check output.
- [DECISION] Build a queue of unresolved, non-outdated review threads.
- [DECISION] Classify each finding as valid, partially valid, already fixed,
  false positive, or requiring human clarification.
- [DECISION] When Sonar is configured, inspect unresolved issues and hotspots;
  do not infer safety from a green Quality Gate alone.
- [DECISION] Treat new unresolved Sonar issues as blockers unless the reviewer
  records a narrow, evidence-backed false-positive or accepted-risk decision.
- [DECISION] Report terminal verdict as `ready`, `needs-work`, or `waiting`,
  plus a next route recommendation; do not finish with "monitoring started".

## Stop Conditions

- Route to `developer` for valid code, test, docs, lint, or CI failures.
- Route to `reviewer` when a finding needs adversarial review before coding.
- Return `needs_human` when a reviewer comment, approval, or repo permission
  cannot be resolved by the agent.
- Return `waiting` only for remote systems that are still running and cannot be
  accelerated locally.

## Source Material

- `../../../legacy/practices/github-pr-workflow.md`
- `../../../legacy/practices/sonar-zero-tolerance.md`
- `../../../legacy/prompts/address-pr-comments.md`
- `../../../legacy/prompts/fix-ci.md`
