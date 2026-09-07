/**
 * @creatorkit/collections — the creator content types.
 *
 * The part of the kit that knows what an episode is. A dashboard component
 * library has cards; this has a video card that carries a duration, a lesson row
 * that knows its position in a curriculum, and a trip that has a country.
 *
 * These ship as CSS today: `class="c c-video"`. The React components arrive as
 * each type is migrated — see docs/MIGRATION.md.
 */

/** Every content type the kit styles. `.c` plus one of these. */
export const collectionTypes = [
	'video', 'blog', 'course', 'lesson', 'episode', 'series', 'project', 'projectlog',
	'travel', 'trip', 'product', 'shop', 'doc', 'guide', 'newsletter', 'prompt',
	'snippet', 'changelog', 'timeline', 'experience', 'author', 'tag',
] as const;

export type CollectionType = (typeof collectionTypes)[number];

/** The class for a content type: `collectionClass('video')` → `'c c-video'`. */
export const collectionClass = (type: CollectionType) => `c c-${type}`;
