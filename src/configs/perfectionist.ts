import {pluginPerfectionist} from '../plugins';
import type {FlatConfigItem} from '../types';

/**
 * Optional perfectionist plugin for props and items sorting.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export const perfectionist = (): FlatConfigItem[] => {
	return [
		{
			name: 'nivalis:perfectionist',
			plugins: {
				perfectionist: pluginPerfectionist,
			},
		},
	];
};
