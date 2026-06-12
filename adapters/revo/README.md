# revo Import Spec

This adapter defines how the future revo agent-orchestrator imports the
canonical Revisium Agent Playbook.

The importer must use machine-readable playbook metadata for discovery. Markdown
files remain source material for prompts and human review; they are not the
catalog contract.

## Package Coordinates

- canonical repository: `revisium/agent-playbook`
- package name: `@revisium/agent-playbook`
- manifest path: `playbook.json`
- catalog paths are declared by `playbook.json.catalogs`

## Import Command

Target command:

```bash
revo playbook install revisium/agent-playbook
```

Package-based installation may use:

```bash
revo playbook install @revisium/agent-playbook
```

The installer resolves the source, reads `playbook.json`, validates the declared
catalogs, and stores a versioned playbook snapshot in the control plane.

## Source Of Truth

The importer reads these files for discovery:

1. `playbook.json`
2. `catalog/roles.json`
3. `catalog/pipelines.json`

The importer must not discover roles or pipelines by scanning `roles/`,
`pipelines/`, adapter wrappers, or markdown headings. Those files may be opened
only after catalog validation, for prompt composition or source display.

## Compatibility

`playbook.json.schema_version` is the import contract version. The importer must
refuse unknown schema versions instead of guessing or partially importing.

Minimum behavior:

```text
if schema_version not in supported_schema_versions:
  fail import with unsupported_schema_version
```

`playbook.json` intentionally has no `version` field. Runtime playbook version
comes from package/install metadata, for example the npm package version or an
explicit source revision pinned by the installer.

## Control-Plane Model

Minimum target table:

```text
playbooks
  name
  source
  version
  schema_version
```

Suggested source values:

- `github:revisium/agent-playbook#<ref>` for repository installs
- `npm:@revisium/agent-playbook@<version>` for package installs

Imported roles and pipelines must reference the installed playbook through
`playbook_id`. Role and pipeline ids are stable only inside a playbook version;
do not treat a bare role id as globally unique.

Every run must record the source playbook identity:

```yaml
playbook: "Revisium Agent Playbook@<version>"
```

## Role Import

For each record in `catalog/roles.json`, import or derive:

- `id`
- `runtime_name` from the mapping below;
- `path`
- `surface`
- `rights`
- `model_level` from `default_model_level`;
- `allowed_tools` from `rights`;
- `runner` from `rights`;
- optional `prompt`

Mapping rules:

- `default_model_level` maps to runtime `model_level`.
- `rights` maps to `allowed_tools`.
- `path` must point to the canonical role file inside the installed playbook.
- Wrapper paths are adapter metadata for Codex and Claude Code; revo must not use
  wrappers as role definitions.

Runtime name mapping:

| Playbook role id | revo runtime name |
| --- | --- |
| `analyst` | `analyst` |
| `architect` | `architect` |
| `developer` | `developer` |
| `reviewer` | `reviewer` |
| `watcher` | `pr-watcher` |
| `deploy-watcher` | `deploy-watcher` |
| `qa-backend` | `qa-backend` |
| `qa-frontend` | `qa-frontend` |

Role ids not listed above keep their playbook id unless this adapter defines a
future explicit mapping.

## Rights Mapping

| Playbook rights | revo allowed tools | Runner |
| --- | --- | --- |
| `read-only` | `Read`, `Grep`, `Glob` | prompt |
| `write-working-tree` | `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash` | prompt |
| `qa-live` | `Read`, `Bash`, plus platform tools from runtime config | prompt |
| `deploy-read` | `Read`, `Bash`, plus platform tools from runtime config | prompt |
| `git-gh` | engine-owned git and GitHub operations | script |
| `deterministic-script` | engine-owned deterministic operations | script |

`git-gh` and `deterministic-script` roles are implemented by revo engine code.
They are imported as code-backed roles with `runner: script`; prompt
materialization is optional and must not be required for execution.

Current code-backed roles:

- `integrator`
- `merger`

## Prompt Composition

For prompt-backed roles, the base prompt is composed from:

1. the body of `roles/<role>/ROLE.md` after stripping YAML frontmatter;
2. `roles/<role>/references/core.md`.

Conditional references, shared quality references, stack references, and
repo-local overlays are not part of the base prompt. They are added at route
time according to the selected pipeline, stack, surface, repo overlay, and human
approval state.

The importer may store prompt source paths and content hashes so the runtime can
detect drift, but it must preserve the installed playbook snapshot used by each
run.

## Pipeline Import

For each record in `catalog/pipelines.json`, import:

- `id`
- `path`
- `triggers`
- `required_roles`
- `alternative_roles`
- `optional_roles`
- `route_gates`
- `platform_invocation`
- `execution_policy`

`execution_policy.recommended_model_levels` maps to route-time model
recommendations. It must not hard-code provider model names. Concrete model
names, pricing, credentials, rate limits, and runner availability come from
runtime config or ignored local overlays.

Pipeline markdown may be opened after catalog validation to display the
canonical workflow to a human or to compose a route plan. It is not the discovery
source.

## Route-Time Behavior

The revo orchestrator should select a pipeline from the imported catalog, verify
that required roles exist for the installed playbook, propose model levels and
consensus settings from `execution_policy`, and ask for human approval when the
route contract requires it.

The route plan should record:

- playbook identity;
- selected pipeline id;
- selected role ids and runtime names;
- model levels and runner choices;
- consensus policy;
- human gates and unresolved clarification markers.

If a required role is absent, rights cannot be mapped, schema version is
unsupported, or a blocking clarification marker remains, the route must stop
instead of degrading silently.

## Usage Accounting

Roles emit portable results without cost fields. revo owns attempt ids, token
usage, cost metadata, model names, and runtime progress records. Use
`method/usage-accounting.md` as the semantic boundary.
