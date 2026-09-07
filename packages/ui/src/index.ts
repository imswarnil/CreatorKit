/**
 * @creatorkit/ui — the component library.
 *
 * Appearance is declared once per component in its `*.recipe.ts`; React reads
 * the recipe and `tools/recipe-to-css` compiles the same object into the `.ck-*`
 * classes the Ghost theme uses. See ARCHITECTURE.md.
 */
export * from './primitives/index.js';
export { recipe, isRecipe } from './recipe.js';
export type { RecipeFn, RecipeMeta, RecipeProps, VariantMap } from './recipe.js';
