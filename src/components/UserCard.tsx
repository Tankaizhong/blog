import React, { useEffect, useState } from 'react'
import { Button, message, Avatar, Menu, Dropdown } from 'antd'
import { LogoutOutlined, SettingOutlined, SkinOutlined, UserOutlined } from '@ant-design/icons'
import '../styles/user-card.less'
import { clearStorage, getStorage, removeStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'

import { UserType } from '@/types/model'
import LogoutButton from '@/components/LogoutButton'
import { navigateTo } from '@/utils/router'

const UserCard = () => {
  const handleWriteArticle = () => {
    // 跳转到写文章页面
    navigateTo('/draft')
  }

  const handleAccountSettings = () => {
    // 跳转到账号设置页面
    navigateTo('/account/settings')
  }

  const handleAppearanceSettings = () => {
    // 跳转到外观设置页面
    navigateTo('/appearance/settings')
  }

  const handleAccountSetting = () => {
    navigateTo('/account/settings')
  }
  const handleNotification = () => {
    navigateTo('/account/notifications')
  }

  const [username, setUsername] = useState('')
  const [userInfo, setUserInfo] = useState<UserType>(null)
  useEffect(() => {
    // 组件首次渲染时从本地存储中获取用户信息
    const userInfo = getStorage(LOCAL_STORAGE_NAME) as UserType
    if (userInfo && userInfo.Nickname) {
      setUsername(userInfo.Nickname)
      setUserInfo(userInfo)
    }
  }, []) // 空数组作为依赖，表示只在组件首次渲染时执行

  return (
    <div className="user-card-content">
      <Avatar size={64} src={userInfo && userInfo.Avatar} icon={<UserOutlined />} />
      <span className="username">{username}</span>
      <Button className="write-article-btn" type="primary" onClick={handleWriteArticle}>
        写文章
      </Button>
      <Button className="write-article-btn" type="primary" onClick={handleAccountSetting}>
        账号设置
      </Button>

      <Button className="write-article-btn" type="primary" onClick={handleNotification}>
        点赞通知
      </Button>

      <LogoutButton />
    </div>
  )
}

export default UserCard
