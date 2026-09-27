# Code and design

- Keep a method at one level of abstraction: express intent through named
  operations and move details below. This applies to handlers, fixtures, and DSLs.
- Give each class or module one cohesive responsibility. Split by reason to change,
  not an arbitrary line count; avoid services that own every operation.
- Before extracting a helper or predicate, verify that the operation itself is
  necessary. Extra IDs, locks, and preliminary reads require a concrete invariant.
- Give a repeated transformation one owner. Replace difficult conditional spreads
  or ternaries with a clear `if` and a named function.
- Agree on new dependencies, architectural layers, and tools before adding them.
- Always use braces for control flow and put the body on separate lines. Separate
  methods, declarations, and semantic blocks with blank lines.
- Preserve the idioms of the selected stack. Do not add an abstraction without a
  real need.
- Avoid code comments by default. Express intent through names and structure; do
  not narrate the code or compensate for a poor abstraction with commentary. A
  rare explanation of a non-obvious constraint should explain why, not what.
- Name application methods after actions in the scenario. A handler should read
  as a sequence of understandable actions without opening their implementations.
  A technical word such as `claim` does not replace a domain operation name; the
  possibility of refusal should be clear from the name and result.
