/**
 * Emit the non-JS views of the token set. Run after `tsc`, so it can import the
 * compiled tokens rather than reparsing the source — there is one definition of
 * a token and this script is not allowed to become a second one.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const { palette, light, dark, scale, breakpoints, flatten } = await import(
	join(dist, 'index.js')
);

const decls = (pairs, indent) =>
	pairs.map(([name, value]) => `${indent}${name}: ${value};`).join('\n');

const rootPairs = [
	...flatten({ palette }),
	...flatten(scale),
	...flatten({ breakpoint: breakpoints }),
	...flatten(light),
];
const darkPairs = flatten(dark);

const banner = `/*!
 * @creatorkit/tokens — generated. Do not edit.
 * Source: packages/tokens/src/*.ts  ·  Regenerate: pnpm --filter @creatorkit/tokens build
 */`;

/* ---------------------------------------------------------------- tokens.css
 * Three blocks, in this order, so all three theme states resolve:
 *   :root                                    the light palette, always defined
 *   @media (prefers-color-scheme: dark)      system dark, unless overridden to light
 *   [data-theme="dark"]                      an explicit choice, wins either way
 * A colour is never defined only inside a media query.
 */
const css = `${banner}

:root {
	color-scheme: light;
${decls(rootPairs, '\t')}
}

@media (prefers-color-scheme: dark) {
	:root:not([data-theme='light']) {
		color-scheme: dark;
${decls(darkPairs, '\t\t')}
	}
}

[data-theme='dark'] {
	color-scheme: dark;
${decls(darkPairs, '\t')}
}

@media (prefers-reduced-motion: reduce) {
	:root {
		--ck-duration-1: 1ms;
		--ck-duration-2: 1ms;
		--ck-duration-3: 1ms;
		--ck-duration-4: 1ms;
		--ck-stagger: 0ms;
	}
}
`;

/* --------------------------------------------------------------- tokens.scss */
const scss = `${banner.replace('/*!', '//').replace(/\n \*\/?/g, '\n//').replace(/^\/\/\s*$/gm, '//')}
${[...rootPairs, ...darkPairs.map(([n, v]) => [`${n}-dark`, v])]
	.map(([name, value]) => `$${name.replace(/^--/, '')}: ${JSON.stringify(value)};`)
	.join('\n')}
`;

/* -------------------------------------------------------------- tailwind.js
 * Every scale points at the custom property rather than the literal, so a page
 * that flips `data-theme` restyles without Tailwind regenerating anything.
 */
const v = (name) => `var(--ck-${name})`;
const map = (group, prefix) =>
	Object.fromEntries(Object.keys(group).map((k) => [k, v(`${prefix}-${k}`)]));

const preset = {
	theme: {
		extend: {
			colors: {
				surface: map(light.color.surface, 'color-surface'),
				text: map(light.color.text, 'color-text'),
				line: map(light.color.border, 'color-border'),
				accent: map(light.color.accent, 'color-accent'),
				craft: map(light.color.craft, 'color-craft'),
				success: map(light.color.success, 'color-success'),
				warning: map(light.color.warning, 'color-warning'),
				danger: map(light.color.danger, 'color-danger'),
				info: map(light.color.info, 'color-info'),
				state: map(light.color.state, 'color-state'),
			},
			fontFamily: {
				display: [v('font-display')],
				body: [v('font-body')],
				mono: [v('font-mono')],
			},
			fontSize: map(scale.text, 'text'),
			lineHeight: map(scale.leading, 'leading'),
			letterSpacing: map(scale.tracking, 'tracking'),
			fontWeight: map(scale.weight, 'weight'),
			maxWidth: { ...map(scale.width, 'width'), ...map(scale.measure, 'measure') },
			spacing: { ...map(scale.space, 'space'), gutter: v('gutter') },
			borderRadius: map(scale.radius, 'radius'),
			borderWidth: map(scale.border, 'border'),
			// `shadow-color` is an hsl triple the shadows interpolate, not a shadow itself
			boxShadow: Object.fromEntries(
				Object.keys(light.shadow)
					.filter((k) => k !== 'color')
					.map((k) => [k, v(`shadow-${k}`)]),
			),
			zIndex: map(scale.z, 'z'),
			aspectRatio: map(scale.ratio, 'ratio'),
			transitionDuration: map(scale.duration, 'duration'),
			transitionTimingFunction: map(scale.ease, 'ease'),
			height: map(scale.control, 'control'),
			minHeight: map(scale.control, 'control'),
			size: map(scale.icon, 'icon'),
		},
		screens: Object.fromEntries(Object.entries(breakpoints).map(([k, val]) => [k, val])),
	},
};

const tailwind = `${banner}
/** @type {import('tailwindcss').Config} */
export default ${JSON.stringify(preset, null, '\t')};
`;

mkdirSync(dist, { recursive: true });
writeFileSync(join(dist, 'tokens.css'), css);
writeFileSync(join(dist, 'tokens.scss'), scss);
writeFileSync(join(dist, 'tailwind.js'), tailwind);

console.log(
	`tokens: ${rootPairs.length} properties + ${darkPairs.length} dark overrides → tokens.css, tokens.scss, tailwind.js`,
);

/* ----------------------------------------------------------------- TOKENS.md
 * The reference table is generated so it cannot drift from the tokens. The
 * guidance — when to reach for which role — is hand-written in README.md.
 */
const darkByName = new Map(darkPairs);
const table = (pairs) =>
	[
		'| Token | Value | Dark |',
		'| --- | --- | --- |',
		...pairs.map(([name, value]) => {
			const d = darkByName.get(name);
			return `| \`${name}\` | \`${value}\` | ${d ? `\`${d}\`` : '—'} |`;
		}),
	].join('\n');

const section = (title, note, pairs) => `\n## ${title}\n\n${note}\n\n${table(pairs)}\n`;
const startsWith = (pairs, p) => pairs.filter(([n]) => n.startsWith(`--ck-${p}`));

const md = `<!-- generated by scripts/build-outputs.mjs — do not edit -->
# Token reference

Every custom property this package emits, with its light value and its dark
override where one exists. ${rootPairs.length} properties, ${darkPairs.length} dark overrides.

For *when to use which*, read this package's README. For the rule that keeps these
honest, read \`ARCHITECTURE.md\` at the repo root.
${section('Palette', 'Raw ramps. Components must not reference these — use a role below.', startsWith(rootPairs, 'palette'))}
${section('Colour roles', 'What a component is allowed to name.', startsWith(rootPairs, 'color'))}
${section('Elevation', 'Five steps. In dark they gain an inset highlight instead of a deeper shadow.', startsWith(rootPairs, 'shadow'))}
${section('Typography', 'Sizes below `lg` are fixed; `lg` and up are fluid.', [...startsWith(rootPairs, 'font'), ...startsWith(rootPairs, 'text'), ...startsWith(rootPairs, 'leading'), ...startsWith(rootPairs, 'tracking'), ...startsWith(rootPairs, 'weight'), ...startsWith(rootPairs, 'measure')])}
${section('Space', 'A 4px unit, plus fluid section rhythm and the page gutter.', [...startsWith(rootPairs, 'space'), ...startsWith(rootPairs, 'section'), ...startsWith(rootPairs, 'gutter')])}
${section('Shape', 'Named roles (`control`, `card`, `media`, `sheet`) point at the raw steps.', [...startsWith(rootPairs, 'radius'), ...startsWith(rootPairs, 'border')])}
${section('Layout', 'Widths, control heights, icon sizes and the z-index ladder.', [...startsWith(rootPairs, 'width'), ...startsWith(rootPairs, 'measure'), ...startsWith(rootPairs, 'control'), ...startsWith(rootPairs, 'icon'), ...startsWith(rootPairs, 'dot'), ...startsWith(rootPairs, 'z-'), ...startsWith(rootPairs, 'ratio'), ...startsWith(rootPairs, 'breakpoint')])}
${section('Motion', 'Four durations and five curves. Everything collapses to 1ms under `prefers-reduced-motion`.', [...startsWith(rootPairs, 'duration'), ...startsWith(rootPairs, 'ease'), ...startsWith(rootPairs, 'stagger')])}
`;

writeFileSync(join(root, 'TOKENS.md'), md);
console.log('tokens: TOKENS.md');
