# Working on CreatorKit

How to keep building the design system, the components, the docs site and the Ghost
theme. Written for you, not for a machine — the machine-facing version is `CLAUDE.md`
plus the scoped `CLAUDE.md` in each package.

CreatorKit is **completely separate** from `design.imswarnil.com` and from
`imswarnil.com`. It has its own tokens, its own packages, its own Ghost install and its
own visual language. There is no shared file, no shared package, and no import in either
direction. Keep it that way — it is the reason this is a product rather than a fork.

---

## 1. First five minutes

```bash
cd ~/Swarnil/creator.imswarnil.com
nvm use                 # 22.21.1 — Ghost needs it and the repo pins it
pnpm install
pnpm build              # tokens → core → ui → docs, in order
```

Three things to look at:

```bash
pnpm --filter @creatorkit/docs dev    # http://localhost:3400  the docs site
pnpm ghost:start                      # http://localhost:2370  the Ghost theme
pnpm theme:dev                        # CSS watch + browser-sync for the theme
```

Ports here: **3400** docs, **2370** Ghost. `imswarnil.com` keeps 2368 and is untouched by
anything in this folder.

---

## 2. The one idea to hold on to

**A component's appearance is written once and rendered twice.**

```
packages/ui/src/primitives/Button/button.recipe.ts     ← the only place appearance lives
        │
        ├── Button.tsx                  React reads the recipe    → docs site, templates
        └── tools/recipe-to-css         same object, compiled     → .ck-btn, .ck-btn--primary
                                                                    → the Ghost theme
```

Ghost renders Handlebars on the server. It cannot run React. Rather than writing every
component twice and keeping the halves in sync by hand — which always fails, eventually,
quietly — the recipe is a plain object that both can consume.

Two rules fall out of that, and they are not stylistic:

- **A recipe may contain Tailwind utility strings and nothing else.** No React, no props
  logic, no conditionals. The moment a recipe contains code, it stops being compilable and
  the Ghost half silently stops receiving changes.
- **A component may not contain class strings.** Put a conditional `className` in a `.tsx`
  and you have invented a variant that will never reach the theme.

`packages/ui/src/recipe.test.ts` enforces this. It fails the build if a recipe has a
variant with no compiled CSS class. It is worth knowing that this test works — I broke it
deliberately to check, and it caught the drift.

---

## 3. Where everything lives

```
creator.imswarnil.com/
├─ packages/
│  ├─ tokens/       THE FOUNDATION — 332 properties in styles/*.css, plus reset,
│  │                a11y, layout, pattern, frame, cutout, logo, icon
│  ├─ core/         the u-* utilities, the focus ring, cn(), polymorphic types
│  ├─ ui/           285 CSS classes + 8 React components + the recipe compiler
│  ├─ collections/  22 creator content types (video, course, episode, trip…)
│  ├─ broadcast/    139 classes for YouTube and Instagram
│  └─ icons/        55 icons, six sets, built into a sprite
├─ apps/docs/       creator.imswarnil.com — Next.js, port 3400
├─ templates/       starters (YouTuber portfolio first)              — empty, next
├─ tools/
│  ├─ recipe-to-css/  recipes → .ck-* classes
│  ├─ props-gen/      TypeScript source → the docs' props tables
│  ├─ css-inventory/  stylesheets → each package's INVENTORY.md
│  ├─ icon-build/     SVGs → sprite, JSON, typed names
│  └─ kit-docs/       the old built docs → 224 live examples
├─ ghost/           GITIGNORED. Ghost 6.51.0, port 2370, instance `creator-local`
│  └─ content/themes/creator/    the theme — its own git repo, 160 commits
├─ _legacy/         only the old built docs remain — see _legacy/README.md
└─ docs/
   ├─ MIGRATION.md            what happens to every legacy component
   └─ AUDIT-2026-09-07.md     the pre-split survey
```

**Dependency direction, never backwards:**
`tokens → core → ui → collections → apps / templates / theme`. `tokens` imports nothing.

---

## 4. Adding a component

This is the loop you will run most.

```bash
mkdir -p packages/ui/src/primitives/Alert
```

**1. The recipe** — `alert.recipe.ts`. Appearance only.

```ts
import { recipe } from '../../recipe.js';

export const alert = recipe('alert', 'flex gap-3 rounded-card border-1 p-4', {
  variants: {
    tone: {
      info:    'bg-info-surface text-info-text border-info-border',
      danger:  'bg-danger-surface text-danger-text border-danger-border',
    },
  },
  defaultVariants: { tone: 'info' },
});
```

The first argument is the class stem: `alert` produces `.ck-alert` and
`.ck-alert--info`.

**2. The component** — `Alert.tsx`. Behaviour only.

```tsx
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, tone, ...rest }, ref,
) {
  return <div ref={ref} role="alert" className={cn(alert({ tone }), className)} {...rest} />;
});
```

Always `cn(recipe(...), className)` — never string concatenation, or a caller's
`className` loses to stylesheet order.

**3. Export it.** `index.ts` in the folder, then the category barrel
(`src/primitives/index.ts`). **A recipe that is not reachable from the package barrel is
never compiled to CSS** — the parity test will catch it, but adding the export is the fix.

**4. Document it.** Add an entry to `apps/docs/lib/registry.tsx`. Everything mechanical —
the variant table, the class list, the gallery, the props table — is generated. What you
write is the part no tool can produce: what it is for, and **what it is not for**.

**5. Check it.**

```bash
pnpm build && pnpm lint && pnpm typecheck && pnpm test
```

### Things that will bite you

- **Modifier names must be unique within a recipe.** `.ck-btn--sm` cannot mean both a size
  and a tone. A collision is a build failure, not a warning — rename one.
- **Boolean variants take the group name.** `block: { true: 'w-full' }` compiles to
  `.ck-btn--block`, not `.ck-btn--true`.
- **No raw colours in `packages/ui`.** Hex, `rgb()`, `hsl()` and hex-in-template-literals
  all fail lint. If the value you need does not exist, add it to `packages/tokens` — that
  is the entire point of the package.
- **`*/` inside a CSS comment ends the comment.** Writing `src/**/*.css` or `--ink-*/--accent`
  in a comment breaks the stylesheet several lines later with a confusing error. This has
  now bitten twice.

---

## 5. Adding or changing a token

**Tokens are CSS.** `packages/tokens/styles/*.css` is the source of truth — 332 properties,
and every one of the 1,143 classes in the kit is written against them.

```bash
$EDITOR packages/tokens/styles/01-color.css    # or 02-typography, 03-space, …
pnpm --filter @creatorkit/tokens build
```

That reparses the CSS and regenerates the Tailwind preset, `dist/tokens.json` and
`TOKENS.md`. Nothing is duplicated in TypeScript.

- `01-color.css` — the ramps, then the roles (`--bg-raised`, `--fg-muted`, `--accent`).
  **A design change usually belongs in the roles**, not the ramps. The dark block is at the
  bottom of the file; only roles that genuinely differ are restated.
- `02-typography`, `03-space`, `04-elevation`, `05-motion`, `11-shape` — the other ladders.
- The rest (`06-layout`, `07-pattern`, `08-a11y`, `09-logo`, `10-icon`, `12-frame`,
  `13-cutout`) are mostly rules that apply the tokens.

The one authored TypeScript file is `src/map.ts`: it says the Tailwind name
`bg-surface-raised` means `--bg-raised`. **Add a token to the CSS; add a line there only if
React needs a utility for it.** If the map names a property nothing declares, the build
fails rather than emitting a rule that silently does nothing.

If you add a Tailwind scale that produces a new class group, teach `cn()` about it in
`packages/core/src/cn.ts` — otherwise caller overrides silently stop working.

---

## 6. Working on the Ghost theme

The theme is at `ghost/content/themes/creator`. It is **its own git repository** — commit
theme changes inside that folder, not at the monorepo root. `ghost/` is gitignored here on
purpose: a Ghost install with a live database is a preview harness, not a deliverable.

```bash
nvm use
pnpm ghost:start     # http://localhost:2370, admin at /ghost/
pnpm theme:dev       # Tailwind watch + browser-sync
pnpm theme:build     # ds:sync → CSS → JS
pnpm theme:test      # gscan, must stay clean
pnpm ghost:restart   # so Ghost serves rebuilt assets
```

### How the theme gets the kit

`assets/css/tailwind.css` imports two things from the monorepo:

```css
@import url('@creatorkit/tokens/dist/tokens.css');      /* the --ck-* ladder */
@import url('@creatorkit/ui/dist/ck-classes.css');      /* .ck-btn, .ck-badge, … */
```

Both are `file:` dependencies pointing back into `packages/`. So: **change a recipe, run
`pnpm build`, run `pnpm theme:build`, and the theme has the new component.** No copying.

The theme uses both layers: the CSS kit for most of itself, and `.ck-*` for the components
that have been migrated to React. They share one foundation, so there is no conflict and no
duplication — a component can move to React whenever it is worth doing, not all at once.
The path for each class is in `docs/MIGRATION.md`.

### Migrating one component

1. Find it in `docs/MIGRATION.md`. If the verdict is DROP, delete its usage instead.
2. Build it in `packages/ui` (§4).
3. In the theme, swap `class="btn btn-primary"` → `class="ck-btn ck-btn--primary"`.
4. `pnpm theme:build && pnpm theme:test`, then look at it on :2370.
5. When nothing references a legacy file any more, remove its `@import`.

When the last import is gone, `_legacy/` can be deleted. It is committed, so that is a
safe, reversible moment rather than a leap.

---

## 7. Working on the docs site

`apps/docs`, Next.js App Router, port 3400.

- **Component pages are generated.** Add to `apps/docs/lib/registry.tsx` and a page
  appears, with a live preview, a variant gallery, the props table and the class list.
  There is no per-component page file to write.
- **The sidebar is generated** from the same registry.
- **Props tables are read from the TypeScript source** by `tools/props-gen`, which runs on
  `pnpm --filter @creatorkit/docs dev` and on build. Only props declared on the component's
  own interface are shown — expanding inherited DOM attributes would bury six real props
  under two hundred.
- **The docs site is dressed by the kit it documents.** If a component looks wrong on the
  docs site, the component is wrong.

`tailwind.config.js` there has `../../packages/ui/src/**/*` in `content` — without it, the
utilities the recipes reference never get generated and everything renders unstyled. If
you add a package the docs render from, add it to `content` too.

### Deploying

Not wired yet. Two options, both used elsewhere in your workspace:

- **GitHub Pages** — `next build` with `output: 'export'`, plus a `CNAME` of
  `creator.imswarnil.com`. Same pattern as `design.imswarnil.com`.
- **Cloudflare Workers** — `@opennextjs/cloudflare`, same as `links.imswarnil.com`. Needed
  only if the docs ever need a server.

Pages is enough for a static docs site. Either way `creator.imswarnil.com` needs a DNS
record before anything resolves.

---

## 8. What is done, and what is next

**Done**

| | |
| --- | --- |
| `@creatorkit/tokens` | The foundation: 332 properties (58 dark), 440 rules, preset + JSON + TOKENS.md generated from the CSS |
| `@creatorkit/core` | 202 utility classes, the focus ring, `cn()`, polymorphic types, 3 tests |
| `@creatorkit/ui` | 285 CSS classes, 8 React primitives, 9 recipes, 13 tests |
| `@creatorkit/collections` | 22 creator content types, 77 classes, page templates |
| `@creatorkit/broadcast` | 139 classes, 7 export canvases |
| `@creatorkit/icons` | 55 icons, sprite, typed names |
| `tools/` | recipe-to-css, props-gen, css-inventory, icon-build, kit-docs |
| `apps/docs` | 100 pages — 8 React components, 83 kit pages, 224 live examples |
| Ghost theme | consuming tokens, ui and collections, gscan clean |

**Next, in the order I would do it**

The CSS kit is complete — everything below is about the React layer and the templates.
Nothing here blocks using the kit today.

1. **`layout/`** — `Container`, `Section`, `Stack`, `Grid`, `Divider`. Everything else
   needs them, and `Grid` collapses the four duplicate `deck` classes.
2. **`data/`** — `Card` above all. It is the backbone of every creator page.
3. **Templates** — the YouTuber portfolio, once `layout` and `data` exist. This is
   probably worth more than continuing the migration, because it is the thing someone can
   actually clone.
4. **`feedback/`** and **`overlay/`** — `Dialog`, `Drawer`, `Menu` are rewrites, not
   migrations: the CSS ones have no focus trap and no keyboard support. This is where real
   interaction tests earn their place (vitest + testing-library).
5. **React `collections/`** — the content types, once `Card` exists.
6. **`navigation/`** — leave the navbar for last. It is 55 classes collapsing into three
   components and it deserves a clear head.

**Deliberately deferred, so you know they are choices and not oversights**

- **Search on the docs site.** Pagefind at build time, once there is enough to search.
- **Storybook.** The docs site is the showcase; two of them is one too many.
- **`tools/component-gen`** (the AI generator from the original plan). Worth building once
  there are ~20 components to imitate — with eight, the pattern is easier to copy by hand
  than to prompt for.
- **npm publishing.** Package metadata is ready. Nothing is published; the scope is not
  registered.
- **The ragged accent ramps.** `mint`, `azure` and `rose` define only the five steps in
  use. Filling them in is a visual decision, and each new step needs a contrast check.

---

## 9. Repository and git

The monorepo has **no remote yet**. When you make one, per your naming convention the
folder stays `creator.imswarnil.com` and the repo takes the brand name — `CreatorKit` is
what the `package.json` files already reference.

The theme's remote is currently named `archive-imswarnil` and points at the old
`Imswarnil.com` repo, so nothing can be pushed there by accident. It needs its own repo.
Note it is on branch `responsive-card-images`, three commits ahead of `main` — that
predates all of this work.

Commits: Conventional Commits, one logical change each. No AI attribution anywhere — not
in messages, tags, changelogs or author fields.

---

## 10. If something breaks

| Symptom | Cause |
| --- | --- |
| Components render unstyled on the docs site | `packages/ui/src` missing from `content` in `apps/docs/tailwind.config.js` |
| A class does nothing | The foundation was not imported, so its custom properties resolve to nothing |
| A stylesheet import is silently ignored | `postcss-import` does not read package `exports` maps. Import a real path (`@creatorkit/ui/dist/ui.css`), not an export key |
| An inventory looks stale after editing a tool | Turbo cached the package. `pnpm build --force` |
| `classes missing from ck-classes.css` | A recipe changed without a rebuild. `pnpm build` |
| CSS build fails with a confusing error several lines below | A `*/` inside a CSS comment ended it early |
| A caller's `className` is ignored | Component concatenated strings instead of using `cn()` |
| Ghost 503s | The install has no owner account yet — visit `/ghost/` |
| `ghost` command not found | Wrong Node. `nvm use 22.21.1` |

Full check, the same one CI runs:

```bash
pnpm lint && pnpm typecheck && pnpm build && pnpm test
```
