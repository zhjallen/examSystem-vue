const testConfigBasicModelArr = [
    {
        showName: "考试名称",
        elementType: "input",
        key: "name",
        rules: [{ required: true, message: "请输入考试名称", trigger: "blur" },],
        colProps: {
            span: 8,
        }
    },

    {
        showName: "考试时间",
        elementType: "dateTimeRange",
        key: "startTime",
        rules: [{ required: true, message: "请输入考试时间", trigger: "blur" },],
        colProps: {
            span: 16,
        }
    },
]

export { testConfigBasicModelArr };