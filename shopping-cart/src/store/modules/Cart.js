import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  added:[]
}

// getters
const getters = {

}

// actions
const actions = {
   checkout({commit,state},products){
    const savedCartItems = [...state.added]
    commit(types.CHECKOUT_REQUEST)
    shop.buyProducts(products,
      () => commit(types.CHECKOUT_SUCCESS),
      () => commit(types.CHECKOUT_FAILURE,{savedCartItems})
      )
   },
}

// mutations
const mutations = {
  [types.ADD_TO_CART](state,{id,quantity}){
    const record = state.added.find(product => product.id === id);
    if (!record) {
      state.added.push({id,quantity:quantity})
    }else{
      record.quantity += quantity;
    }
  },
  [types.DELE_PRODUCT](state,{id,quantity}){
    let flag = true;
    state.added.forEach((e,i) => {
      if (e.id === id) {
        flag = false;
        if(e.quantity === quantity){
          state.added.splice(i,1);
        }else{
          e.quantity -= quantity;
        }
        alert('删除成功')
      }
    })
    if (flag) {
      alert('删除失败，请重试')
    }
  },
  [types.CHECKOUT_REQUEST](state){
    state.added =[]
  },
  [types.CHECKOUT_SUCCESS](){
    alert('success')
  },
  [types.CHECKOUT_FAILURE](state,{savedCartItems}){
    state.added = savedCartItems
    alert('failure')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
