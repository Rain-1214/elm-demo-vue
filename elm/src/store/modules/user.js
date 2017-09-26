import * as type from '../mutation-types.js';

const state = {
	user:{},
}

const getters = {
	currentUser:(state) => state.user
}

const actions = {

}

const mutations = {

	[type.SAVE_CURRENT_USER](state,user){
		state.user = Object.assign({},state.user,user);
		localStorage.setItem('User', JSON.stringify(state.user));
	},
	[type.REMOVE_CURRENT_USER](state){
		state.user = {};
		localStorage.removeItem('User');
	}
	

}

export default {

	state,
	getters,
	actions,
	mutations,

}