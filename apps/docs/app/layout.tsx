import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Text } from '@creatorkit/ui';
import { byCategory } from '../lib/registry';
import { kitByCategory } from '../lib/kit';
import { ThemeToggle } from '../components/Chrome';
import './globals.css';

export const metadata: Metadata = {
	title: { default: 'CreatorKit', template: '%s · CreatorKit' },
	description: 'A React and Tailwind UI kit for people who publish.',
	metadataBase: new URL('https://creator.imswarnil.com'),
};

const sections = [
	{
		title: 'Start',
		links: [
			{ href: '/docs/getting-started', label: 'Getting started' },
			{ href: '/docs/tokens', label: 'Tokens' },
			{ href: '/docs/kit', label: 'The kit' },
		],
	},
	{
		title: 'Build',
		links: [
			{ href: '/docs/themes', label: 'Ghost theme' },
			{ href: '/docs/templates', label: 'Templates' },
		],
	},
];

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="bg-surface-canvas text-text-default">
				<a href="#main" className="ck-skip">
					Skip to content
				</a>

				<header className="sticky top-0 z-nav border-b-1 border-line-subtle bg-surface-canvas/85 backdrop-blur">
					<div className="mx-auto flex max-w-wide items-center justify-between gap-4 px-gutter py-3">
						<Link href="/" className="font-display font-semibold no-underline text-text-default">
							CreatorKit
						</Link>
						<div className="flex items-center gap-3">
							<Link
								href="/docs/getting-started"
								className="text-sm no-underline text-text-muted hover:text-text-default"
							>
								Docs
							</Link>
							<ThemeToggle />
						</div>
					</div>
				</header>

				<div className="mx-auto flex max-w-wide gap-10 px-gutter">
					<nav
						aria-label="Documentation"
						className="hidden w-56 shrink-0 py-10 lg:block"
					>
						<div className="sticky top-20 flex flex-col gap-6">
							{sections.map((section) => (
								<div key={section.title}>
									<Text variant="eyebrow" as="h2" className="mb-2">
										{section.title}
									</Text>
									<ul className="flex flex-col gap-1">
										{section.links.map((item) => (
											<li key={item.href}>
												<Link
													href={item.href}
													className="text-sm no-underline text-text-muted hover:text-text-default"
												>
													{item.label}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}

							{Object.entries(byCategory).map(([category, docs]) => (
								<div key={category}>
									<Text variant="eyebrow" as="h2" className="mb-2">
										{category}
									</Text>
									<ul className="flex flex-col gap-1">
										{docs.map((doc) => (
											<li key={doc.slug}>
												<Link
													href={`/docs/components/${doc.slug}`}
													className="text-sm no-underline text-text-muted hover:text-text-default"
												>
													{doc.name}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}

							{kitByCategory.map(({ category, pages }) => (
								<div key={category}>
									<Text variant="eyebrow" as="h2" className="mb-2">
										{category}
									</Text>
									<ul className="flex flex-col gap-1">
										{pages.map((page) => (
											<li key={page.slug}>
												<Link
													href={`/docs/kit/${page.slug}`}
													className="text-sm no-underline text-text-muted hover:text-text-default"
												>
													{page.title}
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</nav>

					<main id="main" className="min-w-0 flex-1 py-10">
						{children}
					</main>
				</div>

				<footer className="border-t-1 border-line-subtle">
					<div className="mx-auto max-w-wide px-gutter py-8">
						<Text variant="caption">
							CreatorKit · MIT · built on its own design system, and on nothing else.
						</Text>
					</div>
				</footer>
			</body>
		</html>
	);
}
