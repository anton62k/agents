# Preserving preferences

When the user asks to "extract lessons", "remember this rule", or states a
personal principle:

1. Write a short generalization that preserves the meaning and scope.
2. Find the narrowest home: a local `AGENTS.md` or `REVIEW.md`, a stack profile,
   general code or test principles, or a workflow. Do not turn a business decision
   into a global norm.
3. Propose the exact file and wording. A rule stated explicitly by the user may be
   recorded immediately when requested; keep the agent's own generalization in
   `proposals/` until the user accepts it.
4. If it conflicts with an existing rule, show the difference instead of silently
   rewriting the accepted rule.
5. After acceptance, remove duplicate wording, add links when needed, check affected
   examples or templates, and make the Git change easy to review.

A proposal records the rule, scope, reason, short example, verification criterion,
and `proposed`, `accepted`, or `rejected` status. Do not store private data, full
conversations, or logs. Rules work by loading instructions; they do not change
model weights.
