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

export const basic = async () => [
	...ignores,
	...(await javascript()),
	...(await node()),
	...(await comments()),
	...(await imports()),
	...(await unicorn()),
	...(await markdown()),
	...(await yml()),
	...(await jsonc()),
	...(await stylistic()),
];

export const all = async () => [
	...(await basic()),
	...(hasTypeScript
		? [...(await typescript()), ...(await typescriptTypecheck())]
		: []),
	...(hasReact ? await react() : []),
	...(hasNextjs ? await nextjs() : []),
	...(hasTailwindcss ? await tailwindcss() : []),
	...(await sortKeys()),
	...(await prettier()),
];

export const nivalis = async (
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
): Promise<FlatESLintConfigItem[]> => {
	const configs = [];

	configs.push(...(await basic()));

	if (enableTypescript) {
		configs.push(...(await typescript()));
	}

	if (enableTypescriptTypecheck) {
		configs.push(...(await typescriptTypecheck()));
	}

	if (enableReact) {
		configs.push(...(await react()));
	}

	if (enableNextjs) {
		configs.push(...(await nextjs()));
	}

	if (enableTailwindcss) {
		configs.push(...(await tailwindcss()));
	}

	if (enableSortKeys) {
		configs.push(...(await sortKeys()));
	}

	if (enablePrettier) {
		configs.push(...(await prettier()));
	}

	// User can optionally pass a flat config item to the first argument
	if (Object.keys(config).length > 0) {
		configs.push(...(Array.isArray(config) ? config : [config]));
	}

	return configs;
};
