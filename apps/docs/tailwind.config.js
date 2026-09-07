import preset from '@creatorkit/tokens/tailwind';

/**
 * The docs site is dressed by the kit it documents. `content` reaches into
 * @creatorkit/ui so the utilities its recipes reference are generated here too —
 * without it, every component would render unstyled.
 */
export default {
	presets: [preset],
	content: [
		'./app/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./lib/**/*.{ts,tsx}',
		'../../packages/ui/src/**/*.{ts,tsx}',
	],
};
