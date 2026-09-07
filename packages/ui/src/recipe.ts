import { cva } from 'class-variance-authority';

/** A variant group: variant value → the Tailwind utilities it applies. */
export type VariantMap = Record<string, Record<string, string>>;

/**
 * What `tools/recipe-to-css` reads. Every recipe carries its own definition so
 * the compiler never has to parse source: it imports the built package, finds
 * the recipes, and emits CSS from the same object React renders from.
 */
export interface RecipeMeta<V extends VariantMap = VariantMap> {
	/** The class stem. `btn` produces `.ck-btn` and `.ck-btn--primary`. */
	name: string;
	base: string;
	variants: V;
	defaultVariants?: Partial<Record<keyof V, string | boolean>>;
}

type VariantSelection<V extends VariantMap> = {
	[K in keyof V]?: (keyof V[K] & string) | boolean | null | undefined;
};

export type RecipeFn<V extends VariantMap> = ((
	props?: VariantSelection<V> & { class?: string; className?: string },
) => string) & { recipe: RecipeMeta<V> };

/** The props a component accepts because of its recipe. */
export type RecipeProps<T> = T extends RecipeFn<infer V> ? VariantSelection<V> : never;

/**
 * Declare a component's appearance. **This is the only place appearance is
 * declared** — see `ARCHITECTURE.md`.
 *
 * A recipe may contain Tailwind utilities and nothing else: no React, no props
 * logic, no runtime state. That constraint is what lets the same object compile
 * to plain CSS classes for the Handlebars theme.
 *
 *     export const button = recipe('btn', 'inline-flex items-center', {
 *       variants: { variant: { primary: 'bg-accent-default text-text-on-accent' } },
 *       defaultVariants: { variant: 'primary' },
 *     });
 */
export function recipe<V extends VariantMap>(
	name: string,
	base: string,
	config: { variants: V; defaultVariants?: Partial<Record<keyof V, string | boolean>> },
): RecipeFn<V> {
	const fn = cva(base, config as never) as unknown as RecipeFn<V>;
	fn.recipe = {
		name,
		base,
		variants: config.variants,
		...(config.defaultVariants ? { defaultVariants: config.defaultVariants } : {}),
	};
	return fn;
}

/** True for anything produced by `recipe()`. Used by the CSS compiler. */
export function isRecipe(value: unknown): value is RecipeFn<VariantMap> {
	return typeof value === 'function' && 'recipe' in value;
}
