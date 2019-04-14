import Vuex from 'vuex'
import Vue from 'vue';
import layoutState from "../modules/layout/store/index";
import loginState from "../modules/login/store/index";
// import characterState from "../modules/character/store/index";
// import productSupplyLibrary from "../modules/productSupplyLibrary/store/index";
//import actions from './actions'
//import userState from "../modules/user/store/index";

Vue.use(Vuex);

export default new Vuex.Store({
 
  modules: {
    layoutState,
    loginState,
    // characterState,
    // productSupplyLibrary
  }
})