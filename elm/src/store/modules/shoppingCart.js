import * as type from '../mutation-types.js';

const state = {
	shoppingCartProducts:{},
}

const getters = {
	shoppingCartProducts:state => state.shoppingCartProducts,

}

const actions = {



}

const mutations = {

	[type.ADD_TO_SHOPPINGCART](state,{foodName,shopId,price,shopName,foodType,foodId,foodNum}){
		//判断购物中是否有此店铺
		if (Object.prototype.hasOwnProperty.call(state.shoppingCartProducts,shopId)) {
			let eachFlag = true;
			state.shoppingCartProducts[shopId].foodList.forEach((e,i) => {
				if (e.foodType === foodType && e.foodId === foodId) {
					eachFlag = false;
					e.foodNum ++;
				}
			});
			if (eachFlag) {
				tempObject[shopId].foodIdList.add(foodId);
				tempObject[shopId][foodList].push({foodName,price,foodType,foodNum,foodId});
			}
		}else{
			let tempObject = {};
			tempObject[shopId] = {shopName};
			tempObject[shopId].foodList = [];
			tempObject[shopId].foodIdList = new Set();
			tempObject[shopId].foodIdList.add(foodId);
			tempObject[shopId].foodList.push({foodName,price,foodType,foodNum,foodId});
			Object.assign(state.shoppingCartProducts,tempObject);
		}
	}

}

export default {
	state,
	getters,
	actions,
	mutations
}