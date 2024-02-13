/* eslint-disable max-lines-per-function */
import {isPackageExists} from 'local-pkg';
import {interopDefault} from '../utils';
import {GLOB_REACT} from '../globs';
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
	const {files = [GLOB_REACT], overrides = {}, typescript = true} = options;

	const [pluginA11y, pluginReact, pluginReactHooks, pluginReactRefresh] =
		await Promise.all([
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
					{allowConstantExport: isAllowConstantExport},
				],

				// recommended rules react
				'react/boolean-prop-naming': [
					'warn',
					{
						rule: '^(is|has|are|can|should|did|will)[A-Z]([A-Za-z0-9])+',
						validateNested: true,
					},
				],
				'react/button-has-type': [
					'error',
					{
						button: true,
						reset: false,
						submit: true,
					},
				],
				'react/display-name': [
					'error',
					{
						ignoreTranspilerName: false,
					},
				],
				'react/function-component-definition': [
					'error',
					{
						namedComponents: 'arrow-function',
						unnamedComponents: 'arrow-function',
					},
				],
				'react/hook-use-state': ['error'],
				'react/iframe-missing-sandbox': ['error'],
				'react/jsx-boolean-value': ['error', 'never'],
				'react/jsx-filename-extension': [
					'warn',
					{
						extensions: ['.tsx'],
					},
				],
				'react/jsx-fragments': ['error', 'syntax'],
				'react/jsx-handler-names': [
					'error',
					{
						eventHandlerPrefix: 'handle',
						eventHandlerPropPrefix: 'on',
					},
				],
				'react/jsx-key': [
					'error',
					{
						checkFragmentShorthand: true,
						checkKeyMustBeforeSpread: true,
						warnOnDuplicates: true,
					},
				],
				'react/jsx-no-bind': [
					'error',
					{
						allowArrowFunctions: true,
						allowBind: false,
						allowFunctions: false,
						ignoreDOMComponents: false,
						ignoreRefs: false,
					},
				],
				'react/jsx-no-comment-textnodes': 'error',
				'react/jsx-no-constructed-context-values': 'error',
				'react/jsx-no-duplicate-props': [
					'error',
					{
						ignoreCase: false,
					},
				],
				'react/jsx-no-leaked-render': ['error'],
				'react/jsx-no-script-url': [
					'error',
					[
						{
							name: 'Link',
							props: ['to'],
						},
					],
				],
				'react/jsx-no-target-blank': [
					'error',
					{
						forms: true,
						links: true,
						warnOnSpreadAttributes: true,
					},
				],
				'react/jsx-no-undef': 'error',
				'react/jsx-no-useless-fragment': 'error',
				'react/jsx-uses-react': 'error',
				'react/jsx-uses-vars': 'error',
				'react/no-access-state-in-setstate': 'error',
				'react/no-array-index-key': 'error',
				'react/no-arrow-function-lifecycle': 'error',
				'react/no-children-prop': 'error',
				'react/no-danger': 'error',
				'react/no-danger-with-children': 'error',
				'react/no-deprecated': 'error',
				'react/no-did-update-set-state': 'error',
				'react/no-direct-mutation-state': 'error',
				'react/no-find-dom-node': 'error',
				'react/no-invalid-html-attribute': 'error',
				'react/no-is-mounted': 'error',
				'react/no-namespace': 'error',
				'react/no-object-type-as-default-prop': 'error',
				'react/no-redundant-should-component-update': 'error',
				'react/no-render-return-value': 'error',
				'react/no-string-refs': [
					'error',
					{
						noTemplateLiterals: true,
					},
				],
				'react/no-this-in-sfc': ['error'],
				'react/no-typos': ['error'],
				'react/no-unescaped-entities': 'error',
				'react/no-unknown-property': 'error',
				'react/no-unstable-nested-components': ['error'],
				'react/no-unused-class-component-methods': ['error'],
				'react/no-unused-prop-types': [
					'error',
					{
						customValidators: [],
						skipShapeProps: true,
					},
				],
				'react/no-unused-state': ['error'],
				'react/no-will-update-set-state': ['error'],
				'react/prefer-es6-class': ['error', 'always'],
				'react/prefer-exact-props': ['error'],
				'react/prefer-read-only-props': ['error'],
				'react/prefer-stateless-function': [
					'error',
					{
						ignorePureComponents: true,
					},
				],
				'react/prop-types': [
					'error',
					{
						customValidators: [],
						ignore: [],
						skipUndeclared: false,
					},
				],
				'react/react-in-jsx-scope': 'off',
				'react/require-render-return': 'error',
				'react/self-closing-comp': [
					'error',
					{
						component: true,
						html: true,
					},
				],
				'react/sort-default-props': ['error'],
				'react/state-in-constructor': ['error', 'never'],
				'react/static-property-placement': ['error', 'property assignment'],
				'react/style-prop-object': [
					'error',
					{
						allow: ['FormattedNumber'],
					},
				],
				'react/void-dom-elements-no-children': ['error'],

				'style/jsx-curly-brace-presence': [
					'error',
					{
						children: 'ignore',
						propElementValues: 'always',
						props: 'never',
					},
				],

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
				'jsx-a11y/anchor-has-content': ['warn', {components: []}],
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
				'jsx-a11y/aria-role': ['warn', {ignoreNonDOM: false}],
				'jsx-a11y/aria-unsupported-elements': ['warn'],
				'jsx-a11y/autocomplete-valid': ['off', {inputComponents: []}],
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
				'jsx-a11y/heading-has-content': ['warn', {components: ['']}],
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
				'jsx-a11y/no-autofocus': ['warn', {ignoreNonDOM: true}],
				'jsx-a11y/no-distracting-elements': [
					'warn',
					{elements: ['marquee', 'blink']},
				],
				'jsx-a11y/no-interactive-element-to-noninteractive-role': [
					'warn',
					{tr: ['none', 'presentation']},
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
					{roles: ['tabpanel'], tags: []},
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
