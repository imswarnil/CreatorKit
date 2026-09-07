/**
 * The naming map: a Tailwind utility name → the custom property it reads.
 *
 * This file is the *only* authored part of the token package. The values live in
 * `styles/*.css`, which is what the 450-class CSS kit is written against and
 * therefore the single source of truth. What cannot be derived from CSS is the
 * naming — that `bg-surface-raised` should mean `--bg-raised` — so it lives here
 * and nowhere else.
 *
 * Adding a token means adding it to the CSS. Adding a *utility* for it means
 * adding a line here too.
 */

/** Surfaces — what a thing sits on. */
export const surface = {
	canvas: 'bg-canvas',
	default: 'bg-surface',
	raised: 'bg-raised',
	sunken: 'bg-sunken',
	muted: 'bg-muted',
	inverse: 'bg-inverse',
	media: 'bg-media',
	scrim: 'bg-scrim',
} as const;

/** Text — what is written on them. */
export const text = {
	default: 'fg-default',
	muted: 'fg-muted',
	subtle: 'fg-subtle',
	faint: 'fg-faint',
	'on-inverse': 'fg-on-inverse',
	'on-accent': 'fg-on-accent',
	accent: 'fg-accent',
	link: 'fg-link',
	'link-hover': 'fg-link-hover',
} as const;

/** Borders — what separates them. */
export const line = {
	subtle: 'line-subtle',
	default: 'line-default',
	strong: 'line-strong',
	inverse: 'line-inverse',
	accent: 'line-accent',
} as const;

/** The one loud colour, and its states. */
export const accent = {
	default: 'accent',
	hover: 'accent-hover',
	press: 'accent-press',
	soft: 'accent-soft',
	'soft-text': 'accent-soft-fg',
	ring: 'accent-ring',
} as const;

/** The second voice: work in progress. Not a warning. */
export const craft = { default: 'craft', soft: 'craft-soft', text: 'craft-fg' } as const;

const status = (name: string) =>
	({ surface: `${name}-bg`, text: `${name}-fg`, border: `${name}-line` }) as const;

export const success = status('success');
export const warning = status('warning');
export const danger = status('danger');
export const info = status('info');

/** Interaction state. */
export const state = {
	'focus-ring': 'focus-ring',
	'focus-ring-alt': 'focus-ring-alt',
	'selection-surface': 'selection-bg',
	'selection-text': 'selection-fg',
	'hover-wash': 'hover-wash',
	'press-wash': 'press-wash',
} as const;

/** Non-colour scales. Key is the Tailwind name, value the custom property. */
export const scales = {
	fontFamily: { display: 'font-display', body: 'font-body', mono: 'font-slate' },
	fontSize: {
		'2xs': 'text-2xs', xs: 'text-xs', sm: 'text-sm', base: 'text-base', md: 'text-md',
		lg: 'text-lg', xl: 'text-xl', '2xl': 'text-2xl', '3xl': 'text-3xl',
		'4xl': 'text-4xl', '5xl': 'text-5xl', '6xl': 'text-6xl',
	},
	lineHeight: {
		flat: 'leading-flat', tight: 'leading-tight', snug: 'leading-snug',
		normal: 'leading-normal', relaxed: 'leading-relaxed', loose: 'leading-loose',
	},
	letterSpacing: {
		tighter: 'tracking-tighter', tight: 'tracking-tight', normal: 'tracking-normal',
		wide: 'tracking-wide', slate: 'tracking-slate',
	},
	fontWeight: {
		regular: 'weight-regular', medium: 'weight-medium',
		semibold: 'weight-semibold', bold: 'weight-bold',
	},
	spacing: {
		0: 'space-0', px: 'space-px', 1: 'space-1', 2: 'space-2', 3: 'space-3', 4: 'space-4',
		5: 'space-5', 6: 'space-6', 8: 'space-8', 10: 'space-10', 12: 'space-12',
		16: 'space-16', 20: 'space-20', 24: 'space-24', 32: 'space-32', 40: 'space-40',
		gutter: 'gutter', 'section-sm': 'section-sm', 'section-md': 'section-md',
		'section-lg': 'section-lg',
	},
	borderRadius: {
		none: 'radius-none', xs: 'radius-xs', sm: 'radius-sm', md: 'radius-md',
		lg: 'radius-lg', xl: 'radius-xl', '2xl': 'radius-2xl', '3xl': 'radius-3xl',
		pill: 'radius-pill', full: 'radius-full',
		control: 'radius-control', card: 'radius-card', media: 'radius-media', sheet: 'radius-sheet',
	},
	borderWidth: { hair: 'border-hair', 1: 'border-1', 2: 'border-2', 3: 'border-3', 4: 'border-4' },
	boxShadow: {
		0: 'shadow-0', 1: 'shadow-1', 2: 'shadow-2', 3: 'shadow-3', 4: 'shadow-4',
		5: 'shadow-5', inset: 'shadow-inset', ring: 'shadow-signal',
	},
	maxWidth: {
		prose: 'w-prose', narrow: 'w-narrow', site: 'w-site', wide: 'w-wide',
		measure: 'measure-prose', ui: 'measure-ui', lead: 'measure-lead',
	},
	height: { sm: 'control-sm', md: 'control-md', lg: 'control-lg', tap: 'tap-min' },
	size: { xs: 'icon-xs', sm: 'icon-sm', md: 'icon-md', lg: 'icon-lg', xl: 'icon-xl' },
	zIndex: {
		below: 'z-below', base: 'z-base', raised: 'z-raised', sticky: 'z-sticky', nav: 'z-nav',
		dropdown: 'z-dropdown', overlay: 'z-overlay', modal: 'z-modal', toast: 'z-toast',
		tooltip: 'z-tooltip', max: 'z-max',
	},
	aspectRatio: {
		video: 'ratio-video', photo: 'ratio-photo', square: 'ratio-square', short: 'ratio-short',
		poster: 'ratio-poster', cinema: 'ratio-cinema', golden: 'ratio-golden',
	},
	transitionDuration: { 1: 'dur-1', 2: 'dur-2', 3: 'dur-3', 4: 'dur-4' },
	transitionTimingFunction: {
		out: 'ease-out', in: 'ease-in', inout: 'ease-inout',
		spring: 'ease-spring', linear: 'ease-linear',
	},
} as const;

/**
 * Breakpoints. A media query cannot read a custom property, so these are the one
 * set of values that must be literals — they are not in the CSS ladder.
 */
export const breakpoints = {
	sm: '40rem',
	md: '48rem',
	lg: '64rem',
	xl: '80rem',
	'2xl': '96rem',
} as const;
