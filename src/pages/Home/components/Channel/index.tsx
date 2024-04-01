import { AppDispatch, RootState } from "@/store"
import { delUserChannelAction, getAllChannelAction, getUserChannelsAction, setChannelIdAction,setUserChannelAction } from "@/store/action/channel"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Popup, Tabs, Toast } from "antd-mobile"
import styles from './index.module.scss'
import Icon from "@/components/Icon"
import {differenceBy} from 'lodash'
import { Channel as ChannelType } from "@/store/reducers/channel"
import { useNavigate } from "react-router-dom"
export default function Channel() {
  const dispatch:AppDispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    dispatch(getUserChannelsAction())
    dispatch(getAllChannelAction())
  },[dispatch])
  const {allList,userList,currentId}=useSelector((state:RootState)=>state.channel)
  const restList=differenceBy(allList,userList,'id')
  const [visible,setVisible]=useState(false)
  const [editable,setEditable]=useState(false)
  const handleClose=()=>{
    setVisible(false)
    setEditable(false)
  }
  const handleSetChannel=async (channel:ChannelType)=>{
   await dispatch(setUserChannelAction(channel))
   Toast.show({
      icon:'success',
      content:'添加成功',
   })
  }
  const handleDelChannel=async(id:number)=>{
   await dispatch(delUserChannelAction(id))
   Toast.show({
      icon:'success',
      content:'删除成功',
   })
  }
  return (
    <div className={styles.root}>
      <Tabs 
      activeKey={String(currentId)} 
      className="tabs"
      onChange={(key)=>dispatch(setChannelIdAction(Number(key)))}
      
      >
        {userList.map((item)=>(<Tabs.Tab title={item.name} key={item.id} />))}
      </Tabs>
      <div className="right">
        <Icon type="iconbtn_search" onClick={()=>navigate('/search')}/>
        <Icon type="iconbtn_channel" onClick={()=>setVisible(true)} />
      </div>
      <Popup visible={visible} position="left" bodyClassName={styles.channelPopup}>
        {/* 顶部栏 带关闭按钮  */}
        <div className="channel-header">
          <Icon type="iconbtn_channel_close" onClick={handleClose}/>
        </div>
         {/* 频道列表 */}
         <div className="channel-content">
          {/* 当前已选择的频道列表 */}
          <div className="channel-item edit">
            <div className="channel-item-header">
              <span className="channel-item-title">我的频道</span>
              <span className="channel-item-title-extra">点击删除频道</span>
              <span className="channel-item-edit" onClick={()=>setEditable(!editable)}>{editable?'完成':'编辑'}</span>
            </div>

            <div className="channel-list">
              {userList.map((item)=>{
                return (
                  <span className="channel-list-item" key={item.id}>
                    {item.name}
                    {editable&&(<Icon  type="iconbtn_tag_close" onClick={()=>handleDelChannel(item.id)}/>)}
                  </span>
                )
              })}
            </div>
          </div>

          {/* 推荐的频道列表 */}
          <div className="channel-item">
            <div className="channel-item-header">
              <span className="channel-item-title">频道推荐</span>
              <span className="channel-item-title-extra">点击添加频道</span>
            </div>
            <div className="channel-list">
              {restList.map((item)=>{
                return (
                  <span className="channel-list-item" key={item.id} onClick={()=>handleSetChannel(item)}>+ {item.name}</span>
                )
              })}
            </div>
          </div>
         </div>
      </Popup>
     
      
    </div>
  )
}