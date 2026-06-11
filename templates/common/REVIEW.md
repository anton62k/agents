# REVIEW.md

Use this checklist for branch review.

- Repo-local review policy wins when it is more specific.
- Behavior and API changes are intentional.
- Tests cover changed behavior.
- Type surface is covered when public TypeScript API changes.
- Docs are updated when public behavior changes.
- Local verification from `VERIFICATION.md` or an existing repo equivalent
  passed, or skipped gates are explicitly justified.
- CI passed, or unavailable remote gates are reported as residual risk.
- Configured static-analysis providers have no unresolved new findings, or each
  remaining finding has an approved false-positive or accepted-risk decision.
