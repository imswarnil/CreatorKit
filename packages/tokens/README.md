# @creatorkit/tokens

The foundation: every design decision in CreatorKit, plus the reset, the a11y layer and
the base rules that apply them.

**Tokens are CSS.** `styles/*.css` holds 332 custom properties, and it is the source of
truth because it is what all 1,143 classes in the kit are written against. The build
*reads* that CSS and generates the other views — a Tailwind preset so React names the same
roles, `dist/tokens.json`, and `TOKENS.md`.

The only authored TypeScript is `src/map.ts`, which says that `bg-surface-raised` should
mean `--bg-raised`. No value is ever written there. If the map names a property no
stylesheet declares, the build fails.

This file is the part a machine cannot write — *which* token to reach for.

## Install

```bash
pnpm add @creatorkit/tokens
```

```css
/* a real path, not the export key: postcss-import does not read exports maps */
@import '@creatorkit/tokens/dist/tokens.css';
```

```js
// tailwind.config.js
import preset from '@creatorkit/tokens/tailwind';
export default { presets: [preset] };
```

```ts
import tokens from '@creatorkit/tokens/dist/tokens.json';
// [{ name: 'bg-raised', value: 'var(--ink-0)', dark: 'var(--ink-900)', file: '01-color.css' }, …]
```

## The one rule

**Components name roles, never palette steps.**

```css
color: var(--fg-muted);   /* yes — a decision: this text is secondary */
color: var(--ink-600);    /* no  — a raw ramp step, and it will not follow dark */
```

The palette is raw material. A role is a decision: *this text is secondary*. Roles are
the only things that change between light and dark, so a component built on roles gets
the dark theme for free, and a component built on `--ck-palette-ink-600` gets a bug.

## Choosing a colour

**Surfaces** — what a thing sits on.

| Role | Use it for |
| --- | --- |
| `--bg-canvas` | The page itself. Set once, on `body`. |
| `--bg-surface` | The ordinary plane. In light this equals canvas; in dark it lifts. |
| `--bg-raised` | Cards, popovers, anything that reads as *above* the page. |
| `--bg-sunken` | Wells, code blocks, inset panels — *below* the page. |
| `--bg-muted` | A quiet band: table stripes, disabled fills. |
| `--bg-inverse` | A deliberately opposite block, e.g. a dark CTA in a light page. |
| `--bg-media` | The mat behind an image or video while it loads. |
| `--bg-scrim` | The dimmer behind a modal. Always translucent. |

In Tailwind these are `bg-surface-canvas`, `bg-surface-raised` and so on — the map in
`src/map.ts` is what connects the two names.

Light and dark disagree about direction, on purpose. In light, elevation casts a shadow
*down* and raised surfaces stay white. In dark there is no light source to cast one, so
raised surfaces climb *up* toward grey and the shadow gains an inset highlight instead.
This is why "just invert it" produces dark modes that look flat.

**Text** — `--fg-default` for reading, `--fg-muted` for secondary information,
`--fg-subtle` for metadata, `--fg-faint` for things that are nearly decoration
(placeholders, disabled labels). If you are reaching past `faint`, the element probably
should not be on the page. `--fg-on-inverse` and `--fg-on-accent` are the only correct
choices on top of `--bg-inverse` and `--accent` — contrast is checked for those pairs and
for no others.

**Borders** — `--line-subtle` for separation inside a component, `--line-default` for the
edge of one, `--line-strong` for emphasis and for controls that need to be found.

**Accent** — one loud colour, `signal`. `--accent` fills, `--accent-hover` and
`--accent-press` are its two states, `--accent-soft` is the tinted background for a badge
or a selected row, and `--accent-ring` is the focus glow. Do not introduce a second accent to
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
add it *and* check it against the `--fg-on-*` roles before committing.

## Themes

```html
<html data-theme="dark">   <!-- explicit -->
<html data-theme="light">  <!-- explicit -->
<html>                     <!-- follows prefers-color-scheme -->
```

The light palette is always defined on bare `:root`, so no colour exists only inside a
media query and no theme state can leave a property undefined.

## Changing a token

Edit the CSS in `styles/`, then `pnpm --filter @creatorkit/tokens build`. The preset, the
JSON and `TOKENS.md` all regenerate. Never edit anything in `dist/`, `TOKENS.md` or
`INVENTORY-CSS.md` by hand.
