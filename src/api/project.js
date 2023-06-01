import request from '@/utils/request'

//获取全部项目信息
export function getPro(page) {
    return request({
        url: `/projects`,
        method: 'get'
    })
}

//根据id查询项目创建者
export function getCreator(id) {
    return request({
        url: `/projects/${id}`,
        method: 'get'
    })
}

//创建项目
export function addPro(data) {
    return request({
        url: '/projects/',
        method: 'post',
        data: data
    })
}

//删除项目
export function deletePro(id) {
    return request({
        url: '/projects/' + id,
        method: 'delete'
    })
}

