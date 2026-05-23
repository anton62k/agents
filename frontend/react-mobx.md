# React And MobX

Recommended approach:

- Keep view models outside component render when lifecycle independence matters.
- Components observe public reactive getters.
- Avoid manual subscriptions in React components when MobX can express the same
  dependency.
- Dispose long-lived view models explicitly.
- Keep async side effects visible and testable.
