import * as type from '../mutation-types.js';

const state = {
	shoppingCartProducts:[],
}

const getters = {
	shoppingCartProducts:state => state.shoppingCartProducts,

}

const actions = {



}

const mutations = {

	[type.ADD_TO_SHOPPINGCART](state,productInfo){
		state.shoppingCartProducts.push(productInfo);
	}

}

export default {
	state,
	getters,
	actions,
	mutations
}