#!/usr/bin/env node
/**
 * kit-docs — reuse, rather than rewrite, the documentation the CSS kit already had.
 *
 * The previous system shipped 134 built HTML pages, each with hand-authored
 * demo markup in a fixed shape:
 *
 *     <div class="surface demo-tile">
 *       <div class="demo">   …markup…   </div>
 *       <p class="spec">     …caption…  </p>
 *     </div>
 *
 * That markup is the most valuable thing in the old docs: someone wrote every
 * example, for every variant, for forty components. Regenerating it by hand
 * would take weeks and would be worse. So this lifts it out, and the new site
 * renders the same strings live against the migrated stylesheets — one string
 * per example, shown and copied, exactly as before.
 *
 *     node tools/kit-docs/index.mjs <docsDir> <out.json>
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

const [dirArg, outArg] = process.argv.slice(2);
if (!dirArg || !outArg) {
	console.error('usage: kit-docs <docsDir> <out.json>');
	process.exit(1);
}

const dir = resolve(dirArg);

/** Walk forward from an opening tag to its matching close, counting depth. */
function sliceElement(html, openIndex, tag = 'div') {
	const openRe = new RegExp(`<${tag}\\b`, 'gi');
	const closeRe = new RegExp(`</${tag}\\s*>`, 'gi');
	let depth = 0;
	let cursor = openIndex;

	while (cursor < html.length) {
		openRe.lastIndex = cursor;
		closeRe.lastIndex = cursor;
		const open = openRe.exec(html);
		const close = closeRe.exec(html);
		if (!close) return null;

		if (open && open.index < close.index) {
			depth += 1;
			cursor = open.index + 1;
		} else {
			depth -= 1;
			if (depth === 0) {
				const bodyStart = html.indexOf('>', openIndex) + 1;
				return { inner: html.slice(bodyStart, close.index), end: closeRe.lastIndex };
			}
			cursor = close.index + 1;
		}
	}
	return null;
}

const text = (s) =>
	s
		.replace(/<[^>]+>/g, '')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&nbsp;/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

const first = (html, re) => {
	const m = html.match(re);
	return m?.[1] ? text(m[1]) : '';
};

/** Pages that are site chrome rather than documentation of the kit. */
const SKIP = new Set(['all', 'components', 'index', 'sponsor', '404']);

const pages = [];

for (const file of readdirSync(dir).sort()) {
	if (!file.endsWith('.html')) continue;
	const slug = basename(file, '.html');
	if (SKIP.has(slug)) continue;

	const html = readFileSync(join(dir, file), 'utf8');
	const demos = [];
	let cursor = 0;

	// A demo wrapper is `class="demo"` or `class="demo <modifiers>"` — e.g.
	// `demo stack-sm` on a page whose examples are laid out in a column. The
	// lookahead requires a quote or whitespace right after "demo", which is
	// what tells it apart from an unrelated class like `demo-tile` or
	// `demo-label` that merely starts with the same four letters.
	//
	// The first version of this matched the literal string `<div class="demo"`
	// and nothing else, so any page whose demo divs carried a modifier class
	// produced zero demos and was silently dropped — 16 pages' worth across
	// Foundation (frames, icons, patterns, shapes) and Motion, gone from the
	// generated docs with no error to say so.
	const DEMO_OPEN = /<div class="demo(?=["\s])/g;

	while (true) {
		DEMO_OPEN.lastIndex = cursor;
		const match = DEMO_OPEN.exec(html);
		if (!match) break;
		const open = match.index;
		const el = sliceElement(html, open);
		if (!el) break;

		// The caption immediately after the demo, if there is one.
		const after = html.slice(el.end, el.end + 400);
		const spec = first(after, /<p class="spec">([\s\S]*?)<\/p>/);

		const markup = el.inner.trim();
		if (markup) demos.push({ markup, spec });
		cursor = el.end;
	}

	if (!demos.length) continue;

	pages.push({
		slug,
		title: first(html, /<h1[^>]*>([\s\S]*?)<\/h1>/) || slug,
		lead: first(html, /<p class="t-lead"[^>]*>([\s\S]*?)<\/p>/),
		// "Components · Creator Design System" → "Components"
		category: (first(html, /<span class="t-slate"[^>]*>([\s\S]*?)<\/span>/).split('·')[0] ?? '')
			.trim() || 'Kit',
		demos,
	});
}

writeFileSync(resolve(outArg), JSON.stringify(pages, null, '\t') + '\n');
const total = pages.reduce((n, p) => n + p.demos.length, 0);
console.log(`kit-docs: ${pages.length} pages, ${total} demos → ${outArg}`);
