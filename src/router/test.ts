import Layout from "../../modules/layout/views/index.vue";
const testRouter = [{
    path: '/',
    component: Layout,
    children: [
        {
            path: 'admin/test/list',
            name: 'QuestionList',
            component: resolve => require(['../../modules/admin/test/views/test.list.vue'], resolve),
            meta: { title: '考试列表', icon: 'fdddfont el-icon-document' }
        },
        {
            path: 'admin/test/add',
            name: 'QuestionAdd',
            component: resolve => require(['../../modules/admin/test/views/test.add.vue'], resolve),
            meta: { title: '新增考试', icon: 'fdddfont el-icon-document' }
        },
        {
            path: 'admin/test/edit',
            name: 'QuestionEdit',
            component: resolve => require(['../../modules/admin/test/views/test.edit.vue'], resolve),
            meta: { title: '修改考试', icon: 'fdddfont el-icon-document' }
        }
    ]
},

]

export default testRouter;