import { forwardRef } from 'react';
import type { ElementType } from 'react';
import { cn } from '@creatorkit/core';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '@creatorkit/core';
import { text } from './text.recipe.js';
import type { RecipeProps } from '../../recipe.js';

export type TextOwnProps = RecipeProps<typeof text> & { className?: string };

/**
 * Body copy and every non-heading typographic role.
 *
 * **Use `as`** to keep the element truthful: `variant="eyebrow"` looks like a
 * label but is usually a `<p>` or a `<span>`, never an `<h*>`. Styling a `<div>`
 * to look like a paragraph is fine; styling a `<span>` to look like a heading is
 * how a document loses its outline.
 *
 * **Do not use it for** headings — that is `Heading`, which enforces the level.
 */
export const Text = forwardRef(function Text<T extends ElementType = 'p'>(
	{ as, className, variant, tone, weight, measure, truncate, ...rest }: PolymorphicProps<T, TextOwnProps>,
	ref: PolymorphicRef<T>,
) {
	const Component = (as ?? 'p') as ElementType;
	return (
		<Component
			ref={ref}
			className={cn(text({ variant, tone, weight, measure, truncate }), className)}
			{...rest}
		/>
	);
}) as PolymorphicComponent<TextOwnProps, 'p'>;
