import type { Metadata } from 'next';
import { Heading, Text } from '@creatorkit/ui';
import { flatten, light, palette, scale } from '@creatorkit/tokens';
import { CopyButton } from '../../../components/Chrome';

export const metadata: Metadata = {
	title: 'Tokens',
	description: 'Every design decision in CreatorKit, and when to use it.',
};

const groups = [
	{ title: 'Palette', note: 'Raw ramps. Components name a role below, never one of these.', pairs: flatten({ palette }) },
	{ title: 'Colour roles', note: 'What a component is allowed to name. These are what change between light and dark.', pairs: flatten({ color: light.color }) },
	{ title: 'Elevation', note: 'Five steps. In dark they gain an inset highlight rather than a deeper shadow.', pairs: flatten({ shadow: light.shadow }) },
	{ title: 'Type', note: 'Sizes below lg are fixed; lg and up are fluid, because UI labels must not resize with the viewport.', pairs: [...flatten({ font: scale.font }), ...flatten({ text: scale.text }), ...flatten({ leading: scale.leading }), ...flatten({ tracking: scale.tracking })] },
	{ title: 'Space', note: 'A 4px unit, plus fluid section rhythm and the page gutter.', pairs: [...flatten({ space: scale.space }), ...flatten({ section: scale.section })] },
	{ title: 'Shape', note: 'Named roles point at the raw steps, so the kit’s roundness is one edit.', pairs: [...flatten({ radius: scale.radius }), ...flatten({ border: scale.border })] },
	{ title: 'Motion', note: 'Four durations, five curves. All collapse to 1ms under prefers-reduced-motion.', pairs: [...flatten({ duration: scale.duration }), ...flatten({ ease: scale.ease })] },
];

/** A colour token gets a live swatch; everything else shows its value. */
const isColour = (name: string) => name.includes('color') || name.includes('palette');

export default function TokensPage() {
	return (
		<article className="flex flex-col gap-10">
			<header className="flex max-w-prose flex-col gap-2">
				<Text variant="eyebrow">Foundations</Text>
				<Heading level={1} size="xl">
					Tokens
				</Heading>
				<Text variant="lead">
					Authored once in TypeScript and emitted four ways — CSS custom properties, a Tailwind
					preset, SCSS variables and typed JS — so React, Handlebars and Sass cannot disagree
					about what “raised surface” means.
				</Text>
				<Text variant="small">
					Swatches below are live: switch the theme in the header and the dark values render.
				</Text>
			</header>

			{groups.map((group) => (
				<section key={group.title} className="flex flex-col gap-3">
					<Heading level={2} size="sm">
						{group.title}
					</Heading>
					<Text variant="small" measure="prose">
						{group.note}
					</Text>
					<ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
						{group.pairs.map(([name, value]) => (
							<li
								key={name}
								className="flex items-center gap-3 border-b-1 border-line-subtle py-1.5"
							>
								{isColour(name) && (
									<span
										aria-hidden="true"
										className="size-5 shrink-0 rounded-sm border-1 border-line-default"
										style={{ background: `var(${name})` }}
									/>
								)}
								<code className="min-w-0 flex-1 truncate font-mono text-xs text-text-default">
									{name}
								</code>
								<code className="hidden shrink-0 font-mono text-xs text-text-subtle sm:block">
									{value.length > 22 ? `${value.slice(0, 22)}…` : value}
								</code>
								<CopyButton value={`var(${name})`} label="⧉" />
							</li>
						))}
					</ul>
				</section>
			))}
		</article>
	);
}
