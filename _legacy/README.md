# _legacy — what is left of the previous system

The CSS kit itself is **gone from here**. It moved, with its history, into the packages:

| Was | Is now |
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

## Why this folder still exists

**`docs/`** — the 134 pages the old generator built. `tools/kit-docs` lifts the 224
hand-written demos out of them into `apps/docs/lib/kit.generated.json`, which is
committed. The docs site prefers the source when it is here and falls back to the
committed JSON when it is not, so this folder can go whenever you want — you would only
lose the ability to re-extract.

**`media/`, `video/`** — the images and the clip the demos reference. Copied to
`apps/docs/public/kit/`.

**`templates/`, `showcase/`, `scripts/`, `dist/`** — page templates, showcase metadata,
the class-audit scripts, and the old build output. Nothing imports them.

Everything here is committed, so deleting this folder is reversible.
