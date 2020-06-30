import axios from "axios";
import store from '@/store'
import storage from "store";
import { Message } from 'element-ui'
import { ACCESS_TOKEN } from "@/store/mutation-types";

const request = axios.create({
    //API 请求的默认前缀
    baseURL: "/admin",
    timeout: 6000 //请求超时间
})


//异常拦截处理器
const errorHandler = (error) => {
    if (error.response) {
        const status = error.response.status;
        switch (status) {
            case 401:
                Message({
                    message: "请先登录",
                    type: "error"
                })
                break;
            case 403:
                Message({
                    type: 'error',
                    message: '登录信息过期，请重新登录'
                })
                store.dispatch('Logout').then(() => {
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500)
                })
                break;
        }
    }
    return Promise.reject(error);
}

//请求前拦截
request.interceptors.request.use(config => {
    const token = storage.get(ACCESS_TOKEN);
    //如果Token存在,让每个请求在头部都携带token
    if (token) {
        config.headers['token'] = token ;
    }
    return config;
}, error => Promise.reject(error))

//响应结果拦截
request.interceptors.response.use((response) => {
    const responseCode = response.status;
    if (responseCode === 200) {
        const data = response.data;
        if (data.code === 0) {
            return Promise.resolve(data)
        } else {
            if (response.data.code === 403 || response.data.code === 401) {
                Message({
                    type: 'error',
                    message: response.data.msg
                })
                return false;
            }
            return Promise.reject(response)
        }
    } else {
        return Promise.reject(response)
    }
}, errorHandler)

export default request;