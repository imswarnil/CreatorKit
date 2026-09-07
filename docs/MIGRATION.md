# Migration decisions

Every component in `_legacy`, and what happens to it. Settled before any code moved, so
the reorganisation is a decision rather than an accident of copying.

Four verdicts:

- **KEEP** — migrate as-is, re-expressed as a recipe. The design was right.
- **MERGE** — fold into another component as a variant. It was a duplicate.
- **REWRITE** — the idea is right, the implementation is not. Rebuild from the tokens.
- **DROP** — does not belong in a UI kit, or nothing uses it.

## primitives

| Legacy | Verdict | Why |
| --- | --- | --- |
| `.btn` + 13 modifiers | **KEEP** | The variant set is genuinely good. Becomes `Button` with `variant` / `size` / `shape` / `block`. |
| `.btn-group` | KEEP | Own component, `ButtonGroup`. |
| `.btn-icon` | MERGE → `Button` | It is `shape="icon"`, not a separate component. |
| `.btn-close`, `.btn-close-inverse` | MERGE → `Button` | `shape="icon"` plus an X. A close button is not a type of thing. |
| `.input`, `.textarea`, `.select` | KEEP | Three elements, three components, one recipe shape. |
| `.label`, `.hint`, `.error-text` | MERGE → `Field` (forms) | They are only ever used as parts of a field. Kept as sub-components, not exports. |
| `.badge` + 8 modifiers | **KEEP** | Becomes `Badge` with `tone`. `badge-live` keeps its pulse. |
| `.chip` | MERGE → `Badge` | `Badge` with `interactive`. It differed only by hover and a remove affordance. |
| `.eyebrow`, `.eyebrow-plain` | MERGE → `Text` | `<Text variant="eyebrow">`. Two classes for one typographic role. |
| `.kbd` | KEEP | Small, correct, genuinely its own thing. |
| `.timecode` | MERGE → `Badge` | `tone="neutral" mono`. Creator-specific meaning, generic form. |
| `.avatar` + 3 sizes, `.avatar-stack` | **KEEP** | `Avatar` and `AvatarStack`. |
| `.cert`, `.cert-list`, `.cert-quiet` | DROP | Résumé-specific. Belongs in a template, not the kit. |
| `.mark`, `.term`, `.drop-cap`, `.fn`, `.fn-ref` | MERGE → `prose` (patterns) | These style *content*, not components. They belong to the prose layer. |
| `.figure`, `.pullquote`, `.note`, `.code-block` | MERGE → `prose` | Same. |

## layout

| Legacy | Verdict | Why |
| --- | --- | --- |
| `.deck`, `.deck-sm`, `.deck-lg` | MERGE → `Grid` | A "deck" is a responsive card grid. `Grid` with `min` says what it does. |
| `.deck-c`, `.deck-c-sm/lg/list` | MERGE → `Grid` | Duplicate of `.deck` with different gaps. This was the clearest duplication in the audit. |
| `.content` | KEEP | Ghost's prose wrapper. Becomes `Prose`. |
| container / gutter behaviour (in `06-layout`) | REWRITE | Was implicit in a handful of rules. Becomes `Container` and `Section` with real props. |
| `.rule-list`, `.dl`, `.steps` | KEEP | Move to `data` as `List`, `DescriptionList`, `Steps`. |

## navigation

| Legacy | Verdict | Why |
| --- | --- | --- |
| `.nav-bar`, `.nav-shell`, `.nav-link` (in `24-nav`) | **DROP** | Dead. `33-navbar` redefines all four and wins on source order. Shipping both was the bug. |
| `.dropdown` (in `24-nav`) | DROP | Same — superseded by `33-navbar`'s. |
| `33-navbar` (~55 classes) | **REWRITE** | The least organised file in either system: six burger styles, seven shell modifiers, per-section bars. Becomes `Navbar` + `NavMenu` + `NavSheet` with real props. Most of the 55 were combinations, not components. |
| `.tabs`, `.tab` | KEEP | Needs keyboard support it never had. |
| `.breadcrumb` | KEEP | |
| `.pagination`, `.pager`, `.page-dot` | MERGE → `Pagination` | Three renderings of one idea. `variant="numbered" \| "prev-next" \| "dots"`. |
| `.toc`, `.toc-nested` | KEEP | Moves to `navigation` as `TableOfContents`. |
| `.nav-course`, `.nav-series`, `.nav-trip`, `.nav-video`, `.nav-shop`, `.nav-blog`, `.nav-docs-bar` | MERGE → `Navbar` | Seven copies of a bar that differ by content. Content is a prop. |

## feedback

| Legacy | Verdict | Why |
| --- | --- | --- |
| `.alert` + 5 tones | KEEP | |
| `.toast`, `.toast-region` | KEEP | Needs `aria-live`, which it lacked. |
| `.empty` | KEEP | Becomes `EmptyState`. |
| `.skeleton` + 5 | KEEP | |
| `.spinner` | KEEP | |
| `.progress` + 4 | KEEP | |
| `.tip` | MERGE → `Tooltip` (overlay) | It was a CSS-only tooltip. |
| `.loading-scan`, `.buffer` | DROP | Decorative loading effects nothing used. |

## overlay

| Legacy | Verdict | Why |
| --- | --- | --- |
| `.modal`, `.modal-lg` | REWRITE | Becomes `Dialog` on `<dialog>`, with focus trap and `Escape`. The old one had neither. |
| `.offcanvas`, `.offcanvas-start` | REWRITE → `Drawer` | Same reasoning. |
| `.pop` | REWRITE → `Popover` | |
| `.acc`, `.collapse` | MERGE → `Disclosure` | Two names, one behaviour. |
| `.dropdown` (`33-navbar`) | REWRITE → `Menu` | Needs roving focus and typeahead. |

## data

| Legacy | Verdict | Why |
| --- | --- | --- |
| `.card` + 6 modifiers | **KEEP** | Good component. `Card` with `variant`. |
| `.table` + 2, `.table-wrap` | KEEP | |
| `.stat`, `.stats` + 3 | KEEP | |
| `.tl` (timeline) + 3 | KEEP | |
| `.list-group`, `.list-group-flush` | MERGE → `List` | |
| `.plan`, `.plan-grid`, `.plan-featured` | MERGE → `Card` | Pricing plan is `Card variant="featured"` plus content. |

## creator (`@creatorkit/collections`)

| Legacy | Verdict | Why |
| --- | --- | --- |
| `.c` + 24 `.c-*` types | **KEEP** | The kit's real differentiator. Migrates whole, into its own package. |
| `collection/` — 13 per-type CSS+JS bundles | KEEP | |
| `.curriculum`, `.lesson-row`, `.ep-panel`, `.itinerary`, `.buildlog` | KEEP | Creator-domain composites. Move as-is. |
| `.player`, `.poster`, `.play`, `.episode` | KEEP | |
| `.share`, `.release`, `.rail`, `.chat` (editorial) | KEEP | `.chat` renamed — it collides with the broadcast `.chat`. |
| `.comments`, `.comment*` | KEEP | |

## broadcast (`@creatorkit/broadcast`)

| Legacy | Verdict | Why |
| --- | --- | --- |
| `4-broadcast/*` — ~150 classes, 8 files | **KEEP**, own package | Ships to YouTube and Instagram, never to a site bundle. Already built separately in both old systems; now it is a package boundary rather than a convention. |
| `.chat` (in `24-social`) | RENAME | Collides with the editorial `.chat`. Becomes `.ck-stream-chat`. |

## dropped outright

| Legacy | Why |
| --- | --- |
| `.ad` + 6 sizes (`34-ad.css`) | Ad slots are not UI-kit components. They are layout the site owner adds. Moves to the Ghost theme if wanted. |
| `.marquee` + 3 | Scrolling text is an accessibility problem the kit should not make easy. |
| `.float-field` (`30-form-plus`) | Floating labels fail for screen readers and for long labels. `Field` with a real label instead. |
| `.input-group` (duplicate in `30-form-plus`) | The `21-form` version wins. |
| `.range` | Nothing used it; a real range input needs more care than a restyle. |
| `.nav-apps`, `.nav-mega`, `.nav-over`, `.nav-more` | Combinations of `Navbar` props, not components. |
| `lab/` (in the theme) | The docs site replaces it. Two playgrounds is one too many. |
| `_legacy/docs/` — ~60 hand-written HTML pages | Rebuilt on the docs site. No preview/copy affordance and no way to add one. |

## Counts

| | |
| --- | --- |
| KEEP | 41 |
| MERGE | 22 |
| REWRITE | 8 |
| DROP | 17 |

Roughly 450 legacy classes become roughly 60 components. Most of the reduction is the
navbar's 55 classes collapsing into three components with props, and the seven duplicate
per-section bars becoming one.
