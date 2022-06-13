import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './components/App'
import createContext from '../api'
import { APIUser } from '@cerusbots/common/dist/http/types'

export async function render(
	url: string,
	userAgent: string,
	authToken?: string
) {
	const ctx = createContext({ userAgent, token: authToken })
	let user: APIUser = null

	try {
		user = await ctx.user.get()
	} catch {}

	return ReactDOMServer.renderToString(
		<React.StrictMode>
			<StaticRouter location={url}>
				<App userAgent={userAgent} authToken={authToken} user={user} url={url} />
			</StaticRouter>
		</React.StrictMode>
	)
}
