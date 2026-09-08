#!/usr/bin/env node
/**
 * kit-archive — serve the previous system's own documentation, verbatim.
 *
 * `kit-docs` lifts demo markup out of the old pages and re-renders it against
 * the migrated stylesheets. That is the useful view for checking the migration,
 * but it can only ever see examples wrapped in `<div class="demo">` — and the
 * old pages did not use that wrapper consistently. f-frames.html, for one,
 * renders four window chromes, a viewfinder, a shutter and a polaroid straight
 * into the page and wraps exactly one of them. Everything outside a wrapper is
 * invisible to extraction, and no amount of fixing the extractor changes that:
 * the markup was never tagged as an example in the first place.
 *
 * So this copies the original built site next to the new one and rewrites its
 * links, which loses nothing by construction. Every page renders exactly as it
 * did at design.imswarnil.com, against its own CSS, because it IS the original.
 *
 * The pages use root-absolute paths — /src/..., /pages/..., /components.html —
 * so each one is rewritten to sit under /archive/. Only the copies are touched;
 * _legacy/ is never written to.
 *
 *     node tools/kit-archive/index.mjs <legacyDir> <outDir>
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const [legacyArg, outArg] = process.argv.slice(2);
if (!legacyArg || !outArg) {
	console.error('usage: kit-archive <legacyDir> <outDir>');
	process.exit(1);
}

const legacy = resolve(legacyArg);
const out = resolve(outArg);

if (!existsSync(join(legacy, 'docs'))) {
	console.log('kit-archive: _legacy/docs is gone — skipping the archive');
	process.exit(0);
}

/** The old build tooling is not part of the site it built. */
const SKIP_DIRS = new Set(['_build']);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// The docs tree, minus the generator.
for (const entry of readdirSync(join(legacy, 'docs'))) {
	if (SKIP_DIRS.has(entry)) continue;
	cpSync(join(legacy, 'docs', entry), join(out, entry), { recursive: true });
}

// The assets the pages load by root-absolute path.
for (const dir of ['src', 'media', 'video', 'icons', 'collection', 'dist']) {
	const from = join(legacy, dir);
	if (existsSync(from)) cpSync(from, join(out, dir), { recursive: true });
}

/**
 * Rewrite root-absolute href/src to sit under /archive/.
 *
 * Anything already absolute to another origin (https://, //cdn) or a fragment
 * or mailto: is left alone — only paths that start with a single slash move.
 */
function rewrite(html) {
	return html.replace(/\b(href|src)="\/(?!\/)([^"]*)"/g, (_m, attr, path) => `${attr}="/archive/${path}"`);
}

let pages = 0;
function walk(dir) {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) {
			walk(full);
		} else if (entry.endsWith('.html')) {
			writeFileSync(full, rewrite(readFileSync(full, 'utf8')));
			pages += 1;
		}
	}
}
walk(out);

console.log(`kit-archive: ${pages} pages → ${outArg}`);
