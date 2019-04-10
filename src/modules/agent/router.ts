import Layout from "../layout/views/index.vue";

// 代理商
const agentRouter = [{
    path: '/',
    component: Layout,
    children: [
        {
            path: 'agent/add',
            name: 'AgentAdd',
            component: resolve => require(['./views/agent.add.vue'], resolve),
            meta: { title: '代理商-新增', keepAlive: false, icon: 'fdddfont el-icon-document' }
        }
    ]
},
{
    path: '/',
    component: Layout,
    children: [
        {
            path: 'agent/list',
            name: 'AgentList',
            component: resolve => require(['./views/agent.list.vue'], resolve),
            meta: { title: '代理商-列表', keepAlive: true, icon: 'fdddfont el-icon-document' }
        }
    ]
},
{
    path: '/',
    component: Layout,
    children: [
        {
            path: 'agent/detail/:agentCode',
            name: 'AgentDetail',
            component: resolve => require(['./views/agent.detail.vue'], resolve),
            meta: { title: '代理商-详情', keepAlive: false, icon: 'fdddfont el-icon-document' }
        }
    ]
},
{
    path: '/',
    component: Layout,
    children: [
        {
            path: 'agent/edit/:agentCode',
            name: 'AgentEdit',
            component: resolve => require(['./views/agent.edit.vue'], resolve),
            meta: { title: '代理商-编辑', keepAlive: false, icon: 'fdddfont el-icon-document' }
        }
    ]
},

]

export default agentRouter;