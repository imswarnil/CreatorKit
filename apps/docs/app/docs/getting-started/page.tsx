import type { Metadata } from 'next';
import { Heading, Text } from '@creatorkit/ui';

export const metadata: Metadata = { title: 'Getting started' };

const Code = ({ children }: { children: string }) => (
	<pre className="overflow-x-auto rounded-card border-1 border-line-default bg-surface-sunken p-4 text-xs leading-relaxed">
		<code className="font-mono text-text-default">{children}</code>
	</pre>
);

export default function GettingStarted() {
	return (
		<article className="flex max-w-prose flex-col gap-8">
			<header className="flex flex-col gap-2">
				<Text variant="eyebrow">Start</Text>
				<Heading level={1} size="xl">
					Getting started
				</Heading>
				<Text variant="lead">
					CreatorKit ships React components and, from the same source, plain CSS classes. Take
					whichever half your project can run — or both.
				</Text>
			</header>

			<section className="flex flex-col gap-3">
				<Heading level={2} size="sm">
					With React
				</Heading>
				<Code>{`pnpm add @creatorkit/ui @creatorkit/core @creatorkit/tokens`}</Code>
				<Code>{`// tailwind.config.js
import preset from '@creatorkit/tokens/tailwind';

export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}'],
};`}</Code>
				<Code>{`import { Button, Badge } from '@creatorkit/ui';
import '@creatorkit/core/css';

export function Hero() {
  return (
    <>
      <Badge tone="live">On air</Badge>
      <Button size="lg" as="a" href="/videos">Watch the latest</Button>
    </>
  );
}`}</Code>
				<Text variant="small">
					<code className="font-mono">@creatorkit/core/css</code> pulls in the tokens, the reset
					and the base layer in the right order. It is the only stylesheet import you need.
				</Text>
			</section>

			<section className="flex flex-col gap-3">
				<Heading level={2} size="sm">
					Without React
				</Heading>
				<Text>
					Ghost themes, static HTML, anything server-rendered. The stylesheet is real CSS — the
					utilities are already expanded, so you install no Tailwind.
				</Text>
				<Code>{`<link rel="stylesheet" href="@creatorkit/ui/css">

<button class="ck-btn ck-btn--primary ck-btn--lg">Watch the latest</button>
<span class="ck-badge ck-badge--live">On air</span>`}</Code>
			</section>

			<section className="flex flex-col gap-3">
				<Heading level={2} size="sm">
					Theming
				</Heading>
				<Text>
					Three states. Set nothing and the page follows the reader’s system preference; set{' '}
					<code className="font-mono">data-theme</code> to override it either way.
				</Text>
				<Code>{`<html data-theme="dark">   <!-- explicit dark  -->
<html data-theme="light">  <!-- explicit light -->
<html>                     <!-- follow the system -->`}</Code>
			</section>

			<section className="flex flex-col gap-3">
				<Heading level={2} size="sm">
					The one rule
				</Heading>
				<Text>
					Components name roles, never palette steps.{' '}
					<code className="font-mono">--ck-color-text-muted</code> is a decision — “this text is
					secondary” — and it is what changes between light and dark. A component built on{' '}
					<code className="font-mono">--ck-palette-ink-600</code> gets a bug instead of a theme.
				</Text>
			</section>
		</article>
	);
}
