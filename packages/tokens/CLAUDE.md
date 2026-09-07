# packages/tokens

The single source of every design decision in CreatorKit. **This package imports
nothing** — it is the bottom of the dependency graph and must stay there.

## Where things are

| File | Holds |
| --- | --- |
| `src/palette.ts` | Raw ramps: `ink`, `signal`, `amber`, `mint`, `azure`, `rose`, `pure` |
| `src/semantic.ts` | The `light` and `dark` role maps — surfaces, text, borders, accent, status, state, shadow |
| `src/scale.ts` | Everything non-colour: type, space, radius, border, width, control, icon, z, ratio, motion, breakpoints |
| `src/types.ts` | `ref()`, `flatten()`, the `ck` prefix |
| `scripts/build-outputs.mjs` | Emits `tokens.css`, `tokens.scss`, `tailwind.js`, `TOKENS.md` |

`TOKENS.md` and everything in `dist/` are **generated**. Never edit them; edit `src/` and
rebuild. `README.md` is hand-written guidance and is the file to update when a role's
*meaning* changes.

## Rules

1. A semantic role is authored as `ref('palette.x.y')`, not as a literal, so the
   indirection survives into the CSS and a consumer can retheme by redefining one palette
   property.
2. Only roles that genuinely differ appear in `dark`. Anything absent inherits from light
   — do not restate a value to be explicit.
3. Never define a colour only inside a media query. Light goes on bare `:root`.
4. Adding a palette step means checking it against `text-on-*` contrast first. See
   "Ragged ramps" in README.md before filling out `mint`, `azure` or `rose`.
5. Breakpoints are emitted as properties for documentation, but a media query cannot read
   a custom property — the Tailwind preset is what drives responsive behaviour. Change
   both together.

## Adding a token

Add it to the right file in `src/`, in the group it belongs to, with a comment saying when
to use it if that is not obvious. Then `pnpm --filter @creatorkit/tokens build` and add a
row of guidance to `README.md` if it is a role rather than a raw value.

## Testing

`pnpm --filter @creatorkit/tokens build` must print a property count, and the emitted
`dist/tokens.css` must contain three theme blocks: `:root`, the
`prefers-color-scheme: dark` block guarded with `:root:not([data-theme='light'])`, and
`[data-theme='dark']`.
