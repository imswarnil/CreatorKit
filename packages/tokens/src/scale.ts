import { ref } from './types.js';
import type { TokenGroup } from './types.js';

/**
 * Everything that is not a colour. These do not change between themes, so they
 * are emitted once on `:root` and never redeclared.
 */
export const scale = {
	font: {
		display: "'Space Grotesk', 'Inter', ui-sans-serif, system-ui, sans-serif",
		body: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
		mono: "'IBM Plex Mono', ui-monospace, 'SF Mono', 'Cascadia Mono', monospace",
	},

	/**
	 * Fluid from `lg` up: the small sizes are fixed because UI text that resizes
	 * with the viewport is unreadable in a sidebar. Headings scale; labels do not.
	 */
	text: {
		'2xs': '0.6875rem',
		xs: '0.75rem',
		sm: '0.8125rem',
		base: '1rem',
		md: '1.0625rem',
		lg: 'clamp(1.125rem, 1.05rem + 0.32vw, 1.3125rem)',
		xl: 'clamp(1.3125rem, 1.19rem + 0.55vw, 1.625rem)',
		'2xl': 'clamp(1.5rem, 1.31rem + 0.83vw, 2rem)',
		'3xl': 'clamp(1.875rem, 1.55rem + 1.42vw, 2.75rem)',
		'4xl': 'clamp(2.25rem, 1.72rem + 2.36vw, 3.75rem)',
		'5xl': 'clamp(2.75rem, 1.86rem + 3.94vw, 5.25rem)',
		'6xl': 'clamp(3.25rem, 1.82rem + 6.3vw, 7rem)',
	},
	leading: { flat: '1', tight: '1.1', snug: '1.25', normal: '1.5', relaxed: '1.65', loose: '1.85' },
	tracking: {
		tighter: '-0.035em',
		tight: '-0.02em',
		normal: '0',
		wide: '0.04em',
		/** For the small all-caps mono labels the kit uses as eyebrows. */
		slate: '0.14em',
	},
	weight: { regular: '400', medium: '500', semibold: '600', bold: '700' },
	measure: { prose: '68ch', ui: '46ch', lead: '56ch' },

	/** A 4px unit. Every gap in the kit is one of these. */
	space: {
		0: '0',
		px: '1px',
		1: '0.25rem',
		2: '0.5rem',
		3: '0.75rem',
		4: '1rem',
		5: '1.25rem',
		6: '1.5rem',
		8: '2rem',
		10: '2.5rem',
		12: '3rem',
		16: '4rem',
		20: '5rem',
		24: '6rem',
		32: '8rem',
		40: '10rem',
	},
	/** Vertical rhythm between page sections, and the page's side gutter. */
	section: {
		sm: 'clamp(2rem, 1.4rem + 2.6vw, 3.5rem)',
		md: 'clamp(3rem, 2rem + 4.4vw, 6rem)',
		lg: 'clamp(4.5rem, 2.8rem + 7.4vw, 9rem)',
	},
	gutter: 'clamp(1rem, 0.55rem + 2vw, 2rem)',

	radius: {
		none: '0',
		xs: '2px',
		sm: '4px',
		md: '8px',
		lg: '12px',
		xl: '16px',
		'2xl': '24px',
		'3xl': '32px',
		pill: '999px',
		full: '50%',
		/** Roles, so a card's roundness can change in one place. */
		control: ref('radius-md'),
		card: ref('radius-xl'),
		media: ref('radius-lg'),
		sheet: ref('radius-2xl'),
	},
	border: { hair: '1px', 1: '1px', 2: '2px', 3: '3px', 4: '4px' },

	/** Reading and layout widths. `site` is the default page container. */
	width: { prose: '44rem', narrow: '56rem', site: '71rem', wide: '82rem', full: '100%' },
	/** Interactive target heights. `tap` is the accessibility floor, not a size. */
	control: { sm: '2rem', md: '2.5rem', lg: '3rem', tap: '44px' },
	icon: { xs: '0.875rem', sm: '1rem', md: '1.25rem', lg: '1.5rem', xl: '2rem' },
	dot: { sm: '6px', md: '8px', lg: '12px' },

	/** One ladder. A component never invents a z-index. */
	z: {
		below: '-1',
		base: '0',
		raised: '10',
		sticky: '100',
		nav: '200',
		dropdown: '300',
		overlay: '400',
		modal: '500',
		toast: '600',
		tooltip: '700',
		max: '9999',
	},

	ratio: {
		video: '16 / 9',
		photo: '3 / 2',
		square: '1 / 1',
		short: '9 / 16',
		poster: '2 / 3',
		cinema: '21 / 9',
		golden: '1.618 / 1',
	},

	/**
	 * Four durations. `1` is a state change you should not notice, `4` is a
	 * deliberate entrance. Anything slower is a bug.
	 */
	duration: { 1: '120ms', 2: '200ms', 3: '320ms', 4: '560ms' },
	ease: {
		out: 'cubic-bezier(0.22, 1, 0.36, 1)',
		in: 'cubic-bezier(0.55, 0, 1, 0.45)',
		inout: 'cubic-bezier(0.65, 0, 0.35, 1)',
		spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
		linear: 'linear',
	},
	stagger: '60ms',
} as const satisfies TokenGroup;

/**
 * Breakpoints. Emitted as custom properties for documentation, but a media query
 * cannot read a custom property — the Tailwind preset is what actually drives
 * responsive behaviour. Keep the two in step.
 */
export const breakpoints = {
	sm: '40rem',
	md: '48rem',
	lg: '64rem',
	xl: '80rem',
	'2xl': '96rem',
} as const;
