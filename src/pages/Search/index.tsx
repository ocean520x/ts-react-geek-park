import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import Icon from '@/components/Icon'
import { useEffect, useRef, useState } from 'react'
import { clearHistoriesAction, clearSuggestionAction, getSuggestionAction, saveHistoriesAction } from '@/store/action/search'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import DOMPurify from 'dompurify';
import { Toast } from 'antd-mobile'
import { useLocation, useNavigate } from 'react-router-dom'
import { removeLocalHistories, setLocalHistories } from '@/utils/storage'
export default function Search() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [keyword, setKeyword] = useState('')
  const timeId = useRef(-1)
  const handleChange = (value: string) => {
    setKeyword(value)
    clearTimeout(timeId.current)
    if (!value) {
      dispatch(clearSuggestionAction(null))
      return
    }
    timeId.current = window.setTimeout(() => {
      dispatch(getSuggestionAction(value))
    }, 500)
  }
  useEffect(() => {
    return () => {
      window.clearTimeout(timeId.current)
      dispatch(clearSuggestionAction(null))

    }
  }, [])
  const { suggestions, histories } = useSelector((state: RootState) => state.search)
  useEffect(() => {
    setLocalHistories(histories)
  }, [histories])
  const tenHistories = histories.slice(0, 10)
  const handleGotoResult = (keyword: string) => {
    navigate(`/search/result?q=` + keyword)
  }
  const handleSearch = (item: string|undefined=undefined) => {
    if (!keyword.trim()) return Toast.show({ content: '搜索内容不能为空' })
    handleGotoResult(keyword)
    if (item) {
      dispatch(saveHistoriesAction(item))
    } else {
      dispatch(saveHistoriesAction(keyword))
    }
  }
  const handleClearHistories = () => {
    dispatch(clearHistoriesAction(null))
    removeLocalHistories()
  }
  const highlight = (keyword: string, item: string) => {
    const reg = new RegExp(`(${keyword})`, 'gi')
    return item.replace(reg, `<span onclick="alert(123)" >$1</span>`);
  }
  const handleClear = () => {
    setKeyword('')
    dispatch(clearSuggestionAction(null))
  }
  const handleOnBack = () => {
    //如果当前是search页面， 返回到首页
    if (location.pathname === '/search') {
      navigate('/layout/home')
      return
    }
    navigate('/search')
  }
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar onBack={handleOnBack} right={<span className='search-text' onClick={()=>handleSearch()} >搜索</span>}>
        <div className="navbar-search">
          <Icon type='iconbtn_search' className='icon-search' />
          <div className="input-wrapper">
            {/* 输入框 */}
            <input type="text" placeholder='请输入关键字搜索' value={keyword} onChange={(e) => handleChange(e.target.value.trim())} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />

            {/*  清空输入框按钮*/}
            {!!keyword.trim() && (
              <Icon type='iconbtn_tag_close' className='icon-close' onClick={handleClear} />
            )}
          </div>
        </div>
      </NavBar>

      {/* 搜索历史 */}
      {!keyword.trim() && !!histories.length && (
        <div className="history" style={{ display: 'block' }}>
          <div className="history-header">
            <span>搜索历史</span>
            <span onClick={() => handleClearHistories()}>
              <Icon type='iconbtn_del' />
              清空全部
            </span>
          </div>

          <div className="history-list">
            {tenHistories.map((item) => {
              return (
                <span className='history-item' key={item} onClick={() => handleGotoResult(item)}>
                  {item}<span className='divider'></span>
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* 搜索结果 */}
      {suggestions.length > 0 && (<div className="search-result">
        {suggestions.map((item, index) => {
          return (
            <div className="result-item" key={index} onClick={() => handleSearch(item)}>
              <Icon className='icon-search' type='iconbtn_search' />
              <div className="result-value" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlight(keyword, item)) }}>
              </div>
            </div>
          )
        })}
      </div>)}
    </div>
  )
}