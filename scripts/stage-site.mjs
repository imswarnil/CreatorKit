/**
 * stage-site — reproduce, exactly, how this site was hosted at f84ccf7.
 *
 * The original `.github/workflows/pages.yml` was four lines of shell:
 *
 *     mkdir -p _site
 *     cp -R docs/. _site/          # build.py already mirrored src/ icons/ dist/
 *     rm -rf _site/_build
 *     touch _site/.nojekyll
 *
 * That is all this does, from `_legacy/docs` into `_site`, so Cloudflare serves
 * the same tree GitHub Pages did. `_build` is the generator, not output, and
 * `.nojekyll` stops any consumer eating the underscore-prefixed paths.
 *
 * Nothing is rewritten on the way through. The pages link with root-absolute
 * paths and the site is the root, so they resolve as authored.
 *
 * One file is added that Pages did not need: `_redirects`. Cloudflare serves
 * these assets with `html_handling: "none"` — every link on the site is an
 * explicit `/button.html`, and any other mode redirects those to directories
 * that do not exist. "none" is literal, though, so a request for `/` matches no
 * file. The rule below rewrites it (status 200, not a redirect) to index.html.
 * It is the only path on the site that needs it: an audit of all 212 pages
 * finds no link at all that relies on directory-index resolution.
 */
import { cp, mkdir, rm, writeFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, '_legacy', 'docs')
const out = path.join(root, '_site')

await rm(out, { recursive: true, force: true })
await mkdir(out, { recursive: true })
await cp(src, out, { recursive: true })
await rm(path.join(out, '_build'), { recursive: true, force: true })
await writeFile(path.join(out, '.nojekyll'), '')
await writeFile(path.join(out, '_redirects'), '/  /index.html  200\n')

const entries = await readdir(out, { recursive: true, withFileTypes: true })
const files = entries.filter((e) => e.isFile()).length
const pages = entries.filter((e) => e.isFile() && e.name.endsWith('.html')).length
console.log(`staged ${files} files (${pages} pages) → _site`)
