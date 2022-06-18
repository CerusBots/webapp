import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import cookie from 'cookie'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import 'antd/dist/antd.css'
import config from '../common/config'
import App from './components/App'
import createContext from '../api'
import { APIUser } from '@cerusbots/common/dist/http/types'

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	debug: !config.production,
	environment: config.env,
	integrations: [new BrowserTracing()],
	tracesSampleRate: 1.0,
})

async function render() {
	const userAgent = navigator.userAgent
	const authToken = cookie.parse(document.cookie)['auth.token']
	const ctx = createContext({ userAgent, token: authToken })
	let user: APIUser = null
	let error: Error = null

	try {
		user = await ctx.user.get()
	} catch (e) {
		if (typeof e.response === 'object' && e.response.status !== 401) error = e
	}

	ReactDOM.hydrate(
		<React.StrictMode>
			<BrowserRouter>
				<App
					authToken={authToken}
					userAgent={userAgent}
					url={location.href}
					user={user}
					error={error}
				/>
			</BrowserRouter>
		</React.StrictMode>,
		document.getElementById('app')
	)
}

window.onload = () => render()
