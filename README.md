# CreatorKit

A React and Tailwind UI kit for people who publish — video, courses, writing, projects.

[![npm](https://img.shields.io/badge/npm-%40creatorkit-lightgrey)](https://www.npmjs.com/org/creatorkit)
[![CI](https://img.shields.io/badge/CI-pending-lightgrey)](https://github.com/imswarnil/CreatorKit/actions)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](./LICENSE)

Most component libraries are built for dashboards. CreatorKit is built for the things a
creator actually ships: a video index, a course curriculum, an episode player, a travel
log, a newsletter archive, a thumbnail, a stream overlay. It knows what an episode is.

**1,143 classes, 224 documented examples, one foundation.** The CSS kit is complete and
usable today from any template engine. On top of it, a growing React layer. Components are declared once as recipes;
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
| `templates/` | Ready-to-clone starters — `youtuber-portfolio` is ready |
| `tools/` | The recipe→CSS compiler, the inventory generator, the component generator |
| `ghost/` | A local Ghost 6 install for previewing the theme. Gitignored |
| `ghost/content/themes/creator/` | The CreatorKit Ghost theme — its own repository |

## Packages

| Package | Description |
| --- | --- |
| `@creatorkit/tokens` | The foundation: 332 custom properties, plus the reset, a11y, layout, pattern, frame and cutout layers. Emits a Tailwind preset and JSON generated from that CSS |
| `@creatorkit/core` | The `u-*` utilities, the focus ring, `cn()` and the polymorphic types |
| `@creatorkit/ui` | 285 CSS classes across 27 stylesheets — buttons, cards, forms, navs, alerts, media, overlays, timelines, sections — plus 8 React components |
| `@creatorkit/collections` | 22 creator content types: video, course, lesson, episode, series, project, travel, trip, product, doc, guide, newsletter, prompt, snippet, changelog |
| `@creatorkit/broadcast` | 139 classes for YouTube and Instagram: thumbnails, series art, scenes, lower thirds, engagement overlays. Never in a site bundle |
| `@creatorkit/icons` | 55 icons in six sets, built into a sprite and a typed name union |

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

## Documentation

| File | What it answers |
| --- | --- |
| [`docs.md`](./docs.md) | How to keep building this — components, tokens, docs, theme |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Why one recipe serves two renderers |
| [`docs/MIGRATION.md`](./docs/MIGRATION.md) | What happens to every legacy component |
| [`old-design.md`](./old-design.md) | Where the complete previous system lives, and how to run it |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | Setup and pull requests |
| [`SECURITY.md`](./SECURITY.md) | Reporting a vulnerability |
| Each package's `INVENTORY.md` | Every class it ships. Generated, so never stale |

## Contributing

Read [`ARCHITECTURE.md`](./ARCHITECTURE.md), then [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## License

MIT © Swarnil

## The Ghost preview

The theme lives inside a real Ghost install so it can be previewed against real Ghost
rendering. That install is gitignored; the theme inside it is its own repository.

```bash
nvm use 22.21.1        # Ghost 6 needs Node 22
pnpm ghost:start       # http://localhost:2370  ·  admin at /ghost/
pnpm theme:dev         # Tailwind watch + browser-sync against the Ghost above
pnpm theme:build       # design-system sync → CSS → JS bundle
pnpm theme:test        # gscan
```

Ghost-CLI instance name: `creator-local`, port `2370`. It is a separate publication from
`imswarnil.com` on 2368 — separate database, separate content, no shared state.
