import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  className?:string
  maxLength?:number
  value?:string
}
export default function TextArea({className,value='',maxLength=100,...rest}:Props) {
  const textRef=useRef<HTMLTextAreaElement>(null)
  useEffect(()=>{
    textRef.current?.focus()
    //光标定义到末尾
    textRef.current?.setSelectionRange(-1,-1)
  },[])
  return (
    <div className={styles.root}>
      {/* 文本输入框 */}
      <textarea
      ref={textRef}
      {...rest}
      value={value}
      maxLength={maxLength}
      className={classNames('textarea',className)} />
      {/* 当前字数/最大允许字数 */}
      <div className="count">
       {value.length}/{maxLength}
      </div>
    </div>
  )
}