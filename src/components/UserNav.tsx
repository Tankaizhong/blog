import React from 'react'
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Space } from 'antd'
import '@/styles/usernav.less'

const UserNav = () => {
  const [count, setCount] = React.useState(null)
  //加载页面的时候使用api获得count

  return (
    <div className="userNav">
      <Space size="middle">
        <Badge count={count}>
          <Avatar icon={<UserOutlined />} shape="square" size="large" />
        </Badge>
      </Space>
    </div>
  )
}

export default UserNav
