import axios from "axios";
import Vue from "vue";
import { MessageBox, Loading } from "element-ui";
import router from "../../router";

let loading;
function startLoading() {    //使用Element loading-start 方法
  let target = document.querySelector("#mainWrapper")
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)',
    target,
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。

let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

const methods = [
  "get",
  "put",
  "post",
  "head",
  "options",
  "patch",
  "delete"
]
axios.defaults.timeout = 10000;
let baseURL = "";
process.env.NODE_ENV === "development" ? baseURL = "/api" :
  process.env.NODE_ENV === "test" ? baseURL = "http://192.168.0.220:90" :
    process.env.NODE_ENV === "production" ? baseURL = "http://47.102.127.137" :
      baseURL = ""
class Api {
  constructor(opts) {
    this.opts = opts || {
      headers: {}
    }
    methods.forEach(method => {
      this[method] = (path, {
        params,
        data
      } = {}) => new Promise((resolve, reject) => {
        showFullScreenLoading();
        const url = baseURL + path;
        return axios({
          method,
          url,
          params,
          data
        }).then(onfulfilled => {
          tryHideFullScreenLoading()
          resolve({
            data: onfulfilled.data,
            status: onfulfilled.status,
          })
          if (onfulfilled.data && onfulfilled.data.code === -401) {
            MessageBox.alert("登录超时", {
              confirmButtonText: '确定',
              callback: () => {
                router.replace("/login")
                // sessionStorage.setItem("isLogin", "fasle")
              }
            })

          }
        }).catch(error => {
          tryHideFullScreenLoading()
          // const response = {};
          if (error && error.response)
            reject({
              status: error.response && error.response.status,
              response: error.response,
            });
          // todo 退出处理有问题，会发一个get请求，
          //const status= error.response && error.response.status,
          switch (error.response && error.response.status) {
            case 404:
              console.log("未找到接口")
              break;
            case 504:
              MessageBox.alert("服务出现问题", {
                confirmButtonText: '确定',
                callback: () => {
                  router.replace("/login")
                  // sessionStorage.setItem("isLogin", "fasle")
                }
              })
              break;
            default:
              break;
          }
        })
      })
    });
  }
}
const api = new Api({
  headers: {
    Accept: "application/json",
    "content-type": "application/json"
  }
})
export default api;