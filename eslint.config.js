import { globals, hope, tsParser } from 'eslint-config-mister-hope';
import { vue } from 'eslint-config-mister-hope/vue';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

export default hope(
  {
    ignores: [
      // FIXME: Handle alias correctly
      '**/.vuepress/components/**',
      // FIXME: Correctly type these files
      '**/.vuepress/utils/transform/**',
      '**/.vuepress/utils/csv.js',
      'example/**',
    ],
    js: {
      'no-console': 'off',
    },
    ts: {
      rules: {
        'no-console': 'off',
      },
    },
  },
  {
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        tsconfigDirName: import.meta.dirname,
        project: ['./tsconfig.eslint.json'],
        extraFileExtensions: ['.vue'],
      },
    },
  },
  ...vue(
    {
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
    },
    {
      'vue/block-lang': [
        'error',
        {
          script: { lang: 'ts' },
        },
      ],
    },
  ),

  // @ts-expect-error: react plugin types
  {
    files: ['packages/admin/src/**/*.{js,jsx}'],
    ...reactRecommended,
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.browser,
        VERSION: 'readonly',
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'import-x/no-unresolved': ['error', { ignore: ['\\.svg\\?react$'] }],
    },
  },

  {
    files: [
      'packages/cloudbase/**/*.js',
      'packages/hexo-next/**/*.js',
      'packages/server/**/*.{js,ts}',
    ],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'import-x/no-commonjs': 'off',
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
);
