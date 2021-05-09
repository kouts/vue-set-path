import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const globals = {
  vue: 'Vue'
}

const babelOptions = {
  babelHelpers: 'bundled',
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: false,
        modules: false
      }
    ]
  ]
}

const rollupConfigModules = [
  {
    input: ['src/index.js', 'src/vueSetPath.js', 'src/utils.js'],
    external: ['vue'],
    output: [
      {
        format: 'es',
        dir: 'dist/es'
      },
      {
        format: 'cjs',
        dir: 'dist/cjs'
      }
    ],
    plugins: [nodeResolve(), babel(babelOptions)]
  }
]

const rollupConfigsUmd = ['vueSetPath', 'utils'].map((name) => ({
  input: `src/${name}.js`,
  external: ['vue'],
  output: [
    {
      format: 'umd',
      file: `dist/umd/${name}.js`,
      name,
      globals
    },
    {
      format: 'umd',
      file: `dist/umd/${name}.min.js`,
      name,
      globals
    }
  ],
  plugins: [
    nodeResolve(),
    babel(babelOptions),
    terser({
      include: [/^.+\.min\.js$/]
    })
  ]
}))

const rollupConfig = rollupConfigModules.concat(rollupConfigsUmd)

export default rollupConfig
