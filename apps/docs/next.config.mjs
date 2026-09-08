/** @type {import('next').NextConfig} */
export default {
	reactStrictMode: true,

	// The kit is a workspace source dependency, not a prebuilt npm package.
	transpilePackages: ['@creatorkit/ui', '@creatorkit/core'],

	// ── Static export ──────────────────────────────────────────────────────
	// Every route in this app already prerenders: `next build` reports nothing
	// but ○ Static and ● SSG, because a documentation site has no per-request
	// state. So it ships as plain files rather than as a server.
	//
	// That is a deliberate departure from the other Cloudflare sites in this
	// workspace, which run Next on workerd through @opennextjs/cloudflare. They
	// need to: they fetch GitHub, Ghost and YouTube per request. This one does
	// not, and putting a server runtime under a static site would buy a cold
	// start and a bill for nothing.
	//
	// If a route here ever needs the server — a search API, an OG image
	// generator — that is the moment to add the OpenNext adapter, not before.
	output: 'export',

	// Export writes files, so a route needs a real path: /docs/tokens becomes
	// /docs/tokens/index.html rather than /docs/tokens.html.
	trailingSlash: true,

	// next/image needs a server to optimise. Nothing here uses it today; this
	// keeps the export working if something does.
	images: { unoptimized: true },
};
