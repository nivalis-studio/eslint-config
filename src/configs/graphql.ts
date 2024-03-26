import { ensurePackages, interopDefault } from '../utils';
import { GLOB_GRAPHQL } from '../globs';
import type { FlatConfigItem, OptionsOverrides } from '../types';

export const graphql = async (
  options: OptionsOverrides = {},
): Promise<FlatConfigItem[]> => {
  ensurePackages(['@graphql-eslint/eslint-plugin']);
  const pluginGraphql = await interopDefault(
    import('@graphql-eslint/eslint-plugin'),
  );

  const { overrides = {} } = options;

  return [
    {
      files: [GLOB_GRAPHQL],
      languageOptions: {
        parser: pluginGraphql,
      },
      plugins: {
        '@graphql-eslint': pluginGraphql,
      },
      rules: {
        '@graphql-eslint/alphabetize': [
          'error',
          {
            arguments: [
              'FieldDefinition',
              'Field',
              'DirectiveDefinition',
              'Directive',
            ],
            fields: [
              'ObjectTypeDefinition',
              'InterfaceTypeDefinition',
              'InputObjectTypeDefinition',
            ],
            selections: ['OperationDefinition', 'FragmentDefinition'],
            values: ['EnumTypeDefinition'],
            variables: ['OperationDefinition'],
          },
        ],
        '@graphql-eslint/fields-on-correct-type': 'error',
        '@graphql-eslint/fragments-on-composite-type': 'error',
        '@graphql-eslint/input-name': 'error',
        '@graphql-eslint/known-argument-names': 'error',
        '@graphql-eslint/known-directives': 'error',
        '@graphql-eslint/known-type-names': 'error',
        '@graphql-eslint/lone-anonymous-operation': 'error',
        '@graphql-eslint/lone-schema-definition': 'error',
        '@graphql-eslint/match-document-filename': [
          'error',
          {
            fileExtension: '.graphql',
          },
        ],
        '@graphql-eslint/naming-convention': [
          'error',
          {
            EnumTypeDefinition: 'PascalCase',
            EnumValueDefinition: 'UPPER_CASE',
            FieldDefinition: 'camelCase',
            InputObjectTypeDefinition: 'PascalCase',
            InputValueDefinition: 'camelCase',
            InterfaceTypeDefinition: 'PascalCase',
            ObjectTypeDefinition: 'PascalCase',
            ScalarTypeDefinition: 'PascalCase',
            UnionTypeDefinition: 'PascalCase',
          },
        ],
        '@graphql-eslint/no-anonymous-operations': 'error',
        '@graphql-eslint/no-case-insensitive-enum-values-duplicates': 'error',
        '@graphql-eslint/no-deprecated': 'error',
        '@graphql-eslint/no-duplicate-fields': 'error',
        '@graphql-eslint/no-fragment-cycles': 'error',
        '@graphql-eslint/no-hashtag-description': 'error',
        '@graphql-eslint/no-scalar-result-type-on-mutation': 'error',
        '@graphql-eslint/no-typename-prefix': 'error',
        '@graphql-eslint/no-unreachable-types': 'error',
        '@graphql-eslint/one-field-subscriptions': 'error',
        '@graphql-eslint/overlapping-fields-can-be-merged': 'error',
        '@graphql-eslint/possible-fragment-spread': 'error',
        '@graphql-eslint/possible-type-extension': 'error',
        '@graphql-eslint/provided-required-arguments': 'error',
        '@graphql-eslint/require-deprecation-reason': 'error',
        '@graphql-eslint/scalar-leafs': 'error',
        '@graphql-eslint/unique-argument-names': 'error',
        '@graphql-eslint/unique-directive-names': 'error',
        '@graphql-eslint/unique-directive-names-per-location': 'error',
        '@graphql-eslint/unique-enum-value-names': 'error',
        '@graphql-eslint/unique-field-definition-names': 'error',
        '@graphql-eslint/unique-input-field-names': 'error',
        '@graphql-eslint/unique-operation-types': 'error',
        '@graphql-eslint/unique-type-names': 'error',
        '@graphql-eslint/unique-variable-names': 'error',
        '@graphql-eslint/value-literals-of-correct-type': 'error',
        '@graphql-eslint/variables-are-input-types': 'error',
        '@graphql-eslint/variables-in-allowed-position': 'error',
        ...overrides,
      },
    },
  ];
};
