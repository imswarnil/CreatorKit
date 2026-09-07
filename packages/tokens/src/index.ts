/**
 * @creatorkit/tokens — the single source of every design decision in CreatorKit.
 *
 * Tokens are authored here, in TypeScript, exactly once. The build emits four
 * views of the same data:
 *
 *   dist/tokens.css      CSS custom properties, light + dark
 *   dist/tailwind.js     a Tailwind preset
 *   dist/tokens.scss     SCSS variables
 *   dist/index.js        these typed exports
 *
 * Nothing downstream may hardcode a colour, size, radius, duration or font.
 */
export { palette } from './palette.js';
export { light, dark } from './semantic.js';
export { scale, breakpoints } from './scale.js';
export { flatten, ref, PREFIX } from './types.js';
export type { TokenGroup, TokenValue } from './types.js';
