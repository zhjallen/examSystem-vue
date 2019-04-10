const getters = {
  // 平台
  systemTheme: state => state.systemTheme,
  shortcutMenu: state => state.shortcutMenu,
  sidebarState: state => state.sidebarState,
  windowMaxState: state => state.windowMaxState,
  headerHeight: state => state.headerHeight,
  tagTabHeight: state => state.tagTabHeight,
  
  // 用户
  // userInfo=>state=>
  // userAccount: state => state.user.userAccount,
  // userName: state => state.user.userName,
  // userId: state => state.user.userId,
  // avatar: state => state.user.avatar,
  // token: state => state.user.token,
  // roles: state => state.user.roles,
  // warehouseList: state => state.user.warehouseList,
  // 设置标签页
  openTags: state => state.tagTabState.openTags,
  // 路由
  // addRouters: state => state.asyncRouter.addRouters,
  // asyncRouter: state => state.asyncRouter.json,
  // 页面
  // cachedViews: state => state.views.cachedViews,
  // visitedViews: state => state.views.visitedViews
}

export default getters