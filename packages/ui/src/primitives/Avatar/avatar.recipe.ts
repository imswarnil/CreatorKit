import { recipe } from '../../recipe.js';

export const avatar = recipe(
	'avatar',
	[
		'relative inline-grid place-items-center shrink-0 overflow-hidden',
		'rounded-full bg-surface-muted text-text-muted',
		'font-body font-medium leading-flat select-none',
	].join(' '),
	{
		variants: {
			size: {
				xs: 'size-6 text-2xs',
				sm: 'size-8 text-xs',
				md: 'size-10 text-sm',
				lg: 'size-12 text-md',
				xl: 'size-16 text-xl',
			},
			/** A hairline so overlapping avatars stay legible on any surface. */
			ring: { true: 'ring-2 ring-surface-canvas', false: '' },
		},
		defaultVariants: { size: 'md', ring: false },
	},
);

export const avatarStack = recipe(
	'avatar-stack',
	'flex items-center [&>*:not(:first-child)]:-ml-2',
	{ variants: { size: { sm: '', md: '', lg: '' } }, defaultVariants: { size: 'md' } },
);
