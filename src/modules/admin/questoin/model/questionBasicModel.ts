const questionBasicModel = {
    typeModel: [
        { value: 1, label: "单选" },
        { value: 2, label: "多选" },
        { value: 3, label: "判断" },
        { value: 4, label: "填空" },
        { value: 5, label: "问答" },
    ],
    difficultyModel: [
        { value: 1, label: "非常容易" },
        { value: 2, label: "比较容易" },
        { value: 3, label: "常规" },
        { value: 4, label: "较难" },
        { value: 5, label: "非常难" },
    ],
    basicFormArr: [
        {
            showName: "试题名称",
            elementType: "input",
            key: "name",
            disabled: false
        },
        {
            showName: "试题类型",
            elementType: "input",
            key: "type"
        },

        {
            showName: "难度",
            elementType: "input",
            key: "difficulty"
        },
        {
            showName: "分数",
            elementType: "input",
            key: "score"
        },
        {
            showName: "题干",
            elementType: "input",
            key: "question_main"
        },
        // {
        //     showName: "题干",
        //     elementType: "input",
        //     key: "question_main"
        // },
    ]

}
export { questionBasicModel };