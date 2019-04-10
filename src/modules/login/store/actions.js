import api from "../../../utils/api/index";
import { getDataUrl } from "../../../utils/functions/objFunc";

const actions = {
  userLogin({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      api.get("/passport/pc/login", {
        params
      }).then(success => {
        resolve(success)
        commit("SAVE_UERINFO", success.data.dataMap)
      }).catch(error => {
        reject(error)
        commit("SAVE_UERINFO", { userName: "登录失败" })
      })
    })
  },
  modifyPasswordAction({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      api.post("/passport/pc/password/modify" + getDataUrl(data), { data }).then(success => {
        resolve(success);
        commit("SAVE_UERINFO", {
          userDetail: {},
          menuData: []
        })
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default actions;