# Pipeline Definition Format

Each portable pipeline lives at `pipelines/<pipeline>/PIPELINE.md`.

## Required Sections

- `# Pipeline: <id>`: stable kebab-case pipeline id.
- `Purpose`: what kind of work this pipeline handles.
- `Triggers`: when to choose this pipeline.
- `Roles`: role ids used by the pipeline.
- `Steps`: ordered role invocations with input, output, exit criteria, and
  retry/loop behavior.
- `Execution Policy`: default model-level, consensus, and iteration-cap
  recommendations for this workflow.
- `Human Gates`: approval or escalation points.
- `Adapter Notes`: differences for manual Codex or Claude Code runs and future
  runtime import.

Long-running or artifact-heavy pipelines may include `State` between `Roles`
and `Steps`.

## Catalog Metadata

`pipelines/INDEX.md` owns discovery metadata:

- stable pipeline id;
- pipeline file path;
- routing triggers;
- required, alternative, and optional roles;
- route gates;
- platform invocation mode.

Do not duplicate catalog metadata as separate sections in every pipeline file.
Future machine-readable imports should validate `pipelines/INDEX.md` against
pipeline files and adapter wrappers.

## Gate Rule

Human gates are state changes, not comments in prose. In manual Codex or Claude
Code runs, the main agent stops and asks. In future revo runs, the gate maps to
the inbox/control-plane mechanism.

## Runtime Values

Pipeline markdown uses placeholders only. Resolved values belong in a run ledger,
for example `RUN.md`, `STATUS.md`, `steps/*.json`, or future runtime state. Use
`route-plan.md` for the canonical approved route and run-state shape.

## Handoffs

Pipeline handoffs are expressed in ordered steps and artifact templates. Add a
dedicated `Handoff` section only if this format is changed here first and the
existing pipeline files are updated in the same PR.
