import Layout from "../layout/views/index.vue";
const staffManage = [{
    path: '/',
    component: Layout,
    children: [{
      path: '/right/user',
      name: 'user',
      component: resolve => require(['./views/userManage.vue'], resolve),
      meta: {
        title: '用户管理',
        icon: 'fdddfont el-icon-document'
      }
    }]
  },

]

export default staffManage;