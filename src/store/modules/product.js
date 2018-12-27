import { getProducts, getProductDetail } from '@/api';

const state = {
  products: [],
  categoryFilter: 'All',
  tempProduct: {
    imageUrl: '',
  },
}

const getters = {
  filtedProducts(state) {
    if (state.categoryFilter === 'All') {
      return state.products;
    }
    return state.products.filter(item => item.category === state.categoryFilter);
  }
}

const mutations = {
  GET_PRODUCTS(state, products) {
    state.products = products;
  },

  GET_PRODUCT_DETAIL(state, product) {
    state.tempProduct = product;
  },

  FILTER_PRODUCTS(state, type) {
    state.categoryFilter = type;
  }
}

const actions = {
  getProducts: async({ commit, dispatch }) => {
    dispatch('loading/setLoading', null, { root: true });
    try {
      const { data: { products } } = await getProducts();
      commit('GET_PRODUCTS', products);
    }catch(error) {
      console.log(error.response);
    };
    dispatch('loading/setLoading', null, { root: true });
  },

  getProductDetail: async ({ commit, dispatch }, id) => {
    dispatch('loading/setLoading', null, { root: true });
    try {
      const { data: { product } } = await getProductDetail({ id });
      commit('GET_PRODUCT_DETAIL', product);
    }catch(error) {
      console.log(error.response);
    };
    dispatch('loading/setLoading', null, { root: true });
  },

  filterProducts: ({ commit }, type) => {
    commit('FILTER_PRODUCTS', type);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}