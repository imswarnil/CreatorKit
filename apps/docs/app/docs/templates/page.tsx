import type { Metadata } from 'next';
import { Badge, Heading, Text } from '@creatorkit/ui';

export const metadata: Metadata = { title: 'Templates' };

const templates = [
	{
		name: 'YouTuber portfolio',
		note: 'Hero, featured video, video grid, writing, about and a newsletter signup. Static HTML — one config file, one build, a folder you can host anywhere.',
		status: 'Ready',
		tone: 'success' as const,
	},
	{
		name: 'Newsletter landing',
		note: 'Single page: signup, social proof, archive.',
		status: 'Planned',
		tone: 'craft' as const,
	},
	{
		name: 'Link in bio',
		note: 'Minimal, mobile first.',
		status: 'Planned',
		tone: 'craft' as const,
	},
];

export default function TemplatesPage() {
	return (
		<article className="flex max-w-prose flex-col gap-8">
			<header className="flex flex-col gap-2">
				<Text variant="eyebrow">Build</Text>
				<Heading level={1} size="xl">
					Templates
				</Heading>
				<Text variant="lead">
					Ready-to-clone starters, each built only from the kit — no one-off CSS, and one content
					file a non-developer can edit.
				</Text>
			</header>

			<ul className="flex flex-col gap-3">
				{templates.map((template) => (
					<li
						key={template.name}
						className="flex items-start justify-between gap-4 rounded-card border-1 border-line-default bg-surface-raised p-4"
					>
						<span className="flex flex-col gap-1">
							<Text weight="medium">{template.name}</Text>
							<Text variant="caption">{template.note}</Text>
						</span>
						<Badge tone={template.tone}>{template.status}</Badge>
					</li>
				))}
			</ul>

			<section className="flex flex-col gap-3">
				<Heading level={2} size="sm">
					Using one
				</Heading>
				<pre className="overflow-x-auto rounded-card border-1 border-line-default bg-surface-sunken p-4 text-xs">
					<code className="font-mono">{`cp -R templates/youtuber-portfolio my-site
cd my-site
$EDITOR content.config.js   # the only file you need to touch
npm run build               # → dist/, ready to host`}</code>
				</pre>
				<Text variant="small">
					Templates carry no CSS of their own. If one needs a style the kit does not have, that
					is a gap in the kit rather than a stylesheet worth starting in a template.
				</Text>
			</section>
		</article>
	);
}
