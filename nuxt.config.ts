import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@intlify/nuxt3', '@nuxtjs/color-mode', '@midstallsw/vista'],
    vista: {
        branding: {
            kind: 'product',
            license: 'GPL-3.0'
        },
        layouts: {
            default: {
                links: [{ url: '/', icon: 'mdi-home', title: { key: 'page.home' } }]
            }
        }
    },
    vite: {
        define: {
            'process.env.SENTRY_DSN': `"${process.env.SENTRY_DSN}"`
        },
        optimizeDeps: {
            include: ['@sentry/vue', '@sentry/tracing']
        }
    },
    intlify: {
        vueI18n: {
            locale: 'en',
            messages: {
                en: {
                    company: {
                        name: 'Midstall Software'
                    },
                    product: {
                        name: 'Cerus'
                    },
                    page: {
                        home: 'Home'
                    }
                }
            }
        }
    }
})
