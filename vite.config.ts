import ejs from './plugins/ejs'
import config from './src/common/config'
import react from '@vitejs/plugin-react'
import nodePollyfills from 'rollup-plugin-node-polyfills'
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
		'process.env.API_HOST': `"${process.env.API_HOST}"`,
		'process.env.CLIENT_ID': `"${process.env.CLIENT_ID}"`,
		'process.env.CLIENT_SECRET': `"${process.env.CLIENT_SECRET}"`,
		'process.env.AUTH0_CLIENT_ID': `"${process.env.AUTH0_CLIENT_ID}"`,
		'process.env.AUTH0_DOMAIN': `"${process.env.AUTH0_DOMAIN}"`,
	},
	build: {
		target: ['esnext'],
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
		rollupOptions: {
			plugins: [nodePollyfills()],
		},
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
			'util': 'rollup-plugin-node-polyfills/polyfills/util',
			'sys': 'util',
			'events': 'rollup-plugin-node-polyfills/polyfills/events',
			'stream': 'rollup-plugin-node-polyfills/polyfills/stream',
			'path': 'rollup-plugin-node-polyfills/polyfills/path',
			'querystring': 'rollup-plugin-node-polyfills/polyfills/qs',
			'punycode': 'rollup-plugin-node-polyfills/polyfills/punycode',
			'url': 'rollup-plugin-node-polyfills/polyfills/url',
			'string_decoder': 'rollup-plugin-node-polyfills/polyfills/string-decoder',
			'http': 'rollup-plugin-node-polyfills/polyfills/http',
			'https': 'rollup-plugin-node-polyfills/polyfills/http',
			'os': 'rollup-plugin-node-polyfills/polyfills/os',
			'assert': 'rollup-plugin-node-polyfills/polyfills/assert',
			'constants': 'rollup-plugin-node-polyfills/polyfills/constants',
			'_stream_duplex':
				'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
			'_stream_passthrough':
				'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
			'_stream_readable':
				'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
			'_stream_writable':
				'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
			'_stream_transform':
				'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
			'timers': 'rollup-plugin-node-polyfills/polyfills/timers',
			'console': 'rollup-plugin-node-polyfills/polyfills/console',
			'vm': 'rollup-plugin-node-polyfills/polyfills/vm',
			'zlib': 'rollup-plugin-node-polyfills/polyfills/zlib',
			'tty': 'rollup-plugin-node-polyfills/polyfills/tty',
			'domain': 'rollup-plugin-node-polyfills/polyfills/domain',
		},
	},
})
