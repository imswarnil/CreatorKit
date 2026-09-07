import { recipe } from '../../recipe.js';

export const text = recipe('text', 'font-body', {
	variants: {
		variant: {
			body: 'text-base leading-normal text-text-default',
			lead: 'text-md leading-relaxed text-text-muted max-w-lead',
			small: 'text-sm leading-normal text-text-muted',
			caption: 'text-xs leading-snug text-text-subtle',
			/** The small mono label above a heading. Never a heading itself. */
			eyebrow: 'font-mono text-2xs uppercase tracking-slate text-text-subtle',
			code: 'font-mono text-sm text-text-default',
		},
		tone: {
			default: 'text-text-default',
			muted: 'text-text-muted',
			subtle: 'text-text-subtle',
			faint: 'text-text-faint',
			accent: 'text-text-accent',
			danger: 'text-danger-text',
			inherit: 'text-inherit',
		},
		weight: {
			regular: 'font-regular',
			medium: 'font-medium',
			semibold: 'font-semibold',
			bold: 'font-bold',
		},
		/** Constrain to a comfortable reading measure. */
		measure: { prose: 'max-w-prose', ui: 'max-w-ui', none: '' },
		truncate: { true: 'truncate', false: '' },
	},
	defaultVariants: { variant: 'body', measure: 'none', truncate: false },
});
