require('dotenv').config()

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
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
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-awesome-swiper',
    '~plugins/vue-js-modal.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  publicRuntimeConfig: {
    apiURL: process.env.API_URL
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  server: {
    host: '0.0.0.0'
  },
  axios: {
    baseURL: process.env.API_URL
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: process.env.API_URL + '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: process.env.API_URL + '/auth/logout', method: 'delete' },
          user: { url: process.env.API_URL + '/auth/user', method: 'get', propertyName: 'user' }
        }
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/profile',
      home: '/profile'
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
