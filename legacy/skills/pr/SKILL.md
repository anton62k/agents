---
name: pr
description: End-to-end pull request workflow for validation, review, push, CI, review threads, and merge readiness.
---

# PR Skill

Use for scoped PR work from local branch to merge-ready PR.

## Rules

- Work on a feature branch, not directly on a protected branch.
- Run local validation before pushing when the repository defines it.
- Watch CI after every push.
- Treat review threads as the real feedback queue. Top-level comments and review
  summaries are not enough.
- Reply inside the review thread, not as a top-level PR comment.
- Resolve a thread only after the fix is pushed and validation is green, or after
  a clear technical explanation is posted for a false positive.
- Verify no pending draft review was accidentally created.
- Report completion only when checks are green and unresolved review threads are
  zero.

## Workflow

1. Confirm repository, branch, base branch, and worktree state.
2. Inspect package scripts and repo-local agent docs.
3. Run targeted validation while fixing, then full local validation before
   commit.
4. Self-review the branch diff against the base branch.
5. Commit intentionally with a scoped message.
6. Push the branch and create or update the PR.
7. Watch CI/checks until pass/fail is known.
8. Fetch review threads through GitHub review-thread APIs.
9. For every unresolved thread:
   - decide whether the finding is valid;
   - fix valid findings with minimal changes;
   - rerun relevant validation;
   - commit and push when code/docs changed;
   - reply in the specific thread;
   - resolve the thread after the fix or explanation is present.
10. Re-fetch review threads and pending reviews.
11. Leave the PR only when CI is green and unresolved threads are zero.

## Thread Reply Contract

Use the direct review-comment reply endpoint or an equivalent tool that posts
inside the existing thread immediately. Do not use APIs that create a pending
review draft unless the task explicitly asks for a draft review.

A good thread reply is short:

```text
Fixed in <commit>: <what changed>. Validation: <command/check> passed.
```

For false positives:

```text
No code change: <technical reason>. Verified against <file/test/command>.
```
