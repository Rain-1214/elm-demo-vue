import * as types from '../mutation-types.js';
import {analysisLocation} from '../../api/location.js';

const state = {
	latitude: '', // 当前位置纬度
	longitude: '', // 当前位置经度
	currentLocation:''
}

const getters ={
	currentLocation:state => state.currentLocation,
	latitude:state => state.latitude,
	longitude:state => state.longitude,
}

const actions = { 
	getLocation({commit,state},location){
		analysisLocation(location).then((res) => {
			console.log(res)

			const {result:{addressComponent:{province:currentLocation}}} = JSON.parse(res.data.data);
			commit(types.ALERT_LOCATION,{currentLocation,...location});

		})
		.catch((error) => {
			state.currentLocation = '未知'
		})
	}
}

const mutations = {
	[types.ALERT_LOCATION](state,{currentLocation,latitude,longitude}){
		state.currentLocation = currentLocation;
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


