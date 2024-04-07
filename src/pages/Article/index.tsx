import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import Icon from '@/components/Icon'
export default function Article() {
  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        {/* 顶部导航栏 */}
        <NavBar right={<Icon type='icongengduo' />}></NavBar>
        <div className="wrapper">
          <div className="article-wrapper">
            {/* 文章描述信息栏 */}
            <div className="header">
              <h1 className='title'>{'文章标题'}</h1>
              <div className="info">
                <span>{'2024-04-06'}</span>
                <span>{10} 阅读</span>
                <span>{10} 评论</span>
              </div>

              <div className="author">
                <img src="" alt="" />
                <span className='name'>{'欧顺'}</span>
                <span className='follow'>关注</span>
              </div>
            </div>
            {/* 文章正文内容区域 */}
            <div className="content">
              <div className="content-html dg-html">test123</div>
              <div className="date">发布文章时间：{'2024-04-06'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}