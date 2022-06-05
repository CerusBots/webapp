import { defineBuildConfig } from 'unbuild'
import ejs from './plugins/ejs'
import config from './src/common/config'

export default defineBuildConfig({
  entries: [
    {
      input: 'src/web',
      outDir: 'dist/web',
      ext: 'cjs'
    },
    {
      input: 'src/web/components',
      outDir: 'dist/components'
    },
    {
      input: 'src/server',
      outDir: 'dist/server',
      ext: 'cjs'
    }
  ],
  hooks: {
    'rollup:options' (ctx, options) {
      options.plugins.push(ejs())
    }
  },
  replace: {
    'process.env.NODE_ENV': `"${config.env}"`
  },
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: config.production
    },
    inlineDependencies: true
  }
})
