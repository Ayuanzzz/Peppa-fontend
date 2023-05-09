import request from '@/utils/request'

//员工登录
export function login(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data: data
    })
}

//验证用户名是否存在
export function validate(data) {
    return request({
        url: '/auth/register/name',
        method: 'post',
        data: data
    })
}

//注册用户
export function register(data) {
    return request({
        url: '/auth/register',
        method: 'post',
        data: data
    })
}