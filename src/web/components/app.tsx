import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PageNotFound from './not-found'
import PageHome from './pages/home'

export default class App extends React.Component {
  render () {
    return <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
  }
}
