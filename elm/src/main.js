import Vue from 'vue'
import App from './App.vue'


import vueRouter from 'vue-router'
import routerConfig from './router.config.js'

import MintUI from 'mint-ui'

import store from './store'

import './assets/css/common.scss'
import 'mint-ui/lib/style.css'
import 'animate.css/animate.css'

import './element-ui.js'


Vue.use(MintUI);
Vue.use(vueRouter);


const router = new vueRouter(routerConfig);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

