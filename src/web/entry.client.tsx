import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import 'antd/dist/antd.css'
import config from '../common/config'
import App from './components/App'

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	debug: !config.production,
	environment: config.env,
	integrations: [new BrowserTracing()],
	tracesSampleRate: 1.0,
})

async function render() {
	const userAgent = navigator.userAgent
	ReactDOM.hydrate(
		<React.StrictMode>
			<BrowserRouter>
				<App userAgent={userAgent} url={location.href} />
			</BrowserRouter>
		</React.StrictMode>,
		document.getElementById('app')
	)
}

window.onload = () => render()
