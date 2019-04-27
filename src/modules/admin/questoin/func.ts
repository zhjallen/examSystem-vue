import { questionBasicModel } from "./model/questionBasicModel";

export function getQuestionType(type) {
    if (type) {
        const typeObj = questionBasicModel.typeModel.find(
            item => item.value == type
        );
        if (typeObj) {
            return typeObj.label;
        }
    }
}

export function getQuestionDifficulty(difficulty) {
    if (difficulty) {
        const difficultyObj = questionBasicModel.difficultyModel.find(
            item => item.value == difficulty
        );
        return difficultyObj && difficultyObj.label;
    }
}