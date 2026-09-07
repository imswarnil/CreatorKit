# templates/youtuber-portfolio

A static one-page portfolio, built only from the kit. Depends on `@creatorkit/core`, `ui`,
`collections` and `icons`.

## Rules

1. **No CSS of its own.** The single `<style>` block sets `--accent` from the config and
   nothing else. A style this template needs and the kit lacks is a gap in the kit — add
   it to `packages/ui`, not here.
2. **All copy lives in `content.config.js`.** If a change to wording, a link or a colour
   requires editing `page.template.html`, the field is missing from the config. That is
   the whole promise of the template.
3. **No framework, no runtime.** `build.mjs` is string replacement on purpose. This
   template's value is that the output is a folder anyone can host.
4. Config values are escaped on the way into markup. `hero.title` is the one exception —
   it allows inline `<em>` — so anything else that needs markup needs a deliberate
   decision, not a second `raw()` call.

## Files

| File | Holds |
| --- | --- |
| `content.config.js` | Everything the user edits |
| `page.template.html` | The markup, with `{{placeholders}}` |
| `build.mjs` | Renders one into the other, copies the kit into `dist/` |

## Testing

`pnpm --filter @creatorkit/template-youtuber-portfolio test` renders the page and fails if
a kit class is missing or if any `{{placeholder}}` survived — an unreplaced placeholder is
the failure mode that ships silently and looks like a typo on the live site.
