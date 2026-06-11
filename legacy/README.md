# Legacy Playbook

This directory contains the older playbook material that existed before the
canonical method layout was introduced. It is archived material, not runtime
agent knowledge.

## Contents

- `backend/` - legacy backend practice notes.
- `frontend/` - legacy frontend practice notes.
- `libraries/` - legacy library and package practice notes.
- `practices/` - legacy engineering practices.
- `prompts/` - legacy copy-paste prompts.
- `skills/` - legacy Codex skill definitions.
- `checklists/` - legacy operational checklists.
- `templates/` - legacy backend, frontend, and library starter templates.

## Status

Legacy files must not be loaded by roles, stacks, pipelines, adapters, or runtime
references. The canonical method is the only active source for agent behavior.

## Recovery Rule

When an archived idea is still useful for the new system:

1. Do not link runtime docs to this directory.
2. Rebuild the idea as a new canonical rule, reference, template, or checklist.
3. Get human approval for the reusable abstraction.
4. Keep local or project-specific details out of canonical files.
5. Leave the archived source in place unless a later PR explicitly removes it.

Canonical destinations:

- role behavior -> `../roles/<role>/`;
- shared role knowledge -> `../references/`;
- language and ecosystem knowledge -> `../stacks/`;
- workflow order and gates -> `../pipelines/`;
- adapter mechanics -> `../adapters/`;
- fillable artifacts -> `../templates/artifacts/`;
- method rules -> `../method/`.
