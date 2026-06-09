# Agent Method Base

This directory defines the portable method used by Codex, Claude Code, and the
future revo agent-orchestrator runtime.

## Principle

The same source should drive three execution modes:

- Codex: skills and direct prompts.
- Claude Code: subagents, skills, commands, and hooks.
- revo: role and pipeline rows loaded into the orchestrator control plane.

The canonical source is not any one platform file. It is the method definition in
this repository:

- roles live in `roles/<role>/ROLE.md`;
- role knowledge lives in `roles/<role>/references/`;
- pipelines live in `pipelines/<pipeline>/PIPELINE.md`;
- platform-specific generation and invocation rules live in `adapters/`;
- local values live outside committed markdown, per `env-boundary.md`.

## Build Order

1. Keep the base schema small.
2. Add thin role definitions with explicit references.
3. Add pipelines with gates and handoff contracts.
4. Exercise the method manually in Codex and Claude Code.
5. Fold repeated lessons into role references after human approval.
6. Later, add a revo importer that loads the same definitions into
   agent-orchestrator.

## Non-Goals

- Do not store run logs here.
- Do not store project-specific facts here unless they are examples.
- Do not store local env values or secrets here.
- Do not fork role behavior separately for Codex and Claude Code.
