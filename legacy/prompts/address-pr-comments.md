# Address PR Comments

Use this prompt to handle PR review feedback until the PR has no unresolved
threads.

## Agent Task

1. Fetch GitHub review threads, not only top-level comments, review summaries,
   or check output.
2. Build a queue of unresolved, non-outdated threads.
3. For each thread, inspect the exact file/line and current code.
4. Decide whether the comment is valid, partially valid, already fixed, or a
   false positive.
5. For valid comments:
   - make the smallest correct fix;
   - run relevant local validation;
   - commit and push the fix;
   - wait for required checks when the repo expects that before resolving.
6. For false positives or already-fixed comments, gather concrete evidence.
7. Reply in the original review thread with the fix or reason.
8. Resolve the thread only after the reply is posted and the fix is pushed.
9. Verify there are no pending draft reviews under the active account.
10. Re-fetch review threads and repeat until unresolved count is zero.

## Reply Rules

- Reply in-thread, never as a new top-level PR comment.
- Keep replies concrete and short.
- Mention the commit when a fix was pushed.
- Mention validation evidence when relevant.
- Do not resolve a thread silently when a reviewer asked for a change.

## Acceptance

- No unresolved review threads remain.
- No pending draft review is accidentally created.
- CI and required checks pass.
- Sonar has zero unresolved new PR issues when Sonar is configured.
