import React, { useEffect, useState } from 'react'
import { Avatar, Typography, Space } from 'antd'
import { LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import '@/styles/usercomment.less'
import { UserType } from '@/types/model'
import LikeButton from '@/components/LikeButton'
import { addCommentLike, checkCommentLike, commentLikeCount, removeCommentLike } from '@/api/like'
import moment from 'moment'

const { Text } = Typography

const UserComment = ({ comment }) => {
  const { User, Content, CommentDate, CommentID, Likes }: { User: UserType } = comment
  const [liked, setLiked] = useState(false) // 定义 liked 状态和修改 liked 状态的函数
  const [likeCount, setLikeCount] = useState(0) // 定义点赞数状态

  // 获取评论的点赞状态
  useEffect(() => {
    checkCommentLike(CommentID).then((res: any) => {
      setLiked(res.liked)
    })

    fetchLikeCount()
  }, [CommentID])

  // 获取评论的点赞总数
  const fetchLikeCount = async () => {
    try {
      const res = await commentLikeCount(CommentID)
      // console.log(count)
      setLikeCount(res.likeCount)
    } catch (error) {
      console.error('Failed to fetch like count:', error)
    }
  }

  // 处理点赞事件
  const handleLiked = async (isLiked) => {
    setLiked(isLiked)
    try {
      if (isLiked) {
        await addCommentLike(CommentID) // 点赞
        setLikeCount((prevCount) => prevCount + 1) // 增加点赞数
      } else {
        await removeCommentLike(CommentID) // 取消点赞
        setLikeCount((prevCount) => prevCount - 1) // 减少点赞数
      }
    } catch (error) {
      console.error('Failed to update like status:', error)
    }
  }
  // console.log(likeCount)
  return (
    <div className="user-comment-container">
      <div className="user-info">
        <Avatar icon={!User.Avatar ? <UserOutlined /> : null} src={User.Avatar} />
        <Text strong style={{ marginLeft: '8px' }}>
          {User.Username}
        </Text>
      </div>
      <Text>{Content}</Text>
      <br />
      <Space className="like-reply">
        <LikeButton handleLiked={handleLiked} liked={liked} />
        <span>{likeCount}</span>
        <span>
          <MessageOutlined style={{ marginRight: '4px' }} />
          回复
        </span>
        <span>{moment(CommentDate).format('YYYY-MM-DD HH:mm:ss')}</span>
      </Space>
    </div>
  )
}

export default UserComment
