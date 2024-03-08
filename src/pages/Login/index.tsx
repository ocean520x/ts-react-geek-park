import NavBar from '@/components/NavBar';
import styles from './index.module.scss'
import Input from '@/components/Input';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'
import { Toast } from 'antd-mobile';
import { sendCodesAPI,AuthorizationsAPI } from '@/store/action/user';
import {AppDispatch} from '@/store'
import { useEffect, useRef, useState } from 'react';
type FormValues= {
    mobile:string
    code:string
}
export default function Login() {
    const dispatch:AppDispatch=useDispatch()
    const [second,setSecond]=useState(0)
    const timerId=useRef(-1)
    const handleSendCodes=async()=>{
        //倒计时未结束 return
        if(second>0) return
        //校验错误
        if(formik.errors.mobile) return Toast.show({content:formik.errors.mobile})
        //调用发送验证码
        await dispatch(sendCodesAPI(formik.values.mobile))
        //成功提示
        Toast.show({content:'获取验证码成功',duration:1000})
        //开启倒计时
        setSecond(60)
        timerId.current=window.setInterval(()=>{
           //连续调用setSecond 会产生覆盖问题 因为setSecond是异步的
              //解决办法:使用函数式更新 
              //此时入参是旧值
              setSecond((preSecond)=>{
                //旧值为1 代表当前值已经为0 需要清除定时器
                if(preSecond===1) clearInterval(timerId.current)
                return preSecond-1
              })
           
        },1000)
    }
    useEffect(()=>{
        return ()=>{
            //组件卸载时清除定时器
            clearInterval(timerId.current)
        }
    },[])
    const formik=useFormik({
        initialValues:{
            mobile:'13911111111',
            code:'123456'
        } as FormValues ,
        onSubmit:(values)=>{
            console.log('values',values)
            dispatch(AuthorizationsAPI(values))
        },
        validationSchema:Yup.object().shape({
            //手机号校验
            mobile:Yup.string().required('请输入手机号').matches(/^1[3-9]\d{9}$/, '手机号格式错误'),
            //验证码校验
            code:Yup.string().required('请输入验证码').matches(/^\d{6}$/, '验证码格式错误')
        })
        
    })
    return (
       <div className={styles.root}>
        <NavBar>登陆</NavBar>
        <div className="content">
            {/* 标题 */}
            <h3>短信登陆</h3>
            <form onSubmit={formik.handleSubmit}>
                {/* 手机输入框 */}
                <div className="input-item">
                    <Input 
                    autoFocus
                    className='input'
                    placeholder='请输入手机号' 
                    autoComplete='off'
                    type='text'
                    name='mobile'
                    maxLength={11}
                    errorMsg={formik.touched.mobile?formik.errors.mobile:''}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    />
                </div>
                {/* 短信验证码输入框 */}
                <div className="input-item">
                    <Input 
                    placeholder='请输入验证码' 
                    className='input' 
                    autoComplete='off' 
                    type='text' 
                    name='code'  
                    maxLength={6}
                    errorMsg={formik.touched.code?formik.errors.code:''}
                    onBlur={formik.handleBlur}
                    extra={<span onClick={()=>handleSendCodes()}>{second===0?'获取验证码':`${second}秒后重试`}</span>}
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    />
                </div>
                {/* 登陆按钮 */}
                <button type='submit' className='login-btn' disabled={!formik.isValid}>登陆</button>
            </form>
        </div>
       </div>
    )
}