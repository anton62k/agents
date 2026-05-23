# Quality Gates

Every maintained project should define one local command that approximates CI.

Recommended command name: `verify`.

A strong `verify` command usually includes:

- markdown/docs lint when docs are part of the repo;
- formatting check;
- typecheck;
- lint with zero warnings;
- unit tests with coverage;
- build;
- package or smoke test when release packaging matters.

CI should call the same command before deployment or publish steps.
