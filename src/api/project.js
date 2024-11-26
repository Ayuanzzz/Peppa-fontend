import request from "@/utils/request";

//获取全部项目信息
export function getPro(page) {
  return request({
    url: `/projects`,
    method: "get",
  });
}

//获取全部隐藏项目
export function getHiddenPro(page) {
  return request({
    url: `/projects/hidden`,
    method: "get",
  });
}

//根据id查询项目创建者
export function getCreator(id) {
  return request({
    url: `/projects/${id}`,
    method: "get",
  });
}

//根据项目名搜索项目
export function findByName(name) {
  return request({
    url: `/projects/name/${name}`,
    method: "get",
  });
}

//创建项目
export function addPro(data) {
  return request({
    url: "/projects/",
    method: "post",
    data: data,
  });
}

//删除项目
export function deletePro(id) {
  return request({
    url: "/projects/" + id,
    method: "delete",
  });
}

//隐藏项目
export function hiddenPro(id) {
  return request({
    url: "/projects/hidden/" + id,
    method: "put",
  });
}

//显示项目
export function showPro(id) {
  return request({
    url: "/projects/show/" + id,
    method: "put",
  });
}
