import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import { useRef, useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import io from 'socket.io-client'
import {getTokenInfo} from '@/utils/storage'
export default function ProfileChat () {
  const [msgList,setMsgList]=useState([
    {type:'robot',text:'亲爱的用户您好，小智同学为您服务。' },
    {type:'user',text:'你好!' },
  ])
  const user=useSelector((state:RootState)=>state.user.user)
  const clinetRef=useRef<any>(null)
  const [message,setMessage]=useState('')
  const onSendMessage=(e:any)=>{
    if(e.key==='Enter') {
      clinetRef.current.emit('message',{
        msg:message,
        timeStamp:Date.now()
      })
      setMsgList(msgList=>[...msgList,{type:'user',text:message}])
      setMessage('')
    }
  }
  useEffect(()=>{
    const client=io('http://toutiao.itheima.net',{
      transports:['websocket'],
      query:{
        token:getTokenInfo().token
      }
    })

    //监听连接成功的事件
    client.on('connect',()=>{
      setMsgList(msgList=>[...msgList,{type:'robot',text:'我现在恭候着您的提问。'}])
    })

    //监听到收到消息的事件
    client.on('message',data=>{
      setMsgList(msgList=>[...msgList,{type:'robot',text:data.msg,timeStamp:data.timeStamp}])
    })
    clinetRef.current=client

    //组件销毁时，关闭socket连接
    return ()=>{
      client.close()
    }
  },[])
  useEffect(()=>{
    //滚动到底部
    window.scrollTo({
      top:document.body.scrollHeight,
      behavior:'smooth'
    })
  },[msgList])
  const handleSendMsg=()=>{
    const sendMsg={text:message,timeStamp:Date.now()}
    setMsgList(msgList=>[...msgList,{type:'user',...sendMsg}])
    setMessage('')
    clinetRef.current.emit('message',sendMsg)
  }
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar >小智同学</NavBar>
      {/* 聊天记录列表 */}
      <div className="chat-list">
        {msgList.map((msg,index)=>{
          if(msg.type==='robot') {
            // 机器人的消息
            return (
              <div className="chat-item" key={index}>
              <Icon type='iconbtn_xiaozhitongxue' />
              <div className="message">{msg.text}</div>
            </div>
            )
          }else {
            // 用户的消息
            return (
              <div className="chat-item user" key={index}>
              <img src={user.photo||'http://toutiao.itheima.net/images/user_head.jpg'} alt="" />
              <div className="message">{msg.text}</div>
              </div>
            )
          }
        })}
      </div>
      <div className="footer">
        {/* 底部消息输入框 */}
        <div className="input-footer">
          <Input className='no-border' placeholder='请描述您的问题' value={message} onChange={(e)=>setMessage(e.target.value)} onKeyUp={onSendMessage} />
          <Icon type='iconbianji' />
          <span className='send' onClick={handleSendMsg}>发送</span>
        </div>
      </div>
    </div>
  )
}