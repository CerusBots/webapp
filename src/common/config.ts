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
	auth0: {
		clientID: process.env.AUTH0_CLIENT_ID,
		domain: process.env.AUTH0_DOMAIN,
		issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
	},
}
