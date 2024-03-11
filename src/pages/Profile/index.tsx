import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import Icon from '@/components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserInfoAPI } from '@/store/action/user'
import { AppDispatch, RootState } from '@/store'
export default function Profile () {
  const dispatch:AppDispatch=useDispatch()
  useEffect(()=>{
    dispatch(getUserInfoAPI())
  },[dispatch])

  //从redux中获取用户信息
  const {user}=useSelector((state:RootState)=>state.user)
  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 顶部个人资料区域 */}
        <div className="user-info">
          <div className="avatar">
            <img src={user.photo} alt="" />
          </div>
          <div className="user-name">{user.name}</div>
          <Link to='/profile/edit'>
            个人资料 <Icon type='iconbtn_right'/>
          </Link>
        </div>

        {/* 今日阅读区域 */}
        <div className="read-info">
          <Icon type='iconbtn_readingtime'/>
          今日阅读 <span>10</span> 分钟
        </div>

        {/* 统计信息区域 */}
        <div className="count-list">
          <div className="count-item">
            <p>{user.art_count}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{user.follow_count}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{user.fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{user.like_count}</p>
            <p>被赞</p>
          </div>
        </div>

        {/* 主功能菜单区域 */}
        <div className="user-links">
          <div className="link-item">
            <Icon type='iconbtn_mymessages'/>
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <Icon type='iconbtn_mycollect'/>
            <div>我的收藏</div>
          </div>
          <div className="link-item">
            <Icon type='iconbtn_history1'/>
            <div>阅读历史</div>
        </div>
        <div className="link-item">
            <Icon type='iconbtn_myworks'/>
            <div>我的作品</div>
        </div>
        </div>
      </div>

      {/* 更多服务菜单区域 */}

      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <Link className='service-item' to='/profile/feedback'>
            <Icon type='iconbtn_feedback' />
            <div>用户反馈</div>
          </Link>
          <Link className='service-item' to='/profile/chat'>
            <Icon type='iconbtn_xiaozhitongxue' />
            <div>小智同学</div>
          </Link>
        </div>
      </div>
    </div>
  )
}