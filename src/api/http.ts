import axios, { AxiosRequestConfig } from 'axios'
import merge from 'deepmerge'
import config from '../common/config'

const baseOptions: AxiosRequestConfig = {
	baseURL: `http://${config.apiHost}/${config.apiVersion}`,
	responseType: 'json',
}

const prettyPrintError = (
	status: number,
	detail: string,
	errors?: string[]
) => {
	errors = errors || []
	if (errors.length === 0) return `HTTP${status}: ${detail}`
	if (errors.length === 1) return `HTTP${status}: ${detail} - ${errors[0]}`
	return (
		`HTTP${status}: ${detail}\n` +
		errors.map((error, i) => `\t${i + 1}) ${error}`).join('\n')
	)
}

class HttpError extends Error {
	readonly status: number
	readonly errors?: string[]

	constructor({
		status,
		detail,
		errors,
	}: {
		status: number
		detail: string
		errors?: string[]
	}) {
		super(prettyPrintError(status, detail, errors))

		this.status = status
		this.errors = errors
	}
}

export function createAxios(config?: AxiosRequestConfig) {
	const instance = axios.create(merge(baseOptions, config || {}))

	instance.interceptors.response.use(
		function responseHandler(resp) {
			return resp
		},
		function errorHandler(error) {
			if (typeof error.response.data === 'object') {
				return Promise.reject(new HttpError(error.response.data))
			}
			return Promise.reject(error)
		}
	)

	return instance
}

export default createAxios()
