import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import PageNotFound from './NotFound'
import PageHome from './pages/Home'
import './App.scss'

export default function App() {
	return (
		<div className="app">
			<Helmet>
				<title>Cerus</title>
			</Helmet>
			<Routes>
				<Route path="/" element={<PageHome />} />
				<Route path="/*" element={<PageNotFound />} />
			</Routes>
		</div>
	)
}
