# VERIFICATION.md

This file is the recommended repo-local verification contract for agents.

It records exact checks for this repository. If this repository already has an
equivalent document, for example `docs/quality-gates.md`, link to it here and do
not duplicate the rules.

## Status

- Recommended: yes
- Required to exist in every repository: no
- Existing repo-specific verification docs override this template.

If this file is absent or incomplete, agents should discover checks from
package/build scripts, CI workflows, static-analysis config, and source layout,
then report any remaining uncertainty in the verification plan.

## Primary Local Gate

- Command: TODO / not configured
- When to run: TODO
- Expected evidence: command output summary in `verification_result`

## Required Local Gates

- Typecheck: TODO / not applicable
- Lint: TODO / not applicable
- Tests: TODO / not applicable
- Build or package: TODO / not applicable

## Conditional Gates

Run these only when the touched surface makes them relevant.

- Frontend structure checks: TODO / not applicable
- Backend contract or integration tests: TODO / not applicable
- Database migration checks: TODO / not applicable
- Package/type-surface checks: TODO / not applicable
- Documentation checks: TODO / not applicable
- Infrastructure checks: TODO / not applicable

## Static Analysis

- Providers: TODO / none
- Required before push: TODO / no
- Local mode: TODO / not available
- Hosted PR decoration: TODO / not available

Configured static analysis is optional unless this repository declares it
blocking and the environment has the required access. Missing credentials or
project access must be reported as skipped or `needs_human`, not as passed.

## Remote Gates

- CI provider: TODO / none
- Blocking jobs: TODO
- Non-blocking jobs: TODO
- Required review threads: TODO
- Required deployment or preview checks: TODO / not applicable

## Rules

- Use exact commands from this file when they are present.
- If commands here disagree with current scripts or CI, report the mismatch and
  prefer the repo's current overlay after human approval.
- Do not store tokens, account names, machine paths, hosts, namespaces, or other
  concrete environment values in this file.
- Record what was actually run in `verification_result`; do not claim unrun
  gates passed.
