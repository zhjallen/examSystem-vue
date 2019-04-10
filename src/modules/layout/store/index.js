import actions from "./actions";
import layout from "./mutations";
import getters from "./getters";

const layoutState = {
  state: layout.state,
  mutations: layout.mutations,
  actions: actions,
  getters: getters,
}
export default layoutState;