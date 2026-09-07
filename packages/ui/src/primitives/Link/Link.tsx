import { forwardRef } from 'react';
import type { ElementType } from 'react';
import { cn } from '@creatorkit/core';
import type { PolymorphicComponent, PolymorphicProps, PolymorphicRef } from '@creatorkit/core';
import { link } from './link.recipe.js';
import type { RecipeProps } from '../../recipe.js';

export type LinkOwnProps = RecipeProps<typeof link> & { className?: string };

/**
 * Navigation.
 *
 * **Use `variant="default"` inside prose** — an underline is the only reliable
 * way to find a link in a paragraph, and removing it is a readability decision
 * disguised as a style one. `subtle` is for places where position already says
 * "link": navigation, card titles, lists.
 *
 * **`variant="cover"`** turns a link into the click target for its whole
 * positioned ancestor, which is how a card becomes clickable without wrapping
 * the card in an `<a>` and swallowing every control inside it. The ancestor
 * needs `relative`; any control that must stay clickable needs `relative` too.
 *
 * **Do not use it for** actions. That is `Button`, optionally `as="a"`.
 */
export const Link = forwardRef(function Link<T extends ElementType = 'a'>(
	{ as, className, variant, ...rest }: PolymorphicProps<T, LinkOwnProps>,
	ref: PolymorphicRef<T>,
) {
	const Component = (as ?? 'a') as ElementType;
	return <Component ref={ref} className={cn(link({ variant }), className)} {...rest} />;
}) as PolymorphicComponent<LinkOwnProps, 'a'>;
