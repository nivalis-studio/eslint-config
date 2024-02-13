import {isPackageExists} from 'local-pkg';
import type {Awaitable, UserConfigItem} from './types';

export const parserPlain = {
	meta: {
		name: 'parser-plain',
	},
	parseForESLint: (code: string) => ({
		ast: {
			body: [],
			comments: [],
			loc: {end: code.length, start: 0},
			range: [0, code.length],
			tokens: [],
			type: 'Program',
		},
		scopeManager: null,
		services: {isPlain: true},
		visitorKeys: {
			Program: [],
		},
	}),
};

/**
 * Combine array and non-array configs into a single array.
 */
export const combine = async (
	...configs: Array<Awaitable<UserConfigItem | UserConfigItem[]>>
): Promise<UserConfigItem[]> => {
	const resolved = await Promise.all(configs);

	return resolved.flat();
};

export const renameRules = (
	rules: {[key: string]: any},
	from: string,
	to: string,
) => {
	return Object.fromEntries(
		Object.entries(rules).map(([key, value]) => {
			if (key.startsWith(from)) {
				return [to + key.slice(from.length), value];
			}

			return [key, value];
		}),
	);
};

export const toArray = <T>(value: T | T[]): T[] => {
	return Array.isArray(value) ? value : [value];
};

export const interopDefault = async <T>(
	mod: Awaitable<T>,
): Promise<T extends {default: infer U} ? U : T> => {
	const resolved = await mod;

	// eslint-disable-next-line ts/no-unsafe-return, ts/no-unsafe-member-access
	return (resolved as any).default || resolved;
};

export const ensurePackages = (packages: string[]) => {
	if (process.env.CI || !process.stdout.isTTY) {
		return;
	}

	const nonExistingPackages = packages.filter(i => !isPackageExists(i));

	if (nonExistingPackages.length === 0) {
		return;
	}

	throw new Error(
		`This package(s) are required for this config: ${nonExistingPackages.join(', ')}. Please install them.`,
	);
};
