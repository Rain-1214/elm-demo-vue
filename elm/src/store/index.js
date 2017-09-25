import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

import location from './modules/location.js'
import shoppingCart from './modules/shoppingCart.js'
import shop from './modules/shop.js'
import user from './modules/user.js'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
  	location,
  	shoppingCart,
  	shop,
  	user
  }
})
