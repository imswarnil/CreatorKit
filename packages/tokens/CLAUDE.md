# packages/tokens

The single source of every design decision in CreatorKit. **This package imports
nothing** — it is the bottom of the dependency graph and must stay there.

## Where things are

| File | Holds |
| --- | --- |
| `styles/01-color.css` | **The ramps and the roles.** 231 declarations, dark block at the bottom |
| `styles/02..05, 11` | Type, space, elevation, motion, shape ladders |
| `styles/00-reset, 06..10, 12, 13` | Reset, layout, pattern, a11y, logo, icon, frame, cutout |
| `src/map.ts` | **The only authored file** — Tailwind name → custom property |
| `scripts/build-outputs.mjs` | Parses the CSS; emits `tailwind.js`, `tokens.json`, `TOKENS.md` |

`TOKENS.md` and everything in `dist/` are **generated**. Never edit them; edit `src/` and
rebuild. `README.md` is hand-written guidance and is the file to update when a role's
*meaning* changes.

## Rules

1. **Values live in CSS, never in TypeScript.** `src/map.ts` maps names; it must not
   contain a colour, a size or a duration. Duplicating a value here is the specific
   failure this package was restructured to remove.
2. A role is authored as `var(--ramp-step)`, not a literal, so a consumer can retheme by
   redefining one ramp property.
3. Only roles that genuinely differ appear in the dark block. Anything absent inherits.
4. Never define a colour only inside a media query. Light goes on bare `:root`.
5. Adding a ramp step means checking it against the `--fg-on-*` roles first.
6. Breakpoints are the one set of literals, in `src/map.ts` — a media query cannot read a
   custom property.
7. The build **fails** if `map.ts` names a property no stylesheet declares. Do not work
   around it; add the property.

## Adding a token

Add the declaration to the right stylesheet in `styles/`, in the group it belongs to, with
a comment saying when to use it if that is not obvious. Add a line to `src/map.ts` only if
React needs a Tailwind utility for it. Then `pnpm --filter @creatorkit/tokens build`, and
add a row of guidance to `README.md` if it is a role rather than a raw value.

## Testing

`pnpm --filter @creatorkit/tokens build` must print a property count, and the emitted
`dist/tokens.css` must carry both theme paths: the `prefers-color-scheme: dark` block and
the explicit `[data-theme='dark']` one, so all three theme states resolve.
