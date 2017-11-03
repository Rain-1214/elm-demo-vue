import * as type from '../mutation-types';

const state = {
  currentOrder: {},
};

const getters = {
  currentOrder: state => state.currentOrder,
};

const actions = {

};

const mutations = {

  [type.ALERT_CURRENTORDER](state, order) {
    Object.assign(state.currentOrder, order);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
