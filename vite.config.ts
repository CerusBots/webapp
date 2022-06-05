import ejs from './plugins/ejs'
import config from './src/common/config'
import react from '@vitejs/plugin-react'
import { join } from 'path'
import { defineConfig } from 'vite'

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
