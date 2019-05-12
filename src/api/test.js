/*
 * @Description: In User Settings Edit
 * @Author: zhj
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-30 10:04:25
 * @LastEditTime: 2019-05-12 20:35:10
 */
import api from "../utils/api/index";

/**
 * 获取考试列表
 * @param {object} params 
 */
export function getTestListApi(params) {
    return api.get("/testslist", { params })
}

export function addTestApi(testInfo) {

    return api.post("/tests/add", { data: { testInfo } })
}
/**
 * 根据试题id删除
 *
 * @export
 * @param {*} id
 * @returns
 */
export function delQuestionApi(id) {
    return api.delete(`/questions/${id}`);
}
/**
 * 根据试题id获取试题信息
 *
 * @export
 * @param {*} id
 * @returns
 */
export function getQuestionApi(id) {
    return api.get(`/questions/${id}`);
}
/**
 * 批量增加考试内容
 * @param {Array<any>} testContents 
 */
export function addTestContentsApi(testContents) {
    return api.post("testcontents/add", {
        data: testContents
    })
}


