# @creatorkit/collections

The part of the kit that knows what an episode is.

A dashboard component library has cards. This has a video card that carries a duration and
a hover preview, a lesson row that knows its position in a curriculum, a trip with a
country and a date range, a snippet with a language. Twenty-two content types, each with
its own card, its own metadata line and its own list layout.

`INVENTORY.md` lists every class. Read it before searching this package.

## Install

```bash
pnpm add @creatorkit/collections @creatorkit/ui @creatorkit/core
```

```css
@import '@creatorkit/core/dist/core.css';
@import '@creatorkit/ui/dist/ui.css';
@import '@creatorkit/collections/dist/collections.css';
```

## Use

Every type is `.c` plus a modifier, so the shared behaviour lives in one place and the
type only carries what makes it different:

```html
<article class="c c-video">…</article>
<article class="c c-course">…</article>
<article class="c c-trip">…</article>
```

Decks are the grids they sit in:

```html
<div class="deck-c deck-c-lg">…</div>   <!-- roomy, for a feature row -->
<div class="deck-c deck-c-list">…</div> <!-- one per row, for an archive -->
```

## The types

`video` `blog` `course` `lesson` `episode` `series` `project` `projectlog` `travel` `trip`
`product` `shop` `doc` `guide` `newsletter` `prompt` `snippet` `changelog` `timeline`
`experience` `author` `tag`

Several ship page templates alongside the CSS — `course/`, `travel/`, `projects/` and the
rest hold the HTML for an index and a detail page, which is the fastest way to see how a
type is meant to be laid out.

## Why this is its own package

Two reasons. It is the kit's actual differentiator — generic UI is a commodity and this is
not. And it is the layer a non-creator consumer skips entirely, so it should not weigh
down `@creatorkit/ui` for someone who only wants a button.
