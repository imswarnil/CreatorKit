import { recipe } from '../../recipe.js';

export const heading = recipe(
	'heading',
	'font-display font-semibold leading-tight tracking-tight text-text-default text-balance',
	{
		variants: {
			/** Appearance. Independent of `level`, which is the document outline. */
			size: {
				'2xs': 'text-md',
				xs: 'text-lg',
				sm: 'text-xl',
				md: 'text-2xl',
				lg: 'text-3xl',
				xl: 'text-4xl',
				'2xl': 'text-5xl',
				'3xl': 'text-6xl',
			},
			tone: {
				default: 'text-text-default',
				muted: 'text-text-muted',
				accent: 'text-text-accent',
				'on-inverse': 'text-text-on-inverse',
			},
			measure: { prose: 'max-w-prose', lead: 'max-w-lead', none: '' },
		},
		defaultVariants: { size: 'lg', tone: 'default', measure: 'none' },
	},
);
