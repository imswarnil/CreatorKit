import preset from '@creatorkit/tokens/tailwind';

/**
 * Only used to expand the `@apply` directives that `recipe-to-css` emits into
 * real declarations, so the published stylesheet needs no Tailwind downstream.
 * `content` is empty on purpose: every class in the output comes from an
 * `@apply`, never from scanning markup.
 */
export default {
	presets: [preset],
	content: [],
};
