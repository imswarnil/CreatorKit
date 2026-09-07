import type { ComponentPropsWithoutRef, ElementType, ReactElement, Ref } from 'react';

/**
 * Types for components that accept an `as` prop.
 *
 * A Button rendered `as="a"` must accept `href` and reject `disabled`, and its
 * ref must be an anchor. These types buy that without each component restating
 * it. Use them only where changing the element is genuinely useful — a Card that
 * becomes an `<article>`, a Button that becomes a link. Not everywhere.
 */
export type AsProp<T extends ElementType> = { as?: T };

type PropsToOmit<T extends ElementType, P> = keyof (AsProp<T> & P);

export type PolymorphicProps<T extends ElementType, P = object> = P &
	AsProp<T> &
	Omit<ComponentPropsWithoutRef<T>, PropsToOmit<T, P>>;

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithoutRef<T> extends {
	ref?: infer R;
}
	? R
	: Ref<unknown>;

export type PolymorphicPropsWithRef<T extends ElementType, P = object> = PolymorphicProps<T, P> & {
	ref?: PolymorphicRef<T>;
};

/** The shape of a forwardRef component that stays generic over `as`. */
export type PolymorphicComponent<P, D extends ElementType> = <T extends ElementType = D>(
	props: PolymorphicPropsWithRef<T, P>,
) => ReactElement | null;
