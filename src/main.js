import Vue from 'vue';
import VueRouter from 'vue-router';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'animate.css/animate.css';
import './assets/js/rem';

import App from './App.vue';
import routerConfig from './router.config';

import store from './store';


import './element-ui';
import './assets/css/common.scss';


Vue.use(MintUI);
Vue.use(VueRouter);

const router = new VueRouter(routerConfig);

// router.beforeEach((to, from, next) => {
//   console.log(from);
//   if (from.path === '/user/address' && to.path === '/confirmOrder/selectAddress') {
//     store.commit('OPEN_LOADING');
//   }
//   next();
// });

// router.afterEach(() => {
//   setTimeout(() => {
//     store.commit('CLOSE_LOADING');
//   }, 20000);
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
