# Business requirements and project documentation

Apply this workflow when framing a project, gathering or changing business
requirements, and organizing a documentation repository. Explicit user
instructions take precedence.

- Start with a general `REQ-001`: purpose, user, primary scenario, and boundaries.
- Record observable behavior without mixing in code structure, schemas, or tables.
- Separate accepted rules, proposals, and open questions. Do not invent business
  decisions.
- Give every rule an ID such as `REQ-002.BR-001`. Number draft rules sequentially;
  when reordering, renumber them and update references. Freeze IDs after approval
  and do not reuse removed accepted IDs. System operations and checks reference IDs.
- A plan describes stage order, dependencies, and linked statuses; it does not
  duplicate requirements.
- Separate infrastructure and business stages. A stage may be split during discussion.
- Agree on business rules before system analysis and implement only after decisions
  are accepted.
- Use Crit only on explicit request. After a substantive round, commit and push to
  the authorized working branch; do not promise background autosave.

## Incremental collaboration

Gradually transfer ownership of the document context to the user so later decisions
build on an understood and accepted foundation. The user acts as both business
representative and requirements co-author.

- Work from general to specific and simple to complex: purpose, boundaries, and the
  primary scenario first, then behavioral details. Do not generate a large document
  or project-wide questionnaire before the first discussion.
- Keep each round small: one decision or a few tightly related decisions. Size the
  round by cognitive difficulty, not line or section count.
- Leave stable text after agreement. Later iterations should mostly add detail. Do
  not ask again about accepted decisions.
- Revisit an accepted rule only for a concrete contradiction or changed decision.
  Show the reason and affected rules and propose a bounded edit. Do not preserve an
  error merely to keep the diff additive.
- Do not mix a substantive choice with incidental restructuring, mass editing, or
  terminology changes.
- Separate business choices from missing facts. Ask the user for business choices;
  verify or research facts instead of turning research into a question for them.
- Close each round with a concrete result: accepted decisions, changed wording, and
  the next small area. Do not turn open questions into assertions.

## Questions and options

Before detailing a new group, establish direction with a small number of questions.
Options remain proposals until the user accepts them, even when already phrased as
requirements.

Make each question self-contained: give enough context for the decision without
filler or mandatory navigation to other documents. When referencing another
requirement ID, briefly restate the relevant rule; the link anchors context rather
than replacing it.

Question format:

- Already decided: the short current rule and ID when relevant.
- Still to decide: the concrete gap and its effect on product behavior.
- Options: distinguishable alternatives phrased close to future requirements.
- Difference: material consequences without repeating all context.
- Recommendation: one explicitly selected option with a short reason.

Add an example when it helps distinguish options. If a question needs a long
explanation, address a more general question first or move research into a separate
document. Do not add alternatives only to increase their count.

## Review with Crit

- Clearly identify the current round's package: what is proposed for acceptance and
  which options are recommended. Keep accepted text available as context.
- Show the current iteration's changes. For diff review, use the previous completed
  iteration as the base rather than the branch's accumulated diff; use the full diff
  when requested. Open question documents in a mode that exposes required context.
- Approval without comments accepts the entire explicitly proposed round, including
  recommended options. Move them into requirements without asking again. Make every
  recommendation visible and unambiguous.
- Silence or absence of comments is not approval. When a review contains comments,
  process that feedback; do not treat an unanswered question as accepted merely
  because the user commented elsewhere.
- Approval of a round does not mean the entire document is complete. Before finishing,
  check alignment with accepted decisions, consistency with adjacent requirements,
  and coverage of the agreed scope.

## Research for a decision

When a response requires research, including research triggered by user feedback,
prepare a separate Markdown document and include it in the same Crit round. Record
findings, sources, limitations, and the conclusion relevant to the decision.

Keep a short result and its effect on the recommendation next to the question, with
a link to the research. Reading the full research must not be required to understand
the choice.

For a detailed temporary comparison, follow "Options for discussion" in
[system analysis](system-analysis.md). After acceptance, move required conclusions
into canonical documents and delete the temporary comparison. Preserve useful
sourced research under `research/` when appropriate.

## Typical documentation repository

- `README.md`: navigation.
- `plan.md`: stages.
- `product/`: purpose and vocabulary.
- `requirements/`: REQs.
- `adrs/`: decisions, module APIs, and algorithms, linked to REQs.
- `specs/`: optional detail that would make the parent ADR too large.
- `ux/`: interface and interaction.
- `research/`: research.
- `templates/`: templates.

Create sections only when needed and keep content separate. Raw prompts, logs, and
conversation transcripts are not canonical project documentation.
