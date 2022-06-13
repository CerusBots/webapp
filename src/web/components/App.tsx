import React from 'react'
import {
	AuthTokenContext,
	URLContext,
	UserAgentContext,
	UserContext,
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
}> = ({ authToken, userAgent, user, url }) => (
	<AuthTokenContext.Provider value={authToken}>
		<UserAgentContext.Provider value={userAgent}>
			<UserContext.Provider value={user}>
				<URLContext.Provider value={url}>
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
				</URLContext.Provider>
			</UserContext.Provider>
		</UserAgentContext.Provider>
	</AuthTokenContext.Provider>
)
export default App
