import { isPackageExists } from 'local-pkg';
import { interopDefault } from '../utils';
import { GLOB_JSX, GLOB_TSX } from '../globs';
import type {
	FlatConfigItem,
	OptionsFiles,
	OptionsHasTypeScript,
	OptionsOverrides,
} from '../types';

// react refresh
const ReactRefreshAllowPackages = ['vite'];

export const react = async (
	options: OptionsHasTypeScript & OptionsOverrides & OptionsFiles = {},
): Promise<FlatConfigItem[]> => {
	const {
		files = [GLOB_JSX, GLOB_TSX],
		overrides = {},
		typescript = true,
	} = options;

	const [pluginA11y, pluginReact, pluginReactHooks, pluginReactRefresh]
	= await Promise.all([
		interopDefault(import('eslint-plugin-jsx-a11y')),
		interopDefault(import('eslint-plugin-react')),
		interopDefault(import('eslint-plugin-react-hooks')),
		interopDefault(import('eslint-plugin-react-refresh')),
	] as const);

	const isAllowConstantExport = ReactRefreshAllowPackages.some(i =>
		isPackageExists(i),
	);

	return [
		{
			name: 'nivalis:react:setup',
			plugins: {
				'jsx-a11y': pluginA11y,
				react: pluginReact,
				'react-hooks': pluginReactHooks,
				'react-refresh': pluginReactRefresh,
			},
			settings: {
				react: {
					version: 'detect',
				},
			},
		},
		{
			files,
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
			},
			name: 'nivalis:react:rules',
			rules: {
				// react-hooks
				'react-hooks/exhaustive-deps': 'warn',
				'react-hooks/rules-of-hooks': 'error',

				// react refresh
				'react-refresh/only-export-components': [
					'warn',
					{ allowConstantExport: isAllowConstantExport },
				],

				// recommended rules react
				'react/display-name': 'error',
				'react/jsx-key': 'error',
				'react/jsx-no-comment-textnodes': 'error',
				'react/jsx-no-duplicate-props': 'error',
				'react/jsx-no-target-blank': 'error',
				'react/jsx-no-undef': 'error',
				'react/jsx-uses-react': 'error',
				'react/jsx-uses-vars': 'error',
				'react/no-children-prop': 'error',
				'react/no-danger-with-children': 'error',
				'react/no-deprecated': 'error',
				'react/no-direct-mutation-state': 'error',
				'react/no-find-dom-node': 'error',
				'react/no-is-mounted': 'error',
				'react/no-render-return-value': 'error',
				'react/no-string-refs': 'error',
				'react/no-unescaped-entities': 'error',
				'react/no-unknown-property': 'error',
				'react/no-unsafe': 'off',
				'react/prop-types': 'error',
				'react/react-in-jsx-scope': 'off',
				'react/require-render-return': 'error',

				...(typescript
					? {
							'react/jsx-no-undef': 'off',
							'react/prop-type': 'off',
						}
					: {}),

				// a11y rules
				'jsx-a11y/accessible-emoji': ['warn'],
				'jsx-a11y/alt-text': [
					'warn',
					{
						area: [],
						elements: ['img', 'object', 'area', 'input[type="image"]'],
						img: [],
						'input[type="image"]': [],
						object: [],
					},
				],
				'jsx-a11y/anchor-has-content': ['warn', { components: [] }],
				'jsx-a11y/anchor-is-valid': [
					'warn',
					{
						aspects: ['noHref', 'invalidHref', 'preferButton'],
						components: ['Link'],
						specialLink: ['to'],
					},
				],
				'jsx-a11y/aria-activedescendant-has-tabindex': ['warn'],
				'jsx-a11y/aria-props': ['warn'],
				'jsx-a11y/aria-proptypes': ['warn'],
				'jsx-a11y/aria-role': ['warn', { ignoreNonDOM: false }],
				'jsx-a11y/aria-unsupported-elements': ['warn'],
				'jsx-a11y/autocomplete-valid': ['off', { inputComponents: [] }],
				'jsx-a11y/click-events-have-key-events': ['warn'],
				'jsx-a11y/control-has-associated-label': [
					'warn',
					{
						controlComponents: [],
						depth: 5,
						ignoreElements: [
							'audio',
							'canvas',
							'embed',
							'input',
							'textarea',
							'tr',
							'video',
						],
						ignoreRoles: [
							'grid',
							'listbox',
							'menu',
							'menubar',
							'radiogroup',
							'row',
							'tablist',
							'toolbar',
							'tree',
							'treegrid',
						],
						labelAttributes: ['label'],
					},
				],
				'jsx-a11y/heading-has-content': ['warn', { components: [''] }],
				'jsx-a11y/html-has-lang': ['warn'],
				'jsx-a11y/iframe-has-title': ['warn'],
				'jsx-a11y/img-redundant-alt': ['warn'],
				'jsx-a11y/interactive-supports-focus': ['warn'],
				'jsx-a11y/label-has-associated-control': [
					'warn',
					{
						assert: 'both',
						controlComponents: [],
						depth: 25,
						labelAttributes: [],
						labelComponents: [],
					},
				],
				'jsx-a11y/label-has-for': [
					'off',
					{
						allowChildren: false,
						components: [],
						required: {
							every: ['nesting', 'id'],
						},
					},
				],
				'jsx-a11y/lang': ['warn'],
				'jsx-a11y/media-has-caption': [
					'warn',
					{
						audio: [],
						track: [],
						video: [],
					},
				],
				'jsx-a11y/mouse-events-have-key-events': ['warn'],
				'jsx-a11y/no-access-key': ['warn'],
				'jsx-a11y/no-autofocus': ['warn', { ignoreNonDOM: true }],
				'jsx-a11y/no-distracting-elements': [
					'warn',
					{ elements: ['marquee', 'blink'] },
				],
				'jsx-a11y/no-interactive-element-to-noninteractive-role': [
					'warn',
					{ tr: ['none', 'presentation'] },
				],
				'jsx-a11y/no-noninteractive-element-interactions': [
					'warn',
					{
						handlers: [
							'onClick',
							'onMouseDown',
							'onMouseUp',
							'onKeyPress',
							'onKeyDown',
							'onKeyUp',
						],
					},
				],
				'jsx-a11y/no-noninteractive-element-to-interactive-role': [
					'warn',
					{
						li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
						ol: [
							'listbox',
							'menu',
							'menubar',
							'radiogroup',
							'tablist',
							'tree',
							'treegrid',
						],
						table: ['grid'],
						td: ['gridcell'],
						ul: [
							'listbox',
							'menu',
							'menubar',
							'radiogroup',
							'tablist',
							'tree',
							'treegrid',
						],
					},
				],
				'jsx-a11y/no-noninteractive-tabindex': [
					'warn',
					{ roles: ['tabpanel'], tags: [] },
				],
				'jsx-a11y/no-onchange': ['off'],
				'jsx-a11y/no-redundant-roles': ['warn'],
				'jsx-a11y/no-static-element-interactions': [
					'off',
					{
						handlers: [
							'onClick',
							'onMouseDown',
							'onMouseUp',
							'onKeyPress',
							'onKeyDown',
							'onKeyUp',
						],
					},
				],
				'jsx-a11y/role-has-required-aria-props': ['warn'],
				'jsx-a11y/role-supports-aria-props': ['warn'],
				'jsx-a11y/scope': ['warn'],
				'jsx-a11y/tabindex-no-positive': ['warn'],

				// overrides
				...overrides,
			},
		},
	];
};
