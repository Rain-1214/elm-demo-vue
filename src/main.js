import Vue from 'vue';
import VueRouter from 'vue-router';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'animate.css/animate.css';

import App from './App.vue';
import routerConfig from './router.config';

import store from './store';


import './element-ui';
import './assets/js/rem';
import * as tool from './tool/tool';
import './assets/css/common.scss';


Vue.use(MintUI);
Vue.use(VueRouter);


const router = new VueRouter(routerConfig);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    tool.add(1, 2, 3, 4);
  },
});
