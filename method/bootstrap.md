# Bootstrap For Consuming Roots

Bootstrap tells a workspace or standalone product repository how to discover
this method without copying all method files into every product repo.

## Root Types

- `workspace root`: a folder that contains several product repositories and one
  checkout of this canonical agents repository.
- `standalone repo root`: a single product repository that consumes this method
  directly.

Prefer the workspace root for multi-repo work. Use standalone repo roots only
when a project is truly isolated or the platform must be launched inside that
repository.

## Repository Split

- This repository is the canonical method source.
- The consuming root keeps platform entrypoints, symlinks, local overlays,
  generated adapter files, and run artifacts.
- Child product repositories keep product context and repo-specific overlays.
- Do not copy run histories, local values, or generated platform files back into
  this repository.

## New Device Setup

On a new device, do this before running agents in workspace mode:

1. Create or clone the workspace root as `{{WORKSPACE_ROOT}}`.
2. Clone or otherwise make this repository available as `{{AGENTS_REPO_PATH}}`,
   preferably under `{{WORKSPACE_ROOT}}/agents`.
3. Clone product repositories under `{{WORKSPACE_ROOT}}`.
4. Add or verify the workspace root entrypoints:
   - `AGENTS.md` for Codex-facing guidance;
   - `CLAUDE.md` for Claude Code guidance;
   - `.agents/README.md` for local overlays and run state;
   - ignore rules based on `templates/workspace/gitignore` if the workspace
     root is versioned;
   - symlinks from `.agents/`, `.codex/`, and `.claude/` to adapter
     materialized files.
5. Add repo-local overlays only when a child repository has specific commands,
   verification gates, review policy, source-of-truth order, or domain facts:
   - `REVIEW.md` for the repo's PR review rubric;
   - `VERIFICATION.md` for exact local and remote quality gates;
   - optional `REPOSITORY.md` for repo structure and source-of-truth order;
   - a thin child `AGENTS.md` or `CLAUDE.md` only when agents are commonly
     launched from inside that child repository.
6. In committed files, record only placeholders and relative links; do not
   record one-machine absolute paths.
7. Create ignored local overlay files for concrete values, for example
   `.agents/local.env` or `.agents/local.context.md`. When model, runner,
   consensus, or budget defaults are needed, use
   `templates/artifacts/execution-profile.md` as the local profile template.
8. Read `materialization.md` before linking adapter files.
9. Start work with `manual-run.md` until a future orchestrator imports these
   definitions directly.

The agent resolves `{{AGENTS_REPO_PATH}}` from the local overlay before reading
canonical method files. If no overlay exists and the default
`{{WORKSPACE_ROOT}}/agents` path is missing, the main agent asks the human for
the method checkout location.

## Workspace Symlink Layout

Use symlink-first materialization at the workspace root:

```sh
mkdir -p .agents .codex .claude
ln -sfn ../agents/adapters/codex/materialized/skills .agents/skills
ln -sfn ../agents/adapters/codex/materialized/agents .codex/agents
ln -sfn ../agents/adapters/claude-code/materialized/agents .claude/agents
ln -sfn ../agents/adapters/claude-code/materialized/skills .claude/skills
```

Then add workspace entrypoints:

```sh
cp {{AGENTS_REPO_PATH}}/templates/workspace/AGENTS.md AGENTS.md
cp {{AGENTS_REPO_PATH}}/templates/workspace/CLAUDE.md CLAUDE.md
cp {{AGENTS_REPO_PATH}}/templates/workspace/agents-README.md .agents/README.md
```

If the workspace root is versioned, merge
`{{AGENTS_REPO_PATH}}/templates/workspace/gitignore` into its ignore rules.

Do not symlink canonical `roles/` directly into platform discovery folders.
Codex and Claude Code expect platform-specific formats. Link only adapter
materialized files that point back to canonical roles, pipelines, references,
and stacks.

If an adapter materialized directory does not exist yet, stop with
`needs_method_materialization` instead of linking an incompatible source format.

## Standalone Repo Layout

For isolated repositories, use the common templates directly in that repo:

```sh
cp {{AGENTS_REPO_PATH}}/templates/common/AGENTS.md AGENTS.md
cp {{AGENTS_REPO_PATH}}/templates/common/CLAUDE.md CLAUDE.md
cp {{AGENTS_REPO_PATH}}/templates/common/REVIEW.md REVIEW.md
cp {{AGENTS_REPO_PATH}}/templates/common/VERIFICATION.md VERIFICATION.md
mkdir -p .agents
cp {{AGENTS_REPO_PATH}}/templates/common/agents-README.md .agents/README.md
```

`REPOSITORY.md` is recommended for larger or less obvious repositories.

## Consumption Modes

### Link Mode

The consuming root keeps small committed pointers to this method and agents read
from `{{AGENTS_REPO_PATH}}` at runtime.

Use when Codex or Claude Code can access both repositories on the same machine.

### Generated Mode

The consuming root generates or copies adapter-specific files from this method,
for example `.claude/agents/*` or `.agents/skills/*`.

Use when a platform expects files inside the consuming root and symlinks are not
available.

### Vendor Mode

The consuming root vendors a pinned copy or submodule of this repository.

Use only when link mode is not practical. Keep the pinned revision visible in
repo-local docs or run state.

## Recommended Workspace Shape

```text
AGENTS.md
CLAUDE.md
.agents/
  README.md
  skills -> ../agents/adapters/codex/materialized/skills
  local.env              # ignored
  local.context.md       # ignored
  runs/                  # ignored unless run-artifact policy says otherwise
.codex/
  agents -> ../agents/adapters/codex/materialized/agents
.claude/
  agents -> ../agents/adapters/claude-code/materialized/agents
  skills -> ../agents/adapters/claude-code/materialized/skills
agents/
repo-a/
repo-b/
```

Example ignored `.agents/local.context.md`:

```md
agents_repo_path: <local checkout of the canonical agents repository>
workspace_root: <local checkout of this workspace>
```

## Entry Point Contract

The consuming root entrypoint should say:

```md
Use the canonical agent method from {{AGENTS_REPO_PATH}}.
Repo-local overlays win for concrete commands, paths, policies, and domain
facts.
Launch Codex and Claude Code from the workspace root when shared agents should
be visible to all child repositories.
Start every multi-role task with:
1. {{AGENTS_REPO_PATH}}/method/constitution.md
2. {{AGENTS_REPO_PATH}}/method/manual-run.md
3. {{AGENTS_REPO_PATH}}/method/intake.md
4. {{AGENTS_REPO_PATH}}/roles/INDEX.md
5. {{AGENTS_REPO_PATH}}/pipelines/INDEX.md
```

## Skill And Agent Files

- Codex skills that must be locally discoverable may be generated or linked into
  `.agents/skills/`.
- Codex custom agents may be generated or linked into `.codex/agents/`.
- Claude Code agent files may be generated or linked into `.claude/agents/`.
- Claude Code skills may be generated or linked into `.claude/skills/`.
- Generated files must keep a pointer to the canonical role or skill source.
- Generated files are adapter output, not canonical method.
- `materialization.md` defines headers, update flow, and validation rules for
  these files.

## Rules

- Keep committed consuming-root files portable; concrete machine paths belong in
  ignored local overlays.
- Treat `AGENTS.md`, `CLAUDE.md`, `REVIEW.md`, `VERIFICATION.md`, and
  `REPOSITORY.md` as recommended overlays, not a mandatory migration checklist
  for every existing repository.
- If a child repo has an existing equivalent, for example
  `docs/quality-gates.md`, use it as the repo overlay instead of duplicating it.
- Keep `.agents/runs/` out of reusable method changes unless a product repo
  explicitly commits run artifacts.
- Generated Codex or Claude Code files must be reproducible from this repository.
- Future revo import should read canonical method files, not generated adapter
  output.
