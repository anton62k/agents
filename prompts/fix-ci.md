# Fix CI

Use this prompt when a GitHub Actions check fails.

## Agent Task

1. Inspect the failing job log, not just the check name.
2. Reproduce locally when practical.
3. Fix the smallest valid cause.
4. Run relevant local validation.
5. Push and watch CI again.
6. If Sonar is involved, inspect issues, not only Quality Gate status.

## Acceptance

- Failed check is green after push.
- No unrelated files changed.
- Any review thread is answered in-thread if the fix responds to review feedback.
