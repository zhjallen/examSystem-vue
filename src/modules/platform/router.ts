import Layout from "../layout/views/index.vue";
const platFormRouter = [{
  path: '/',
  component: Layout, 
  children: [
    {
      path: 'right/systemlist',
      name: 'SystemList',
      component: resolve => require(['./views/systemList.vue'], resolve),
      meta: { title: '平台管理', icon: 'fdddfont el-icon-document' }
    }
  ]
},

]

export default platFormRouter;