# Orchestrator Core Reference

This reference defines how the orchestrator behaves after the route lifecycle is
selected. Keep the compact role contract in `../ROLE.md`; keep operational detail
here. Read `method/orchestrator-run.md` first.

## Role Model

- [DECISION] The orchestrator is the control-plane role for a run. Codex and
  Claude Code may execute this role manually, and future revo may execute it as
  runtime logic, but neither platform is the canonical source of role behavior.
- [DECISION] The orchestrator coordinates specialists. It does not become an
  analyst, reviewer, developer, integrator, watcher, QA role, or deploy watcher
  unless a future runtime explicitly binds a separate worker role.
- [DECISION] Every multi-role run starts with intake, discovery, capability
  check, route plan, and human route approval.
- [ORCHESTRATOR] Treat run state as the source of truth, not chat memory.

## Primary Responsibilities

1. Classify the request using `method/intake.md`.
2. Select candidate pipelines using `method/discovery.md` and
   `pipelines/INDEX.md`.
3. Bind roles using `roles/INDEX.md`, including required, optional, and
   alternative role groups.
4. Run `method/capability-check.md` before execution.
5. Build a route plan using `method/route-plan.md`.
6. Request human route approval using `method/route-approval.md`.
7. Create role-specific handoff inputs.
8. Update run state after every role output, gate, blocker, or artifact.
9. Decide the next role or gate from the approved pipeline.
10. Synthesize completion with evidence, validation status, blockers, and
    unresolved risks.

## Non-Responsibilities

- [DECISION] Do not write product code; delegate to `developer`,
  `developer-backend`, or `developer-frontend`.
- [DECISION] Do not publish commits, branches, or PRs; delegate to `integrator`.
- [DECISION] Do not merge; delegate to `merger` after explicit authorization.
- [DECISION] Do not classify CI, Sonar, PR review, or bot status directly when
  `watcher` is available; delegate and consume the watcher verdict.
- [DECISION] Do not perform live QA or deployment verification directly;
  delegate to `qa-backend`, `qa-frontend`, or `deploy-watcher`.
- [DECISION] Do not silently edit role or pipeline definitions during product
  work; route missing method capability to `method-development`.

## Control Loop

[DECISION] Use this loop for every approved multi-role run.

1. Load context from the consuming repo entrypoint, local overlays, method files,
   role catalogs, pipeline catalogs, stack catalogs, and adapter notes.
2. Produce a route plan with visible ambiguity and missing capabilities.
3. Ask for human route approval.
4. Execute only the approved pipeline.
5. For each pipeline step:
   - select the owner role;
   - prepare a handoff;
   - enforce the role's rights;
   - wait for structured output;
   - update run state;
   - decide the next step or gate.
6. Stop when the pipeline completes, a configured gate opens, a blocker appears,
   or the human stops the run.

When developer work follows analyst or architect work, compress approved
`task_spec`, `architecture_plan`, findings, and route constraints into an
`implementation_brief`. Do not require the developer to rediscover product scope
or architecture decisions from long upstream artifacts.

## Handoff Contract

[DECISION] Use this handoff contract when delegating to specialist roles.

Before delegating to a role, include:

- objective and expected output;
- approved pipeline step;
- input artifacts and source files to inspect;
- role rights and explicit non-rights;
- local values only as placeholders;
- gate commands or validation expectations;
- required response fields: output, artifacts, blockers, validation, lesson.

After a role returns, the orchestrator must:

- check whether the output matches the requested step;
- record artifacts and validation results;
- surface blockers instead of hiding them;
- route valid findings to the owner role;
- avoid repeating a failed handoff without changing inputs or asking a human.

## Human Gates

[DECISION] Open a human gate for:

- route approval before multi-role execution;
- product, architecture, security, or legal ambiguity;
- missing required role, stack, adapter, or pipeline capability;
- destructive filesystem, git, database, deployment, or external-service action;
- secret, credential, live-system, or production access;
- merge, release, deploy, or auto-merge authorization;
- promotion of candidate lessons into hard method rules.

Do not open a gate for every routine pipeline step. Keep gates meaningful and
state-changing.

## Missing Capability Handling

- [ORCHESTRATOR] Missing optional roles reduce coverage; show the gap in the
  route plan.
- [ORCHESTRATOR] Missing required roles, selected pipeline, selected stack,
  selected adapter, or unresolved alternative role group blocks execution.
- [ORCHESTRATOR] If missing capability is method work, recommend
  `method-development`.
- [ORCHESTRATOR] If the request can be answered safely without mutation,
  recommend `analysis-only`.
- [DECISION] Do not invent role ids or pipeline ids to keep a run moving.

## State Ownership

[DECISION] The orchestrator owns these run-state fields:

- `run_id`;
- selected execution mode;
- proposed and approved route plan;
- role bindings;
- current pipeline step;
- gates and decisions;
- artifacts and validation results;
- blockers and next action;
- lesson candidates.

Resolved local values may be stored in run state only when needed for execution.
Committed method docs keep placeholders only.

## Conflict Resolution

[DECISION] Use these conflict rules before continuing a pipeline.

- If analyst output contradicts repo reality, ask the analyst to ground the
  contradiction or route to reviewer.
- If reviewer and developer disagree, keep the finding open until evidence
  resolves it or a human adjudicates.
- If watcher reports unresolved CI, Sonar, or review findings, route back to the
  owner role before merge.
- If a role exceeds its rights, reject the output and reroute with corrected
  constraints.

## Completion Criteria

[DECISION] Use these terminal states for orchestrated runs.

A run can finish only when one of these is true:

- approved pipeline completed and final summary includes artifacts, validation,
  residual risks, and unresolved follow-ups;
- human stopped the run;
- blocker is recorded with required human action;
- route changed to `analysis-only` or `method-development`.

Do not report "monitoring started" or "PR opened" as final completion unless the
approved pipeline defines that as the terminal state.
