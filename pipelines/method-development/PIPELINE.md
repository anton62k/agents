# Pipeline: method-development

## Purpose

Create or improve the agent method itself: roles, stacks, framework references,
pipelines, adapters, and maintenance rules.

## Triggers

- A requested route is missing a required capability.
- The user asks to improve roles, pipelines, or agent behavior.
- A repeated run failure should be promoted from candidate lesson to a rule.
- A new language, framework, surface, or adapter is needed.

## Roles

`orchestrator`, `knowledge-engineer`, optional `reviewer`.

## State

- proposed method change summary;
- affected role, stack, pipeline, or adapter paths;
- source labels for every new hard rule;
- route approval record;
- review findings when requested.

## Steps

1. Orchestrator runs standard startup; see `../COMMON-STEPS.md`.
2. Confirm the approved route is `method-development`.
3. Capability check output identifies missing or weak definitions.
4. Knowledge-engineer extracts source material and drafts the change.
5. Reviewer checks structure, source labels, env-boundary compliance, and
   adapter neutrality.
6. Knowledge-engineer fixes blocking findings.
7. Integrator/PR workflow publishes the small method change when requested.

## Human Gates

- approval before promoting `[BEST-PRACTICE]` or candidate lessons to hard
  rules;
- merge approval.

## Adapter Notes

- Manual Codex or Claude Code runs may edit this repository directly after
  route approval.
- Future revo runs should treat method changes as ordinary repository work,
  while loaded runtime definitions remain generated/imported from this source.
