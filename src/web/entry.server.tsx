import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './components/App'

export async function render(url: string, userAgent: string) {
	return ReactDOMServer.renderToString(
		<React.StrictMode>
			<StaticRouter location={url}>
				<App userAgent={userAgent} url={url} />
			</StaticRouter>
		</React.StrictMode>
	)
}
