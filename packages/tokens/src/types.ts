/** A leaf token value: what actually lands in the CSS. */
export type TokenValue = string | number;

/** A token tree. Keys become CSS custom property path segments. */
export interface TokenGroup {
	[key: string]: TokenValue | TokenGroup;
}

/** The prefix on every custom property this package emits. */
export const PREFIX = 'ck';

/**
 * Reference another token by its dotted path.
 *
 *   ref('palette.ink.500')  →  'var(--ck-palette-ink-500)'
 *
 * Semantic roles are authored as references rather than literals so that the
 * indirection survives into the CSS: a consumer can retheme by redefining one
 * palette property, without every role being recompiled.
 */
export function ref(path: string): string {
	return `var(--${PREFIX}-${path.split('.').join('-')})`;
}

/** Flatten a token tree into `--ck-a-b-c` → value pairs, in declaration order. */
export function flatten(group: TokenGroup, prefix: string[] = []): Array<[string, string]> {
	const out: Array<[string, string]> = [];
	for (const [key, value] of Object.entries(group)) {
		const path = [...prefix, key];
		if (value !== null && typeof value === 'object') {
			out.push(...flatten(value, path));
		} else {
			out.push([`--${PREFIX}-${path.join('-')}`, String(value)]);
		}
	}
	return out;
}
