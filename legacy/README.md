# Legacy Playbook

This directory contains the older playbook material that existed before the
canonical method layout was introduced.

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

Legacy files are not the default source for new role, pipeline, or adapter
behavior. They remain available as source material while the canonical method is
built out.

## Promotion Rule

When legacy material is useful for the new system:

1. Reference it from the relevant role, stack, pipeline, or checklist.
2. Extract only the reusable rule or template into the canonical layer.
3. Keep local or project-specific details out of canonical files.
4. Leave the legacy source in place unless a later PR explicitly removes it.

Canonical destinations:

- role behavior -> `../roles/<role>/`;
- shared role knowledge -> `../references/`;
- language and ecosystem knowledge -> `../stacks/`;
- workflow order and gates -> `../pipelines/`;
- adapter mechanics -> `../adapters/`;
- fillable artifacts -> `../templates/artifacts/`;
- method rules -> `../method/`.
