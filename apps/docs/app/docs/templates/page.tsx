import type { Metadata } from 'next';
import { Badge, Heading, Text } from '@creatorkit/ui';

export const metadata: Metadata = { title: 'Templates' };

const planned = [
	['YouTuber portfolio', 'Channel front page: hero, video grid, about, contact.'],
	['Newsletter landing', 'Single page: signup, social proof, archive.'],
	['Link in bio', 'Minimal, mobile first.'],
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
				{planned.map(([name, note]) => (
					<li
						key={name}
						className="flex items-start justify-between gap-4 rounded-card border-1 border-line-default bg-surface-raised p-4"
					>
						<span className="flex flex-col gap-1">
							<Text weight="medium">{name}</Text>
							<Text variant="caption">{note}</Text>
						</span>
						<Badge tone="craft">Planned</Badge>
					</li>
				))}
			</ul>
		</article>
	);
}
