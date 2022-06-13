import createContext from '../api'
import { useAuthToken, useUserAgent } from './contexts'

export default function () {
	return createContext({ token: useAuthToken(), userAgent: useUserAgent() })
}
