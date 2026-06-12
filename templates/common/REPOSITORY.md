# REPOSITORY.md

This file is the recommended repo-local map for agents.

It should describe how this repository is organized, which surfaces exist, and
where agents should look for repo-specific truth. If the README or existing docs
already cover this, link to them here instead of duplicating content.

## Status

- Recommended: yes
- Required to exist in every repository: no
- Existing repo-specific docs override this template.

## Repository Purpose

TODO: short description of what this repository owns.

## Source Of Truth Order

1. Repo-local files and docs in this repository.
2. Existing quality, review, architecture, and CI documents.
3. Build/package scripts and CI workflow definitions.
4. Canonical agent playbook from `{{AGENTS_REPO_PATH}}`.
5. Agent inference from source inspection.

Repo overlay wins for concrete commands, paths, local policies, release rules,
domain facts, and environment boundaries. Canonical agents files provide the
method, roles, pipelines, and artifact contracts.

## Structure

- `TODO/` - purpose
- `TODO/` - purpose

## Primary Surfaces

- Frontend: TODO / not applicable
- Backend: TODO / not applicable
- Library/package: TODO / not applicable
- Infrastructure: TODO / not applicable
- Documentation: TODO / not applicable
- Data/modeling: TODO / not applicable

## Entrypoints

- Main application or package entrypoint: TODO
- Local development command: TODO
- Primary verify command: see `VERIFICATION.md`
- Review policy: see `REVIEW.md`

## Generated Files

- Generated sources: TODO / none
- Files agents may regenerate: TODO / none
- Files agents must not edit manually: TODO / none

## Local Overlays

Concrete local values belong in ignored overlays such as:

- `.agents/local.env`
- `.agents/local.context.md`

Do not commit machine paths, tokens, account names, hosts, namespaces, or other
environment-specific values.

## Agent Notes

- Inspect current repo files before applying generic method rules.
- Prefer explicit repo docs over defaults from other repositories.
- If a required repo fact is missing, report it as unknown and request human
  input instead of guessing.
