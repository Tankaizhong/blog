import React from 'react'
import { Card, Avatar, Typography, Button } from 'antd'
import { LikeOutlined } from '@ant-design/icons'
import { navigateTo } from '@/utils/router'

const UserLikeCard = () => {
  const handleClick = () => {
    // 在点击事件处理程序中进行页面导航
  }

  return (
    <div className="like-content">
      <Button type="text" onClick={handleClick} target="/account/notifications">
        点赞
      </Button>
    </div>
  )
}

export default UserLikeCard
