# Role Definition Format

Each portable role lives at `roles/<role>/ROLE.md`.

## Required Sections

- `# Role: <id>`: stable kebab-case role id.
- `Purpose`: what this role owns.
- `When To Use`: trigger phrases and pipeline steps.
- `Rights`: read/write and external-action boundary summary.
- `Default Model Level`: portable recommendation using cheap, standard, or deep.
- `Inputs`: artifacts and placeholders the role needs.
- `Outputs`: structured result and artifacts the role returns.
- `Hard Rules`: behavior that must always hold.
- `References`: role-local and shared knowledge files to read on demand.

Specialized roles may include `Extends` between `Purpose` and `When To Use`.

## Catalog Metadata

`roles/INDEX.md` owns routable metadata:

- stable role id;
- role file path;
- primary surface;
- routing capabilities;
- rights summary for route planning.

Do not duplicate catalog metadata as separate sections in every role file.
Future machine-readable imports should validate `roles/INDEX.md` against
`ROLE.md` files and adapter wrappers.

## Knowledge References

`ROLE.md` is the dispatcher. It should stay short. Detailed knowledge lives in
`roles/<role>/references/`.

Shared practices that apply to multiple roles live in top-level `references/`.
Role-local references describe duties and handoffs. Shared references describe
methods such as requirements engineering, ADRs, C4, BPMN, DDD, or test strategy.

Role `References` sections may include both role-local files and shared
practice references. Do not create a separate `practice_references` section
unless the role format is changed in this file first.

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
attempt metadata around the portable result.

Usage and cost metadata are recorded by the orchestrator or adapter according to
`usage-accounting.md`; roles do not emit billing fields.

## Model Policy

`default_model_level` is a portable recommendation, not a concrete provider
model. Concrete model names are selected from local execution profiles or future
runtime config according to `execution-policy.md`.

Runner types such as deterministic scripts are not model levels. Put them in
rights, adapter docs, or execution profiles.
