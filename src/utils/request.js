import axios from 'axios'

// 创建 Axios 实例
const http = axios.create({
    // baseURL: 'http://127.0.0.1:5000',
    baseURL: 'http://10.151.116.222:5000',
    timeout: 5000, // 超时时间
    headers: {
        'Content-Type': 'application/json' // 请求头部信息
    }
})

// 添加请求拦截器
http.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        return config
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
http.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data
    },
    error => {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

export default http
