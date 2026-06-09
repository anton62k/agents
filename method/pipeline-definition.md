# Pipeline Definition Format

Each portable pipeline lives at `pipelines/<pipeline>/PIPELINE.md`.

## Required Sections

- `id`: stable kebab-case pipeline id.
- `purpose`: what kind of work this pipeline handles.
- `triggers`: when to choose this pipeline.
- `roles`: role ids used by the pipeline.
- `state`: artifacts and ledger entries produced during a run.
- `steps`: ordered role invocations with input, output, exit criteria, and
  retry/loop behavior.
- `human_gates`: approval or escalation points.
- `handoff`: exact artifacts passed between roles.
- `adapter_notes`: differences for Codex, Claude Code, and future revo.

## Gate Rule

Human gates are state changes, not comments in prose. In manual Codex or Claude
Code runs, the main agent stops and asks. In future revo runs, the gate maps to
the inbox/control-plane mechanism.

## Runtime Values

Pipeline markdown uses placeholders only. Resolved values belong in a run ledger,
for example `RUN.md`, `STATUS.md`, `steps/*.json`, or future DBOS/Revisium state.
