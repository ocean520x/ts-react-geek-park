import { AppDispatch } from ".."
import { ArticleQueryParamsType, getArticleListByIdAPI } from '@/api/article'
export const getArticleListByIdAction = ({ channel_id, timestamp = Date.now() }: ArticleQueryParamsType) => {
  return async (dispatch: AppDispatch) => {
    const res = await getArticleListByIdAPI({ channel_id, timestamp })
    console.log('res', res);
    dispatch({ type: 'article/saveList', payload: { ...res.data, channel_id } })
  }
}

/** 根据id更新list */
export const updateArticleListByIdAction = ({ channel_id, timestamp = Date.now() }: ArticleQueryParamsType) => {
  return async (dispatch: AppDispatch) => {
    const res = await getArticleListByIdAPI({ channel_id, timestamp })
    dispatch({ type: 'article/updateListById', payload: { ...res.data, channel_id } })
  }
}