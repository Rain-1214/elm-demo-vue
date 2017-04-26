import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import cart from './modules/Cart'
import product from './modules/Product'

Vue.use(Vuex)


export default new Vuex.Store({
  actions,
  getters,
  modules: {
    cart,
    product
  }
})
