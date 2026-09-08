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
I get at it?*

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

## `_legacy/` here is now the complete tree too

`src/`, `collection/` and `icons/` were restored into `_legacy/` from the tag,
so the folder is a full copy of the original again rather than only the parts
the migration left behind. **They are a frozen reference, not a source
dependency** — nothing in `packages/` or `apps/` reads from `_legacy/`, and
the migrated CSS in `packages/` remains what actually ships.

| Migrated CSS lives in | | Restored for reference in `_legacy/` |
| --- | --- | --- |
| `packages/core/`, `packages/ui/`, `packages/broadcast/` | ← | `src/` |
| `packages/collections/styles/` | ← | `collection/` |
| `packages/icons/` | ← | `icons/` |

[`_legacy/README.md`](_legacy/README.md) has the full layer-by-layer table and
is the file to read for *where a particular thing went*.

Restoring `src/` mattered for a concrete reason, not just completeness:
`tools/kit-docs` regenerates the rendered component docs by reading HTML out
of `_legacy/docs/`, and with `src/` gone there was no way to fix that
extraction if it turned out to be wrong. It was — see the next section.

Everything here is committed, so deleting the folder is reversible; and if it
is ever deleted anyway, the tag above still has all of it.

---

## A fifth of the component docs were missing, silently

`tools/kit-docs` lifts the hand-written demo markup out of the 134 pages in
`_legacy/docs/` into `apps/docs/lib/kit.generated.json`, which the CreatorKit
docs site renders live. It was extracting demos from only 83 of those pages.

The cause was a string-match bug, not missing content: the extractor looked
for the literal `class="demo"` and nothing else, so any page whose demo
wrapper carried a modifier class — `class="demo stack-sm"` — produced zero
demos and disappeared with no error. That took out every Foundation page
about frames, icons, patterns and shapes, and every Motion page about
micro-interactions, presets and text effects — real, documented components,
just invisible in the new docs for a reason that had nothing to do with
whether they were worth keeping.

Fixed in `tools/kit-docs/index.mjs`. Re-extracting now recovers
**103 pages, 275 demos** — see [`_legacy/README.md`](_legacy/README.md) for
the exact list of what came back and what genuinely has no demo to extract
(page templates and prose, correctly not component docs).

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
