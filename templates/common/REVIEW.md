# REVIEW.md

Use this checklist for branch review.

- Behavior and API changes are intentional.
- Tests cover changed behavior.
- Type surface is covered when public TypeScript API changes.
- Docs are updated when public behavior changes.
- Local verify passed.
- CI passed.
- Configured static-analysis providers have no unresolved new findings, or each
  remaining finding has an approved false-positive or accepted-risk decision.
