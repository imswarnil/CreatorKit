# Contributing

## Setup

```bash
nvm use            # 22.21.1
pnpm install
pnpm build
```

## Before you open a pull request

```bash
pnpm lint && pnpm typecheck && pnpm build && pnpm test
```

CI runs exactly these, in this order, on Node 22.

## Adding a component

Read `ARCHITECTURE.md` — appearance is declared once as a CVA recipe, and both the React
component and the Ghost theme's CSS are generated from it. A component that hardcodes
classes in its JSX will not reach the theme, and review will send it back.

```
packages/ui/src/<category>/<Component>/
  <Component>.tsx          behaviour, props, refs, a11y
  <component>.recipe.ts    appearance — Tailwind utilities only
  <Component>.test.tsx
  <Component>.stories.tsx
  index.ts
```

Then add the export to the category barrel. `pnpm build` regenerates the package
inventory; do not edit `INVENTORY.md` by hand.

## Design values

Colours, sizes, radii, durations and fonts live in `packages/tokens` and nowhere else. A
raw hex colour in `packages/ui` fails the build. If a value you need does not exist, add
it to the token ladder rather than inventing it locally.

## Commits

[Conventional Commits](https://www.conventionalcommits.org). One logical change per
commit. Run `pnpm changeset` when your change should appear in a release.

No AI attribution in commits, pull requests, tags, changelogs or author fields.

## Code of conduct

Be decent. Report problems to the address in `SECURITY.md`.
