import React, { useEffect, useState } from 'react'
import { Badge, Button, Popover, Space, Avatar } from 'antd'
import { LikeOutlined, UserOutlined } from '@ant-design/icons'
import UserCard from '@/components/UserCard'
import UserLikeCard from '@/pages/UserLikeCard'
import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import LoginModal from '@/components/LoginModal'
import '@/styles/user-nav.less'

const UserNav = () => {
  const [token, setToken] = useState(null)
  const [visible, setVisible] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const storedUserInfo = getStorage(LOCAL_STORAGE_NAME) // 从本地存储中获取用户信息
    if (storedUserInfo) {
      setUserInfo(storedUserInfo) // 设置用户信息
      setToken(storedUserInfo.token) // 设置用户 Token
    }
  }, [visible]) // 在组件首次渲染时执行一次

  const handleLogin = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <div className="user-content">
      {token ? (
        <div>
          <Badge count={3}>
            <Popover content={UserLikeCard}>
              <LikeOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            </Popover>
          </Badge>
          <Popover content={UserCard}>
            <Avatar
              src={userInfo && userInfo.Avatar}
              icon={<UserOutlined />}
              shape="square"
              size="large"
            />
          </Popover>
        </div>
      ) : (
        <Button onClick={handleLogin} icon={<UserOutlined />}>
          登录 | 注册
        </Button>
      )}
      <LoginModal open={visible} onCancel={handleCancel} />
    </div>
  )
}

export default UserNav
