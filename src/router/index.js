import Vue from 'vue';
import Router from 'vue-router';
import homeRouter from "../modules/home/router";
import loginRouter from "../modules/login/router";
import layoutRouter from "../modules/layout/router";
import platFormRouter from "../modules/platform/router";
import questionRouter from "../modules/admin/questoin/router";
import userRouter from "../modules/admin/userManage/router";
import testRouter from "./test";

import store from '../store';
import api from '../utils/api';

Vue.use(Router)
let routes = [...loginRouter, ...homeRouter, ...layoutRouter, ...userRouter,
...platFormRouter, ...questionRouter, ...testRouter
]
const router = new Router({
  mode: 'history',
  routes: routes

})

router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    // const userInfo = store.getters.userInfo;
    // if (userInfo.userDetail && !userInfo.userDetail.name) { // 没有获取到用户信息
    //   api.get("/portal/portalIndexData").then(successData => {
    //     store.commit("SAVE_UERINFO", successData.data)
    //     if (to.path !== '/home') {
    //       next({ path: '/home', replace: true })
    //     } else {
    //       next({ ...to, replace: true })
    //     }
    //     next()
    //   })
    // } else {
    //   next()
    // }
    next();
  } else {
    next()
  }
  // next()
})

export default router;