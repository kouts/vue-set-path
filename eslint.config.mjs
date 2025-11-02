import { config } from '@kouts/eslint-config'

export default [
  ...config({
    vueVersion: 2,
    ts: false,
    env: ['browser'],
  }),
]
