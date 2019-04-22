const menuObj = {
    admin: [
        {
            title: " 用户管理",
            link: "/admin/usermanage",
            key: "user",
            children: [
                {
                    title: "用户列表",
                    link: "/admin/user/list",
                    key: "userlist"
                }
            ]

        }
    ]
}

export default menuObj;