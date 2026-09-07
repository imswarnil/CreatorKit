/**
 * `postcss-import` must run first and is not optional: without it the kit's
 * stylesheets are silently dropped rather than inlined, and the demo previews
 * render unstyled with no error anywhere.
 */
export default {
	plugins: {
		'postcss-import': {},
		tailwindcss: {},
		autoprefixer: {},
	},
};
