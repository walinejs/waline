import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: './dist/api.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: './dist/api.cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [esbuild({ charset: 'utf8', minify: true, target: 'node18' })],
    treeshake: 'smallest',
  },
  {
    input: './src/index.ts',
    output: [
      {
        file: './dist/api.umd.js',
        format: 'umd',
        name: 'WalineAPI',
        sourcemap: true,
      },
    ],
    plugins: [
      esbuild({
        minify: true,
        target: ['chrome87', 'firefox78', 'edge88', 'safari14'],
      }),
    ],
    treeshake: 'smallest',
  },

  {
    input: './src/index.ts',
    output: [{ file: './dist/api.d.ts', format: 'esm' }],
    plugins: [dts({ compilerOptions: { preserveSymlinks: false } })],
  },
];
