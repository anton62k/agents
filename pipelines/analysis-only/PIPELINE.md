# Pipeline: analysis-only

## Purpose

Answer a technical question or produce a plan without editing code.

## Triggers

- Architecture review.
- Feasibility analysis.
- Source-backed explanation.
- Plan-map before role or pipeline work.

## Roles

`orchestrator`, `analyst`, optional `reviewer`, optional `knowledge-engineer`.

## Steps

1. Gather source files and existing docs.
2. Analyst produces findings or plan.
3. Optional reviewer checks hallucinated paths, line claims, and edge cases.
4. Orchestrator returns a concise decision or next-step proposal.

## Human Gates

- Before converting analysis into code edits.
- Before promoting best-practice proposals into hard rules.

## Adapter Notes

Codex and Claude Code should run this read-only unless the user explicitly asks
to write artifacts.
