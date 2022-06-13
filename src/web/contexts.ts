import { APIUser } from '@cerusbots/common/dist/http/types'
import React from 'react'

export const AuthTokenContext = React.createContext<string | null>(null)
AuthTokenContext.displayName = 'AuthTokenContext'

export const useAuthToken = () => React.useContext(AuthTokenContext)

export const URLContext = React.createContext<string | null>(null)
URLContext.displayName = 'URLContext'

export const useURL = () => {
	const url = React.useContext(URLContext)
	if (typeof navigator === 'object') return new URL(url)
	return new URL(`http://${process.env.DOMAIN}${url}`)
}

export const UserContext = React.createContext<APIUser | null>(null)
UserContext.displayName = 'UserContext'

export const useUser = () => React.useContext(UserContext)

export const UserAgentContext = React.createContext<string>('')
UserAgentContext.displayName = 'UserAgentContext'

export const useUserAgent = () => React.useContext(UserAgentContext)
