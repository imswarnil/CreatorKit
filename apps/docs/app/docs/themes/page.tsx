import type { Metadata } from 'next';
import { Heading, Text } from '@creatorkit/ui';

export const metadata: Metadata = { title: 'Ghost theme' };

export default function ThemesPage() {
	return (
		<article className="flex max-w-prose flex-col gap-8">
			<header className="flex flex-col gap-2">
				<Text variant="eyebrow">Build</Text>
				<Heading level={1} size="xl">
					The Ghost theme
				</Heading>
				<Text variant="lead">
					A creator’s Ghost theme built on this kit — videos, courses, web series, projects,
					travel, products, timeline, changelog.
				</Text>
			</header>

			<section className="flex flex-col gap-3">
				<Heading level={2} size="sm">
					How it stays in step
				</Heading>
				<Text>
					Ghost renders Handlebars on the server and cannot run React, so the theme consumes the
					compiled stylesheet rather than the components. Both come from the same recipes, and a
					test in <code className="font-mono">@creatorkit/ui</code> fails the build if a recipe
					gains a variant the stylesheet did not. The theme cannot drift from the kit; it can
					only be out of date, and one build fixes that.
				</Text>
			</section>

			<section className="flex flex-col gap-3">
				<Heading level={2} size="sm">
					Working on it
				</Heading>
				<pre className="overflow-x-auto rounded-card border-1 border-line-default bg-surface-sunken p-4 text-xs">
					<code className="font-mono">{`nvm use            # 22.21.1, Ghost needs it
pnpm ghost:start   # http://localhost:2370
pnpm theme:dev     # CSS watch + browser-sync
pnpm theme:test    # gscan`}</code>
				</pre>
				<Text variant="small">
					The theme lives at{' '}
					<code className="font-mono">ghost/content/themes/creator</code> inside a real Ghost
					install, so it is previewed against real Ghost rendering rather than a mock. That
					install is gitignored; the theme keeps its own git history.
				</Text>
			</section>
		</article>
	);
}
