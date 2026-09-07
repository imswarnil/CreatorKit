/**
 * Render index.html from content.config.js.
 *
 * Deliberately not a framework. This template's job is to be the shortest path
 * from "I have a channel" to "I have a site" — a single static page, no runtime,
 * nothing to deploy but a folder. The build exists only so the copy lives in one
 * file instead of being scattered through the markup.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import content from './content.config.js';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'dist');

/** Escape anything that came from the config and lands in markup. */
const e = (s = '') =>
	String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The hero title is the one field allowed inline <em>, so it is not escaped. */
const raw = (s = '') => String(s);

const mediaOf = (src, extra = '') =>
	src
		? `<img class="c__thumb" src="${e(src)}" alt="" loading="lazy">`
		: `<div class="c__media pattern pattern-grid pattern-media"${extra}><span class="c__play"><span class="play__disc"></span></span></div>`;

const videoCard = (v) => `
					<article class="c c-video">
						${mediaOf(v.thumbnail, v.runtime ? ` data-runtime="${e(v.runtime)}"` : '')}
						<div class="c__body">
							<p class="c__meta"><span class="dot dot-sm"></span> Video</p>
							<h3 class="c__title"><a class="c__link" href="${e(v.href)}">${e(v.title)}</a></h3>
							<p class="c__excerpt">${e(v.excerpt)}</p>
						</div>
					</article>`;

const postCard = (p) => `
					<article class="c c-blog">
						<div class="c__body">
							<p class="c__meta"><span class="dot dot-sm"></span> Writing</p>
							<h3 class="c__title"><a class="c__link" href="${e(p.href)}">${e(p.title)}</a></h3>
							<p class="c__excerpt">${e(p.excerpt)}</p>
						</div>
					</article>`;

const html = readFileSync(join(here, 'page.template.html'), 'utf8')
	.replaceAll('{{lang}}', e(content.site.lang))
	.replaceAll('{{title}}', e(content.site.title))
	.replaceAll('{{description}}', e(content.site.description))
	.replaceAll('{{url}}', e(content.site.url))
	.replaceAll('{{name}}', e(content.site.name))
	.replaceAll('{{accent}}', e(content.accent))
	.replaceAll('{{hero.eyebrow}}', e(content.hero.eyebrow))
	.replaceAll('{{hero.title}}', raw(content.hero.title))
	.replaceAll('{{hero.lead}}', e(content.hero.lead))
	.replaceAll('{{hero.primary.label}}', e(content.hero.primary.label))
	.replaceAll('{{hero.primary.href}}', e(content.hero.primary.href))
	.replaceAll('{{hero.secondary.label}}', e(content.hero.secondary.label))
	.replaceAll('{{hero.secondary.href}}', e(content.hero.secondary.href))
	.replaceAll('{{featured.title}}', e(content.featured.title))
	.replaceAll('{{featured.excerpt}}', e(content.featured.excerpt))
	.replaceAll('{{featured.runtime}}', e(content.featured.runtime))
	.replaceAll('{{featured.href}}', e(content.featured.href))
	.replaceAll('{{featured.media}}', mediaOf(content.featured.thumbnail, ` data-runtime="${e(content.featured.runtime)}"`))
	.replaceAll('{{videos}}', content.videos.map(videoCard).join(''))
	.replaceAll('{{writing}}', content.writing.map(postCard).join(''))
	.replaceAll('{{about.heading}}', e(content.about.heading))
	.replaceAll('{{about.body}}', content.about.body.map((p) => `<p class="t-body">${e(p)}</p>`).join(''))
	.replaceAll('{{newsletter.heading}}', e(content.newsletter.heading))
	.replaceAll('{{newsletter.body}}', e(content.newsletter.body))
	.replaceAll('{{newsletter.action}}', e(content.newsletter.action))
	.replaceAll('{{newsletter.buttonLabel}}', e(content.newsletter.buttonLabel))
	.replaceAll('{{links}}', content.links.map((l) => `<a class="footer__link" href="${e(l.href)}">${e(l.label)}</a>`).join(''))
	.replaceAll('{{footer.note}}', e(content.footer.note))
	.replaceAll('{{year}}', String(new Date().getFullYear()));

mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'index.html'), html);

// The kit, copied in so `dist/` is a complete, deployable folder.
const require_ = (p) => join(here, 'node_modules', p);
for (const [from, to] of [
	[require_('@creatorkit/core/dist/core.min.css'), 'core.css'],
	[require_('@creatorkit/ui/dist/ui.min.css'), 'ui.css'],
	[require_('@creatorkit/collections/dist/collections.min.css'), 'collections.css'],
	[require_('@creatorkit/icons/dist/sprite.svg'), 'sprite.svg'],
]) {
	copyFileSync(from, join(out, to));
}

console.log(`youtuber-portfolio → dist/ (${content.videos.length} videos, ${content.writing.length} posts)`);
