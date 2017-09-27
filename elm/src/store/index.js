import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import location from './modules/location';
import shoppingCart from './modules/shoppingCart';
import shop from './modules/shop';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    location,
    shoppingCart,
    shop,
    user,
  },
});
