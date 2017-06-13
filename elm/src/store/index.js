import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

import location from './modules/location.js'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
  	location,
  }
})
