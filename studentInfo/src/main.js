import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import MintUI from 'mint-ui'
import VueRouter from 'vue-router'
import VueRouterConfig from './routerConfig.js'


import './assets/css/app.scss'
import './assets/css/common.scss'
import 'mint-ui/lib/style.css'
import 'animate.css/animate.css'

import './element-ui.js'


Vue.use(MintUI);
Vue.use(VueRouter);

const router = new VueRouter(VueRouterConfig);

Vue.prototype.$ajax=axios;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
