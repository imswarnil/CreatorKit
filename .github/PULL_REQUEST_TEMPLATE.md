## What this changes

<!-- One or two sentences. What is different after this lands? -->

## Why

<!-- The problem. If it is a bug, what was happening instead? -->

## Checklist

- [ ] `pnpm lint && pnpm typecheck && pnpm build && pnpm test` passes
- [ ] Appearance changes live in a `*.recipe.ts` or a stylesheet, not in JSX
- [ ] No hardcoded colours, sizes or durations outside `packages/tokens`
- [ ] New or changed components have a JSDoc block saying what they are **not** for
- [ ] `pnpm changeset` run if this should appear in a release

<!-- Generated files (INVENTORY.md, TOKENS.md, dist/) are rebuilt by `pnpm build`.
     Do not edit them by hand. -->
