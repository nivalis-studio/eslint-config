import pluginUnicorn from 'eslint-plugin-unicorn';
import {GLOB_SRC} from '../globs';
import type {FlatESLintConfig} from 'eslint-define-config';

// eslint-disable-next-line max-lines-per-function
export const unicorn = (): FlatESLintConfig[] => {
	return [
		{
			files: [GLOB_SRC],
			plugins: {
				unicorn: pluginUnicorn,
			},
			rules: {
				'no-process-exit': 'off',
				'unicorn/better-regex': [
					'error',
					{
						sortCharacterClasses: false,
					},
				],
				'unicorn/catch-error-name': 'error',
				'unicorn/custom-error-definition': 'error',
				'unicorn/error-message': 'error',
				'unicorn/escape-case': 'error',
				'unicorn/expiring-todo-comments': 'error',
				'unicorn/explicit-length-check': 'error',
				'unicorn/filename-case': [
					'warn',
					{
						cases: {kebabCase: true, pascalCase: true},
						ignore: [/^[A-Z]+\..*$/],
					},
				],
				'unicorn/import-style': 'error',
				'unicorn/new-for-builtins': 'error',
				'unicorn/no-abusive-eslint-disable': 'error',
				'unicorn/no-array-callback-reference': 'off',
				'unicorn/no-array-for-each': 'warn',
				'unicorn/no-array-method-this-argument': 'error',
				'unicorn/no-array-push-push': 'error',
				'unicorn/no-array-reduce': 'off',
				'unicorn/no-await-expression-member': 'error',
				'unicorn/no-console-spaces': 'error',
				'unicorn/no-document-cookie': 'error',
				'unicorn/no-empty-file': 'error',
				'unicorn/no-for-loop': 'error',
				'unicorn/no-hex-escape': 'error',
				'unicorn/no-instanceof-array': 'error',
				'unicorn/no-invalid-remove-event-listener': 'error',
				'unicorn/no-lonely-if': 'error',
				'unicorn/no-new-array': 'error',
				'unicorn/no-new-buffer': 'error',
				'unicorn/no-null': 'off',
				'unicorn/no-object-as-default-parameter': 'error',
				'unicorn/no-process-exit': 'error',
				'unicorn/no-static-only-class': 'error',
				'unicorn/no-this-assignment': 'error',
				'unicorn/no-unnecessary-await': 'error',
				'unicorn/no-unreadable-array-destructuring': 'error',
				'unicorn/no-unreadable-iife': 'error',
				'unicorn/no-useless-fallback-in-spread': 'error',
				'unicorn/no-useless-length-check': 'error',
				'unicorn/no-useless-promise-resolve-reject': 'error',
				'unicorn/no-useless-spread': 'error',
				'unicorn/no-useless-switch-case': 'error',
				'unicorn/no-zero-fractions': 'error',
				'unicorn/numeric-separators-style': 'error',
				'unicorn/prefer-add-event-listener': 'error',
				'unicorn/prefer-array-find': 'error',
				'unicorn/prefer-array-flat': 'error',
				'unicorn/prefer-array-flat-map': 'error',
				'unicorn/prefer-array-index-of': 'error',
				'unicorn/prefer-array-some': 'error',
				'unicorn/prefer-at': 'error',
				'unicorn/prefer-blob-reading-methods': 'error',
				'unicorn/prefer-code-point': 'error',
				'unicorn/prefer-date-now': 'error',
				'unicorn/prefer-default-parameters': 'error',
				'unicorn/prefer-dom-node-append': 'error',
				'unicorn/prefer-dom-node-dataset': 'error',
				'unicorn/prefer-dom-node-remove': 'error',
				'unicorn/prefer-dom-node-text-content': 'error',
				'unicorn/prefer-export-from': 'error',
				'unicorn/prefer-includes': 'error',
				'unicorn/prefer-keyboard-event-key': 'error',
				'unicorn/prefer-logical-operator-over-ternary': 'error',
				'unicorn/prefer-math-trunc': 'error',
				'unicorn/prefer-modern-dom-apis': 'error',
				'unicorn/prefer-modern-math-apis': 'error',
				'unicorn/prefer-module': 'error',
				'unicorn/prefer-negative-index': 'error',
				'unicorn/prefer-node-protocol': 'error',
				'unicorn/prefer-number-properties': 'error',
				'unicorn/prefer-object-from-entries': 'error',
				'unicorn/prefer-optional-catch-binding': 'error',
				'unicorn/prefer-prototype-methods': 'error',
				'unicorn/prefer-query-selector': 'error',
				'unicorn/prefer-reflect-apply': 'error',
				'unicorn/prefer-regexp-test': 'error',
				'unicorn/prefer-set-has': 'error',
				'unicorn/prefer-spread': 'error',
				'unicorn/prefer-string-replace-all': 'error',
				'unicorn/prefer-string-slice': 'error',
				'unicorn/prefer-string-starts-ends-with': 'error',
				'unicorn/prefer-string-trim-start-end': 'error',
				'unicorn/prefer-switch': 'error',
				'unicorn/prefer-ternary': ['error', 'only-single-line'],
				'unicorn/prefer-top-level-await': 'error',
				'unicorn/prefer-type-error': 'error',
				// https://github.com/xojs/xo/blob/main/config/plugins.cjs#L38
				'unicorn/prevent-abbreviations': [
					'error',
					{
						checkFilenames: false,
						checkDefaultAndNamespaceImports: false,
						checkShorthandImports: false,
						extendDefaultReplacements: true,
						replacements: {
							// https://thenextweb.com/dd/2020/07/13/linux-kernel-will-no-longer-use-terms-blacklist-and-slave/
							whitelist: {
								include: true,
							},
							blacklist: {
								exclude: true,
							},
							master: {
								main: true,
							},
							slave: {
								secondary: true,
							},

							// Reverse.
							application: {
								app: true,
							},
							applications: {
								apps: true,
							},

							// Disable some that may be too annoying.
							env: false,
							i: false, // Do it at some point, but not ready for it yet. Maybe 2025.

							// Not part of `eslint-plugin-unicorn`. Upstream them at some point.
							bin: {
								binary: true,
							},
							eof: {
								endOfFile: true,
							},
							impl: {
								implement: true,
								implementation: true,
							},
							anim: {
								animation: true,
							},
							calc: {
								calculate: true,
							},
							dict: {
								dictionary: true,
							},
							dup: {
								duplicate: true,
							},
							enc: {
								encode: true,
								encryption: true,
							},
							gen: {
								generate: true,
								general: true,
							},
							gfx: {
								graphics: true,
							},
							inc: {
								increment: true,
							},
							iter: {
								iterate: true,
								iterator: true,
							},
							nav: {
								navigate: true,
								navigation: true,
							},
							norm: {
								normalize: true,
							},
							notif: {
								notification: true,
							},
							perf: {
								performance: true,
							},
							proc: {
								process: true,
							},
							rand: {
								random: true,
							},
							sys: {
								system: true,
							},
							temp: {
								temporary: true,
							},
						},
					},
				],
				'unicorn/relative-url-style': 'error',
				'unicorn/require-array-join-separator': 'error',
				'unicorn/require-number-to-fixed-digits-argument': 'error',
				'unicorn/string-content': [
					'error',
					{
						patterns: {
							'(?!(?=.*(0.0.0.0|127.0.0.1|localhost|www.w3.org)))^http:': {
								message: 'Please use `https` for better security.`.',
								suggest: 'https:',
							},
						},
					},
				],
				'unicorn/switch-case-braces': 'error',
				'unicorn/template-indent': ['warn', {indent: '\t'}],
				'unicorn/text-encoding-identifier-case': 'error',
				'unicorn/throw-new-error': 'error',
			},
		},
	];
};
