import Layout from "../layout/views/index.vue";
const platFormRouter = [{
  path: '/',
  component: Layout,
  children: [
    {
      path: 'right/productList',
      name: 'product',
      component: resolve => require(['./views/productList.vue'], resolve),
      meta: { title: '供应产品库', icon: 'fdddfont el-icon-document', keepAlive: true }
    },
    {
      path: 'ywk/productlist/seconddeveloper',
      name: 'product',
      component: resolve => require(['./views/productList.secondDeveloper.vue'], resolve),
      meta: { title: '业务库-第二开发商', icon: 'fdddfont el-icon-document', keepAlive: true }
    },
    {
      path: 'ywk/productlist/tx',
      name: 'product',
      component: resolve => require(['./views/productList.tx.vue'], resolve),
      meta: { title: '业务库-团喜', icon: 'fdddfont el-icon-document', keepAlive: true }
    },
    {
      path: 'ywk/productlist/mall',
      name: 'product',
      component: resolve => require(['./views/productList.mall.vue'], resolve),
      meta: { title: '业务库-商城', icon: 'fdddfont el-icon-document', keepAlive: true }
    },
    {
      path: 'right/details',
      name: 'details',
      component: resolve => require(['./views/detailsProduct.vue'], resolve),
      meta: { title: '产品详情页', icon: 'fdddfont el-icon-document' }
    },
    {
      path: 'right/edit',
      name: 'edit',
      component: resolve => require(['./views/editProduct.vue'], resolve),
      meta: { title: '产品修改页', icon: 'fdddfont el-icon-document' }
    }
  ]
},

]

export default platFormRouter;