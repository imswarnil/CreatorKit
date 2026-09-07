/**
 * @creatorkit/broadcast — what ships to YouTube and Instagram.
 *
 * Thumbnails, series art, in-video scenes, lower thirds, engagement overlays,
 * channel branding and the backdrops they compose from.
 *
 * **This never goes in a site bundle.** It is export art: sizes are in container
 * units because a thumbnail has no browser context to inherit from, and the
 * canvases are fixed aspect ratios meant to be screenshotted, not scrolled.
 */

/** The canvases, with the aspect each is exported at. */
export const surfaces = {
	thumb: '16 / 9',
	short: '9 / 16',
	story: '9 / 16',
	square: '1 / 1',
	banner: '16 / 9',
	scene: '16 / 9',
	slate: '16 / 9',
} as const;

export type Surface = keyof typeof surfaces;
