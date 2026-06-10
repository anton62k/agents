# Bootstrap For Consuming Repositories

Bootstrap tells a product repository how to discover this method without copying
all method files into the product repo.

## Repository Split

- This repository is the canonical method source.
- Consuming repositories keep product context, local overlays, generated adapter
  files, and run artifacts.
- Do not copy run histories, local values, or generated platform files back into
  this repository.

## New Device Setup

On a new device, do this before running agents:

1. Clone or otherwise make this repository available as `{{AGENTS_REPO_PATH}}`.
2. Clone the consuming repository as `{{TARGET_REPO_PATH}}`.
3. Add or verify the consuming repo's agent entrypoints:
   - `AGENTS.md` for Codex-facing repo guidance;
   - `CLAUDE.md` when Claude Code should read repo guidance;
   - `.agents/` for repo-local overlays, generated links, and run artifacts.
4. In the consuming repo, record only placeholders and links to
   `{{AGENTS_REPO_PATH}}`; do not record one-machine absolute paths in committed
   files.
5. Create ignored local overlay files for concrete values, for example
   `.agents/local.env` or `.agents/local.context.md`.
6. Start work with `manual-run.md` until a future orchestrator imports these
   definitions directly.

The agent resolves `{{AGENTS_REPO_PATH}}` from the local overlay before reading
canonical method files. If no overlay exists, the main agent asks the human for
the method checkout location.

## What To Copy

Copy only entrypoint templates into a consuming repo:

```sh
cp {{AGENTS_REPO_PATH}}/templates/common/AGENTS.md AGENTS.md
cp {{AGENTS_REPO_PATH}}/templates/common/CLAUDE.md CLAUDE.md
mkdir -p .agents
cp {{AGENTS_REPO_PATH}}/templates/common/agents-README.md .agents/README.md
```

Do not copy the full method tree into `.agents/`. Keep canonical roles,
pipelines, stacks, and adapters in this repository.

## Consumption Modes

### Link Mode

The consuming repo keeps a small committed pointer to this method and agents read
from `{{AGENTS_REPO_PATH}}` at runtime.

Use when Codex or Claude Code can access both repositories on the same machine.

### Generated Mode

The consuming repo generates or copies adapter-specific files from this method,
for example `.claude/agents/*` or `.agents/skills/*`.

Use when a platform expects files inside the consuming repo.

### Vendor Mode

The consuming repo vendors a pinned copy or submodule of this repository.

Use only when link mode is not practical. Keep the pinned revision visible in
repo-local docs or run state.

## Minimal Consuming Repo Shape

```text
AGENTS.md
CLAUDE.md
.agents/
  README.md
  local.env              # ignored
  local.context.md       # ignored
  runs/                  # ignored or run-artifact policy controlled
```

Example ignored `.agents/local.context.md`:

```md
agents_repo_path: <local checkout of the canonical agents repository>
target_repo_path: <local checkout of this consuming repository>
```

## Entry Point Contract

The consuming repo entrypoint should say:

```md
Use the canonical agent method from {{AGENTS_REPO_PATH}}.
Start every multi-role task with:
1. {{AGENTS_REPO_PATH}}/method/manual-run.md
2. {{AGENTS_REPO_PATH}}/method/intake.md
3. {{AGENTS_REPO_PATH}}/roles/INDEX.md
4. {{AGENTS_REPO_PATH}}/pipelines/INDEX.md
```

## Skill And Agent Files

- Codex skills that must be locally discoverable may be generated, copied, or
  linked into `.agents/skills/`.
- Claude Code agent files may be generated, copied, or linked into
  `.claude/agents/`.
- Generated files must keep a pointer to the canonical role or skill source.
- Generated files are adapter output, not canonical method.

## Rules

- Keep committed consuming-repo files portable; concrete machine paths belong in
  ignored local overlays.
- Keep `.agents/runs/` out of reusable method changes unless a product repo
  explicitly commits run artifacts.
- Generated Codex or Claude Code files must be reproducible from this repository.
- Future revo import should read canonical method files, not generated adapter
  output.
