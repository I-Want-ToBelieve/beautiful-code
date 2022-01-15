import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescriptPlugin from '@rollup/plugin-typescript'
import metablock from 'rollup-plugin-userscript-metablock'
import typescript from 'typescript'

const fs = require('fs')
const pkg = require('./package.json')

fs.mkdir('dist/', { recursive: true }, () => null)

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/production.user.js',
    format: 'iife',
    name: 'RollupUserScript',
    banner: () =>
      '\n/*\n' +
      fs.readFileSync('./LICENSE', 'utf8') +
      '*/\n\n/* globals VM shiki prettier globalThis["vscode-languagedetection"]*/',
    sourcemap: true,
    globals: {
      '@violentmonkey/dom': 'VM',
      'shiki': 'shiki',
      'prettier': 'prettier',
      '@vscode/vscode-languagedetection': 'window["vscode-languagedetection"]',
    },
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'ENVIRONMENT': JSON.stringify('production'),
      'preventAssignment': true,
    }),
    nodeResolve({ extensions: ['.js', '.ts', '.tsx'] }),
    typescriptPlugin({ typescript }),
    commonjs({
      include: ['node_modules/**'],
      exclude: ['node_modules/process-es6/**'],
    }),
    babel({ babelHelpers: 'bundled' }),
    metablock({
      file: './meta.json',
      override: {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        homepage: pkg.homepage,
        author: pkg.author,
        license: pkg.license,
      },
    }),
  ],
  external (id) {
    console.log(id)
    return [
      '@violentmonkey/dom',
      'shiki',
      'prettier',
      '@vscode/vscode-languagedetection',
    ].includes(id)
  },
}
