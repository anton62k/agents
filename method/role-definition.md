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
- `practice_references`: shared reusable practices loaded from `references/`.
- `platform_notes`: adapter-specific constraints for Codex, Claude Code, and
  future revo.

## Knowledge References

`ROLE.md` is the dispatcher. It should stay short. Detailed knowledge lives in
`roles/<role>/references/`.

Shared practices that apply to multiple roles live in top-level `references/`.
Role-local references describe duties and handoffs. Shared references describe
methods such as requirements engineering, ADRs, C4, BPMN, DDD, or test strategy.

Use this split:

- `references/core.md` - role behavior and handoff rules.
- `references/review-checklist.md` - review dimensions or quality gates.
- `references/examples/` - good and bad examples.

Unapproved lessons and raw project evidence stay outside this repository. After
human approval, commit only the reusable abstraction to the canonical owner file.

## Source Labels

Every non-obvious rule should carry one source label:

- `[ORCHESTRATOR]` - extracted from existing `.agents` or pipeline docs.
- `[CODE]` - extracted from approved public/example source or current method repo
  files. Private project evidence must be aggregated outside this repository.
- `[BEST-PRACTICE]` - approved general practice that is not tied to one source.
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
