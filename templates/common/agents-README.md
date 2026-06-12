# .agents

This directory is a consuming-repo overlay for the canonical agents method.

For multi-repo workspaces, prefer
`{{AGENTS_REPO_PATH}}/templates/workspace/agents-README.md` at the workspace
root. Use this repo-local file only when this repository is a standalone
consuming root or needs a child-repo overlay.

## Source

- canonical method: `{{AGENTS_REPO_PATH}}`
- manual run protocol: `{{AGENTS_REPO_PATH}}/method/manual-run.md`
- bootstrap protocol: `{{AGENTS_REPO_PATH}}/method/bootstrap.md`
- materialization protocol: `{{AGENTS_REPO_PATH}}/method/materialization.md`
- artifact templates: `{{AGENTS_REPO_PATH}}/templates/artifacts/`

## Local Files

Use ignored files for concrete local values:

- `.agents/local.env`
- `.agents/local.context.md`
- `.agents/runs/`

Use `{{AGENTS_REPO_PATH}}/templates/artifacts/execution-profile.md` as the
template for available roles, runners, model profiles, consensus providers, and
budget defaults. Save the filled profile as
`.agents/local.execution-profile.md`. Keep the filled profile ignored unless the
repository explicitly wants to commit non-sensitive defaults.

Example `.agents/local.context.md`:

```md
agents_repo_path: <local checkout of the canonical agents repository>
target_repo_path: <local checkout of this repository>
execution_profile: .agents/local.execution-profile.md
```

## Rules

- Do not copy the full canonical method into this directory.
- Keep generated skills or adapter files reproducible from
  `{{AGENTS_REPO_PATH}}`.
- Keep run artifacts out of reusable method changes unless the repo explicitly
  commits them.
