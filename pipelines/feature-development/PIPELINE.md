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
optional `architect`, optional `merger`, optional `deploy-watcher`, optional
`qa-backend`, optional `qa-frontend`.

## State

- `RUN.md` or future run row: launch parameters and explicit authorizations.
- task spec artifact.
- findings artifact.
- status artifact.
- step results.
- cost/usage ledger when available.

## Steps

1. Orchestrator runs standard startup; see `../COMMON-STEPS.md`.
2. Orchestrator records approved run parameters.
3. Analyst produces the task spec, human-action items, and requirements check.
4. Orchestrator stops for clarification if the requirements check is not ready.
5. Optional architect produces architecture plan or ADR candidate when technical
   shape is not obvious.
6. Reviewer consensus reviews the task spec and architecture plan when present.
7. Human approves or rejects the task spec and significant architecture choices.
8. Orchestrator prepares the implementation brief.
9. Developer implements from a fresh base/worktree.
10. Reviewer consensus reviews code.
11. Developer fixes blocking findings; repeat up to the configured cap.
12. Integrator creates or updates the PR.
13. Watcher polls and classifies CI, Sonar, bot, and human review state.
14. Developer fixes watcher findings; repeat until ready or blocked.
15. Human merge gate, unless explicit auto-merge is recorded for this run.
16. Optional post-merge deploy and QA stages.

## Human Gates

- task spec approval;
- unresolved requirements or clarification markers;
- human-action items;
- merge approval by default;
- ambiguous architecture/product/security decisions.

## Adapter Notes

- Codex and Claude Code manual runs: the main agent owns orchestration and state
  files.
- Future revo: DBOS owns progress; Revisium/control-plane owns role definitions,
  policy, inbox, events, and ledger.
