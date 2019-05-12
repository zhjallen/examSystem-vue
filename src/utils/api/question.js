import api from "./index";

export function getQuestionListApi(params) {

    return api.get("/questionslist", { params })
}