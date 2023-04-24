import request from '@/utils/request'

//获取全部项目信息
export function getPro() {
    return request({
        url: '/projects',
        method: 'get'
    })
}


//创建项目
export function addPro(data) {
    console.log('data--', data);
    console.log(typeof (data.num));
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

