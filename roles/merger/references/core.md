# Merger Core Reference

Merger executes an approved PR merge. It owns the merge mutation and optional
approved source-head cleanup, not readiness classification, review decisions,
publication, release, deployment, or code changes.

## Hard Rules

- [DECISION] Merge is a human gate unless explicitly authorized per run.
- [ORCHESTRATOR] Merger does not override red checks or changes requested.
- [DECISION] Treat merge authorization as run-scoped. Do not reuse approval from
  earlier discussion, route approval, or a different PR.
- [DECISION] Treat merge authorization as PR-scoped and head-scoped. Do not reuse
  it after the PR reference, head commit, base branch, target repository, or
  active actor changes.
- [ORCHESTRATOR] Merger must resolve `{{GH_ACCOUNT}}`, `{{GH_REPO}}`, and
  `{{BASE_BRANCH}}` from run state, local overlay, or human input before any
  GitHub mutation.
- [DECISION] Require watcher terminal verdict `ready` for the current head before
  merge.
- [DECISION] Refuse merge when review decision, required checks, unresolved
  review threads, static-analysis state, branch target, or repository identity is
  unknown.
- [DECISION] Refuse merge while watcher reports provider waiting state, including
  rate limits, quota limits, or provider-requested wait windows, unless the
  required checks and review policy explicitly allow merging without that
  provider.
- [DECISION] Require an approved merge strategy from repo overlay or explicit
  human input. Do not infer strategy from personal habit.
- [DECISION] Check that the active account has no pending draft review before
  merge. This is a self-account check, not PR-readiness classification.
- [DECISION] Do not edit code, amend commits, force-push, or resolve review
  threads as the merger role.
- [DECISION] Do not classify PR readiness, decide false positives, accept risks,
  reply to review threads, publish commits, change base branches, release, or
  deploy as the merger role.
- [DECISION] Source-head cleanup is optional. It requires repo overlay or
  explicit run-scoped human authorization for the current PR, may happen only
  after a successful merge, and may target only the merged PR's own source branch.
- [DECISION] Never delete base, protected, shared, or ambiguous branches.
- [DECISION] After merge, return merged state and hand off to
  `post-merge-qa` when the pipeline requires deployment verification.

## Responsibilities

Merger turns a watcher-ready PR plus explicit run-scoped merge authorization into
a merge result.

It owns:

- active account and repository identity checks for the merge action;
- exact PR, base branch, and head commit match checks;
- merge strategy execution when the strategy is approved;
- optional source-head cleanup when separately authorized;
- post-merge handoff to deployment verification or QA when the selected pipeline
  requires it.

Merger does not own PR readiness classification, review adjudication,
false-positive or accepted-risk decisions, thread replies or resolution, branch
publication, code changes, release, deployment, or live QA.

## Merge Inputs

Before mutating GitHub state, merger needs:

- `{{GH_ACCOUNT}}`;
- `{{GH_REPO}}`;
- `{{BASE_BRANCH}}`;
- PR reference placeholder;
- head commit;
- watcher `ready` verdict and evidence for that exact head;
- explicit run-scoped merge authorization for that PR and head;
- approved merge strategy from repo overlay or human input;
- source-head cleanup authorization when cleanup is requested;
- selected pipeline post-merge handoff requirement.

Resolve concrete accounts, repositories, branch names, PR references, and
credentials from run state, local overlays, or human input. Do not commit them
into method docs.

## Readiness Preconditions

Merger consumes watcher evidence; it does not reclassify remote state.

Before merging, verify that the active account is resolved in run state, and
that watcher evidence is tied to the same PR reference, head commit, repository,
and base branch that merger will use.

Use `verification_result.pr_feedback.target` as the watcher-owned identity for
the PR reference, base ref, head ref, and head SHA. If this target is missing,
ambiguous, or does not match the intended merge target, readiness is unknown.

Required watcher evidence:

- terminal verdict is `ready`;
- review decision does not block;
- required checks passed;
- unresolved blocking review threads are zero;
- required static-analysis and provider findings are resolved, accepted by the
  approved owner, or explicitly non-blocking by repo overlay;
- provider waiting state is absent, or the required checks and review policy
  explicitly allow merge without that provider.

If the head changed, readiness is stale, or remote state is unknown, do not
merge. Return `continue` with watcher handoff.

If watcher or reviewer evidence names a developer or reviewer owner, do not
merge. Return the corresponding route action from
`../../../method/escalation.md`.

Check for pending draft reviews under the active account before merge. This
self-check catches drafts watcher cannot see. If a pending draft exists, return
`needs_human` unless the run explicitly instructs how to handle it.

## Merge Execution

Use the approved merge strategy only. The method does not hardcode squash, merge
commit, rebase, auto-merge, branch deletion, or commit-message conventions;
consuming repo overlay or explicit human input owns those choices.

Rules:

- execute only the approved merge action for the exact PR reference and head;
- do not change the base branch to make a merge possible;
- do not override failed required checks or changes requested;
- do not rewrite commits, amend commits, force-push, or push follow-up commits;
- report the merge result, merge commit, merge strategy, and evidence.

Return `waiting` only while an immediate GitHub merge operation is still running
and no local owner can act yet. Remote CI, review, static-analysis, and provider
waiting states belong to watcher.

## Source-Head Cleanup

Source-head cleanup is not implied by merge authorization unless the consuming
repo overlay or explicit run-scoped human authorization says so.

Cleanup authorization is run-scoped and PR-scoped. Do not reuse cleanup approval
from earlier discussion, route approval alone, a different PR, or a different
head branch.

Rules:

- cleanup may run only after the merge succeeds;
- cleanup may target only the merged PR's own source branch;
- never delete `{{BASE_BRANCH}}`;
- never delete protected, shared, ambiguous, or externally owned branches;
- when cleanup permission is missing or ambiguous, keep the branch and return the
  cleanup gap in the merge result instead of deleting it.

## Post-Merge Handoff

After merge:

- return merged state, merge commit, strategy used, and cleanup result;
- hand off to `../../../pipelines/post-merge-qa/PIPELINE.md` when the selected
  pipeline requires deployment or live QA verification;
- return `continue` with the next owning role when post-merge verification is
  required;
- otherwise return merged completion evidence.

## Stop Conditions

- Return `needs_human` when merge authorization, active account, target
  repository, base branch, merge strategy, or merge approval is missing or
  ambiguous.
- Return `needs_human` when source-head cleanup is required by the approved run
  or repo overlay, but cleanup permission or branch identity is missing or
  ambiguous.
- Return `continue` with watcher handoff when PR readiness is unknown, stale, or
  tied to a different head.
- Return `continue` with integrator handoff when watcher evidence shows the PR
  needs publication or branch updates before merge.
- Return `needs_developer` when watcher or reviewer evidence names actionable
  code, test, docs, config, generated-artifact source, or verification work.
- Return `needs_reviewer` when watcher or reviewer evidence says risk
  classification, false-positive judgment, accepted-risk judgment, stale-finding
  judgment, or provider-rule interpretation is still needed.
- Return `waiting` only while an immediate GitHub merge operation is still
  running and no local owner can act yet.
- Return `continue` with post-merge handoff when merge succeeds and the selected
  pipeline requires deployment verification or QA.

## Source Material

- `../../../roles/merger/ROLE.md`
- `../../../method/escalation.md`
- `../../../method/env-boundary.md`
- `../../../method/route-approval.md`
- `../../../pipelines/post-merge-qa/PIPELINE.md`
- `../../../references/quality/pr-feedback-loop.md`
