import request from '@/utils/request'

//通过项目id获取
export function getProByid(id, page) {
    return request({
        url: `/up/project/${id}/${page}`,
        method: 'get'
    })
}

//通过员工获取项目
export function getUserByid(id, page) {
    return request({
        url: `/up/${id}/${page}`,
        method: 'get'
    })
}

//通过员工id获取进行中项目
export function getUserDoing(id, page) {
    return request({
        url: `/up/user/${id}/${page}`,
        method: 'get'
    })
}

//通过员工id获取已完成项目 
export function getUserDone(id, page) {
    return request({
        url: `/up/userDone/${id}/${page}`,
        method: 'get'
    })
}

//管理员添加
export function addUp(data) {
    return request({
        url: '/up/',
        method: 'post',
        data: data
    })
}

//通过员工添加
export function addUpByUser(data) {
    return request({
        url: '/up/userAdd',
        method: 'post',
        data: data
    })
}

//修改项目状态
export function changeStatus(id, data) {
    return request({
        url: '/up/changeStatus/' + id,
        method: 'put',
        data: data
    })
}

//修改项目
export function updateUp(id, data) {
    return request({
        url: '/up/changeUp/' + id,
        method: 'put',
        data: data
    })
}

//通过userId,projectId删除
export function removeUp(user_id, project_id) {
    return request({
        url: `/up/${user_id}/${project_id}`,
        method: 'delete'
    })
}

//通过id删除 
export function removeUpById(id) {
    return request({
        url: '/up/byId/' + id,
        method: 'delete'
    })
}