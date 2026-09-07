# @creatorkit/ui

The component library. React and Tailwind, and — from the same source — plain CSS classes
for anything that cannot run React.

`INVENTORY.md` is the generated list of every component and variant. Read it before
searching this package.

## Install

```bash
pnpm add @creatorkit/ui @creatorkit/core @creatorkit/tokens
```

```tsx
import { Button, Badge } from '@creatorkit/ui';
import '@creatorkit/core/css';

<Button variant="primary" size="lg">Watch the latest</Button>
```

```js
// tailwind.config.js — components emit token-backed utility classes
import preset from '@creatorkit/tokens/tailwind';
export default { presets: [preset], content: ['./src/**/*.tsx'] };
```

## Without React

```html
<link rel="stylesheet" href="@creatorkit/ui/css" />

<button class="ck-btn ck-btn--primary ck-btn--lg">Watch the latest</button>
<span class="ck-badge ck-badge--live">On air</span>
```

`dist/ck-classes.css` is real CSS — the `@apply` directives are already expanded, so a
consumer installs no Tailwind. This is what the Ghost theme uses.

The two are not two implementations. `Button.tsx` reads `button.recipe.ts`; the stylesheet
is compiled from that same object by `tools/recipe-to-css`. A test in this package fails
the build if a recipe gains a variant the stylesheet did not.

## Anatomy of a component

```
src/primitives/Button/
  button.recipe.ts   appearance — Tailwind utilities, nothing else
  Button.tsx         behaviour, props, refs, accessibility
  index.ts
```

The split is the whole architecture. A recipe holds no React and no props logic, which is
what lets it compile to CSS. A component holds no class strings, which is what stops the
two renderers drifting. See `ARCHITECTURE.md` at the repo root.

## Conventions every component follows

- `forwardRef`, so a caller can measure it or focus it.
- `className` passthrough merged with `cn()`, so the caller's class wins a conflict.
- Variants through the recipe, never through conditional JSX.
- A JSDoc block saying what it is for **and what it is not for**. The second half is the
  useful half.
- Accessible by default. Not "accessible if you pass the right props".

## Categories

| Category | Holds |
| --- | --- |
| `primitives/` | Button, Input, Badge, Avatar, Icon, Text, Heading, Link |
| `layout/` | Stack, Grid, Container, Section, Divider — *next* |
| `navigation/` | Nav, Tabs, Breadcrumb, Pagination, Menu — *next* |
| `feedback/` | Alert, Toast, Skeleton, Spinner, EmptyState, Progress — *next* |
| `overlay/` | Dialog, Drawer, Popover, Tooltip — *next* |
| `data/` | Table, List, Card, Stat, Timeline — *next* |

Creator-specific components — PostCard, AuthorBio, the 24 collection types — live in
`@creatorkit/collections`, not here.

## A few decisions worth knowing

**`Heading` takes `level` and `size` separately, and `level` is required.** A section's
third heading is an `<h3>` however large the design wants it. Coupling the two is how a
page ends up with an `<h1>` inside a card.

**`Button` defaults to `type="button"`.** A bare `<button>` inside a form submits it, which
is almost never what the caller meant.

**`Link variant="default"` is underlined.** Removing a link's underline in prose is a
readability decision disguised as a style one. `subtle` exists for places where position
already says "link".

**`Badge tone="live"` carries `aria-label="live"`.** The state is not communicated by
colour alone.
