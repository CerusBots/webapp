import esMain from 'es-main'
import { resolve, join } from 'path'
import { fileURLToPath } from 'url'
import Helmet from 'react-helmet'
import express, { Application } from 'express'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import IndexTemplate from './index.html.ejs'
import config from '../common/config'

interface ServerOptions {
	sourceDir: string
	distDir: string
	port: number
}

interface ServerContext {
	options: ServerOptions
	app: Application
	vite: ViteDevServer
}

const getDefaultServerOptions: () => ServerOptions = () => {
	const sourceDir = resolve(fileURLToPath(new URL('../', import.meta.url)))
	const distDir = resolve(fileURLToPath(new URL('../dist', import.meta.url)))
	return {
		sourceDir,
		distDir,
		port: 8080,
	}
}

export async function createServer(
	options: ServerOptions = getDefaultServerOptions()
): Promise<ServerContext> {
	const app = express()
	const vite = await createViteServer({
		root: options.sourceDir,
		server: { middlewareMode: 'ssr' },
	})
	console.log(options)
	const context = { app, options, vite }

	app.use(vite.middlewares)

	app.use((req, res, next) => {
		const doRender = async ({ render }) => {
			const body = render(req.url)
			const helmet = Helmet.renderStatic()
			const html = await vite.transformIndexHtml(
				req.url,
				IndexTemplate({ req, body, helmet })
			)
			res.send(html)
		}

		if (config.production)
			vite
				.ssrLoadModule(join(options.sourceDir, 'src', 'web', 'entry.server.tsx'))
				.then(doRender)
				.catch((error) => {
					vite.ssrFixStacktrace(error)
					next(error)
				})
		else
			import(join(options.distDir, 'ssr', 'entry.server.js'))
				.then(doRender)
				.catch((error) => {
					vite.ssrFixStacktrace(error)
					next(error)
				})
	})

	app.use((error, req, res, next) => {
		res.status(500).send(error.message)
		console.error(error)
	})

	return await new Promise((resolve, reject) => {
		try {
			app.listen(options.port, () => {
				resolve(context)
			})
		} catch (e) {
			reject(e)
		}
	})
}

if (esMain(import.meta)) {
	createServer()
		.then((ctx) => {
			console.log('Server is online at http://localhost:' + ctx.options.port)
		})
		.catch((error) => {
			console.error('Server failed to start', error)
		})
}
