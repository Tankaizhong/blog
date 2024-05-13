import React, { useEffect, useState } from 'react'
import { Badge, Button, Popover, Space, Avatar, Drawer, Modal } from 'antd'
import { LikeOutlined, MailOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import UserCard from '@/components/UserCard'

import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import LoginModal from '@/components/LoginModal'
import '@/styles/user-nav.less'
import { getLikeCount } from '@/api/like'

import { UserType } from '@/types/model'

import UserForm from '@/admin/component/UserForm'
import { isFirstTimeUser } from '@/utils/user'

const UserNav = () => {
  const [visible, setVisible] = useState(false)
  const [userInfo, setUserInfo] = useState<UserType | null>(getStorage(LOCAL_STORAGE_NAME))
  const token = userInfo?.token

  useEffect(() => {
    if (token) {
      fetchLikeCount()
    }
  }, [visible, userInfo, token]) // 在组件首次渲染时执行一次

  const [userInfoLoaded, setUserInfoLoaded] = useState(false) // 新增状态
  useEffect(() => {
    if (userInfoLoaded) {
      return // 如果用户信息已经从 localStorage 中加载，则不再执行后续代码
    }
    const storedUserInfo = getStorage(LOCAL_STORAGE_NAME)
    if (storedUserInfo) {
      setUserInfo(storedUserInfo)
      setUserInfoLoaded(true)
    }
  }, [userInfoLoaded, visible]) // 当 userInfoLoaded 改变时执行
  // console.log(userInfoLoaded,userInfo)

  const handleLogin = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const [likeCount, setLikeCount] = useState(null)

  // 在组件渲染时调用获取喜欢数量的函数
  const fetchLikeCount = async () => {
    try {
      // 调用后端 API 获取喜欢的数量
      const count = await getLikeCount(userInfo?.UserID) // 假设你有一个变量 UserID
      setLikeCount(count.count)
    } catch (error) {
      console.error('获取喜欢数量失败', error)
    }
  }
  // console.log(userInfo)

  const [showUserForm, setShowUserForm] = useState(false)
  useEffect(() => {
    if (isFirstTimeUser()) {
      setShowUserForm(true)
    }
  }, [userInfo])
  return (
    <div className="user-content">
      {userInfo ? (
        <div>
          <Popover
            content={
              <div className="button">
                <Button type="text" href="/account/notifications" target="_blank">
                  查看点赞
                </Button>
                <br />
                <Button type="text" href="/account/notifications" target="_blank">
                  我的点赞
                </Button>
              </div>
            }
            trigger="hover"
            overlayClassName="notification-content"
          >
            <Badge count={likeCount}>
              <MailOutlined style={{ color: '#1890ff', fontSize: '24px', cursor: 'pointer' }} />
            </Badge>
          </Popover>
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
      <Modal
        open={showUserForm} // 根据 userInfo.Email 的存在与否来控制 Modal 的显示
        width={'70%'}
        title="完善用户信息"
        footer={null}
        onCancel={() => {
          // console.log(1)
          setShowUserForm(false)
        }} // 取消按钮点击事件
      >
        <UserForm userInfor={userInfo} onClose={() => setShowUserForm(false)} />
      </Modal>
    </div>
  )
}

export default UserNav
