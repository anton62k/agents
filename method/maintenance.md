# Method Maintenance

This file tells agents how to update the method safely.

## Update Flow

1. Identify the source of the lesson:
   - repeated run failure;
   - review finding;
   - user decision;
   - source-code convention;
   - platform limitation.
2. Aggregate raw project evidence outside this repository. Do not commit
   project-specific notes, examples, paths, account names, PR ids, incident ids,
   hosts, or candidate lessons.
3. Ask for human approval on the reusable abstraction.
4. After approval, edit `ROLE.md`, `STACK.md`, `PIPELINE.md`, or the closest
   reference directly.
5. Keep the approved rule close to its owner:
   - role responsibility -> `roles/<role>/`;
   - language/ecosystem behavior -> `stacks/<stack>/`;
   - framework behavior -> framework reference;
   - workflow order/gates -> `pipelines/<pipeline>/`;
   - platform mechanics -> `adapters/<platform>/`;
   - fillable artifact shapes -> `templates/artifacts/`;
   - legacy source material -> `legacy/`;
   - local values -> local overlay, never committed markdown.
6. Update `roles/INDEX.md` or `pipelines/INDEX.md` when adding, removing, or
   changing routable roles or pipelines.
7. Add or update a checklist/reference when the rule changes what an agent does.
8. Update artifact templates when canonical artifact schemas change.

## Source Labels

Every new hard rule needs a source label:

- `[ORCHESTRATOR]` - extracted from existing runs or pipeline docs.
- `[CODE]` - backed by an approved public/example source or current method repo
  file. Private project evidence must be aggregated outside this repository
  before promotion.
- `[DECISION]` - approved by the human.
- `[BEST-PRACTICE]` - approved general practice that is not tied to one source.
- `[TODO]` - intentionally incomplete base rule.

## Promotion Rules

- Repeated issue: aggregate evidence outside this repository and propose the
  reusable rule for human approval.
- Approved reusable rule: commit it directly to the canonical owner file.
- Safety issue: propose immediate hardening.
- Env or secret leak risk: fix immediately and cite `env-boundary.md`.

## Do Not

- Do not duplicate the same rule across many roles.
- Do not encode run-specific values in method files.
- Do not commit raw project evidence or lesson-candidate files.
- Do not let adapters fork canonical behavior.
- Do not silently change merge, deploy, or secret-access rules.
- Do not commit best-practice suggestions before approval.

## Review Checklist For Method Changes

- Does this belong to role, stack, framework, pipeline, adapter, or local overlay?
- Is the source label present?
- Are placeholders used instead of local values?
- Are discovery catalogs updated when routable roles or pipelines changed?
- Is the rule short in dispatcher files and detailed in references?
- Are fillable artifact templates updated when artifact schemas changed?
- If the source is legacy material, was only the reusable part promoted?
- If the source is project evidence, was raw evidence kept out of this repo and
  only the approved abstraction committed?
- Does the change remain usable by Codex, Claude Code, and future revo?
