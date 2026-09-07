import type { ReactNode } from 'react';
import {
	Avatar,
	AvatarStack,
	Badge,
	Button,
	Heading,
	Icon,
	Input,
	Link,
	Text,
	Textarea,
	avatar,
	badge,
	button,
	heading,
	icon,
	input,
	link,
	text,
} from '@creatorkit/ui';
import type { RecipeFn, VariantMap } from '@creatorkit/ui';

/**
 * One entry per documented component.
 *
 * Everything mechanical — the variant list, the class names, the prop table —
 * is derived at render time from the recipe and from `props.generated.json`.
 * What lives here is the part no tool can produce: what the component is for,
 * and when not to reach for it.
 */
export interface ComponentDoc {
	slug: string;
	name: string;
	category: string;
	/** One line. Shown in the sidebar and as the page subtitle. */
	summary: string;
	/** The recipe, so variants and classes are read rather than retyped. */
	recipe: RecipeFn<VariantMap>;
	/** The prop-type names in props.generated.json this component owns. */
	propTypes?: string[];
	preview: ReactNode;
	/** Rendered for each value of this variant group in the gallery. */
	gallery?: { group: string; render: (value: string) => ReactNode };
	usage: string;
	accessibility: string[];
	dos: string[];
	donts: string[];
}

export const components: ComponentDoc[] = [
	{
		slug: 'button',
		name: 'Button',
		category: 'Primitives',
		summary: 'The kit’s action, and the creator CTA.',
		recipe: button,
		preview: (
			<div className="flex flex-wrap items-center gap-3">
				<Button>Watch the latest</Button>
				<Button variant="secondary">Read the notes</Button>
				<Button variant="ghost">Skip</Button>
				<Button variant="live">● Live</Button>
			</div>
		),
		gallery: { group: 'variant', render: (v) => <Button variant={v as never}>Record</Button> },
		usage: `import { Button } from '@creatorkit/ui';

<Button variant="primary" size="lg">Watch the latest</Button>
<Button as="a" href="/videos">Browse videos</Button>`,
		accessibility: [
			'Renders <button type="button"> so it cannot submit a form by accident.',
			'as="a" produces a real anchor — keyboard and screen-reader behaviour follows the element, not the styling.',
			'shape="icon" has no text: give it an aria-label.',
			'Disabled state uses both disabled and aria-disabled so the styling never lies about it.',
		],
		dos: [
			'Use as="a" when the thing navigates. A creator CTA is usually a link.',
			'Use variant="live" only for genuine on-air state.',
		],
		donts: [
			'Do not use a Button for navigation that reads as text — that is Link.',
			'Do not put a second primary Button in the same block. Primary means one.',
		],
	},
	{
		slug: 'badge',
		name: 'Badge',
		category: 'Primitives',
		summary: 'A small piece of metadata attached to something else.',
		recipe: badge,
		propTypes: ['BadgeProps'],
		preview: (
			<div className="flex flex-wrap items-center gap-2">
				<Badge>Draft</Badge>
				<Badge tone="signal">New</Badge>
				<Badge tone="craft">Work in progress</Badge>
				<Badge tone="live">On air</Badge>
				<Badge mono>12:04</Badge>
			</div>
		),
		gallery: { group: 'tone', render: (v) => <Badge tone={v as never}>{v}</Badge> },
		usage: `import { Badge } from '@creatorkit/ui';

<Badge tone="live">On air</Badge>
<Badge mono>12:04</Badge>`,
		accessibility: [
			'tone="live" renders aria-label="live" — the state is never carried by colour alone.',
			'A Badge is not focusable. interactive only adds hover styling for a badge already inside a control.',
		],
		dos: [
			'Use mono for durations, timecodes and counts so columns align.',
			'Use craft for work-in-progress, not warning. Warning means something is wrong.',
		],
		donts: [
			'Do not make a Badge clickable. That is a Button with size="sm" shape="pill".',
			'Do not use tone to invent a new meaning — say it in words instead.',
		],
	},
	{
		slug: 'avatar',
		name: 'Avatar',
		category: 'Primitives',
		summary: 'A person: author, guest, member, commenter.',
		recipe: avatar,
		propTypes: ['AvatarProps'],
		preview: (
			<div className="flex items-center gap-4">
				<Avatar name="Swarnil Singhai" size="sm" />
				<Avatar name="Swarnil Singhai" />
				<Avatar name="Ada Lovelace" size="lg" />
				<AvatarStack>
					<Avatar name="Ada Lovelace" size="sm" ring />
					<Avatar name="Grace Hopper" size="sm" ring />
					<Avatar name="Alan Turing" size="sm" ring />
				</AvatarStack>
			</div>
		),
		gallery: { group: 'size', render: (v) => <Avatar name="Swarnil Singhai" size={v as never} /> },
		usage: `import { Avatar, AvatarStack } from '@creatorkit/ui';

<Avatar name="Swarnil Singhai" src="/me.jpg" />

<AvatarStack>
  <Avatar name="Ada Lovelace" ring />
  <Avatar name="Grace Hopper" ring />
</AvatarStack>`,
		accessibility: [
			'The wrapper carries role="img" and the name; the <img> is aria-hidden with an empty alt.',
			'That is why a broken image degrades to initials without announcing the name twice.',
		],
		dos: ['Give stacked avatars ring so the overlap stays readable on any surface.'],
		donts: ['Do not use an Avatar for a brand or channel logo. Those are not people.'],
	},
	{
		slug: 'input',
		name: 'Input',
		category: 'Primitives',
		summary: 'Single-line and multi-line text controls.',
		recipe: input,
		propTypes: ['InputProps', 'TextareaProps'],
		preview: (
			<div className="flex max-w-ui flex-col gap-3">
				<Input aria-label="Email" placeholder="you@example.com" />
				<Input aria-label="Email" placeholder="Invalid" invalid defaultValue="not-an-email" />
				<Textarea aria-label="Note" placeholder="Say something" />
			</div>
		),
		gallery: {
			group: 'size',
			render: (v) => <Input aria-label={v} size={v as never} placeholder={v} />,
		},
		usage: `import { Input, Textarea } from '@creatorkit/ui';

<Input placeholder="you@example.com" aria-label="Email" />
<Textarea aria-label="Note" />`,
		accessibility: [
			'invalid sets aria-invalid, which is what the recipe styles against — not a colour class.',
			'A placeholder is not a label. It disappears the moment someone types.',
		],
		dos: ['Use it inside a Field, which supplies the label, hint and error wiring.'],
		donts: ['Do not rely on a placeholder for the accessible name.'],
	},
	{
		slug: 'text',
		name: 'Text',
		category: 'Primitives',
		summary: 'Body copy and every non-heading typographic role.',
		recipe: text,
		preview: (
			<div className="flex flex-col gap-2">
				<Text variant="eyebrow">Episode 12</Text>
				<Text variant="lead">The lead paragraph sets up what the piece is about.</Text>
				<Text>Body copy, at the base size, with a comfortable line height.</Text>
				<Text variant="caption">A caption, for metadata under a figure.</Text>
			</div>
		),
		gallery: { group: 'variant', render: (v) => <Text variant={v as never}>{v}</Text> },
		usage: `import { Text } from '@creatorkit/ui';

<Text variant="eyebrow" as="span">Episode 12</Text>
<Text variant="lead">The lead paragraph.</Text>`,
		accessibility: [
			'Use as to keep the element truthful. An eyebrow looks like a label but is a <p> or <span>, never a heading.',
		],
		dos: ['Use measure="prose" for anything someone reads in a run.'],
		donts: ['Do not style a span to look like a heading — the document loses its outline.'],
	},
	{
		slug: 'heading',
		name: 'Heading',
		category: 'Primitives',
		summary: 'A heading, with the outline and the appearance kept apart.',
		recipe: heading,
		propTypes: ['HeadingProps'],
		preview: (
			<div className="flex flex-col gap-3">
				<Heading level={1} size="2xl">
					How I shoot a build video
				</Heading>
				<Heading level={2} size="lg">
					The setup
				</Heading>
				<Heading level={3} size="sm">
					Lighting
				</Heading>
			</div>
		),
		gallery: {
			group: 'size',
			render: (v) => (
				<Heading level={2} size={v as never}>
					{v}
				</Heading>
			),
		},
		usage: `import { Heading } from '@creatorkit/ui';

<Heading level={1} size="2xl">How I shoot a build video</Heading>
<Heading level={2} size="lg">The setup</Heading>`,
		accessibility: [
			'level is required, so the document outline is always a deliberate choice.',
			'level and size are independent: a section’s third heading is an <h3> however large it looks.',
		],
		dos: ['Pick level from the document structure first, then choose size.'],
		donts: ['Do not skip levels to get a smaller heading. Change size instead.'],
	},
	{
		slug: 'link',
		name: 'Link',
		category: 'Primitives',
		summary: 'Navigation, underlined where it needs to be found.',
		recipe: link,
		preview: (
			<div className="flex flex-col gap-2">
				<Text>
					A paragraph containing <Link href="#">a link in prose</Link>, which is underlined
					because that is the only reliable way to find one.
				</Text>
				<Link href="#" variant="subtle">
					A subtle link, for navigation
				</Link>
				<Link href="#" variant="accent">
					An accent link
				</Link>
			</div>
		),
		gallery: {
			group: 'variant',
			render: (v) =>
				v === 'cover' ? (
					<span className="relative inline-block rounded-card border-1 border-line-default p-3">
						<Link href="#" variant="cover">
							Whole box is clickable
						</Link>
					</span>
				) : (
					<Link href="#" variant={v as never}>
						{v}
					</Link>
				),
		},
		usage: `import { Link } from '@creatorkit/ui';

<Link href="/about">About</Link>
<Link href="/post" variant="cover">Whole card clickable</Link>`,
		accessibility: [
			'variant="cover" needs a positioned ancestor; any control inside it needs relative to stay clickable.',
			'The focus ring follows the element shape, so a cover link still shows focus on the card.',
		],
		dos: ['Keep the underline in prose.'],
		donts: ['Do not use a Link for an action. That is Button.'],
	},
	{
		slug: 'icon',
		name: 'Icon',
		category: 'Primitives',
		summary: 'The wrapper every icon renders through.',
		recipe: icon,
		propTypes: ['IconProps'],
		preview: (
			<div className="flex items-center gap-4 text-text-default">
				{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
					<Icon key={size} size={size}>
						<path d="M5 12h14M13 6l6 6-6 6" />
					</Icon>
				))}
			</div>
		),
		gallery: {
			group: 'size',
			render: (v) => (
				<Icon size={v as never}>
					<path d="M5 12h14M13 6l6 6-6 6" />
				</Icon>
			),
		},
		usage: `import { Icon } from '@creatorkit/ui';

<Icon size="lg"><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
<Icon label="Download"><path d="…" /></Icon>`,
		accessibility: [
			'Without a label the icon is aria-hidden, which is right when adjacent text already says it.',
			'With a label it becomes role="img" — use that only when the icon is the whole control.',
		],
		dos: ['Size through the size prop so icons scale with the token ladder.'],
		donts: ['Do not label an icon that sits beside text saying the same thing — it is announced twice.'],
	},
];

export const byCategory = components.reduce<Record<string, ComponentDoc[]>>((acc, doc) => {
	(acc[doc.category] ??= []).push(doc);
	return acc;
}, {});

export const findComponent = (slug: string) => components.find((c) => c.slug === slug);
