import { SearchResultType } from '@/store/reducers/search'
import styles from './index.module.scss'
import classnames from 'classnames'
import { ArticleType } from '@/store/reducers/article';
import { Image } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
type ArticleItemProps = {
  data: SearchResultType | ArticleType;
}
export default function ArticleItem(props: ArticleItemProps) {
  const navigate=useNavigate()
  const { data } = props
  const cover = data.cover || {}
  const { type, images } = cover
  return (
    <div className={styles.root} onClick={()=>navigate(`/article/${data.art_id}`)}>
      <div className={classnames('article-content', {
        t3: type === 3,
        'none-mt': type === 0
      })}>
        <h3>{data.title}</h3>
        {type !== 0 && (
          <div className='article-imgs'>
            {images.map((item, index) => (
              <div className='article-img-wrapper' key={index}>
                <Image src={item} lazy fit='cover'/>
                {/* <img src={item} alt='' /> */}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
        <span>{data.aut_name}</span>
        <span>{data.comm_count}评论</span>
        <span>{data.pubdate}</span>
      </div>
    </div>
  )
}