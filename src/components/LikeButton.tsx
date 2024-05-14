import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { LikeOutlined } from '@ant-design/icons'

const LikeButton = ({ handleLiked, liked }) => {
  const springProps = useSpring({
    transform: liked ? 'scale(1.2)' : 'scale(1)', // 缩放动画
    config: { tension: 200, friction: 10 }, // 调整动画的弹性和摩擦力
  } as any)

  const handleClick = () => {
    handleLiked(!liked)
  }

  return (
    <div>
      <animated.div style={springProps} onClick={handleClick} className={liked ? 'liked' : ''}>
        <LikeOutlined style={{ fontSize: '14px', color: liked ? '#1e80ff' : '#8a919f' }} />
      </animated.div>
    </div>
  )
}

export default LikeButton
