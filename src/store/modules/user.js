import * as type from '../mutation-types';
import { getUserAddress } from '../../api/user';

const state = {
  user: {},
};

const getters = {
  currentUser: (state) => state.user,
};

const actions = {
  async afreshAddress({ state, commit }) {
    try {
      const userId = state.user.id;
      const res = await getUserAddress({ userId });
      console.log(res);
      commit(type.AFRESH_ADDRESS, res.data.data);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {

  [type.SAVE_CURRENT_USER](state, user) {
    state.user = Object.assign({}, state.user, user);
    /* eslint-disable no-undef */ 
    localStorage.setItem('User', JSON.stringify(state.user));
  },
  [type.REMOVE_CURRENT_USER](state) {
    state.user = {};
    localStorage.removeItem('User');
  },
  [type.AFRESH_ADDRESS](state, addressArray) {
    state.user.address = [...addressArray];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
