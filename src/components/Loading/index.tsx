import {Loading as AntdLoading} from 'antd-mobile'
export default function Loading () {
  return (
    <div
    style={{
      fontSize:20,
      height:'80vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
    }}
    >
      <AntdLoading />
    </div>
  )
}