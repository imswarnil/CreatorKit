# _legacy — the previous system, in full, and the site this repo serves

This folder is the **complete** original tree — `src/`, `collection/` and
`icons/` were restored from the tag `v0-frame-and-signal`
(`f84ccf751c6d4be782b9a7f0b7a2a1cb211c1386`) after living only in `packages/`
for a few days. Every file has since been verified against that tag by
SHA-256: **471 files, byte-identical**.

Since 8 September 2026 it is also what `creator.imswarnil.com` publishes.

| Was | Migrated to |
| --- | --- |
| `src/1-foundation/` | `packages/core/styles/foundation/` |
| `src/6-utilities/` | `packages/core/styles/utilities/` |
| `src/2-elements/` | `packages/ui/styles/elements/` |
| `src/3-components/` | `packages/ui/styles/components/` |
| `src/5-sections/` | `packages/ui/styles/sections/` |
| `src/4-broadcast/` | `packages/broadcast/styles/` |
| `collection/` | `packages/collections/styles/` |
| `icons/` | `packages/icons/` |
| `src/{nav,highlight,ad}.js` | `packages/ui/js/` |

That migration stands, and nothing here supersedes it. **This is still not a
source dependency**: nothing in `packages/` imports from `_legacy/`. The old
system is *published* from here; it is not built into CreatorKit. If an idea in
here is worth having, it gets rebuilt on `packages/`'s own terms — copying the
CSS wholesale defeats the point of the migration.

## Building it

The original build, unchanged — npm and Python 3, no other dependencies:

```bash
pnpm site:build      # from the repo root: this build, then staged into _site
```

which is:

```bash
npm --prefix _legacy install
npm --prefix _legacy run build   # PostCSS → dist/, then docs/_build/build.py
node scripts/stage-site.mjs      # docs/ → _site, minus _build, plus .nojekyll
```

`stage-site.mjs` is the four lines of shell that commit's
`.github/workflows/pages.yml` ran to stage the site for GitHub Pages. Nothing
is rewritten on the way through: the pages link with root-absolute paths and
the site is the root, so they resolve as authored. 378 files, 212 pages.

**One line differs from the tag, deliberately.** `docs/_build/build.py:21` now
reads `SITE = 'https://creator.imswarnil.com'`, because that is where this is
hosted. `CNAME`, `sitemap.xml`, `robots.txt` and every canonical URL are
generated from that constant, so it is the only place the domain is written.

`dist/` and `node_modules/` here are build output and are gitignored.

## Why the whole site, rather than an extraction

There was an intermediate arrangement — a React documentation app that lifted
the demo markup out of `docs/` and re-rendered it against the migrated
stylesheets. It reached 103 of the 134 pages, and only after a bug fix: the
extractor matched the literal string `class="demo"` and nothing else, so any
page whose wrapper carried a modifier class (`class="demo stack-sm"`) produced
zero demos and vanished with no error. That had silently dropped every
Foundation page about frames, icons, patterns and shapes, and every Motion page
about micro-interactions, presets and text effects.

The fix recovered twenty pages. It could not recover the remaining 27 — `col-*`,
most `yt-*` and `ig-*`, `introduction`, `principles`, `showcase`, `templates`,
`syllabus`, `build-log`, `itinerary`, `css`, `scss`, `tailwind`, `z-index`,
`u-display` — because they carry no `<div class="demo">` wrapper at all. They
are prose, page-layout templates and reference pages. An extractor can only see
what someone wrapped for it; that is structural, and no regex repair changes it.

So the app was deleted and the original is served directly. It needs no
extraction, cannot drift from what it documents, and renders in the markup it
was written in.

## The rest

**`media/`, `video/`** — the images and the clip the demos reference, served
from their original paths.

**`templates/`, `showcase/`, `scripts/`** — page templates, showcase metadata
and the class-audit scripts. Part of the published tree.

Everything here is committed, so deleting this folder is reversible — and even
if it were not, the complete original survives as the tag `v0-frame-and-signal`
in `github.com/imswarnil/Swarnil-Design-System`. See
[`../old-design.md`](../old-design.md) for how to clone and run it standalone.
