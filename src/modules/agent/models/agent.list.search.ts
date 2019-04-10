const agentSeachModel = [
    {
        key: "agentCode",
        showName: "代理商编码",
        elementType: "input",
        colProps: {
            span: 6,
        },
        selectOptions: [],
        options: {
            rules: [
                { required: true, message: '请输入代理商编码', trigger: 'blur' }
            ]
        }
    },
    {
        key: "agentName",
        showName: "代理商名称",
        elementType: "input",
        colProps: {
            span: 6,
        },
        selectOptions: [],
        options: {
            rules: [
                { required: true, message: '请输入代理商名称', trigger: 'blur' }
            ]
        }
    },
    {
        key: "firstContact",
        showName: "第一联系人",
        elementType: "input",
        colProps: {
            span: 6,
        }, selectOptions: [],
        options: {
            rules: [
                { required: true, message: '请输入第一联系人', trigger: 'blur' }
            ]
        }
    },
    {
        key: "firstContactPost",
        showName: "职务",
        elementType: "input",
        colProps: {
            span: 6,
        },
        selectOptions: [],
        options: {
            rules: [
                { required: true, message: '请输入职务', trigger: 'blur' }
            ]
        }
    },
    {
        key: "firstContactMobile",
        showName: "手机号",
        elementType: "input",
        colProps: {
            span: 6,
        },
        selectOptions: [],
        options: {
            rules: [
                { required: true, message: '请输入手机号', trigger: 'blur' }
            ]
        }
    },

]
export { agentSeachModel };