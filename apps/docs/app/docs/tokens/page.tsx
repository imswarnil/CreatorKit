import type { Metadata } from 'next';
import { Heading, Text } from '@creatorkit/ui';
import tokens from '@creatorkit/tokens/dist/tokens.json';
import { CopyButton } from '../../../components/Chrome';

export const metadata: Metadata = {
	title: 'Tokens',
	description: 'Every design decision in CreatorKit, and when to use it.',
};

interface TokenRow {
	name: string;
	value: string;
	dark: string | null;
	file: string;
}

const rows = tokens as TokenRow[];

/** The stylesheet each token is declared in, as a readable heading. */
const LAYERS: Array<[string, string, string]> = [
	['01-color.css', 'Colour', 'Roles first — a component names `--bg-raised`, never `--ink-0`. Roles are what change between light and dark.'],
	['02-typography.css', 'Typography', 'Sizes below `--text-lg` are fixed; `lg` and up are fluid, because UI labels must not resize with the viewport.'],
	['03-space.css', 'Space, shape and layout', 'A 4px unit, the fluid section rhythm, radii, widths, control heights, the z-index ladder and the aspect ratios.'],
	['04-elevation.css', 'Elevation', 'Five steps. In dark they gain an inset highlight instead of a deeper shadow.'],
	['05-motion.css', 'Motion', 'Four durations, five curves. All collapse to 1ms under `prefers-reduced-motion`.'],
	['11-shape.css', 'Shape', 'Ratios, angles and turns the frame and cutout layers compose from.'],
	['12-frame.css', 'Frame', 'The viewfinder brackets and rules.'],
	['07-pattern.css', 'Pattern', 'The background textures.'],
	['06-layout.css', 'Layout', 'Container and grid constants.'],
	['09-logo.css', 'Logo', 'The mark’s own geometry.'],
	['10-icon.css', 'Icon', 'Stroke and optical sizing.'],
	['13-cutout.css', 'Cutout', 'The knockout shapes.'],
	['08-a11y.css', 'Accessibility', 'Contrast targets the audit script checks against.'],
];

const isColour = (row: TokenRow) =>
	row.file === '01-color.css' && !/^\d|^[a-z]+-?\d*$/.test(row.value.replace(/var\(.*/, 'v'));

export default function TokensPage() {
	return (
		<article className="flex flex-col gap-10">
			<header className="flex max-w-prose flex-col gap-2">
				<Text variant="eyebrow">Foundations</Text>
				<Heading level={1} size="xl">
					Tokens
				</Heading>
				<Text variant="lead">
					{rows.length} custom properties, read straight from the foundation stylesheets. That
					CSS is the source of truth — the whole component kit is written against these names,
					and the Tailwind preset the React components use is generated from them.
				</Text>
				<Text variant="small">
					Swatches are live: switch the theme in the header and the dark column is what renders.
				</Text>
			</header>

			{LAYERS.map(([file, title, note]) => {
				const group = rows.filter((row) => row.file === file);
				if (!group.length) return null;

				return (
					<section key={file} className="flex flex-col gap-3">
						<Heading level={2} size="sm">
							{title}
						</Heading>
						<Text variant="small" measure="prose">
							{note}
						</Text>
						<ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
							{group.map((row) => (
								<li
									key={row.name}
									className="flex items-center gap-3 border-b-1 border-line-subtle py-1.5"
								>
									{isColour(row) && (
										<span
											aria-hidden="true"
											className="size-5 shrink-0 rounded-sm border-1 border-line-default"
											style={{ background: `var(--${row.name})` }}
										/>
									)}
									<code className="min-w-0 flex-1 truncate font-mono text-xs text-text-default">
										--{row.name}
									</code>
									<code className="hidden shrink-0 font-mono text-xs text-text-subtle sm:block">
										{row.value.length > 20 ? `${row.value.slice(0, 20)}…` : row.value}
									</code>
									<CopyButton value={`var(--${row.name})`} label="⧉" />
								</li>
							))}
						</ul>
					</section>
				);
			})}
		</article>
	);
}
