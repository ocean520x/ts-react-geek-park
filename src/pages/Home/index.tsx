import styles from './index.module.scss'
import { useSelector } from "react-redux"
import ArticleList from "./components/ArticleList"
import Channel from "./components/Channel"
import { RootState } from "@/store"
export default function Home () {
  const {currentId:activeId,userList}=useSelector((state:RootState)=>state.channel)
  return (
    <div className={styles.root}>
      <Channel/>
      {userList.map((item)=>{
        return (
          <div className="channel-list" key={item.id} style={{display:item.id!==activeId?'none':'block'}}>
            <ArticleList channel_id={item.id} />
          </div>
        )
      })}
    </div>
  )
}