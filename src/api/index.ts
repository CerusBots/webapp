import { APIUser } from '@cerusbots/common/dist/http/types'
import { BaseContext, UseContext } from './context'
import { createAxios } from './http'
import useUserContext from './types/user'

interface ContextOptions {
	token?: string
	userAgent?: string
}

type APITypes = 'user'

interface Context {
	user: {
		get(): Promise<APIUser>
	}
}

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

	const types: Record<APITypes, UseContext> = { user: useUserContext }
	return Object.fromEntries<{}>(
		Object.entries(types).map(([type, useContext]) => [
			type as APITypes,
			useContext(base),
		])
	) as Record<APITypes, {}> as Context
}
