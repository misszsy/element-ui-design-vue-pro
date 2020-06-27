import axios from "axios";
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
                    message: "没有访问权限",
                    type: "error"
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
        config.headers['Access-Token'] = token;
    }
    return config;
}, errorHandler)

//响应结果拦截
request.interceptors.response.use((response) => {
    return response.data;
}, errorHandler)

export default request;