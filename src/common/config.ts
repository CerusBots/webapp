const env = process.env.NODE_ENV || 'development'
const production = env === 'production'
const debug = !production

export default {
  env,
  production,
  debug
}
