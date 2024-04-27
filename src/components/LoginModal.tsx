import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import Login from '@/components/Login'
import Register from '@/components/Register'

const LoginModal = ({ open, onCancel, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)

  const handleToggleLogin = () => {
    setIsLogin((prevState) => !prevState)
  }

  const handleSuccess = () => {
    onSuccess()
    onCancel()
  }

  return (
    <Modal title={isLogin ? '登录' : '注册'} open={open} onCancel={onCancel} footer={null}>
      {isLogin ? <Login onSuccess={handleSuccess} /> : <Register onSuccess={handleSuccess} />}
      <div>
        <Button onClick={handleToggleLogin}>切换到{isLogin ? '注册' : '登录'}</Button>
      </div>
    </Modal>
  )
}

export default LoginModal
