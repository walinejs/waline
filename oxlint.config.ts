import { defineHopeConfig } from 'oxc-config-hope/oxlint';

export default defineHopeConfig(
  {
    ignore: [
      'example/',
      '**/.vuepress/utils/transform/',
      '**/.vuepress/utils/csv.js',
      'packages/admin/src/components/useScript.js',
      // 'packages/admin/**',
      // 'packages/server/**',
    ],
    node: ['packages/cloudbase/**', 'packages/server/**/*.js', 'scripts/thinkjs-mock.js'],
    react: true,
    vue: true,
    vitest: true,
    rules: {
      curly: ['warn', 'multi-line'],
      'no-alert': 'off',
      'no-warning-comments': 'off',
      'prefer-global-this': 'off',
      eqeqeq: 'off',
      'node/global-require': 'off',
      'node/no-process-env': 'off',
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

      // temporarily disable to avoid too many warnings, will be re-enabled in the future
      'react-perf/jsx-no-jsx-as-prop': 'off',
      'react-perf/jsx-no-new-object-as-prop': 'off',
      'react-perf/jsx-no-new-function-as-prop': 'off',
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
      'typescript/no-require-imports': 'off',

      'unicorn/prefer-module': 'off',
    },
  },
  {
    files: ['packages/server/**/*.js'],
    rules: {
      'class-methods-use-this': 'off',
      complexity: 'off',
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

      // 'unicorn/no-array-callback-reference': 'off',
      // 'unicorn/no-array-method-this-argument': 'off',

      // temporarily disable to avoid too many warnings, will be re-enabled in the future
      'guard-for-in': 'off',
      'max-classes-per-file': 'off',
      'no-shadow': 'off',
      'no-undefined': 'off',
    },
  },
);
