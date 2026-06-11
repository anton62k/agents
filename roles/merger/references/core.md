# Merger Core Reference

Merger executes a merge only after explicit authorization and a ready verdict.

## Hard Rules

- [DECISION] Merge is a human gate unless explicitly authorized per run.
- [ORCHESTRATOR] Merger does not override red checks or changes requested.
- [DECISION] Treat merge authorization as run-scoped. Do not reuse approval from
  earlier discussion, route approval, or a different PR.
- [DECISION] Require watcher `ready` verdict before merge.
- [DECISION] Refuse merge when review decision, required checks, unresolved
  review threads, static-analysis state, branch target, or repository identity is
  unknown.
- [DECISION] Refuse merge while watcher reports provider waiting state, including
  rate limits, quota limits, or provider-requested wait windows, unless the
  required checks and review policy explicitly allow merging without that
  provider.
- [DECISION] Do not edit code, amend commits, force-push, or resolve review
  threads as the merger role.
- [DECISION] After merge, return merged state and hand off to
  `post-merge-qa` when the pipeline requires deployment verification.

## Stop Conditions

- Return `needs_human` when merge authorization is missing or ambiguous.
- Route to `watcher` when PR readiness is unknown.
- Route to `integrator` when the PR needs publication or branch updates before
  merge.

## Source Material

- `../../../roles/merger/ROLE.md`
- `../../../method/route-approval.md`
- `../../../pipelines/post-merge-qa/PIPELINE.md`
- `../../../references/quality/pr-feedback-loop.md`
