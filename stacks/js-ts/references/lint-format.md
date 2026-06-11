# Lint And Format Reference

Lint and format checks are quality gates, not cleanup suggestions.

## Hard Rules

- [DECISION] Fix lint and format issues directly unless the rule is demonstrably
  wrong for the repo.
- [DECISION] Do not use suppressions or ignores to hide active source files from
  lint, format, or markdown checks.
- [DECISION] Ignore generated, vendored, build, coverage, or cache paths only
  when ownership is explicit.
- [DECISION] Run the repo's strict lint and format gates before publishing
  changes when the pipeline requires local verification.
- [DECISION] Treat zero-warning policies as blocking when the repo or CI defines
  them.

## Source Material

- `../../../legacy/practices/eslint-prettier-markdownlint.md`
