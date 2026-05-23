# Address PR Comments

Use this prompt to handle PR review feedback.

## Agent Task

1. Fetch review threads, not only top-level comments.
2. For each unresolved thread, decide whether it is valid.
3. Fix valid comments with minimal changes.
4. Reply in the review thread with what changed or why no change is needed.
5. Resolve only after fix is pushed and validation passes.
6. Verify unresolved thread count is zero before reporting completion.

## Acceptance

- No unresolved review threads remain.
- No pending draft review is accidentally created.
- CI and Sonar checks pass.
