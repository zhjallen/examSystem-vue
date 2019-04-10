const agentBasicModel = [
    {
        key: "agentCode",
        showName: "代理商编码",
        elementType: "input",
        colProps: {
            span: 12,
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
            span: 12,
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
            span: 12,
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
            span: 12,
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
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [
                { required: true, message: '请输入手机号', trigger: 'blur' }
            ]
        }
    },
    {
        key: "contactEmail",
        showName: "邮箱",
        elementType: "input",
        colProps: {
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [
                { required: true, message: '请输入邮箱', trigger: 'blur' }
            ]
        }
    },
    {
        key: "applyReason",
        showName: "申请理由",
        elementType: "input",
        colProps: {
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [
                { required: true, message: '请输入申请理由', trigger: 'blur' }
            ]
        }
    },
]
const agentDetailModel = [
    {
        key: "mainBusiness",
        showName: "主营业务",
        elementType: "input",
        colProps: {
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [

            ]
        }
    },
    {
        key: "registeredCapital",
        showName: "注册资金",
        elementType: "input",
        colProps: {
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [

            ]
        }
    },
    {
        key: "legalPerson",
        showName: "法人",
        elementType: "input",
        colProps: {
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [

            ]
        }
    },
    {
        key: "companyNature",
        showName: "公司性质",
        elementType: "select",
        colProps: {
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [

            ]
        }
    },
    {
        key: "registeredAddress",
        showName: "注册地址",
        elementType: "input",
        colProps: {
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [
            ]
        }
    },
    {
        key: "establishedTime",
        showName: "成立时间",
        elementType: "input",
        colProps: {
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [

            ]
        }
    },
    {
        key: "secondContact",
        showName: "第二联系人",
        elementType: "input",
        colProps: {
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [

            ]
        }
    }, {
        key: "secondContactPost",
        showName: "第二联系人职务",
        elementType: "input",
        colProps: {
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [

            ]
        }
    },
    {
        key: "secondContactTel",
        showName: "第二联系人电话",
        elementType: "input",
        colProps: {
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [

            ]
        }
    },
    {
        key: "openingBank",
        showName: "开户行",
        elementType: "input",
        colProps: {
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [

            ]
        }
    },
    {
        key: "bankAccount",
        showName: "银行账号",
        elementType: "input",
        colProps: {
            span: 12,
        },
        selectOptions: [],
        options: {
            rules: [

            ]
        }
    },
]
export { agentBasicModel, agentDetailModel };