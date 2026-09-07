# packages/core

Depends on `@creatorkit/tokens` and nothing else in the workspace. Consumed by
`@creatorkit/ui`. Never import from `ui`, `collections`, an app, a template, or the theme.

## Where things are

| File | Holds |
| --- | --- |
| `src/cn.ts` | The class merger, extended with the token preset's scales |
| `src/polymorphic.ts` | `as`-prop types for components that change element |
| `styles/reset.css` | Token-driven base element styles |
| `styles/base.css` | Focus ring, selection, skip link, `.ck-sr-only`, reduced motion |
| `styles/index.css` | tokens + reset + base, in order |

## Rules

1. **No component lives here.** If it renders markup with variants, it belongs in
   `packages/ui`. This package is the floor those components stand on.
2. **No hardcoded design values.** Every value in the stylesheets is a `var(--ck-*)`.
   Anything else is a bug, including a `px` that "is obviously fine".
3. **One focus ring.** Do not add a second focus treatment anywhere in the workspace.
   If a component needs a different one, it needs a reason in its JSDoc.
4. **`cn()` must know about new scales.** When `packages/tokens` adds a scale that
   produces a new Tailwind class group (a new radius role, a new shadow step), teach
   `extendTailwindMerge` about it in `src/cn.ts` or caller overrides will silently fail.
5. The reset is an opinion, deliberately. Adding a rule requires it to be a browser bug,
   a bad default, or a token being applied. "It is tidier" is not one of the three.

## Testing

`pnpm --filter @creatorkit/core build && pnpm --filter @creatorkit/core typecheck`.
For `cn()`, the thing worth checking is conflict resolution:
`cn('rounded-card', 'rounded-pill')` must return only `rounded-pill`.
