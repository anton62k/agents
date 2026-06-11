# Sonar Zero Tolerance

Quality Gate passed is not enough.

Agents must inspect unresolved Sonar issues whenever Sonar is part of the repo.
A green Quality Gate can still coexist with issues that should be fixed before
merge.

## Rules

- Run local Sonar when token and scripts are available.
- In CI, run an explicit issue inspection step for PRs.
- Treat new unresolved issues as blockers.
- Fix issues instead of suppressing them unless the rule is demonstrably wrong.
- Document any intentional ignore in `sonar-project.properties` with a narrow
  scope and reason.

## Preferred Scripts

- `sonar:local` - upload local analysis.
- `sonar:issues:local` - query unresolved issues.
- `ci:local:sonar` - run local verify, Sonar analysis, then issue query.
