import React, { useState } from 'react'
import { Button, message } from 'antd'
import { removeStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'

const LogoutButton = () => {
  const [loading, setLoading] = useState(false)
  const handleLogout = async () => {
    setLoading(true)
    try {
      // 清除本地存储的用户信息
      removeStorage(LOCAL_STORAGE_NAME)
      // 刷新页面
      window.location.reload()
    } catch (error) {
      console.error('退出登录失败:', error)
      message.error('退出登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button className="logout-btn" type="danger" onClick={handleLogout}>
      退出登录
    </Button>
  )
}

export default LogoutButton
