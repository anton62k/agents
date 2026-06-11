# Quality Gates

## Local Primary Gate

- Command: TODO

## Changed-Surface Gates

- Typecheck: TODO / not applicable
- Lint: TODO / not applicable
- Tests: TODO / not applicable
- Build or package: TODO / not applicable
- Architecture or structure checks: TODO / not applicable

## Optional Static Analysis

- Configured providers: TODO / none
- Blocking status: TODO / optional / blocking / not configured
- Required before push: TODO / no
- Scope: TODO / changed code / full project / new code
- Local mode command: TODO / not available
- Hosted PR decoration: TODO / not available
- Issue-level access: TODO / required / best effort / unavailable
- Finding categories: TODO / security / reliability / maintainability /
  duplication / coverage / dependency risk / quality gate

Run locally only when credentials, provider config, and project access are
available. A green aggregate provider gate is not enough by itself when the
provider exposes issue-level findings; inspect unresolved new findings and fix
valid ones. Missing provider access is skipped or `needs_human`, not passed.

## Remote Gates

- CI provider: TODO
- Review threads: TODO
- Static-analysis PR decoration: TODO / not applicable
