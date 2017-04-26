import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
const state = {
  all:[]
}

// getters
const getters = {
  allProduct:state => state.all
}

//actions
const actions = {
  getAllProduct({commit}){
    shop.getProducts( products => {
      commit(types.RECEIVE_PRODUCTS,{ products })
    })
  },
}

// mutations
const mutations = {
  [types.RECEIVE_PRODUCTS](state,{products}){
    state.all = products
  },
  [types.DELE_PRODUCT](state,{id,quantity}){
    state.all.find(p => p.id === id).inventory += parseInt(quantity);
  },
  [types.ADD_TO_CART](state,{id,quantity}){
    state.all.find(e => e.id === id).inventory -= parseInt(quantity) ;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
