import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Helmet from 'react-helmet'
import PageNotFound from './NotFound'
import PageHome from './pages/Home'
import PageLogin from './pages/Login'
import { URLContext, UserAgentContext, ErrorContext } from '../contexts'
import config from '../../common/config'
import './App.scss'

const App: React.FC<{
	userAgent: string
	url: string
	error?: Error
}> = ({ userAgent, url, error }) => {
	const nav = useNavigate()
	return (
		<Auth0Provider
			domain={config.auth0.domain}
			clientId={config.auth0.clientID}
			audience={`https://${config.apiHost}`}
			redirectUri={`https://${config.domain}/login`}
			onRedirectCallback={(appState) =>
				nav(appState?.returnTo || `/`, { replace: true })
			}>
			<UserAgentContext.Provider value={userAgent}>
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
			</UserAgentContext.Provider>
		</Auth0Provider>
	)
}
export default App
