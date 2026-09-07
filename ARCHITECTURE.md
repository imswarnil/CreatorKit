# Architecture

One page. If you only read one file before changing something, read this one.

## The problem this repo solves

CreatorKit has to dress three kinds of consumer that do not share a runtime:

| Consumer | Runtime | Can it run React? |
| --- | --- | --- |
| `apps/docs`, `templates/*` | Next.js / static | yes |
| `ghost/content/themes/creator` | Ghost 6, Handlebars, server-rendered | **no** |
| `packages/broadcast` output | OBS browser source, static HTML | no (and does not need it) |

The naive answer is to author every component twice — once as JSX, once as CSS — and
keep the two in sync by hand. That is the failure mode this architecture exists to
prevent.

## The rule: one recipe, two renderers

A component's appearance is declared **once**, as a
[CVA](https://cva.style) recipe of Tailwind utility strings, in `packages/ui`.
Nothing else describes what a component looks like.

```
packages/ui/src/primitives/Button/button.recipe.ts     ← the single source of truth
    │
    ├── Button.tsx            React reads the recipe        → <button className={button({ variant })}>
    └── tools/recipe-to-css   the same recipe, compiled     → .ck-btn, .ck-btn--primary  (plain CSS)
                                                              consumed by Handlebars
```

`tools/recipe-to-css` is a build step, not a person. The Ghost theme's classes cannot
drift from the React components' classes, because both are generated from the same
file. A recipe changed in `packages/ui` reaches the Ghost theme on the next
`pnpm build`.

**Consequence:** a recipe may only contain Tailwind utilities and token-backed
arbitrary values. It may not contain React, props logic, or runtime state. Behaviour
lives in the `.tsx`; appearance lives in the recipe. When you are tempted to put a
conditional class inside a component, ask whether it is really a variant.

## Two layers, one foundation

The kit ships in two forms, and it is worth being precise about why.

**The CSS layer** is the whole system — 1,143 classes covering every component, every
creator content type and every broadcast surface. It is written against the custom
properties in `@creatorkit/tokens/styles`, works from any template engine, and is what the
Ghost theme uses today.

**The React layer** is `@creatorkit/ui`'s components, growing one category at a time out
of the CSS layer per `docs/MIGRATION.md`. Each declares its appearance as a recipe, and
`tools/recipe-to-css` compiles that recipe into `.ck-*` classes — so a migrated component
is available to Handlebars on the same day it is available to React.

Both resolve against the same custom properties. `.btn-primary` and `.ck-btn--primary`
both read `--accent`. There is one foundation, and a change to it moves both layers.

## Where tokens come from

`packages/tokens/styles/*.css` **is** the source of truth: 332 properties, which is what
every one of those 1,143 classes is written against. The build parses that CSS and emits
the Tailwind preset, the JSON and `TOKENS.md` from it.

The only authored file in the package is `src/map.ts`, which says that the Tailwind name
`bg-surface-raised` should mean `--bg-raised`. Values are never written there. If the map
names a property no stylesheet declares, the build fails — that seam is the one place the
two layers could silently drift.

## Dependency direction

```
tokens ──► core ──► ui ──► collections ──► apps / templates / ghost theme
  │                  │
  │                  └──► broadcast
  └──► (the Tailwind preset, generated from the same CSS, consumed by every
        React consumer including the docs site)

icons ──► (depends on nothing)
```

Never backwards. `packages/tokens` imports nothing. `packages/ui` never imports from
`apps/`, `templates/` or the theme. If you need something from a downstream package,
it belongs upstream or it does not belong in the kit.

## The packages

| Package | What it is | Ships |
| --- | --- | --- |
| `@creatorkit/tokens` | Colour, type, space, radius, shadow, motion, z-index, breakpoints. Authored once in TypeScript, emitted as a Tailwind preset, CSS custom properties, and typed JS. | preset + CSS + JS |
| `@creatorkit/core` | Reset, base element styles, focus-visible ring, layout primitives, `cn()`, polymorphic ref types. | CSS + JS |
| `@creatorkit/ui` | The kit: primitives, layout, navigation, feedback, overlay, data. React + recipes. | JS + CSS |
| `@creatorkit/collections` | Creator content types — video, course, episode, project, travel, product, prompt, snippet, changelog, timeline. This is domain vocabulary, not generic UI, and the Ghost theme leans on it hardest. | JS + CSS |
| `@creatorkit/broadcast` | Thumbnails, scenes, lower thirds, stream overlays, Instagram formats. Ships to YouTube and Instagram, **never** to a website — it is never in a site bundle. | CSS |
| `@creatorkit/icons` | creator / media / resume / social sets. | SVG + React |

## Where the Ghost install fits

`ghost/` is a full Ghost 6.51.0 install with its own SQLite database, running on port
2370 as the Ghost-CLI instance `creator-local`. It exists so the theme can be previewed
against real Ghost rendering. **It is gitignored** — it is a harness, not a deliverable.

The theme inside it, `ghost/content/themes/creator`, **is** a deliverable and is its own
git repository with its own remote. So: this repo ignores the Ghost tree; the theme
tracks itself. Two repos, one folder tree, no submodule.

## What this repo must never do

- Depend on `design.imswarnil.com`, `@imswarnil/swarnil-design`, `swarnil-design`, or the
  `signal` theme. CreatorKit is a separate product with its own tokens and its own
  visual language. There is no shared package and no shared stylesheet.
- Hardcode a colour, size, radius, duration or font value outside `packages/tokens`.
- Author the same component twice.
