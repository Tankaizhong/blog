import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { List, Avatar, Button } from 'antd'
import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import { fetchNotification, markNotificationRead } from '@/api/notifications'
import { NotificationType, UserType } from '@/types/model'

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const [UserInfo, setUserInfo] = useState(getStorage(LOCAL_STORAGE_NAME))

  // 获取 UserInfo 并开始轮询通知
  useEffect(() => {
    if (UserInfo) {
      setUserInfo(UserInfo)
      pollNotifications()
      const intervalId = setInterval(pollNotifications, 5000) // 每隔 5 秒轮询一次
      return () => clearInterval(intervalId) // 在组件卸载时清除定时器
    }
  }, [])

  // 轮询获取通知
  const pollNotifications = async () => {
    if (UserInfo) {
      try {
        const { notifications } = await fetchNotification(UserInfo as UserType)
        console.log(notifications)
        setNotifications(notifications)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }
  }

  // 标记通知为已读
  const markAsRead = async (notification: NotificationType) => {
    try {
      // await axios.post(`/api/`);
      if (!notification.IsRead) {
        await markNotificationRead(notification.NotificationID)
        setNotifications((prevNotifications: any) =>
          prevNotifications.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
        )
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  return (
    <div>
      <h2>Notifications</h2>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={notifications.sort(
          (a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
        )} // 根据 createAt 排序
        renderItem={(notification: NotificationType) => (
          <List.Item
            className="notification-item" // 添加类名
            key={notification.NotificationID}
            style={{ fontWeight: notification.IsRead ? 'normal' : 'bold' }}
            onClick={() => markAsRead(notification)} // 在List.Item中添加onClick事件
          >
            <List.Item.Meta
              avatar={<Avatar src={notification.User?.Avatar} />}
              title={<a href="#">{notification.User?.Nickname}</a>}
              description={notification.Content}
            />
            <div>{notification.createAt}</div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default NotificationComponent
