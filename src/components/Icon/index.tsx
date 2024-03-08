/** @format */

import classNames from 'classnames'
type IconType =
    | 'iconphoto-fail'
    | 'iconphoto'
    | 'iconbtn_right'
    | 'iconicon_unenjoy1'
    | 'iconicon_feedback1'
    | 'iconicon_upload'
    | 'iconbianji'
    | 'icongengduo'
    | 'iconfanhui'
    | 'iconbtn_history1'
    | 'iconbtn_readingtime'
    | 'iconbtn_like2'
    | 'iconbtn_pic'
    | 'iconbtn_mine'
    | 'iconbtn_channel'
    | 'iconbtn_channel_close'
    | 'iconbtn_comment'
    | 'iconbtn_home_sel'
    | 'iconbtn_collect_sel'
    | 'iconbtn_mine_sel'
    | 'iconbtn_collect'
    | 'iconbtn_qa_sel'
    | 'iconbtn_like_sel'
    | 'iconbtn_feedback'
    | 'iconbtn_del'
    | 'iconbtn_tag_close'
    | 'iconbtn_essay_close'
    | 'iconbtn_qa'
    | 'iconbtn_myworks'
    | 'iconicon_blacklist'
    | 'iconbtn_mycollect'
    | 'iconbtn_video_sel'
    | 'iconbtn_share'
    | 'iconbtn_mymessages'
    | 'iconbtn_search'
    | 'iconbtn_like'
    | 'iconbtn_xiaozhitongxue'
    | 'iconbtn_video'
    | 'iconbtn_home'
type Props = {
    type: IconType
    className?: string
    style?: React.CSSProperties
    onClick?: () => void
}

export default function Icon({type, className, style, onClick}: Props) {
    return (
        <svg onClick={onClick} className={classNames('icon', className)} style={style} aria-hidden="true">
            <use xlinkHref={`#${type}`}></use>
        </svg>
    )
}
