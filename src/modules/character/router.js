import Layout from "../layout/views/index.vue";
const characterManageRouter = [{
  path: '/',
  component: Layout, 
  children: [
    {
      path: 'right/character',
      name: 'character',
      component: resolve => require(['./views/character.vue'], resolve),
      meta: { title: '角色管理', icon: 'fdddfont el-icon-document' }
    }
  ]
  }
]
export default characterManageRouter;