import { forwardRef } from 'react';
import type { ElementType } from 'react';
import { cn } from '@creatorkit/core';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '@creatorkit/core';
import { button } from './button.recipe.js';
import type { RecipeProps } from '../../recipe.js';

export type ButtonOwnProps = RecipeProps<typeof button>;

/**
 * The kit's action.
 *
 * **Use it for** anything that performs an action, and — via `as="a"` — for a
 * link that is styled as the page's primary action, which is most creator CTAs
 * ("Watch the latest", "Subscribe").
 *
 * **Do not use it for** navigation that reads as text. That is `Link`. A button
 * that navigates and a link that acts are both wrong for keyboard and screen
 * reader users, and `as` exists to keep the element honest while the appearance
 * stays constant.
 *
 * Renders `<button type="button">` by default, because a bare `<button>` inside
 * a form submits it, and that is almost never what the caller meant.
 */
export const Button = forwardRef(function Button<T extends ElementType = 'button'>(
	{
		as,
		className,
		variant,
		size,
		shape,
		block,
		...rest
	}: PolymorphicProps<T, ButtonOwnProps & { className?: string }>,
	ref: PolymorphicRef<T>,
) {
	const Component = (as ?? 'button') as ElementType;
	const typeAttr = Component === 'button' ? { type: 'button' as const } : {};

	return (
		<Component
			ref={ref}
			className={cn(button({ variant, size, shape, block }), className)}
			{...typeAttr}
			{...rest}
		/>
	);
}) as PolymorphicComponent<ButtonOwnProps & { className?: string }, 'button'>;
