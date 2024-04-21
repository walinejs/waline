// @ts-check
import js from '@eslint/js';
import eslintImport from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import vitest from 'eslint-plugin-vitest';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  // @ts-expect-error: The type does not fit
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: [
      '**/.vuepress/.cache/**',
      '**/.vuepress/.temp/**',
      // FIXME: Handle alias correctly
      '**/.vuepress/components/**',
      // FIXME: Correctly type these files
      '**/.vuepress/utils/transform/**',
      '**/dist/**',
      'example/**',
      '**/node_modules/**',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        tsconfigDirName: import.meta.dirname,
        project: ['./tsconfig.eslint.json'],
        extraFileExtensions: ['.vue'],
      },
    },
  },
  {
    files: ['**/*.{cjs,js,jsx}'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['packages/admin/src/**.{js,jsx}'],
    ...reactRecommended,
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.browser,
        VERSION: 'readonly',
      },
    },
    rules: {
      'react/display-name': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      import: eslintImport,
    },
    rules: {
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: ['const', 'let'],
          next: ['*'],
        },
        {
          blankLine: 'any',
          prev: ['const', 'let'],
          next: ['const', 'let'],
        },
        {
          blankLine: 'always',
          prev: ['*'],
          next: ['return'],
        },
      ],
      'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
      'import/dynamic-import-chunkname': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-commonjs': 'error',
      'import/no-cycle': 'error',
      'import/no-duplicates': [
        'error',
        {
          considerQueryString: true,
          'prefer-inline': true,
        },
      ],
      'import/no-named-default': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
          },
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,vue}'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        { allowTypedFunctionExpressions: true },
      ],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allowSingleOrDouble',
          trailingUnderscore: 'allow',
        },
        {
          selector: ['variable'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allowSingleOrDouble',
          trailingUnderscore: 'allowSingleOrDouble',
        },
        {
          selector: ['parameter'],
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: ['property'],
          format: null,
          custom: {
            regex: '(^\\/$|^/.*/$|^@|^[a-z]+(?:-[a-z]+)*?$)',
            match: true,
          },
          filter: '(^\\/$|^/.*/$|^@|^[a-z]+(?:-[a-z]+)*?$)',
        },
        {
          selector: ['property'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'import',
          format: ['PascalCase', 'camelCase'],
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
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
    },
  },
  {
    files: ['packages/client/src/**/*.{ts,vue}'],
    rules: {
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts',
          },
        },
      ],
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
      'vue/no-boolean-default': 'warn',
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
      'vue/no-undef-properties': 'warn',
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
      'vue/require-emit-validator': 'warn',
      'vue/require-expose': 'error',
      'vue/require-name-property': 'error',
      'vue/require-prop-comment': 'error',
      'vue/script-indent': 'error',
      'vue/static-class-names-order': 'error',
      'vue/v-for-delimiter-style': 'error',
    },
  },
  {
    files: [
      'packages/cloudbase/**/*.js',
      'packages/hexo-next/**/*.js',
      'packages/server/**/*.{js,ts}',
      'scripts/**.cjs',
      'commitlint.config.cjs',
    ],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'import/no-commonjs': 'off',
    },
  },
  {
    files: ['packages/cloudbase/**/*.js', 'packages/server/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        think: 'readonly',
      },
    },
  },
  {
    files: ['packages/server/**/*.{js,ts}'],
    rules: {
      '@typescript-eslint/class-literal-property-style': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  {
    files: ['scripts/**.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['**/__tests__/**/*.spec.{j,t}s'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },

  eslintPluginPrettierRecommended,
);
