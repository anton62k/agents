# Bootstrap New Backend

Use this prompt to create a backend service repository.

## Required Inputs

- service responsibility;
- framework/runtime;
- database and migration strategy;
- API style;
- auth/internal auth model;
- deployment target;
- observability requirements;
- Sonar project key.

## Agent Task

1. Inspect repository state and conventions.
2. Create minimal service scaffold with health checks and configuration loading.
3. Add API contract docs and service passport.
4. Add unit/integration test strategy.
5. Add lint, format, typecheck/build, tests, local CI, and Sonar scripts.
6. Add CI workflow and deployment/release placeholders only when needed.
7. Document local development and required environment variables.

## Acceptance

- Local verify passes.
- Tests cover the first contract path.
- Config errors are explicit and recoverable.
- Sonar has zero unresolved new issues.
