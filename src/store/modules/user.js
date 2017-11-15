import * as type from '../mutation-types';
import { getUserAddress, getUserHongbao, getUserActivityScore } from '../../api/user';

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
      commit(type.AFRESH_ADDRESS, res.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async afreshHongbao({ state, commit }) {
    try {
      const userId = state.user.id;
      const res = await getUserHongbao({ userId });
      console.log(res);
      commit(type.AFRESH_HONGBAO, res.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async afreshActicityPoint({ state, commit }) {
    const userId = state.user.id;
    try {
      const res = await getUserActivityScore({ userId });
      if (res.data.stateCode) {
        commit(type.AFRESH_ACTIVITYSCORE, res.data.data);
      }
    } catch (e) {
      console.log(e);
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
    localStorage.setItem('User', JSON.stringify(state.user));
  },
  [type.AFRESH_HONGBAO](state, hongbaoArray) {
    state.user.hongbao = [...hongbaoArray];
    localStorage.setItem('User', JSON.stringify(state.user));
  },
  [type.AFRESH_ACTIVITYSCORE](state, activityScore) {
    state.user.activityPoint = activityScore;
    localStorage.setItem('User', JSON.stringify(state.user));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
