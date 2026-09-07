import { recipe } from '../../recipe.js';

export const input = recipe(
	'input',
	[
		'block w-full',
		'font-body text-sm text-text-default',
		'bg-surface-raised border-1 border-line-default rounded-control',
		'placeholder:text-text-faint',
		'transition-[border-color,box-shadow] duration-1 ease-out',
		'hover:border-line-strong',
		'disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-faint',
		'aria-[invalid=true]:border-danger-border',
	].join(' '),
	{
		variants: {
			size: {
				sm: 'h-sm px-2 text-xs',
				md: 'h-md px-3',
				lg: 'h-lg px-4 text-md',
			},
			/** For `<textarea>`, which has no fixed height. */
			multiline: { true: 'h-auto min-h-[calc(var(--ck-control-md)*2)] py-2', false: '' },
		},
		defaultVariants: { size: 'md', multiline: false },
	},
);
