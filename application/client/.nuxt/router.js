import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a758cbc4 = () => interopDefault(import('..\\pages\\songRecommendations.vue' /* webpackChunkName: "pages/songRecommendations" */))
const _439159f8 = () => interopDefault(import('..\\pages\\songRecommendations2.vue' /* webpackChunkName: "pages/songRecommendations2" */))
const _2d389849 = () => interopDefault(import('..\\pages\\test.vue' /* webpackChunkName: "pages/test" */))
const _da9fa7aa = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/songRecommendations",
    component: _a758cbc4,
    name: "songRecommendations"
  }, {
    path: "/songRecommendations2",
    component: _439159f8,
    name: "songRecommendations2"
  }, {
    path: "/test",
    component: _2d389849,
    name: "test"
  }, {
    path: "/",
    component: _da9fa7aa,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
