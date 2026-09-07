/**
 * Read the foundation CSS; emit every other view of it.
 *
 * The previous version of this file *declared* token values in TypeScript, which
 * meant the same colour existed twice — once here and once in the stylesheet the
 * 450-class kit actually uses. Two sources is one too many, so this parses the
 * CSS instead. Adding a token now means adding it in exactly one place.
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const stylesDir = join(root, 'styles');
const dist = join(root, 'dist');
const { map, breakpoints } = await import(join(dist, 'index.js'));

/**
 * Pull `--name: value;` declarations out of a stylesheet, tagging each with the
 * theme it was declared under. A declaration inside a `[data-theme='dark']` or a
 * `prefers-color-scheme: dark` block is a dark override; everything else is base.
 */
function parse(css, file) {
	const tokens = [];
	const darkRanges = [];

	// Find the extent of every dark block so a declaration can be attributed.
	const blockRe = /(\[data-theme=['"]?dark['"]?\]|prefers-color-scheme:\s*dark)/g;
	let m;
	while ((m = blockRe.exec(css))) {
		const open = css.indexOf('{', m.index);
		if (open === -1) continue;
		let depth = 0;
		let i = open;
		for (; i < css.length; i++) {
			if (css[i] === '{') depth++;
			else if (css[i] === '}') {
				depth--;
				if (depth === 0) break;
			}
		}
		darkRanges.push([open, i]);
	}
	const isDark = (i) => darkRanges.some(([a, b]) => i > a && i < b);

	const declRe = /--([a-z0-9-]+)\s*:\s*([^;}]+)[;}]/gi;
	while ((m = declRe.exec(css))) {
		tokens.push({
			name: m[1],
			value: m[2].trim().replace(/\s+/g, ' '),
			theme: isDark(m.index) ? 'dark' : 'light',
			file,
		});
	}
	return tokens;
}

const files = readdirSync(stylesDir)
	.filter((f) => f.endsWith('.css') && f !== 'index.css')
	.sort();

const tokens = files.flatMap((f) => parse(readFileSync(join(stylesDir, f), 'utf8'), f));

const light = new Map();
const dark = new Map();
for (const t of tokens) (t.theme === 'dark' ? dark : light).set(t.name, t);

mkdirSync(dist, { recursive: true });

/* ------------------------------------------------------------- tokens.json */
writeFileSync(
	join(dist, 'tokens.json'),
	JSON.stringify(
		[...light.values()].map((t) => ({
			name: t.name,
			value: t.value,
			dark: dark.get(t.name)?.value ?? null,
			file: t.file,
		})),
		null,
		'\t',
	) + '\n',
);

/* ------------------------------------------------------------- tailwind.js
 * Every scale points at the custom property, never at a literal, so a page that
 * flips `data-theme` restyles without Tailwind regenerating anything.
 */
const v = (name) => `var(--${name})`;
const mapValues = (obj) => Object.fromEntries(Object.entries(obj).map(([k, name]) => [k, v(name)]));

const missing = [];
const check = (obj, label) => {
	for (const [key, name] of Object.entries(obj)) {
		if (!light.has(name)) missing.push(`${label}.${key} → --${name}`);
	}
	return obj;
};

const preset = {
	theme: {
		screens: { ...breakpoints },
		extend: {
			colors: {
				surface: mapValues(check(map.surface, 'surface')),
				text: mapValues(check(map.text, 'text')),
				line: mapValues(check(map.line, 'line')),
				accent: mapValues(check(map.accent, 'accent')),
				craft: mapValues(check(map.craft, 'craft')),
				success: mapValues(check(map.success, 'success')),
				warning: mapValues(check(map.warning, 'warning')),
				danger: mapValues(check(map.danger, 'danger')),
				info: mapValues(check(map.info, 'info')),
				state: mapValues(check(map.state, 'state')),
			},
			...Object.fromEntries(
				Object.entries(map.scales).map(([scale, entries]) => [
					scale,
					scale === 'fontFamily'
						? Object.fromEntries(Object.entries(entries).map(([k, n]) => [k, [v(n)]]))
						: mapValues(check(entries, scale)),
				]),
			),
			minHeight: mapValues(map.scales.height),
		},
	},
};

/**
 * A utility that points at a property nothing declares produces a rule that does
 * nothing, silently. Fail the build instead — this is the seam between the two
 * halves of the system and it is the one place drift can hide.
 */
if (missing.length) {
	console.error(
		'tokens: the naming map references custom properties that no stylesheet declares:\n  ' +
			missing.join('\n  '),
	);
	process.exit(1);
}

writeFileSync(
	join(dist, 'tailwind.js'),
	`/*! @creatorkit/tokens — generated from styles/*.css. Do not edit. */
/** @type {import('tailwindcss').Config} */
export default ${JSON.stringify(preset, null, '\t')};
`,
);

/* ---------------------------------------------------------------- TOKENS.md */
const LAYER = {
	'01-color.css': 'Colour',
	'02-typography.css': 'Typography',
	'03-space.css': 'Space, shape and layout',
	'04-elevation.css': 'Elevation',
	'05-motion.css': 'Motion',
	'06-layout.css': 'Layout',
	'07-pattern.css': 'Pattern',
	'08-a11y.css': 'Accessibility',
	'09-logo.css': 'Logo',
	'10-icon.css': 'Icon',
	'11-shape.css': 'Shape',
	'12-frame.css': 'Frame',
	'13-cutout.css': 'Cutout',
};

const groups = new Map();
for (const t of light.values()) {
	const layer = LAYER[t.file] ?? t.file;
	if (!groups.has(layer)) groups.set(layer, []);
	groups.get(layer).push(t);
}

const md = `<!-- generated by scripts/build-outputs.mjs — do not edit -->
# Token reference

${light.size} custom properties, ${dark.size} of them overridden in dark, read from
\`styles/*.css\`. That CSS is the source of truth: the whole component kit is written
against these names.

For *which* token to reach for, read this package's README.

${[...groups]
	.map(
		([layer, rows]) => `## ${layer}

| Token | Value | Dark |
| --- | --- | --- |
${rows
	.map((t) => {
		const d = dark.get(t.name)?.value;
		return `| \`--${t.name}\` | \`${t.value}\` | ${d ? `\`${d}\`` : '—'} |`;
	})
	.join('\n')}`,
	)
	.join('\n\n')}
`;

writeFileSync(join(root, 'TOKENS.md'), md);

console.log(
	`tokens: ${light.size} properties (${dark.size} dark) from ${files.length} stylesheets → tokens.json, tailwind.js, TOKENS.md`,
);
