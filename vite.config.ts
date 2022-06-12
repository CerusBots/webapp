import ejs from './plugins/ejs'
import config from './src/common/config'
import react from '@vitejs/plugin-react'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const srcdir = fileURLToPath(new URL('./', import.meta.url))

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
		'process.env.SENTRY_DSN': `"${process.env.SENTRY_DSN}"`,
		'process.env.DOMAIN': `"${process.env.DOMAIN}"`,
	},
	build: {
		lib: {
			client: {
				entry: resolve(srcdir, 'src', 'web', 'entry.client.tsx'),
				name: 'entry-client',
			},
			server: {
				entry: resolve(srcdir, 'src', 'server', 'index.tsx'),
				name: 'server',
			},
			ssr: undefined,
		}[process.env.STAGE || 'ssr'],
		minify: config.production,
		sourcemap: config.production,
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
