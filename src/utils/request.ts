import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getTokenInfo, removeTokenInfo, setTokenInfo } from '@/utils/storage'
import { Toast } from "antd-mobile";
import { useNavigate } from 'react-router-dom'
import store from "@/store";
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
  async (err: AxiosError<{ message: string }>) => {
    console.log('err', err);
    //没有网络
    if (!err.response) {
      Toast.show({
        icon: 'info',
        content: '网络繁忙，请稍后重试',
      })
      return Promise.reject(err)
    }
    const { response, config } = err
    //不是token的问题
    if (response.status !== 401) {
      Toast.show({
        icon: 'info',
        content: response.data.message
      })
      return Promise.reject(err)
    }
    //token过期 没有refresh_token
    const { refresh_token } = getTokenInfo()
    if (!refresh_token) {
      const navigate = useNavigate()
      navigate('/login')
      return Promise.reject(err)
    }

    //token过期 有refresh_token
    try {
      const res = await axios({
        method: 'put',
        url: baseURL + '/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${refresh_token}`
        }
      })
      const tokenInfo = {
        token: res.data.data.token,
        refresh_token: refresh_token
      }
      store.dispatch({ type: 'user/saveAuth', payload: tokenInfo })
      setTokenInfo(tokenInfo)
      return http(config as AxiosRequestConfig<any>)
    } catch {
      removeTokenInfo()
      store.dispatch({ type: 'user/removeAuth' })
      const navigate = useNavigate()
      navigate('/login')
      Toast.show({
        icon: 'info',
        content: '登录信息失效，请重新登录'
      })
      return Promise.reject(err)
    }
  }
)

//导出axios实例
export default http