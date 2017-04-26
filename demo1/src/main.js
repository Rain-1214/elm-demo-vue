import Vue from 'vue'
import App from './App.vue'

import vueRouter from 'vue-router'
import vueRouterConfig from './router.config.js'



Vue.use(vueRouter);

const router = new vueRouter(vueRouterConfig);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
