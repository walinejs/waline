import { defaultIgnorePatterns, getOxlintConfigs } from 'oxc-config-hope/oxlint';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: getOxlintConfigs({
    node: ['packages/cloudbase/**', 'packages/server/**', 'scripts/thinkjs-mock.js'],
    react: true,
    vue: true,
    vitest: true,
  }),
  ignorePatterns: [
    ...defaultIgnorePatterns,
    'example/',
    '**/.vuepress/utils/transform/',
    '**/.vuepress/utils/csv.js',
    'packages/admin/src/components/useScript.js',
    // 'packages/admin/**',
    // 'packages/server/**',
  ],
  options: {
    typeAware: true,
    typeCheck: true,
  },
  rules: {
    curly: ['warn', 'multi-line'],
    'no-alert': 'off',
    'no-warning-comments': 'off',
    'prefer-global-this': 'off',
    eqeqeq: 'off',
  },
  overrides: [
    {
      files: ['packages/admin/src/**'],
      plugins: ['react'],
      rules: {
        'react/jsx-max-depth': 'off',
        'typescript/no-floating-promises': 'off',
        'typescript/unbound-method': 'off',
      },
    },
    {
      files: ['packages/client/src/**'],
      plugins: ['vue'],
      rules: {
        'eslint-plugin-react-hooks/rules-of-hooks': 'off',
        'vue/max-props': ['warn', { maxProps: 5 }],
      },
    },
    {
      files: [
        'packages/cloudbase/**',
        'packages/hexo-next/**',
        'packages/server/**',
        'scripts/thinkjs-mock.js',
      ],
      rules: {
        // cjs related rules
        'import/no-commonjs': 'off',
        'import/unambiguous': 'off',
        'typescript/no-required-calls': 'off',
        'typescript/no-require-imports': 'off',

        'unicorn/prefer-module': 'off',
      },
    },
    {
      files: ['packages/server/**/*.js'],
      plugins: ['node'],
      rules: {
        'max-statements': 'off',
        'no-console': 'off',
        'no-await-in-loop': 'off',
        'no-callback-in-promise': 'off',
        'require-await': 'off',

        'jsdoc/check-tag-names': [
          'warn',
          {
            definedTags: [
              'apiParam',
              'apiSuccess',
              'apiSuccessExample',
              'apiVersion',
              'api',
              'apiGroup',
            ],
          },
        ],
        'jsdoc/require-returns': 'off',

        'node/no-process-env': 'off',

        // disable currently to avoid empty env variables falling to empty string
        'typescript/prefer-nullish-coalescing': 'off',
        'typescript/prefer-promise-reject-errors': 'off',
        'typescript/require-await': 'off',
      },
    },
  ],
});
