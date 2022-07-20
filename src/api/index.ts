import { BaseContext } from './context'
import { createAxios } from './http'

interface ContextOptions {
	token?: string
	userAgent?: string
}

interface Context {}

export default function createContext(options: ContextOptions = {}): Context {
	const base: BaseContext = {
		token: options.token,
		axios: createAxios({
			headers: {
				'User-Agent':
					typeof options.userAgent === 'string' ? options.userAgent : null,
			},
		}),
	}

	if (typeof options.token === 'string') {
		base.axios.defaults.headers.common.Authorization = options.token
	}

	/* const types: Record<APITypes, UseContext> = { }
	return Object.fromEntries<{}>(
		Object.entries(types).map(([type, useContext]) => [
			type as APITypes,
			useContext(base),
		])
	) as Record<APITypes, {}> as Context */
	return {}
}
