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
- [DECISION] Workspace selection is verification scope evidence, not a separate
  `verification_capabilities` field.

## Canonical Capability Mapping

Map JS/TS evidence to the canonical capability names from
`../../../references/quality/verification.md`. Do not introduce JS/TS-specific
capability fields.

- `primary_local_gate`: aggregate repo scripts or documented command sets that
  run the required local checks for the selected surface.
- `typecheck`: scripts such as `ts:check`, `typecheck`, `tsc`, or
  `check:types`.
- `lint`: scripts such as `lint:ci`, `lint`, `eslint`, or framework-specific
  strict lint gates. Format-only checks feed this capability when the repo
  treats formatting as part of lint quality.
- `tests`: scripts such as `test:cov`, `test:ci`, `test:unit`, `test:e2e`, or
  targeted test scripts for the touched package.
- `build_or_package`: scripts such as `build`, `build:dts`, `pack`,
  `package`, package export checks, or dry-run package commands.
- `architecture_or_structure`: scripts such as `fsd:check`, dependency-boundary
  checks, module-boundary checks, or framework structure validators.
- `static_analysis`: configured providers discovered from repo docs, scripts,
  config files, or CI jobs.
- `remote_ci`: hosted CI checks discovered from workflow config, PR status
  checks, or repo documentation.

Format scripts may still appear in `verification_plan` and
`verification_result.executed`, but route planning must not record `format` as a
top-level generic capability.

## Workspace And Package Scope

- [DECISION] Determine whether the change belongs to the repo root, one package,
  several packages, or a generated output package before choosing commands.
- [DECISION] Prefer package-scoped checks while iterating, then run the repo's
  required aggregate gate before handoff when the route requires full local
  verification.
- [DECISION] Do not run broad workspace commands as proof of a specific package
  gate unless the repo contract declares that aggregate as authoritative.
- [DECISION] When scope is ambiguous or package metadata conflicts with repo
  docs, set `fallback_used: true`, record the mismatch in `verification_plan`,
  and return `needs_human` if the mismatch changes what is blocking.

## Conditional Gates

- Frontend changes may require structure checks, generated client updates,
  browser-visible validation, accessibility checks, or bundle/build checks.
- Backend changes may require API contract tests, integration tests, migration
  checks, queue/job tests, or generated client updates.
- Library changes may require type-surface tests, declaration output checks,
  package export checks, and package dry runs.
- Documentation-only changes usually require markdown/link checks when the repo
  defines them.

## Generated Artifacts And Contracts

- [DECISION] Treat configured code generation as a conditional gate when touched
  sources include API schemas, GraphQL documents, Prisma schema, route manifests,
  generated clients, declaration output, or package export metadata.
- [DECISION] Regenerate artifacts only through repo-approved scripts or docs.
  Do not invent direct tool commands from package names.
- [DECISION] If generated files are intentionally not committed, record the
  source-of-truth command or skipped reason in `verification_result`.
- [DECISION] When generated output is committed, verify that source and output
  stay in sync before handing off.

## Static Analysis

- Treat static analysis as `optional_configured` until the repo declares it
  blocking and the environment has access.
- Detect provider config from repo-local evidence, for example scanner scripts,
  provider properties, CI jobs, or hosted PR decoration.
- Use the shared static-analysis reference for provider states, categories,
  local mode, hosted mode, issue-level inspection, false positives, and accepted
  risks.
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
