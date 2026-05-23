# AGENTS.md - anton62k/agents

This repository stores reusable agent workflows, prompts, templates, and
engineering practices.

## Scope

- Keep content project-agnostic unless it is explicitly an example.
- Prefer small reusable files over large mixed documents.
- Product repositories should copy templates or link to prompts, then keep only
  repo-specific facts locally.
- Do not put private credentials, tokens, or customer data here.

## Editing Rules

- Keep prompts directly actionable for coding agents.
- Keep practices concrete and testable: commands, gates, expected evidence.
- When adding a new practice, add a checklist or template if it changes how an
  agent should work.
- Avoid duplicating the same rule across many files. Link to the canonical file.

## Quality Bar

Agent workflows should assume:

- local verification before PR;
- CI verification after push;
- Sonar Quality Gate is not enough by itself;
- unresolved Sonar issues must be inspected and fixed;
- PR review threads must be answered in-thread and resolved only after fixes are
  verified;
- release commits and tags must be validated against registry/GitHub Actions.
