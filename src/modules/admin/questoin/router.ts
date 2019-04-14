import Layout from "../../layout/views/index.vue";
const questionRouter = [{
  path: '/',
  component: Layout, 
  children: [
    {
      path: 'admin/questionlist',
      name: 'QuestionList',
      component: resolve => require(['./views/question-list.vue'], resolve),
      meta: { title: '试题列表', icon: 'fdddfont el-icon-document' }
    }
  ]
},

]

export default questionRouter;