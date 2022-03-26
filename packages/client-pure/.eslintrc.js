const path = require('path');

module.exports = {
  env: {
    browser: true,
  },

  parser: '@babel/eslint-parser',

  parserOptions: {
    babelOptions: {
      configFile: path.resolve(__dirname, '.babelrc'),
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },

  globals: {
    VERSION: 'readonly',
  },

  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
      ],

      plugins: ['@typescript-eslint'],

      parser: '@typescript-eslint/parser',

      parserOptions: {
        project: path.resolve(__dirname, './tsconfig.json'),
      },

      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowTypedFunctionExpressions: true,
          },
        ],
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: ['variable', 'parameter'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'property',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
        ],

        '@typescript-eslint/no-explicit-any': [
          'warn',
          { ignoreRestArgs: true },
        ],

        '@typescript-eslint/no-unsafe-member-access': 'warn',
      },
    },
    {
      files: '*.vue',
      extends: [
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
      ],
      plugins: ['@typescript-eslint'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        extraFileExtensions: ['.vue'],
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowTypedFunctionExpressions: true,
          },
        ],

        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: ['variable', 'parameter'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'property',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
        ],

        '@typescript-eslint/no-explicit-any': [
          'warn',
          {
            ignoreRestArgs: true,
          },
        ],
      },
    },
  ],
};
