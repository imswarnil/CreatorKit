import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '@creatorkit/core';
import { badge } from './badge.recipe.js';
import type { RecipeProps } from '../../recipe.js';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, RecipeProps<typeof badge> {
	/** Show a leading dot. On `tone="live"` it pulses. */
	dot?: boolean;
}

/**
 * A small piece of metadata attached to something else: a status, a count, a
 * duration, a tag.
 *
 * **Use it for** labelling. **Do not use it for** an action — a badge that is
 * clickable is a `Button` with `size="sm" shape="pill"`. `interactive` exists
 * only for badges that are already inside a control, such as a removable filter
 * chip, and it does not make the badge focusable on its own.
 *
 * `tone="live"` is announced: it renders an `aria-label` of "live" so the state
 * is not carried by colour alone.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
	{ className, tone, mono, interactive, dot, children, ...rest },
	ref,
) {
	const isLive = tone === 'live';
	return (
		<span
			ref={ref}
			className={cn(badge({ tone, mono, interactive }), className)}
			{...(isLive ? { 'aria-label': 'live' } : {})}
			{...rest}
		>
			{(dot ?? isLive) && (
				<span
					aria-hidden="true"
					className={cn(
						'size-[--ck-dot-sm] rounded-full bg-current',
						isLive && 'motion-safe:animate-pulse',
					)}
				/>
			)}
			{children}
		</span>
	);
});
