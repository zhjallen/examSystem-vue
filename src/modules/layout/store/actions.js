import api from "../../../utils/api/index";

const actions = {
  collapseSidebar({
    commit
  }, sidebarStatus) {
    commit('SET_COLLAPSE_SIDEBAR', sidebarStatus)
  },
  hideSidebar({
    commit
  }, isHidden) {
    commit('SET_HIDDEN_SIDEBAR', isHidden)
  },

  setTheme({
    commit
  }, theme) {
    commit('SET_THEME', theme)
  },
  addTag({
    commit
  }, tag) {
    commit("ADD_TAG", tag)
  },
  removeTag({
    commit, state
  }, tag) {
    return new Promise((resolve, reject) => {
      commit("REMOVE_TAG", tag);
      resolve(state.tagTabState.activedTag)
    })
  },
  userLogout({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      api.get("/passport/logout", {
        params
      }).then(success => {
        resolve(success)
        commit("RESET_TAG");
        commit("SAVE_UERINFO", {
          userDetail: {},
          menuData: []
        }
        );
      }).catch(error => {
        commit("SAVE_UERINFO", {
          userDetail: {},
          menuData: []
        }
        )
        commit("RESET_TAG");
        reject(error)
      })
    })
  },

}
export default actions;