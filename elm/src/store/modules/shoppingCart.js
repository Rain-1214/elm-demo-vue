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
			// 是否有相同的（包括同一商品类型不同）商品
			state.shoppingCartProducts[shopId].foodList.forEach((e,i) => {
				if (e.foodType === foodType && e.foodId === foodId) {
					eachFlag = false;
					e.foodNum ++; //如果有 就添加数量
					let tempFoodNum = state.shoppingCartProducts[shopId].foodIdList.get(foodId);
					tempFoodNum++;
					state.shoppingCartProducts[shopId].foodIdList.set(foodId,tempFoodNum); 
					state.shoppingCartProducts[shopId].totalPrice += e.price;
				}
			});
			if (eachFlag) {
				if (state.shoppingCartProducts[shopId].foodIdList.has(foodId)) {
					let tempFoodNum = state.shoppingCartProducts[shopId].foodIdList.get(foodId);
					tempFoodNum ++;
					state.shoppingCartProducts[shopId].foodIdList.set(foodId,tempFoodNum);
					state.shoppingCartProducts[shopId].foodList.push({foodName,price,foodType,foodNum,foodId});
					state.shoppingCartProducts[shopId].totalPrice += price;
				}else{
					state.shoppingCartProducts[shopId].foodIdList.set(foodId,1);
					state.shoppingCartProducts[shopId].foodList.push({foodName,price,foodType,foodNum,foodId});
					state.shoppingCartProducts[shopId].totalPrice += price;
				}
			}
		}else{
			let tempObject = {};
			tempObject[shopId] = {shopName};  //创建当前商店
			tempObject[shopId].foodList = []; //创建选中的当前商店中的商品数组
			tempObject[shopId].foodIdList = new Map(); //创建选中的当前商店中的商品的ID的 Map key:ID value:商品数量
			tempObject[shopId].foodIdList.set(foodId,1); //添加当前商品的ID
			tempObject[shopId].totalPrice = price; //创建初始总价格
			tempObject[shopId].foodList.push({foodName,price,foodType,foodNum,foodId}); //在选中商品数组当中添加当前商品
			Object.assign(state.shoppingCartProducts,tempObject);
		}
	},
	[type.REMOVE_FORM_SHOPPINGCART](state,{shopId,foodId,foodType=""}){
		
		state.shoppingCartProducts[shopId].foodList.forEach((e,i) => {
			if (e.foodId === foodId && (e.foodType === foodType || foodType === 'always')) {
				e.foodNum --;
				state.shoppingCartProducts[shopId].totalPrice -= e.price;
				if (e.foodNum === 0) {
					state.shoppingCartProducts[shopId].foodList.splice(i,1);
				}
			}
		});

		let tempNum = state.shoppingCartProducts[shopId].foodIdList.get(foodId);
		tempNum--;

		// 判断购物车当中该商品是否为空
		if (tempNum === 0) {
			state.shoppingCartProducts[shopId].foodIdList.delete(foodId); 
		}else{
			state.shoppingCartProducts[shopId].foodIdList.set(foodId,tempNum); 
		};
		//  判断该商品是不是购物车当中最后一件商品
		if (state.shoppingCartProducts[shopId].foodList.length === 0) {
			delete state.shoppingCartProducts[shopId];
		}

	},
	[type.REMOVE_ALL_PRODUCTS](state,{shopId}){
		state.shoppingCartProducts = Object.assign({},delete state.shoppingCartProducts[shopId]);
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}