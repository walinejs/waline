import path from 'path';
import { fileURLToPath } from 'url';

import {
  defaultNamingConventionRules,
  globals,
  hope,
} from 'eslint-config-mister-hope';
import { vue } from 'eslint-config-mister-hope/vue';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default hope(
  {
    ignores: [
      // FIXME: Correctly type these files
      '**/.vuepress/utils/transform/**',
      '**/.vuepress/utils/csv.js',
      'example/**',
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: path.resolve(__dirname, '.'),
        extraFileExtensions: ['.vue'],
      },
    },
  },

  ...vue({
    all: {
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: ['property'],
          format: null,
          custom: {
            regex: '(^\\/$|^/.*/$|^@|^[a-z]+(?:-[a-z]+)*?$)',
            match: true,
          },
          filter: '(^\\/$|^/.*/$|^@|^[a-z]+(?:-[a-z]+)*?$)',
        },
        ...defaultNamingConventionRules,
      ],
    },
    sfc: {
      'vue/block-lang': [
        'error',
        {
          script: { lang: 'ts' },
        },
      ],
    },
  }),

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
    files: ['docs/src/.vuepress/components/**/*.{ts,vue}'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  {
    files: ['packages/client/src/**/*.{ts,vue}'],
    languageOptions: {
      globals: globals.browser,
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
      'no-console': 'off',
    },
  },

  {
    files: ['scripts/**.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
);
