# @creatorkit/broadcast

The layer that ships to YouTube and Instagram, and never to a website.

Thumbnails, series art, in-video scenes, lower thirds, engagement overlays, channel
branding, story and grid formats, and the backdrops and frames they compose from. 139
classes across eight stylesheets — see `INVENTORY.md`.

## Install

```bash
pnpm add @creatorkit/broadcast @creatorkit/core
```

```css
@import '@creatorkit/core/dist/core.css';
@import '@creatorkit/broadcast/dist/broadcast.css';
```

## Use

Open a canvas in a browser, set it to the export size, and screenshot it. That is the
whole workflow — these are design surfaces, not pages.

```html
<div class="yt yt-thumb">
  <div class="bd bd-grid"></div>
  <h1 class="yt-title">How I shoot a build video</h1>
  <span class="yt-kicker">Episode 12</span>
</div>
```

Scenes are the same idea for in-video overlays, sized to sit over 16:9 footage:

```html
<div class="scene scene-lower"><div class="lower-third">…</div></div>
```

## Why it is separate

It is a different medium. Everything here sizes in container units rather than `rem`,
because a thumbnail has no browser context to inherit from and must render identically at
1280×720 and at 320×180. None of it belongs in a page bundle, and keeping it in one would
add 90KB to every visitor's download for something only you ever look at.
