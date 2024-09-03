import * as plugin from '../plugin';

export const nivalisCustom = () => [
  {
    name: 'nivalis/custom',
    plugins: { nivalis: plugin },
    rules: {
      'nivalis/dprint': [
        'error',
        {
          config: {
            useTabs: false,
            quoteStyle: 'preferSingle',
            quoteProps: 'asNeeded',
            semiColons: 'prefer',
            properties: {
              lineWidth: 80,
            },
          },
        },
      ],
    },
  },
];
