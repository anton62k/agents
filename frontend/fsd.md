# Feature-Sliced Design

Use FSD when the frontend has enough domain complexity to benefit from explicit
boundaries.

## Practical Layers

- `app` - application providers and routing.
- `pages` - route-level composition.
- `widgets` - larger reusable page blocks.
- `features` - user actions and workflows.
- `entities` - domain entities and state.
- `shared` - reusable UI, libs, api clients, config.

Avoid turning FSD into ceremony for tiny apps. Keep boundaries useful and
observable in imports.
