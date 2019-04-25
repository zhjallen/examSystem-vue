const menuObj = {
    admin: [
        {
            title: " 用户管理",
            link: "/admin/usermanage",
            key: "admin_usermange",
            children: [
                {
                    title: "用户列表",
                    link: "/admin/user/list",
                    key: "admin_user_list"
                }
            ]

        },
        {
            title: "题库管理",
            link: "/admin/questoin",
            key: "admin_question",
            children: [
                {
                    title: "题库列表",
                    link: "/admin/question/list",
                    key: "admin_question_list"
                }
            ]

        }
    ]
}

export default menuObj;