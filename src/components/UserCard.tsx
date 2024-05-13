import React, { useEffect, useState } from 'react'
import { Button, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import '../styles/user-card.less'
import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'

import { UserType } from '@/types/model'
import LogoutButton from '@/components/LogoutButton'
import { navigateTo } from '@/utils/router'

const UserCard = () => {
  const handleAccountSetting = () => {
    navigateTo('/account/settings')
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

      <Button className="write-article-btn" type="text" onClick={handleAccountSetting}>
        账号设置
      </Button>

      {/*退出登录*/}
      <LogoutButton />
    </div>
  )
}

export default UserCard
