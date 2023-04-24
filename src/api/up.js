import request from '@/utils/request'

//通过项目id获取信息
export function getProByid(id) {
    return request({
        url: '/up/project/' + id,
        method: 'get'
    })
}

//添加
export function addUp(data){
    return request({
        url: '/up/',
        method:'post',
        data: data
    })
}

//通过删除
export function removeUp(user_id, project_id){
    return request({
        url: `/up/${user_id}/${project_id}`,
        method:'delete'
    })
}