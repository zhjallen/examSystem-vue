/*
 * @Description: In User Settings Edit
 * @Author: zhj
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-10 16:20:07
 * @LastEditTime: 2019-05-10 16:33:03
 */
const test = {
    state: {
        testInfo: {
            test: {}
        }
    },
    mutations: {
        SAVE_TEST(state, testInfo) {
            state.testInfo.test = testInfo
        }
    }
}


export default test;


