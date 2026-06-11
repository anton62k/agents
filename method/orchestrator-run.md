# Orchestrator Run Contract

This contract defines how an orchestrator turns a user request into an approved
pipeline run.

For manual Codex and Claude Code execution, the main session acts as the
orchestrator. For future revo execution, the runtime owns the same state machine
and may add transport, worker, attempt, or cost fields around it.

## Purpose

- Route the request to a catalog-backed pipeline.
- Bind required, alternative, and optional roles.
- Expose missing capabilities before execution.
- Ask for human route approval before mutation.
- Stop at clarification gates before downstream roles guess missing intent.
- Keep run state portable across Codex, Claude Code, and future revo.

The orchestrator is a coordination layer. Codex and Claude Code may execute the
contract, but they are not the canonical source for roles or pipelines.

## Inputs

- user request;
- selected execution mode: `codex`, `claude-code`, or `revo-future`;
- consuming repo entrypoint, for example `AGENTS.md` or `CLAUDE.md`;
- canonical checkout at `{{AGENTS_REPO_PATH}}`;
- optional local overlay values from the consuming repo;
- role, pipeline, stack, tooling, method, and adapter catalogs.

## Phases

### 1. Load Context

Read:

- `constitution.md`;
- `bootstrap.md`;
- `materialization.md` when adapter files are generated or linked;
- `manual-run.md` for Codex or Claude Code execution;
- consuming repo entrypoints and overlays.

Only identify local values at this phase. Do not resolve secrets or mutate the
working tree.

### 2. Classify Request

Run `intake.md`.

The output must include work type, candidate pipeline, surfaces, stack
candidates, frameworks, tooling categories, verification capabilities, required
roles, optional roles, alternative role groups, and local values needed later.

### 3. Discover Route

Run `discovery.md`.

Use `pipelines/INDEX.md` and `roles/INDEX.md` as catalogs. Do not invent role or
pipeline ids. Unknown values stay visible in the candidate route.

### 4. Check Capabilities

Run `capability-check.md`.

Required roles, unresolved alternative role groups, selected stacks, selected
framework references, selected tooling references, selected pipeline, and
selected adapter must be available before automatic execution can proceed.

Missing optional roles reduce coverage but do not block by default.

### 5. Build Route Plan

Create `route_plan` using `route-plan.md`.
Use `../templates/artifacts/route-plan.md` as the fillable artifact.

The plan must show:

- selected pipeline and reason;
- execution mode;
- required roles;
- alternative role groups and resolution;
- optional roles and reduced coverage;
- selected surfaces, stacks, frameworks, and tooling categories;
- verification capabilities;
- local values needed later;
- missing capabilities;
- human gates before and inside the selected pipeline.

### 6. Ask For Human Route Approval

Run `route-approval.md`.

Show a concise proposed route and wait for one of the route decisions:

- `approve`;
- `change pipeline`;
- `change roles`;
- `analysis only`;
- `method first`;
- `stop`.

Do not start mutating pipeline steps before route approval.

### 7. Prepare Run State And Check Clarification

After approval, create or update `run_state` using `route-plan.md`.
Use `../templates/artifacts/run-state.md` when run state is recorded outside
chat.

Resolved local values may enter run state only when the pipeline needs them.
Committed method docs keep placeholders only.

Before developer execution, verify `../checklists/requirements.md` for any
available `task_spec`. If the requirements check is not `ready`, stop with the
matching next action defined in the checklist's Status Rules section.

When analysis or architecture steps ran and clarification is clear, prepare a
compact `implementation_brief` for the developer from approved `task_spec`,
`architecture_plan`, findings, and route constraints.
Use `../templates/artifacts/implementation-brief.md` as the fillable artifact.

Before developer execution, also prepare `verification_plan` from the approved
route, repo overlay, quality-gate docs, stack references, tooling references,
and upstream risk notes. Use
`../templates/artifacts/verification-plan.md` as the fillable artifact.

Compact means 200-400 words or the equivalent in concise YAML. Include only:
goal, required behavior, files or modules to inspect first, architecture
constraints, implementation slices, acceptance criteria, required tests, risks,
out-of-scope items, and stop conditions. Summarize findings; do not paste raw
review text or full upstream artifacts.

The verification plan is allowed to contain concrete commands only when they
come from the consuming repo or run overlay. The canonical method records
generic gate categories and placeholders, not JavaScript, package-manager,
Sonar, CI-provider, or framework assumptions.

### 8. Execute Pipeline

Read the approved `pipelines/<pipeline>/PIPELINE.md` and execute its steps.

The orchestrator delegates work to the role that owns the action. It does not
write product code directly unless a future runtime explicitly assigns a worker
role with that right.

### 9. Handle Gates And Completion

Stop at configured human gates, unresolved ambiguity, missing capability, or
pipeline completion. Store artifacts, blockers, next action, and lessons in run
state or the requested run artifact.

## State Machine

```yaml
orchestrator_run:
  run_id: "{{RUN_ID}}"
  execution_mode: codex | claude-code | revo-future
  status: received
  allowed_statuses:
    - received
    - proposed
    - approved
    - executing
    - waiting-human
    - blocked
    - completed
    - stopped
  route_plan: {}
  capability_status: ready | missing | ambiguous
  current_pipeline_step: ""
  role_bindings:
    required: []
    alternative: []
    optional: []
  handoffs:
    task_spec: {} # see roles/analyst/references/core.md
    requirements_check: {} # see checklists/requirements.md
    architecture_plan: {} # see roles/architect/references/core.md
    implementation_brief: {} # see roles/developer/references/core.md
    verification_plan: {} # see references/quality/verification.md
    verification_result: {} # see references/quality/verification.md
  gates: []
  artifacts: []
  blockers: []
  next_action: route-approval
  allowed_next_actions:
    - route-approval
    - execute-pipeline
    - needs_analyst
    - needs_architect
    - needs_human
    - ask-human
    - method-development
    - stop
```

Adapters may wrap this object but must not rename canonical fields.

## Proposed Route Review

Before execution, present the route in a short human-review block:

```md
Proposed route:
- pipeline: <pipeline id>
- why: <short reason>
- roles: <required and selected alternative roles>
- optional coverage: <included or omitted optional roles>
- surfaces/stacks/tooling: <generic route summary>
- verification capabilities: <ready, missing, or unknown gates>
- missing capabilities: <none or list>
- clarification blockers: <none or list>
- local values needed later: <placeholder names only>
- first gate: route approval

Decision needed: approve, change pipeline, change roles, analysis only,
method first, or stop.
```

## Rules

- Route approval is required before every multi-role pipeline execution.
- If a human changes pipeline or roles, regenerate the route plan and rerun
  capability check.
- If blocking capabilities are missing, recommend `method first` or
  `analysis only`.
- Follow `constitution.md` section 3 for blocking clarification markers.
- Keep runtime values in run state or ignored overlays, never in committed
  method files.
- Future revo import reads canonical method, role, and pipeline files; it does
  not infer behavior from generated Codex or Claude Code files.
