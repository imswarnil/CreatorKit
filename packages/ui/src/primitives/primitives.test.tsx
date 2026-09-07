import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { Avatar, Badge, Button, Heading, Icon, Input, Link, Text } from './index.js';

/**
 * Rendered to static markup rather than into a DOM: these assertions are about
 * the element and the attributes a component chooses, which is where the
 * accessibility decisions live. Interaction tests arrive with the first
 * component that has behaviour to interact with.
 */
const html = renderToStaticMarkup;

test('Button defaults to type=button so it cannot submit a form by accident', () => {
	const out = html(<Button>Record</Button>);
	assert.match(out, /^<button /);
	assert.match(out, /type="button"/);
});

test('Button as="a" renders an anchor and drops the type attribute', () => {
	const out = html(
		<Button as="a" href="/videos">
			Watch
		</Button>,
	);
	assert.match(out, /<a [^>]*href="\/videos"/);
	assert.doesNotMatch(out, /type="button"/);
});

test('className from the caller overrides the recipe', () => {
	const out = html(<Button className="rounded-pill">Go</Button>);
	assert.match(out, /rounded-pill/);
	assert.doesNotMatch(out, /rounded-control/);
});

test('Badge tone=live is announced, not signalled by colour alone', () => {
	assert.match(html(<Badge tone="live">On air</Badge>), /aria-label="live"/);
});

test('Avatar falls back to initials and never announces the name twice', () => {
	const out = html(<Avatar name="Swarnil Singhai" />);
	assert.match(out, /aria-label="Swarnil Singhai"/);
	assert.match(out, />SS</);

	const withImage = html(<Avatar name="Swarnil Singhai" src="/a.jpg" />);
	assert.match(withImage, /alt=""/);
	assert.match(withImage, /aria-hidden="true"/);
});

test('Heading keeps level and size independent', () => {
	const out = html(
		<Heading level={3} size="xl">
			Chapters
		</Heading>,
	);
	assert.match(out, /^<h3/);
	assert.match(out, /text-4xl/);
});

test('Input marks itself invalid via aria, which is what the recipe styles on', () => {
	assert.match(html(<Input invalid aria-label="Email" />), /aria-invalid="true"/);
	assert.doesNotMatch(html(<Input aria-label="Email" />), /aria-invalid/);
});

test('Icon is hidden from assistive tech unless it is given a label', () => {
	assert.match(html(<Icon />), /aria-hidden="true"/);
	const labelled = html(<Icon label="Download" />);
	assert.match(labelled, /role="img"/);
	assert.match(labelled, /aria-label="Download"/);
});

test('Text and Link render the element they are told to', () => {
	assert.match(html(<Text as="span">note</Text>), /^<span/);
	assert.match(html(<Link href="/about">About</Link>), /^<a [^>]*href="\/about"/);
});
