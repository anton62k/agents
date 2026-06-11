# Verification Planning

Verification planning is the generic contract between orchestration, developer
execution, review, PR watching, and QA. It answers what must be checked without
assuming a specific language, package manager, CI provider, or static-analysis
tool.

## Responsibilities

- Orchestrator prepares `verification_plan` from the approved route, repo-local
  quality docs, stack references, tooling references, and upstream risk notes.
- Developer runs required and applicable conditional gates before handing off.
- Integrator may rerun publish-time gates when the pipeline assigns that right.
- Watcher compares remote CI, static analysis, bot reviews, and human review
  threads against the same plan.
- QA roles add live or user-facing evidence after merge or deploy when the
  pipeline requires it.

## Gate Classes

- `required`: gates that must pass for this run, usually the repo's primary local
  verification command or an equivalent command set.
- `conditional`: gates that apply only to touched surfaces, for example frontend
  structure checks, backend contract tests, migration checks, package checks, or
  docs linters.
- `optional_configured`: provider gates that run only when the repo has config
  and the environment has access, for example static analysis or external
  quality platforms.
- `remote_after_push`: checks only visible after branch or PR publication, for
  example hosted CI, code review bots, static-analysis PR decoration, and review
  threads.

## Capability Mapping

Route planning records generic capability states:

```yaml
verification_capabilities:
  primary_local_gate: available | missing | unknown
  typecheck: available | missing | unknown | not-applicable
  lint: available | missing | unknown | not-applicable
  tests: available | missing | unknown | not-applicable
  build_or_package: available | missing | unknown | not-applicable
  architecture_or_structure: available | missing | unknown | not-applicable
  static_analysis: configured | optional | unavailable | unknown
  remote_ci: available | missing | unknown
```

Stack and tool references translate those capabilities into candidate checks.
Repo overlays translate candidate checks into exact commands.

## Provider Rules

- Do not assume a provider exists because similar repos use it.
- Treat configured static analysis as optional until the consuming repo declares
  it required and required access is available.
- A provider's green aggregate status is evidence, not a complete review. When
  the provider exposes issue-level findings, unresolved new findings must be
  inspected.
- Suppression or accepted risk requires narrow evidence and reviewer or human
  approval according to the consuming repo policy.
- Missing credentials, project access, or provider config must be reported as
  skipped or `needs_human`; never report the provider gate as passed.

## Artifacts

- `../../templates/artifacts/verification-plan.md`
- `../../templates/artifacts/verification-result.md`
