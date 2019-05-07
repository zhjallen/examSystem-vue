const testListSearchFormArr = [
    {
        showName: "考试名称",
        elementType: "input",
        key: "name",
        colProps: {
            span: 6,
        }
    },
    {
        showName: "考试状态",
        elementType: "select",
        key: "status",
        selectOptions: [
            { value: 0, label: "关闭" },
            { value: 1, label: "开放" },
        ],
        clearable: true,
        colProps: {
            span: 6,
        }
    },

    
]

const testDataOptions = {
    type: {
        1: "普通考试",
        2: "随机考试"
    },
    status: {
        1: "开放",
        0: "关闭",
    }
}
export { testListSearchFormArr, testDataOptions };