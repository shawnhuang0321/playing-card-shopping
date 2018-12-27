import { addToCart, getCartList, removeProductFromCart, getDiscount, sendOrder, getOrder, payMoney } from '@/api';

const state = {
  cart: {
    carts: [],
    final_total: 0,
    total: 0,
  },
  orderId: '',
  order: {
    user: {},
  },
}

const mutations = {
  GET_CART_LIST(state, data) {
    state.cart = data;
  },

  SET_ORDER_ID(state, id) {
    state.orderId = id;
  },

  SET_ORDER(state, order) {
    state.order = order;
  }
}

const actions = {
  addToCart: async ({ commit, dispatch }, product) => {
    dispatch('loading/setLoading', null, { root: true });
    try {
      const { data } = await addToCart({ product });
      dispatch('getCartList');
      const message = {
        content: data.message,
        type: 'success',
      };
      dispatch('modal/addMessage', message, { root: true });
    }catch(error) {
      console.log(error.response);
    };
    dispatch('loading/setLoading', null, { root: true });
  },

  getCartList: async ({ commit }) => {
    try{
      const { data: { data } } = await getCartList();
      commit('GET_CART_LIST', data);
    }catch(error) {
      console.log(error.response);
    };
  },

  removeProductFromCart: async ({ commit, dispatch }, id) => {
    dispatch('loading/setLoading', null, { root: true });
    try{
      const { data } = await removeProductFromCart({ id });
      dispatch('getCartList');
      const message = {
        content: data.message,
        type: 'success',
      };
      dispatch('modal/addMessage', message, { root: true });
    }catch(error) {
      console.log(error.response);
    }
    dispatch('loading/setLoading', null, { root: true });
  },

  getDiscount: async ({ commit, dispatch }, code) => {
    dispatch('loading/setLoading', null, { root: true });
    try{
      const { data } = await getDiscount({ code });
      if (!data.success) {
        const message = {
          content: data.message,
          type: 'danger',
        }
        dispatch('modal/addMessage', message, { root: true });
      }
      else {
        const message = {
          content: data.message,
          type: 'success',
        }
        dispatch('modal/addMessage', message, { root: true });
      }
      dispatch('loading/setLoading', null, { root: true });
      dispatch('getCartList');
    }catch(error) {
      console.log(error.response);
    }
  },

  sendOrder: async ({ commit, dispatch }, { order, message }) => {
    dispatch('loading/setLoading', null, { root: true });
    try{
      const { data } = await sendOrder({ order, message });
      if (!data.success) {
        const message = {
          content: data.message,
          type: 'danger',
        }
        dispatch('modal/addMessage', message, { root: true });
      }
      else {
        const message = {
          content: data.message,
          type: 'success',
        }
        dispatch('modal/addMessage', message, { root: true });
        commit('SET_ORDER_ID', data.orderId);
      }
      dispatch('loading/setLoading', null, { root: true });
    }catch(error) {
      console.log(error.response);
    }
  },

  getOrder: async ({ commit, dispatch }, id) => {
    dispatch('loading/setLoading', null, { root: true });
    try{
      const { data: { order } } = await getOrder({ id });
      commit('SET_ORDER', order);
    }catch(error) {
      console.log(error.response);
    }
    dispatch('loading/setLoading', null, { root: true });
  },

  payMoney: async ({ dispatch }, id) => {
    dispatch('loading/setLoading', null, { root: true });
    try{
      const { data } = await payMoney({ id });
      if (data.success) {
        const message = {
          content: data.message,
          type: 'success',
        }
        dispatch('modal/addMessage', message, { root: true });
        dispatch('getOrder', id);
        dispatch('getCartList');
      }
    }catch(error) {
      console.log(error.response);
    }
    dispatch('loading/setLoading', null, { root: true });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}