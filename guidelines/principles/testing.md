# Testing

- Use TDD by default for new behavior and fixes: write a readable test, observe
  the expected failure for the right reason, implement the minimum, then refactor
  while tests are green.
- A test that is already red should use readable fixtures or a DSL. One scenario
  describes one behavior; multiple assertions are fine for one outcome.
- Keep a scenario at one level: conditions, action, and expected outcome. SQL,
  transport, processes, and synchronization belong in support code.
- Reuse the existing fixture or DSL first; extend it with a small vocabulary as
  needed. Avoid branching inside a test to select different scenarios.
- Test the behavior of our system. Do not test trivial framework delegation,
  generated code, or a library implementation merely for coverage.
- A behavior-preserving refactor relies on existing green tests. Do not break code
  artificially to claim TDD. Explain an exception in the report.
- Use real dependencies for transactional and recovery invariants; inject failures
  narrowly. Synchronize races with barriers, not delays presented as proof.
- Run the project's defined gate after the final change. Report commands, red/green
  evidence, and limitations. Do not present another person's run as your own.
- When extending an existing chain DSL, preserve its sequential interface.
  Simplifying mocks and support code must not replace the agreed scenario language.
