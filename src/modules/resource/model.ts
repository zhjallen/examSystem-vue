const resourceDetailModel = [
    {
        label: "父级菜单",
        propName: "parentName",
        span: 8,
        disabled:true,
    },
    {
        label: "所属系统",
        propName: "systemName",
        span: 8,
        disabled:true,
    },
    {
        label: "名称",
        propName: "name",
        span: 8,
        required: true,
    },
    {
        label: "链接地址",
        propName: "url",
        span: 8,
    },
    {
        label: "权限码",
        propName: "accessCode",
        span: 8,
        required: true,
    },
    {
        label: "类型",
        propName: "resourceType",
        span: 8,
        required: true,
    },
    {
        label: "排序",
        propName: "sortNum",
        span: 8,
    },
]
export { resourceDetailModel };