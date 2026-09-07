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
│  ├─ tokens/       every design decision, authored once in TypeScript
│  ├─ core/         reset, focus ring, cn(), polymorphic types
│  ├─ ui/           the components — recipes + React + the compiled stylesheet
│  ├─ collections/  creator content types (video, course, episode…)  — empty, next
│  ├─ broadcast/    thumbnails, scenes, overlays                     — empty, next
│  └─ icons/        the icon sets                                    — empty, next
├─ apps/docs/       creator.imswarnil.com — Next.js, port 3400
├─ templates/       starters (YouTuber portfolio first)              — empty, next
├─ tools/
│  ├─ recipe-to-css/  recipes → .ck-* classes
│  └─ props-gen/      TypeScript source → the docs' props tables
├─ ghost/           GITIGNORED. Ghost 6.51.0, port 2370, instance `creator-local`
│  └─ content/themes/creator/    the theme — its own git repo, 160 commits
├─ _legacy/         the old creator-design-system, the migration source
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

```bash
$EDITOR packages/tokens/src/semantic.ts     # or palette.ts, or scale.ts
pnpm --filter @creatorkit/tokens build
```

That regenerates all four outputs and `TOKENS.md`. Never edit `dist/` or `TOKENS.md` by
hand.

- `palette.ts` — raw ramps. Components never name these.
- `semantic.ts` — the roles (`surface-raised`, `text-muted`, `accent-hover`). **This is
  where a design change usually belongs.** Only roles that genuinely differ appear in
  `dark`; anything absent inherits from light.
- `scale.ts` — type, space, radius, motion, z-index, everything non-colour.

Roles are authored as `ref('palette.ink.0')`, not as literal values, so the indirection
survives into the CSS. That is what lets someone retheme by redefining one property.

If you add a Tailwind scale that produces a new class group, teach `cn()` about it in
`packages/core/src/cn.ts` — otherwise caller overrides silently stop working.

Guidance on *which* role to use lives in `packages/tokens/README.md`. Update it when a
role's meaning changes; that file is the part that isn't generated.

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

Right now the theme still styles most of itself from `_legacy` (imported as
`creator-design-system`). That is deliberate — the two ladders do not collide, so the
theme can migrate one component at a time. The migration path for each legacy class is in
`docs/MIGRATION.md`.

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
| `@creatorkit/tokens` | 234 properties + 50 dark overrides, four output formats, light/dark/system |
| `@creatorkit/core` | reset, base, one focus ring, `cn()`, polymorphic types, 3 tests |
| `@creatorkit/ui` | 8 primitives, 9 recipes, 86 compiled classes, 13 tests |
| `tools/recipe-to-css` | the second renderer, plus `INVENTORY.md` |
| `tools/props-gen` | props tables from the TypeScript source |
| `apps/docs` | 16 pages, live previews, generated tables, theme toggle |
| Ghost theme | consuming `@creatorkit/tokens` + `@creatorkit/ui`, gscan clean |

**Next, in the order I would do it**

1. **`layout/`** — `Container`, `Section`, `Stack`, `Grid`, `Divider`. Everything else
   needs them, and `Grid` collapses the four duplicate `deck` classes.
2. **`data/`** — `Card` above all. It is the backbone of every creator page.
3. **`@creatorkit/collections`** — the 24 `.c-*` content types. This is the kit's real
   differentiator; nothing else has a component that knows what an episode is.
4. **`feedback/`** and **`overlay/`** — `Dialog`, `Drawer`, `Menu` are rewrites, not
   migrations: the legacy ones had no focus trap and no keyboard support. This is where
   real interaction tests earn their place (vitest + testing-library).
5. **`navigation/`** — leave the navbar for last. It is 55 legacy classes collapsing into
   three components and it deserves a clear head.
6. **Templates** — the YouTuber portfolio, once `layout` and `data` exist.

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
| A `.ck-*` class does nothing in the theme | `@creatorkit/tokens/dist/tokens.css` not imported, so `--ck-*` resolve to nothing |
| `classes missing from ck-classes.css` | A recipe changed without a rebuild. `pnpm build` |
| CSS build fails with a confusing error several lines below | A `*/` inside a CSS comment ended it early |
| A caller's `className` is ignored | Component concatenated strings instead of using `cn()` |
| Ghost 503s | The install has no owner account yet — visit `/ghost/` |
| `ghost` command not found | Wrong Node. `nvm use 22.21.1` |

Full check, the same one CI runs:

```bash
pnpm lint && pnpm typecheck && pnpm build && pnpm test
```
