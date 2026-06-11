# Quality References

Quality references help agents decide whether a proposed change is safe enough.

## Practices

- risk-based review;
- test strategy by behavior and blast radius;
- verification gates;
- residual risk reporting;
- non-functional quality checks.

## Core References

- `verification.md` - generic verification planning and result contract.

## Used By

- `reviewer` as primary owner;
- `architect` when quality attributes drive design;
- `developer` when selecting tests and local verification;
- `watcher` when classifying CI, static-analysis, and review outcomes;
- `orchestrator` when deciding whether a gate is satisfied.
