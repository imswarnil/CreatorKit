# CreatorKit

A React and Tailwind UI kit for people who publish — video, courses, writing, projects.

[![npm](https://img.shields.io/badge/npm-%40creatorkit-lightgrey)](https://www.npmjs.com/org/creatorkit)
[![CI](https://img.shields.io/badge/CI-pending-lightgrey)](https://github.com/imswarnil/CreatorKit/actions)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](./LICENSE)

Most component libraries are built for dashboards. CreatorKit is built for the things a
creator actually ships: a video index, a course curriculum, an episode player, a travel
log, a newsletter archive, a thumbnail, a stream overlay. It knows what an episode is.

It is one design system with two renderers. Components are declared once as recipes;
React reads them, and the Ghost theme's CSS is generated from the same file. A change to
a button reaches every surface on the next build — the docs site, the starter templates,
and the Ghost theme in `ghost/content/themes/creator`.

Documentation: **[creator.imswarnil.com](https://creator.imswarnil.com)**

## Quick start

```bash
pnpm add @creatorkit/ui @creatorkit/tokens
```

```tsx
import { Button, Card } from '@creatorkit/ui';
import '@creatorkit/tokens/css';

export function Episode() {
  return (
    <Card>
      <Button variant="primary">Watch</Button>
    </Card>
  );
}
```

```js
// tailwind.config.js
export default {
  presets: [require('@creatorkit/tokens/tailwind')],
};
```

## Repository

| Path | What it holds |
| --- | --- |
| `packages/` | The published `@creatorkit/*` packages |
| `apps/docs/` | `creator.imswarnil.com` — documentation and component showcase |
| `templates/` | Ready-to-clone starters, beginning with a YouTuber portfolio |
| `tools/` | The recipe→CSS compiler, the inventory generator, the component generator |
| `ghost/` | A local Ghost 6 install for previewing the theme. Gitignored |
| `ghost/content/themes/creator/` | The CreatorKit Ghost theme — its own repository |

## Packages

| Package | Description |
| --- | --- |
| `@creatorkit/tokens` | Colour, type, space, radius, shadow, motion. One source, emitted as a Tailwind preset, CSS custom properties and typed JS |
| `@creatorkit/core` | Reset, base elements, focus ring, layout primitives, `cn()` |
| `@creatorkit/ui` | The component library — primitives, layout, navigation, feedback, overlay, data |
| `@creatorkit/collections` | Creator content types: video, course, episode, project, travel, product, prompt, snippet |
| `@creatorkit/broadcast` | Thumbnails, scenes, lower thirds, stream overlays. Ships to YouTube and Instagram, never to a site bundle |
| `@creatorkit/icons` | The creator, media, resume and social icon sets |

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Every package with a dev task, in parallel |
| `pnpm build` | All packages, in dependency order |
| `pnpm lint` | ESLint across the workspace |
| `pnpm typecheck` | TypeScript, strict, no emit |
| `pnpm test` | Package tests |
| `pnpm format` | Prettier |
| `pnpm clean` | Remove build output and `node_modules` |

Requires Node 22 and pnpm 10 or newer.

## Contributing

Read [`ARCHITECTURE.md`](./ARCHITECTURE.md), then [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## License

MIT © Swarnil
