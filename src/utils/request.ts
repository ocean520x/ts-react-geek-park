import axios from "axios";
import { getTokenInfo } from '@/utils/storage'
export const baseURL = 'http://geek.itheima.net'
//创建axios实例
const http = axios.create({
  baseURL,
  timeout: 5000
})

//请求拦截器
http.interceptors.request.use(
  (config: any) => {
    //获取缓存中的Token信息
    const { token } = getTokenInfo()
    //设置请求头的Authorization字段
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  error => Promise.reject(error)
)

//响应拦截器
http.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

//导出axios实例
export default http