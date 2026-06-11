# Manual Run Protocol

Manual run is the current execution mode for Codex and Claude Code before the
future orchestrator imports roles and pipelines directly.

## Inputs

- user request;
- consuming repo guidance, for example `AGENTS.md` or `CLAUDE.md`;
- recommended repo overlay docs, for example `REVIEW.md`,
  `VERIFICATION.md`, or `REPOSITORY.md`;
- canonical method checkout at `{{AGENTS_REPO_PATH}}`;
- optional local overlay values from the consuming repo;
- selected execution adapter: Codex or Claude Code.

## Startup Sequence

1. Read `constitution.md`; its rules apply to every manual run.
2. Read `bootstrap.md` to confirm how the consuming repo points to the canonical
   method and which adapter entrypoints are present.
3. Resolve `{{AGENTS_REPO_PATH}}` from the consuming repo overlay or ask the
   human for it.
4. Read `materialization.md` if the consuming repo has generated or linked
   adapter files.
5. Read `execution-policy.md` and `usage-accounting.md`.
6. Follow `orchestrator-run.md` as the run lifecycle contract.
7. Read `intake.md` and classify the request.
8. Read `discovery.md`, `../pipelines/INDEX.md`, and `../roles/INDEX.md`.
9. Run `capability-check.md` against the selected pipeline, roles, stack,
   references, and adapter.
10. Build the `route_plan` from `route-plan.md` and
   `../templates/artifacts/route-plan.md`.
11. Include execution policy, model recommendations, consensus policy, and
    budget policy in the route plan before asking for approval.
12. Show the route plan to the human and wait for `route-approval.md`.
13. Execute only the approved pipeline.
14. Keep run state in chat or in the consuming repo's run artifact according to
   `route-plan.md` and `../templates/artifacts/run-state.md`.

## Codex Runtime Shape

- The main Codex session acts as orchestrator for manual runs.
- Codex reads canonical method files directly from `{{AGENTS_REPO_PATH}}`.
- Repo-local Codex skills may wrap common workflows, but they must point back to
  canonical roles and pipelines.
- Codex should stop at route approval and other configured human gates.

## Claude Code Runtime Shape

- The main Claude Code session acts as orchestrator for manual runs.
- Claude Code may use generated subagents or skills, but generated files must be
  reproducible from canonical roles and references.
- Subagents should not own human approval gates unless the platform can surface
  that approval reliably.
- The main session remains responsible for route approval and run state.

## Agent Discovery

Agents discover available capabilities in this order:

1. `method/constitution.md` for always-on rules.
2. Consuming repo `AGENTS.md` or `CLAUDE.md` for local entrypoint instructions.
3. Consuming repo overlay docs such as `VERIFICATION.md`, `REVIEW.md`,
   `REPOSITORY.md`, or existing equivalents such as `docs/quality-gates.md`.
4. `roles/INDEX.md` for role ids, surfaces, capabilities, and rights.
5. `pipelines/INDEX.md` for route candidates and role requirements.
6. `stacks/README.md` and selected stack files for language knowledge.
7. `templates/artifacts/` for fillable handoff artifacts.
8. `adapters/<platform>/README.md` for platform mechanics.
9. Ignored consuming repo overlays for local paths, credentials, and targets.

## Output

```yaml
manual_run:
  route_plan: {}
  approved: false
  execution_adapter: codex | claude-code
  run_state_location: chat | consuming-repo-artifact | future-revo-state
  execution_policy: {}
  next_step: route-approval | execute-pipeline | ask-human | stop
```

## Rules

- Do not execute a multi-role pipeline before route approval.
- Do not start implementation while blocking clarification markers remain.
- Do not copy concrete local values into canonical method files.
- If generated platform files disagree with canonical roles or pipelines, the
  canonical method wins.
- If canonical templates disagree with current repo-specific commands, review
  policy, or structure, the repo overlay wins.
- Manual runs implement `orchestrator-run.md` with the main session acting as
  orchestrator.
- If the consuming repo lacks an entrypoint, create or propose a minimal
  `AGENTS.md`, `CLAUDE.md`, and `.agents/README.md` bootstrap. Add
  `REVIEW.md`, `VERIFICATION.md`, or `REPOSITORY.md` when the repository needs
  explicit local review, verification, or structure guidance.
- If generated adapter files are stale or ambiguous, refresh them from
  `materialization.md` before using them as instructions.
