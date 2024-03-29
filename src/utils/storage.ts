import { Auth } from '@/store/reducers/user'
import { Channel } from '@/store/reducers/channel'
//用户Token的本地缓存key名
const TOKEN_KEY = 'geek-park-h5'

/**
 * 从本地缓存中获取token
 */
export const getTokenInfo = (): Auth => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
}

/**
 * 将token存入缓存
 * @param {Object} tokenInfo 从后端获取到的token信息
 */
export const setTokenInfo = (tokenInfo: Auth): void => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

/**
 * 删除本地缓存中的token信息
 */
export const removeTokenInfo = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断本地缓存中是否存在token信息
 */
export const hasToken = (): boolean => {
  return Boolean(getTokenInfo().token)
}

const CHANNEL_KEY = 'itcast-geek-park-channel'

//保存频道数据到本地
export const setLocalChannels = (channels: Channel[]) => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}

//从本地获取频道数据
export const getLocalChannels = (): Channel[] => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY) || '[]')
}

//删除本地频道数据
export const removeLocalChannels = () => {
  localStorage.removeItem(CHANNEL_KEY)
}