import request from '@/utils/request'

//分页获取员工信息
export function getEmp(page) {
    return request({
        url: `/users/${page}`,
        method: 'get'
    })
}

//获取所有员工信息
export function getAllEmp() {
    return request({
        url: '/users/all',
        method: 'get'
    })
}

//修改用工在职状态
export function updateEmp(id) {
    return request({
        url: '/users/' + id,
        method: 'put'
    })
}

