import axios from "axios";
import store from '@/store'
import router from '@/router'
import storage from "store";
import NProgress from "nprogress";
import { Message } from 'element-ui'
import { ACCESS_TOKEN } from "@/store/mutation-types";

const request = axios.create({
    //API 请求的默认前缀
    baseURL: "/admin",
    timeout: 6000 //请求超时间
})

//请求前拦截
request.interceptors.request.use(config => {
    NProgress.start();
    const token = storage.get(ACCESS_TOKEN);
    //如果Token存在,让每个请求在头部都携带token
    if (token) {
        config.headers['token'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error)
})

//响应结果拦截
request.interceptors.response.use((response) => {
  NProgress.done();
  const status = response.data.code;
  const message = response.data.msg || '未知错误';
      //如果是401则跳转到登录页面
  if (status === 401){
    store.commit('SET_TOKEN', '');
    storage.remove(ACCESS_TOKEN);
    //this.$router.push():跳转到不同的url，但这个方法会向history栈添加一个记录，点击后退会返回到上一个页面。
    // router.replace:同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
  } 
   // 如果请求为非200否者默认统一处理
   if (status !== 0) {
    Message.closeAll();
    Message({
      message: message,
      type: 'error'
    })
    return Promise.reject(new Error(message))
  }
  return Promise.resolve(response.data);
}, error => {
    NProgress.done();
    return Promise.reject(error);
})

export default request;