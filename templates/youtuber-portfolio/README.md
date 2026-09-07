# YouTuber portfolio

A one-page site for someone with a channel: hero, featured video, video grid, writing,
about, and a newsletter signup. Static HTML built on CreatorKit.

No framework, no runtime, nothing to deploy but a folder.

## Use it

```bash
cp -R templates/youtuber-portfolio my-site
cd my-site
$EDITOR content.config.js     # ← the only file you need to touch
npm run build                 # → dist/
```

`dist/` is complete: `index.html` plus the three stylesheets and the icon sprite. Drop it
on Netlify, Cloudflare Pages, GitHub Pages, or any static host.

```bash
npm run dev   # http://localhost:4200
```

## What to edit first

Everything is in **`content.config.js`**:

| Field | What it changes |
| --- | --- |
| `site` | Title, description, URL — the tab and link previews |
| `accent` | The one colour. Primary buttons, link hovers, the live dot |
| `hero` | The eyebrow, headline, lead and two buttons |
| `featured` | The video you want watched first |
| `videos`, `writing` | The two grids. Add or remove entries freely |
| `about` | Heading and paragraphs |
| `newsletter` | Copy, and your provider's form endpoint |
| `links`, `footer` | The footer |

If you find yourself opening `page.template.html` to change *words*, that field belongs in
the config instead — open an issue.

## Images

Leave a `thumbnail` blank and the card draws a patterned placeholder, so the page looks
finished before you have artwork. Add a path and it becomes an `<img>`:

```js
{ title: 'Rebuilding my Ghost theme', thumbnail: '/thumbs/ghost.jpg', … }
```

Put files in `public/` and reference them from the root: `/thumbs/ghost.jpg`.

## Dark mode

Free. The kit follows the reader's system setting. To force one, set it on `<html>` in
`page.template.html`:

```html
<html lang="en" data-theme="dark">
```

## What it is built from

`@creatorkit/core` (foundation and utilities), `@creatorkit/ui` (hero, buttons, cards,
forms, footer), `@creatorkit/collections` (the video and post cards) and
`@creatorkit/icons`. There is **no CSS of its own** except one line setting `--accent`. If
you need a style the kit does not have, that is a gap in the kit worth reporting rather
than a stylesheet worth starting here.
