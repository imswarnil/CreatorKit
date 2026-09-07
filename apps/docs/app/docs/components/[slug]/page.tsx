import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Heading, Text } from '@creatorkit/ui';
import { components, findComponent } from '../../../../lib/registry';
import { Demo } from '../../../../components/Chrome';
import { ClassList, PropsTable, VariantTable } from '../../../../components/Tables';

export function generateStaticParams() {
	return components.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const doc = findComponent(params.slug);
	return doc ? { title: doc.name, description: doc.summary } : {};
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
	<section className="flex flex-col gap-3">
		<Heading level={2} size="sm">
			{title}
		</Heading>
		{children}
	</section>
);

export default function ComponentPage({ params }: { params: { slug: string } }) {
	const doc = findComponent(params.slug);
	if (!doc) notFound();

	const gallery = doc.gallery;
	const values = gallery
		? Object.entries(doc.recipe.recipe.variants[gallery.group] ?? {})
				.filter(([value, utilities]) => utilities.trim() && value !== 'false')
				.map(([value]) => value)
		: [];

	return (
		<article className="flex max-w-prose flex-col gap-10">
			<header className="flex flex-col gap-2">
				<Text variant="eyebrow">{doc.category}</Text>
				<Heading level={1} size="xl">
					{doc.name}
				</Heading>
				<Text variant="lead">{doc.summary}</Text>
			</header>

			<Demo code={doc.usage}>{doc.preview}</Demo>

			{gallery && values.length > 0 && (
				<Section title={`Variants · ${gallery.group}`}>
					<Text variant="small">
						Rendered from the recipe, so this gallery cannot show a variant the component does
						not have.
					</Text>
					<ul className="flex flex-wrap items-end gap-4 rounded-card border-1 border-line-default bg-surface-raised p-6">
						{values.map((value) => (
							<li key={value} className="flex flex-col items-start gap-2">
								{gallery.render(value)}
								<Text variant="caption" as="span">
									<code className="font-mono">{value}</code>
								</Text>
							</li>
						))}
					</ul>
				</Section>
			)}

			<Section title="Props">
				<VariantTable recipe={doc.recipe} />
				{doc.propTypes && <PropsTable types={doc.propTypes} />}
				<Text variant="caption">
					Variant props come from the recipe; the rest are read from the component’s TypeScript
					source. Inherited DOM attributes are not listed.
				</Text>
			</Section>

			<Section title="Without React">
				<Text variant="small">
					The same recipe compiles to these classes. Import{' '}
					<code className="font-mono">@creatorkit/ui/css</code> and use them anywhere —
					Handlebars, plain HTML, anything server-rendered.
				</Text>
				<ClassList recipe={doc.recipe} />
			</Section>

			<Section title="Accessibility">
				<ul className="flex flex-col gap-2">
					{doc.accessibility.map((note) => (
						<li key={note}>
							<Text variant="small">{note}</Text>
						</li>
					))}
				</ul>
			</Section>

			<Section title="Do and don’t">
				<div className="grid gap-4 sm:grid-cols-2">
					<div className="flex flex-col gap-2 rounded-card border-1 border-success-border bg-success-surface p-4">
						<Text variant="eyebrow" tone="inherit">
							Do
						</Text>
						{doc.dos.map((item) => (
							<Text key={item} variant="small" tone="inherit">
								{item}
							</Text>
						))}
					</div>
					<div className="flex flex-col gap-2 rounded-card border-1 border-danger-border bg-danger-surface p-4">
						<Text variant="eyebrow" tone="inherit">
							Don’t
						</Text>
						{doc.donts.map((item) => (
							<Text key={item} variant="small" tone="inherit">
								{item}
							</Text>
						))}
					</div>
				</div>
			</Section>
		</article>
	);
}
