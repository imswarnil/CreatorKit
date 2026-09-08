# _legacy — the previous system, in full

This folder is the **complete** original tree again — `src/`, `collection/`
and `icons/` were restored from the tag `v0-frame-and-signal` after living
only in `packages/` for a few days. Two things were true independently and
both needed fixing:

1. The CSS kit's *ideas* did migrate, with history, into the packages below —
   that migration stands and nothing here supersedes it.
2. But having only the migrated result made the original **unrenderable**:
   `tools/kit-docs` reads HTML out of `docs/` here, and with `src/` gone there
   was no way to regenerate that extraction from scratch if it ever needed
   fixing. It did — see below.

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

**This is a frozen reference, not a source dependency.** Nothing in
`apps/` or `packages/` imports from `_legacy/`. If an idea in here is worth
having, it gets rebuilt on `packages/`'s own terms — copying the CSS wholesale
defeats the point of the migration.

## docs/ — and the bug that was silently dropping a fifth of it

`tools/kit-docs` lifts the hand-written demo markup out of the 134 pages in
`docs/` into `apps/docs/lib/kit.generated.json`, which the docs site renders
live against the migrated stylesheets. As of this pass it recovers
**103 pages, 275 demos** — up from 83 pages when this was last measured.

The gap was a bug, not missing content. The extractor matched the literal
string `class="demo"` and nothing else, so any page whose demo wrapper carried
a modifier class — `class="demo stack-sm"`, `class="demo stack"` — produced
zero demos and vanished with no error. That silently dropped every Foundation
page about frames, icons, patterns and shapes, and every Motion page about
micro-interactions, presets and text effects: real components, invisible in
the new docs for no reason connected to whether they were worth keeping.
Fixed in `tools/kit-docs/index.mjs` — see the comment there.

The remaining 27 pages (`col-*`, most `yt-*` and `ig-*`, `introduction`,
`principles`, `showcase`, `templates`, `syllabus`, `build-log`, `itinerary`,
`css`, `scss`, `tailwind`, `z-index`, `u-display`) have no `<div class="demo">`
wrapper at all — they are prose, page-layout templates and reference pages
rather than component demos, and `kit-docs` correctly has nothing to extract
from them. They exist in `docs/` for reading, not for regeneration.

Regenerate any time the source in `docs/` changes:

```bash
node tools/kit-docs/index.mjs _legacy/docs apps/docs/lib/kit.generated.json
```

The docs site prefers this folder when present and falls back to the
committed JSON when it is not — so `_legacy/` can be deleted without breaking
the docs site, only the ability to re-extract or fix an extraction bug like
this one.

## The rest

**`media/`, `video/`** — the images and the clip the demos reference. Copied
to `apps/docs/public/kit/`.

**`templates/`, `showcase/`, `scripts/`, `dist/`** — page templates, showcase
metadata, the class-audit scripts, and the old build output. Nothing imports
them.

Everything here is committed, so deleting this folder is reversible — and even
if it were not, the complete original survives as the tag `v0-frame-and-signal`
in `github.com/imswarnil/Swarnil-Design-System`. See
[`../old-design.md`](../old-design.md) for how to clone and run it standalone.
