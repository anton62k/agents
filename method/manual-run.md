# Manual Run Protocol

Manual run is the current execution mode for Codex and Claude Code before the
future orchestrator imports roles and pipelines directly.

## Inputs

- user request;
- consuming repo guidance, for example `AGENTS.md` or `CLAUDE.md`;
- canonical method checkout at `{{AGENTS_REPO_PATH}}`;
- optional local overlay values from the consuming repo;
- selected execution adapter: Codex or Claude Code.

## Startup Sequence

1. Read `bootstrap.md` to confirm how the consuming repo points to the canonical
   method and which adapter entrypoints are present.
2. Resolve `{{AGENTS_REPO_PATH}}` from the consuming repo overlay or ask the
   human for it.
3. Read `materialization.md` if the consuming repo has generated or linked
   adapter files.
4. Follow `orchestrator-run.md` as the run lifecycle contract.
5. Read `intake.md` and classify the request.
6. Read `discovery.md`, `../pipelines/INDEX.md`, and `../roles/INDEX.md`.
7. Run `capability-check.md` against the selected pipeline, roles, stack,
   references, and adapter.
8. Build the `route_plan` from `route-plan.md`.
9. Show the route plan to the human and wait for `route-approval.md`.
10. Execute only the approved pipeline.
11. Keep run state in chat or in the consuming repo's run artifact according to
   `route-plan.md`.

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

1. Consuming repo `AGENTS.md` or `CLAUDE.md` for local entrypoint instructions.
2. `roles/INDEX.md` for role ids, surfaces, capabilities, and rights.
3. `pipelines/INDEX.md` for route candidates and role requirements.
4. `stacks/README.md` and selected stack files for language knowledge.
5. `adapters/<platform>/README.md` for platform mechanics.
6. Consuming repo overlay for local commands, paths, credentials, and targets.

## Output

```yaml
manual_run:
  route_plan: {}
  approved: false
  execution_adapter: codex | claude-code
  run_state_location: chat | consuming-repo-artifact | future-revo-state
  next_step: route-approval | execute-pipeline | ask-human | stop
```

## Rules

- Do not execute a multi-role pipeline before route approval.
- Do not copy concrete local values into canonical method files.
- If generated platform files disagree with canonical roles or pipelines, the
  canonical method wins.
- Manual runs implement `orchestrator-run.md` with the main session acting as
  orchestrator.
- If the consuming repo lacks an entrypoint, create or propose a minimal
  `AGENTS.md`, `CLAUDE.md`, and `.agents/README.md` bootstrap.
- If generated adapter files are stale or ambiguous, refresh them from
  `materialization.md` before using them as instructions.
