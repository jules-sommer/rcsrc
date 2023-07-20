import CopyPlugin from "copy-webpack-plugin";
import million from 'million/compiler';
import withBundleAnalyzer from '@next/bundle-analyzer'
/*
withBundleAnalyzer()({
	enabled: process.env.ANALYZE === 'true',
})
*/

/** @type {import('next').NextConfig} */
const NextConfig = {

	reactStrictMode: false,
	output: 'standalone',
	basePath: '/',

	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,

	},

	swcMinify: true,

	modularizeImports: {
		lodash: {
			transform: 'lodash/{{member}}',
			preventFullImport: true,
		},
	},

	compiler: {
		styledComponents: {
			// Enabled by default in development, disabled in production to reduce file size,
			// setting this will override the default for all environments.
			displayName: true,
			// Enabled by default.
			ssr: true,
			// Enabled by default.
			fileName: true,
			// Empty by default.
			topLevelImportPaths: [],
			// Defaults to ["index"].
			meaninglessFileNames: ["index"],
			// Enabled by default.
			cssProp: true,
			// Empty by default.
			namespace: "",
			// Not supported yet.
			minify: true,
			// Not supported yet.
			transpileTemplateLiterals: true,
			// Not supported yet.
			pure: true,
		},
	},

	cron: [
		{
			"path": '/api/cron',
			"schedule": "0 10 * * *"
		}
	],

	devIndicators: {
		buildActivityPosition: 'bottom-right',
	},

	experimental: {

		appDir: true,
		serverActions: true,
		webVitalsAttribution: ['CLS', 'LCP'],
		swcTraceProfiling: true,

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

			{

				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				port: '',
				pathname: '/**'

			},

			{

				protocol: 'https',
				hostname: 'api.dicebear.com',
				port: '',
				pathname: '/**'

			}

		],

	}

}

export default million.next(NextConfig);