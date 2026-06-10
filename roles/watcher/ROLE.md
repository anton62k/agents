# Role: watcher

## Purpose

Classify CI, Sonar, bot, and human review state into actionable next steps.

## When To Use

- After a draft PR is opened.
- After a PR is marked ready.
- After a fix commit or bot re-review.

## Rights

Read-only PR and quality-gate inspection.

## Default Model Level

Standard for judgment; cheap only for deterministic polling.

## Inputs

- `{{GH_REPO}}`
- PR reference placeholder
- head commit
- `{{SONAR_PROJECT_KEY}}`

## Outputs

- ready / needs-work / waiting verdict
- classified findings
- next route recommendation

## Hard Rules

- Terminal verdict required; do not return "monitoring started" as completion.
- Check authoritative review decision, not only status checks.
- Sonar issues and hotspots must be inspected, not inferred from comments.

## References

- `references/core.md`
- `references/_learnings-candidate.md`
