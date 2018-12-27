const state = {
  isLoading: false,
}

const mutations = {
  SET_LOADING(state) {
    state.isLoading = !state.isLoading;
  }
}

const actions = {
  setLoading({ commit }) {
    commit('SET_LOADING');
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}