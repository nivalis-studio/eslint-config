import {
	comments,
	ignores,
	imports,
	javascript,
	jsonc,
	markdown,
	nextjs,
	node,
	prettier,
	react,
	sortKeys,
	stylistic,
	tailwindcss,
	typescript,
	typescriptTypecheck,
	unicorn,
	yml,
} from './configs';
import {hasNextjs, hasReact, hasTailwindcss, hasTypeScript} from './env';
import type {FlatESLintConfigItem} from 'eslint-define-config';

export const basic = [
	...ignores,
	...javascript,
	...node,
	...comments,
	...imports,
	...unicorn,
	...markdown,
	...yml,
	...jsonc,
	...stylistic,
];

export const all = [
	...basic,
	...(hasTypeScript ? [...typescript, ...typescriptTypecheck] : []),
	...(hasReact ? react : []),
	...(hasNextjs ? nextjs : []),
	...(hasTailwindcss ? tailwindcss : []),
	...sortKeys,
	...prettier,
];

export const nivalis = (
	config: FlatESLintConfigItem | FlatESLintConfigItem[] = [],
	{
		prettier: enablePrettier = true,
		sortKeys: enableSortKeys = true,
		typescript: enableTypescript = hasTypeScript,
		typescriptTypecheck: enableTypescriptTypecheck = true,
		react: enableReact = hasReact,
		nextjs: enableNextjs = hasNextjs,
		tailwindcss: enableTailwindcss = hasTailwindcss,
	}: Partial<{
		prettier: boolean;
		sortKeys: boolean;
		typescript: boolean;
		typescriptTypecheck: boolean;
		react: boolean;
		nextjs: boolean;
		tailwindcss: boolean;
	}> = {},
): FlatESLintConfigItem[] => {
	const configs = [];

	configs.push(...basic);

	if (enableTypescript) {
		configs.push(...typescript);
	}

	if (enableTypescriptTypecheck) {
		configs.push(...typescriptTypecheck);
	}

	if (enableReact) {
		configs.push(...react);
	}

	if (enableNextjs) {
		configs.push(...nextjs);
	}

	if (enableTailwindcss) {
		configs.push(...tailwindcss);
	}

	if (enableSortKeys) {
		configs.push(...sortKeys);
	}

	if (enablePrettier) {
		configs.push(...prettier);
	}

	// User can optionally pass a flat config item to the first argument
	if (Object.keys(config).length > 0) {
		configs.push(...(Array.isArray(config) ? config : [config]));
	}

	return configs;
};
