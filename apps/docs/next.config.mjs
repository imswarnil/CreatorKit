/** @type {import('next').NextConfig} */
export default {
	reactStrictMode: true,
	// The kit is a workspace source dependency, not a prebuilt npm package.
	transpilePackages: ['@creatorkit/ui', '@creatorkit/core'],
};
