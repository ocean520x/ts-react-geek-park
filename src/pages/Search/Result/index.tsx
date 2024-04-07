import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import ArticleItem from '@/components/ArticleItem'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { SearchResultType } from '@/store/reducers/search'
import { useEffect, useRef } from 'react'
import { clearResultsAction, getResultsAction } from '@/store/action/search'
import { InfiniteScroll } from 'antd-mobile'
export default function Result () {
  const {search}=useLocation()
  const dispatch:AppDispatch=useDispatch()
  const searchParams=new URLSearchParams(search)
  const q=searchParams.get('q')||''
  const {results} =useSelector((state:RootState)=>state.search)
  useEffect(()=>{
    return ()=>{
     dispatch(clearResultsAction())
     pageRef.current=1
     dispatch(getResultsAction(q,pageRef.current))
      
    }
  },[dispatch])
  const pageRef=useRef(0)
  const handleLoadMore=async ()=>{
    pageRef.current=pageRef.current+1
    await dispatch(getResultsAction(q,pageRef.current))
  }
  const hasMore=pageRef.current*10<=results.length
  return (
    <div className={styles.root}>
      <NavBar>搜索结果</NavBar>

      <div className="article-list">
     {results.map((item:SearchResultType)=>(
       <ArticleItem key={item.art_id}  data={item} />
     ))}

      </div>
      <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore}/>
    </div>
  )
}