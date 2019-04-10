import actions from "./actions";
import user from "./mutations";
import getters from "./getters";

const userState = {
  state: user.state,
  mutations: user.mutations,
  actions: actions,
  getters: getters,
}
export default userState;