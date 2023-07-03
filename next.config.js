const CopyPlugin = require("copy-webpack-plugin");

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
	reactStrictMode: true,
	output: 'standalone',
	devIndicators: {
		buildActivityPosition: 'bottom-right',
	},
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

})
