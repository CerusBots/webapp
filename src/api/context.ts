import merge from 'deepmerge'
import { Axios } from 'axios'
import { createAxios } from './http'

export interface BaseContext {
	token?: string
	axios: Axios
}

export type UseContext = (
	context: BaseContext
) => Record<string, (this: BaseContext | any) => any>

export function transformMethods(target: any, methods: string[]) {
	return function useContext(context: BaseContext) {
		return Object.fromEntries(
			Object.entries(target).map(([key, value]) => [
				key,
				typeof value === 'function'
					? function transformer() {
							const fn = value as () => any
							if (methods.includes(key)) {
								return fn.apply(context, arguments)
							}
							console.log(fn, key, methods)
							return fn.apply(target, arguments)
					  }
					: value,
			])
		)
	} as UseContext
}
