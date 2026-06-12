# Method Consistency Checklist

This checklist is the self-review gate for changes to the canonical method.
Run it before publishing a method PR.

## When To Run

- [DECISION] Run for any PR that changes `method/`, `roles/`, `pipelines/`,
  `references/`, `stacks/`, `adapters/`, `templates/`, or `checklists/`.
- [DECISION] Run after local markdown validation and before publishing or
  merging the PR.
- [DECISION] Run again after review-comment fixes when the fix changes routing,
  wrappers, gates, or source-of-truth order.

## Checklist

- [ ] `node tools/validate.mjs` passes.
- [ ] The change belongs to the edited owner: role, stack, framework reference,
  shared reference, pipeline, adapter, template, or local overlay.
- [ ] `roles/INDEX.md` matches routable role files.
- [ ] Role frontmatter `id`, `surface`, `rights`, and `default_model_level`
  matches `method/role-definition.md` and `roles/INDEX.md`.
- [ ] Routable role wrappers match `roles/INDEX.md` in:
  - `adapters/codex/materialized/agents/`
  - `adapters/claude-code/materialized/agents/`
- [ ] `pipelines/INDEX.md` matches pipeline files.
- [ ] Pipeline frontmatter `id` matches `method/pipeline-definition.md` and
  `pipelines/INDEX.md`.
- [ ] `platform_invocation: skill-wrapper` pipelines have matching skill
  wrappers in Codex and Claude Code adapters, or the omission is documented.
- [ ] Adapter wrappers point back to canonical sources and do not redefine role
  or pipeline behavior.
- [ ] Route plan, run state, and artifact templates agree on execution policy,
  consensus, budget, and usage fields.
- [ ] Pipeline execution-policy defaults do not hardcode concrete provider model
  names.
- [ ] Usage accounting keeps cost and token metadata outside portable
  `AgentResult`.
- [ ] Source labels are present for new hard rules.
- [ ] Core and conditional references are classified correctly.
- [ ] Shared rules are not duplicated across many roles.
- [ ] Artifact templates are updated when artifact schemas change.
- [ ] `legacy/` is not used as runtime knowledge.
- [ ] No committed file contains concrete local paths, accounts, tokens, hosts,
  namespaces, deployment coordinates, or secrets.
- [ ] README remains human-facing; `AGENTS.md` remains agent-facing; detailed
  procedures stay in `method/`.
- [ ] The result remains usable by Codex, Claude Code, and future revo import.

## Output

```yaml
method_consistency_check:
  status: ready | needs_fix | needs_human
  checked_files: []
  blockers: []
  documented_omissions: []
```
