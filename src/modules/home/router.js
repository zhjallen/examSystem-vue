import Layout from "../layout/views/index.vue";


const homeRouter = [{
    path: '',
    component: Layout,
    redirect: "/home",
    children: [
        {
            path: '/home',
            name: 'Home',
            component: resolve => require(['./views/home.vue'], resolve),
            meta: { title: '首页', icon: 'fdddfont el-icon-document' }
        }
    ]
},

]

export default homeRouter;