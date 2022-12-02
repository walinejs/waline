const path = require('node:path');

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
    defineProps: 'readonly',
    defineEmits: 'readonly',
    withDefaults: 'readonly',
    VERSION: 'readonly',
  },

  ignorePatterns: ['dist/**'],

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
        project: path.resolve(__dirname, './tsconfig.eslint.json'),
      },

      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          { allowTypedFunctionExpressions: true },
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

        '@typescript-eslint/no-non-null-assertion': 'off',

        '@typescript-eslint/no-unsafe-member-access': 'warn',
      },
    },
    {
      files: '*.vue',
      extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        '@vue/typescript/recommended',
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
          { allowTypedFunctionExpressions: true },
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

        '@typescript-eslint/no-non-null-assertion': 'off',

        'vue/block-lang': ['error', { script: { lang: 'ts' } }],
        'vue/block-tag-newline': 'error',
        'vue/component-api-style': 'error',
        'vue/component-name-in-template-casing': 'error',
        'vue/component-options-name-casing': 'error',
        'vue/custom-event-name-casing': 'error',
        'vue/define-emits-declaration': 'error',
        'vue/define-macros-order': 'error',
        'vue/define-props-declaration': 'error',
        'vue/html-button-has-type': 'error',
        'vue/html-comment-content-newline': 'error',
        'vue/html-comment-content-spacing': 'error',
        'vue/html-comment-indent': 'error',
        'vue/match-component-file-name': 'error',
        'vue/match-component-import-name': 'error',
        'vue/new-line-between-multi-line-property': 'error',
        'vue/next-tick-style': 'error',
        'vue/no-boolean-default': ['warn'],
        'vue/no-duplicate-attr-inheritance': 'error',
        'vue/no-empty-component-block': 'error',
        'vue/no-multiple-objects-in-class': 'error',
        'vue/no-potential-component-option-typo': 'error',
        'vue/no-ref-object-destructure': 'error',
        'vue/no-required-prop-with-default': 'error',
        'vue/no-static-inline-styles': 'error',
        'vue/no-template-target-blank': 'error',
        'vue/no-this-in-before-route-enter': 'error',
        'vue/no-undef-components': 'error',
        'vue/no-undef-properties': ['warn'],
        'vue/no-unsupported-features': 'error',
        'vue/no-unused-properties': 'error',
        'vue/no-unused-refs': 'error',
        'vue/no-useless-mustaches': 'error',
        'vue/no-useless-v-bind': 'error',
        'vue/padding-line-between-blocks': 'error',
        'vue/padding-line-between-tags': 'error',
        'vue/prefer-prop-type-boolean-first': 'error',
        'vue/prefer-separate-static-class': 'error',
        'vue/prefer-true-attribute-shorthand': 'error',
        'vue/require-direct-export': 'error',
        'vue/require-emit-validator': ['warn'],
        'vue/require-expose': 'error',
        'vue/require-name-property': 'error',
        'vue/require-prop-comment': 'error',
        'vue/script-indent': 'error',
        'vue/static-class-names-order': 'error',
        'vue/v-for-delimiter-style': 'error',
      },
    },
  ],
};
