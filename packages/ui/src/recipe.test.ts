import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import * as ui from './index.js';
import { isRecipe } from './recipe.js';
import type { RecipeFn, VariantMap } from './recipe.js';

/** Object.entries, but keeping the variant map's value type. */
const entries = (v: VariantMap) => Object.entries(v) as Array<[string, Record<string, string>]>;

/**
 * The parity test.
 *
 * ARCHITECTURE.md promises that a component's appearance is declared once and
 * reaches both renderers. Nothing enforces that promise except this file: if a
 * recipe gains a variant and the compiled stylesheet does not, the Ghost theme
 * silently loses it while React keeps working — the exact drift the whole design
 * exists to prevent.
 */
const css = readFileSync(new URL('../dist/ck-classes.css', import.meta.url), 'utf8');
const recipes = Object.values(ui).filter(isRecipe) as Array<RecipeFn<VariantMap>>;

test('recipes are discoverable by the CSS compiler', () => {
	assert.ok(recipes.length > 0, 'no recipes exported from the package barrel');
});

test('every recipe variant has a compiled CSS class', () => {
	const missing: string[] = [];

	for (const fn of recipes) {
		const { name, base, variants } = fn.recipe;
		if (base.trim() && !css.includes(`.ck-${name} `) && !css.includes(`.ck-${name}{`)) {
			missing.push(`.ck-${name}`);
		}
		for (const [group, values] of entries(variants)) {
			for (const [value, utilities] of Object.entries(values)) {
				if (!utilities.trim() || value === 'false') continue;
				const modifier = value === 'true' ? group : value;
				if (!css.includes(`.ck-${name}--${modifier}`)) {
					missing.push(`.ck-${name}--${modifier}`);
				}
			}
		}
	}

	assert.deepEqual(missing, [], `classes missing from ck-classes.css: ${missing.join(', ')}`);
});

test('modifier names are unique within a recipe', () => {
	for (const fn of recipes) {
		const { name, variants } = fn.recipe;
		const owner = new Map<string, string>();
		for (const [group, values] of entries(variants)) {
			for (const [value, utilities] of Object.entries(values)) {
				if (!utilities.trim() || value === 'false') continue;
				const modifier = value === 'true' ? group : value;
				const existing = owner.get(modifier);
				assert.ok(
					existing === undefined || existing === group,
					`${name}: "${modifier}" is claimed by both "${existing}" and "${group}"`,
				);
				owner.set(modifier, group);
			}
		}
	}
});

test('recipes apply their default variants', () => {
	assert.match(ui.button(), /ck-|bg-accent-default/);
	assert.match(ui.button({ variant: 'ghost' }), /bg-transparent/);
	assert.doesNotMatch(ui.button({ variant: 'ghost' }), /bg-accent-default/);
});
