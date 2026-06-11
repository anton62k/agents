# Review Current Branch

Use this prompt for a code-review pass before PR or merge.

## Agent Task

1. Identify base branch and current diff.
2. Run targeted validation first, then full local verification.
3. Review for behavior regressions, missing tests, type/API drift, docs drift,
   security risks, and release impact.
4. Fix clear issues directly.
5. Report remaining risks only when they are real and actionable.

## Output

- Findings first, ordered by severity, with file/line references.
- Validation commands and results.
- Remaining risks or test gaps.
