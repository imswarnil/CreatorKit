import { recipe } from '../../recipe.js';

/**
 * Appearance only. Tailwind utilities, all token-backed.
 *
 * `live` is not decoration: it is the recording/streaming state, and it is the
 * one variant allowed to animate on its own.
 */
export const button = recipe(
	'btn',
	[
		'inline-flex items-center justify-center gap-2 shrink-0',
		'font-body font-medium text-sm leading-flat whitespace-nowrap',
		'rounded-control border-1 border-transparent',
		'transition-[background-color,border-color,color,box-shadow] duration-1 ease-out',
		'disabled:pointer-events-none disabled:opacity-50',
		'aria-disabled:pointer-events-none aria-disabled:opacity-50',
	].join(' '),
	{
		variants: {
			variant: {
				primary: 'bg-accent-default text-text-on-accent hover:bg-accent-hover active:bg-accent-press',
				secondary:
					'bg-surface-raised text-text-default border-line-default hover:bg-surface-muted active:bg-surface-sunken',
				ghost: 'bg-transparent text-text-default hover:bg-state-hover-wash active:bg-state-press-wash',
				quiet: 'bg-transparent text-text-muted hover:text-text-default hover:bg-state-hover-wash',
				soft: 'bg-accent-soft text-accent-soft-text hover:brightness-95',
				danger: 'bg-danger-border text-text-on-accent hover:brightness-110 active:brightness-95',
				live: 'bg-accent-default text-text-on-accent shadow-ring motion-safe:animate-pulse',
			},
			size: {
				sm: 'h-sm px-3 text-xs',
				md: 'h-md px-4',
				lg: 'h-lg px-6 text-md',
			},
			shape: {
				default: '',
				pill: 'rounded-pill',
				/** Square. Pair with an `aria-label` — there is no text to read. */
				icon: 'px-0 aspect-square',
			},
			block: {
				true: 'w-full',
				false: '',
			},
		},
		defaultVariants: { variant: 'primary', size: 'md', shape: 'default', block: false },
	},
);
