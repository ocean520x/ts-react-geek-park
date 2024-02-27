import {ErrorBlock, Space,Button} from 'antd-mobile'
import {useNavigate} from 'react-router-dom'
export default function NotFound() {
    const navigate=useNavigate()
    return (
        <ErrorBlock title="你要访问的页面不见了" description="换个页面试试..." fullPage
        >
            <Space>
                <Button color='primary' onClick={()=>navigate('/')}>返回首页</Button>
                <Button color='warning' onClick={()=>navigate(-1)}>后退一步</Button>
            </Space>
        </ErrorBlock>
    )
}