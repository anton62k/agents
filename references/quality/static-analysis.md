# Static Analysis And Provider Findings

Static analysis is a provider-backed quality signal. It can come from local
commands, hosted CI checks, PR decoration, annotations, provider APIs, or review
bot comments. This reference defines how agents should plan, inspect, and report
those signals without assuming a specific provider.

Examples include Sonar, CodeQL, Semgrep, dependency scanners, duplication
detectors, coverage gates, and language-specific analyzers. Examples are not
defaults; a provider is selected only by repo evidence or human approval.

## Responsibilities

- Orchestrator records provider capabilities in `verification_plan`.
- Developer runs local provider gates only when the repo documents an executable
  local mode and required access is available through the environment.
- Watcher inspects hosted checks, PR decoration, annotations, review threads,
  and provider details after push.
- Reviewer judges whether unresolved findings are true issues, false positives,
  accepted risks, or require human clarification.

## Discovery Inputs

Use repo-local evidence before shared assumptions:

1. `VERIFICATION.md` or a repo-declared equivalent.
2. CI workflows and provider-specific jobs.
3. Provider config files and scanner scripts.
4. Package/build scripts and local runbooks.
5. PR checks, annotations, review threads, and provider UI/API access.

Do not infer that a provider exists because another repository uses it.

## Provider States

- `not_configured`: no repo evidence selects a provider.
- `configured_local`: repo documents a local command or containerized mode.
- `configured_hosted`: hosted CI, PR decoration, or provider project exists.
- `configured_unavailable`: provider is configured but required access is
  missing.
- `unknown`: evidence conflicts or access is insufficient to classify.

`not_configured` is not a failure. `configured_unavailable` becomes
`needs_human` when the selected pipeline or repo contract makes the provider
blocking.

## Finding Categories

Classify provider output by behavior, not only by provider terminology:

- `security`: vulnerabilities, hotspots, injection risks, secret handling, and
  security-sensitive configuration.
- `reliability`: bugs, crashes, nullability, race conditions, and incorrect
  control flow.
- `maintainability`: code smells, readability issues, dead code, complexity, and
  unnecessary duplication of concepts.
- `duplication`: repeated code blocks or generated-code false positives.
- `coverage`: missing or insufficient test coverage.
- `dependency_risk`: vulnerable, deprecated, incompatible, or policy-blocked
  dependencies.
- `quality_gate`: aggregate provider verdict over selected thresholds.

Providers may use different labels. Map their labels into these categories in
`verification_result`.

## Issue-Level Inspection

An aggregate green gate is useful evidence, but it is not a substitute for
issue-level inspection when findings are available. A failed or warning provider
gate must be expanded into concrete findings before deciding the next route.

For each actionable finding, record:

- provider and rule or check id;
- category and severity;
- file or artifact location when available;
- whether it is new, existing, fixed, false positive, accepted risk, or unclear;
- proposed next owner: developer, reviewer, human, or waiting.

If issue-level access is unavailable, report the provider as `unavailable` or
`partial`, not as passed.

## Local Mode

Local static-analysis execution is optional and repo-specific. Run it before
push only when the repo contract declares:

- exact command or script;
- required environment variables through placeholders or ignored overlays;
- whether the run uploads to a hosted provider or stays local;
- expected scope, for example changed code, PR branch, or full project;
- cache/output directories that must not pollute the working tree.

Never commit provider tokens, project keys, account names, machine paths, hosts,
or generated scanner caches.

## Hosted Mode

Hosted provider evidence may appear as CI jobs, PR checks, annotations, review
comments, provider APIs, or UI links. Watcher should inspect the most specific
available source first:

1. failing check details and annotations;
2. provider issue list or hotspot list for the PR/new-code scope;
3. unresolved review threads or bot comments;
4. aggregate quality gate status.

When only aggregate status is available, report that limitation as residual risk
or `needs_human` if the repo requires issue-level evidence.

## False Positives And Accepted Risk

False-positive and accepted-risk decisions are exceptional. They require narrow
evidence from the current code, provider rule semantics, repo contract, or human
approval path.

Allowed outcomes:

- fix in code, tests, docs, config, or generated artifact inputs;
- narrow suppression with rationale when the repo permits suppressions;
- reviewer-confirmed false positive;
- human-approved accepted risk;
- `needs_human` when access, product risk, or security judgment is missing.

Do not silence a provider by broad exclusions just to make a gate green.
