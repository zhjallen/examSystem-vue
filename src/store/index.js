import Vuex from 'vuex'
import Vue from 'vue';
import layoutState from "../modules/layout/store/index";
import loginState from "../modules/login/store/index";
import testState from "../modules/admin/test/store/index";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layoutState,
    loginState,
    testState,
  }
})