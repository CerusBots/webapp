import React from 'react'
import {
	AuthTokenContext,
	URLContext,
	UserAgentContext,
	UserContext,
	ErrorContext,
} from '../contexts'
import { Routes, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import PageNotFound from './NotFound'
import PageHome from './pages/Home'
import { APIUser } from '@cerusbots/common/dist/http/types'
import PageLogin from './pages/Login'

const App: React.FC<{
	authToken?: string
	user?: APIUser
	userAgent: string
	url: string
	error?: Error
}> = ({ authToken, userAgent, user, url, error }) => (
	<AuthTokenContext.Provider value={authToken}>
		<UserAgentContext.Provider value={userAgent}>
			<UserContext.Provider value={user}>
				<URLContext.Provider value={url}>
					<ErrorContext.Provider value={error}>
						<div className="app">
							<Helmet>
								<title>Cerus</title>
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
	</AuthTokenContext.Provider>
)
export default App
