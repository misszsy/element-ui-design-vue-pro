import request from "@/utils/request";

const articleApi = {
    PageList: "/article/list",
    Save: "/article/save",
    Update: "/article/update",
    Get: "/article/get",
    Delete: "/article/delete"
}

export function pageList(parameter) {
    return request({
        url: articleApi.PageList,
        method: "get",
        params: parameter
    })
}