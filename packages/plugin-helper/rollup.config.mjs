import ts from 'rollup-plugin-ts';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: './src/index.ts',
    output: {
      file: './dist/index.js',
      format: 'cjs'
    },
    plugins: [
      ts()
    ],
    treeshake: 'smallest',
  },
  {
    input: 'src/index.ts',
    output: { 
      file: './dist/type.d.ts', 
      format: 'esm' 
    },
    plugins: [
      dts({ compilerOptions: { preserveSymlinks: false } })
    ],
  }
];

