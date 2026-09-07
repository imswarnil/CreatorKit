# old-design — the previous system, frozen

**This folder is a reference archive. Nothing here is built on, imported, or
shipped. It is gitignored and never committed.**

It is the complete tree as of commit `f84ccf7` on `main` — the last state of the
system before the v2 rebuild. It is kept for one reason: so you can look at a
component that used to exist, decide whether it is worth having, and rebuild it
properly in the new `src/`.

Treat it as a museum, not a parts bin. **Copying CSS out of here defeats the
point of the rebuild** — the whole reason for starting over was that these files
carry the problems the new system exists to fix:

- no cascade layers, so override order was an accident of import order
- mono used as the default voice in 171 places
- three hand-maintained theme blocks that had already drifted apart
- 1,225 unused classes across 121 entirely-unused component families
- the design system and a Ghost/Jekyll theme entangled in one repo

Read it for the *idea* of a component. Write the component again.

## Running it

The docs here are pre-built — the 134 HTML pages are committed in this snapshot,
so nothing needs compiling. Just serve the folder:

```bash
cd old-design
python3 -m http.server 8081 --directory docs
```

Then open <http://localhost:8081/>.

Port **8081** on purpose: the new system's docs live on **8080**, and having both
up at once is the fastest way to compare old and new.

## What is worth looking at

| Page | Why |
| --- | --- |
| `/components.html` | the full component explorer — the fastest inventory of what existed |
| `/all.html` | every page in one list |
| `/f-frames.html` | window chrome, viewfinder, shutter, filmstrip, polaroid |
| `/f-pattern.html` | 28 CSS-only background patterns |
| `/yt-thumbs.html` | the YouTube thumbnail layouts |
| `/ig-posts.html` | the Instagram export canvases |

The broadcast and pattern work is the part with the least wrong with it, and the
most worth carrying forward in spirit.

## Rebuilding a component from here

1. Open its page on `:8081` and decide whether the component earns its place.
   `audit-classes.py` said 121 families were used by nothing at all — a lot of
   this does not deserve to come back.
2. Write it new in `src/`, inside its cascade layer, reading tier-2 tokens only.
3. Give it real classes and real variants. No inline `style=""` in the markup.
4. Write its docs page in `docs/content/` with a `:::demo` block.
5. `npm run lint && npm run audit` before it counts as done.
