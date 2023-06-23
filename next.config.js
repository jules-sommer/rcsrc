const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
module.exports = {
	output: 'standalone',
	experimental: {
		appDir: true,
		serverActions: true,
		webVitalsAttribution: ['CLS', 'LCP']
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},

	images: {
		remotePatterns: [
			{
			protocol: 'https',
			hostname: 'pubchem.ncbi.nlm.nih.gov',
			port: '',
			pathname: '/**',
			},
		],
	}

}
