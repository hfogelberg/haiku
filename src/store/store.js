import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import user from './modules/userStore'

export const store = new Vuex.Store ({
  modules: {
    user
  }
})
