import request from "@/utils/request";

const userApi = {
    Login: "/login",
    Logout: "/exit",
    UserInfo: "/user/profile"
}


/**
 * 登录请求函数
 */
export function login(parameter) {
    return request({
        url: userApi.Login,
        method: "post",
        data: parameter
    })
}

export function getInfo() {
    return request({
        url: userApi.UserInfo,
        method: "get",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function logout() {
    return request({
        url: userApi.Logout,
        method: "post",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}