import { Channel } from "@/store/reducers/channel";
import http from "@/utils/request";

//获取所有频道列表接口
export const getAllChannelsAPI = () => {
  return http({
    url: '/v1_0/channels',
  })
}

//获取用户频道列表接口
export const getUserChannelsAPI = () => {
  return http({
    url: '/v1_0/user/channels',
  });
}

export type ChannelParamsType = { channels: Channel[] }
//设置用户关注的频道接口
export const setUserChannelsAPI = (data: ChannelParamsType) => {
  return http({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data,
  })
}

//删除用户关注的频道接口
export const delUserChannelsAPI = (id: number) => {
  return http({
    url: `/v1_0/user/channels/${id}`,
    method: 'delete',
  });
}
