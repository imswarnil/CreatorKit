import type { TokenGroup } from './types.js';

/**
 * The raw ramps. Nothing in the kit should reference these directly — they exist
 * so the semantic roles in `semantic.ts` have something to point at. If you find
 * yourself writing `palette-ink-500` in a component, you want a role instead.
 *
 * `ink` is a full 14-step ramp. The accents are deliberately partial: only the
 * steps the system actually uses are defined, because an unused step is a value
 * nobody has checked for contrast. See tokens.md, "Ragged ramps".
 */
export const palette = {
	/** Near-monochrome. Carries almost every surface and every piece of text. */
	ink: {
		0: '#ffffff',
		25: '#fcfcfd',
		50: '#f8f8fa',
		100: '#f1f1f4',
		200: '#e5e5ea',
		300: '#d3d3db',
		400: '#a5a5b2',
		500: '#76768a',
		600: '#55556a',
		700: '#3c3c4e',
		800: '#272734',
		900: '#191922',
		950: '#101017',
		1000: '#08080c',
	},
	/** The one loud colour. Record buttons, live badges, the accent. */
	signal: {
		50: '#fff2ef',
		100: '#ffe1db',
		200: '#ffc4b8',
		300: '#ff9d89',
		400: '#fb7358',
		500: '#f04e2e',
		600: '#dc3514',
		700: '#b52810',
		800: '#8f2211',
		900: '#6f1f12',
		950: '#3d0d07',
	},
	/** The second voice: craft, workshop, in-progress. Also carries warnings. */
	amber: {
		50: '#fdf8ed',
		100: '#f9ecce',
		200: '#f2d795',
		300: '#e8bd5c',
		400: '#d9a33a',
		500: '#c1872a',
		600: '#9d6a22',
		700: '#78501f',
		800: '#55391b',
		900: '#382512',
	},
	mint: { 50: '#eafaf1', 100: '#cbf2de', 500: '#16a06a', 600: '#0f8156', 700: '#0b6444' },
	azure: { 50: '#eaf3ff', 100: '#d3e6ff', 500: '#2b7bef', 600: '#1a61cc', 700: '#164ea3' },
	rose: { 50: '#fdeef1', 100: '#fbd7de', 500: '#d92d4e', 600: '#b81f3d', 700: '#931832' },
	/** True black and true white, for the few places a near-black is wrong. */
	pure: { black: '#000000', white: '#ffffff' },
} as const satisfies TokenGroup;
