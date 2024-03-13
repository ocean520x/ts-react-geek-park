import NavBar from "@/components/NavBar";
import { DatePicker, Dialog, List, Popup, Toast } from "antd-mobile";
import styles from './index.module.scss'
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState,useRef } from "react";
import { getUserProfileAPI, updatePhotoAPI, updateProfileAPI } from "@/store/action/user";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { Profile } from "@/store/reducers/user";
import dayjs from "dayjs"
import { removeTokenInfo } from "@/utils/storage";
import { useNavigate } from "react-router-dom";
type PopupRight= {
  visible:boolean
  type:'name'|'intro'|''
}
type PopupType='photo'|'gender'
export default function ProfileEdit () {
  const navigate=useNavigate()
  const dispatch:AppDispatch=useDispatch()
  useEffect(()=>{
    dispatch(getUserProfileAPI())
  },[dispatch])
  const {profile}=useSelector((state:RootState)=>state.user)
  const [name,setName]=useState('')
  const [intro,setIntro]=useState('')
  const [visible,setVisible]=useState(false)
  const iptRef=useRef<HTMLInputElement>(null)
  const handleShowFile=()=>iptRef.current?.click()
  const handleUpdatePhoto=async(e:React.ChangeEvent<HTMLInputElement>)=>{
  const formData=new FormData()
  const files=e.target.files
  if(files?.length) {
    formData.append('photo',files[0])
    await dispatch(updatePhotoAPI(formData))
    dispatch(getUserProfileAPI())
    Toast.show({icon:'success',content:'上传成功'})
    setVisible(false)
  }
  }
  const [popupRight,setPopupRight]=useState<PopupRight>({visible:false,type:''})
  const [popupType,setPopupType]=useState<PopupType>('photo')
  const showPopup=(type:PopupType)=>{
    if(type==='photo')setPopupType('photo')
    else setPopupType('gender')
    setVisible(true)
  }
  const renderPhotoAndGender=()=>{
    if(popupType==='photo') {
      return (
       <>
        <div className="list-item" onClick={handleShowFile}>拍照</div>
        <div className="list-item" onClick={handleShowFile}>本地选择</div>
        <div className="list-item" onClick={()=>setVisible(false)}>取消</div>
        </>
      )
    }
    if(popupType==='gender') {
      return (
        <>
         <div className="list-item" onClick={()=>handleUpdateProfile({gender:0})}>男</div>
        <div className="list-item"  onClick={()=>handleUpdateProfile({gender:1})}>女</div>
        <div className="list-item" onClick={()=>setVisible(false)}>取消</div>
        </>
      )
    }
  }
  const popupClose=()=>{
    setVisible(false)
    setPopupRight({visible:false,type:''})
    setPickShow(false)
  }
  useEffect(()=>{
    setName(profile.name)
    setIntro(profile.intro||'')
  },[profile])
  const updateParams={
    [popupRight.type]:popupRight.type==='name'?name:intro
  }
  const handleUpdateProfile=async(data:Partial<Profile>)=>{
    await dispatch(updateProfileAPI(data))
    dispatch(getUserProfileAPI())
    Toast.show({icon:'success',content:'修改成功'})
    popupClose()
  }
  const [pickShow,setPickShow]=useState(false)
  const handleConfirm=(value:Date)=>{
    const birthday=dayjs(value).format('YYYY-MM-DD')
    handleUpdateProfile({birthday})
  }
  const handleLogout=()=>{
    Dialog.confirm({
      title:'温馨提示',
      content:'你确定要退出吗？',
      onConfirm:()=>{
        //清空本地存储
        removeTokenInfo()
        //通知redux清除token
        dispatch({type:'user/removeAuth'})
        navigate('/login')
        Toast.show({content:'退出登陆成功'})
      }
    })
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部导航栏 */}
        <NavBar >个人资料</NavBar>
        <div className="wrapper">
          {/* 列表一：头像 昵称 简介 */}
          <List className="profile-list">
          <List.Item arrow extra={<img className="avatar" src={profile.photo} alt="" onClick={()=>showPopup('photo')} />}>头像</List.Item>
          <List.Item onClick={()=>setPopupRight({visible:true,type:'name'})} arrow extra={profile.name}>昵称</List.Item>
          <List.Item onClick={()=>setPopupRight({visible:true,type:'intro'})} arrow extra={<span className="intro">{profile.intro}</span>}>简介</List.Item>
          <List.Item onClick={()=>showPopup('gender')} arrow extra={profile.gender===0?'男':'女'}>性别</List.Item>
          <List.Item onClick={()=>setPickShow(true)} arrow extra={profile.birthday}>生日</List.Item>
          </List>

          {/* 文件选择框 用于头像图片的上传 */}
          <input onChange={handleUpdatePhoto} ref={iptRef} type="file" className="avatar-upload" />
        </div>

        {/* 底部栏 退出登陆按钮 */}
        <div className="logout">
          <button onClick={handleLogout} className="btn">退出登录</button>
        </div>

        {/* 底部弹出层 */}
        <Popup visible={visible} position="bottom" onMaskClick={()=>setVisible(false)} bodyClassName="popup-bottom-list">
          {renderPhotoAndGender()}
        </Popup>

        {/* 右侧弹出层 */}
        <Popup visible={popupRight.visible} position="right" bodyClassName="popup-right">
          <NavBar onBack={()=>popupClose()}  right={<span className="submit-btn" onClick={()=>handleUpdateProfile(updateParams)}>提交</span>}>{popupRight.type==='name'?'编辑昵称':'编辑简介'}</NavBar>
          <div className="edit-content">
           
            {popupRight.type==='name'?(
              <>
               {/* <h3 className="edit-title">编辑昵称</h3> */}
            <Input autoFocus value={name} className='edit-input' onChange={(e)=>setName(e.target.value)}/>
              </>
            ):(
              <>
              {/* <h3 className="edit-title">编辑简介</h3> */}
              <TextArea  onChange={(e)=>setIntro(e.target.value) } value={intro} />
              </>
            )}
          </div>
        </Popup>
        <DatePicker
        visible={pickShow}
        min={new Date('1960-01-01')}
        max={new Date()}
        value={new Date(profile.birthday)}
        onConfirm={(value:Date)=>handleConfirm(value)}
        onClose={()=>setPickShow(false)}
        />
      </div>
    </div>
  )
}