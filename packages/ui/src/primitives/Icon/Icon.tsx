import { forwardRef } from 'react';
import type { SVGAttributes } from 'react';
import { cn } from '@creatorkit/core';
import { icon } from './icon.recipe.js';
import type { RecipeProps } from '../../recipe.js';

export interface IconProps extends SVGAttributes<SVGSVGElement>, RecipeProps<typeof icon> {
	/**
	 * What the icon means. Omit it when the icon is decorative — when the text
	 * beside it already says the same thing — and the icon is hidden from
	 * assistive technology instead.
	 */
	label?: string;
}

/**
 * The wrapper every icon renders through, so sizing and stroke come from tokens
 * rather than from each icon's own viewBox.
 *
 * **Do not** give an icon a `label` that repeats adjacent text: a "Download"
 * button with a labelled download icon is announced twice. Label only when the
 * icon is the whole control.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
	{ className, size, label, children, ...rest },
	ref,
) {
	return (
		<svg
			ref={ref}
			viewBox="0 0 24 24"
			strokeWidth={1.75}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={cn(icon({ size }), className)}
			{...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
			{...rest}
		>
			{children}
		</svg>
	);
});
