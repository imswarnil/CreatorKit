/**
 * Shared by every package that ships CSS. `postcss-import` inlines the layer
 * files so a consumer gets one stylesheet and installs nothing; cssnano only
 * runs for the .min build.
 */
export default {
	plugins: {
		'postcss-import': {},
		...(process.env['NODE_ENV'] === 'production'
			? { cssnano: { preset: ['default', { discardComments: { removeAll: false } }] } }
			: {}),
	},
};
