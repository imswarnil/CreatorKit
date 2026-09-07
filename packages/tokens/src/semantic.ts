import { ref } from './types.js';
import type { TokenGroup } from './types.js';

const p = (path: string) => ref(`palette.${path}`);

/**
 * Semantic roles — what a component is allowed to name.
 *
 * A component asks for `color-surface-raised`, never `palette-ink-0`. That is
 * what makes the dark theme a matter of redefining this one map rather than
 * auditing every component.
 *
 * Roles come in four families:
 *   surface  what a thing sits on
 *   text     what is written on it
 *   border   what separates it
 *   accent / status / state  what it means
 */
export const light = {
	color: {
		surface: {
			canvas: p('ink.0'),
			default: p('ink.0'),
			raised: p('ink.0'),
			sunken: p('ink.50'),
			muted: p('ink.100'),
			inverse: p('ink.950'),
			media: p('ink.900'),
			scrim: 'rgb(8 8 12 / 0.55)',
		},
		text: {
			default: p('ink.900'),
			muted: p('ink.600'),
			subtle: p('ink.500'),
			faint: p('ink.400'),
			'on-inverse': p('ink.50'),
			'on-accent': p('pure.white'),
			accent: p('signal.700'),
			link: ref('color-text-default'),
			'link-hover': p('signal.700'),
		},
		border: {
			subtle: p('ink.100'),
			default: p('ink.200'),
			strong: p('ink.300'),
			inverse: 'rgb(255 255 255 / 0.14)',
			accent: p('signal.500'),
		},
		accent: {
			default: p('signal.500'),
			hover: p('signal.600'),
			press: p('signal.700'),
			soft: p('signal.50'),
			'soft-text': p('signal.700'),
			ring: 'rgb(240 78 46 / 0.28)',
		},
		craft: {
			default: p('amber.400'),
			soft: p('amber.50'),
			text: p('amber.700'),
		},
		success: { surface: p('mint.50'), text: p('mint.700'), border: p('mint.500') },
		warning: { surface: p('amber.50'), text: p('amber.700'), border: p('amber.400') },
		danger: { surface: p('rose.50'), text: p('rose.700'), border: p('rose.500') },
		info: { surface: p('azure.50'), text: p('azure.700'), border: p('azure.500') },
		state: {
			'focus-ring': ref('color-accent-default'),
			'focus-ring-alt': p('pure.white'),
			'selection-surface': p('signal.100'),
			'selection-text': p('ink.900'),
			'hover-wash': 'rgb(8 8 12 / 0.035)',
			'press-wash': 'rgb(8 8 12 / 0.07)',
		},
		pattern: {
			ink: 'rgb(8 8 12 / 0.06)',
			'ink-strong': 'rgb(8 8 12 / 0.10)',
		},
	},
	shadow: {
		color: '232 20% 8%',
		0: 'none',
		1: '0 1px 2px hsl(var(--ck-shadow-color) / 0.05), 0 1px 1px hsl(var(--ck-shadow-color) / 0.03)',
		2: '0 2px 4px hsl(var(--ck-shadow-color) / 0.06), 0 6px 12px hsl(var(--ck-shadow-color) / 0.05)',
		3: '0 4px 8px hsl(var(--ck-shadow-color) / 0.07), 0 12px 24px hsl(var(--ck-shadow-color) / 0.07)',
		4: '0 8px 16px hsl(var(--ck-shadow-color) / 0.08), 0 24px 48px hsl(var(--ck-shadow-color) / 0.10)',
		5: '0 16px 32px hsl(var(--ck-shadow-color) / 0.10), 0 40px 80px hsl(var(--ck-shadow-color) / 0.14)',
		inset: 'inset 0 1px 2px hsl(var(--ck-shadow-color) / 0.06)',
		ring: `0 0 0 4px ${ref('color-accent-ring')}`,
	},
} as const satisfies TokenGroup;

/**
 * Dark is not "light, inverted". Surfaces climb *up* from the canvas instead of
 * casting shadows down onto it, so `raised` is lighter here and identical to
 * `canvas` in light. Borders become alpha-on-white so they read on any surface.
 * Only the roles that genuinely differ are listed; the rest inherit.
 */
export const dark = {
	color: {
		surface: {
			canvas: p('ink.1000'),
			default: p('ink.950'),
			raised: p('ink.900'),
			sunken: '#0c0c12',
			muted: p('ink.800'),
			inverse: p('ink.50'),
			media: p('pure.black'),
			scrim: 'rgb(0 0 0 / 0.68)',
		},
		text: {
			default: p('ink.50'),
			muted: p('ink.400'),
			subtle: p('ink.500'),
			faint: p('ink.600'),
			'on-inverse': p('ink.900'),
			accent: p('signal.400'),
			'link-hover': p('signal.400'),
		},
		border: {
			subtle: 'rgb(255 255 255 / 0.07)',
			default: 'rgb(255 255 255 / 0.12)',
			strong: 'rgb(255 255 255 / 0.22)',
			inverse: 'rgb(8 8 12 / 0.14)',
		},
		accent: {
			hover: p('signal.400'),
			press: p('signal.600'),
			soft: 'rgb(240 78 46 / 0.15)',
			'soft-text': p('signal.300'),
			ring: 'rgb(240 78 46 / 0.40)',
		},
		craft: {
			default: p('amber.300'),
			soft: 'rgb(217 163 58 / 0.14)',
			text: p('amber.200'),
		},
		success: { surface: 'rgb(22 160 106 / 0.16)', text: '#6ee7ad' },
		warning: { surface: 'rgb(217 163 58 / 0.16)', text: p('amber.200') },
		danger: { surface: 'rgb(217 45 78 / 0.18)', text: '#ff8fa5' },
		info: { surface: 'rgb(43 123 239 / 0.18)', text: '#93c2ff' },
		state: {
			'focus-ring': p('signal.400'),
			'focus-ring-alt': p('ink.1000'),
			'selection-surface': 'rgb(240 78 46 / 0.35)',
			'selection-text': p('ink.0'),
			'hover-wash': 'rgb(255 255 255 / 0.05)',
			'press-wash': 'rgb(255 255 255 / 0.09)',
		},
		pattern: {
			ink: 'rgb(255 255 255 / 0.07)',
			'ink-strong': 'rgb(255 255 255 / 0.12)',
		},
	},
	shadow: {
		color: '0 0% 0%',
		1: '0 1px 0 rgb(255 255 255 / 0.04) inset, 0 1px 2px rgb(0 0 0 / 0.5)',
		2: '0 1px 0 rgb(255 255 255 / 0.05) inset, 0 2px 6px rgb(0 0 0 / 0.55)',
		3: '0 1px 0 rgb(255 255 255 / 0.06) inset, 0 6px 16px rgb(0 0 0 / 0.6)',
		4: '0 1px 0 rgb(255 255 255 / 0.07) inset, 0 12px 32px rgb(0 0 0 / 0.65)',
		5: '0 1px 0 rgb(255 255 255 / 0.08) inset, 0 24px 64px rgb(0 0 0 / 0.7)',
		inset: 'inset 0 1px 2px rgb(0 0 0 / 0.5)',
	},
} as const satisfies TokenGroup;
