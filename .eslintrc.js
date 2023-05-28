module.exports = {
	root: true,
	rules: {
		'linebreak-style': [0, 'windows'],
		indent: [2, 'tab'],
		'no-tabs': [1, { allowIndentationTabs: true }],
		'react/jsx-indent': [1, 'tab'],
		'react/jsx-indent-props': [1, 'tab'],
		'padded-blocks': [2, 'always', { allowSingleLineBlocks: true }],
		'react/function-component-definition': [1, { namedComponents: 'arrow-function' }],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},

	env: {
		browser: true,
		es2021: true,
	},

	extends: [
		'plugin:react/recommended',
		'next',
		'next/core-web-vitals',
		'airbnb',

	],

	ignorePatterns: ['node_modules', 'dist'],

	overrides: [

	],

	parserOptions: {

		ecmaVersion: 'latest',
		sourceType: 'module',
		babelOptions: {
			presets: [require.resolve('next/babel')],
		},

	},

	plugins: [
		'react',
	],

};
