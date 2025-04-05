import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'dist/index.js',      // after running `tsc` (ESM) we bundle that file
  output: {
    file: 'dist-cjs/index.js', // single CJS file
    format: 'cjs',
    exports: 'named'
  },
  plugins: [resolve(), commonjs()]
}; 