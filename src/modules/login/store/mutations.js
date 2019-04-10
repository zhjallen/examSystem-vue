// import router from "../../../router/index";
// function handelRouter(menu){
//   if(menu.data.name===)
// }
const user = {
  state: {
    userInfo: {
      userDetail: {},
      menuData: []

    }
  },
  mutations: {
    // 保存用户信息
    SAVE_UERINFO(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
}

export default user;