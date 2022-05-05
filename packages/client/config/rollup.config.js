import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import typescript2 from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import { version } from '../package.json';

const commonOptions = {
  plugins: [
    vue(),
    typescript2({
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
          declarationMap: false,
        },
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env["NODE_ENV"]': JSON.stringify('production'),
      "process.env['NODE_ENV']": JSON.stringify('production'),
      SHOULD_VALIDATE: JSON.stringify(false),
      VERSION: JSON.stringify(version),
      preventAssignment: true,
    }),
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
    terser(),
  ],
  treeshake: 'smallest',
};

const babelPlugin = getBabelOutputPlugin({
  moduleId: 'Waline',
  presets: [['@babel/preset-env', { modules: 'umd' }]],
});

export default [
  // TODO: Remove this in future

  // legacy package
  {
    input: './src/entrys/legacy.ts',
    output: [
      {
        file: './dist/legacy.js',
        format: 'umd',
        name: 'Waline',
        exports: 'default',
        sourcemap: true,
      },
    ],
    ...commonOptions,
    plugins: [
      vue(),
      typescript2({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            declarationMap: false,
          },
        },
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env["NODE_ENV"]': JSON.stringify('production'),
        "process.env['NODE_ENV']": JSON.stringify('production'),
        SHOULD_VALIDATE: JSON.stringify(false),
        VERSION: JSON.stringify(version),
        preventAssignment: true,
      }),
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: [['@babel/preset-env']],
      }),
      terser(),
    ],
  },

  // legacy declaration files
  {
    input: './src/entrys/legacy.ts',
    output: [{ file: './dist/legacy.d.ts', format: 'esm' }],
    plugins: [dts()],
  },

  // full package
  {
    input: './src/entrys/full.ts',
    output: [
      {
        file: './dist/waline.js',
        format: 'esm',
        sourcemap: true,
        plugins: [babelPlugin],
      },
      {
        file: './dist/waline.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/waline.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
  },

  // full declaration files
  {
    input: './src/entrys/full.ts',
    output: [
      { file: './dist/waline.d.ts', format: 'esm' },
      { file: './dist/waline.cjs.d.ts', format: 'esm' },
      { file: './dist/waline.esm.d.ts', format: 'esm' },
    ],
    plugins: [dts()],
  },

  // shim package
  {
    input: './src/entrys/full.ts',
    output: [
      {
        file: './dist/shim.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/shim.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
    external: ['autosize', 'marked', 'vue'],
  },

  // shim declaration files
  {
    input: './src/entrys/full.ts',
    output: [
      { file: './dist/shim.d.ts', format: 'esm' },
      { file: './dist/shim.esm.d.ts', format: 'esm' },
    ],
    plugins: [dts()],
  },

  // components
  {
    input: './src/entrys/components.ts',
    output: [
      {
        file: './dist/component.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/component.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: ['autosize', 'marked', 'vue'],
    ...commonOptions,
  },

  // components declaration files
  // TODO: Generate declaration files

  // pageview
  {
    input: './src/entrys/pageview.ts',
    output: [
      {
        file: './dist/pageview.js',
        format: 'esm',
        sourcemap: true,
        plugins: [babelPlugin],
      },
      {
        file: './dist/pageview.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/pageview.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    ...commonOptions,
  },

  // pageview declaration files
  {
    input: './src/entrys/pageview.ts',
    output: [{ file: './dist/pageview.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
