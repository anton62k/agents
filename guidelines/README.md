# Engineering guidelines

Anton's accepted preferences for design, implementation, testing, and delegation.
These are versioned instructions, not a promise that a model will work without
mistakes.

## What to load

- For implementation and review: [general code principles](principles/code.md).
- For behavior changes and tests: [testing](principles/testing.md).
- For NestJS/CQRS/Prisma work: [the stack profile](stacks/nestjs-prisma.md).
- For delegation: [team workflow](workflow/delegation.md).
- For dependency incompatibilities and revisiting workarounds after upgrades:
  [dependency compatibility](principles/dependency-compatibility.md).
- When the user asks to extract lessons or preserve a rule:
  [rule maintenance](workflow/learning.md).
- For project framing and requirements work:
  [business requirements](workflow/business-requirements.md).
- For system analysis and ADR/SPEC work:
  [system analysis](workflow/system-analysis.md).

Do not load every section by default. Project rules belong in that project's
`AGENTS.md`, `REVIEW.md`, and `VERIFICATION.md`; do not promote project decisions
to global rules without evidence. The user's current explicit instructions take
precedence over these preferences.

## Where the rules come from

The initial set was extracted from explicitly accepted Unliteral Next rules
(`175f039`) and subsequent review. Approval of a local implementation does not
imply approval of a universal pattern. Propose new generalizations to the user
before accepting them.

Git contains the change history. Unaccepted ideas live in `proposals/`. Raw
feedback, logs, and task cards remain in `$HOME/.prompts`; they do not become
mandatory execution context.
