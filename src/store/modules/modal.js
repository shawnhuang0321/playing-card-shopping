const state = {
  isShowSidebar: false,
  message: [],
}

const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.isShowSidebar = !state.isShowSidebar;
  },

  ADD_MESSAGE(state, message) {
    state.message.unshift(message);
  },

  REMOVE_MESSAGE(state, id) {
    state.message = state.message.filter(item => {
      return item.id !== id;
    });
  },

  REMOVE_MESSAGE_AFTER_FIVE_SECOND(state, id) {
    state.message = state.message.filter(item => {
      return item.id !== id;
    });
  },
}

const actions = {
  toggleSidebar: ({ commit }) => {
    commit('TOGGLE_SIDEBAR');
  },

  addMessage: ({ commit }, message) => {
    message.id = new Date().getTime();
    commit('ADD_MESSAGE', message);
    const { id } = message;
    setTimeout(() => {
      commit('REMOVE_MESSAGE_AFTER_FIVE_SECOND', id);
    }, 5000)
  },

  removeMessage: ({ commit }, id) => {
    commit('REMOVE_MESSAGE', id);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}