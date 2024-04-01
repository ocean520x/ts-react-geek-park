import http from "@/utils/request";

//获取搜索建议接口
export const getSuggestionAPI = (keyword: string) => {
  return http({
    url: '/v1_0/suggestion',
    params: {
      q: keyword
    }
  })
}