import { recipe } from '../../recipe.js';

export const icon = recipe('icon', 'inline-block shrink-0 fill-none stroke-current', {
	variants: {
		size: {
			xs: 'size-xs',
			sm: 'size-sm',
			md: 'size-md',
			lg: 'size-lg',
			xl: 'size-xl',
		},
	},
	defaultVariants: { size: 'md' },
});
