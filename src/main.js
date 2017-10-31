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

// 路由拦截
router.beforeEach((to, from, next) => {
  const hasOwn = Object.prototype.hasOwnProperty;
  const { shop, shoppingCart, user } = store.state;

  switch (to.path) {
    case '/shop':
      if (!hasOwn.call(shop.currentShop, 'id')) {
        router.push('/home');
      } break;
    case /^\/confirmOrder.*$/.test(to.path) && to.path:
      if (!hasOwn.call(shop.currentShop, 'id') || !hasOwn.call(shoppingCart.shoppingCartProducts, shop.currentShop.id)) {
        router.push('/home');
      }
      break;
    case /^\/user\/.*$/.test(to.path) && to.path:
      /* eslint-disable no-undef */
      console.log(user.user);
      if (localStorage.getItem('User') != null && !hasOwn.call(user.user, 'id')) {
        const User = localStorage.getItem('User');
        store.commit('SAVE_CURRENT_USER', JSON.parse(User));
      } else {
        router.push('/user');
      }
      break;
    case /(^\/login$)|(^\/register$)/.test(to.path) && to.path:
      if (localStorage.getItem('User') != null) {
        router.push('/user');
      }
      break;
    default:next();
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
