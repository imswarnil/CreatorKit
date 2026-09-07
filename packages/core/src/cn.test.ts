import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cn } from './cn.js';

/**
 * The point of cn() is that a caller's className wins. These cases are the ones
 * that break when the token preset gains a scale that tailwind-merge has not
 * been taught about — see the rule in this package's CLAUDE.md.
 */
test('later token-scale utilities override earlier ones', () => {
	assert.equal(cn('rounded-card', 'rounded-pill'), 'rounded-pill');
	assert.equal(cn('shadow-1', 'shadow-4'), 'shadow-4');
	assert.equal(cn('text-2xs', 'text-md'), 'text-md');
});

test('non-conflicting classes are kept', () => {
	assert.equal(cn('flex', 'items-center'), 'flex items-center');
});

test('falsy values are dropped', () => {
	assert.equal(cn('p-4', false, undefined, null), 'p-4');
});
