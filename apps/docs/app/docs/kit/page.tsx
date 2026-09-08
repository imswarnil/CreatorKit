import type { Metadata } from 'next';
import Link from 'next/link';
import { Heading, Text } from '@creatorkit/ui';
import { kitByCategory, kitPages } from '../../../lib/kit';

export const metadata: Metadata = {
	title: 'The kit',
	description: 'Every component in the CreatorKit CSS system.',
};

const demoCount = kitPages.reduce((n, p) => n + p.demos.length, 0);

export default function KitIndex() {
	return (
		<article className="flex flex-col gap-10">
			<header className="flex max-w-prose flex-col gap-2">
				<Text variant="eyebrow">Reference</Text>
				<Heading level={1} size="xl">
					The kit
				</Heading>
				<Text variant="lead">
					{kitPages.length} pages, {demoCount} live examples — the complete CSS system:
					foundation, elements, components, forms, the creator collections, page sections,
					broadcast surfaces and the utility layer.
				</Text>
				<Text variant="small">
					Every example on these pages renders against the real stylesheets. Copy the markup and
					it works anywhere the kit is loaded — a Ghost theme, a static page, anything.
				</Text>
				<Text variant="small">
					These are the examples the old docs wrapped as demos. Anything it rendered straight
					into a page — the window chromes, the viewfinder, whole page layouts — was never
					tagged as an example and cannot be lifted out, so the original site is kept intact
					at{' '}
					<a className="underline underline-offset-4" href="/archive/introduction.html">
						the archive
					</a>
					: 134 pages, exactly as they were, against their own stylesheets.
				</Text>
			</header>

			{kitByCategory.map(({ category, pages }) => (
				<section key={category} className="flex flex-col gap-3">
					<Heading level={2} size="sm">
						{category}
					</Heading>
					<ul className="grid gap-2 sm:grid-cols-2">
						{pages.map((page) => (
							<li key={page.slug}>
								<Link
									href={`/docs/kit/${page.slug}`}
									className="block rounded-card border-1 border-line-default bg-surface-raised p-3 no-underline transition-colors duration-1 hover:border-line-strong"
								>
									<Text weight="medium">{page.title}</Text>
									<Text variant="caption">
										{page.demos.length} example{page.demos.length === 1 ? '' : 's'}
									</Text>
								</Link>
							</li>
						))}
					</ul>
				</section>
			))}
		</article>
	);
}
