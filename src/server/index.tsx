import esMain from 'es-main'
import { resolve, join } from 'path'
import { fileURLToPath } from 'url'
import serverTiming from 'server-timing'
import { compile, TemplateFunction, Data } from 'ejs'
import Helmet from 'react-helmet'
import express, { Application } from 'express'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import config from '../common/config'
import { readFileSync } from 'fs'

interface ServerOptions {
	sourceDir: string
	distDir: string
	port: number
}

interface ServerContext {
	options: ServerOptions
	app: Application
	vite?: ViteDevServer
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
	const vite: ViteDevServer | undefined = config.production
		? undefined
		: await createViteServer({
				root: options.sourceDir,
				server: { middlewareMode: 'ssr' },
		  })
	const context = { app, options, vite }

	app.use(
		serverTiming({
			enabled: config.debug,
		})
	)

	if (vite) app.use(vite.middlewares)
	else app.use('/', express.static(join(options.distDir, 'web')))

	app.use((req, res, next) => {
		const templatedRender = async (
			IndexTemplate: (locals: Data) => string,
			{ render }
		) => {
			res.startTime('render-react', 'React Render')
			const body = render(req.url)
			const helmet = Helmet.renderStatic()
			res.endTime('render-react')

			res.startTime('render-ejs', 'EJS Render')
			let html = IndexTemplate({ req, body, helmet, config, analyticsURL: process.env.ENABLE_ANALYTICS === '1' ? process.env.ANALYTICS_URL : undefined })
			res.endTime('render-ejs')

			if (vite) {
				res.startTime('render-vite', 'Vite Transformer')
				html = await vite.transformIndexHtml(req.url, html)
				res.endTime('render-vite')
			}
			res.send(html)
		}

		const doRender = async (exported) => {
			const IndexTemplate = config.production
				? (await import('./index.html.ejs')).default
				: (locals: Data) => {
						const templateFn = compile(
							readFileSync(
								join(options.sourceDir, 'src', 'server', 'index.html.ejs'),
								'utf8'
							),
							{ async: false }
						) as TemplateFunction
						return templateFn({ locals })
				  }
			return await templatedRender(IndexTemplate, exported)
		}

		if (vite)
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
					if (vite) vite.ssrFixStacktrace(error)
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
