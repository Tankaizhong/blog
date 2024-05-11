import React, { useState } from 'react'
import { Modal, Button, message } from 'antd'
import Login from '@/components/Login'
import Register from '@/components/Register'
import '@/styles/login-modal.less'


const LoginModal = ({ open, onCancel }) => {
  const [isLogin, setIsLogin] = useState(true)

  const handleToggleLogin = () => {
    setIsLogin((prevState) => !prevState)
  }

  const handleSuccess = () => {
    //弹窗显示
    handleToggleLogin()
  }


  const handleCloseModal = () => {
    message.success('登录成功')
    // window.location.reload();
    onCancel()
  }

  return (
    <Modal title={isLogin ? '登录' : '注册'} open={open} onCancel={onCancel} footer={null}>
      {isLogin ? (
        <Login onSuccess={handleSuccess} onCloseModal={handleCloseModal} />
      ) : (
        <Register onSuccess={handleSuccess} />
      )}
      <div className="login-bottom-button">
        <Button onClick={handleToggleLogin}>切换到{isLogin ? '注册' : '登录'}</Button>

        <Button>扫码登录</Button>

        {/* 二维码扫描组件 */}
        {/*<QrReader*/}
        {/*    delay={300}*/}
        {/*    onError={handleError}*/}
        {/*    onScan={handleScan}*/}
        {/*    style={{ display: 'none' }} // 隐藏扫描组件，仅用于触发扫描逻辑*/}
        {/*/>*/}
      </div>
    </Modal>
  )
}

export default LoginModal
