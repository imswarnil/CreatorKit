# packages/ui

The component library. Depends on `@creatorkit/tokens` and `@creatorkit/core`. Never
imports from `collections`, an app, a template, or the Ghost theme.

## Read this first

`INVENTORY.md` — generated, one row per component with its class and every variant. It
exists so you do not open nine recipe files to answer one question. Never edit it.

## The rule

**Appearance goes in `*.recipe.ts`. Behaviour goes in `*.tsx`.**

A recipe may contain Tailwind utilities and nothing else — no React, no props logic, no
runtime state. That constraint is not stylistic: `tools/recipe-to-css` compiles recipes
into the `.ck-*` classes the Ghost theme uses, and it can only do that because a recipe is
a plain object. A conditional class inside a component is a variant that never reaches the
theme.

## Adding a component

```
src/<category>/<Component>/
  <component>.recipe.ts
  <Component>.tsx
  index.ts
```

Then export from the category barrel (`src/<category>/index.ts`), which the root
`src/index.ts` re-exports. **A recipe not reachable from the package barrel is not
compiled to CSS** — the parity test will catch it, but the export is the fix.

Checklist for the `.tsx`:

1. `forwardRef`. Polymorphic (`as`) only where changing the element is genuinely useful.
2. `cn(recipe({...}), className)` — never string concatenation, or caller overrides lose.
3. Correct roles, keyboard support, focus management. State never carried by colour alone.
4. A JSDoc block with **use it for** and **do not use it for**. The second is the point.
5. No hardcoded colour — the lint rule fails the build, including `rgb()` and hex in
   template literals.

## Variant naming

Compiled modifiers are flat: `.ck-btn--primary`, not `.ck-btn--variant-primary`, because
they are typed by hand in Handlebars. That only works while modifier names are unique
within a recipe, so a collision between two variant groups is a **build failure**. If
`size` and `tone` both want `sm`, rename one.

Boolean variants take the group name: `block: { true: 'w-full' }` compiles to
`.ck-btn--block`.

## Testing

`pnpm --filter @creatorkit/ui test` runs two things that matter:

- **`src/recipe.test.ts`** — the parity test. Fails if a recipe variant has no compiled CSS
  class. This is the only thing enforcing the one-recipe-two-renderers promise; if you
  change the compiler, verify this still fails when it should.
- **`src/primitives/primitives.test.tsx`** — rendered with `renderToStaticMarkup`, so
  assertions are about elements and ARIA attributes without needing a DOM. Assert on
  attribute *presence*, not adjacency — React chooses its own attribute order.

Interaction tests (focus traps, roving tabindex) arrive with the overlay and navigation
categories, which is the first code with behaviour worth simulating.
