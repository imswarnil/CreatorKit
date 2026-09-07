import { recipe } from '../../recipe.js';

export const link = recipe(
	'link',
	'inline items-center gap-1 rounded-xs transition-colors duration-1 ease-out',
	{
		variants: {
			variant: {
				/** Underlined. The default, because a link in prose must be findable. */
				default: 'text-text-link underline decoration-line-strong hover:text-text-link-hover hover:decoration-current',
				/** No underline until hover. Only outside prose — nav, cards, lists. */
				subtle: 'text-text-muted no-underline hover:text-text-default',
				/** Reads as the accent. For a single call to action in a block of text. */
				accent: 'text-text-accent underline decoration-transparent hover:decoration-current',
				/** Covers its positioned parent, so a whole card is clickable. */
				cover: 'no-underline text-inherit after:absolute after:inset-0 after:content-[""]',
			},
		},
		defaultVariants: { variant: 'default' },
	},
);
