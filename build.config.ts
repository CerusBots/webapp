import { defineBuildConfig } from 'unbuild'
import ejs from './plugins/ejs'
import config from './src/common/config'

export default defineBuildConfig({
	entries: [
		{
			input: 'src/server',
			outDir: 'dist/server',
			ext: 'cjs',
		},
	],
	hooks: {
		'rollup:options'(ctx, options) {
			options.plugins.push(ejs())
		},
	},
	rollup: {
		emitCJS: true,
		esbuild: {
			minify: config.production,
		},
		inlineDependencies: true,
	},
})
