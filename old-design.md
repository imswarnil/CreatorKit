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

## What is in `_legacy/` here, and what is not

`_legacy/` in this repo is **not** the complete old system, and it is important
not to mistake it for one. The CSS kit was lifted out of it during the
migration and now lives in `packages/`.

| Not in `_legacy/` | Where it went |
| --- | --- |
| `src/` | `packages/core/`, `packages/ui/`, `packages/broadcast/` |
| `collection/` | `packages/collections/styles/` |
| `icons/` | `packages/icons/` |

[`_legacy/README.md`](_legacy/README.md) has the full layer-by-layer table and
is the file to read for *where a particular thing went*.

What remains in `_legacy/` is the material the migration did not consume — the
old generated docs, the media the demos reference, the page templates, the
showcase metadata and the audit scripts. It is committed, so deleting it is
reversible; and if it is ever deleted, everything in it is still in the tag
above.

Two lines in `_legacy/README-OLD.md` are stale and worth knowing about before
you trust them: that folder is **not** gitignored (it is committed here), and
it is **not** the complete tree any more (see the table above). The tag is.

---

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
| Partial copy here | `_legacy/` (274 files — no `src/`, `collection/` or `icons/`) |
| Migration record | [`docs/MIGRATION.md`](docs/MIGRATION.md), [`_legacy/README.md`](_legacy/README.md) |
| Successor to the domain | [Swarnil Design System](https://design.imswarnil.com) — unrelated, do not depend on it |
