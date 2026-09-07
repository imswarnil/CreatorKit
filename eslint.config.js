import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

/**
 * One ESLint config for the whole workspace. Packages do not carry their own
 * rules — if a rule is worth having it is worth having everywhere.
 */
export default tseslint.config(
	{ ignores: ['**/dist/**', '**/.next/**', '**/.turbo/**', 'ghost/**', '_legacy/**'] },
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
		plugins: { 'react-hooks': reactHooks },
		rules: {
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/consistent-type-imports': 'error',
		},
	},
	/**
	 * The token guard.
	 *
	 * A raw colour in a component is how a design system dies: it works, it ships,
	 * and six months later the dark theme has a hole in it that nothing explains.
	 * Colours come from tokens, so a literal one here is a build failure, not a
	 * review comment. If a value you need does not exist, add it to
	 * `packages/tokens` — that is the whole point of the package.
	 */
	{
		files: ['packages/ui/**/*.{ts,tsx}', 'packages/collections/**/*.{ts,tsx}'],
		rules: {
			'no-restricted-syntax': [
				'error',
				{
					selector:
						'Literal[value=/#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b/]',
					message:
						'Raw hex colour. Use a token: cn("bg-surface-raised") or var(--ck-color-*). Add the value to @creatorkit/tokens if it does not exist.',
				},
				{
					selector: 'TemplateElement[value.raw=/#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\\b/]',
					message:
						'Raw hex colour in a template literal. Use a token — see @creatorkit/tokens.',
				},
				{
					selector: 'Literal[value=/\\b(?:rgba?|hsla?|oklch)\\(/]',
					message:
						'Raw colour function. Use a token from @creatorkit/tokens; alpha washes exist as --ck-color-state-* roles.',
				},
			],
		},
	},
	prettier,
);
