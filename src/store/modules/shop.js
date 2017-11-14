import * as type from '../mutation-types';

const state = {
  currentShop: {},
};

const getters = {
  currentShop: state => state.currentShop,
};

const actions = {

};

const mutations = {

  [type.ALERT_CURRENTSHOP](state, shop) {
    // 重新排序满减数组
    const shopFullArray = shop.shopFullMinus.sort((a, b) => a.full - b.full);
    shop.shopFullMinus = shopFullArray;
    Object.assign(state.currentShop, shop);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
