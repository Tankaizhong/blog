import React, { useState } from 'react'
import { Button, message, Progress } from 'antd'
import '../../styles/user-card.less'
import { clearStorage, removeStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import { useRouter } from '@/utils/router'

const UserCard = () => {
  const [loading, setLoading] = useState(false)
  const { navigateTo } = useRouter()
  const handleLogout = async () => {
    setLoading(true)
    try {
      // 调用退出登录的 API
      // await logout();
      message.success('退出登录成功')
      // 刷新页面
      window.location.reload()
      removeStorage(LOCAL_STORAGE_NAME)
      // 在这里可以进行其他处理，例如重定向到登录页面等
    } catch (error) {
      console.error('退出登录失败:', error)
      message.error('退出登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleWriteArticle = () => {
    // 使用useHistory钩子获取history对象
    // console.log(1)
    // navigateTo('/draft')
    window.open('/draft', '_blank')
  }

  return (
    <div className="user-card-content">
      <Progress percent={50} status="active" />
      <Button className="write-article-btn" type="primary" onClick={handleWriteArticle}>
        写文章
      </Button>
      <Button className="logout-btn" type="text" onClick={handleLogout}>
        退出登录
      </Button>
    </div>
  )
}

export default UserCard
