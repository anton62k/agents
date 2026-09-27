# Delegation

- The coordinator records the objective, boundaries, shared context, and current
  decisions. An architect owns one task and worktree, its contracts, integration,
  and acceptance.
- Give an implementer a narrow prompt: objective, write scope, relevant rules, one
  example, acceptance criteria, and checks. The full conversation history is not
  necessary.
- Give an architect the complete current decision summary and known constraints.
  Mark conflicting old examples explicitly as obsolete.
- Let the implementer finish autonomously. Review after completion unless there is
  a real blocker, then return concrete findings to the same owner.
- Parallel tasks need separate write scopes. Migrations and shared artifacts need
  separate worktrees and databases or sequential integration by one owner.
- Write tests before implementation. One implementer's temporary failing tests must
  not break another's checks. The architect defines isolation before starting.
- The architect's result includes the diff, criterion-to-evidence mapping, complete
  gate, real limitations, revision count, and suggested prompt or rule improvements.
  Do not accept code only because someone reports that everything is green.
- The coordinator need not repeat every line-level review, but must verify complete
  results, task compatibility, and check evidence. Give the user a separate diff
  for each task.
- Route user findings back to the owner. Return accepted generalizations to the
  rules through `workflow/learning.md`. Do not promise zero drift or no review.
- Before implementation or delegation of behavior changes, present concise business
  requirements: state or event to expected behavior, including concurrent and
  repeated actions when relevant. Discuss and agree on disputed cases. Do not ask
  for approval again for already agreed requirements. Return new product guarantees
  for discussion before implementation.
- In the overall plan, separate infrastructure connections, configuration, and
  system mechanisms from business behavior. Agree on the overall plan first, then
  discuss stage requirements in order. A stage may be split further during
  discussion; that does not authorize implementation of new parts.
- When discussing a stage, add the minimum system analysis: current implementation
  when one exists, components and responsibilities, data flow, configuration and
  contracts, required checks, and open decisions. Start with a high-level proposal;
  do not treat legacy code as the standard automatically.
