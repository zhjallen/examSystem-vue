const layoutRouter = [{
  path: '/home',
  name: "Home",
  component: resolve => require(['./views/index.vue'], resolve),
  // redirect: '/dash',
  // children: [
  //   {
  //     path: 'dash',
  //     name: 'Dashboard',
  //     component: _import_('Dashboard/index'),
  //     meta: { title: '主页', icon: 'fdddfont icon-home', noCache: false } }
  // ]
},

]
/*
 * 公共路由表, 一般情况这里无需任何修改.
 * 除非你需要配置更多任何角色或权限下都可以访问的路由
 */
export const constantRouterMap = [
  {
    path: '',
    // component: Layout,
    redirect: '/dash',
    children: [
      {
        path: 'dash',
        name: 'Dashboard',
        // component: _import_('Dashboard/index'),
        // meta: { title: '主页', icon: 'fdddfont icon-home', noCache: false } }
      }
    ]
  },
  {
    path: '',
    // component: Layout,
    hidden: true,
    children: [
      {
        path: 'personal-settings',
        name: 'PersonalSettings',
        // component: _import_('Layout/Components/Settings/index'),
        // meta: { title: '个性化配置', icon: 'fdddfont icon-custom-settings', noCache: true }
      }
    ]
  },
  {
    path: '/modify-password',
    // component: _import_('Layout/Components/ModifyPassword/index'),
    hidden: true,
    meta: { title: '修改密码', icon: 'fdddfont icon-home', noCache: true }
  },
  // { path: '/401', component: _import_('others/401'), hidden: true },
  // { path: '*', component: _import_('others/404'), hidden: true }
]
export default layoutRouter;