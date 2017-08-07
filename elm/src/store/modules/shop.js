import * as type from '../mutation-types.js';

const state = {
	currentShop:{},
}

const getters = {
	currentShop: state => state.currentShop,
}

const actions = {



}

const mutations = {

	[type.ALERT_CURRENTSHOP](state,shop){
		Object.assign(state.currentShop,shop);
	}

}

export default {
	state,
	getters,
	actions,
	mutations
}