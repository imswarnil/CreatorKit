/** A token as it is declared in the CSS: name, value, and which theme it belongs to. */
export interface Token {
	/** Without the leading dashes: `bg-raised`. */
	name: string;
	value: string;
	/** `light` is the base declaration; `dark` is an override. */
	theme: 'light' | 'dark';
	/** The file it came from, so the docs can group by layer. */
	file: string;
}

/** `var(--name)`, the form every generated output uses. */
export const cssVar = (name: string) => `var(--${name})`;
