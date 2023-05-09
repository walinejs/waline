import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: './dist/api.mjs',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: './dist/api.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [esbuild({ charset: 'utf8', minify: true, target: 'node16' })],
    treeshake: 'smallest',
  },
  {
    input: './src/index.ts',
    output: [
      {
        file: './dist/api.js',
        format: 'umd',
        name: 'WalineAPI',
        sourcemap: true,
      },
    ],
    plugins: [
      esbuild({
        minify: true,
        target: ['chrome79', 'firefox79', 'edge79', 'safari13'],
      }),
    ],
    treeshake: 'smallest',
  },

  {
    input: './src/index.ts',
    output: [
      { file: './dist/api.d.ts', format: 'esm' },
      { file: './dist/api.d.cts', format: 'esm' },
      { file: './dist/api.d.mts', format: 'esm' },
    ],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },
];
