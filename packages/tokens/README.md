# @creatorkit/tokens

Every design decision in CreatorKit, authored once.

Tokens live in `src/*.ts`. The build emits four views of that one source — CSS custom
properties, a Tailwind preset, SCSS variables, and typed JS — so a React component, a
Handlebars template and a Sass file cannot disagree about what "raised surface" means.

`TOKENS.md` is the generated reference: every property, its value, its dark override.
This file is the part a machine cannot write — *which* token to reach for.

## Install

```bash
pnpm add @creatorkit/tokens
```

```css
@import '@creatorkit/tokens/css';
```

```js
// tailwind.config.js
import preset from '@creatorkit/tokens/tailwind';
export default { presets: [preset] };
```

```ts
import { palette, scale } from '@creatorkit/tokens';
```

## The one rule

**Components name roles, never palette steps.**

```css
color: var(--ck-color-text-muted);     /* yes */
color: var(--ck-palette-ink-600);      /* no  */
```

The palette is raw material. A role is a decision: *this text is secondary*. Roles are
the only things that change between light and dark, so a component built on roles gets
the dark theme for free, and a component built on `--ck-palette-ink-600` gets a bug.

## Choosing a colour

**Surfaces** — what a thing sits on.

| Role | Use it for |
| --- | --- |
| `surface-canvas` | The page itself. Set once, on `body`. |
| `surface-default` | The ordinary plane. In light this equals canvas; in dark it lifts. |
| `surface-raised` | Cards, popovers, anything that reads as *above* the page. |
| `surface-sunken` | Wells, code blocks, inset panels — *below* the page. |
| `surface-muted` | A quiet band: table stripes, disabled fills. |
| `surface-inverse` | A deliberately opposite block, e.g. a dark CTA in a light page. |
| `surface-media` | The mat behind an image or video while it loads. |
| `surface-scrim` | The dimmer behind a modal. Always translucent. |

Light and dark disagree about direction, on purpose. In light, elevation casts a shadow
*down* and raised surfaces stay white. In dark there is no light source to cast one, so
raised surfaces climb *up* toward grey and the shadow gains an inset highlight instead.
This is why "just invert it" produces dark modes that look flat.

**Text** — `text-default` for reading, `text-muted` for secondary information,
`text-subtle` for metadata, `text-faint` for things that are nearly decoration
(placeholders, disabled labels). If you are reaching past `faint`, the element probably
should not be on the page. `text-on-inverse` and `text-on-accent` are the only correct
choices on top of `surface-inverse` and `accent-default` — contrast is checked for those
pairs and for no others.

**Borders** — `border-subtle` for separation inside a component, `border-default` for the
edge of one, `border-strong` for emphasis and for controls that need to be found.

**Accent** — one loud colour, `signal`. `accent-default` fills, `accent-hover` and
`accent-press` are its two states, `accent-soft` is the tinted background for a badge or
a selected row, and `accent-ring` is the focus glow. Do not introduce a second accent to
mean something new; introduce a *status* colour, or say it in words.

**Status** — `success`, `warning`, `danger`, `info`, each with `surface`, `text`, and
`border`. Use all three together or the pairing loses its contrast guarantee.

**Craft** — amber, the kit's second voice: work in progress, workshop notes, drafts. It
is not a warning. Warnings are `warning`.

## Everything else

- **Space** is a 4px unit, `space-1` … `space-40`. Section rhythm (`section-sm/md/lg`) and
  the page `gutter` are fluid `clamp()`s — they are the only spacing that responds to
  viewport, and they exist so pages breathe without a media query.
- **Type** below `text-lg` is fixed; `lg` and up are fluid. UI labels must not resize with
  the viewport — a sidebar is not a hero.
- **Radius** has named roles: `radius-control`, `radius-card`, `radius-media`,
  `radius-sheet`. Use the role, so the kit's roundness is one edit.
- **Elevation** is five steps plus `shadow-inset` and `shadow-ring`. If you want a sixth,
  you want a different surface.
- **Motion** is four durations and five curves. `duration-1` is a state change nobody
  should notice; `duration-4` is a deliberate entrance. Everything collapses to 1ms under
  `prefers-reduced-motion` — you get that for free and must not defeat it.
- **z-index** is a ladder, `z-below` … `z-max`. A component never invents a number.

## Ragged ramps

`ink`, `signal` and `amber` are full ramps. `mint`, `azure` and `rose` define only the
steps the system actually uses — `50`, `100`, `500`, `600`, `700`.

This is deliberate, not an oversight. An unused ramp step is a value nobody has checked
for contrast, and shipping one invites a component to use it. If you need a missing step,
add it *and* check it against `text-on-*` before committing.

## Themes

```html
<html data-theme="dark">   <!-- explicit -->
<html data-theme="light">  <!-- explicit -->
<html>                     <!-- follows prefers-color-scheme -->
```

The light palette is always defined on bare `:root`, so no colour exists only inside a
media query and no theme state can leave a property undefined.

## Changing a token

Edit `src/*.ts`, then `pnpm --filter @creatorkit/tokens build`. `TOKENS.md`, the CSS, the
SCSS and the Tailwind preset all regenerate. Never edit anything in `dist/` or `TOKENS.md`
by hand.
