import ArticleItem from "@/components/ArticleItem";
import { AppDispatch, RootState } from "@/store";
import { getArticleListByIdAction, updateArticleListByIdAction } from "@/store/action/article";
import {  ArticleType } from "@/store/reducers/article";
import {  PullToRefresh,InfiniteScroll } from "antd-mobile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
type Props = {
  channel_id: number;
}
export default function ArticleList({ channel_id }: Props) {
  const { currentId: activeId } = useSelector((state: RootState) => state.channel)
  const  {articles}:any  = useSelector((state: RootState) => state.article)
  const { results: list = [],pre_timestamp } = articles[channel_id] || {}
  const dispatch:AppDispatch = useDispatch()
  const handleRefresh = async() => {
    await dispatch(getArticleListByIdAction({channel_id}))
  }
  const handleLoadMore=async ()=>{
    await dispatch(updateArticleListByIdAction({channel_id,timestamp:pre_timestamp}))
  }
  useEffect(() => {
    console.log('cur',list)
    if(activeId!==channel_id) return
    if(list.length) return
    dispatch(getArticleListByIdAction({channel_id}))
   }, [channel_id, dispatch, activeId])
  return (
    <PullToRefresh onRefresh={handleRefresh}>
      {list.map((item:ArticleType)=>{
        return <ArticleItem key={item.art_id} data={item}/>
      })}
      <InfiniteScroll loadMore={handleLoadMore} hasMore={!!pre_timestamp}></InfiniteScroll>
    </PullToRefresh>
  )
}