# packages/icons

55 SVGs in six sets. Depends on nothing.

## Rules

1. **24px grid, `stroke="currentColor"`, `stroke-width="1.5"`, no `width` or `height`.**
   An icon with a hardcoded size or colour cannot be used by the `Icon` component and will
   look wrong beside every other icon.
2. **Names are unique across sets** — the sprite is one id namespace. The build qualifies
   collisions with the set name and warns; that is a fallback, not a design. Rename at the
   source.
3. `dist/sprite.svg`, `dist/icons.json` and `src/names.ts` are **generated** by
   `tools/icon-build`. Never edit them; add or rename the `.svg`.
4. Set membership is the folder. An icon in the wrong folder is only a docs grouping
   problem, but the sets are how someone finds an icon, so it matters.

## Adding an icon

Drop the `.svg` in the right set folder and run `pnpm --filter @creatorkit/icons build`.
The sprite, the JSON and the `IconName` union all regenerate. If the build warns about a
collision, rename rather than accepting the qualified name.
