import { Badge, Text } from '@creatorkit/ui';
import type { RecipeFn, VariantMap } from '@creatorkit/ui';
import props from '../lib/props.generated.json';

type PropRow = { name: string; type: string; required: boolean; description: string };
const generated = props as Record<string, PropRow[]>;

const cell = 'border-b-1 border-line-subtle px-3 py-2 align-top text-sm';
const head = 'border-b-1 border-line-default px-3 py-2 text-left text-xs text-text-subtle';

/**
 * Variant props, read from the recipe. This table cannot describe a variant the
 * component does not have, because it is the same object the component renders
 * from.
 */
export function VariantTable({ recipe }: { recipe: RecipeFn<VariantMap> }) {
	const { variants, defaultVariants = {} } = recipe.recipe;
	const rows = Object.entries(variants) as Array<[string, Record<string, string>]>;

	return (
		<div className="overflow-x-auto">
			<table className="w-full border-collapse">
				<thead>
					<tr>
						<th className={head}>Prop</th>
						<th className={head}>Values</th>
						<th className={head}>Default</th>
					</tr>
				</thead>
				<tbody>
					{rows.map(([group, values]) => (
						<tr key={group}>
							<td className={cell}>
								<code className="font-mono text-text-default">{group}</code>
							</td>
							<td className={cell}>
								<span className="flex flex-wrap gap-1">
									{Object.keys(values).map((value) => (
										<Badge key={value} mono>
											{value}
										</Badge>
									))}
								</span>
							</td>
							<td className={cell}>
								<code className="font-mono text-text-muted">
									{String(defaultVariants[group] ?? '—')}
								</code>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

/**
 * The component's own props, extracted from its TypeScript source by
 * `tools/props-gen`. Inherited DOM attributes are deliberately not listed —
 * burying six real props under two hundred HTML ones helps nobody.
 */
export function PropsTable({ types }: { types: string[] }) {
	const rows = types.flatMap((name) => (generated[name] ?? []).map((row) => ({ ...row, from: name })));
	if (!rows.length) return null;

	return (
		<div className="overflow-x-auto">
			<table className="w-full border-collapse">
				<thead>
					<tr>
						<th className={head}>Prop</th>
						<th className={head}>Type</th>
						<th className={head}>Notes</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={`${row.from}.${row.name}`}>
							<td className={cell}>
								<code className="font-mono text-text-default">{row.name}</code>
								{row.required && (
									<Text variant="caption" as="span" tone="accent">
										{' '}
										required
									</Text>
								)}
							</td>
							<td className={cell}>
								<code className="font-mono text-xs text-text-muted">{row.type}</code>
							</td>
							<td className={cell}>{row.description || '—'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

/** The plain-CSS classes the same recipe compiles to, for the Ghost theme. */
export function ClassList({ recipe }: { recipe: RecipeFn<VariantMap> }) {
	const { name, variants } = recipe.recipe;
	const modifiers = Object.entries(variants as Record<string, Record<string, string>>).flatMap(
		([group, values]) =>
			Object.entries(values)
				.filter(([value, utilities]) => utilities.trim() && value !== 'false')
				.map(([value]) => (value === 'true' ? group : value)),
	);

	return (
		<div className="flex flex-wrap gap-1">
			<Badge tone="signal" mono>{`.ck-${name}`}</Badge>
			{modifiers.map((m) => (
				<Badge key={m} mono>{`.ck-${name}--${m}`}</Badge>
			))}
		</div>
	);
}
