# Package Exports

Library packages should define clear exports:

- `exports` for ESM/CJS when both are supported;
- `types` declarations;
- `files` to limit published content;
- `sideEffects` when tree-shaking behavior matters.

Verify package contents with `npm pack` before first publish.
