import React, { useEffect, useState } from 'react'
import {
  ClockCircleOutlined,
  HeartOutlined,
  LikeOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Badge, Button, Popover, Space, Modal } from 'antd'
import '@/styles/user-nav.less'
import UserCard from '@/components/UserCard'
import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import { useNavigate } from 'react-router-dom'
import Login from '@/components/Login'
import Register from '@/components/Register'
import LikeCard from '@/components/LikeCard'

const UserNav = () => {
  const [count, setCount] = useState()
  const [token, setToken] = useState(null)
  const [visible, setVisible] = useState(false) // 控制登录的 Modal 是否可见
  const [isLogin, setIsLogin] = useState(true) // 默认显示登录界面
  const navigate = useNavigate()

  // 加载页面的时候使用api获得count
  // 获取token
  useEffect(() => {
    // 在localStorage中获取token
    const token = getStorage(LOCAL_STORAGE_NAME)
    setToken(token)
  }, []) // 第二个参数为依赖数组，表示仅在组件挂载时执行一次

  const handleLogin = () => {
    setVisible(true) // 点击登录按钮时显示登录的 Modal
  }

  const handleCancel = () => {
    setVisible(false) // 点击 Modal 上的取消按钮时关闭 Modal
  }

  const handleToggleLogin = () => {
    setIsLogin((prevState) => !prevState)
  }
  const handleCloseModal = () => {
    setVisible(false) // 关闭 Modal
  }
  const handleRegisterSuccess = () => {
    setIsLogin(true) // 注册成功后切换到登录页面
  }
  const [userInfo, setUserInfo] = useState(null)
  useEffect(() => {
    // 组件首次渲染时从本地存储中获取用户信息
    const userInfo = getStorage(LOCAL_STORAGE_NAME)
    if (userInfo) {
      setUserInfo(userInfo)
    }
  }, [token])
  return (
    <div className="user-content">
      <Space size="middle">
        <div className="login-content">
          {/* token为空,则显示登录按钮 */}
          {token ? (
            <div>
              <Badge count={3}>
                <Popover content={LikeCard}>
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
              {/* 点赞组件 */}
            </div>
          ) : (
            <Button onClick={handleLogin} icon={<UserOutlined />}>
              登录 | 注册
            </Button>
          )}
        </div>
      </Space>

      {/* 登录的 Modal */}
      <Modal title={isLogin ? '登录' : '注册'} open={visible} onCancel={handleCancel} footer={null}>
        {isLogin ? (
          <Login onCloseModal={handleCloseModal} />
        ) : (
          <Register onSuccess={handleRegisterSuccess} />
        )}
        <div>
          <Button onClick={handleToggleLogin}>切换到{isLogin ? '注册' : '登录'}</Button>
        </div>
      </Modal>
    </div>
  )
}

export default UserNav
