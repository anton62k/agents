# Quality References

Quality references help agents decide whether a proposed change is safe enough.

## Practices

- risk-based review;
- test strategy by behavior and blast radius;
- verification gates;
- residual risk reporting;
- non-functional quality checks;
- readable code and maintainability boundaries.

## Core References

- `readable-code.md` - stack-neutral readability, abstraction-level, SOLID, and
  business/system boundary rules.
- `verification.md` - generic verification planning and result contract.
- `static-analysis.md` - provider-backed findings, local/hosted modes, and
  issue-level triage rules.

## Used By

- `reviewer` as primary owner;
- `architect` when quality attributes drive design;
- `developer` when implementing readable code, selecting tests, and running local
  verification;
- `watcher` when classifying CI, static-analysis, and review outcomes;
- `orchestrator` when deciding whether a gate is satisfied.
