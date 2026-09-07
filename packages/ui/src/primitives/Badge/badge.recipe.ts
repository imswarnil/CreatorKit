import { recipe } from '../../recipe.js';

export const badge = recipe(
	'badge',
	[
		'inline-flex items-center gap-1 shrink-0',
		'font-body font-medium text-2xs leading-flat tracking-wide',
		'px-2 py-1 rounded-sm border-1 border-transparent',
	].join(' '),
	{
		variants: {
			tone: {
				neutral: 'bg-surface-muted text-text-muted',
				signal: 'bg-accent-soft text-accent-soft-text',
				craft: 'bg-craft-soft text-craft-text',
				success: 'bg-success-surface text-success-text',
				warning: 'bg-warning-surface text-warning-text',
				danger: 'bg-danger-surface text-danger-text',
				info: 'bg-info-surface text-info-text',
				inverse: 'bg-surface-inverse text-text-on-inverse',
				/** On air. The dot pulses; the badge does not. */
				live: 'bg-accent-default text-text-on-accent uppercase',
			},
			/** Timecodes, durations, counts — anything that should align in a column. */
			mono: { true: 'font-mono tabular-nums tracking-normal', false: '' },
			/** Adds hover and press states. Only for a badge that is really a control. */
			interactive: {
				true: 'cursor-pointer transition-colors duration-1 ease-out hover:brightness-95',
				false: '',
			},
		},
		defaultVariants: { tone: 'neutral', mono: false, interactive: false },
	},
);
