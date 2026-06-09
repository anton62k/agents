# Role Definition Format

Each portable role lives at `roles/<role>/ROLE.md`.

## Required Sections

- `id`: stable kebab-case role id.
- `purpose`: what this role owns.
- `when_to_use`: trigger phrases and pipeline steps.
- `rights`: read-only, write-working-tree, git-gh, deploy-read, qa-live, or
  deterministic-script.
- `default_model_level`: cheap, standard, or deep.
- `inputs`: artifacts and placeholders the role needs.
- `outputs`: structured result and artifacts the role returns.
- `hard_rules`: behavior that must always hold.
- `references`: role knowledge files to read on demand.
- `platform_notes`: adapter-specific constraints for Codex, Claude Code, and
  future revo.

## Knowledge References

`ROLE.md` is the dispatcher. It should stay short. Detailed knowledge lives in
`roles/<role>/references/`.

Use this split:

- `references/core.md` - role behavior and handoff rules.
- `references/review-checklist.md` - review dimensions or quality gates.
- `references/examples/` - good and bad examples.
- `references/_learnings-candidate.md` - unapproved repeated lessons.

Rules promoted from `_learnings-candidate.md` need human approval.

## Source Labels

Every non-obvious rule should carry one source label:

- `[ORCHESTRATOR]` - extracted from existing `.agents` or pipeline docs.
- `[CODE]` - extracted from a real file, with `path:line` in the consuming repo.
- `[BEST-PRACTICE]` - proposed general practice, needs approval before hardening.
- `[DECISION]` - approved human decision.
- `[TODO]` - unresolved or intentionally thin base placeholder.

## Output Contract

Portable roles return an agent result:

```json
{
  "output": {},
  "artifacts": {},
  "needsHuman": false,
  "lesson": null
}
```

Adapters may wrap this for a platform. For example, revo may add `nextSteps` or
cost records around the portable result.
