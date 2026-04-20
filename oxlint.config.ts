import { defineHopeConfig } from 'oxc-config-hope/oxlint';

export default defineHopeConfig(
  {
    ignore: ['example/', '**/.vuepress/utils/transform/', '**/.vuepress/utils/csv.js'],
    node: ['packages/cloudbase/**', 'packages/server/**/*.js', 'scripts/thinkjs-mock.js'],
    react: true,
    vue: true,
    vitest: true,
    rules: {
      curly: ['warn', 'multi-line'],
      'no-alert': 'off',
      'no-warning-comments': 'off',
      'prefer-global-this': 'off',
      'unicorn/prefer-global-this': 'off',
      eqeqeq: 'off',
      'node/global-require': 'off',
      'node/no-process-env': 'off',
      'no-undefined': 'off',
    },
  },
  {
    files: ['packages/admin/src/**'],
    plugins: ['react'],
    rules: {
      'id-length': [
        'warn',
        {
          min: 2,
          exceptions: ['i', 'j', 'x', 'y', 'z', 't', '_'],
        },
      ],
      'react/jsx-max-depth': 'off',
      'typescript/no-floating-promises': 'off',
      'typescript/unbound-method': 'off',
      'unicorn/prefer-global-this': 'off',

      'no-shadow': 'off',
      'promise/catch-or-return': 'off',
      'max-lines-per-function': 'off',
      'max-lines': 'off',
      complexity: 'off',
      'max-depth': 'off',
      'react/no-danger': 'off',

      // temporarily disable to avoid too many warnings, will be re-enabled in the future
      'react-perf/jsx-no-jsx-as-prop': 'off',
      'react-perf/jsx-no-new-object-as-prop': 'off',
      'react-perf/jsx-no-new-function-as-prop': 'off',
      'react-perf/jsx-no-new-array-as-prop': 'off',
    },
  },
  {
    files: ['packages/client/src/**'],
    plugins: ['vue'],
    rules: {
      'eslint-plugin-react-hooks/rules-of-hooks': 'off',
      'vue/max-props': ['warn', { maxProps: 5 }],
      'no-shadow': 'off',
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
      'typescript/no-require-imports': 'off',

      'unicorn/prefer-module': 'off',
    },
  },
  {
    files: ['packages/server/**/*.js'],
    rules: {
      'class-methods-use-this': 'off',
      complexity: 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'no-console': 'off',
      'no-await-in-loop': 'off',
      'no-callback-in-promise': 'off',
      'no-empty-function': 'off',
      'require-await': 'off',

      'jsdoc/check-tag-names': [
        'warn',
        {
          definedTags: [
            'apiHeader',
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

      // disable currently to avoid empty env variables falling to empty string
      'typescript/prefer-nullish-coalescing': 'off',
      'typescript/prefer-promise-reject-errors': 'off',
      'typescript/require-await': 'off',

      'unicorn/no-array-callback-reference': 'off',
      // 'unicorn/no-array-method-this-argument': 'off',
      'unicorn/no-anonymous-default-export': 'off',
      'unicorn/consistent-function-scoping': 'off',

      'promise/prefer-await-to-callbacks': 'off',
      'promise/always-return': 'off',
      'promise/no-nesting': 'off',

      'max-depth': 'off',
      'no-param-reassign': 'off',
      'id-length': 'off',
      'oxc/no-map-spread': 'off',

      // temporarily disable to avoid too many warnings, will be re-enabled in the future
      'guard-for-in': 'off',
      'max-classes-per-file': 'off',
      'no-shadow': 'off',
      'no-undefined': 'off',
    },
  },
  {
    files: ['docs/src/**'],
    rules: {
      'max-lines': 'off',
    },
  },
);
