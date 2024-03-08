import React from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
// type Props = {
//   [x:string]:any
//   placeholder?:string
//   className?:string
//   extra?:React.ReactNode
//   errorMsg?:string
// }
interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?:string
  extra?:React.ReactNode
  errorMsg?:string
}
export default function Input({className,extra,errorMsg,...rest}:InputProps) {
  return (
    <div className={styles.root}>
      <input className={classNames('input',className)} {...rest} />
      {extra&&<div className='extra'>{extra}</div>}
      {errorMsg&&<div className='validate'>{errorMsg}</div>}
    </div>
  )
}