import { createRequire } from 'node:module';

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import vue from '@vitejs/plugin-vue';
import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const { version } = createRequire(import.meta.url)('./package.json') as {
  version: string;
};

export default [
  // full package
  {
    input: './src/entries/full.ts',
    output: [
      {
        file: './dist/waline.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: './dist/waline.umd.js',
        format: 'umd',
        name: 'Waline',
        sourcemap: true,
      },
    ],
    plugins: [
      vue({
        isProduction: true,
        template: { compilerOptions: { comments: false } },
      }),
      esbuild({
        charset: 'utf8',
        target: ['chrome87', 'firefox78', 'edge88', 'safari14', 'node18'],
        minify: true,
      }),
      replace({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'process.env.NODE_ENV': JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'process.env["NODE_ENV"]': JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "process.env['NODE_ENV']": JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VUE_OPTIONS_API__: false,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VUE_PROD_DEVTOOLS__: false,
        VERSION: JSON.stringify(version),
        preventAssignment: false,
      }),
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
    ],
    treeshake: 'smallest',
  },

  // full and slim declaration files
  {
    input: './src/entries/full.ts',
    output: [
      { file: './dist/waline.d.ts', format: 'esm' },
      { file: './dist/slim.d.ts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // slim package
  {
    input: './src/entries/full.ts',
    output: [
      {
        file: './dist/slim.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      vue({
        isProduction: true,
        template: { compilerOptions: { comments: false } },
      }),
      esbuild({
        charset: 'utf8',
        target: ['chrome87', 'firefox78', 'edge88', 'safari14', 'node18'],
        minify: true,
      }),
      replace({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'process.env.NODE_ENV': JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'process.env["NODE_ENV"]': JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "process.env['NODE_ENV']": JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VUE_OPTIONS_API__: false,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VUE_PROD_DEVTOOLS__: false,
        VERSION: JSON.stringify(version),
        preventAssignment: false,
      }),
    ],
    treeshake: 'smallest',
    external: [
      '@vueuse/core',
      '@waline/api',
      'autosize',
      'marked',
      'marked-highlight',
      'recaptcha-v3',
      'vue',
    ],
  },

  // components
  {
    input: './src/entries/component.ts',
    output: [
      {
        file: './dist/component.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: [
      '@vueuse/core',
      '@waline/api',
      'autosize',
      'marked',
      'marked-highlight',
      'recaptcha-v3',
      'vue',
    ],
    plugins: [
      vue({
        isProduction: true,
        template: { compilerOptions: { comments: false } },
      }),
      esbuild({
        charset: 'utf8',
        target: ['chrome87', 'firefox78', 'edge88', 'safari14', 'node18'],
        minify: true,
      }),
      replace({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'process.env.NODE_ENV': JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'process.env["NODE_ENV"]': JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "process.env['NODE_ENV']": JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VUE_OPTIONS_API__: false,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VUE_PROD_DEVTOOLS__: false,
        VERSION: JSON.stringify(version),
        preventAssignment: false,
      }),
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
    ],
    treeshake: 'smallest',
  },

  // components declaration files
  {
    input: './src/entries/component-type.d.ts',
    output: [{ file: './dist/component.d.ts', format: 'esm' }],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // comment
  {
    input: './src/entries/comment.ts',
    output: [
      {
        file: './dist/comment.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      vue({
        isProduction: true,
        template: { compilerOptions: { comments: false } },
      }),
      esbuild({
        charset: 'utf8',
        target: ['chrome87', 'firefox78', 'edge88', 'safari14', 'node18'],
        minify: true,
      }),
      replace({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'process.env.NODE_ENV': JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'process.env["NODE_ENV"]': JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "process.env['NODE_ENV']": JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VUE_OPTIONS_API__: false,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VUE_PROD_DEVTOOLS__: false,
        VERSION: JSON.stringify(version),
        preventAssignment: false,
      }),
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
    ],
    treeshake: 'smallest',
  },

  // comment declaration files
  {
    input: './src/entries/comment.ts',
    output: [{ file: './dist/comment.d.ts', format: 'esm' }],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },

  // pageview
  {
    input: './src/entries/pageview.ts',
    output: [
      {
        file: './dist/pageview.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      vue({
        isProduction: true,
        template: { compilerOptions: { comments: false } },
      }),
      esbuild({
        charset: 'utf8',
        target: ['chrome87', 'firefox78', 'edge88', 'safari14', 'node18'],
        minify: true,
      }),
      replace({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'process.env.NODE_ENV': JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'process.env["NODE_ENV"]': JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "process.env['NODE_ENV']": JSON.stringify('production'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VUE_OPTIONS_API__: false,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __VUE_PROD_DEVTOOLS__: false,
        VERSION: JSON.stringify(version),
        preventAssignment: false,
      }),
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
    ],
    treeshake: 'smallest',
  },

  // pageview declaration files
  {
    input: './src/entries/pageview.ts',
    output: [{ file: './dist/pageview.d.ts', format: 'esm' }],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },
];
