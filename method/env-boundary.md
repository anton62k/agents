# Environment Boundary

Committed markdown must describe what a role or pipeline needs, not one local
machine's values.

## Forbidden In Committed Markdown

Do not commit:

- personal GitHub account names;
- absolute home paths;
- tokens, passwords, API keys, secret values;
- private hostnames, cluster names, namespaces, or environment URLs;
- PR numbers, branch names, or deployment coordinates from a specific run;
- one-machine paths to worktrees, caches, browser profiles, or kube configs;
- account-bound runner configuration, provider pricing tables, or concrete
  model choices that should come from local execution profiles.

## Allowed In Committed Markdown

Use placeholders and variable names:

- `{{GH_ACCOUNT}}`
- `{{GH_REPO}}`
- `{{BASE_BRANCH}}`
- `{{REPO_PATH}}`
- `{{RUN_ID}}`
- `{{TARGET_ENV}}`
- `{{SONAR_PROJECT_KEY}}`
- `{{KUBE_CONTEXT}}`
- `{{ADMIN_SECRET_REF}}`
- `{{MODEL_PROFILE}}`
- `{{LOCAL_MODEL_NAME}}`
- `{{RUNNER_ID}}`

Environment variable names are allowed when they are generic and contain no
secret value, for example `AGENTS_GH_ACCOUNT`, `AGENTS_TARGET_ENV`,
`AGENTS_SONAR_TOKEN`, or `AGENTS_KUBE_CONTEXT`.

## Local Overlay Pattern

Each consuming repo may keep ignored local files for values:

- `.agents/local.env`
- `.agents/local.context.md`
- `.claude/settings.local.json`
- shell environment exported before a run

These files are not source of truth for the method. They only bind placeholders
for a specific machine or run.

## Handoff Rule

Role and pipeline definitions may say:

```text
Integrator requires {{GH_ACCOUNT}} and {{GH_REPO}}.
```

They must not say:

```text
Integrator uses a concrete personal account in a concrete private repo.
```

If a value is needed for execution, the orchestrator or main agent resolves it at
run start and records the resolved value in the run ledger, not in this method
repository.
