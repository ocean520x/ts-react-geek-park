/** @format */

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import React from 'react'
import {useNavigate} from 'react-router-dom'
interface INavBarProps {
    onBack?: () => void
    children?: React.ReactNode
    right?: React.ReactNode
}
export default function NavBar({onBack, children, right}: INavBarProps) {
    const navigate = useNavigate()
    const handleBack = () => {
        onBack ? onBack() : navigate(-1)
    }
    return (
        <div className={styles.root}>
            <div className="main">
                {/* 后退按钮 */}
                <div className="left">
                    <Icon type="iconfanhui" onClick={handleBack} />
                </div>
                {/* 居中标题 */}
                <div className="title">{children}</div>
                {/* 右侧内容 */}
                <div className="right">{right}</div>
            </div>
        </div>
    )
}
