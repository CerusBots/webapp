const env = process.env.NODE_ENV || 'development'
const production = env === 'production'
const debug = !production

export default {
	env,
	production,
	debug,
	domain: process.env.DOMAIN,
	apiHost: process.env.API_HOST,
	apiVersion: 'v1',
}
