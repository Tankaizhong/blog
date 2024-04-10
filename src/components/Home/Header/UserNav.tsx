import React, { useEffect, useState } from 'react'
import { ClockCircleOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Popover, Space, Modal } from 'antd'
import '@/styles/user-nav.less'
import UserCard from '@/components/Home/UserCard'
import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import { useNavigate } from 'react-router-dom'
import Login from '@/components/Login'
import Register from '@/components/Register'

const UserNav = () => {
  const [count, setCount] = useState(null)
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
  return (
    <div className="user-content">
      <Space size="middle">
        <Badge count={count}>
          {/* token为空,则显示登录按钮 */}
          {token ? (
            <div className="login-content">
              <div className="user-nav">
                <Popover content={UserCard}>
                  <Avatar icon={<UserOutlined />} shape="square" size="large" />
                </Popover>
              </div>
            </div>
          ) : (
            <Button onClick={handleLogin} icon={<UserOutlined />}>
              登录 | 注册
            </Button>
          )}
        </Badge>
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
