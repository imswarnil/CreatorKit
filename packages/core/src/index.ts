/**
 * @creatorkit/core — the layer between tokens and components.
 *
 * Stylesheets (import the ones you need):
 *   @creatorkit/core/reset      normalisation + token-driven base element styles
 *   @creatorkit/core/base       focus ring, selection, media defaults
 *   @creatorkit/core/css        both of the above, plus the tokens
 */
export { cn } from './cn.js';
export type {
	AsProp,
	PolymorphicProps,
	PolymorphicPropsWithRef,
	PolymorphicRef,
	PolymorphicComponent,
} from './polymorphic.js';
