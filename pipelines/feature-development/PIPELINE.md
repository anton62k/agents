# Pipeline: feature-development

## Purpose

Take a feature or multi-repo work item from task brief to reviewed PR, with
human gates and autonomous review/fix/watch loops.

## Triggers

- New feature.
- Multi-repo change.
- Work item needs task spec, implementation, review, PR, and checks.

## Roles

`orchestrator`, `analyst`, `reviewer`, `developer`, `integrator`, `watcher`,
optional `merger`, optional `deploy-watcher`, optional `qa-backend`,
optional `qa-frontend`.

## State

- `RUN.md` or future run row: launch parameters and explicit authorizations.
- task spec artifact.
- findings artifact.
- status artifact.
- step results.
- cost/usage ledger when available.

## Steps

1. Orchestrator records run parameters and selects this pipeline.
2. Analyst produces the task spec and human-action items.
3. Reviewer consensus reviews the task spec.
4. Human approves or rejects the task spec.
5. Developer implements from a fresh base/worktree.
6. Reviewer consensus reviews code.
7. Developer fixes blocking findings; repeat up to the configured cap.
8. Integrator creates or updates the PR.
9. Watcher polls and classifies CI, Sonar, bot, and human review state.
10. Developer fixes watcher findings; repeat until ready or blocked.
11. Human merge gate, unless explicit auto-merge is recorded for this run.
12. Optional post-merge deploy and QA stages.

## Human Gates

- task spec approval;
- human-action items;
- merge approval by default;
- ambiguous architecture/product/security decisions.

## Adapter Notes

- Codex and Claude Code manual runs: the main agent owns orchestration and state
  files.
- Future revo: DBOS owns progress; Revisium/control-plane owns role definitions,
  policy, inbox, events, and ledger.
