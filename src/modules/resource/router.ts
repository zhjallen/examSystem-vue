import Layout from "../layout/views/index.vue";
const resourceRouter = [{
    path: '/',
    component: Layout,
    children: [
        {
            path: 'right/resourcelist',
            name: 'ResourceList',
            component: resolve => require(['./views/resourceList.vue'], resolve),
            meta: { title: '资源管理', icon: 'fdddfont el-icon-document' }
        }
    ]
},
]

export default resourceRouter;