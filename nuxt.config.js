export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Conduit',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/main.css'],
    plugins: ['@/plugins/repository'],
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/composition-api/module',
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',



    ],
    axios: {
        baseURL: 'https://conduit.productionready.io/api/',
    },
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://axios.nuxtjs.org
        '@nuxtjs/axios',
        // https://github.com/nuxt-community/community-modules/tree/master/packages/markdownit
        '@nuxtjs/markdownit',
        '@nuxtjs/auth-next'
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    // https://github.com/nuxt-community/modules/tree/master/packages/markdownit
    markdownit: {
        injected: true,
    },
    fontawesome: {
        component: 'Fa',
        suffix: false,
        icons: {
            solid: true,
            brands: true,
        },
    },
    // router: {
    //     middleware: ['auth']
    // }
    // https://typescript.nuxtjs.org/guide/lint.html#runtime-lint

}