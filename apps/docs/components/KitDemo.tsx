'use client';

import { useState } from 'react';
import { Button, Text } from '@creatorkit/ui';
import { CopyButton } from './Chrome';

/**
 * A demo from the CSS kit.
 *
 * The same string is rendered and shown: the preview is `markup` injected, and
 * the code pane is `markup` escaped. They cannot drift, because they are one
 * value — the property the previous docs had, kept.
 *
 * `dangerouslySetInnerHTML` is correct here and nowhere else on this site: the
 * content is authored markup checked into this repository, not user input.
 */
export function KitDemo({ markup, spec }: { markup: string; spec?: string }) {
	const [showCode, setShowCode] = useState(false);

	return (
		<figure className="my-6 overflow-hidden rounded-card border-1 border-line-default">
			<div className="flex items-center justify-between gap-3 border-b-1 border-line-subtle bg-surface-sunken px-3 py-2">
				<Text variant="caption" as="figcaption">
					{spec || 'Example'}
				</Text>
				<span className="flex shrink-0 items-center gap-1">
					<Button variant="quiet" size="sm" onClick={() => setShowCode((v) => !v)}>
						{showCode ? 'Hide code' : 'Code'}
					</Button>
					<CopyButton value={markup} />
				</span>
			</div>

			<div className="overflow-x-auto bg-surface-raised p-6">
				<div dangerouslySetInnerHTML={{ __html: markup }} />
			</div>

			{showCode && (
				<pre className="overflow-x-auto border-t-1 border-line-subtle bg-surface-sunken p-4 text-xs leading-relaxed">
					<code className="font-mono text-text-default">{markup}</code>
				</pre>
			)}
		</figure>
	);
}
