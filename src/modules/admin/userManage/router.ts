import Layout from "../../layout/views/index.vue";
const userRouter = [{
  path: '/',
  component: Layout, 
  children: [
    {
      path: 'admin/user/list',
      name: 'UserList',
      component: resolve => require(['./views/user.list.vue'], resolve),
      meta: { title: '用户列表', icon: 'fdddfont el-icon-document' }
    },
    {
      path: 'admin/user/add',
      name: 'UserAdd',
    //   component: resolve => require(['./views/question.add.vue'], resolve),
      meta: { title: '新增试题', icon: 'fdddfont el-icon-document' }
    }
  ]
},

]

export default userRouter;