# packages/broadcast

Export art for YouTube and Instagram. Depends on `@creatorkit/tokens` and
`@creatorkit/core`. **Nothing on a website may import this**, and it is never added to a
page bundle — it is 90KB that only the author ever looks at.

**Read `INVENTORY.md` before grepping.** 139 classes across eight stylesheets.

## Rules

1. **Container units, not `rem`.** A thumbnail has no browser context to inherit from and
   must render identically at 1280×720 and at 320×180. Anything sized in `rem` here is a
   bug that only shows up at the wrong export size.
2. **Fixed aspect canvases.** `.yt-thumb` is 16:9, `.yt-short` is 9:16. A canvas that
   reflows is not a canvas.
3. **No site chrome.** No navs, no links, no focus states. Nobody tabs through a thumbnail.
4. Contrast has to survive YouTube's own overlays — the duration pill sits bottom-right,
   so do not put anything that matters there.

## Adding a surface

New file in `styles/`, numbered to keep the layer order, `@import` in `styles/index.css`,
and add it to `surfaces` in `src/index.ts` with the aspect it exports at.

## Testing

Open the canvas on the docs site under **The kit → Broadcast**, size the window to the
export dimensions and screenshot. That is also the production workflow, so if it is
awkward to test it is awkward to use.
