import request from "@/utils/request";

const baseApi = {
  PageList: "/list",
  Save: "/save",
  Update: "/update",
  Get: "/get",
  Delete: "/delete",
  Upload: "/uploading/img"
};

export function pageList(resource, parameter) {
  return request({
    url: "/" + resource + baseApi.PageList,
    method: "get",
    params: parameter
  });
}

export function saveData(resource, parameter) {
  return request({
    url: "/" + resource + baseApi.Save,
    method: "post",
    data: parameter
  });
}

export function deleteById(resource, parameter) {
  return request({
    url: "/" + resource + baseApi.Delete + "/" + parameter,
    method: "post"
  });
}

export function upload(parameter) {
  return request({
    url: baseApi.Upload,
    method: "post",
    data: parameter,
    headers: {
      "Content-type": "multipart/form-data"
    }
  });
}
