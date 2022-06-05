import ejs from './plugins/ejs'
import config from './src/common/config'
import react from '@vitejs/plugin-react'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const srcdir = fileURLToPath(new URL('./', import.meta.url))
const IS_SERVER = process.env.IS_SERVER === '1'

export default defineConfig({
	plugins: [react(), ejs()],
	css: {
		preprocessorOptions: {
			less: {
				javaScriptEnable: true,
			},
		},
	},
	define: {
		'process.env.NODE_ENV': `"${config.env}"`,
	},
	build: {
		lib: IS_SERVER
			? undefined
			: {
					entry: resolve(srcdir, 'src', 'web', 'entry.client.tsx'),
					name: 'entry-client',
			  },
	},
	resolve: {
		alias: {
			'react-dom/server': join(
				__dirname,
				'node_modules',
				'react-dom',
				'server.browser.js'
			),
		},
	},
})
