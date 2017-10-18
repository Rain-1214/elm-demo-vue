import * as type from '../mutation-types';

const state = {
  currentShop: {},
  isLoading: false,
};

const getters = {
  currentShop: state => state.currentShop,
  isLoading: state => state.isLoading,
};

const actions = {

};

const mutations = {

  [type.ALERT_CURRENTSHOP](state, shop) {
    Object.assign(state.currentShop, shop);
  },
  [type.OPEN_LOADING](state) {
    state.isLoading = true;
  },
  [type.CLOSE_LOADING](state) {
    state.isLoading = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
