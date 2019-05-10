const actions = {
    saveTestInfo({
      commit
    }, testInfo) {
      commit('SAVE_TEST', testInfo)
    },
}
export default actions;