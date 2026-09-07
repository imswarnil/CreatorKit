import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '@creatorkit/core';
import { heading } from './heading.recipe.js';
import type { RecipeProps } from '../../recipe.js';

export interface HeadingProps
	extends HTMLAttributes<HTMLHeadingElement>,
		RecipeProps<typeof heading> {
	/** The document outline. Required, and deliberately separate from `size`. */
	level: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * A heading.
 *
 * `level` and `size` are separate on purpose. A section's third heading is an
 * `<h3>` no matter how large the design wants it, and a hero's `<h1>` sometimes
 * needs to be visually small. Coupling the two is the most common way a page
 * ends up with an `<h1>` inside a card, or an outline that jumps from `h2` to
 * `h5`.
 *
 * `level` is required so the choice is always deliberate.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
	{ className, level, size, tone, measure, ...rest },
	ref,
) {
	const Tag = `h${level}` as const;
	return (
		<Tag ref={ref} className={cn(heading({ size, tone, measure }), className)} {...rest} />
	);
});
