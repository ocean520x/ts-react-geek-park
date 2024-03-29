/** @format */
import React from 'react'
import Icon from '@/components/Icon'
import { TabBar } from 'antd-mobile'
import styles from './index.module.scss'
import { useNavigate,useLocation, Outlet} from 'react-router-dom'
import AuthRoute from '@/components/AuthRoute'
// import {hasToken} from '@/utils/storage'
export default function Layout() {
    //定义一个代表 tabbar的数组 用于动态渲染tabbar
    const tabs=[
        {
            key:'/layout/home',
            title:'首页',
            icon:(active:boolean)=>active?<Icon type='iconbtn_home_sel'/>:<Icon type='iconbtn_home'/>
        },
        {
            key:'/layout/qa',
            title:'问答',
            icon:(active:boolean)=>active?<Icon type='iconbtn_qa_sel'/>:<Icon type='iconbtn_qa'/>
        },
        {
            key:'/layout/video',
            title:'视频',
            icon:(active:boolean)=>active?<Icon type='iconbtn_video_sel'/>:<Icon type='iconbtn_video'/>
        },
        {
            key:'/layout/profile',
            title:'我的',
            icon:(active:boolean)=>active?<Icon type='iconbtn_mine_sel'/>:<Icon type='iconbtn_mine'/>
        }
    ]
    const navigate=useNavigate()
    const location=useLocation()
    return (
        <div className={styles.root}>
          {/* 区域一 点击按钮切换显示内容的区域 */}
          <div className="tab-content">
            <AuthRoute>
              <Outlet />
            </AuthRoute>
          </div>
          {/* 区域二 按钮区域 会使用固定定位显示在页面底部 */}
          <TabBar 
          className='tabbar' 
          activeKey={location.pathname}
          onChange={(key)=>{
            // if(key==='/layout/profile'&&!hasToken()) {
            //   console.log('notken');
            //    navigate('/login')
            //    return
            // }
            navigate(key)
          }}
          >
            {tabs.map((item)=>
            (<TabBar.Item key={item.key} icon={item.icon} title={item.title} />)
            )}
          </TabBar>
        </div>
    )
}
