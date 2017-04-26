import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import routerConfig from './router.config.js'

import Vuex from 'vuex'
import vuexConfig from './vuex.config.js'


Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter(routerConfig)

const store = new Vuex.Store(vuexConfig)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
