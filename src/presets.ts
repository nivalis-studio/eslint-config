import fs from 'node:fs';
import {
	comments,
	graphql,
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
import {prettierStylistic} from './configs/stylistic';
import {
	hasGraphql,
	hasNextjs,
	hasReact,
	hasTailwindcss,
	hasTypeScript,
} from './env';
import {interopDefault} from './interop';
import type {FlatESLintConfig} from 'eslint-define-config';

export const basic = async () => [
	...ignores,
	...javascript(),
	...node(),
	...comments(),
	...imports(),
	...unicorn(),
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
	...(hasGraphql ? await graphql() : []),
	...(await sortKeys()),
	...(await prettier()),
	...prettierStylistic(),
];

export const nivalis = async (
	config: FlatESLintConfig | FlatESLintConfig[] = [],
	{
		gitignore: enableGitignore = true,
		prettier: enablePrettier = true,
		sortKeys: enableSortKeys = true,
		typescript: enableTypescript = hasTypeScript,
		typescriptTypecheck: enableTypescriptTypecheck = true,
		react: enableReact = hasReact,
		nextjs: enableNextjs = hasNextjs,
		tailwindcss: enableTailwindcss = hasTailwindcss,
		graphql: enableGraphql = hasGraphql,
	}: Partial<{
		gitignore: boolean;
		prettier: boolean;
		sortKeys: boolean;
		typescript: boolean;
		typescriptTypecheck: boolean;
		react: boolean;
		nextjs: boolean;
		tailwindcss: boolean;
		graphql: boolean;
	}> = {},
): Promise<FlatESLintConfig[]> => {
	const configs: FlatESLintConfig[] = [];

	if (enableGitignore && fs.existsSync('.gitignore')) {
		configs.push(
			(
				interopDefault(
					await import('eslint-config-flat-gitignore'),
				) as () => FlatESLintConfig
			)(),
		);
	}

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

	if (enableGraphql) {
		configs.push(...(await graphql()));
	}

	if (enableSortKeys) {
		configs.push(...(await sortKeys()));
	}

	if (enablePrettier) {
		configs.push(...(await prettier()), ...prettierStylistic());
	}

	// User can optionally pass a flat config item to the first argument
	if (Object.keys(config).length > 0) {
		configs.push(...(Array.isArray(config) ? config : [config]));
	}

	return configs;
};
