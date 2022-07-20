import { AxiosError } from 'axios'
import React from 'react'

export const URLContext = React.createContext<string | null>(null)
URLContext.displayName = 'URLContext'

export const useURL = () => {
	const url = React.useContext(URLContext)
	if (typeof navigator === 'object') return new URL(url)
	return new URL(`http://${process.env.DOMAIN}${url}`)
}

export const UserAgentContext = React.createContext<string>('')
UserAgentContext.displayName = 'UserAgentContext'

export const useUserAgent = () => React.useContext(UserAgentContext)

export const ErrorContext = React.createContext<Error | AxiosError | null>(null)
ErrorContext.displayName = 'ErrorContext'

export const useError = () => React.useContext(ErrorContext)
