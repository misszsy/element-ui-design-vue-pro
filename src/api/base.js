import request from "@/utils/request";

const baseApi = {
    PageList: "/list",
    Save: "/save",
    Update: "/update",
    Get: "/get",
    Delete: "/delete"
}

export function pageList(resource, parameter) {
    return request({
        url: "/" + resource + baseApi.PageList,
        method: "get",
        params: parameter
    })
}