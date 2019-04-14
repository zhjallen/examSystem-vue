import api from "../../../utils/api/index";

export function getQuestionListApi(params) {
    
    return api.get("/questionslist", )
}

export function addQuestionApi(questionInfo) {
    
    return api.post("/question/add",{data:questionInfo} )
}


