import actions from "./actions";
import layout from "./mutations";
import getters from "./getters";

const testState = {
  state: layout.state,
  mutations: layout.mutations,
  actions: actions,
  getters: getters,
}
export default testState;