const testBasicModelArr = [
    {
        showName: "考试名称",
        elementType: "input",
        key: "name",
        rules: [{ required: true, message: "请输入考试名称", trigger: "blur" },],
        colProps: {
            span: 12,
        }
    },
    {
        showName: "考试时间",
        elementType: "dateTimeRange",
        key: "startTime",
        rules: [{ required: true, message: "请输入考试开始时间", trigger: "blur" },],
        colProps: {
            span: 12,
        }
    },
    {
        showName: "状态",
        elementType: "select",
        key: "status",
        selectOptions: [
            { value: 0, label: "关闭" },
            { value: 1, label: "开放" },
        ],
        defaultValue: 1,
        colProps: {
            span: 12,
        }
    },
    
    {
        showName: "考试时长",
        elementType: "input",
        key: "length",
        colProps: {
            span: 12,
        }
    },
    {
        showName: "考试类型",
        elementType: "select",
        key: "type",
        selectOptions: [
            { value: 1, label: "普通考试" },
            { value: 2, label: "随机考试" },
        ],
        defaultValue: 1,
        colProps: {
            span: 12,
        }
    },
    {
        showName: "总分",
        elementType: "input",
        key: "totalScore",
        defaultValue: 100,
        colProps: {
            span: 12,
        }
    },
    {
        showName: "及格分数",
        elementType: "input",
        key: "passScore",
        defaultValue: 60,
        colProps: {
            span: 12,
        }
    },
];
export { testBasicModelArr }