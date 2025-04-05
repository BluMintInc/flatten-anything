/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';

// Copy the d.ts files to dist-cjs
function copyDtsPlugin() {
  return {
    name: 'copy-dts',
    writeBundle() {
      // Ensure dist-cjs directory exists
      if (!fs.existsSync('dist-cjs')) {
        fs.mkdirSync('dist-cjs', { recursive: true });
      }
      
      // Create a symlink to the d.ts files in dist
      try {
        if (fs.existsSync('dist-cjs/index.d.ts')) {
          fs.unlinkSync('dist-cjs/index.d.ts');
        }
        fs.copyFileSync('dist/index.d.ts', 'dist-cjs/index.d.ts');
        console.log('TypeScript declarations copied to dist-cjs');
      } catch (err) {
        console.error('Error copying TypeScript declarations:', err);
      }
    }
  };
}

export default [
  {
    input: 'dist/index.js',
    output: {
      file: 'dist-cjs/index.js',
      format: 'cjs',
      exports: 'named'
    },
    plugins: [resolve(), commonjs(), copyDtsPlugin()]
  }
];