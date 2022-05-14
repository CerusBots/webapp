import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    debug: true,
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
