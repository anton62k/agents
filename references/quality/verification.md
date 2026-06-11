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

## Source Priority

Use repo-local evidence before generic assumptions. `VERIFICATION.md` is the
default repo-local verification contract expected by this method. Its absence is
not a failure by itself, but it means the agent must use discovery fallback and
record a documentation follow-up.

1. `VERIFICATION.md`, when present.
2. Existing equivalent repo docs, for example `docs/quality-gates.md`, README
   verification sections, or CI/review docs.
3. Package/build scripts, static-analysis config, and CI workflow definitions.
4. Stack references and shared quality references from the canonical method.
5. Agent inference from source inspection.

Repo overlay wins for exact commands, blocking status, provider requirements,
and environment constraints. If a repo-local source is missing or stale, record
the uncertainty in `verification_plan` instead of guessing.

## Default Contract Behavior

- [DECISION] Always look for `VERIFICATION.md` or a repo-declared equivalent
  before selecting commands.
- [DECISION] If `VERIFICATION.md` exists, treat it as authoritative for local
  gates, conditional gates, static-analysis requirements, remote gates, and
  reporting format unless current repo evidence proves it stale.
- [DECISION] If `VERIFICATION.md` is missing, compose a temporary verification
  plan from scripts, CI, static-analysis config, repo docs, and stack
  references. Mark `fallback_used: true` in the plan and add a follow-up to
  create the repo-local verification contract.
- [DECISION] If `VERIFICATION.md` conflicts with scripts or CI, do not silently
  choose one. Record the mismatch, use the safest repo-current command set for
  the run, and return `needs_human` when the conflict changes what is blocking.
- [DECISION] Do not encode local accounts, tokens, hosts, namespaces, machine
  paths, or secret values in `VERIFICATION.md`. Put those values in ignored
  overlays or runtime environment.

## Provider Rules

- Do not assume a provider exists because similar repos use it.
- Treat configured static analysis as optional until the consuming repo declares
  it required and required access is available.
- Use `static-analysis.md` to classify provider states, finding categories,
  local mode, hosted mode, false positives, and accepted risks.
- A provider's green aggregate status is evidence, not a complete review. When
  the provider exposes issue-level findings, unresolved new findings must be
  inspected.
- Failed or warning provider gates must be expanded into issue-level findings
  when access exists before routing the work back to developer, reviewer, or
  human.
- Suppression or accepted risk requires narrow evidence and reviewer or human
  approval according to the consuming repo policy.
- Missing credentials, project access, or provider config must be reported as
  skipped or `needs_human`; never report the provider gate as passed.

## Artifacts

- `../../templates/artifacts/verification-plan.md`
- `../../templates/artifacts/verification-result.md`
- `static-analysis.md`
