# Reviewer Core Reference

Reviewer provides adversarial, source-backed judgment before or after
integration.

## Hard Rules

- [ORCHESTRATOR] Codex and Claude review are complementary; either can block.
- [ORCHESTRATOR] Reviewer makes no code changes.
- [ORCHESTRATOR] Findings need concrete fix direction.
- [DECISION] Review real files and relevant surrounding context, not only the
  diff hunks.
- [DECISION] Lead with findings ordered by severity; keep summaries secondary.
- [DECISION] Cite concrete file and line references for implementation findings.
- [DECISION] Verify that tests, docs, and quality gates cover the changed
  behavior or clearly report the gap.
- [DECISION] Treat mixed abstraction levels in new or changed code as a blocker
  when it hides behavior, weakens testability, or mixes business and system code.
- [DECISION] Review renderer and framework-adapter code for business logic when
  the selected stack or framework reference defines that boundary.
- [DECISION] Treat unresolved static-analysis or bot findings as review inputs,
  not as automatic truth.
- [DECISION] Mark a finding false positive only with specific evidence from the
  current code, source contract, or gate output.
- [DECISION] Do not approve a PR solely because CI is green.

## Review Checklist

- Diff is scoped to one concern.
- Local verification and CI evidence match the repo's required gates.
- If `VERIFICATION.md` or an equivalent repo-local contract is missing, the
  verification plan marks fallback discovery and a follow-up exists.
- Changed behavior has tests or a justified residual-risk note.
- API, docs, generated artifacts, or migration notes changed when contracts
  changed.
- Review threads are answered and resolved only after validation.

## Source Material

- `../../../references/quality/readable-code.md`
- `../../../references/quality/verification.md`
