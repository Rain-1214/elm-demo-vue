import * as types from '../mutation-types.js';

const state = {
	latitude: '', // 当前位置纬度
	longitude: '', // 当前位置经度
}

const getters ={
	latitude:state => state.latitude,
	longitude:state => state.longitude
}

const actions = { 

}

const mutations = {
	[types.ALERT_LOCATION](state,{latitude,longitude}){
		state.latitude = latitude;
		state.longitude = longitude;
	}
}

export default {
  state,
  getters,
  actions,
  mutations
}
