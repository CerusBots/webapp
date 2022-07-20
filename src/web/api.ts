import createContext from '../api'
import { useUserAgent } from './contexts'

export default function () {
	return createContext({ userAgent: useUserAgent() })
}
