import NavBar from "@/components/NavBar";
import { List, Popup } from "antd-mobile";
import styles from './index.module.scss'
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfileAPI } from "@/store/action/user";
import Input from "@/components/Input";
export default function ProfileEdit () {
  const dispatch:AppDispatch=useDispatch()
  useEffect(()=>{
    dispatch(getUserProfileAPI())
  },[dispatch])
  const {profile}=useSelector((state:RootState)=>state.user)
  const [visible,setVisible]=useState(false)
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部导航栏 */}
        <NavBar >个人资料</NavBar>
        <div className="wrapper">
          {/* 列表一：头像 昵称 简介 */}
          <List className="profile-list">
          <List.Item arrow extra={<img className="avatar" src={profile.photo} alt="" />}>头像</List.Item>
          <List.Item arrow extra={profile.name}>昵称</List.Item>
          <List.Item arrow extra={<span className="intro">{profile.intro}</span>}>简介</List.Item>
          <List.Item arrow extra={profile.gender===0?'男':'女'}>性别</List.Item>
          <List.Item arrow extra={'2000-01-01'}>生日</List.Item>
          </List>

          {/* 文件选择框 用于头像图片的上传 */}
          <input type="file" className="avatar-upload" />
        </div>

        {/* 底部栏 退出登陆按钮 */}
        <div className="logout">
          <button className="btn">退出登录</button>
        </div>

        {/* 底部弹出层 */}
        <Popup visible={visible} position="bottom" onMaskClick={()=>setVisible(false)} bodyClassName="popup-bottom-list">
          <div className="list-item">拍照</div>
          <div className="list-item">本地选择</div>
          <div className="list-item" onClick={()=>setVisible(false)}>取消</div>
        </Popup>

        {/* 右侧弹出层 */}
        <Popup visible={true} position="right" bodyClassName="popup-right">
          <NavBar right={<span className="submit-btn">提交</span>}>编辑用户信息</NavBar>
          <div className="edit-content">
            <h3 className="edit-title">编辑昵称</h3>
            <Input className='edit-input'/>
          </div>
        </Popup>
      </div>
    </div>
  )
}