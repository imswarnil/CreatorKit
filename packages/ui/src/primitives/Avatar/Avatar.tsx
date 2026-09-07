import { forwardRef } from 'react';
import type { HTMLAttributes, ImgHTMLAttributes } from 'react';
import { cn } from '@creatorkit/core';
import { avatar, avatarStack } from './avatar.recipe.js';
import type { RecipeProps } from '../../recipe.js';

export interface AvatarProps
	extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'>,
		RecipeProps<typeof avatar> {
	src?: string | undefined;
	/** Describes the person. Required when `src` is set — it is the image's alt. */
	name: string;
	/** Shown when there is no image. Defaults to the initials of `name`. */
	fallback?: string;
	imgProps?: ImgHTMLAttributes<HTMLImageElement>;
}

const initials = (name: string) =>
	name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0] ?? '')
		.join('')
		.toUpperCase();

/**
 * A person.
 *
 * **Use it for** authors, guests, members, commenters. **Do not use it for** a
 * brand or a channel logo — those are not people and should not be circles by
 * default.
 *
 * The image is `aria-hidden` and the accessible name comes from the wrapper, so
 * a broken image degrades to initials without the name being announced twice.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
	{ className, size, ring, src, name, fallback, imgProps, ...rest },
	ref,
) {
	return (
		<span
			ref={ref}
			role="img"
			aria-label={name}
			className={cn(avatar({ size, ring }), className)}
			{...rest}
		>
			{src ? (
				<img
					{...imgProps}
					src={src}
					alt=""
					aria-hidden="true"
					className={cn('size-full object-cover', imgProps?.className)}
				/>
			) : (
				<span aria-hidden="true">{fallback ?? initials(name)}</span>
			)}
		</span>
	);
});

export type AvatarStackProps = HTMLAttributes<HTMLDivElement>;

/**
 * Overlapping avatars, for "and 4 others". Give each child `ring` so the
 * overlap stays readable.
 */
export const AvatarStack = forwardRef<HTMLDivElement, AvatarStackProps>(function AvatarStack(
	{ className, ...rest },
	ref,
) {
	return <div ref={ref} className={cn(avatarStack({}), className)} {...rest} />;
});
