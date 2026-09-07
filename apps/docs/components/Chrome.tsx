'use client';

import { useEffect, useState } from 'react';
import { cn } from '@creatorkit/core';
import { Button, Text } from '@creatorkit/ui';

/**
 * Theme switch. Writes `data-theme` on <html>, which is exactly the contract
 * @creatorkit/tokens documents — the docs site themes itself the same way any
 * consumer would, rather than through a bespoke mechanism.
 */
export function ThemeToggle() {
	const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem('ck-theme');
		if (stored === 'light' || stored === 'dark') {
			setTheme(stored);
			document.documentElement.dataset['theme'] = stored;
		}
	}, []);

	const toggle = () => {
		const next =
			theme === 'dark'
				? 'light'
				: theme === 'light'
					? 'dark'
					: window.matchMedia('(prefers-color-scheme: dark)').matches
						? 'light'
						: 'dark';
		setTheme(next);
		document.documentElement.dataset['theme'] = next;
		try {
			localStorage.setItem('ck-theme', next);
		} catch {
			/* private mode; the toggle still works for this page view */
		}
	};

	return (
		<Button variant="ghost" size="sm" shape="icon" onClick={toggle} aria-label="Switch theme">
			<span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
		</Button>
	);
}

/** Copy-to-clipboard, with the state shown in the label rather than a toast. */
export function CopyButton({ value, label = 'Copy' }: { value: string; label?: string }) {
	const [copied, setCopied] = useState(false);

	return (
		<Button
			variant="quiet"
			size="sm"
			onClick={() => {
				void navigator.clipboard.writeText(value).then(() => {
					setCopied(true);
					setTimeout(() => setCopied(false), 1200);
				});
			}}
		>
			{copied ? 'Copied' : label}
		</Button>
	);
}

/**
 * A live example. The preview is the real component; the code pane is the
 * snippet a reader copies. `width` narrows the preview to check a component at
 * a small size without resizing the window.
 */
export function Demo({
	children,
	code,
	caption,
}: {
	children: React.ReactNode;
	code: string;
	caption?: string;
}) {
	const [narrow, setNarrow] = useState(false);
	const [showCode, setShowCode] = useState(false);

	return (
		<figure className="my-6 overflow-hidden rounded-card border-1 border-line-default">
			<div className="flex items-center justify-between gap-2 border-b-1 border-line-subtle bg-surface-sunken px-3 py-2">
				<Text variant="caption" as="span">
					{caption ?? 'Preview'}
				</Text>
				<div className="flex items-center gap-1">
					<Button variant="quiet" size="sm" onClick={() => setNarrow((v) => !v)}>
						{narrow ? 'Full width' : '320px'}
					</Button>
					<Button variant="quiet" size="sm" onClick={() => setShowCode((v) => !v)}>
						{showCode ? 'Hide code' : 'Code'}
					</Button>
					<CopyButton value={code} />
				</div>
			</div>

			<div className="bg-surface-raised p-6">
				<div className={cn(narrow && 'max-w-[320px]')}>{children}</div>
			</div>

			{showCode && (
				<pre className="overflow-x-auto border-t-1 border-line-subtle bg-surface-sunken p-4 text-xs leading-relaxed">
					<code className="font-mono text-text-default">{code}</code>
				</pre>
			)}
		</figure>
	);
}
