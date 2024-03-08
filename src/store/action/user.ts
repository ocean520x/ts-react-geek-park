import http from '@/utils/request'
import { AppDispatch } from '../index'
import { setTokenInfo } from '@/utils/storage'
/**
 * 发送验证码
 * @param mobile 手机号
 * @returns
 */

export const sendCodesAPI = (mobile: string) => {
  return async (dispatch: AppDispatch) => {
    const res = await http.get(`/v1_0/sms/codes/${mobile}`)
    console.log('res', res);
    console.log('dispatch', dispatch);
  }
}


//用户认证（登陆注册）
export const AuthorizationsAPI = ({ mobile, code }: { mobile: string, code: string }) => {
  return async (dispatch: AppDispatch) => {
    const res = await http.post(`/v1_0/authorizations`, { mobile, code })
    console.log('用户认证（登陆注册）', res);
    //保存到redux
    dispatch({ type: 'user/saveAuth', payload: res.data })
    //保存到本地存储
    setTokenInfo(res.data)
  }
}