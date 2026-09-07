/**
 * @creatorkit/tokens — the foundation.
 *
 * The source of truth is `styles/*.css`: 368 custom properties, which is what
 * the whole CSS kit is written against. Nothing is duplicated in TypeScript —
 * the build *reads* that CSS and emits the other views of it:
 *
 *   dist/tokens.css    the foundation, inlined (tokens + reset + a11y + layout
 *                      + pattern + frame + cutout + logo + icon)
 *   dist/tailwind.js   a Tailwind preset, so React components name the same roles
 *   dist/tokens.json   every token, its value, and its dark override
 *   TOKENS.md          the generated reference
 *
 * `src/map.ts` is the only authored file: it says that `bg-surface-raised`
 * should mean `--bg-raised`. Values are never written here.
 */
export * as map from './map.js';
export { breakpoints } from './map.js';
export { cssVar } from './types.js';
export type { Token } from './types.js';
