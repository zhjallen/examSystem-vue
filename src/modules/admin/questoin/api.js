import api from "../../../utils/api/index";

export function getQuestionListApi(params) {

    return api.get("/questionslist", { params })
}

export function addQuestionApi(questionInfo) {

    return api.post("/question/add", { data: questionInfo })
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

