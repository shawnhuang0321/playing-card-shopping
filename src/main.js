// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate, { Validator } from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';

import App from './App';
import router from './router';
import store from './store';

Vue.component('Loading', Loading);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios, Vuex);
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW', zhTWValidate);

Validator.localize('zh_TW', {
  messages: zhTWValidate.messages,
  attributes: {
    name: '收件人姓名',
    tel: '收件人電話',
    address: '收件人地址',
  },
  messages: {
    required: field => `${field}為必填欄位`,
  }
});

axios.defaults.baseURL = `${process.env.API_PATH}/api/${process.env.CUSTOMPATH}`;
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
