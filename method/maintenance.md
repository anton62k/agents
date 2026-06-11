# Method Maintenance

This file tells agents how to update the method safely.

## Update Flow

1. Identify the source of the lesson:
   - repeated run failure;
   - review finding;
   - user decision;
   - source-code convention;
   - platform limitation.
2. Put unapproved lessons in the relevant `_learnings-candidate.md`.
3. Promote to `ROLE.md`, `STACK.md`, `PIPELINE.md`, or a reference only after
   human approval.
4. Keep the promoted rule close to its owner:
   - role responsibility -> `roles/<role>/`;
   - language/ecosystem behavior -> `stacks/<stack>/`;
   - framework behavior -> framework reference;
   - workflow order/gates -> `pipelines/<pipeline>/`;
   - platform mechanics -> `adapters/<platform>/`;
   - fillable artifact shapes -> `templates/artifacts/`;
   - legacy source material -> `legacy/`;
   - local values -> local overlay, never committed markdown.
5. Update `roles/INDEX.md` or `pipelines/INDEX.md` when adding, removing, or
   changing routable roles or pipelines.
6. Add or update a checklist/reference when the rule changes what an agent does.
7. Update artifact templates when canonical artifact schemas change.

## Source Labels

Every new hard rule needs a source label:

- `[ORCHESTRATOR]` - extracted from existing runs or pipeline docs.
- `[CODE]` - backed by a real source file in a consuming repo.
- `[DECISION]` - approved by the human.
- `[BEST-PRACTICE]` - proposed general practice; keep non-blocking until approved.
- `[TODO]` - intentionally incomplete base rule.

## Promotion Rules

- Repeated failure once: record in `_learnings-candidate.md`.
- Repeated failure twice: propose a role/reference change.
- Safety issue: propose immediate hardening.
- Env or secret leak risk: fix immediately and cite `env-boundary.md`.

## Do Not

- Do not duplicate the same rule across many roles.
- Do not encode run-specific values in method files.
- Do not let adapters fork canonical behavior.
- Do not silently change merge, deploy, or secret-access rules.
- Do not promote best-practice suggestions to hard rules without approval.

## Review Checklist For Method Changes

- Does this belong to role, stack, framework, pipeline, adapter, or local overlay?
- Is the source label present?
- Are placeholders used instead of local values?
- Are discovery catalogs updated when routable roles or pipelines changed?
- Is the rule short in dispatcher files and detailed in references?
- Are fillable artifact templates updated when artifact schemas changed?
- If the source is legacy material, was only the reusable part promoted?
- Does the change remain usable by Codex, Claude Code, and future revo?
