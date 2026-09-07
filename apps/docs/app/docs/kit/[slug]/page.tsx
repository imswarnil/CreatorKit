import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Heading, Text } from '@creatorkit/ui';
import { findKitPage, kitPages } from '../../../../lib/kit';
import { KitDemo } from '../../../../components/KitDemo';

export function generateStaticParams() {
	return kitPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const page = findKitPage(params.slug);
	return page ? { title: page.title, description: page.lead } : {};
}

export default function KitPage({ params }: { params: { slug: string } }) {
	const page = findKitPage(params.slug);
	if (!page) notFound();

	return (
		<article className="flex max-w-prose flex-col gap-6">
			<header className="flex flex-col gap-2">
				<Text variant="eyebrow">{page.category}</Text>
				<Heading level={1} size="xl">
					{page.title}
				</Heading>
				{page.lead && <Text variant="lead">{page.lead}</Text>}
			</header>

			{page.demos.map((demo, i) => (
				<KitDemo key={i} markup={demo.markup} spec={demo.spec} />
			))}
		</article>
	);
}
