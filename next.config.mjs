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

	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
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

	},
	
	eslint: {

		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,

	},

	compiler: {

		
		
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