import Link from 'next/link';
import { Button, Heading, Text } from '@creatorkit/ui';

export default function NotFound() {
	return (
		<div className="flex max-w-prose flex-col items-start gap-4 py-16">
			<Heading level={1} size="xl">
				Not here
			</Heading>
			<Text variant="lead">That page does not exist.</Text>
			<Button as={Link} href="/">
				Back to the start
			</Button>
		</div>
	);
}
