
const userRouter = [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['./views/login.vue'], resolve),
    meta: {
      keepAlive: false,
    }
  },
  {
    path: '/modifypassword',
    name: 'MofifyPassword',
    component: resolve => require(['./views/modify.password.vue'], resolve),
    meta: {
      keepAlive: false,
    }
  },

]

export default userRouter;