import { Auth0Provider } from '@auth0/auth0-react'
import { APIUser } from '@cerusbots/common/dist/http/types'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import PageNotFound from './NotFound'
import PageHome from './pages/Home'
import PageLogin from './pages/Login'
import {
	URLContext,
	UserAgentContext,
	UserContext,
	ErrorContext,
} from '../contexts'
import config from '../../common/config'
import './App.scss'

const App: React.FC<{
	user?: APIUser
	userAgent: string
	url: string
	error?: Error
}> = ({ userAgent, user, url, error }) => (
	<Auth0Provider
		domain={config.auth0.domain}
		clientId={config.auth0.clientID}
		redirectUri={`https://${process.env.API_HOST}/v1/user/callback`}>
		<UserAgentContext.Provider value={userAgent}>
			<UserContext.Provider value={user}>
				<URLContext.Provider value={url}>
					<ErrorContext.Provider value={error}>
						<div className="app">
							<Helmet>
								<title>Cerus Dashboard</title>
							</Helmet>
							<Routes>
								<Route path="/" element={<PageHome />} />
								<Route path="/login" element={<PageLogin />} />
								<Route path="/*" element={<PageNotFound />} />
							</Routes>
						</div>
					</ErrorContext.Provider>
				</URLContext.Provider>
			</UserContext.Provider>
		</UserAgentContext.Provider>
	</Auth0Provider>
)
export default App
