# @creatorkit/core

The layer between tokens and components: a reset that is an opinion, one focus ring, and
the two helpers every component needs.

## Install

```bash
pnpm add @creatorkit/core
```

```css
/* tokens + reset + base, in the right order */
@import '@creatorkit/core/css';
```

Or take the pieces if you already have a reset:

```css
@import '@creatorkit/tokens/css';
@import '@creatorkit/core/base';
```

## What the stylesheets do

**`reset.css`** is not a normalise. It applies tokens to bare elements so unstyled HTML
already belongs to the kit: headings get the display face and tight leading, `body` gets
the canvas and body face, replaced elements go `display: block`, form controls inherit
type. Every rule is either a browser bug, a bad default, or a token being applied — if it
is none of those it does not belong here.

**`base.css`** is behaviour. One focus ring for the whole kit, drawn with `outline` rather
than `box-shadow` so it follows the element's shape and survives `overflow: hidden`, and
only on `:focus-visible` so a mouse click does not draw it. Plus `::selection`, a
`.ck-skip` link, `.ck-sr-only`, and the reduced-motion override.

A component that opts out of the ring must supply its own visible focus state. There is
no third option.

## `cn()`

```tsx
import { cn } from '@creatorkit/core';

<div className={cn('rounded-card bg-surface-raised', className)} />
```

`clsx` for joining, `tailwind-merge` for conflicts, taught about the token preset's own
scales — so `rounded-card` and `rounded-md` are known to collide and a caller's
`className` actually wins. Every component in the kit runs its classes through this
together with the incoming `className`. A component that concatenates strings instead has
a bug waiting: the caller's override will lose to stylesheet order.

## Polymorphic types

For components that take an `as` prop. A `Button` rendered `as="a"` should accept `href`,
reject `disabled`, and type its ref as an anchor:

```tsx
import type { PolymorphicProps, PolymorphicRef } from '@creatorkit/core';
```

Use these only where changing the element is genuinely useful — a `Card` that becomes an
`<article>`, a `Button` that becomes a link. Not everywhere: `as` on a component that has
one correct element is a way to break its accessibility from the outside.
