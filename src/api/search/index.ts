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
export type QueryParamsType = {
  page?: number;
  per_page?: number;
  keyword: string;
};
//获取搜索结果接口
export const getSearchResultAPI = ({ page = 1, per_page = 10, keyword }: QueryParamsType) => {
  return http({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q: keyword,
    },
  });
}