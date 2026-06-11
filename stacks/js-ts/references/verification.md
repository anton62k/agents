# JavaScript And TypeScript Verification Reference

This reference translates the generic verification contract into JS/TS
ecosystem candidates. It does not make JS/TS, npm, Sonar, FSD, or any tool a
default for all repositories.

## Source Priority

Use evidence in this order:

1. `VERIFICATION.md` or an existing repo-specific equivalent.
2. `package.json` scripts at the selected repo or workspace root.
3. Lockfiles and package-manager metadata.
4. CI workflow definitions and static-analysis config.
5. Source layout and framework config.

Exact commands must come from the repo overlay, scripts, or approved human
input. Script names below are discovery hints, not commands to invent.

## Default Repo Contract

- [DECISION] Start with `VERIFICATION.md` or the repo-declared equivalent. This
  is the default source of local verification truth for JS/TS work.
- [DECISION] If the file is missing, inspect package scripts, workspace layout,
  CI workflows, static-analysis config, generated-code config, and framework
  config to build a temporary plan.
- [DECISION] When fallback discovery is used, report the plan as inferred and
  include a follow-up to add or update `VERIFICATION.md`.
- [DECISION] If `VERIFICATION.md` exists but does not match current scripts or
  CI, report the mismatch and return `needs_human` when the run cannot safely
  decide which gate is blocking.

## Primary Gate

- Prefer a repo-defined aggregate script such as `verify`, `check:all`, or
  `ci:local` when it exists and matches the current surface.
- If no aggregate exists, compose a verification plan from required and
  conditional gates.
- If the repo has multiple packages or workspaces, identify the package scope
  before running broad root commands.

## Capability Mapping

- `typecheck`: scripts such as `ts:check`, `typecheck`, `tsc`, or
  `check:types`.
- `lint`: scripts such as `lint:ci`, `lint`, `eslint`, or framework-specific
  strict lint gates.
- `format`: scripts such as `format:check`, `prettier:ci`, or
  `prettier:check`.
- `tests`: scripts such as `test:cov`, `test:ci`, `test:unit`, `test:e2e`, or
  targeted test scripts for the touched package.
- `build_or_package`: scripts such as `build`, `build:dts`, `pack`,
  `package`, or dry-run package commands.
- `architecture_or_structure`: scripts such as `fsd:check`, dependency-boundary
  checks, module-boundary checks, or framework structure validators.
- `static_analysis`: configured providers discovered from repo docs, scripts,
  config files, or CI jobs.

## Conditional Gates

- Frontend changes may require structure checks, generated client updates,
  browser-visible validation, accessibility checks, or bundle/build checks.
- Backend changes may require API contract tests, integration tests, migration
  checks, queue/job tests, or generated client updates.
- Library changes may require type-surface tests, declaration output checks,
  package export checks, and package dry runs.
- Documentation-only changes usually require markdown/link checks when the repo
  defines them.

## Static Analysis

- Treat static analysis as `optional_configured` until the repo declares it
  blocking and the environment has access.
- Detect provider config from repo-local evidence, for example scanner scripts,
  provider properties, CI jobs, or hosted PR decoration.
- A hosted green status is not enough when issue-level findings are available;
  inspect new unresolved findings when access exists.
- Local provider runs are allowed only when the repo documents a local mode and
  required credentials or tokens are available through ignored overlays.

## Reporting

The developer or reviewer should report:

- selected package or workspace root;
- exact commands run;
- gates intentionally skipped and why;
- provider checks that were unavailable due to credentials or access;
- remaining uncertainty when scripts, docs, and CI disagree.

Do not report a JS/TS gate as passed when only a narrower targeted command ran
unless the verification result explicitly marks it as targeted coverage.
