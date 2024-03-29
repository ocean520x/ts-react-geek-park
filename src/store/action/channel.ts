import { AppDispatch } from "..";
import { getLocalChannels, hasToken, setLocalChannels } from '@/utils/storage'
import { Channel, ChannelAction } from "../reducers/channel";
import { delUserChannelsAPI, getAllChannelsAPI, getUserChannelsAPI, setUserChannelsAPI } from '@/api/channel'
//获取用户频道列表
export const getUserChannelsAction = () => {
  return async (dispatch: AppDispatch) => {
    if (hasToken()) {
      const res = await getUserChannelsAPI()
      dispatch({ type: 'channel/saveUserList', payload: res.data.channels })
    } else {
      const localList = getLocalChannels()
      if (localList.length) {
        dispatch({ type: 'channel/saveUserList', payload: localList })
      } else {
        const res = await getAllChannelsAPI()
        const tenList = res.data.channels.slice(0, 10)
        dispatch({ type: 'channel/saveUserList', payload: tenList })
        setLocalChannels(tenList)
      }
    }


  }
}
//获取所有频道列表
export const getAllChannelAction = () => {
  return async (dispatch: AppDispatch) => {
    const res = await getAllChannelsAPI()
    dispatch({ type: 'channel/saveAllList', payload: res.data.channels })
  }
}
//切换频道 显示对应高亮效果
export const setChannelIdAction = (id: number): ChannelAction => {
  return { type: 'channel/setChannelId', payload: id }
}

//添加频道到用户频道列表
export const setUserChannelAction = (newItem: Channel) => {
  return async (dispatch: AppDispatch) => {
    if (hasToken()) {
      await setUserChannelsAPI({ channels: [newItem] })
      dispatch({ type: 'channel/updateUserChannels', payload: newItem })
      return
    }
    const localList = getLocalChannels()
    setLocalChannels([...localList, newItem])
    dispatch({ type: 'channel/updateUserChannels', payload: newItem })
  }
}

//删除用户频道列表中的频道
export const delUserChannelAction = (id: number) => {
  return async (dispatch: AppDispatch) => {
    if (hasToken()) {
      await delUserChannelsAPI(id)
      dispatch({ type: 'channel/delUserChannel', payload: id })
      return
    }
    const localList = getLocalChannels()
    setLocalChannels(localList.filter(v => v.id !== id))
    dispatch({ type: 'channel/delUserChannel', payload: id })
  }
}