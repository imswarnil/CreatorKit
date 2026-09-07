import Link from 'next/link';
import { Badge, Button, Heading, Text } from '@creatorkit/ui';
import { components } from '../lib/registry';

export default function Home() {
	return (
		<div className="flex flex-col gap-16">
			<section className="flex flex-col items-start gap-5 pt-6">
				<Badge tone="craft">v0.1.0 · in development</Badge>
				<Heading level={1} size="3xl" measure="lead">
					A UI kit for people who publish.
				</Heading>
				<Text variant="lead">
					Most component libraries are built for dashboards. CreatorKit is built for the things a
					creator actually ships: a video index, a course curriculum, an episode player, a travel
					log, a thumbnail, a stream overlay. It knows what an episode is.
				</Text>
				<div className="flex flex-wrap gap-3">
					<Button as={Link} href="/docs/getting-started" size="lg">
						Get started
					</Button>
					<Button as={Link} href="/docs/tokens" variant="secondary" size="lg">
						Browse tokens
					</Button>
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<Heading level={2} size="lg">
					One recipe, two renderers
				</Heading>
				<Text measure="prose">
					A component’s appearance is declared once, as a recipe of utilities. React reads it, and
					the Ghost theme’s CSS is compiled from the same file. Change a button and it changes
					everywhere on the next build — the docs, the templates, and the theme. Nothing is
					authored twice, and a test fails the build if the two ever disagree.
				</Text>
				<pre className="overflow-x-auto rounded-card border-1 border-line-default bg-surface-sunken p-4 text-xs">
					<code className="font-mono">{`// React
<Button variant="primary">Watch the latest</Button>

<!-- Handlebars, same recipe -->
<button class="ck-btn ck-btn--primary">Watch the latest</button>`}</code>
				</pre>
			</section>

			<section className="flex flex-col gap-4">
				<Heading level={2} size="lg">
					Components
				</Heading>
				<ul className="grid gap-3 sm:grid-cols-2">
					{components.map((doc) => (
						<li key={doc.slug}>
							<Link
								href={`/docs/components/${doc.slug}`}
								className="block rounded-card border-1 border-line-default bg-surface-raised p-4 no-underline transition-colors duration-1 hover:border-line-strong"
							>
								<Text weight="medium" tone="default">
									{doc.name}
								</Text>
								<Text variant="caption">{doc.summary}</Text>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
