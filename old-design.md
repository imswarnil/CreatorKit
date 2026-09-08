# The old design system — where the whole of it lives

CreatorKit was migrated out of a system that no longer exists under that name:
**Creator Design System**, also called *Frame & Signal*, which was published at
`design.imswarnil.com` until 8 September 2026.

That domain now serves a **different, unrelated system** — the rebuilt
[Swarnil Design System](https://design.imswarnil.com). The two share a URL and
nothing else: separate repository history, separate package name, separate
tokens. Nothing in CreatorKit should read from it, and it does not read from
CreatorKit.

This file answers one question: *where is the complete old project, and how do
I get at it?* Since 8 September 2026 the shortest answer is: **it is the site
this repo serves.** `creator.imswarnil.com` publishes it, whole, built the way
it always was.

---

## The short answer

The complete original is a **tag in the repository the old system lived in**:

```bash
git clone https://github.com/imswarnil/Swarnil-Design-System.git old-design
cd old-design
git checkout v0-frame-and-signal
```

That is the whole tree, 630 files, exactly as it stood at its last published
commit (`f84ccf7`) — `src/`, `collection/`, `icons/`, `docs/`, `media/`,
`showcase/`, the build scripts and the CI. It is a tag, so it cannot move.

There is also a branch, `main-before-rebuild`, pointing at the same commit. The
tag is the one to cite; the branch exists so the old `main` is restorable in
one command if it ever has to be.

### Running it

It builds with npm and Python 3, and it has no other dependencies:

```bash
npm ci
npm run build          # dist/creator.css + the docs into docs/
npm run dev            # serves the old docs on http://localhost:8080
```

The package it published was `creator-design-system`, and its bundle was
`dist/creator.css`. Both names are retired.

---

## `_legacy/` here is the complete tree — and it is what gets served

`src/`, `collection/` and `icons/` were restored into `_legacy/` from the tag,
so the folder is a full copy of the original rather than only the parts the
migration left behind. Every one of those files was then verified against the
tag by SHA-256: **byte-identical**, all 471 of them.

It is no longer only a reference. `pnpm site:build` runs the original build
inside `_legacy` — PostCSS for `dist/`, `docs/_build/build.py` for the pages —
and `scripts/stage-site.mjs` stages `docs/` into `_site` exactly as that
commit's `pages.yml` staged it for GitHub Pages. That is what Cloudflare
serves: 212 pages, unrewritten.

**It is still not a source dependency.** Nothing in `packages/` reads from
`_legacy/`, and the migrated CSS in `packages/` remains what those packages
ship. The old system is published from here; it is not built into CreatorKit.

One line differs from the tag on purpose: `docs/_build/build.py:21` now reads
`SITE = 'https://creator.imswarnil.com'`, because that is where it is hosted.
`CNAME`, `sitemap.xml`, `robots.txt` and every canonical URL follow from it.

| Migrated CSS lives in | | Restored for reference in `_legacy/` |
| --- | --- | --- |
| `packages/core/`, `packages/ui/`, `packages/broadcast/` | ← | `src/` |
| `packages/collections/styles/` | ← | `collection/` |
| `packages/icons/` | ← | `icons/` |

[`_legacy/README.md`](_legacy/README.md) has the full layer-by-layer table and
is the file to read for *where a particular thing went*.

Restoring `src/` turned out to matter more than completeness: the docs pages
link `/src/*.css` directly, so without it the served site would have had no
styles at all.

Everything here is committed, so the folder is restorable; and if it is ever
deleted anyway, the tag above still has all of it.

---

## Why it is served whole, rather than re-extracted

There was an intermediate arrangement — a React documentation app that lifted
the demo markup out of these pages and re-rendered it. It reached 103 of the
134 pages, and only after fixing a string-match bug in the extractor: it looked
for the literal `class="demo"`, so any page whose wrapper carried a modifier
class (`class="demo stack-sm"`) produced zero demos and vanished with no error.
That had silently taken out every Foundation page about frames, icons, patterns
and shapes, and every Motion page about micro-interactions and text effects.

Fixing it recovered twenty pages. It could never recover the rest, and the
reason is structural: an extractor can only see examples someone wrapped for it.
Prose, page templates and any demo written without the wrapper are invisible to
it by construction, and no amount of regex repair changes that.

So the React app was deleted and the original is served directly instead. It
needs no extraction, it cannot drift from what it documents, and it renders the
system in the markup it was actually written in — 212 pages instead of 103.

## The rule

**It is a museum, not a parts bin.**

The point of the rebuild was that those files had accumulated decisions nobody
could justify any more. Copying CSS out of the archive re-imports the problem
along with the ruleset. Read it, decide whether the *idea* is worth having, and
build the idea again properly in `packages/`.

[`docs/MIGRATION.md`](docs/MIGRATION.md) records which components made that cut
and which were dropped outright, with the reasoning for each.

---

## Provenance, in one place

| | |
| --- | --- |
| Old name | Creator Design System · "Frame & Signal" |
| Old package | `creator-design-system` |
| Old bundle | `dist/creator.css` |
| Old home | `design.imswarnil.com` (until 2026-09-08) |
| Repository | `github.com/imswarnil/Swarnil-Design-System` |
| Complete tree | tag **`v0-frame-and-signal`** (commit `f84ccf7`, 630 files) |
| Restorable branch | `main-before-rebuild` |
| Full copy here | `_legacy/` — restored from the tag, frozen reference only |
| Migration record | [`docs/MIGRATION.md`](docs/MIGRATION.md), [`_legacy/README.md`](_legacy/README.md) |
| Successor to the domain | [Swarnil Design System](https://design.imswarnil.com) — unrelated, do not depend on it |
