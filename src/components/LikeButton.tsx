import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { LikeOutlined } from '@ant-design/icons'

const LikeButton = ({ handleLiked, liked }) => {
  const springProps = useSpring({
    transform: liked ? 'scale(1.2)' : 'scale(1)', // 缩放动画
    config: { tension: 200, friction: 10 }, // 调整动画的弹性和摩擦力
  } as any)

  const handleLike = () => {
    handleLiked(!liked) // 反转 liked 状态并通过回调函数通知父组件
  }

  return (
    <animated.div style={springProps} onClick={handleLike} className={liked ? 'liked' : ''}>
      <LikeOutlined style={{ fontSize: '24px', color: liked ? '#1e80ff' : 'black' }} />
      {/*Like*/}
    </animated.div>
  )
}

export default LikeButton
