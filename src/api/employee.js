import request from '@/utils/request'

//获取员工信息
export function getEmp() {
    return request({
        url: '/users',
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

