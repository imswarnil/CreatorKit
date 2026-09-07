#!/usr/bin/env node
/**
 * props-gen — component prop tables, read from the TypeScript source.
 *
 * The docs must never hand-maintain a props table: a table that is written by a
 * person is a table that goes stale the first time someone renames a prop, and
 * a stale API reference is worse than none.
 *
 * Only members *declared on the interface itself* are emitted. A component's
 * props type usually extends `HTMLAttributes<T>`, and expanding that would bury
 * the six props that matter under two hundred that do not.
 *
 *     node tools/props-gen/index.mjs <srcDir> <out.json>
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ts = require('typescript');

const [srcArg, outArg] = process.argv.slice(2);
if (!srcArg || !outArg) {
	console.error('usage: props-gen <srcDir> <out.json>');
	process.exit(1);
}

/** Every .tsx in the tree, minus tests. */
function walk(dir, found = []) {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) walk(full, found);
		else if (entry.endsWith('.tsx') && !entry.includes('.test.')) found.push(full);
	}
	return found;
}

const files = walk(resolve(srcArg));
const program = ts.createProgram(files, {
	jsx: ts.JsxEmit.ReactJSX,
	target: ts.ScriptTarget.ES2022,
	moduleResolution: ts.ModuleResolutionKind.Bundler,
	skipLibCheck: true,
	noEmit: true,
});

const out = {};

/** The JSDoc text above a member, which is where the guidance lives. */
function docOf(node) {
	// `jsDoc` is internal but it is the only place the leading comment survives
	// on a PropertySignature; the public helpers return tags, not the body.
	const blocks = node.jsDoc ?? [];
	const parts = blocks.map((block) => {
		const comment = block.comment;
		if (typeof comment === 'string') return comment;
		if (Array.isArray(comment)) return comment.map((c) => c.text ?? '').join('');
		return '';
	});
	return parts.join(' ').replace(/\s+/g, ' ').trim();
}

for (const file of files) {
	const source = program.getSourceFile(file);
	if (!source) continue;

	ts.forEachChild(source, (node) => {
		const isProps =
			(ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) &&
			/Props$/.test(node.name.text);
		if (!isProps) return;

		const members = ts.isInterfaceDeclaration(node)
			? node.members
			: ts.isTypeLiteralNode(node.type)
				? node.type.members
				: [];

		const props = [];
		for (const member of members) {
			if (!ts.isPropertySignature(member) || !member.name) continue;
			props.push({
				name: member.name.getText(source),
				type: member.type ? member.type.getText(source).replace(/\s+/g, ' ') : 'unknown',
				required: !member.questionToken,
				description: docOf(member),
			});
		}

		if (props.length) out[node.name.text] = props;
	});
}

writeFileSync(resolve(outArg), JSON.stringify(out, null, '\t') + '\n');
console.log(
	`props-gen: ${Object.keys(out).length} prop types from ${files.length} files → ${outArg}`,
);
