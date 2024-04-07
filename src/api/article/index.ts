import http from '@/utils/request'
export type ArticleQueryParamsType = {
  channel_id: number;
  timestamp?: number;
}
/** 根据频道id获取文章列表 */
export const getArticleListByIdAPI = (params: ArticleQueryParamsType) => {
  return http({
    url: '/v1_0/articles',
    params
  })
}

/** 根据文章id获取文章详情 */
// export const getArticleDetailByIdAPI = (id: string) => {
//   return http({
//     url: '/v1_0/articles/' + id,
//   })
// }