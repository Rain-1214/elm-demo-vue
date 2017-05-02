import Vue from 'vue'
import App from './App.vue'

import vueRouter from 'vue-router'
import routerConfig from './router.config.js'

import store from './store'

import {currency} from './tool/'

Vue.filter('currency',currency);

Vue.use(vueRouter);

const router = new vueRouter(routerConfig);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
