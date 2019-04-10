// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'viewerjs/dist/viewer.css'
import Viewer from "v-viewer"
import './assets/css/common.scss'
import {
  formatDate
} from "./utils/date"
import store from './store/index';


Vue.use(ElementUI)
Vue.use(Viewer);
Vue.config.productionTip = false
Vue.prototype.closeTag = function (route) {
  store.dispatch("removeTag", route).then(res => {
    if (res && res.fullPath) {
      router.push(res.fullPath);
    }
  })
}

/* ------------------------Vue Global Variable------------------------------ */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

Vue.filter('formatDay', function (value) {
  if (!value) {
    return ""
  }
  let date = new Date(value)
  return formatDate(date, 'yyyy-MM-dd')
})

Vue.filter('formatDate', function (value) {
  if (!value) {
    return ""
  }
  let date = new Date(value)
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
})