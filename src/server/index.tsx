import esMain from 'es-main'
import { readFile } from 'fs/promises'
import { resolve, join } from 'path'
import { fileURLToPath } from 'url'
import React from 'react'
import express, { Application } from 'express'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import IndexTemplate from './index.html.ejs'

interface ServerOptions {
    clientBundle: string
    appBundle: string
    chunksPath: string
    port: number
}

interface ServerContext {
    options: ServerOptions
    app: Application
}

const getDefaultServerOptions: () => ServerOptions = () => {
  const distPath = resolve(fileURLToPath(new URL('../dist', import.meta.url)))
  return {
    clientBundle: join(distPath, 'web.mjs'),
    appBundle: join(distPath, 'components.mjs'),
    chunksPath: join(distPath, 'chunks'),
    port: 8080
  }
}

export async function createServer (options: ServerOptions = getDefaultServerOptions()): Promise<ServerContext> {
  const app = express()
  const context = { app, options }

  app.use('/chunks', express.static(options.chunksPath))

  app.all('/main.js', (_req, res, next) => readFile(options.clientBundle)
    .then((buff) => res.type('application/javascript').send(buff))
    .catch((error) => next(error)))

  app.use((req, res, next) => {
    import(options.appBundle).then(({ default: defaultExport }) => {
      const { App } = defaultExport
      const body = ReactDOMServer.renderToString(
                <React.StrictMode>
                    <StaticRouter location={req.url}>
                        <App />
                    </StaticRouter>
                </React.StrictMode>
      )
      res.send(IndexTemplate({ req, body }))
    }).catch((error) => next(error))
  })

  app.use((error, req, res, next) => {
    res.status(500).send(error.message)
    console.error(error)
  })

  return await (new Promise((resolve, reject) => {
    try {
      app.listen(options.port, () => {
        resolve(context)
      })
    } catch (e) {
      reject(e)
    }
  }))
}

if (esMain(import.meta)) {
  createServer().then((ctx) => {
    console.log('Server is online at http://localhost:' + ctx.options.port)
  }).catch((error) => {
    console.error('Server failed to start', error)
  })
}
